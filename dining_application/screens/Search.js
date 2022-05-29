import { View, Text, StyleSheet, ScrollView, FlatList, ActivityIndicator } from 'react-native'
import Gradient from '../assets/gradient.js'
import { BlurView } from 'expo-blur';
import React, { useEffect, useState } from 'react'
import { useRoute } from "@react-navigation/native"
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LikedIcon } from '../assets/icons/icons.js';
import readAllItems from "../Core/allItemsDatabse"
import { getDoc, doc } from 'firebase/firestore';
import { db, auth } from '../Core/Config';
import { onAuthStateChanged } from "firebase/auth";
import AppLoading from 'expo-app-loading';
import List from "../components/List";
import SearchBar from "../components/SearchBar";
import { useFonts } from 'expo-font';

const LikedItemsComponent = () => {
    const [menuMap, setMenuMap] = useState(null);
    const [userDoc, setUserDoc] = useState(null);
    const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useState();
    const [searchPhrase, setSearchPhrase] = useState("");
    const [clicked, setClicked] = useState(false);
    const routes = useRoute();
    const navigation = useNavigation();

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
        readAllItems().then((result) => {
            setMenuMap(result);
        }).catch((error) => console.log('error', error));

        const subscriber = onAuthStateChanged(auth, authStateChanged);
        return subscriber; // unsubscribe on unmount
    }, []);

    const [loaded] = useFonts({
        'publica-sans-m': require('dining_application/assets/fonts/PublicaSans-Medium.otf'),
        'publica-sans-l': require('dining_application/assets/fonts/PublicaSans-Light.otf'),
    });

    if (!loaded) {
        return null;
    }

    if (initializing || userDoc === null) return <AppLoading />;

    if (menuMap == null || userDoc == null) {
        return <AppLoading />;
    }

    let likedItemsList = [];
    let count = 0;
    for (let [key, value] of menuMap) {
        for (let [key1, value1] of value) {
            for (let [key2, value2] of value1) {
                for (let item in value2["food"]) {
                    let ifLiked = false;
                    if (userDoc.likedItems.includes(item)) {
                        ifLiked = true;
                    }
                    likedItemsList.push({ diningHall: key, time: key1, area: key2, itemName: item, liked: ifLiked, link: value2["food"][item][0] });
                    count++;
                }
            }
        }
    }



    return (
        <SafeAreaView style={{ padding: 20, }}>
            {!clicked && <Text style={styles.headerText}>Search today's menu</Text>}

            <SearchBar
                searchPhrase={searchPhrase}
                setSearchPhrase={setSearchPhrase}
                clicked={clicked}
                setClicked={setClicked}
            />
            <List
                searchPhrase={searchPhrase}
                data={likedItemsList}
                setClicked={setClicked}
            />
        </SafeAreaView>
    )
}

function Search() {
    return (
        <View style={{ backgroundColor: "#fff", flex: 1 }}>
            <Gradient style={styles.gradientPosition} color1="#2774AE" color2="#FFD100" />
            <BlurView intensity={90} style={[StyleSheet.absoluteFill, styles.blurContainer, { flex: 1 }]}></BlurView>
            <LikedItemsComponent />
        </View>
    )
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
})

export default Search