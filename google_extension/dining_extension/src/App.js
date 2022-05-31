import React, { useEffect, useRef, useState, Component } from 'react'
import ReactDOM from 'react-dom/client'
import "./css/App.css";
import "./css/body_style.css";
import "./css/header_style.css";

import CardContainer from "./MainMenu/flipcards.js";
import {RenderData} from "./renderFuncs/renderTimeData";
import {UserInput} from "./renderFuncs/userInput";
import Greeting from './renderFuncs/userGreeting.js';

// ------------------ Main rendering class component ------------------
function App() {  

  return (
      <div className="body">
        <div className="topbar">
            <h1> Bear Food Extension </h1>
            <h2> <Greeting /> </h2>
            <div className="navbar">
                <a href="index.html"
                   className="App-link"
                   target="_blank"
                   rel="noopener noreferrer"> Home </a>
                <a href="https://menu.dining.ucla.edu/hours/"
                   className="App-link"
                   target="_blank"
                   rel="noopener noreferrer">Hours</a>
            <div className="dropdown">
                <button className="dropbtn">Dining Hall Links &#x25BE;
                    <i className="fa fa-caret-down"></i>
                </button>
                <div className="dropdown-content">
                    <a href="http://menu.dining.ucla.edu/Menus/BruinPlate/Today" 
                       className="App-link"
                       target="_blank"
                       rel="noopener noreferrer">BruinPlate</a>
                    <a href="https://menu.dining.ucla.edu/Menus/DeNeve/Today"
                       className="App-link"
                       target="_blank"
                       rel="noopener noreferrer"> De Neve </a>
                    <a href="https://menu.dining.ucla.edu/Menus/Epicuria/Today"
                       className="App-link"
                       target="_blank"
                       rel="noopener noreferrer">Epicuria</a>
                </div>
            </div>
            </div>
        </div>
        <p> <br></br> <br></br> </p>
        <div>
          <p> Click 'Home' to refresh page & reload data</p>
          <p> Click on the first box to display realtime capacity data:</p>
          <p> We could show wait times on the back of the flip cards </p>
          <RenderData /> 
          <p> <br></br> </p>
        </div>
        <CardContainer />
      </div>
  )
}

export default App;
