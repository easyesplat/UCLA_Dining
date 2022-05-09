import * as React from 'react';
import { Button, View, Text, SafeAreaView, ScrollView, StyleSheet} from 'react-native';
import Menubutton from 'dining_application/components/menubutton.js';
import { BlurView } from 'expo-blur';
import Gradient from 'dining_application/assets/gradient.js'

function HomeScreen({ navigation }) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Gradient style={styles.gradientPosition}></Gradient>
            <BlurView intensity={100} style={[StyleSheet.absoluteFill, styles.blurContainer]}></BlurView>
        <Text>Home Screen</Text>
            <Button
                title="Go to Details"
                onPress={() => navigation.navigate('Details')}
            />
            <Menubutton name="Epicuria" waitTime="23" imageUri={require('dining_application/assets/epicimage.jpeg')}/>
        </View>
    );
}

export default HomeScreen