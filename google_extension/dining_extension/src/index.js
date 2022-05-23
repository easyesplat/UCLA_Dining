import React, { useEffect, useRef, useState, Component } from 'react'
import ReactDOM from 'react-dom/client'
import "./css/App.css";
import "./css/body_style.css";
import "./css/header_style.css";
//import { Link, animateScroll as scroll } from "react-scroll";

//import firebase from "firebase/compat/app";
//import db from './firebase.config.js';
//import "firebase/compat/firestore";


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

function WindowSize() {
  const [count, setCount] = useState(0);
  const [width, setWidth] = React.useState(window.innerWidth);
  const [height, setHeight] = React.useState(window.innerHeight);

  return (
    <div>
      <div>{`Window width = ${width}`}</div>
      <div>{`Window height = ${height}`}</div>
    </div>
  );
}

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

/* FireStore data loading (commented out; have been basically tested to work)
function PrintData() {
  const [BPlateInfo, setLists] = useState([]);

  useEffect(() => {
    var BPlateInfo  = {
      breakfast: "",
      lunch: "",
      dinner: "",
      late_night: ""
    };

  // Get data in JS objects
	db.collection("time")
		.get()
		.then((querySnapshot) => {
      let BPlateBreakfast = querySnapshot.docs[1].data().breakfast;
      BPlateInfo.breakfast = BPlateBreakfast;
			//querySnapshot.forEach((doc) => {
			//	console.log(doc.data());
			//});
      //setLists(BPlateInfo);
		});
  }, []);
  return BPlateInfo;
}
*/

function PrintTime() {
  // (Hard-coded for testing, firebase code below is commented out)
  var BPlateInfo = {
    breakfast: "7am - 10am",
    lunch: "11am - 3pm",
    dinner: "5pm - 9pm",
    late_night: ""
  };

  //let BPlateInfo = PrintData();  // print real-time data
  return (
    <div className="App">
      <p> BPlate info printed from firebase: </p>
      <p> Brekafast: {BPlateInfo.breakfast} </p>
      <p> Lunch: {BPlateInfo.lunch} </p>
      <p> Dinner: {BPlateInfo.dinner} </p>
    </div>
  )
}

// ------------------ Main rendering class component ------------------
class App extends Component {
  
  // State
  constructor(props) {
    super(props);
    this.state = {
      BPlateData: "",
    };
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
        <PrintTime />
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
