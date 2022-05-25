import React, { useEffect, useState } from 'react';
import { View, Text, SafeAreaView, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import Block from './block';
import Refresh from '../assets/icons/refresh';
import SimpleButton from './simpleButton';
import BellNotification from '../assets/icons/bell_notification';
import MealPlan from './mealPlan';
import ActiveDiningHalls from './activeDiningHalls';
import { useFonts } from 'expo-font';
import FoodTrucks from './foodTrucks';
import { useNavigation } from '@react-navigation/native';
import * as WebBrowser from 'expo-web-browser';
import { GreenHeart, SignOut } from '../assets/icons/icons';
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth, db } from '../Core/Config';
import { doc, getDoc } from "firebase/firestore";
import AppLoading from 'expo-app-loading';
import LikedItems from "../screens/LikedItems"; 

let hours = new Date().getHours();

function HomeScreenContent() {
    const [result, setResult] = useState(null);
    const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useState();
    const [userDoc, setUserDoc] = useState(null);
    const [state, setState] = useState({});
    const navigation = useNavigation();
    const [loaded] = useFonts({
        'publica-sans-m': require('dining_application/assets/fonts/PublicaSans-Medium.otf'),
        'publica-sans-s': require('dining_application/assets/fonts/PublicaSans-Standard.otf'),
    });

    function authStateChanged(user) {
        setUser(user);
        if (user !== null) {
            getDoc(doc(db, "users", user.uid)).then((snapShot) => {
                setUserDoc(snapShot.data())
            }).catch((e) => alert(e))
        }
        if (initializing) setInitializing(false);
    }

    useEffect(() => {
        const subscriber = onAuthStateChanged(auth, authStateChanged);
        return subscriber; // unsubscribe on unmount
    }, []);

    if (initializing || userDoc == null) return <AppLoading />;


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
                routes: [{ name: 'Welcome' }]
            });
        }
        catch (error) {
            alert(error);
        }
    }

    let mealPlanNumber = 19; 
    let mealPlanPremium = "P"; 

    if(userDoc.mealPlan.charAt(2) === "R")
    {
        mealPlanPremium = "R"; 
    }
    if(userDoc.mealPlan.charAt(1) === "4")
    {
        mealPlanNumber = 14; 
    } else if (userDoc.mealPlan.charAt(1) === "1") {
        mealPlanNumber = 11; 
    }

    return (
        <SafeAreaView>
            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false} nestedScrollEnabled={true}>
                <View style={styles.header}>
                    <Text style={styles.headerText}>Good {greeting},{'\n'}{userDoc.fname}</Text>
                    <View style={styles.iconRow}>
                        <TouchableOpacity style={styles.icon}>
                            <Refresh />
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.icon, { position: "relative", bottom: 5 }]}>
                            <BellNotification />
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.icon]}>
                            <SignOut onPress={() => {
                                signOutUser();
                            }} />
                        </TouchableOpacity>
                    </View>
                </View>
                <ActiveDiningHalls/>
                <Block>
                    <View style={{ flexDirection: "row", alignItems: "center", width: "100%", margin: 5 }}>
                        <GreenHeart style={{ marginRight: 10 }} />
                        <Text style={{ fontFamily: "publica-sans-s", fontSize: 15, flex: 1, flexWrap: 'wrap', marginRight: 15, }} >Take your COVID-19 clearance survey and protect others</Text>
                    </View>
                    <SimpleButton style={{ alignSelf: "flex-end", marginTop: 10, }} background="true" text="Take Clearance Survey" onPress={_handlePressButtonAsync} />
                </Block>
                <MealPlan mealPlan={mealPlanNumber} type={mealPlanPremium} />
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
        fontFamily: "publica-sans-m",
        lineHeight: 30,
        fontSize: 28,
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