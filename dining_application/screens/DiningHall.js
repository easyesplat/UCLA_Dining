import { View, Text, StyleSheet, ImageBackground, Dimensions} from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ScrollView } from 'react-native-gesture-handler'
import Overlay from '../assets/overlay'
import { LinearGradient } from 'expo-linear-gradient';

const DiningHall = () => {
    return (
        <View>
            <ImageBackground style={styles.header} resizeMode="cover" source={require("dining_application/assets/diningHallImages/epicimage.jpeg")}>
                <LinearGradient 
                    colors={['transparent', 'rgba(11,11,13,0.4)']}
                    style={styles.background}
                />
                
            </ImageBackground>
        
            <SafeAreaView>
                <ScrollView>
                    <Text> Hello </Text>
                </ScrollView>
            </SafeAreaView>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        height: 400, 
        //alignItems: "flex-end", 
        justifyContent: "flex-end"
    },
    background: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: "100%",
    },

}); 

export default DiningHall; 