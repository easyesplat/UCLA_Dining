import { View, Text, StyleSheet, ImageBackground, Dimensions, StatusBar} from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ScrollView } from 'react-native-gesture-handler'
import { LinearGradient } from 'expo-linear-gradient';
import { useFonts } from 'expo-font';
import { useRoute } from "@react-navigation/native"
import DiningLogo from '../assets/icons/diningLogo';
import Block from '../components/block';

function DiningHall() {
    const routes = useRoute(); 
    const [loaded] = useFonts({
        'dining-font': routes.params.data.font,
        'sf-pro-b': require('dining_application/assets/fonts/SF-Pro-Text-Bold.otf'),
        'sf-pro-sb': require('dining_application/assets/fonts/SF-Pro-Text-Semibold.otf'),
    });
    
    if (!loaded) {
        return null;
    }

    return (
        <View style={{backgroundColor: "#fff"}}>
            <ScrollView>
                <ImageBackground transition={false} style={styles.header} resizeMode="cover" source={routes.params.data.imageUri}>
                    <LinearGradient 
                        colors={['transparent', 'rgba(11,11,13,0.4)']}
                        style={StyleSheet.absoluteFill}
                    />
                    <DiningLogo name={routes.params.name}/>
                </ImageBackground>
                <View style={styles.body}>
                    <Block>
                        <View style={{padding: 8}}>
                            <Text style={styles.insightsHeaderText}>{routes.params.name} at a glance</Text>
                        </View>
                    </Block>
                </View>
                <SafeAreaView>
                    <Text>{routes.params.name}</Text>
                    <Text>{routes.params.name}</Text>
                    <Text>{routes.params.name}</Text>
                    <Text>{routes.params.name}</Text>
                    <Text>{routes.params.name}</Text>
                    <Text>{routes.params.name}</Text>
                    <Text>{routes.params.name}</Text>
                    <Text>{routes.params.name}</Text>
                    <Text>{routes.params.name}</Text>
                    <Text>{routes.params.name}</Text>
                    <Text>{routes.params.name}</Text>
                    <Text>{routes.params.name}</Text>
                    <Text>{routes.params.name}</Text>
                    <Text>{routes.params.name}</Text>
                    <Text>{routes.params.name}</Text>
                    <Text>{routes.params.name}</Text>
                    <Text>{routes.params.name}</Text>
                    <Text>{routes.params.name}</Text>
                    <Text>{routes.params.name}</Text>
                    <Text>{routes.params.name}</Text>
                    <Text>{routes.params.name}</Text>
                    <Text>{routes.params.name}</Text>
                    <Text>{routes.params.name}</Text>
                    <Text>{routes.params.name}</Text>
                    <Text>{routes.params.name}</Text>
                    <Text>{routes.params.name}</Text>
                    <Text>{routes.params.name}</Text>
                    <Text>{routes.params.name}</Text>
                    <Text>{routes.params.name}</Text>
                    <Text>{routes.params.name}</Text>
                    <Text>{routes.params.name}</Text>
                    <Text>{routes.params.name}</Text>
                    <Text>{routes.params.name}</Text>
                    <Text>{routes.params.name}</Text>
                    <Text>{routes.params.name}</Text>
                    <Text>{routes.params.name}</Text>
                    <Text>{routes.params.name}</Text>
                    <Text>{routes.params.name}</Text>
                    <Text>{routes.params.name}</Text>
                    <Text>{routes.params.name}</Text>
                    <Text>{routes.params.name}</Text>
                    <Text>{routes.params.name}</Text>
                    <Text>{routes.params.name}</Text>
                </SafeAreaView>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        height: 400, 
        //alignItems: "flex-end", 
        justifyContent: "flex-end",
        padding: 20,
    },
    headerText:  {
        fontFamily: "dining-font", 
        fontSize: 56, 
        color: "#fff",
        paddingTop: 15,
        overflow: "visible"
    }, 
    body: {
        paddingHorizontal: 20, 
    }, 
    insightsHeaderText: {
        fontFamily: 'sf-pro-sb', 
        fontSize: 18, 
    }, 




}); 

export default DiningHall; 