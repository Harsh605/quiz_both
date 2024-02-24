import { View, Text, StatusBar, Image, TextInput, TouchableOpacity, Linking, FlatList, RefreshControl } from "react-native";

import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { activeTabFunc } from "../../slices/userSlice";

const Navbar = ({ navigation }) => {
    const { activeTabState } = useSelector((state) => state.userCustom)
    const [activeTab, setActiveTab] = useState(activeTabState); // Initial active tab
    const dispatch = useDispatch()

    const handleTabPress = (tabName) => {
        setActiveTab(tabName);
        navigation.navigate(tabName);
    };

    useEffect(() => {
        if (activeTab) {
            dispatch(activeTabFunc({ activeTab }))
        }
    }, [dispatch, activeTab])

    console.log("activeTabState", activeTabState)
    return (
        <View style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginHorizontal: 20,
            marginTop: 22,
        }}>
            <TouchableOpacity onPress={() => handleTabPress('Home')}>
                <Text style={{
                    color: activeTabState === 'Home' ? '#fff' : '#C8C8C8',
                    fontWeight: "500",
                    fontSize: 15,
                    alignSelf: "flex-start",
                    borderBottomWidth: activeTabState === 'Home' ? 1 : 0, // Add border bottom if tab is active
                    borderColor: "#fff",
                }}>
                    Home
                </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => handleTabPress('MyExam')}>
                <Text style={{
                    color: activeTabState === 'MyExam' ? '#fff' : '#C8C8C8',
                    fontWeight: "400",
                    fontSize: 16,
                    alignSelf: "flex-start",
                    borderBottomWidth: activeTabState === 'MyExam' ? 1 : 0, // Add border bottom if tab is active
                    borderColor: "#fff",
                }}>
                    My Exams
                </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => handleTabPress('Winner')}>
                <Text style={{
                    color: activeTabState === 'Winner' ? '#fff' : '#C8C8C8',
                    fontWeight: "400",
                    fontSize: 15,
                    alignSelf: "flex-start",
                    borderBottomWidth: activeTabState === 'Winner' ? 1 : 0, // Add border bottom if tab is active
                    borderColor: "#fff",
                }}>
                    Winner
                </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => handleTabPress('Percentage')}>
                <Text style={{
                    color: activeTabState === 'Percentage' ? '#fff' : '#C8C8C8',
                    fontWeight: "400",
                    fontSize: 15,
                    alignSelf: "flex-start",
                    borderBottomWidth: activeTabState === 'Percentage' ? 1 : 0, // Add border bottom if tab is active
                    borderColor: "#fff",
                }}>
                    Correct %
                </Text>
            </TouchableOpacity>
        </View>
    );
}

export default Navbar