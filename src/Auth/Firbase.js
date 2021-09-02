import firebase from "firebase";
import "firebase/auth";
const firbaseConfig = {
  apiKey: "AIzaSyBhTE0_EoULtKk6vgwW0_5I-VtLCQq08Uk",
  authDomain: "react-all-4d316.firebaseapp.com",
  databaseURL: "https://react-all-4d316-default-rtdb.firebaseio.com",
  projectId: "react-all-4d316",
  storageBucket: "react-all-4d316.appspot.com",
  messagingSenderId: "538263269672",
  appId: "1:538263269672:web:f1cd24639696dec9d6201d",
  measurementId: "G-HJ9CNP4D66",
};
const firebaseApp = firebase.initializeApp(firbaseConfig);

export const auth = firebaseApp.auth();
const db = firebaseApp.firestore();
const projectStorage = firebase.storage();
const timestamp = firebase.firestore.FieldValue.serverTimestamp;
const fieldInc = firebase.firestore.FieldValue.increment(1);
const fieldDec = firebase.firestore.FieldValue.increment(-1);
export { projectStorage, timestamp, fieldInc, fieldDec };
export default db;
