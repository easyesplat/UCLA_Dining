import { View, Text } from 'react-native';
import React,  { useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import DiningHall from './screens/DiningHall';
import AllDiningHalls from './screens/AllDiningHalls';
import LoginScreen from './screens/LoginScreen';
import TabNavigator from './TabNavigator';
import { onAuthStateChanged } from 'firebase/auth'; 
import { auth } from './Core/Config'


const Stack = createNativeStackNavigator(); 

const StackNavigator = () => {
    const signedIn = onAuthStateChanged(auth, (user) => {
        if (user) {
            return false; 
        } else {
            return true; 
        }
    })

    return (
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Group>
                {
                    signedIn &&
                    <Stack.Screen name="Login" component={LoginScreen}/>
                }
                <Stack.Screen name="HomeScreen" component={TabNavigator}/>
            </Stack.Group>
        </Stack.Navigator>
    )
}



const HomeStack = createNativeStackNavigator(); 

const HomeStackNavigator = () => {
    return (
        <HomeStack.Navigator screenOptions={{headerShown: false}}>
            <HomeStack.Group>
                <Stack.Screen name="HomeScreen" component={HomeScreen}/>
                <Stack.Screen name="Dining Halls" component={DiningHall}/>
                <Stack.Screen name="All Dining Halls" component={AllDiningHalls}/>
            </HomeStack.Group>
        </HomeStack.Navigator>
    )
}

export { HomeStackNavigator, StackNavigator }; 
