import React, { useEffect, useState } from 'react'

import firebase from "firebase/compat/app";
import {firebaseConfig, firebaseInit} from '../firebase.config.js';
import "firebase/compat/firestore";
import { DataSnapshot, getDatabase, ref, child, get } from "firebase/database";

// ------------- Initialize Firestore & Realtime DB data ----------------
const firebaseApp = firebase.initializeApp(firebaseInit);
let db = firebase.firestore();
// let dbrt = ref(getDatabase(firebaseApp));

/*
function RT_DeNeveData() {
    var DeNeveTime = {
      level: "",
      percentage: 0
    };
    var BCafeTime = {
      level: "",
      percentage: 0
    };
    var BPlateTime = {
      level: "",
      percentage: 0
    };
    var EpicuriaTime = {
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
  get(child(dbrt, "density/Bruin Café/-N2wOi3AybbN3xZw2osg")).then((snapshot) => {
    if (snapshot.exists()) {
      BCafeTime.level = snapshot.val().level;
      BCafeTime.percentage = snapshot.val().percentage;
    } else {
      console.log("DEBUG: no data available");
    }
  })
  get(child(dbrt, "density/Bruin Plate/-N2wOhodV2rCVEQEGLPp")).then((snapshot) => {
    if (snapshot.exists()) {
      BPlateTime.level = snapshot.val().level;
      BPlateTime.percentage = snapshot.val().percentage;
    } else {
      console.log("DEBUG: no data available");
    }
  })
  get(child(dbrt, "density/Epicuria/-N2wOhc78iSJgJIjTCHH")).then((snapshot) => {
    if (snapshot.exists()) {
      EpicuriaTime.level = snapshot.val().level;
      EpicuriaTime.percentage = snapshot.val().percentage;
    } else {
      console.log("DEBUG: no data available");
    }
  })

  var AllTime = {
      DN: DeNeveTime,
      BC: BCafeTime,
      BP: BPlateTime,
      EP: EpicuriaTime
  }

  return AllTime;
}
*/

function allTimeData() {
  let BCafeTime = {
    level: "",
    percentage: 0
  };
  let BPlateTime = {
    level: "",
    percentage: 0
  };
  let DeNeveTime = {
    level: "",
    percentage: 0
  };
  let EpicuriaTime = {
    level: "",
    percentage: 0
  };
  let RendeWestTime = {
    level: "",
    percentage: 0
  };
  let RendeEastTime = {
    level: "",
    percentage: 0
  };
  let DreyTime = {
    level: "",
    percentage: 0
  };
  let StudyTime = {
    level: "",
    percentage: 0
  };

  db.collection("density")
		.get()
		.then((querySnapshot) => {
      // TODO: add time to the end of string
	  BCafeTime.percentage = querySnapshot.docs[0].data().percentage;
      BCafeTime.level = querySnapshot.docs[0].data().level + ": " + querySnapshot.docs[0].data().percentage.toString() + "%";
	  
      BPlateTime.level = querySnapshot.docs[1].data().level + ": " + querySnapshot.docs[1].data().percentage.toString() + "%";
	  BPlateTime.percentage = querySnapshot.docs[1].data().percentage;
	  
      DeNeveTime.level = querySnapshot.docs[2].data().level + ": " + querySnapshot.docs[2].data().percentage.toString() + "%";
	  DeNeveTime.percentage = querySnapshot.docs[2].data().percentage;
	  
      EpicuriaTime.level = querySnapshot.docs[3].data().level + ": " + querySnapshot.docs[3].data().percentage.toString() + "%";
	  EpicuriaTime.percentage = querySnapshot.docs[3].data().percentage;
	  
      RendeWestTime.level = querySnapshot.docs[4].data().level + ": " + querySnapshot.docs[4].data().percentage.toString() + "%";
	  RendeWestTime.percentage = querySnapshot.docs[4].data().percentage;
      RendeEastTime.level = querySnapshot.docs[4].data().level + ": " + querySnapshot.docs[4].data().percentage.toString() + "%";
	  
      DreyTime.level = querySnapshot.docs[5].data().level + ": " + querySnapshot.docs[5].data().percentage.toString() + "%";
	  DreyTime.percentage = querySnapshot.docs[5].data().percentage;
	  
	  
      StudyTime.level = querySnapshot.docs[6].data().level + ": " + querySnapshot.docs[6].data().percentage.toString() + "%";
	  StudyTime.percentage = querySnapshot.docs[6].data().percentage;
	  
	  
	  
							 
	  
	  
	  
    });

	
	
    var AllTime = {
      BC: BCafeTime,
      BP: BPlateTime,
      DN: DeNeveTime,
      EP: EpicuriaTime,
      RW: RendeWestTime,
      RE: RendeEastTime,
      FE: DreyTime,
      ST: StudyTime
    }
	
	
    return AllTime;      
}


