import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBJJ_q35E52jAfBUQbHLJ_VFUE9zhD-r9s",
  authDomain: "campus-rail-connect.firebaseapp.com",
  projectId: "campus-rail-connect",
  storageBucket: "campus-rail-connect.firebasestorage.app",
  messagingSenderId: "658784198007",
  appId: "1:658784198007:web:26a730efe8bdd552461572",
  measurementId: "G-0FPYFC8821"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);