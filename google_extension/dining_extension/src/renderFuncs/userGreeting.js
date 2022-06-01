import React, { useState } from 'react'
import "../css/body_style.css";

let hours = new Date().getHours();
let greeting = "Dining halls are closed.";
if (hours >= 7 && hours < 10) {
    greeting = "Dining halls open for breakfast.";
} else if (hours >= 10 && hours < 11) {
    greeting = "Dining halls are closed until 11:00 am for lunch.";
} else if (hours >= 11 && hours < 15) {
    greeting = "Dining halls open for lunch.";
} else if (hours >= 15 && hours < 17) {
    greeting = "Dining halls are closed until 17:00 am for dinner.";
} else if (hours >= 17 && hours < 21) {
    greeting = "Dining halls open for dinner.";
} else if (hours >= 21 || hours < 24) {
    greeting = "Some places are open for late night!";
} else if (hours >= 24 || hours < 5) {
    greeting = "Dining halls are closed in early mornings. Period.";
} else if (hours >= 5 || hours < 7) {
    greeting = "Dining halls are closed until 7:00 am for breakfast.";
}

export default function Greeting() {
    return(
    <div className='dining_hall_open'>
        {greeting}
    </div>
    )
}
