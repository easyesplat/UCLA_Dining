// import { collection, getDocs } from "firebase/firestore";
// import { db } from "./Config";
// export const TimeData = async () => {
//     const querySnapshot = await getDocs(collection(db, "time"));
//     console.log("Hello")
//     querySnapshot.forEach((doc) => {
//         console.log(doc.id, " => ", doc.data());
//     })
// }

import { collection, getDocs } from "firebase/firestore";
import { db } from "./Config";

export default async function readTimes() {
    const timeArray = []; 
    // const timeMap = new Map(); 
    const querySnapshot = await getDocs(collection(db, "time"));
    querySnapshot.forEach((doc) => {
        //timeMap.set(doc.id, doc.data()); 
        let newEntry = {name : doc.id, data : doc.data()}
        timeArray.push(newEntry); 
    });

    return timeArray; 
    
    // return timeMap; 
}


