import React, { useEffect, useState } from 'react'

import firebase from "firebase/compat/app";
import {firebaseConfig, firebaseInit} from '../firebase.config.js';
import "firebase/compat/firestore";
import { DataSnapshot, getDatabase, ref, child, get } from "firebase/database";

// ------------- Initialize Firestore & Realtime DB data ----------------
const firebaseApp = firebase.initializeApp(firebaseInit);
let db = firebase.firestore();
// let dbrt = ref(getDatabase(firebaseApp));

/*
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
*/

function allTimeData() {
  let BCafeTime = {
    level: "",
    percentage: 0
  };
  let BPlateTime = {
    level: "",
    percentage: 0
  };
  let DeNeveTime = {
    level: "",
    percentage: 0
  };
  let EpicuriaTime = {
    level: "",
    percentage: 0
  };
  let RendeWestTime = {
    level: "",
    percentage: 0
  };
  let RendeEastTime = {
    level: "",
    percentage: 0
  };
  let DreyTime = {
    level: "",
    percentage: 0
  };
  let StudyTime = {
    level: "",
    percentage: 0
  };

  db.collection("density")
		.get()
		.then((querySnapshot) => {
      // TODO: add time to the end of string
      BCafeTime.level = querySnapshot.docs[0].data().level + ": " + querySnapshot.docs[0].data().percentage.toString() + "%";
      BPlateTime.level = querySnapshot.docs[1].data().level + ": " + querySnapshot.docs[1].data().percentage.toString() + "%";
      DeNeveTime.level = querySnapshot.docs[2].data().level + ": " + querySnapshot.docs[2].data().percentage.toString() + "%";
      EpicuriaTime.level = querySnapshot.docs[3].data().level + ": " + querySnapshot.docs[3].data().percentage.toString() + "%";
      RendeWestTime.level = querySnapshot.docs[4].data().level + ": " + querySnapshot.docs[4].data().percentage.toString() + "%";
      RendeEastTime.level = querySnapshot.docs[4].data().level + ": " + querySnapshot.docs[4].data().percentage.toString() + "%";
      DreyTime.level = querySnapshot.docs[5].data().level + ": " + querySnapshot.docs[5].data().percentage.toString() + "%";
      StudyTime.level = querySnapshot.docs[6].data().level + ": " + querySnapshot.docs[6].data().percentage.toString() + "%";
    });

    var AllTime = {
      BC: BCafeTime,
      BP: BPlateTime,
      DN: DeNeveTime,
      EP: EpicuriaTime,
      RW: RendeWestTime,
      RE: RendeEastTime,
      FE: DreyTime,
      ST: StudyTime
    }
    return AllTime;      
}


// ------------------- Rendering functions -------------------------
// style "square" is in css/body_style.css
function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

export function RenderData(props) {
  const [classType] = useState(props.class_type);
  const [AllTimeData] = useState(allTimeData);  // store data in this object
  const [dataLoaded, setdataLoaded] = useState(false);  // true after one load
  const [displayTime, setdisplayTime] = useState("");  // display on card back based on classType

  function loadData() {
    if (dataLoaded == false) {
      // Avoid load again
      setdataLoaded(true);

      // Assign display based on which card
      if (classType == 'bc') {
        setdisplayTime(AllTimeData.BC.level);
      } else if (classType == 'bp') {
        setdisplayTime(AllTimeData.BP.level);
      } else if (classType == 'dn') {
        setdisplayTime(AllTimeData.DN.level);
      } else if (classType == 'ep') {
        setdisplayTime(AllTimeData.EP.level);
      } else if (classType == 'rw') {
        setdisplayTime(AllTimeData.RW.level);
      } else if (classType == 're') {
        setdisplayTime(AllTimeData.RE.level);
      } else if (classType == 'fe') {
        setdisplayTime(AllTimeData.FE.level);
      } else if (classType == 'st') {
        setdisplayTime(AllTimeData.ST.level);
      }
    }
  }
  
  // Click on the box to display capacity/wait time
  function renderSquares() {
    return (
      <dir>
        <Square 
          value = {displayTime}
          onClick={() => loadData()}
        />
      </dir>
    );
  }

  // Render
  return (
    <div>
      {renderSquares()} 
    </div>
  )
}
