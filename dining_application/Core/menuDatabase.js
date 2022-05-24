// import { collection, getDocs, getDoc, doc } from "firebase/firestore";
// import { db } from "./Config";

// export default function readMenus() {
//     const menuArray = []; 
//     console.log("Hello"); 
//     getDoc(doc(db, "Chicken", "Hello")).then((querySnapShot) => {
//         console.log(querySnapShot.data()); 
//     }).catch((e) => alert(e))
//     return menuArray; 
// }

import { collection, getDoc, getDocs,  } from "firebase/firestore";
import { db } from "./Config";

export default async function readTimes(diningHall) {
    const mealTimes = ["breakfast", "lunch", "dinner", "late_night"];
    const fullMenuArray = new Map();  
    for(let i = 0; i < mealTimes.length; i++)
    {
        const menuArray = new Map();  
        const querySnapshot = await getDocs(collection(db, "menu", diningHall, mealTimes[i])); 
        querySnapshot.forEach((doc) => {
            menuArray.set(doc.id, doc.data()); 
        });
        if(menuArray.length !== 0)
        {
            fullMenuArray.set(mealTimes[i], menuArray);
        }
    }
    return fullMenuArray; 
}
