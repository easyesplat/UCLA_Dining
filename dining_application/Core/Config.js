import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getDatabase } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyB2WzKvsGyagffu4sZ3AVjWfmW_HJFxG0Y",
    authDomain: "ucla-dining.firebaseapp.com",
    databaseURL: "https://ucla-dining-default-rtdb.firebaseio.com",
    projectId: "ucla-dining",
    storageBucket: "ucla-dining.appspot.com",
    messagingSenderId: "517969650307",
    appId: "1:517969650307:web:dce5846931fc1e6a72f1b6",
    measurementId: "G-LPLE8Y3HZD"
};

export const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export const auth = getAuth(app);

export const database = getDatabase(app); 