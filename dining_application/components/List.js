import React, { useState } from 'react'
import {
	StyleSheet,
	Text,
	View,
	FlatList,
	SafeAreaView,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { ExternalLink, SmallHeart } from "../assets/icons/icons";
import * as WebBrowser from 'expo-web-browser';
import * as Haptics from 'expo-haptics';


// definition of the Item, which will be rendered in the FlatList
const Item = ({ name, diningHall, link, time, itemLiked, area }) => {

	const [result, setResult] = useState(null);

	const _handlePressButtonAsync = async () => {
		let result = await WebBrowser.openBrowserAsync(link);
		setResult(result);
	};

	if (time === "late_night") {
		time = "late night";
	}

	return (
		<View style={styles.item}>
			<View style={{ maxWidth: 200 }}>
				<Text style={styles.title}>{name}</Text>
				<Text style={styles.subHeading}>at <Text style={styles.important}>{area}</Text> at <Text style={styles.important}>{diningHall}</Text> for <Text style={styles.important}>{time}</Text></Text>
			</View>
			<View style={{ flexDirection: 'row', alignItems: "center" }}>
				{
					itemLiked &&
					<View style={styles.likedItem}>
						<SmallHeart liked={true} />
						<Text style={{ color: "#D24040", fontFamily: "publica-sans-m", paddingLeft: 5, lineHeight: 14, fontSize: 12 }}>Liked Item</Text>
					</View>
				}
				<TouchableOpacity style={{marginLeft: 10,}} hitSlop={{ top: 20, left: 20, bottom: 20, right: 20 }} onPress={() => {
					_handlePressButtonAsync();
					Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
				}}>
					<ExternalLink />
				</TouchableOpacity>
			</View>
		</View>
	)


};

// the filter
const List = (props) => {
	const renderItem = ({ item }) => {

		let phrase = props.searchPhrase.toUpperCase().trim().replace(/\s/g, "");
		// when no input, show none
		if (props.searchPhrase === "") {
			return <></>
		}
		// filter of the name
		if (item.itemName.toUpperCase().includes(phrase)) {
			return <Item name={item.itemName} diningHall={item.diningHall} area={item.area} link={item.link} time={item.time} itemLiked={item.liked} />;
		}
		// filter of the dining hall
		if (item.diningHall.toUpperCase().includes(phrase)) {
			return <Item name={item.itemName} diningHall={item.diningHall} area={item.area} link={item.link} time={item.time} itemLiked={item.liked} />;
		}
		//Area
		if (item.area.toUpperCase().includes(phrase)) {
			return <Item name={item.itemName} diningHall={item.diningHall} area={item.area} link={item.link} time={item.time} itemLiked={item.liked} />;
		}
		//meal Period
		if (item.time.toUpperCase().includes(phrase)) {
			return <Item name={item.itemName} diningHall={item.diningHall} area={item.area} link={item.link} time={item.time} itemLiked={item.liked} />;
		}

	};

	return (
		<SafeAreaView style={styles.list__container}>
			<View
				onStartShouldSetResponder={() => {
					props.setClicked(false);
				}}
			>
				<View>
					<FlatList
						data={props.data}
						renderItem={renderItem}
						keyExtractor={(item) => item.id}
						style={{ marginHorizontal: -20, paddingHorizontal: 20, paddingTop: 20, paddingBottom: 200 }}
						showsVerticalScrollIndicator={false}
						maxToRenderPerBatch={15}
					/>
				</View>
				{/* <View style={{height: 200, backgroundColor: "red"}}><Text>Hello</Text></View> */}
			</View>
		</SafeAreaView>
	);
};

export default List;

const styles = StyleSheet.create({
	list__container: {
		// margin: 10,
		height: "100%",
		width: "100%",
	},
	item: {
		marginBottom: 15,
		paddingHorizontal: 20,
		paddingVertical: 20,
		borderRadius: 15,
		shadowColor: 'rgba(100,100,110, 0.18)', // IOS
		shadowOpacity: 1, // IOS
		shadowRadius: 29, //IOS
		backgroundColor: "white",
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: "space-between",
	},
	title: {
		fontSize: 20,
		marginBottom: 3,
		fontFamily: "publica-sans-m"
	},
	subHeading: {
		fontSize: 16,
		fontFamily: "publica-sans-l",
	},
	important: {
		fontFamily: "publica-sans-s",
	},
	likedItem: {
		padding: 6,
		paddingHorizontal: 10,
		backgroundColor: "#F5ABAB",
		borderRadius: 8,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
	}
});
