import { View, Text, StatusBar, Image, TextInput, TouchableOpacity, Linking, FlatList, RefreshControl } from "react-native";

import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { activeTabFunc, allOnGoingExams, myProfile } from "../../slices/userSlice";
import { allMyExams, correctPercentPageAllExams, winnerPageAllExams } from "../../slices/examSlice";

const Navbar = ({ navigation }) => {
    const { activeTabState } = useSelector((state) => state.userCustom)
    const [activeTab, setActiveTab] = useState(activeTabState); // Initial active tab
    const dispatch = useDispatch()

    const handleTabPress = (tabName) => {
        setActiveTab(tabName);
        navigation.navigate(tabName);
        dispatch(activeTabFunc({ activeTab: tabName }));
    };

    useEffect(() => {
        setActiveTab(activeTabState);
    }, [activeTabState]);

    // console.log("activeTabState", activeTabState)
    // console.log("activeTab", activeTab)
    return (
        <View style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginHorizontal: 20,
            marginTop: 22,
        }}>
            <TouchableOpacity onPress={() => {handleTabPress('Home'),dispatch(allOnGoingExams())}}>
                <Text style={{
                    color: activeTab === 'Home' ? '#fff' : '#C8C8C8',
                    fontWeight: "500",
                    fontSize: 15,
                    alignSelf: "flex-start",
                    borderBottomWidth: activeTab === 'Home' ? 1 : 0, // Add border bottom if tab is active
                    borderColor: "#fff",
                }}>
                    Home
                </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() =>{ handleTabPress('MyExam'),dispatch(allMyExams({ hit: "LIVE", name: "" }))}}>
                <Text style={{
                    color: activeTab === 'MyExam' ? '#fff' : '#C8C8C8',
                    fontWeight: "400",
                    fontSize: 16,
                    alignSelf: "flex-start",
                    borderBottomWidth: activeTab === 'MyExam' ? 1 : 0, // Add border bottom if tab is active
                    borderColor: "#fff",
                }}>
                    My Exams
                </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => {handleTabPress('Winner'),dispatch(winnerPageAllExams())}}>
                <Text style={{
                    color: activeTab === 'Winner' ? '#fff' : '#C8C8C8',
                    fontWeight: "400",
                    fontSize: 15,
                    alignSelf: "flex-start",
                    borderBottomWidth: activeTab === 'Winner' ? 1 : 0, // Add border bottom if tab is active
                    borderColor: "#fff",
                }}>
                    Winner
                </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => {handleTabPress('Percentage'),dispatch(correctPercentPageAllExams())}}>
                <Text style={{
                    color: activeTab === 'Percentage' ? '#fff' : '#C8C8C8',
                    fontWeight: "400",
                    fontSize: 15,
                    alignSelf: "flex-start",
                    borderBottomWidth: activeTab === 'Percentage' ? 1 : 0, // Add border bottom if tab is active
                    borderColor: "#fff",
                }}>
                    Correct %
                </Text>
            </TouchableOpacity>
        </View>
    );
}

export default Navbar