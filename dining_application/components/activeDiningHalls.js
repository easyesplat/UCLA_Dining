import * as React from 'react';
import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import Menubutton from '../components/menubutton';
import Block from '../components/block';
import SimpleButton from '../components/simpleButton';
import { useNavigation } from '@react-navigation/native';
import DATA from '../data/diningData';
import * as Haptics from 'expo-haptics';
import * as WebBrowser from 'expo-web-browser';
import readTimes from "../Core/timeDatabase";
import AppLoading from 'expo-app-loading';
import LocationComponent from './LocationComponent';
import readDensity from '../Core/density';

function ActiveDiningHalls(props) {
    const [timeMap, setTimeMap] = useState(null);
    const [densityMap, setDensityMap] = useState(null);
    const [result, setResult] = useState(null);
    const navigation = useNavigation();
    let hours = new Date().getHours();
    let minutes = new Date().getMinutes();
    let timeConstant = hours + (minutes / 60);

    useEffect(() => {
        readTimes().then(result => {
            setTimeMap(result);
        }).catch(error => console.log('error', error));

        readDensity().then(result => {
            setDensityMap(result);
        }).catch(error => console.log('error', error));
    }, []);

    if (timeMap == null || densityMap == null) {
        return <AppLoading />;
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
        mealPeriod = "late_night"
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

        let diff = closestTime - hours - 1;
        let minDiff = 60 - minutes;

        diff === 0 ? wordHours = " hour" : wordHours = " hours";
        minDiff === 1 ? wordMinutes = " minute" : wordMinutes = " minutes";

        if (minDiff === 60) {
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

    const _handlePressButtonAsync = async () => {
        let result = await WebBrowser.openBrowserAsync("http://menu.dining.ucla.edu/Hours");
        setResult(result);
    };

    if (closed == true) {
        return (
            <View style={{ marginTop: -20 }}>
                <Block>
                    <Image style={{ width: 100, height: 100, alignSelf: "center" }} source={bearImage} />
                    <Text style={{ fontFamily: "publica-sans-s", fontSize: 15, textAlign: "center", paddingHorizontal: 20, marginBottom: 20 }}>Dining halls are closed right now. Dining halls will re-open in {message}</Text>
                    <SimpleButton style={{ alignSelf: "center", marginBottom: 10, }} background="true" text="See dining hall hours" onPress={() => {
                        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
                        _handlePressButtonAsync();
                    }} />
                </Block>
            </View>
        );
    }

    let openDiningHalls = timeMap[timeMap.findIndex(obj => obj.name === mealPeriod)].data.restaurants;

    let renderDiningHalls = [];
    let sortedData = DATA.slice();
    let open = [];

    for (let i = 0; i < sortedData.length; i++) {
        const searchIndex = densityMap.findIndex((hall) => hall.name == sortedData[i].name);
        if (searchIndex !== -1) {
            sortedData[i].level = densityMap[searchIndex].data.level;
            sortedData[i].percentage = densityMap[searchIndex].data.percentage; 
        }
    }

    sortedData.sort(function (a, b) {
        return a.percentage - b.percentage;
    });
    

    for (let i = 0; i < sortedData.length; i++) {
        //TODO: Uncomment:
        if (sortedData[i].percentage != -1 && openDiningHalls.includes(sortedData[i].name)) {
            let dataTimes = [
                { label: 'Breakfast', value: 'breakfast' },
                { label: 'Lunch', value: 'lunch' },
                { label: 'Dinner', value: 'dinner' },
                { label: 'Late night', value: 'late_night' },
            ];
            let officialTimes = timeMap[timeMap.findIndex(obj => obj.name === sortedData[i].name)].data; 
            if(officialTimes.breakfast == "CLOSED") {
                dataTimes.splice(0, 1)
            }
            if(officialTimes.lunch == "CLOSED") {
                dataTimes.splice(1, 1)
            }
            if(officialTimes.dinner == "CLOSED") {
                dataTimes.splice(2, 1)
            }
            if(officialTimes.late_night == "CLOSED") {
                dataTimes.pop()
            }
            renderDiningHalls.push(<Menubutton name={sortedData[i].name} waitTime={sortedData[i].percentage} level={sortedData[i].level} imageUri={sortedData[i].imageUri} key={sortedData[i].id.toString()} onPress={() => {
                navigation.navigate("Dining Halls", { name: sortedData[i].name, data: sortedData[i], period: mealPeriod, times: dataTimes});
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
            }} />);
            open.push(sortedData[i].name);
        }
    }


    return (
        <View>
            <Text style={{ fontFamily: "publica-sans-s", fontSize: 18 }}>{mealPeriodMessage}</Text>
            <View style={styles.grid}>
                {renderDiningHalls}
            </View>
            <View style={{ flexDirection: "row", justifyContent: "flex-end", paddingTop: 5 }}>
                <SimpleButton text="See dining hall hours" onPress={() => {
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
                    _handlePressButtonAsync();
                }} />
            </View>
            <LocationComponent open={open} time={mealPeriod} userId={props.userId} userAnswered={props.userAnswered}/>
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