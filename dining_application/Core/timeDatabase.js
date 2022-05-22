import { collection, getDocs } from "firebase/firestore";
import { db } from "./Config";

export default async function readTimes() {
    const timeArray = []; 
    const querySnapshot = await getDocs(collection(db, "time"))
    querySnapshot.forEach((doc) => {
        let newEntry = {name : doc.id, data : doc.data()}
        timeArray.push(newEntry); 
    });

    return timeArray; 
}


