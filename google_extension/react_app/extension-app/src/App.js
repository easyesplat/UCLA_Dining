import React, {useEffect} from "react";
import logo from "./logo.svg";
import "./App.css";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

function App() {
  
  useEffect(() => {
	  firebase.initializeApp({
		  apiKey: "AIzaSyB2WzKvsGyagffu4sZ3AVjWfmW_HJFxG0Y",
		  authDomain: "ucla-dining.firebaseapp.com",
		  projectId: "ucla-dining",
	  });
	  
	let db = firebase.firestore();
	db.collection("time")
		.get()
		.then((querySnapshot) => {
			querySnapshot.forEach((doc) => {
				console.log(doc.data());
			});
		});
  }, []);
  
  
  
  
  
  
  
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;