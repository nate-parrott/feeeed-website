import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import { FeedItem, fetchFeed } from "./feed";

export const notifyAllHandler = (request: functions.Request, response: functions.Response) => {
    // Send hello world
    // For testing, fetch the verge RSS feed:
    const url = "http://www.theverge.com/rss/full.xml";
   // Send first item
    fetchFeed(url).then((items) => {
        response.send(items[0]);
    });

    notify(0, 1);
}

/*
The structure of the DB:
/devices/{device_id}/notif_subs/{sub_id}
contains fields:
buzz
(bool)

feedKind
(string)

feedURL
(string)

globalFeedId
"feed:http://www.theverge.com/rss/full.xml"
(string)

pushToken
(string)

shard
(number) 0...100_000

lastNotifTimestampGMT // gmt timestamp

*/

interface NotifSub {
    buzz: boolean;
    feedKind: string;
    feedURL: string;
    globalFeedId: string;
    pushToken: string;
    shard: number;
    lastNotifTimestampGMT: number;
}

type NotifSubWithIds = { subId: string, deviceId: string, notifSub: NotifSub };

// shardCount must evenly divide 100_000
export async function notify(shard: number, shardCount: number) {
    const shardSize = 100_000 / shardCount;
    const min = shard * shardSize;
    const max = (shard + 1) * shardSize;

    // Fetch all notif_subs in the shard using collection group query
    const db = admin.firestore();

    const notifSubs = await db.collectionGroup('notif_subs')
        .where('shard', '>=', min)
        .where('shard', '<', max)
        .get()
        .then((snapshot) => 
            snapshot.docs.map(notifSubFromSnapshot).filter((x) => x !== undefined) as NotifSubWithIds[]
        );
    
    // Group by globalFeedId
    const notifSubsByFeedId: { [feedId: string]: NotifSubWithIds[] } = {};
    notifSubs.forEach((notifSub) => {
        if (!notifSubsByFeedId[notifSub.notifSub.globalFeedId]) {
            notifSubsByFeedId[notifSub.notifSub.globalFeedId] = [];
        }
        notifSubsByFeedId[notifSub.notifSub.globalFeedId].push(notifSub);
    });

    await Promise.all(Object.keys(notifSubsByFeedId).map(async (globalFeedId) => {
        try {
            await notifyFeed(globalFeedId, notifSubsByFeedId[globalFeedId]);
        }
        catch (e) {
            console.error(`Failed to notify feed ${globalFeedId}: ${e}`);
        }
    }));
}

function notifSubFromSnapshot(snapshot: FirebaseFirestore.QueryDocumentSnapshot<FirebaseFirestore.DocumentData>): NotifSubWithIds | undefined {
    const data = snapshot.data();
    const notifSubId = snapshot.id;
    const deviceId = snapshot.ref.parent.parent?.id;
    if (!deviceId) {
        return undefined;
    }
    const notifSub: NotifSub = {
        buzz: data.buzz,
        feedKind: data.feedKind,
        feedURL: data.feedURL,
        globalFeedId: data.globalFeedId,
        pushToken: data.pushToken,
        shard: data.shard,
        lastNotifTimestampGMT: data.lastNotifTimestampGMT,
    };
    return {
        subId: notifSubId,
        deviceId,
        notifSub,
    };

}

async function notifyFeed(globalId: string, notifSubs: NotifSubWithIds[]): Promise<void> {
    // Fetch feed
    // Iterate over subs
    // If feed has new items, send notifications
    // Update lastNotifTimestampGMT
    if (notifSubs.length === 0) {
        return;
    }
    let feedItems = await fetchFeedItems(notifSubs[0].notifSub);
    feedItems = clampFeedItemDatesToStartOfHour(feedItems);
    await Promise.all(notifSubs.map(async (notifSub) => {
        const newItems = feedItems.filter((item) => item.timestamp > notifSub.notifSub.lastNotifTimestampGMT);
        if (newItems.length === 0) { return }
        // Send notification
        try {
            await sendNotifications(notifSub.notifSub.pushToken, notifSub.notifSub.buzz, newItems);
            // Update lastNotifTimestampGMT
            const latestPubTime = Math.max(...newItems.map((item) => item.timestamp));
            const db = admin.firestore();
            await db.collection('devices').doc(notifSub.deviceId)
                .collection('notif_subs').doc(notifSub.subId)
                .update({ lastNotifTimestampGMT: latestPubTime });
        } catch {
            console.error(`Failed to send notification to ${notifSub.notifSub.pushToken}`);
        }
    }));
}

async function fetchFeedItems(sub: NotifSub): Promise<FeedItem[]> {
    if (sub.feedKind === 'feed') {
        return await fetchFeed(sub.feedURL);
    }
    return [];
}

function sendNotifications(deviceId: string, buzz: boolean, items: FeedItem[]): Promise<void> {
    return Promise.all(items.map((item) => {
        const deeplink = constructDeeplinkURL(item);
        const pubName = truncateWithEllipsis(item.pubName, 80);
        const title = truncateWithEllipsis(item.title, 150);
        sendSingleNotif(deviceId, pubName, title, buzz, deeplink);
    })).then(() => {});
}

function truncateWithEllipsis(str: string, maxLength: number): string {
    if (str.length <= maxLength) {
        return str;
    }
    return str.slice(0, maxLength - 3) + '...';

}

async function sendSingleNotif(deviceId: string, title: string, body: string, buzz: boolean, deeplink: string): Promise<void> {
    await admin.messaging().send({
        notification: {
            title,
            body,
        },
        apns: {
            payload: {
                aps: {
                    sound: buzz ? 'notif.aif' : undefined,
                },
                deeplink,
            },
        },
        token: deviceId,
    });
}

function constructDeeplinkURL(item: FeedItem) {
    // feed://webviewWithReader?url=...
    return `feed://webviewWithReader?url=${encodeURIComponent(item.url)}`;
}

// Attempt to fix bug where stories are sometimes sent multiple times in the same hour
// Remember item.timestamp is in seconds
function clampFeedItemDatesToStartOfHour(items: FeedItem[]): FeedItem[] {
    const secondsInHour = 3600;
    const baseHour = Math.floor(Date.now() / 1000 / secondsInHour) * secondsInHour;
    return items.map((item) => {
        return {
            ...item,
            timestamp: Math.min(item.timestamp, baseHour),
        };
    });
}
