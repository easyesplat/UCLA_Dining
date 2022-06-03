# Bruin Dine
<img src="https://github.com/easyesplat/UCLA_Dining/blob/main/dining_application/assets/animojis/starbear.png" align="right" alt="Bruin Dine Logo" width="280" height="280">

Bruin Dine provides users with UCLA Dining menu information for menu items that the user likes. This full-stack application helps students in many ways - UCLA’s dining menu can often be complicated, and this way, students who have dietary restrictions or other preferences can more easily navigate menu options.  

The features and implementations that **Bruin Dine** provides are:
* Dynamic data that changes based on **user input**
  * User feeds will be styled and changed depending on their "likes" for certain food options
* Various **options** for utilizing the app
  * Users will be able to use the mobile application built with React/React-Native as well as use the Chrome extension to view some of the data on the  browser
* Dyamic **web-scraped** UCLA Dining Hall data (Additional distinct feature #1)
  * Utilizing Python web-scraping scripts (beautifulsoup), Python automatically scrapes data off of the UCLA dining hall static web sites and writes the data to Firestore/Realtime Database in an organized and object-oriented manner
* **Crowd-sourced user survey** information (Additional distinct feature #2)
  * Users have the ability to answer questions about the dining halls based on which dining halls are the best for the day through surveys, which will display to other users
* **Chrome Extension** option (Additional distinct feature #3)
  * Enable users to view limited data on available dining halls in the browser with ease. 

## Installation

Bruin Dine is currently in beta version. 

### Getting code

Clone **Bruin Dine**'s repository and `cd` into the respective folders if necessary.

```shell
git clone https://github.com/easyesplat/UCLA_Dining
cd ./UCLA_Dining
```

Installation steps for the NodeJS dining hall app, Python web-scrape script, and NodeJS chrome extension will be outlined below.
## Web-Scrape Script 
### Requirements
* Python (3.9.7)
* Anaconda3
* pip

### Google Firebase Setup
* If you haven't already, sign up for a firebase account in [Firebase](https://firebase.google.com/) and create a new project. If you already have an account, log in to your Firebase console and add a new project. 

<p align="center">
<img src="http://mariechatfield.com/tutorials/assets/firebase/screenshot_new_account.png"
  alt="Creating New Project"
  width="686">
</p>

* Name your project and go click on the **Firestore** section. Follow the Firestore database workflow accordingly.
* Add the Firebase Admin SDK to the Python application with the following command:

```shell
pip install --upgrade firebase-admin
```
* In [IAM & Admin > Service Accounts](https://console.cloud.google.com/iam-admin/serviceaccounts), create a new private key for your newly created firebase project and save the JSON file with the "PythonCode" directory; the file must be name "serviceAccountKey.json" and be placed in the correct location for the Python scripts to correctly push data to Firestore

<p align="center">
<img src="https://i.imgur.com/7w2c4A5.png"
  alt="IAM & Admin"
  width="686">
</p>

** Note ** Normally, your private key should not be shared to the public due to security concerns; however, for simplicity and practical purposes, I have added my own "serviceACcountKey.json" under the "PythonCode" directory.

### Python Script Setup

## Dining Hall Application
### Requirements

### Setup
* Run the following command to install the Expo command line interface globally on your system

```shell
npm install -g expo-cli
```

* Then download the “Expo Go” Application from the IOS App Store or the Google Play Store (**this step is required to run on a physical device**)
* `cd` to the directory "**dining_application**"
* Within the directory, run the following command

```shell
npm install
```
* Once all the required dependencies are installed, go to firebase and get the config keys for the web, and paste them into a file named "**keys.js**"

```javascript
keys.js
	const firebaseConfig = {
		[Paste your config keys here]
};

export default firebaseConfig; 
```
* Confirm that python web-scraping scripts have been ran
   * In particular, check "**init.py**" since it initializes the collections that the application requires
* Lastly, go back to the Firebase Firestore Console and ensure the following collections are present

<p align="center">
<img src="https://i.imgur.com/sMXSuTQ.png"
  alt="Firebase Firestore Console"
  width="686">
</p>

* Now that you're inside the directory, run the following command
   * Expo will then print in the terminal that “Developer tools running on http://localhost:19002” (Expo will run the Developer tools on a different localhost if 19002 is in use)
   * Then using your browser, navigate to that link. By default Expo sets the connection mode to “LAN”. Change that to tunnel, by clicking on tunnel
```shell
expo start
```
* Now to run that application on a local device, take the device and scan the QR code in the terminal. This QR code should open the “Expo Go” application and the app should begin loading. Metro will bundle all of your files, and you should now be able to use the app freely

## Chrome Extension
### Requirements

### Setup
* Open the folder containing the extension; In our repository, the file is located within "dining_extension". `cd` into the respective folder if necessary. 

* Run and build chrome extension through npm
```shell
npm install
npm run build
```

* In Google Chrome, open the extension settings by clicking "**Manage Extensions**" and enabling developer mode. Look into [Chrome Web Store Help](https://support.google.com/chrome_webstore/answer/2664769?hl=en) for more info.
* Select "**Load unpacked**" and navigate to the build folder created by the npm build script. It should be in the same folder as the project. Select the build folder.
* Run the extension as you would run any other extension

** Note ** This process is for using the extension as a demo. If it were to be distributed, it would need to be uploaded to the Google store. 

## Group Members
© [Eric Choi](https://github.com/easyesplat) (ericchoirr38@gmail.com), [Kalyan Karamsetty](https://github.com/kalcow) (Kalyan.Karamsetty@gmail.com), [Kangrui Chen](https://github.com/kangruichen) (kangrui@g.ucla.edu), [Marina Suh](https://github.com/marinasoo) (marinasuh@g.ucla.edu), [Rory O’Regan](https://github.com/robertcaliforya) (roregan@g.ucla.edu)
