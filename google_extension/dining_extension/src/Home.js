import React from "react";
// importing Link from react-router-dom to navigate to 
// different end points.
import { Link } from "react-router-dom";
import CardContainer from "./MainMenu/flipcards.js";
import Greeting from './renderFuncs/userGreeting.js';

const Home = () => {
  return (
    <div>
      <div className="topbar">
            <h1> BruinDish </h1>
            <div className="navbar">
                <Link to="/">Home</Link>
                <a href="https://menu.dining.ucla.edu/hours/"
                   className="App-link"
                   target="_blank"
                   rel="noopener noreferrer">Hours</a>
            </div>
        </div>
        <h2> <Greeting /> </h2>
        <CardContainer />
        <li>
          {/* Endpoint to route to About component */}
          <Link to="/about">About</Link>
        </li>
        <li>
          {/* Endpoint to route to Contact Us component */}
          <Link to="/contactus">Contact Us</Link>
        </li>

    </div>
  );
};
  
export default Home;