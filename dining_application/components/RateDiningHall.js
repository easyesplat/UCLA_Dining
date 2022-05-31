import { StyleSheet, Text, View, SafeAreaView } from 'react-native'
import React, { useState } from 'react'
import DropDownPicker from 'react-native-dropdown-picker';


function RateDiningHall(props) {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState();
    const [activity, setActivity] = useState([
        { label: 'Crowded', value: 4 },
        { label: 'A little busy', value: 3 },
        { label: 'Not very busy', value: 2 },
        { label: 'Empty', value: 1 },
    ]);
    const [open2, setOpen2] = useState(false);
    const [value2, setValue2] = useState();
    const [lines, setLines] = useState([
        { label: 'Yes', value: 1 },
        { label: 'No', value: 0 },
    ]);
    const [open3, setOpen3] = useState(false);
    const [value3, setValue3] = useState();
    const [locker, setLocker] = useState([
        { label: 'No lockers available', value: 4 },
        { label: 'Have to search a little', value: 3 },
        { label: 'A lot of broken/locked lockers', value: 2 },
        { label: 'No lockers available', value: 1 },
    ]);

    const myTheme = require("../Themes/dropdownThemeRating.js");

    DropDownPicker.addTheme("MyThemeName", myTheme);
    DropDownPicker.setTheme("MyThemeName");
    return (
        <SafeAreaView>
            <Text style={styles.header}>Rate {props.name}</Text>
            <>
                <Text style={styles.subheading}>How busy is the dining hall</Text>
                <DropDownPicker
                    open={open}
                    value={value}
                    items={activity}
                    setOpen={setOpen}
                    setValue={setValue}
                    setItems={setActivity}
                    theme="MyThemeName"
                    multiple={false}
                    mode="BADGE"
                    placeholderStyle={{
                        color: "#3a3a3a",
                        fontFamily: "publica-sans-l",
                        fontSize: 13,
                    }}
                    closeAfterSelecting={true}
                    zIndex={2000}
                    zIndexInverse={1000}
                />
            </>
        </SafeAreaView>
    )
}

export default RateDiningHall;

const styles = StyleSheet.create({
    header: {
        fontFamily: "publica-sans-m",
        color: "white",
        fontSize: 27,
        lineHeight: 33,
        marginTop: 20,
        textAlign: "left"
    },
    subheading: {
        color: "white",
        fontFamily: "publica-sans-s",
        fontSize: 18,
        lineHeight: 20,
    }
})