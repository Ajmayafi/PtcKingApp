import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB5GQJchhWr-4DBKnG_lfaZO5I8Lbj7PQY",
  authDomain: "ptcking-e7f99.firebaseapp.com",
  projectId: "ptcking-e7f99",
  storageBucket: "ptcking-e7f99.appspot.com",
  messagingSenderId: "1027041218081",
  appId: "1:1027041218081:web:f6609565c792beb8fe1d60"
};

const app = initializeApp(firebaseConfig)

export const auth = getAuth(app);
export const db = getFirestore(app);