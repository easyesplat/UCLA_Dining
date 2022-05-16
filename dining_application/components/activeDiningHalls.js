import * as React from 'react';
import { View, Text, StyleSheet, Image} from 'react-native';
import Menubutton from '../components/menubutton';
import Block from '../components/block';
import SimpleButton from '../components/simpleButton';
import { useFonts } from 'expo-font';
import { useNavigation } from '@react-navigation/native';
import { db } from "../Core/Config"
import { getDoc, doc } from 'firebase/firestore';
import { useState } from 'react';
import AppLoading from 'expo-app-loading';
import DATA from '../data/diningData'; 

function ActiveDiningHalls(props) {

    const navigation = useNavigation(); 
    const [userDoc, setUserDoc] = useState(null); 

    let hours = new Date().getHours(); 
    let minutes = new Date().getMinutes();
    // hours = 1; 
    // minutes = 59; 
    let timeConstant = hours + (minutes/60);

    //fonts
    const [loaded] = useFonts({
        'sf-pro-sb': require('dining_application/assets/fonts/SF-Pro-Text-Semibold.otf'),
    });
    
    if (!loaded) {
        return null;
    }

    //Meal Period 
    const openingTimes = [17, 11, 7]; 

    let mealPeriodMessage = "Dining Halls are currently closed";
    let mealPeriod; 
    let closed = true; 
    if (timeConstant >= 7 && timeConstant <= 10) {
        mealPeriodMessage = "Dining Halls open for breakfast"; 
        mealPeriod = "breakfast"
        closed = false; 
    } else if (timeConstant >= 11 && timeConstant <= 15) {
        mealPeriodMessage = "Dining Halls open for lunch"; 
        mealPeriod = "lunch"; 
        closed = false; 
    } else if (timeConstant >= 17 && timeConstant <= 21) {
        mealPeriodMessage = "Dining Halls open for dinner"; 
        mealPeriod = "dinner"
        closed = false; 
    } else if (timeConstant >= 21) {
        mealPeriodMessage = "Dining Halls open for late night"; 
        mealPeriod = "late_dinner"
        closed = false; 
    }
    //closed = true; 

    let message; 
    let bearImage = require("dining_application/assets/animojis/sadbear.png"); 
    if (closed) {
        let closestTime; 
        for (let i = 0; i < openingTimes.length; i++) {
            if (hours < openingTimes[i]) {
                closestTime = openingTimes[i]; 
            }
        }

        let wordHours; 
        let wordMinutes;

        let diff = closestTime - hours- 1;
        let minDiff = 60 - minutes; 

        diff === 0 ? wordHours = " hour" : wordHours = " hours";
        minDiff === 1 ? wordMinutes = " minute" : wordMinutes = " minutes"; 

        if(minDiff === 60) {
            diff++;
            message = diff.toString() + wordHours + "."; 
        } else if (diff === 0) {
            message = minDiff.toString() + wordMinutes + ".";
        } else if (minDiff === 0) {
            message = diff.toString() + wordHours + "."; 
        } else {
            message = diff.toString() + wordHours + " and " + minDiff.toString() + wordMinutes + ".";  
        }

        if (closestTime === 7) {
            bearImage = require("dining_application/assets/animojis/sleepyBear.png"); 
        }
    }

    if(closed == true) {
        return (
            <View style={{marginTop: -20}}>
                <Block>
                    <Image style={{width: 100, height: 100, alignSelf: "center"}} source={bearImage}/>
                    <Text style={{fontFamily: "sf-pro-sb", fontSize: 14, textAlign: "center", paddingHorizontal: 20, marginBottom: 20}}>Dining halls are closed right now. Dining halls will re-open in {message}</Text>
                    <SimpleButton style={{alignSelf: "center", marginBottom: 10,}} background="true" text="See all dining halls"/>
                </Block>
            </View>
        );
    }

    let openDiningHalls; 

    if (!closed) {
        const myDoc = doc(db, "time", mealPeriod); 
    
        getDoc(myDoc)
        .then((snapshot) => {
            if (snapshot.exists) {
                setUserDoc(snapshot.data());
            } else {
                alert("No Document found")
                return null; 
            }
        })
        .catch((error) => {
            alert(error.message)
        })

    }

    if(userDoc != null) {
        openDiningHalls = (userDoc.restaurants).slice();
        
    } else {
        return (
            //Change this
            <AppLoading/>
        ); 
    }

    let renderDiningHalls = []; 
    let sortedData = DATA.slice();
    sortedData.sort(function (a, b) {
        return a.waitTime - b.waitTime;
    }); 
    for (let i = 0; i < sortedData.length; i++) {
        if (openDiningHalls.includes(sortedData[i].name)) {
            renderDiningHalls.push(<Menubutton name={sortedData[i].name} waitTime={sortedData[i].waitTime} imageUri={sortedData[i].imageUri} key={sortedData[i].id.toString()} onPress={() => navigation.navigate("Dining Halls", {name: sortedData[i].name, data: sortedData[i]})} />); 
        }
    }


    return (
        <View>
            <Text style={{fontFamily: "sf-pro-sb", fontSize: 18}}>{mealPeriodMessage}</Text>
            <View style={styles.grid}>
                {renderDiningHalls}
            </View>
            <View style={{flexDirection: "row", justifyContent: "flex-end", paddingTop: 5}}>
                    <SimpleButton text="See all dining halls"/>
            </View>
        </View>
    ); 
}

const styles = StyleSheet.create({
    grid: { 
        flex: 1, 
        flexDirection: 'row', 
        flexWrap: 'wrap',
        marginRight: -20,
        marginTop: 10, 
    },

});

export default ActiveDiningHalls; 
