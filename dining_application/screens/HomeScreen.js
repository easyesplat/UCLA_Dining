import * as React from 'react';
import { Button, View, Text, SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, FlatList, SectionList} from 'react-native';
import Menubutton from 'dining_application/components/menubutton.js';
import { BlurView } from 'expo-blur';
import Gradient from 'dining_application/assets/gradient.js'
import Refresh from '../assets/icons/refresh';
import Gear from '../assets/icons/gear';
import BellNotification from '../assets/icons/bell_notification';
import { useFonts } from 'expo-font';

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

function ActiveDiningHalls() {
    let activeDiningHalls = []; 
    let sortedData = DATA.slice(); 
    sortedData.sort(function (a, b) {
        return a.waitTime - b.waitTime;
    }); 
    for (let i = 0; i < sortedData.length; i++) {
        activeDiningHalls.push(<Menubutton name={sortedData[i].name} waitTime={sortedData[i].waitTime} imageUri={sortedData[i].imageUri} key={sortedData[i].id.toString()}/>); 
    }

    return (
        <View style={styles.grid}>
            {activeDiningHalls}
        </View>
    ); 
}

// function DiningHalls() {
    
//     const renderMenuButton = ({item}) => (
//         <Menubutton name={item.name} waitTime={item.waitTime} imageUri={item.imageUri}/>
//     ); 

//     return (
//         <FlatList
//             data={DATA}
//             renderItem={renderMenuButton}
//             keyExtractor={item => item.id}
//             numColumns={2}
//             style={styles.list}
//             scrollEnabled={false}
//         />
//     ); 
// }



function HomeScreenContent({navigation}) {
    const [loaded] = useFonts({
        'sf-pro-b': require('dining_application/assets/fonts/SF-Pro-Text-Bold.otf'),
        'sf-pro-sb': require('dining_application/assets/fonts/SF-Pro-Text-Semibold.otf'),
    });
    
    if (!loaded) {
        return null;
    }

    let hours = new Date().getHours(); 

    let greeting = "Morning";
    if (hours > 11 && hours < 18) {
        greeting = "Afternoon"; 
    } else if (hours > 17 && hours < 21) {
        greeting = "Evening"; 
    } else if (hours > 20 || hours < 4) {
        greeting = "Night"; 
    }

    let mealPeriod = "Dining Halls are currently closed";
    if (hours > 6 && hours < 11) {
        mealPeriod = "Dining Halls open for breakfast"; 
    } else if (hours > 10 && hours < 16) {
        mealPeriod = "Dining Halls open for lunch"; 
    } else if (hours > 16 && hours < 22) {
        mealPeriod = "Dining Halls open for dinner"; 
    } else if (hours > 21 || hours === 0) {
        mealPeriod = "Dining Halls open for late night"; 
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
                <Text style={{fontFamily: "sf-pro-sb", fontSize: 20, marginBottom: 10,}}>{mealPeriod}</Text>
                <ActiveDiningHalls/>
            </ScrollView>
        </SafeAreaView>
    );
}

function HomeScreen({ navigation }) {
    return (
        <View>
            <Gradient style={styles.gradientPosition}></Gradient>
            <BlurView intensity={90} style={[StyleSheet.absoluteFill, styles.blurContainer]}></BlurView>
            <HomeScreenContent></HomeScreenContent>
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
        fontSize: 36,
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
    },
});

export default HomeScreen