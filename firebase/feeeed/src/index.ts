import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

admin.initializeApp();

// // Start writing functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

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
    subscriptions: string;
}

export const upload = functions.https.onRequest((request, response) => {
    // Decode the request body as `RecommendationsList`.
    const recommendationsList = request.body as RecommendationsList;
    // Write it to the firestore 'recommendations' collection.
    const db = admin.firestore();
    // Assign doc with new id:
    const docRef = db.collection('recommendations').doc();
    const docData: RecommendationsListFirebaseDoc = {
        title: recommendationsList.title,
        description: recommendationsList.description,
        creator: recommendationsList.creator,
        subscriptions: JSON.stringify(recommendationsList.subscriptions),
    };
    const docId = docRef.id;
    docRef.set(docData).then(() => {
        response.send({id: docId});
    });
});
