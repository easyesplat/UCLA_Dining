import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Block from "./block";
import ChevronRight from "../assets/icons/chevron-right";
import * as WebBrowser from 'expo-web-browser';
import * as Haptics from 'expo-haptics';
import SimpleButton from "./simpleButton";

function numSwipesLeft(mealPlan, premium) {
    const currentDate = new Date();
    let day = currentDate.getDay() - 1;
    day === -1 ? day = 6 : day;
    //day = 6; 
    let currentHour = currentDate.getHours() + (currentDate.getMinutes() / 60);
    const endDate = new Date("06/10/2022");
    const diffInWeeks = Math.floor(((endDate.getTime() - currentDate.getTime()) / (1000 * 3600 * 24) / 7));

    const mealTimes = [10, 15, 21];
    let numMealPeriodsDone = 0;
    for (let i = 0; i < 3; i++) {
        if (currentHour > mealTimes[i]) {
            numMealPeriodsDone++;
        }
        else {
            break;
        }
    }
    let numMealPeriodsDoneTwiceADay = 0;
    for (let i = 1; i < 3; i++) {
        if (currentHour > mealTimes[i]) {
            numMealPeriodsDoneTwiceADay++;
        }
        else {
            break;
        }
    }
    let amount;
    let multiplier;
    if (mealPlan === 19) {
        amount = 19;
        multiplier = 19;
        if (day >= 0 && day <= 4) {
            amount = amount - numMealPeriodsDone - day * 3;
            // console.log(startingAmount); 
        } else {
            amount = 4;
            day = day - 5;
            amount = amount - numMealPeriodsDoneTwiceADay - day * 2;
        }
    } else if (mealPlan === 14) {
        amount = 14;
        multiplier = 14;
        amount = amount - numMealPeriodsDoneTwiceADay - day * 2;
        // console.log(startingAmount); 
    } else if (mealPlan === 11) {
        amount = 11;
        multiplier = 11;
        amount = amount - numMealPeriodsDoneTwiceADay - day * 2;
        if (day >= 0 && day <= 4) {
            amount = amount - numMealPeriodsDoneTwiceADay - day * 2;
        } else {
            amount = 1;
            day = day - 5;
            amount = amount - numMealPeriodsDoneTwiceADay - day * 2;
        }
        // console.log(startingAmount); 
    }

    if (premium === "P") {
        amount = amount + (multiplier * diffInWeeks) - 4;
        if (mealPlan === "11") {
            amount += 4;
        }
    }

    if (amount < 0) {
        amount = 0;
    }

    return amount;

}

function MealPlanIcon(props) {
    return (
        <View style={[styles.circle, props.style]}>
            <Text style={{ fontFamily: "sf-pro-sb", fontSize: 16, paddingTop: 2, color: "#fff" }}>{props.mealPlan}</Text>
        </View>
    );
}


function MealPlan(props) {
    const [result, setResult] = useState(null);
    const _handlePressButtonAsync = async () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        let result = await WebBrowser.openBrowserAsync('https://myhousing.hhs.ucla.edu/shib/swipes');
        setResult(result);
    };

    let number;
    let word;

    //props.type === "R" ? number = numSwipesLeft(props.mealPlan, props.type) : numSwipesLeft(props.mealPlan, true); 
    number = numSwipesLeft(props.mealPlan, props.type)
    props.type === "R" ? word = "week" : word = "quarter";


    return (
        <Block>
            <View style={{ flexDirection: "row", alignItems: "center", width: "100%", margin: 5 }}>
                <MealPlanIcon style={{marginRight: 10}} mealPlan={props.mealPlan + props.type}/>
                <Text style={{fontFamily: "publica-sans-s", fontSize: 16, flex: 1, flexWrap: 'wrap'}}>You should have <Text style={{color: "#005587"}} >{number}</Text> meal swipes remaining for the {word}</Text>
            </View>
            <SimpleButton style={{ alignSelf: "flex-end", marginTop: 10, }} background="true" text="Check your swipe count" onPress={_handlePressButtonAsync} />
        </Block>
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