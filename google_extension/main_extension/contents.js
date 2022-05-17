console.log("contents script");

// A tool to highlight paragraphs
let paragraphs = document.getElementsByTagName('p');
for (elt of paragraphs){
    elt.style['background-color'] = '#FF00FF';
}


/* ------ Messaging ------
chrome.runtime.onMessage.addListener(
    function(msg, sender, sendResponse) {
        console.log(msg.txt);
    }
);
*/


/* ------ Configure Firebase -------
const firebaseConfig = {
    apiKey: "XXX",
    authDomain: "XXX",
    databaseURL: "XXX",
    projectId: "XXX",
    storageBucket: "XXX",
    messagingSenderId: "XXX",
    appId: "XXX",
    measurementId: "XXX"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// ...do something with Firebase...
*/
