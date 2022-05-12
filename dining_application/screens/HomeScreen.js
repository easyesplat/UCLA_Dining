import * as React from 'react';
import { View, Text, SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, Dimensions, Image} from 'react-native';
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
import ActiveDiningHalls from '../components/activeDiningHalls';
import { useFonts } from 'expo-font';
import FoodTrucks from '../components/foodTrucks';

let hours = new Date().getHours(); 

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
});

export default HomeScreen