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
      <div>
        <div className="topbar">
            <h1> BruinDish </h1>
            <div className="navbar">
                <a href="index.html"
                   className="App-link"
                   target="_blank"
                   rel="noopener noreferrer"> Home </a>
                <a href="https://menu.dining.ucla.edu/hours/"
                   className="App-link"
                   target="_blank"
                   rel="noopener noreferrer">Hours</a>
            </div>
        </div>
        
        <h2> <Greeting /> </h2>
        <CardContainer />
        {/*
		
		<div>
          <p> Click on the first box to display realtime capacity data:</p>
          <p> We could show wait times on the back of the flip cards </p>
          <RenderData /> 
          <p> <br></br> </p>
        </div>
		
		*/}
		
		
		
      </div>
  )
}

export default App;
