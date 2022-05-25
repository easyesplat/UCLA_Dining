import React from 'react';
import AllDiningHalls from './screens/AllDiningHalls';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeStackNavigator } from './StackNavigator';
import { Food, PersonFill, Feed, TabLikedIcon } from './assets/icons/icons'; 

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
    return (
        <Tab.Navigator initialRouteName='Home' screenOptions={{headerShown: false}}>
            <Tab.Screen name="Home" component={HomeStackNavigator} options={{tabBarActiveTintColor: "#007AFF", tabBarIcon: (tabInfo) => { 
                return (
                    <Food color={tabInfo.focused ? "#007AFF" : "rgba(60, 60, 67, 0.60)"}/>
                )
            }}}/>
            <Tab.Screen name="Liked" component={AllDiningHalls} options={{tabBarActiveTintColor: "#007AFF", tabBarIcon: (tabInfo) => { 
                return (
                    <TabLikedIcon color={tabInfo.focused ? "#007AFF" : "rgba(60, 60, 67, 0.60)"}/>
                )
            }}}/>
            <Tab.Screen name="Feed" component={AllDiningHalls} options={{tabBarActiveTintColor: "#007AFF", tabBarIcon: (tabInfo) => { 
                return (
                    <Feed color={tabInfo.focused ? "#007AFF" : "rgba(60, 60, 67, 0.60)"}/>
                )
            }}}/>
            <Tab.Screen name="Profile" component={AllDiningHalls} options={{tabBarActiveTintColor: "#007AFF", tabBarIcon: (tabInfo) => { 
                return (
                    <PersonFill color={tabInfo.focused ? "#007AFF" : "rgba(60, 60, 67, 0.60)"}/>
                )
            }}}/>
        </Tab.Navigator>
    )
}

export default TabNavigator;