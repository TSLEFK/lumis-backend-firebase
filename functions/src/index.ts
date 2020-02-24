import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

admin.initializeApp(functions.config().firebase);

let db = admin.firestore();

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//

export const lumisPing = functions
  .region("asia-northeast1")
  .https.onRequest((request, response) => {
    response.send("pong");
  });

export const helloWorld = functions
  .region("asia-northeast1")
  .https.onRequest((request, response) => {
    // console.log(request);
    const text = request.query.text;

    create_collection(text, "buzz", 0);

    const ary = read_collection();
    // response.redirect(303, value.ref.toString());
    response.send("Hello from Firebase!" + ary);
  });

function create_collection(first: string, last: string, id: number) {
  db.collection("users")
    .add({
      first: first,
      last: last,
      id: id
    })
    .then(doc => {
      console.log("Insert done");
    })
    .catch(error => {
      console.error(error);
    });
}

function read_collection() {
  let ary: { key?: string } = {};
  db.collection("users")
    .get()
    .then(snapshot => {
      snapshot.forEach(doc => {
        console.log(doc.id, "=>", doc.data());
        ary["key"] = doc.data().toString();
      });
      return ary;
    })
    .catch(err => {
      console.error(err);
    });
}
