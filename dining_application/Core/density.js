import { collection, getDocs } from "firebase/firestore";
import { db } from "./Config";

export default async function readDensity() {
    const densityArray = []; 
    const querySnapshot = await getDocs(collection(db, "density"))
    querySnapshot.forEach((doc) => {
        let newEntry = {name : doc.id, data : doc.data()}
        densityArray.push(newEntry); 
    });

    return densityArray; 
}