import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import DropDownPicker from 'react-native-dropdown-picker';
import StarRating from 'react-native-star-rating-widget';


function RateDiningHall(props) {
    const [rating, setRating] = useState(0);
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState();
    const [activity, setActivity] = useState([
        { label: "I don't feel safe", value: 5 },
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
        { label: 'Lockers GALORE', value: 1 },
    ]);

    const myTheme = require("../Themes/dropdownThemeRating.js");

    let allowLocker = false;
    if (props.name == "De Neve" || props.name == "Epicuria" || props.name == "Bruin Plate" || props.name == "The Feast") allowLocker = true

    DropDownPicker.addTheme("MyThemeName", myTheme);
    DropDownPicker.setTheme("MyThemeName");
    return (
        <SafeAreaView>
            <View style={{ width: "100%", flex: 1 }}>
                <Text style={styles.header}>Rate {props.name}</Text>
                <>
                    <Text style={styles.subheading}>How busy is {props.name}</Text>
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
                        zIndex={3000}
                        zIndexInverse={1000}
                    />
                </>
                <>
                    <Text style={styles.subheading}>Long lines?</Text>
                    <DropDownPicker
                        open={open2}
                        value={value2}
                        items={lines}
                        setOpen={setOpen2}
                        setValue={setValue2}
                        setItems={setLines}
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
                        zIndexInverse={2000}
                    />
                </>
                {
                    allowLocker &&
                    <>
                        <Text style={styles.subheading}>Are there even lockers?</Text>
                        <DropDownPicker
                            open={open3}
                            value={value3}
                            items={locker}
                            setOpen={setOpen3}
                            setValue={setValue3}
                            setItems={setLocker}
                            theme="MyThemeName"
                            multiple={false}
                            mode="BADGE"
                            placeholderStyle={{
                                color: "#3a3a3a",
                                fontFamily: "publica-sans-l",
                                fontSize: 13,
                            }}
                            closeAfterSelecting={true}
                            zIndex={1000}
                            zIndexInverse={3000}
                        />
                    </>
                }
                <Text style={styles.subheading}>Ok but seriously, how was the food?</Text>
                <View style={{alignSelf: 'center', marginTop: 10, backgroundColor: 'white', padding: 15, width: "100%", borderRadius: 18, paddingBottom: 18, }}>
                    <StarRating
                        rating={rating}
                        onChange={setRating}
                        halfStarEnabled={true}
                    />
                </View>
                <TouchableOpacity
                    style={styles.button}
                >
                    <Text style={styles.buttonOutlineText}>Submit</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default RateDiningHall;

const styles = StyleSheet.create({
    header: {
        fontFamily: "publica-sans-m",
        color: "white",
        fontSize: 37,
        lineHeight: 40,
        marginTop: 40,
        textAlign: "left",
        marginBottom: 60,
    },
    subheading: {
        color: "white",
        fontFamily: "publica-sans-s",
        fontSize: 18,
        lineHeight: 20,
        marginTop: 20,
    },
    button: {
        width: '100%',
        padding: 15,
        borderRadius: 18,
        alignItems: 'center',
        marginTop: 5,
        borderColor: 'white',
        borderWidth: 2,
        justifyContent: 'center',
        marginTop: 80,
        marginBottom: 20,
        alignSelf: "flex-end"
    },
    buttonOutlineText: {
        color: 'white',
        fontFamily: "publica-sans-m",
        fontSize: 14,
        paddingHorizontal: 30,
    },
})