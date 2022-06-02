import React from "react";
import { Link } from "react-router-dom";

const BCafeBack = () => {
  return (
    <div>
      <div className="topbar">
            <h1> Bruin Café </h1>
            <div className="navbar">
                <Link to="/">Home</Link>
                <a href="https://menu.dining.ucla.edu/hours/"
                   className="App-link"
                   target="_blank"
                   rel="noopener noreferrer">Hours</a>
            </div>
      </div>

    </div>
  );
};

export default BCafeBack;