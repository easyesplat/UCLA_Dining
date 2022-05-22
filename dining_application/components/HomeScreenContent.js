import React, { useState } from 'react';
import { View, Text, SafeAreaView, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import Block from './block';
import Refresh from '../assets/icons/refresh';
import SimpleButton from './simpleButton';
import BellNotification from '../assets/icons/bell_notification';
import RedHeart from '../assets/icons/redHeart';
import MealPlan from './mealPlan';
import ActiveDiningHalls from './activeDiningHalls';
import { useFonts } from 'expo-font';
import FoodTrucks from './foodTrucks';
import { useNavigation } from '@react-navigation/native';
import * as WebBrowser from 'expo-web-browser';  
import { SignOut } from '../assets/icons/icons';
import { signOut } from "firebase/auth";
import { auth } from '../Core/Config';

let hours = new Date().getHours(); 

function HomeScreenContent() {
    const [result, setResult] = useState(null);
    const navigation = useNavigation();
    const [loaded] = useFonts({
        'sf-pro-b': require('dining_application/assets/fonts/SF-Pro-Text-Bold.otf'),
        'sf-pro-sb': require('dining_application/assets/fonts/SF-Pro-Text-Semibold.otf'),
    });

    const _handlePressButtonAsync = async () => {
        let result = await WebBrowser.openBrowserAsync('https://uclasurveys.co1.qualtrics.com/jfe/form/SV_3qRLtouCYKzBbH7');
        setResult(result);
    };

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

    signOutUser = async () => {
        try {
            await signOut(auth);
            navigation.reset({
                index: 0, 
                routes: [{name: 'Login'}]
            });
        }
        catch(error) {
            alert(error); 
        }
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
                        <TouchableOpacity style={[styles.icon, {position: "relative", bottom: 5}]}>
                            <BellNotification/>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.icon]}>
                            <SignOut onPress={() => {
                                signOutUser(); 
                            }}/>
                        </TouchableOpacity>
                    </View>
                </View>
                <ActiveDiningHalls/>
                <Block style={{flexDirection: "column", alignItems: "flex-end"}}>
                    <View style={{flexDirection: "row", alignItems: "center", width: "100%", margin: 5}}>
                        <RedHeart style={{marginRight: 10}}/>
                        <Text style={{fontFamily: "sf-pro-sb", fontSize: 14, flex: 1, flexWrap: 'wrap', marginRight: 15,}} >Take your COVID-19 clearance survey and protect others</Text>
                    </View>
                    <SimpleButton style={{alignSelf: "flex-end", marginTop: 10,}} background="true" text="Take Clearance Survey" onPress={_handlePressButtonAsync}/>
                </Block>
                <MealPlan mealPlan={19} type="R"/>
                <FoodTrucks/>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
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

export default HomeScreenContent; 