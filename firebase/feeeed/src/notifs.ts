import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

export const notifyHandler = (request: functions.Request, response: functions.Response) => {
    // Send hello world
    response.send("Hello from Firebase!");
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
export function notify(shard: number, shardCount: number) {
    const shardSize = 100_000 / shardCount;
    const min = shard * shardSize;
    const max = (shard + 1) * shardSize;

    // Fetch all notif_subs in the shard using collection group query
    const db = admin.firestore();

    const notifSubsByFeedId: { [feedId: string]: NotifSubWithIds[] } = {};

    db.collectionGroup('notif_subs')
        .where('shard', '>=', min)
        .where('shard', '<', max)
        .get().then((snapshot) => {
            snapshot.forEach((doc) => {
                const data = doc.data();
                const notifSubId = doc.id;
                const deviceId = doc.ref.parent.parent?.id;
                if (!deviceId) {
                    return;
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
                const notifSubWithIds: NotifSubWithIds = {
                    subId: notifSubId,
                    deviceId,
                    notifSub,
                };
                if (!notifSubsByFeedId[notifSub.globalFeedId]) {
                    notifSubsByFeedId[notifSub.globalFeedId] = [];
                }
                notifSubsByFeedId[notifSub.globalFeedId].push(notifSubWithIds);
            });
            for (const globalFeedId in notifSubsByFeedId) {
                notifyFeed(globalFeedId, notifSubsByFeedId[globalFeedId]);
            }
            console.log(`Done`);
        });
}

function notifyFeed(globalId: string, notifSubs: NotifSubWithIds[]) {
    // Fetch feed
    // Iterate over subs
    // If feed has new items, send notifications
    // Update lastNotifTimestampGMT
    console.log(`Notif subs: ${notifSubs}`);
}
