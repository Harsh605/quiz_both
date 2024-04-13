import { View, Text, StatusBar, Image, TextInput, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import { SafeAreaView } from 'react-native-safe-area-context';
import { AntDesign } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { winnerPageAllExams, winnerPageLeadersboard } from '../../slices/examSlice';



const WinnerDetail = ({ navigation, route }) => {
    const dispatch = useDispatch()
    const gameId = route.params?.gameid || null;
    const noOfQue = route.params?.noOfQue || null;

    console.log("gameId..............",gameId)



    const [filterText, setFilterText] = useState("");
    const { winnerPageLeadersboardData } = useSelector((state) => state.examCustom)

    useEffect(() => {
        dispatch(winnerPageLeadersboard({ name: "", gameId }))
    }, [dispatch]);

    const filteredData = winnerPageLeadersboardData?.filter((item) =>
        item.User[0].name.toLowerCase().includes(filterText.toLowerCase()) ||
        item.User[0].id.toLowerCase().includes(filterText.toLowerCase())
    );


    return (
        <>
            <SafeAreaView style={{ backgroundColor: '#fff', flex: 1 }} >
                <StatusBar translucent={true} barStyle={'light-content'} backgroundColor={'#6A5AE0'} />

                <View style={{ height: responsiveHeight(7), width: responsiveWidth(100), justifyContent: 'center', backgroundColor: '#6A5AE0', paddingHorizontal: 20 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
                        <TouchableOpacity onPress={() => navigation.goBack()} style={{ justifyContent: 'center', alignSelf: 'flex-start', marginTop: 15 }}>
                            <AntDesign name="arrowleft" size={24} color="white" />
                        </TouchableOpacity>

                        <Text style={{ color: '#fff', fontSize: 20, fontWeight: '500', alignSelf: 'center', marginTop: 15, marginLeft: '24%' }}>Winner Details</Text>
                    </View>
                </View>

                <View
                    style={{
                        height: responsiveHeight(8.1),
                        flexDirection: "row",
                        width: responsiveWidth(95),
                        alignSelf: "center",
                        marginTop: 20,
                        borderRadius: 10,
                        backgroundColor: "#6A5AE0",
                    }}
                >
                    <View
                        style={{
                            backgroundColor: "#fff",
                            height: responsiveHeight(5.5),
                            width: responsiveWidth(84),
                            borderRadius: 10,
                            justifyContent: "center",
                            marginTop: 10,
                            flexDirection: "row",
                            marginHorizontal: 20,
                        }}
                    >
                        <View
                            style={{
                                flex: 0.15,
                                justifyContent: "center",
                                alignSelf: "center",
                            }}
                        >
                            <Image
                                source={require("../images/search.png")}
                                style={{
                                    tintColor: "#C0C0C0",
                                    height: responsiveHeight(3),
                                    width: responsiveWidth(6),
                                    marginLeft: 10,
                                }}
                            />
                        </View>

                        <View
                            style={{ flex: 0.8, justifyContent: "center", alignSelf: "center" }}
                        >
                            <TextInput
                                onChangeText={(value) => setFilterText(value)}
                                require
                                placeholder="Search here.."
                                placeholderTextColor={"#000"}
                                style={{
                                    color: "#000",
                                    marginLeft: 15,
                                    fontWeight: "400",
                                    fontSize: 17,
                                    fontFamily: "Jaldi-Regular",
                                }}
                            />
                        </View>
                    </View>

                    {/* <View style={{ alignSelf: "center" }}>
                    <Image
                        source={require("../images/calender.png")}
                        style={{
                            tintColor: "#fff",
                            height: responsiveHeight(4),
                            width: responsiveWidth(8),
                            marginLeft: 10,
                        }}
                    />
                </View> */}
                </View>

                <View
                    style={{
                        height: responsiveHeight(42),
                        width: responsiveWidth(95),
                        marginBottom: 10,
                        paddingHorizontal: 20,
                        backgroundColor: "#fff",
                        alignSelf: "center",
                        borderBottomLeftRadius: 8,
                        borderBottomRightRadius: 8,

                    }}
                >
                    <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            height: responsiveHeight(6),
                            width: responsiveWidth(90),
                            borderRadius: 2,
                            marginTop: 10,
                            backgroundColor: "#fff",
                            alignSelf: "center",
                            // marginLeft: 10,
                            // marginRight: 20
                        }}
                    >
                        <Text
                            style={{ alignSelf: "center", color: "#000", fontWeight: "500" }}
                        >
                            Rank
                        </Text>

                        <Text
                            style={{
                                alignSelf: "center",
                                color: "#000",
                                fontWeight: "500",
                                marginLeft: -5,
                                marginRight: 10
                            }}
                        >
                            Name
                        </Text>



                        <Text
                            style={{
                                alignSelf: "center",
                                color: "#000",
                                fontWeight: "500",
                                marginRight: 10,
                            }}
                        >
                            Id
                        </Text>

                        <Text
                            style={{
                                alignSelf: "center",
                                color: "#000",
                                fontWeight: "500",
                                // marginRight: 10,
                                flex: 0.15
                            }}
                        >
                            Price
                        </Text>

                        <Text
                            style={{ alignSelf: "center", color: "#000", fontWeight: "500",flex: 0.15 }}
                        >
                            Point
                        </Text>
                    </View>

                    {
                        filteredData?.map((res, index) => {
                            console.log(res, "rom");
                            // console.log(res.User[0].id,"resId");
                            return (
                                <>
                                    <TouchableOpacity
                                        key={index}
                                        style={{
                                            flexDirection: "row",
                                            justifyContent: "space-between",
                                            height: responsiveHeight(6),
                                            width: responsiveWidth(90),
                                            paddingHorizontal: 10,
                                            borderRadius: 2,
                                            marginTop: 5,
                                            backgroundColor: "#EDEAFB",
                                            alignSelf: "center",
                                        }}
                                        onPress={() => navigation.navigate("AllQuestion", { gameId: gameId, id: (res.User[0]._id), noOfQue })}
                                    >
                                        <Text style={{ alignSelf: "center", color: "#6A5AE0", flex: 0.10, }}>{res?.rank}</Text>
                                        <Text style={{ alignSelf: "center", color: "#000",  flex: 0.20,}}>{res.User[0].name}</Text>
                                        <Text style={{ alignSelf: "center", color: "#000", flex: 0.30 }}>{res.User[0].id}</Text>

                                        <Text style={{ alignSelf: "center", color: "green", flex: 0.20 }}>{res?.wonAmount > 0 ? res?.wonAmount+"₹" :res?.wonAmount  }</Text>


                                        <Text
                                            style={{ alignSelf: "center", color: "#000", fontWeight: "500", flex: 0.05 }}
                                        >
                                            {res?.mainPoints}
                                        </Text>
                                    </TouchableOpacity>
                                </>
                            )
                        })
                    }






                </View>

            </SafeAreaView>
        </>
    )
}

export default WinnerDetail