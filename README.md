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

## Dining Hall Application
### Requirements

## Web-Scrape Script 
### Requirements
* Python (3.9.7)
* Anaconda3
* pip

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
© Eric Choi (ericchoirr38@gmail.com), Kalyan Karamsetty (Kalyan.Karamsetty@gmail.com), Kangrui Chen (kangrui@g.ucla.edu), Marina Suh (marinasuh@g.ucla.edu), Rory O’Regan (roregan@g.ucla.edu)