// ------------------- Rendering functions -------------------------
// style "square" is in css/body_style.css
function Square(props) {
  return (
    <button style={{ color: props.chroma}} className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}




export function RenderData(props) {
  const [classType] = useState(props.class_type);
  const [AllTimeData] = useState(allTimeData);  // store data in this object
  const [dataLoaded, setdataLoaded] = useState(false);  // true after one load
  const [displayTime, setdisplayTime] = useState("");  // display on card back based on classType
  const [color, setColor] = useState("");
	
  function loadData() {
    if (dataLoaded == false) {
      // Avoid load again
      setdataLoaded(true);

	//console.log(AllTimeData.BC.percentage);

      // Assign display based on which card
      if (classType == 'bc') {
        //setdisplayTime(AllTimeData.BC.level);
        //Need to Change Colors
		
		
		
		
				let timeColor = '#37B96B';
				let timeMessage = "Not too busy"; 
			setdisplayTime("Not too busy "+ AllTimeData.BC.percentage.toString() + "%");
			setColor(timeColor);
			if (AllTimeData.BC.percentage > 70) {
				timeColor = "#D24040";
				timeMessage = "Super busy"; 
				setdisplayTime("Super busy " + AllTimeData.BC.percentage.toString() + "%");
				setColor(timeColor);
			
			} else if (AllTimeData.BC.percentage > 50) {
				timeColor = "#EF892B";
				timeMessage = "Fairly busy ";
				setdisplayTime("Fairly busy " + AllTimeData.BC.percentage.toString() + "%");
				setColor(timeColor);
			} else if (AllTimeData.BC.percentage > 30) {
				timeColor = "#EFC42B";
				timeMessage = "Getting busy"; 
				setdisplayTime("Getting busy " + AllTimeData.BC.percentage.toString()  + "%");
				setColor(timeColor);
			} else if (AllTimeData.BC.percentage <= 0) {
				timeColor = "black";
				timeMessage = "No data"; 
				setdisplayTime("No data " + AllTimeData.BC.percentage.toString() + "%");
				setColor(timeColor);
			}
		} else if (classType == 'bp') {
				let timeColor = '#37B96B';
				let timeMessage = "Not too busy"; 
			setdisplayTime("Not too busy "+ AllTimeData.BP.percentage.toString() + "%");
			setColor(timeColor);
			if (AllTimeData.BP.percentage > 70) {
				timeColor = "#D24040";
				timeMessage = "Super busy"; 
				setdisplayTime("Super busy " + AllTimeData.BP.percentage.toString() + "%");
				setColor(timeColor);
			} else if (AllTimeData.BP.percentage > 50) {
				timeColor = "#EF892B";
				timeMessage = "Fairly busy ";
				setdisplayTime("Fairly busy " + AllTimeData.BP.percentage.toString() + "%");
				setColor(timeColor);
			} else if (AllTimeData.BP.percentage > 30) {
				timeColor = "#EFC42B";
				timeMessage = "Getting busy"; 
				setdisplayTime("Getting busy " + AllTimeData.BP.percentage.toString()  + "%");
				setColor(timeColor);
			} else if (AllTimeData.BP.percentage <= 0) {
				timeColor = "black";
				timeMessage = "No data"; 
				setdisplayTime("No data " + AllTimeData.BP.percentage.toString() + "%");
				setColor(timeColor);
			}
		} else if (classType == 'dn') {
				let timeColor = '#37B96B';
				let timeMessage = "Not too busy"; 
			setdisplayTime("Not too busy "+ AllTimeData.DN.percentage.toString() + "%");
			setColor(timeColor);
			if (AllTimeData.DN.percentage > 70) {
				timeColor = "#D24040";
				timeMessage = "Super busy"; 
				setdisplayTime("Super busy " + AllTimeData.DN.percentage.toString() + "%");
				setColor(timeColor);
			} else if (AllTimeData.DN.percentage > 50) {
				timeColor = "#EF892B";
				timeMessage = "Fairly busy ";
				setdisplayTime("Fairly busy " + AllTimeData.DN.percentage.toString() + "%");
				setColor(timeColor);
			} else if (AllTimeData.DN.percentage > 30) {
				timeColor = "#EFC42B";
				timeMessage = "Getting busy"; 
				setdisplayTime("Getting busy " + AllTimeData.DN.percentage.toString()  + "%");
				setColor(timeColor);
			} else if (AllTimeData.DN.percentage <= 0) {
				timeColor = "black";
				timeMessage = "No data"; 
				setdisplayTime("No data " + AllTimeData.DN.percentage.toString() + "%");
				setColor(timeColor);
			}
      } else if (classType == 'ep') {
				let timeColor = '#37B96B';
				let timeMessage = "Not too busy"; 
			setdisplayTime("Not too busy "+ AllTimeData.EP.percentage.toString() + "%");
			setColor(timeColor);
			if (AllTimeData.EP.percentage > 70) {
				timeColor = "#D24040";
				timeMessage = "Super busy"; 
				setdisplayTime("Super busy " + AllTimeData.EP.percentage.toString() + "%");
				setColor(timeColor);
			} else if (AllTimeData.EP.percentage > 50) {
				timeColor = "#EF892B";
				timeMessage = "Fairly busy ";
				setdisplayTime("Fairly busy " + AllTimeData.EP.percentage.toString() + "%");
				setColor(timeColor);
			} else if (AllTimeData.EP.percentage > 30) {
				timeColor = "#EFC42B";
				timeMessage = "Getting busy"; 
				setdisplayTime("Getting busy " + AllTimeData.EP.percentage.toString()  + "%");
				setColor(timeColor);
			} else if (AllTimeData.EP.percentage <= 0) {
				timeColor = "black";
				timeMessage = "No data"; 
				setdisplayTime("No data " + AllTimeData.EP.percentage.toString() + "%");
				setColor(timeColor);
			}
      } else if (classType == 'rw') {
				let timeColor = '#37B96B';
				let timeMessage = "Not too busy"; 
			setdisplayTime("Not too busy "+ AllTimeData.RW.percentage.toString() + "%");
			setColor(timeColor);
			if (AllTimeData.RW.percentage > 70) {
				timeColor = "#D24040";
				timeMessage = "Super busy"; 
				setdisplayTime("Super busy " + AllTimeData.RW.percentage.toString() + "%");
				setColor(timeColor);
			} else if (AllTimeData.RW.percentage > 50) {
				timeColor = "#EF892B";
				timeMessage = "Fairly busy ";
				setdisplayTime("Fairly busy " + AllTimeData.RW.percentage.toString() + "%");
				setColor(timeColor);
			} else if (AllTimeData.RW.percentage > 30) {
				timeColor = "#EFC42B";
				timeMessage = "Getting busy"; 
				setdisplayTime("Getting busy " + AllTimeData.RW.percentage.toString()  + "%");
				setColor(timeColor);
			} else if (AllTimeData.RW.percentage <= 0) {
				timeColor = "black";
				timeMessage = "No data"; 
				setdisplayTime("No data " + AllTimeData.RW.percentage.toString() + "%");
				setColor(timeColor);
			}
      } else if (classType == 're') {
				let timeColor = '#37B96B';
				let timeMessage = "Not too busy"; 
			setdisplayTime("Not too busy "+ AllTimeData.RE.percentage.toString() + "%");
			setColor(timeColor);
			if (AllTimeData.RE.percentage > 70) {
				timeColor = "#D24040";
				timeMessage = "Super busy"; 
				setdisplayTime("Super busy " + AllTimeData.RE.percentage.toString() + "%");
				setColor(timeColor);
			} else if (AllTimeData.RE.percentage > 50) {
				timeColor = "#EF892B";
				timeMessage = "Fairly busy ";
				setdisplayTime("Fairly busy " + AllTimeData.RE.percentage.toString() + "%");
				setColor(timeColor);
			} else if (AllTimeData.RE.percentage > 30) {
				timeColor = "#EFC42B";
				timeMessage = "Getting busy "; 
				setdisplayTime("Getting busy " + AllTimeData.RE.percentage.toString()  + "%");
				setColor(timeColor);
			} else if (AllTimeData.RE.percentage <= 0) {
				timeColor = "black";
				timeMessage = "No data"; 
				setdisplayTime("No data " + AllTimeData.RE.percentage.toString() + "%");
				setColor(timeColor);
			}
      } else if (classType == 'fe') {
				let timeColor = '#37B96B';
				let timeMessage = "Not too busy"; 
			setdisplayTime("Not too busy "+ AllTimeData.FE.percentage.toString() + "%");
			setColor(timeColor);
			if (AllTimeData.FE.percentage > 70) {
				timeColor = "#D24040";
				timeMessage = "Super busy"; 
				setdisplayTime("Super busy " + AllTimeData.FE.percentage.toString() + "%");
				setColor(timeColor);
			} else if (AllTimeData.FE.percentage > 50) {
				timeColor = "#EF892B";
				timeMessage = "Fairly busy ";
				setdisplayTime("Fairly busy " + AllTimeData.FE.percentage.toString() + "%");
				setColor(timeColor);
			} else if (AllTimeData.FE.percentage > 30) {
				timeColor = "#EFC42B";
				timeMessage = "Getting busy"; 
				setdisplayTime("Getting busy " + AllTimeData.FE.percentage.toString()  + "%");
				setColor(timeColor);
			} else if (AllTimeData.FE.percentage <= 0) {
				timeColor = "black";
				timeMessage = "No data"; 
				setdisplayTime("No data " + AllTimeData.FE.percentage.toString() + "%");
				setColor(timeColor);
			}
      } else if (classType == 'st') {
				let timeColor = '#37B96B';
				let timeMessage = "Not too busy"; 
			setdisplayTime("Not too busy "+ AllTimeData.ST.percentage.toString() + "%");
			setColor(timeColor);
			if (AllTimeData.ST.percentage > 70) {
				timeColor = "#D24040";
				timeMessage = "Super busy"; 
				setdisplayTime("Super busy " + AllTimeData.ST.percentage.toString() + "%");
				setColor(timeColor);
			} else if (AllTimeData.ST.percentage > 50) {
				timeColor = "#EF892B";
				timeMessage = "Fairly busy ";
				setdisplayTime("Fairly busy " + AllTimeData.ST.percentage.toString() + "%");
				setColor(timeColor);
				console.log("Test pass!");
			} else if (AllTimeData.ST.percentage > 30) {
				timeColor = "#EFC42B";
				timeMessage = "Getting busy"; 
				setdisplayTime("Getting busy " + AllTimeData.ST.percentage.toString()  + "%");
				setColor(timeColor);
			} else if (AllTimeData.ST.percentage <= 0) {
				timeColor = "black";
				timeMessage = "No data"; 
				setdisplayTime("No data " + AllTimeData.ST.percentage.toString() + "%");
				setColor(timeColor);
			}
      }
    }
  }
  
  // Click on the box to display capacity/wait time
  function renderSquares() {
    return (
      <dir>
        <Square 
          value = {displayTime}
          onClick={() => loadData()}
		  chroma = {color}
        />
      </dir>
    );
  }

  // Render
  return (
    <div>
      {renderSquares()} 
    </div>
  )
}
