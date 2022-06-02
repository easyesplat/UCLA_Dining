import { View, Text, StyleSheet} from 'react-native'
import Gradient from '../assets/gradient.js'
import { BlurView } from 'expo-blur';
import React from 'react'
import { useRoute } from "@react-navigation/native"
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

const AllDiningHallsComponent = () => {
    const routes = useRoute(); 
    const navigation = useNavigation();
    return (
        <SafeAreaView>

        </SafeAreaView>
    )
}

function AllDiningHalls() {
    return(
        <View style={{backgroundColor: "#fff"}}>
            <Gradient style={styles.gradientPosition} color1="#2774AE" color2="#FFD100" />
            <BlurView intensity={90} style={[StyleSheet.absoluteFill, styles.blurContainer]}></BlurView>
            <AllDiningHallsComponent/>
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
    }
})

export default AllDiningHalls