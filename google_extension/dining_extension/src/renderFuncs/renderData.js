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


function RT_DeNeveData() {
    var DeNeveTime = {
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
  console.log(DeNeveTime);
  return DeNeveTime;
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
  const [teststr, setteststr2] = useState("Click to load user input");
  const [dataLoaded, setdataLoaded] = useState(false);
  const [BPlateInfo, setBPlateInfo] = useState("");
  const [AllTime, setAllTime] = useState("");
  const [BCTime, setBCTime] = useState({level: "", percentage: 0});
  const [BPTime, setBPTime] = useState({level: "", percentage: 0});
  const [DNTime, setDNTime] = useState({level: "", percentage: 0});
  const [EPTime, setEPTime] = useState({level: "", percentage: 0});

  function NameChange(e) {
    setname(e.target.value);
    setteststr2(name);
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
        DN: DeNeveTime,
        BC: BCafeTime,
        BP: BPlateTime,
        EP: EpicuriaTime
      }
      setAllTime(AllTimeData);
      setBCTime(AllTimeData.BC)
      setBPTime(AllTimeData.BP)
      setDNTime(AllTimeData.DN)
      setEPTime(AllTimeData.EP)
      setdataLoaded(true);
    }
    console.log(AllTime);
  }
  
// Click on first box to display all wait times
function renderSquares() {
  return (
    <dir>
    <Square 
      value = {"Bruin Café is " + BCTime.level}
      onClick={() => loadData()}
    />
    <dir>
    <Square 
      value = {"Bruin Plate is " + BPTime.level}
    />
    <Square 
      value = {"DeNeve is " + DNTime.level}
    />
    <Square 
      value = {"Epicuria is " + EPTime.level}
    />
    </dir>
    </dir>
  );
}
function renderInput() {
  return (
    <Square 
      value = {teststr}
      onClick={() => NameChange()}
    />
  );
}

return (
  <div>
    <input 
      value = {name}
      onChange = {NameChange}
    />
    <div className="board-row"> 
      {renderSquares()} 
    </div>
    
  </div>
)
}





// ButtonGroup formatting
export const ButtonGroup = ({ buttons, doSomethingAfterClick }) => {
  const [clickedId, setClickedId] = useState(-1);

  const handleClick = (event, id) => {
    setClickedId(id);
  };

  return (
    <>
      {buttons.map((buttonLabel, i) => (
        <button
          key={i}
          name={buttonLabel}
          onClick={(event) => handleClick(event, i)}
          className={i === clickedId ? "customButton active" : "customButton"}
        >
          {buttonLabel}
        </button>
      ))}
    </>
  );
};
