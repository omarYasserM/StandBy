import { initializeApp } from "firebase/app";
import { enableIndexedDbPersistence, getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyAGaZVpMX1YZVNY8U5GYvuLbn4610d3fSc",
  authDomain: "standby-e4a3a.firebaseapp.com",
  projectId: "standby-e4a3a",
  storageBucket: "standby-e4a3a.appspot.com",
  messagingSenderId: "968894643985",
  appId: "1:968894643985:web:55d67a5ff368d7b66856b0",
  measurementId: "G-8GJL40QP83",
};

initializeApp(firebaseConfig);

export const db = getFirestore();
enableIndexedDbPersistence(db).catch((err) => {
  if (err.code == "failed-precondition") {
    // Multiple tabs open, persistence can only be enabled
    // in one tab at a a time.
    // ...
  } else if (err.code == "unimplemented") {
    // The current browser does not support all of the
    // features required to enable persistence
    // ...
  }
});
export const auth = getAuth();
