import { View, Text, StyleSheet, ScrollView, FlatList } from 'react-native'
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
import Loading from '../components/loading.js';

const LikedItemsComponent = () => {
    const [menuMap, setMenuMap] = useState(null);
    const [userDoc, setUserDoc] = useState(null);
    const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useState();
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

    if (initializing || userDoc === null) return <Loading/>;

    if (menuMap == null || userDoc == null) {
        return <Loading/>;
    }

    let likedItemsList = [];

    let count = 0;


    for (let [key, value] of menuMap) {
        for (let [key1, value1] of value) {
            for (let [key2, value2] of value1) {
                for (let item in value2["food"]) {
                    if (userDoc.likedItems.includes(item)) {
                        likedItemsList.push({ id: count.toString(), diningHall: key, time: key1, area: key2, itemName: item });
                    }
                    count++;
                }
            }
        }
    }

    console.log(likedItemsList);



    return (
        <SafeAreaView>
            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false} nestedScrollEnabled={true}>
                <View style={styles.header}>
                    <Text style={styles.headerText}>Your liked items</Text>
                    <LikedIcon />
                </View>
                {/* <FlatList
                    data={likedItemsList}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                /> */}
            </ScrollView>
        </SafeAreaView>
    )
}

function LikedItems() {
    return (
        <View style={{ backgroundColor: "#fff", flex: 1 }}>
            {
                <Gradient style={styles.gradientPosition} color1="#D24040" color2="#F5ABAB" />
            }
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

export default LikedItems