import React from "react";
import { View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Block from "./block";
import ChevronRight from "../assets/icons/chevron-right";
import { useFonts } from 'expo-font';

function numSwipesLeft(mealPlan, premium) {
    const currentDate = new Date();
    let day = currentDate.getDay() - 1; 

    day === -1 ? day = 6: day; 
    const currentHour = currentDate.getHours()
    const endDate = new Date("06/10/2022"); 
    const diffInWeeks = (endDate.getTime() - currentDate.getTime()) / (1000 * 3600 * 24) / 7;

    const mealTimes = [10, 15, 21]; 
    let numMealPeriodsDone = 0; 
    for(let i = 0; i < 3; i++) {
        if(currentHour > mealTimes[i]) {
            numMealPeriodsDone++;  
        }
        else {
            break; 
        }
    }
    let numMealPeriodsDoneTwice = 0; 
    for(let i = 1; i < 3; i++) {
        if(currentHour > mealTimes[i]) {
            numMealPeriodsDoneTwice++;  
        }
        else {
            break; 
        }
    }
    let startingAmount; 
    if (mealPlan === 19) {
        startingAmount = 19; 
        if (day >= 0 && day <= 4) {
            startingAmount = startingAmount - numMealPeriodsDone - day * 3; 
        }
    } else if (mealPlan === 14) {
        startingAmount = startingAmount - numMealPeriodsDoneTwice - day * 2; 
        console.log(startingAmount); 
    } else if (mealPlan === 11) {

    }

}

function MealPlanIcon(props) {
    return (
        <View style={[styles.circle, props.style]}>
            <Text style={{fontFamily: "sf-pro-sb", fontSize: 16, paddingTop: 2, color: "#fff"}}>{props.mealPlan}</Text>
        </View>
    );
}


function MealPlan(props) {
    const [loaded] = useFonts({
        'sf-pro-sb': require('dining_application/assets/fonts/SF-Pro-Text-Semibold.otf'),
    });
    
    if (!loaded) {
        return null;
    }

    numSwipesLeft(14    , true); 

    return (
        <TouchableOpacity>
            <Block style={{flexDirection: "column", alignItems: "flex-end"}}>
                <View style={{flexDirection: "row", alignItems: "center", width: "100%", margin: 5}}>
                    <MealPlanIcon style={{marginRight: 10}} mealPlan={props.mealPlan}/>
                    <Text style={{fontFamily: "sf-pro-sb", fontSize: 14, flex: 1, flexWrap: 'wrap'}}>You should have <Text style={{color: "#005587"}} >122</Text> meal swipes remaining for the quarter</Text>
                    <ChevronRight style={{marginRight: 10}}/>
                </View>
            </Block>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    circle: {
        borderRadius: "50%",
        width: 43,
        height: 43, 
        backgroundColor: "#005587",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    }


}); 

export default MealPlan; 