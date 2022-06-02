import LOCATION_DATA from "../data/diningLocationData";

function findDistance(lat1, lon1, lat2, lon2) {
    const R = 6371e3; // metres
    const φ1 = lat1 * Math.PI / 180; // φ, λ in radians
    const φ2 = lat2 * Math.PI / 180;
    const Δφ = (lat2 - lat1) * Math.PI / 180;
    const Δλ = (lon2 - lon1) * Math.PI / 180;

    const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
        Math.cos(φ1) * Math.cos(φ2) *
        Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const d = R * c; // in metres

    return d; 
}

export default function diningLocationInformation(userLat, userLong, openDiningHall) {
    let minDistance = 400; 
    let closestDiningHall = ""; 
    let closeEnoughForSurvey = false; 
    let OnHill = true;
    let distances = []; 

    for (let i in LOCATION_DATA) {
        if (!openDiningHall.includes(LOCATION_DATA[i].name)) {
            continue; 
        }

        let distance = findDistance(userLat, userLong, LOCATION_DATA[i].latitude, LOCATION_DATA[i].longitude);

        if (distance < minDistance) {
            minDistance = distance; 
            closestDiningHall = LOCATION_DATA[i].name;
        }
        distances.push({
            name: LOCATION_DATA[i].name,
            distance: distance,
        })
    }

    distances.sort((a, b) => {
        return a.distance - b.distance; 
    })

    if (minDistance === 400) {
        closestDiningHall = ""
        OnHill = false; 
    }

    if (minDistance < 35) {
        closeEnoughForSurvey = true; 
    }

    return {
        closest: closestDiningHall, 
        distance: minDistance,
        survey: closeEnoughForSurvey,
        all: distances, 
        notOnHill: OnHill, 
    }; 
}
