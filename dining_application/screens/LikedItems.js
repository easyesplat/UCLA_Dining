import { View, Text, StyleSheet, ScrollView} from 'react-native'
import Gradient from '../assets/gradient.js'
import { BlurView } from 'expo-blur';
import React from 'react'
import { useRoute } from "@react-navigation/native"
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LikedIcon } from '../assets/icons/icons.js';

const LikedItemsComponent = () => {
    const routes = useRoute(); 
    const navigation = useNavigation();
    return (
        <SafeAreaView>
            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false} nestedScrollEnabled={true}>
                <View style={styles.header}>
                    <Text style={styles.headerText}>Your liked items</Text>
                    <LikedIcon/>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

function LikedItems() {
    return(
        <View style={{backgroundColor: "#fff", flex: 1}}>
            {
                <Gradient style={styles.gradientPosition} color1="#D24040" color2="#F5ABAB"/>
            }
            <BlurView intensity={90} style={[StyleSheet.absoluteFill, styles.blurContainer, {flex: 1}]}></BlurView>
            <LikedItemsComponent/>
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