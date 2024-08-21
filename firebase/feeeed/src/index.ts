import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import { deleteUndefines } from "./utils";
import { notify, NotifyFeedPayload, notifyFeedWithGlobalId } from "./notifs";
import { onSchedule } from "firebase-functions/v2/scheduler";
import { onTaskDispatched } from "firebase-functions/v2/tasks";

admin.initializeApp();

/*
Changes to this model must be made in three places: 
- /pages/api/recs.ts
- firebase/feeeed/src/index.ts
- RecommendationsList.swift
*/
interface RecommendationsList {
    id: string;
    title?: string;
    description?: string;
    creator?: string;
    subscriptions: any[];
}

interface RecommendationsListFirebaseDoc {
    title?: string;
    description?: string;
    creator?: string;
    subscriptionsJson: string;
}

export const upload = functions.https.onRequest((request, response) => {
    // Decode the request body as `RecommendationsList`.
    const recommendationsList = request.body as RecommendationsList;
    // Write it to the firestore 'recommendations' collection.
    const db = admin.firestore();
    // Assign doc with new id:
    const docRef = db.collection('recommendations').doc();
    let docData: RecommendationsListFirebaseDoc = {
        title: recommendationsList.title,
        description: recommendationsList.description,
        creator: recommendationsList.creator,
        subscriptionsJson: JSON.stringify(recommendationsList.subscriptions),
    };
    docData = deleteUndefines(docData);
    const docId = docRef.id;
    docRef.set(docData).then(() => {
        response.send({id: docId});
    });
});

export const download = functions.https.onRequest((request, response) => {
    const db = admin.firestore();
    const docId = request.query.id as string;
    const docRef = db.collection('recommendations').doc(docId);
    docRef.get().then((doc) => {
        if (doc.exists) {
            const docData = doc.data() as RecommendationsListFirebaseDoc;
            const subscriptions = JSON.parse(docData.subscriptionsJson) as any[];
            const recommendationsList: RecommendationsList = {
                id: docId,
                title: docData.title,
                description: docData.description,
                creator: docData.creator,
                subscriptions,
            };
            response.send(recommendationsList);
        } else {
            response.status(404).send('Not found');
        }
    });
});

export const notifyFeed = onTaskDispatched<NotifyFeedPayload>(
  {
    retryConfig: {
      maxAttempts: 0
    },
    rateLimits: {
      maxConcurrentDispatches: 1000
    },
    timeoutSeconds: 480,
  },
  async (req) => {
    const { data } = req;
    console.log('[notifyFeed task] payload:', data);
    return notifyFeedWithGlobalId(data.globalFeedId);
  }
);

// export const notifyAll = functions.https.onRequest(notifyAllHandler);

