import React, { useEffect, useRef, useState, Component } from 'react'
import ReactDOM from 'react-dom/client'
import "./css/App.css";
import "./css/body_style.css";
import "./css/header_style.css";
//import { Link, animateScroll as scroll } from "react-scroll";

import firebase from "firebase/compat/app";
import {firebaseConfig, firebaseInit} from './firebase.config.js';
import "firebase/compat/firestore";
import { DataSnapshot, getDatabase, ref, child, get } from "firebase/database";

// ------------- Initialize Firestore & Realtime DB data ----------------
const firebaseApp = firebase.initializeApp(firebaseInit);
let db = firebase.firestore();
let dbrt = ref(getDatabase(firebaseApp));

// ----------------- Functions for basic rendering --------------------
const ButtonGroup = ({ buttons, doSomethingAfterClick }) => {
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

function MainMenu() {
  return (
    <div class="App">
      <div class="container">
        <img src={require("./assets/diningHallImages/bplateimage.jpg")} />
        <button class="btn">BPlate</button>
      </div>
      <div class="container">
        <img src={require("./assets/diningHallImages/deneve.jpg")} />
        <button class="btn">DeNeve</button>
      </div>
      <div class="container">
        <img src={require("./assets/diningHallImages/epicimage.jpeg")} />
        <button class="btn">Epicuria</button>
      </div>
    </div>
  )
}

// FireStore Database data loading
function BPlateData() {
  var BPlateInfo = {
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

// Realtime Database data loading
function RT_DeNeveData() {
  var DeNeveTime = {
    level: "",
    percentage: 0
  };

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

// ------------------ Main rendering class component ------------------
class App extends Component {
  
  // State: data objects for passing around functions
  constructor(props) {
    super(props);
    this.state = {
      BPlateTime: {
        breakfast: "",
        lunch: "",
        dinner: "",
        late_night: ""
      },
      DeNeveBusy: {
        level: "",
        percentage: 0
      },
      dataLoaded: false
    };
  }

  loadData() {
    if (this.state.dataLoaded == false) {
      let BPlateInfo = BPlateData();
      this.setState({BPlateTime: BPlateInfo});
      let DeNeveTime = RT_DeNeveData();
      this.setState({DeNeveBusy: DeNeveTime});
      this.setState({dataLoaded: true});
    }
    console.log(this.state.BPlateTime);
    console.log(this.state.DeNeveBusy);
  }

    render() {      
    return (
      <div className="App">
        <div className="topbar">
            <h1> Bear Food Extension </h1>
            <div class="navbar">
                <a href="index.html"> Home </a>
                <a href="https://menu.dining.ucla.edu/hours/">Hours</a>
            <div class="dropdown">
                <button class="dropbtn">Dining Hall Links &#x25BE;
                    <i class="fa fa-caret-down"></i>
                </button>
                <div class="dropdown-content">
                    <a href="http://menu.dining.ucla.edu/Menus/BruinPlate/Today" onClick={function() { console.log('click'); }}>BruinPlate</a>
                    <a href="https://menu.dining.ucla.edu/Menus/DeNeve/Today">De Neve</a>
                    <a href="https://menu.dining.ucla.edu/Menus/Epicuria/Today">Epicuria</a>
                </div>
            </div>
        </div>
        <br></br>
        <p> Display Data: </p>
        <ButtonGroup buttons={["BPlate", "De Neve", "Epicuria"]} />
        <button className="btn" onClick={() => this.loadData()}>
          LOAD DATA
        </button>
        <MainMenu />
           
        </div>
        
      </div>
    )
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
