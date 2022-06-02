// This file does not include the layout for the main website.
// "App" rendering function defaults to display the imported "Home" webpage.

import React, { useEffect, useRef, useState, Component } from 'react'
import ReactDOM from 'react-dom/client'
import "./css/App.css";
import "./css/body_style.css";
import "./css/header_style.css";

import CardContainer from "./MainMenu/flipcards.js";
import {RenderData} from "./renderFuncs/renderTimeData";
import {UserInput} from "./renderFuncs/userInput";
import Greeting from './renderFuncs/userGreeting.js';

import { BrowserRouter as Router, 
        Switch, 
        Route, 
        Link, 
        Redirect,} from "react-router-dom";

import Home from "./Home";
// import card backs
import BCafeBack from "./cardBacks/BCafeCard";
import BPlateBack from "./cardBacks/BPlateCard";
import DeNeveBack from './cardBacks/DeNeveCard';
import EpicuriaBack from './cardBacks/EpicuriaCard';

// ------------------ Main rendering class component ------------------
function App() {  

  return (
      <div>
        
      <Router>        
        <Switch>
          {/* This route is for home component 
          with exact path "/", in component props 
          we passes the imported component*/}
          <Route exact path="/" component={Home} />
          <Route path="/BCafeCard" component={BCafeBack} />
          <Route path="/BPlateCard" component={BPlateBack} />
          <Route path="/DeNeveCard" component={DeNeveBack} />
          <Route path="/EpicuriaCard" component={EpicuriaBack} />
            
          {/* If any route mismatches the upper 
          route endpoints then, redirect triggers 
          and redirects app to home component with to="/" */}
          <Redirect to="/" />
          </Switch>
      </Router>

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
