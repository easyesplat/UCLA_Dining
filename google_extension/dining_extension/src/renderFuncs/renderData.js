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
    const [teststr, setteststr] = useState("Click to load BPlate data");
    const [teststr2, setteststr2] = useState("Click to load user input");
    const [dataLoaded, setdataLoaded] = useState(false);
    const [BPlateInfo, setBPlateInfo] = useState("");
    const [DeNeveBusyInfo, setDeNeveBusyInfo] = useState("");

    function NameChange(e) {
      setname(e.target.value);
      setteststr2(name);
    }

    function loadData() {
      if (dataLoaded === false) {
        let BPlateLoadData = {
          breakfast: "7-10",
          lunch: "11-3",
          dinner: "5-9",
          late_night: "N/A"
        };
        setBPlateInfo(BPlateLoadData);
        setteststr(BPlateLoadData.breakfast);
        let DeNeveTime = {
          level: 'slightly busy',
          percentage: 10
        };
        setDeNeveBusyInfo(DeNeveTime);
        setdataLoaded(true);
      }
      console.log(BPlateInfo);
      console.log(DeNeveBusyInfo);
    }
    
  function renderSquare() {
    return (
      <Square 
        value = {teststr}
        onClick={() => loadData()}
      />
    );
  }
  function renderInput() {
    return (
      <Square 
        value = {teststr2}
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
      <div className="board-row"> {renderSquare()} {renderInput()} </div>
      
    </div>
  )
}
