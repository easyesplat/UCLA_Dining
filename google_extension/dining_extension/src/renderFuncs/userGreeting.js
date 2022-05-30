import React, { useEffect, useState } from 'react'
let hours = new Date().getHours();

let greeting = "Good Morning";
if (hours > 11 && hours < 18) {
    greeting = "Good Afternoon";
} else if (hours > 17 && hours < 21) {
    greeting = "Good Evening";
} else if (hours > 20 || hours < 4) {
    greeting = "Good Night";
}

export default function Greeting() {
    return(
    <div>
        {greeting}
        
    </div>
    )
}
