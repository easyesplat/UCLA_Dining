import React, { useEffect, useRef, useState, Component } from 'react'
import ReactDOM from 'react-dom/client'
import "./css/App.css";
import "./css/body_style.css";
import "./css/header_style.css";
//import { Link, animateScroll as scroll } from "react-scroll";

import firebase from "firebase/compat/app";
import React, { useEffect, useRef, useState, Component } from 'react'
import ReactDOM from 'react-dom/client'
import "./css/App.css";
import "./css/body_style.css";
import "./css/header_style.css";

import {ButtonGroup, RenderData} from "./renderFuncs/renderData";
import {UserInput} from "./renderFuncs/userInput";
//import { Link, animateScroll as scroll } from "react-scroll";


// ----------------- Functions for main page rendering --------------------
function MainMenu() {
  return (
    <div className="App">
      <div className="container">
        <img src={require("./assets/diningHallImages/bplateimage.jpg")} />
        <button className="btn">BPlate</button>
      </div>
      <div className="container">
        <img src={require("./assets/diningHallImages/deneve.jpg")} />
        <button className="btn">DeNeve</button>
      </div>
      <div className="container">
        <img src={require("./assets/diningHallImages/epicimage.jpeg")} />
        <button className="btn">Epicuria</button>
      </div>
    </div>
  )
}


// ------------------ Main rendering class component ------------------
function App() {  
  // Hook States

  return (
      <div className="App">
        <div className="topbar">
            <h1> Bear Food Extension </h1>
            <div className="navbar">
                <a href="index.html"> Home </a>
                <a href="https://menu.dining.ucla.edu/hours/">Hours</a>
            <div className="dropdown">
                <button className="dropbtn">Dining Hall Links &#x25BE;
                    <i className="fa fa-caret-down"></i>
                </button>
                <div className="dropdown-content">
                    <a href="http://menu.dining.ucla.edu/Menus/BruinPlate/Today" onClick={function() { console.log('click'); }}>BruinPlate</a>
                    <a href="https://menu.dining.ucla.edu/Menus/DeNeve/Today">De Neve</a>
                    <a href="https://menu.dining.ucla.edu/Menus/Epicuria/Today">Epicuria</a>
                </div>
            </div>
            </div>
        
        <p> Display Data: </p>
          <ButtonGroup buttons={["BPlate", "De Neve", "Epicuria"]} />
        
          <div> <RenderData /> </div>
          <MainMenu />
        </div>
        
      </div>
  )
}

export default App;
