import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import { deleteUndefines } from "./utils";

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
