import * as React from 'react';
import { View, Text, SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, Dimensions, Image} from 'react-native';
import Menubutton from '../components/menubutton';
import Block from '../components/block';
import SimpleButton from '../components/simpleButton';
import { useFonts } from 'expo-font';
import { useNavigation } from '@react-navigation/native';

const DATA = [
    {
        id: 1,
        name: "Epicuria", 
        waitTime: 4, 
        imageUri: require('dining_application/assets/diningHallImages/epicimage.jpeg'), 
    },
    {
        id: 2,
        name: "Bruin Plate", 
        waitTime: 6, 
        imageUri: require('dining_application/assets/diningHallImages/bplateimage.jpg'), 
    },
    {
        id: 3,
        name: "De Neve", 
        waitTime: 6, 
        imageUri: require('dining_application/assets/diningHallImages/deneve.jpg'), 
    },
    {
        id: 4,
        name: "Rendezvous", 
        waitTime: 18, 
        imageUri: require('dining_application/assets/diningHallImages/rende.jpg'), 
    },
    {
        id: 5,
        name: "Bruin Cafe", 
        waitTime: 11, 
        imageUri: require('dining_application/assets/diningHallImages/bcafe.jpg'), 
    },
    {
        id: 6,
        name: "The Feast", 
        waitTime: 34, 
        imageUri: require('dining_application/assets/diningHallImages/feast.jpg'), 
    },
    {
        id: 7,
        name: "Bruin Bowl", 
        waitTime: 21, 
        imageUri: require('dining_application/assets/diningHallImages/bowl.jpg'), 
    },
    {
        id: 8,
        name: "The Study", 
        waitTime: 45, 
        imageUri: require('dining_application/assets/diningHallImages/study.jpg'), 
    },
];

function ActiveDiningHalls(props) {
    const navigation = useNavigation(); 
    let hours = new Date().getHours(); 
    let minutes = new Date().getMinutes();
    hours = 10; 
    minutes = 0; 
    let timeConstant = hours + (minutes/60);

    const [loaded] = useFonts({
        'sf-pro-sb': require('dining_application/assets/fonts/SF-Pro-Text-Semibold.otf'),
    });
    
    if (!loaded) {
        return null;
    }

    const openingTimes = [17, 11, 7]; 

    let mealPeriod = "Dining Halls are currently closed";
    let closed = true; 
    if (timeConstant >= 7 && timeConstant <= 10) {
        mealPeriod = "Dining Halls open for breakfast"; 
        closed = false; 
    } else if (timeConstant >= 11 && timeConstant <= 15) {
        mealPeriod = "Dining Halls open for lunch"; 
        closed = false; 
    } else if (timeConstant >= 17 && timeConstant <= 21) {
        mealPeriod = "Dining Halls open for dinner"; 
        closed = false; 
    } else if (timeConstant >= 21) {
        mealPeriod = "Dining Halls open for late night"; 
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

    let activeDiningHalls = []; 
    let sortedData = DATA.slice(); 
    sortedData.sort(function (a, b) {
        return a.waitTime - b.waitTime;
    }); 
    for (let i = 0; i < sortedData.length; i++) {
        activeDiningHalls.push(<Menubutton name={sortedData[i].name} waitTime={sortedData[i].waitTime} imageUri={sortedData[i].imageUri} key={sortedData[i].id.toString()} onPress={() => navigation.navigate("Dining Halls")} />); 
    }

    return (
        <View>
            <Text style={{fontFamily: "sf-pro-sb", fontSize: 18}}>{mealPeriod}</Text>
            <View style={styles.grid}>
                {activeDiningHalls}
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