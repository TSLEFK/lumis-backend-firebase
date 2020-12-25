import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

const serviceAccount = require("../config/firestore_secret_key.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://lumis-project-test.firebaseio.com"
});

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

    const users = read_collection();
    // response.redirect(303, value.ref.toString());

    let names = get_names(users);

    response.send("Hello from Firebase!" + names);
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
  let document_data: { [key: string]: FirebaseFirestore.DocumentData } = {};
  db.collection("users")
    .get()
    .then(snapshot => {
      snapshot.forEach(doc => {
        console.log(doc.id, "=>", doc.data());
        document_data[doc.id] = doc.data();
      });
    })
    .catch(err => {
      console.error(err);
    });

  return document_data;
}

function get_names(data: any) {
  let names: any[] = [];
  data.array.forEach((user: any) => {
    console.log(user);
    names.push(user);
  });
  return name;
}
