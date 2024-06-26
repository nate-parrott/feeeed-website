import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import { deleteUndefines } from "./utils";
import { notify, notifyAllHandler } from "./notifs";
import { onSchedule } from "firebase-functions/v2/scheduler";

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

export const helloWorld = functions.https.onRequest((request, response) => {
    response.send("Hello from Firebase!");
});

// export const notifyAll = functions.https.onRequest(notifyAllHandler);

// Use 10 shards running every hour, offset each by 6 mins
const N_SHARDS = 10;
const TIMEOUT = 9 * 60;
exports.n0 = onSchedule({schedule: '0 * * * *', timeoutSeconds: TIMEOUT}, async (ctx) => await notify(0, N_SHARDS));
exports.n1 = onSchedule({schedule: '6 * * * *', timeoutSeconds: TIMEOUT}, async (ctx) => await notify(1, N_SHARDS));
exports.n2 = onSchedule({schedule: '12 * * * *', timeoutSeconds: TIMEOUT}, async (ctx) => await notify(2, N_SHARDS));
exports.n3 = onSchedule({schedule: '18 * * * *', timeoutSeconds: TIMEOUT}, async (ctx) => await notify(3, N_SHARDS));
exports.n4 = onSchedule({schedule: '24 * * * *', timeoutSeconds: TIMEOUT}, async (ctx) => await notify(4, N_SHARDS));
exports.n5 = onSchedule({schedule: '30 * * * *', timeoutSeconds: TIMEOUT}, async (ctx) => await notify(5, N_SHARDS));
exports.n6 = onSchedule({schedule: '36 * * * *', timeoutSeconds: TIMEOUT}, async (ctx) => await notify(6, N_SHARDS));
exports.n7 = onSchedule({schedule: '42 * * * *', timeoutSeconds: TIMEOUT}, async (ctx) => await notify(7, N_SHARDS));
exports.n8 = onSchedule({schedule: '48 * * * *', timeoutSeconds: TIMEOUT}, async (ctx) => await notify(8, N_SHARDS));
exports.n9 = onSchedule({schedule: '54 * * * *', timeoutSeconds: TIMEOUT}, async (ctx) => await notify(9, N_SHARDS));

// timeoutSeconds
