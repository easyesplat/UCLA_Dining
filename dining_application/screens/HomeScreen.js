import * as React from 'react';
import { View, Text, SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, Dimensions, Image} from 'react-native';
import Menubutton from '../components/menubutton';
import Block from '../components/block';
import { BlurView } from 'expo-blur';
import Gradient from 'dining_application/assets/gradient.js'
import Refresh from '../assets/icons/refresh';
import Gear from '../assets/icons/gear';
import ChevronRight from '../assets/icons/chevron-right';
import SimpleButton from '../components/simpleButton';
import BellNotification from '../assets/icons/bell_notification';
import RedHeart from '../assets/icons/redHeart';
import MealPlan from '../components/mealPlan';
import { useFonts } from 'expo-font';
import FoodTrucks from '../components/foodTrucks';

let hours = new Date().getHours(); 
let minutes = new Date().getMinutes();

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
        waitTime: 22, 
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
    const [loaded] = useFonts({
        'sf-pro-sb': require('dining_application/assets/fonts/SF-Pro-Text-Semibold.otf'),
    });
    
    if (!loaded) {
        return null;
    }

    let mealPeriod = "Dining Halls are currently closed";
    let closed = true; 
    if (hours > 6 && hours < 11) {
        mealPeriod = "Dining Halls open for breakfast"; 
        closed = false; 
    } else if (hours > 10 && hours < 16) {
        mealPeriod = "Dining Halls open for lunch"; 
        closed = false; 
    } else if (hours > 20 && minutes > 0) {
        mealPeriod = "Dining Halls open for late night"; 
        closed = false; 
    } else if (hours > 16 && hours < 22) {
        mealPeriod = "Dining Halls open for dinner"; 
        closed = false; 
    } 
    //closed = true; 

    if(closed == true) {
        return (
            <View style={{marginTop: -20}}>
                <Block>
                    <Image style={{width: 100, height: 100, alignSelf: "center"}} source={require("dining_application/assets/animojis/sadbear.png")}/>
                    <Text style={{fontFamily: "sf-pro-sb", fontSize: 14, textAlign: "center", paddingHorizontal: 20, marginBottom: 20}}>Dining halls are closed right now. Dining halls will re-open in 6 hours</Text>
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
        activeDiningHalls.push(<Menubutton name={sortedData[i].name} waitTime={sortedData[i].waitTime} imageUri={sortedData[i].imageUri} key={sortedData[i].id.toString()}/>); 
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

function HomeScreenContent({navigation}) {
    const [loaded] = useFonts({
        'sf-pro-b': require('dining_application/assets/fonts/SF-Pro-Text-Bold.otf'),
        'sf-pro-sb': require('dining_application/assets/fonts/SF-Pro-Text-Semibold.otf'),
    });
    
    if (!loaded) {
        return null;
    }

    let greeting = "Morning";
    if (hours > 11 && hours < 18) {
        greeting = "Afternoon"; 
    } else if (hours > 17 && hours < 21) {
        greeting = "Evening"; 
    } else if (hours > 20 || hours < 4) {
        greeting = "Night"; 
    }

    return (
        <SafeAreaView>
            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false} nestedScrollEnabled={true}>
                <View style={styles.header}>
                    <Text style={styles.headerText}>Good {greeting},{'\n'}Kalyan</Text>
                    <View style={styles.iconRow}>
                        <TouchableOpacity style={styles.icon}>
                            <Refresh/>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.icon}>
                            <Gear/>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.icon, {position: "relative", bottom: 5}]}>
                            <BellNotification/>
                        </TouchableOpacity>
                    </View>
                </View>
                <ActiveDiningHalls/>
                <Block style={{flexDirection: "column", alignItems: "flex-end"}}>
                    <View style={{flexDirection: "row", alignItems: "center", width: "100%", margin: 5}}>
                        <RedHeart style={{marginRight: 10}}/>
                        <Text style={{fontFamily: "sf-pro-sb", fontSize: 14, flex: 1, flexWrap: 'wrap'}}>Take your COVID-19 clearance survey and protect others</Text>
                    </View>
                    <SimpleButton style={{alignSelf: "flex-end", marginTop: 10,}} background="true" text="Take Clearance Survey"/>
                </Block>
                <TouchableOpacity>
                    <Block style={{flexDirection: "column", alignItems: "flex-end"}}>
                        <View style={{flexDirection: "row", alignItems: "center", width: "100%", margin: 5}}>
                            <MealPlan style={{marginRight: 10}} mealPlan="14P"/>
                            <Text style={{fontFamily: "sf-pro-sb", fontSize: 14, flex: 1, flexWrap: 'wrap'}}>You should have <Text style={{color: "#005587"}} >122</Text> meal swipes remaining for the quarter</Text>
                            <ChevronRight style={{marginRight: 10}}/>
                        </View>
                    </Block>
                </TouchableOpacity>
                <FoodTrucks/>
            </ScrollView>
        </SafeAreaView>
    );
}

function HomeScreen({ navigation }) {
    return (
        <View style={{backgroundColor: "#fff"}}>
            <Gradient style={styles.gradientPosition}/>
            <BlurView intensity={90} style={[StyleSheet.absoluteFill, styles.blurContainer]}></BlurView>
            <HomeScreenContent/>
        </View>
    );
}

const styles = StyleSheet.create({
    blurContainer: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        width: '100%',
        zIndex: -1, 
    },
    gradientPosition: {
        position: 'absolute', 
        left: 0, 
        top: 0, 
        zIndex: -2, 
    }, 
    header: {
        paddingTop: 20,
        paddingBottom: 20,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    headerText: {
        fontFamily: "sf-pro-b", 
        fontSize: 26,
    },    
    scrollView: {
        paddingHorizontal: 20, 
    },
    iconRow: {
        flexDirection: "row",
    }, 
    icon: {
        paddingLeft: 15, 
    },
    list: {
        overflow: "visible"
    },
    grid: { 
        flex: 1, 
        flexDirection: 'row', 
        flexWrap: 'wrap',
        marginRight: -20,
        marginTop: 10, 
    },

});

export default HomeScreen