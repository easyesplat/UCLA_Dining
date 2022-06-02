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
  const [teststr, setteststr] = useState("");
  const [dataLoaded, setdataLoaded] = useState(false);  // true after one load
  const [BPlateInfo, setBPlateInfo] = useState("");

  const [AllTime, setAllTime] = useState("");
  const [BCTime, setBCTime] = useState("");
  const [BPTime, setBPTime] = useState("");
  const [DNTime, setDNTime] = useState("");
  const [EPTime, setEPTime] = useState("");
  const [RWTime, setRWTime] = useState("");
  const [RETime, setRETime] = useState("");
  const [FETime, setFETime] = useState("");
  const [STTime, setSTTime] = useState("");

  const [displayTime, setdisplayTime] = useState("");  // display on card back based on classType

  function loadData() {
    if (dataLoaded == false) {
      // Hard-coded Firestore data for testing
      let BPlateInfoData = {
        breakfast: "7-10",
        lunch: "11-3",
        dinner: "5-9",
        late_night: "N/A"
      };
      setBPlateInfo(BPlateInfoData);

      // Capacity data
      let DeNeveTime = {
        level: 'slightly busy: 10%',
        percentage: 10
      };
      let BCafeTime = {
        level: 'getting busy: 30%',
        percentage: 30
      };
      let BPlateTime = {
        level: 'not too busy: 8%',
        percentage: 8
      };
      let EpicuriaTime = {
        level: 'not too busy: 5%',
        percentage: 5
      };
      let RendeWestTime = {
        level: 'not too busy: 15%',
        percentage: 15
      };
      let RendeEastTime = {
        level: 'not too busy: 16%',
        percentage: 16
      };
      let FeastTime = {
        level: 'not too busy: 17%',
        percentage: 17
      };
      let StudyTime = {
        level: 'not too busy: 18%',
        percentage: 18
      };
      let AllTimeData = {
        DN: DeNeveTime.level,
        BC: BCafeTime.level,
        BP: BPlateTime.level,
        EP: EpicuriaTime.level,
        RW: RendeWestTime.level,
        RE: RendeEastTime.level,
        FE: FeastTime.level,
        ST: StudyTime.level
      }
      setAllTime(AllTimeData);
      setBCTime(AllTimeData.BC)
      setBPTime(AllTimeData.BP)
      setDNTime(AllTimeData.DN)
      setEPTime(AllTimeData.EP)
      setRWTime(AllTimeData.RW)
      setRETime(AllTimeData.RE)
      setFETime(AllTimeData.FE)
      setSTTime(AllTimeData.ST)
      setdataLoaded(true);

      // Assign display based on which card
      if (classType == 'bc') {
        setdisplayTime(AllTimeData.BC);
      } else if (classType == 'bp') {
        setdisplayTime(AllTimeData.BP);
      } else if (classType == 'dn') {
        setdisplayTime(AllTimeData.DN);
      } else if (classType == 'ep') {
        setdisplayTime(AllTimeData.EP);
      } else if (classType == 'rw') {
        setdisplayTime(AllTimeData.RW);
      } else if (classType == 're') {
        setdisplayTime(AllTimeData.RE);
      } else if (classType == 'fe') {
        setdisplayTime(AllTimeData.FE);
      } else if (classType == 'st') {
        setdisplayTime(AllTimeData.ST);
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
