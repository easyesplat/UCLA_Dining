import { View, Text, StyleSheet, ImageBackground } from 'react-native'
import React, { useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ScrollView } from 'react-native-gesture-handler'
import { LinearGradient } from 'expo-linear-gradient';
import { useFonts } from 'expo-font';
import { useRoute } from "@react-navigation/native"
import DiningLogo from '../assets/icons/diningLogo';
import readMenus from '../Core/menuDatabase';
import { MenuItem, MenuHeader, MenuBlock } from '../components/menuItem';
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db, auth } from '../Core/Config';
import AtAGlanceItem from '../components/atAGlanceItem';
import Loading from '../components/loading';
import { SmallStar, SmallStarNoFill } from '../assets/icons/icons';

function DiningHall() {
    const routes = useRoute();
    const [menuMap, setMenuMap] = useState(null);
    const [userDoc, setUserDoc] = useState(null);
    const [showSurvey, setShowSurvey] = useState(null);
    const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useState();
    const [ratingsDoc, setRatingsDoc] = useState(null);
    const [loaded] = useFonts({
        'sf-pro-b': require('dining_application/assets/fonts/SF-Pro-Text-Bold.otf'),
        'sf-pro-sb': require('dining_application/assets/fonts/SF-Pro-Text-Semibold.otf'),
        'sf-pro-m': require('dining_application/assets/fonts/SF-Pro-Text-Medium.otf'),
        'publica-sans-m': require('dining_application/assets/fonts/PublicaSans-Medium.otf'),
        'publica-sans-l': require('dining_application/assets/fonts/PublicaSans-Light.otf'),
    });

    let menuSupported = true;
    let dietaryRestriction = true;
    let showLocker = false;

    if (routes.params.name === "The Study at Hedrick") {
        menuSupported = false;
    } else if (routes.params.name === "Bruin Café" || routes.params.name === "The Drey") {
        dietaryRestriction = false;
    }

    if (routes.params.name == "De Neve" || routes.params.name == "Epicuria" || routes.params.name == "Bruin Plate" || routes.params.name == "The Feast") showLocker = true;

    const d = new Date();
    let date = d.getFullYear().toString() + (d.getMonth() + 1).toString() + d.getDate().toString();
    let docName = (routes.params.name) + date + routes.params.period;

    function authStateChanged(user) {
        setUser(user);
        if (user != null) {
            getDoc(doc(db, "users", user.uid)).then((snapShot) => {
                setUserDoc(snapShot.data())
            }).catch((e) => alert(e))
        }
        if (initializing) setInitializing(false);
    }

    useEffect(() => {
        readMenus(routes.params.name).then((result) => {
            setMenuMap(result);
        }).catch((error) => console.log('error', error));

        getDoc(doc(db, "Ratings", (docName))).then((document) => {
            if (document.exists()) {
                // alert("Found Ratings");
                setRatingsDoc(document.data());
                // console.log(document);
                setShowSurvey(true)
            } else {
                // alert("Did not find Ratings");
                setShowSurvey(false);
                setRatingsDoc(false);
            }
        }).catch((e) => alert(e))

        const subscriber = onAuthStateChanged(auth, authStateChanged);
        return subscriber; // unsubscribe on unmount
    }, []);

    if (initializing || userDoc === null) return <Loading />;

    if (menuMap == null || userDoc == null || showSurvey == null || ratingsDoc == null) {
        return <Loading />;
    }

    if (!loaded) {
        return null;
    }

    const menu = [];
    let vegetarianItems = 0;
    let veganItems = 0;
    let halalItems = 0;
    let likedItems = 0;

    let vegetarianItemsList = [];
    let veganItemsList = [];
    let halalItemsList = [];
    let likedItemsList = [];

    for (let [key, value] of menuMap.get(routes.params.period)) {
        menu.push(<MenuHeader header={key} />)
        const subMenu = [];
        for (let item in value["food"]) {
            let alreadyLiked = false;
            if (userDoc.likedItems.includes(item)) {
                alreadyLiked = true;
                likedItems++;
                likedItemsList.push({ parent: key, itemName: item, liked: null });
            }
            for (let x in (value["food"])[item]) {
                if (value["food"][item][x] == " Vegetarian Menu Option") {
                    vegetarianItems++;
                    vegetarianItemsList.push({ parent: key, itemName: item, liked: alreadyLiked });
                } else if (value["food"][item][x] == " Vegan Menu Option") {
                    veganItems++;
                    veganItemsList.push({ parent: key, itemName: item, liked: alreadyLiked });
                } else if (value["food"][item][x] == " Halal Menu Option") {
                    halalItems++;
                    halalItemsList.push({ parent: key, itemName: item, liked: alreadyLiked });
                }
            }
            subMenu.push(<MenuItem itemName={item} liked={alreadyLiked} uid={user.uid} parent={key} information={(value["food"])[item]} />)
        }
        menu.push(<MenuBlock>{subMenu}</MenuBlock>)
    }

    if (menu.length === 0) {
        menu.push(
            <View>
                <MenuBlock>
                    <Text style={{
                        fontSize: 15,
                        lineHeight: 20,
                        fontFamily: "publica-sans-l",
                        margin: 5,
                        marginBottom: 15,
                        textAlign: 'center',
                    }}>Looks like we don't support menus for this dining hall yet!</Text>
                </MenuBlock>
            </View>
        );
    }


    let mealPeriod = routes.params.period;
    if (routes.params.period === "late_night") {
        mealPeriod = "late night";
    }

    let busyAverage;
    let busyMessage;
    let busyColor;
    let linesAverage;
    let linesMessage;
    let linesColor
    let lockerAverage;
    let lockerMessage; 
    let lockersColor
    let overallAverage;
    let stars = [];
    // if (busyAverage < 1.5) {
    //     busyMessage = routes.params.name + " is empty";
    //     busyColor = '#37B96B';
    // } else
    if (showSurvey) {
        busyAverage = Math.round((ratingsDoc.totalBusy / ratingsDoc.numberOfResponders) * 2) / 2;
        if (busyAverage < 1.5) {
            busyMessage = routes.params.name + " is not very busy";
            busyColor = '#37B96B';
        } else if (busyAverage < 2.5) {
            busyMessage = routes.params.name + " is getting busy";
            busyColor = '#EFC42B';
        } else {
            busyMessage = routes.params.name + " is packed";
            busyColor = '#D24040';
        }
        linesAverage = Math.round((ratingsDoc.totalLines / ratingsDoc.numberOfResponders) * 2) / 2;
        if (linesAverage < 0.5) {
            linesMessage = "No long lines";
            linesColor = '#37B96B';
        } else {
            linesMessage = "Long lines";
            linesColor = '#D24040';
        }
        if (showLocker) {
            lockerAverage = Math.round((ratingsDoc.totalLocker / ratingsDoc.numberOfResponders) * 2) / 2;
            if (lockerAverage < 1.5) {
                lockerMessage = "Plenty of lockers";
                lockersColor = '#37B96B';
            } else if (lockerAverage < 2.5) {
                lockerMessage = "Some lockers available";
                lockersColor = '#EFC42B';
            } else if (lockerAverage < 3.5) {
                lockerMessage = "Many broken/locked lockers";
                lockersColor = '#dc4d01';
            } else {
                lockerMessage = "No lockers";
                lockersColor = '#D24040';
            }

        }
        overallAverage = Math.round((ratingsDoc.totalRating / ratingsDoc.numberOfResponders) * 2) / 2;
        for (let i = 0; i < 5; i++) {
            if (overallAverage >= 1) {
                stars.push(
                    <View style={{paddingRight: 2, }}>
                        <SmallStar/>
                    </View>)
                overallAverage--; 
            } else {
                stars.push(
                    <View style={{paddingRight: 2}}>
                        <SmallStarNoFill/>
                    </View>)
                overallAverage--;
            }
        }
    }

    let activityLevel = (routes.params.data.percentage).toString() + "%"; 


    return (
        <View style={{ flex: 1, backgroundColor: "#fff" }}>
            <ScrollView>
                <ImageBackground transition={false} style={styles.header} resizeMode="cover" source={routes.params.data.imageUri}>
                    <LinearGradient
                        colors={['transparent', 'rgba(11,11,13,0.4)']}
                        style={StyleSheet.absoluteFill}
                    />
                    <DiningLogo name={routes.params.name} />
                </ImageBackground>
                <Text style={styles.mainHeading}>{routes.params.name} for {mealPeriod}</Text>
                <View style={styles.body}>
                    <View style={styles.block}>
                        <View style={{ padding: 8 }}>
                            <Text style={styles.insightsHeaderText}>{mealPeriod[0].toUpperCase() + mealPeriod.substring(1)} at a glance</Text>
                            {
                                menuSupported &&
                                <View style={styles.glanceView}>
                                    {
                                        dietaryRestriction &&
                                        <>
                                            <AtAGlanceItem number={vegetarianItems} type="vegetarian" list={vegetarianItemsList} />
                                            <AtAGlanceItem number={veganItems} type="vegan" list={veganItemsList} />
                                            <AtAGlanceItem number={halalItems} type="halal" list={halalItemsList} />
                                        </>
                                    }
                                    <AtAGlanceItem number={likedItems} type="liked" list={likedItemsList} />
                                </View>

                            }
                            <View style={{width: "100%", marginTop: 15, backgroundColor: "#F0F2F5", padding: 8, borderRadius: 8, flexDirection: 'row', alignItems: 'center'}}>
                                <Text style={{paddingRight: 5, fontFamily: "publica-sans-s", fontSize: 14, }}>Activity Level</Text>
                                <View style={{width: "100%", height: 10, backgroundColor: "#CDD0D4", flex: 1, borderRadius: 5, overflow: 'hidden'}}>
                                    <View style={{width: activityLevel, backgroundColor: '#37B96B', height: 10,}}></View>
                                </View>
                                <Text style={{paddingLeft: 5, fontFamily: "publica-sans-s", fontSize: 14,}}>{activityLevel}</Text>
                            </View>
                            {
                                showSurvey &&
                                <>
                                    <Text style={styles.subHeading}>What others think:</Text>
                                    <View style={{ backgroundColor: 'white', flexWrap: 'wrap', flexDirection: 'row' }}>
                                        <View style={{ backgroundColor: "#F0F2F5", padding: 5, borderRadius: 8, marginRight: 5, marginTop: 5 }}>
                                            <Text style={{ color: busyColor, fontFamily: "publica-sans-s", textAlign: 'center' }}>{busyMessage} </Text>
                                        </View>
                                        <View style={{ backgroundColor: "#F0F2F5", padding: 5, borderRadius: 8, marginRight: 5, marginTop: 5 }}>
                                            <Text style={{ color: linesColor, fontFamily: "publica-sans-s", textAlign: 'center' }}>{linesMessage} </Text>
                                        </View>
                                        {
                                            showLocker &&
                                            <View style={{ backgroundColor: "#F0F2F5", padding: 5, borderRadius: 8, marginRight: 5, marginTop: 5 }}>
                                                <Text style={{ color: lockersColor, fontFamily: "publica-sans-s", textAlign: 'center' }}>{lockerMessage} </Text>
                                            </View>
                                        }
                                        <View style={{ backgroundColor: "#F0F2F5", padding: 5, borderRadius: 8, marginRight: 5, marginTop: 5, flexDirection: 'row', alignItems: 'center'}}>
                                            <Text style={{ color: 'black', fontFamily: "publica-sans-s", textAlign: 'center', }}>Overall Rating: </Text>
                                            {stars}
                                        </View>
                                    </View>
                                </>
                            }
                        </View>
                    </View>
                </View>
                <SafeAreaView style={styles.items}>
                    {menu}
                </SafeAreaView>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        height: 400,
        justifyContent: "flex-end",
        padding: 20,
    },
    mainHeading: {
        paddingTop: 20,
        paddingHorizontal: 20,
        fontSize: 28,
        lineHeight: 36,
        fontFamily: "publica-sans-s",
        marginBottom: 20,
    },
    headerText: {
        fontFamily: 'sf-pro-sb',
        fontSize: 56,
        color: "#fff",
        paddingTop: 15,
        overflow: "visible"
    },
    body: {
        paddingHorizontal: 20,
    },
    insightsHeaderText: {
        fontFamily: 'publica-sans-s',
        fontSize: 18,
    },
    subHeading: {
        fontFamily: 'publica-sans-s',
        fontSize: 16,
        marginBottom: 5,
        marginTop: 20,
    },
    surveyText: {
        fontFamily: 'publica-sans-s',
        fontSize: 14,
        marginBottom: 10,
    },
    items: {
        paddingHorizontal: 20,
        marginTop: -45,

    },
    block: {
        padding: 10,
        borderRadius: 15,
        width: "100%",
        shadowColor: 'rgba(100,100,110, 0.18)', // IOS
        shadowOpacity: 1, // IOS
        shadowRadius: 29, //IOS
        backgroundColor: "white",
        marginBottom: 20,
    },
    glanceView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 15, 
    }
});

export default DiningHall; 
