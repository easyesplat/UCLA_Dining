import React, { useEffect, useState } from 'react'

//import firebase from "firebase/compat/app";
//import {firebaseConfig, firebaseInit} from '../firebase.config.js';
//import "firebase/compat/firestore";
//import { DataSnapshot, getDatabase, ref, child, get } from "firebase/database";

// ------------- Initialize Firestore & Realtime DB data ----------------
/*
const firebaseApp = firebase.initializeApp(firebaseInit);
let db = firebase.firestore();
let dbrt = ref(getDatabase(firebaseApp));

function RT_DeNeveData() {
    var DeNeveTime = {
      level: "",
      percentage: 0
    };
    var BCafeTime = {
      level: "",
      percentage: 0
    };
    var BPlateTime = {
      level: "",
      percentage: 0
    };
    var EpicuriaTime = {
      level: "",
      percentage: 0
    };

   // Get data in JS objects
   get(child(dbrt, "density/De Neve/-N2wOhiL3q_o4V08Ejjl")).then((snapshot) => {
    if (snapshot.exists()) {
      DeNeveTime.level = snapshot.val().level;
      DeNeveTime.percentage = snapshot.val().percentage;
    } else {
      console.log("DEBUG: no data available");
    }
    }).catch((error) => {
    console.error(error);
  });
  get(child(dbrt, "density/Bruin Café/-N2wOi3AybbN3xZw2osg")).then((snapshot) => {
    if (snapshot.exists()) {
      BCafeTime.level = snapshot.val().level;
      BCafeTime.percentage = snapshot.val().percentage;
    } else {
      console.log("DEBUG: no data available");
    }
  })
  get(child(dbrt, "density/Bruin Plate/-N2wOhodV2rCVEQEGLPp")).then((snapshot) => {
    if (snapshot.exists()) {
      BPlateTime.level = snapshot.val().level;
      BPlateTime.percentage = snapshot.val().percentage;
    } else {
      console.log("DEBUG: no data available");
    }
  })
  get(child(dbrt, "density/Epicuria/-N2wOhc78iSJgJIjTCHH")).then((snapshot) => {
    if (snapshot.exists()) {
      EpicuriaTime.level = snapshot.val().level;
      EpicuriaTime.percentage = snapshot.val().percentage;
    } else {
      console.log("DEBUG: no data available");
    }
  })

  var AllTime = {
      DN: DeNeveTime,
      BC: BCafeTime,
      BP: BPlateTime,
      EP: EpicuriaTime
  }

  return AllTime;
}


function BPlateData() {
  let BPlateInfo = {
    breakfast: "",
    lunch: "",
    dinner: "",
    late_night: ""
  };

  db.collection("time")
		.get()
		.then((querySnapshot) => {
      let BPlateBreakfast = querySnapshot.docs[1].data().breakfast;
      BPlateInfo.breakfast = BPlateBreakfast;      
		});

  return BPlateInfo;
}
*/

// RENDERING FUNCTION DEFINITINOS
function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}


export function RenderData() {
  const [name, setname] = useState("");
  const [teststr, setteststr] = useState("");
  const [dataLoaded, setdataLoaded] = useState(false);  // true after one load
  const [BPlateInfo, setBPlateInfo] = useState("");
  const [AllTime, setAllTime] = useState("");
  const [BCTime, setBCTime] = useState("");
  const [BPTime, setBPTime] = useState("");
  const [DNTime, setDNTime] = useState("");
  const [EPTime, setEPTime] = useState("");

  function NameChange(e) {
    setname(e.target.value);
    setteststr(name);
  }

  function loadData() {
    if (dataLoaded === false) {
      // Hard-coded Firestore data for testing
      let BPlateInfoData = {
        breakfast: "7-10",
        lunch: "11-3",
        dinner: "5-9",
        late_night: "N/A"
      };
      setBPlateInfo(BPlateInfoData);

      // Hard-coded Realtime data for testing
      let DeNeveTime = {
        level: 'slightly busy: 10%',
        percentage: 10
      };
      var BCafeTime = {
        level: 'getting busy: 30%',
        percentage: 30
      };
      var BPlateTime = {
        level: 'not too busy: 8%',
        percentage: 8
      };
      var EpicuriaTime = {
        level: 'not too busy: 5%',
        percentage: 5
      };
      let AllTimeData = {
        DN: DeNeveTime.level,
        BC: BCafeTime.level,
        BP: BPlateTime.level,
        EP: EpicuriaTime.level
      }
      setAllTime(AllTimeData);
      setBCTime("Bruin Café is " + AllTimeData.BC)
      setBPTime("Bruin Plate is " + AllTimeData.BP)
      setDNTime("DeNeve is " + AllTimeData.DN)
      setEPTime("Epicuria is " + AllTimeData.EP)
      setdataLoaded(true);
    }
    console.log(AllTime);
  }
  
// Click on first box to display all capacity data/wait times
function renderSquares() {
  return (
    <dir>
      <Square 
        value = {BCTime}
        onClick={() => loadData()}
      />
    </dir>
  );
}

  // Render all time data
  return (
  <div>
      {renderSquares()} 
  </div>
  )
}