const N_SHARDS = 10;
const TIMEOUT = 9 * 60;
// Only run every 2 hours
exports.n0 = onSchedule({schedule: '0 0-23/2 * * *', timeoutSeconds: TIMEOUT}, async (ctx) => await notify(0, N_SHARDS));
exports.n1 = onSchedule({schedule: '3 0-23/2 * * *', timeoutSeconds: TIMEOUT}, async (ctx) => await notify(1, N_SHARDS));
exports.n2 = onSchedule({schedule: '6 0-23/2 * * *', timeoutSeconds: TIMEOUT}, async (ctx) => await notify(2, N_SHARDS));
exports.n3 = onSchedule({schedule: '9 0-23/2 * * *', timeoutSeconds: TIMEOUT}, async (ctx) => await notify(3, N_SHARDS));
exports.n4 = onSchedule({schedule: '12 0-23/2 * * *', timeoutSeconds: TIMEOUT}, async (ctx) => await notify(4, N_SHARDS));
exports.n5 = onSchedule({schedule: '15 0-23/2 * * *', timeoutSeconds: TIMEOUT}, async (ctx) => await notify(5, N_SHARDS));
exports.n6 = onSchedule({schedule: '18 0-23/2 * * *', timeoutSeconds: TIMEOUT}, async (ctx) => await notify(6, N_SHARDS));
exports.n7 = onSchedule({schedule: '21 0-23/2 * * *', timeoutSeconds: TIMEOUT}, async (ctx) => await notify(7, N_SHARDS));
exports.n8 = onSchedule({schedule: '24 0-23/2 * * *', timeoutSeconds: TIMEOUT}, async (ctx) => await notify(8, N_SHARDS));
exports.n9 = onSchedule({schedule: '27 0-23/2 * * *', timeoutSeconds: TIMEOUT}, async (ctx) => await notify(9, N_SHARDS));
// exports.n10 = onSchedule({schedule: '30 0-23/2 * * *', timeoutSeconds: TIMEOUT}, async (ctx) => await notify(10, N_SHARDS));
// exports.n11 = onSchedule({schedule: '33 0-23/2 * * *', timeoutSeconds: TIMEOUT}, async (ctx) => await notify(11, N_SHARDS));
// exports.n12 = onSchedule({schedule: '36 0-23/2 * * *', timeoutSeconds: TIMEOUT}, async (ctx) => await notify(12, N_SHARDS));
// exports.n13 = onSchedule({schedule: '39 0-23/2 * * *', timeoutSeconds: TIMEOUT}, async (ctx) => await notify(13, N_SHARDS));
// exports.n14 = onSchedule({schedule: '42 0-23/2 * * *', timeoutSeconds: TIMEOUT}, async (ctx) => await notify(14, N_SHARDS));
// exports.n15 = onSchedule({schedule: '45 0-23/2 * * *', timeoutSeconds: TIMEOUT}, async (ctx) => await notify(15, N_SHARDS));
// exports.n16 = onSchedule({schedule: '48 0-23/2 * * *', timeoutSeconds: TIMEOUT}, async (ctx) => await notify(16, N_SHARDS));
// exports.n17 = onSchedule({schedule: '51 0-23/2 * * *', timeoutSeconds: TIMEOUT}, async (ctx) => await notify(17, N_SHARDS));
// exports.n18 = onSchedule({schedule: '54 0-23/2 * * *', timeoutSeconds: TIMEOUT}, async (ctx) => await notify(18, N_SHARDS));
// exports.n19 = onSchedule({schedule: '57 0-23/2 * * *', timeoutSeconds: TIMEOUT}, async (ctx) => await notify(19, N_SHARDS));
// exports.n20 = onSchedule({schedule: '0 1-23/2 * * *', timeoutSeconds: TIMEOUT}, async (ctx) => await notify(20, N_SHARDS));
// exports.n21 = onSchedule({schedule: '3 1-23/2 * * *', timeoutSeconds: TIMEOUT}, async (ctx) => await notify(21, N_SHARDS));
// exports.n22 = onSchedule({schedule: '6 1-23/2 * * *', timeoutSeconds: TIMEOUT}, async (ctx) => await notify(22, N_SHARDS));
// exports.n23 = onSchedule({schedule: '9 1-23/2 * * *', timeoutSeconds: TIMEOUT}, async (ctx) => await notify(23, N_SHARDS));
// exports.n24 = onSchedule({schedule: '12 1-23/2 * * *', timeoutSeconds: TIMEOUT}, async (ctx) => await notify(24, N_SHARDS));
// exports.n25 = onSchedule({schedule: '15 1-23/2 * * *', timeoutSeconds: TIMEOUT}, async (ctx) => await notify(25, N_SHARDS));
// exports.n26 = onSchedule({schedule: '18 1-23/2 * * *', timeoutSeconds: TIMEOUT}, async (ctx) => await notify(26, N_SHARDS));
// exports.n27 = onSchedule({schedule: '21 1-23/2 * * *', timeoutSeconds: TIMEOUT}, async (ctx) => await notify(27, N_SHARDS));
// exports.n28 = onSchedule({schedule: '24 1-23/2 * * *', timeoutSeconds: TIMEOUT}, async (ctx) => await notify(28, N_SHARDS));
// exports.n29 = onSchedule({schedule: '27 1-23/2 * * *', timeoutSeconds: TIMEOUT}, async (ctx) => await notify(29, N_SHARDS));

// timeoutSeconds

// DO NOT SUBMIT
export const testSend = functions.https.onRequest((request, response) => {
    notifyFeedWithGlobalId('feed:https://google.com');
});

