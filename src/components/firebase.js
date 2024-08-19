import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDcDT6_YwFCdV-rTmWpPg4AU_TZuWkozU0",
  authDomain: "myduka-7a96c.firebaseapp.com",
  projectId: "myduka-7a96c",
  storageBucket: "myduka-7a96c.appspot.com",
  messagingSenderId: "605956557028",
  appId: "1:605956557028:web:54ce760fd340f6c3e8c4f1",
  measurementId: "G-L282JV82EF",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const auth = firebase.auth();
const firestore = firebase.firestore();

export { auth, firestore };
