import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";
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

//collection

//get data
