import { collection, getDocs } from "firebase/firestore";
import { db } from "./Config";

export default async function readAllItems() {
    const diningHall = ["Epicuria", "Bruin Plate", "De Neve", "Rendezvous", "Bruin Café", "Spice Kitchen at Feast", "Bruin Bowl", "The Study at Hedrick", "The Drey"];
    const allMenuArray = new Map();
    for (let name in diningHall) {
        const mealTimes = ["breakfast", "lunch", "dinner", "late_night"];
        const fullMenuArray = new Map();
        for (let i = 0; i < mealTimes.length; i++) {
            const menuArray = new Map();
            const querySnapshot = await getDocs(collection(db, "menu", diningHall[name], mealTimes[i]));
            querySnapshot.forEach((doc) => {
                menuArray.set(doc.id, doc.data());
            });
            if (menuArray.length !== 0) {
                fullMenuArray.set(mealTimes[i], menuArray);
            }
        }
        if (fullMenuArray.length !== 0) {
            allMenuArray.set(diningHall[name], fullMenuArray);
        }
    }

    return allMenuArray;
}
