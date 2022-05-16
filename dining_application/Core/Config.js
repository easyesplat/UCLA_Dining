import { initializeApp } from 'firebase/app';
import { getFirestore, setDoc, doc, getDoc } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyB2WzKvsGyagffu4sZ3AVjWfmW_HJFxG0Y",
    authDomain: "ucla-dining.firebaseapp.com",
    projectId: "ucla-dining",
    storageBucket: "ucla-dining.appspot.com",
    messagingSenderId: "517969650307",
    appId: "1:517969650307:web:dce5846931fc1e6a72f1b6",
    measurementId: "G-LPLE8Y3HZD"
};



export const app = initializeApp(firebaseConfig);

export const db = getFirestore(app); 

// const docRef = doc(db, "time", "breakfast");
// const docSnap = await getDoc(docRef);

// if (docSnap.exists()) {
//     console.log("Document data:", docSnap.data());
// } else {
//   // doc.data() will be undefined in this case
//     console.log("No such document!");
// }