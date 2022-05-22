import React, { Suspense } from 'react';
import { View, StyleSheet } from 'react-native';
import { BlurView } from 'expo-blur';
import Gradient from 'dining_application/assets/gradient.js'
import HomeScreenContent from '../components/HomeScreenContent'


function HomeScreen() {
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
});

export default HomeScreen