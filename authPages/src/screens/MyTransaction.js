import { View, Text, StatusBar, Image, TextInput, TouchableOpacity, Clipboard } from 'react-native'
import React, { useEffect, useState } from 'react'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import { ScrollView } from 'react-native-gesture-handler'
import ScrollableTabView, { DefaultTabBar } from 'react-native-scrollable-tab-view';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AntDesign } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { base_url } from "./Base_url";
import { formatTimestamp } from "./../utils/formatDate";


const MyTransaction = ({ navigation }) => {
    const [widraw, setWidraw] = useState(0)
    const [his, setHis] = useState(0)
    const [widrawdata, setwidrawdata] = useState([])
    const [depositdata, setdepositdata] = useState([])
    const [quiseRewarddata, setquiseRewarddata] = useState([])
    const [mydata, setMydata] = useState([])
    const [filterText, setFilterText] = useState("");
    const [filterText2, setFilterText2] = useState("");
    const [filterText3, setFilterText3] = useState("");
    const [filterText4, setFilterText4] = useState("");



    function convertMillisecondsToDateTime(milliseconds) {
        const dateObject = new Date(milliseconds);
        return dateObject.toLocaleString();
    }

    let index = 1


    const Widrawal = async () => {
        try {
            var myHeaders = new Headers();
            myHeaders.append(
                "Authorization",
                `${await AsyncStorage.getItem("token")}`
            );

            var requestOptions = {
                method: 'GET',
                headers: myHeaders,
                redirect: 'follow'
            };

            fetch(`${base_url}/withdraw-history`, requestOptions)
                .then(response => response.json())
                .then(result => {
                    // console.log(result.data.transactions)
                    setwidrawdata(result.data.transactions)

                })
                .catch(error => console.log('error', error));
        } catch (error) {
            console.log(error);
        }
    }

    const depositData = async () => {
        try {
            var myHeaders = new Headers();
            myHeaders.append(
                "Authorization",
                `${await AsyncStorage.getItem("token")}`
            );

            var requestOptions = {
                method: 'GET',
                headers: myHeaders,
                redirect: 'follow'
            };

            fetch(`${base_url}/deposit-history`, requestOptions)
                .then(response => response.json())
                .then(result => {
                    // console.log(result.data.transactions)
                    setdepositdata(result.data.transactions)
                })
                .catch(error => console.log('error', error));
        } catch (error) {
            console.log(error);
        }
    }

    const quiseReward = async () => {
        try {
            var myHeaders = new Headers();
            myHeaders.append(
                "Authorization",
                `${await AsyncStorage.getItem("token")}`
            );

            var requestOptions = {
                method: 'GET',
                headers: myHeaders,
                redirect: 'follow'
            };

            fetch(`${base_url}/quiz-history`, requestOptions)
                .then(response => response.json())
                .then(
                    result => {
                        console.log(result.data.quizs,"asdasdasd.....................")

                        setquiseRewarddata(result.data.quizs)
                    })
                .catch(error => console.log('error', error));
        } catch (error) {
            console.log(error);
        }
    }

    const referhistoryApi = async () => {
        try {
            var myHeaders = new Headers();
            myHeaders.append("Authorization", `${await AsyncStorage.getItem("token")}`);

            var requestOptions = {
                method: 'GET',
                headers: myHeaders,
                redirect: 'follow'
            };

            fetch(`${base_url}/ref-history`, requestOptions)
                .then(response => response.json())
                .then(result => {
                    if (result.success == true) {
                        console.log(result.data.refReward, "ababa")
                        setMydata(result.data.refReward)
                    }
                })
                .catch(error => console.log('error', error));

        } catch (error) {
            console.log(error, "error");

        }
    }

    function copydata(text) {
        Clipboard.setString(text);
        alert('Text copied to clipboard: ' + text);
    }

    useEffect(() => {
        Widrawal({ name: filterText });
        depositData({ name: filterText2 });
        quiseReward({ name: filterText3 });
        referhistoryApi({ name: filterText4 });
    }, [filterText, filterText2, filterText3, filterText4])

    console.log(filterText);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>

            <View style={{ height: responsiveHeight(8), width: responsiveWidth(100), justifyContent: 'center', backgroundColor: '#6A5AE0', paddingHorizontal: 20 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={{ justifyContent: 'center', alignSelf: 'flex-start' }}>
                        <AntDesign name="arrowleft" size={24} color="white" />
                    </TouchableOpacity>

                    <Text style={{ color: '#fff', fontSize: 18, fontWeight: '500', alignSelf: 'center', marginLeft: '23%' }}>My Transaction</Text>
                </View>
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 20 }}>
                <TouchableOpacity style={{ height: responsiveHeight(4.8), justifyContent: 'center', borderRadius: 25, width: responsiveWidth(28), marginTop: 20, backgroundColor: widraw == 0 ? '#6A5AE0' : '#fff', borderWidth: widraw == 0 ? 0 : 1, alignSelf: 'flex-start' }}
                    onPress={() => { setWidraw(0), depositData() }}>
                    <Text style={{ color: widraw == 0 ? '#fff' : '#000', fontWeight: '500', alignSelf: 'center', fontSize: 16 }}>Deposit</Text>
                </TouchableOpacity>

                <TouchableOpacity style={{ height: responsiveHeight(4.8), justifyContent: 'center', borderRadius: 25, width: responsiveWidth(28), marginTop: 20, backgroundColor: widraw == 1 ? '#6A5AE0' : '#fff', borderWidth: widraw == 1 ? 0 : 1, alignSelf: 'flex-start' }}
                    onPress={() => { setWidraw(1), Widrawal() }}>
                    <Text style={{ color: widraw == 1 ? '#fff' : '#000', fontWeight: '500', alignSelf: 'center', fontSize: 16 }}>Widrawal</Text>
                </TouchableOpacity>

                <TouchableOpacity style={{ height: responsiveHeight(4.8), justifyContent: 'center', borderRadius: 25, width: responsiveWidth(30), marginTop: 20, backgroundColor: widraw == 2 ? '#6A5AE0' : '#fff', borderWidth: widraw == 2 ? 0 : 1, alignSelf: 'flex-start' }}
                    onPress={() => setWidraw(2)}>
                    <Text style={{ color: widraw == 2 ? '#fff' : '#000', fontWeight: '500', alignSelf: 'center', fontSize: 16 }}>Quiz Histroy</Text>
                </TouchableOpacity>

            </View>

            {
                widraw == 0 ? <>
                    <View style={{ height: responsiveHeight(8.1), flexDirection: 'row', width: responsiveWidth(97), alignSelf: 'center', marginTop: 20, borderRadius: 10, backgroundColor: '#6A5AE0' }}>

                        <View style={{ backgroundColor: '#fff', height: responsiveHeight(5.5), width: responsiveWidth(86), borderRadius: 10, justifyContent: 'center', marginTop: 10, flexDirection: 'row', marginHorizontal: 20 }}>

                            <View style={{ flex: 0.15, justifyContent: 'center', alignSelf: 'center' }}>
                                <Image source={require('../images/search.png')} style={{ tintColor: '#C0C0C0', height: responsiveHeight(3), width: responsiveWidth(6), marginLeft: 10 }} />
                            </View>

                            <View style={{ flex: 0.80, justifyContent: 'center', alignSelf: 'center' }}>
                                <TextInput require placeholder='Search here..'
                                    onChangeText={(value) => setFilterText(value)} placeholderTextColor={'#000'} style={{ color: '#000', marginLeft: 15, fontWeight: '400', fontSize: 17, fontFamily: 'Jaldi-Regular' }} />
                            </View>

                        </View>

                        {/* <View style={{ alignSelf: 'center' }}>
                            <Image source={require('../images/calender.png')} style={{ tintColor: '#fff', height: responsiveHeight(4), width: responsiveWidth(8), marginLeft: 10 }} />

                        </View> */}

                    </View>


                    <View style={{ height: responsiveHeight(52), width: responsiveWidth(95), marginBottom: 10, paddingHorizontal: 10, backgroundColor: '#fff', alignSelf: 'center', borderBottomLeftRadius: 8, borderBottomRightRadius: 8 }}>

                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', height: responsiveHeight(6), width: responsiveWidth(90), borderRadius: 2, marginTop: 10, backgroundColor: '#fff', alignSelf: 'center' }}>
                            <Text style={{ alignSelf: 'center', color: '#000', fontWeight: '500' }}>Sno.</Text>
                            <Text style={{ alignSelf: 'center', color: '#000', fontWeight: '500' }}>Amount</Text>
                            <Text style={{ alignSelf: 'center', color: '#000', fontWeight: '500' }}>TransitionId</Text>

                            <Text style={{ alignSelf: 'center', color: '#000', fontWeight: '500' }}>Status</Text>


                            <Text style={{ alignSelf: 'center', color: '#000', fontWeight: '500' }}>Date&time</Text>

                        </View>

                        <ScrollView showsVerticalScrollIndicator={false}>
                            {
                                depositdata?.map((res, index) => {
                                    return (

                                        <View key={index} style={{ flexDirection: 'row', justifyContent: 'space-between', height: responsiveHeight(8), width: responsiveWidth(90), paddingHorizontal: 10, borderRadius: 2, marginTop: 5, backgroundColor: '#EDEAFB', alignSelf: 'center' }}>
                                            <Text style={{ alignSelf: 'center', color: '#6A5AE0' }}>{index + 1}</Text>
                                            <Text style={{ alignSelf: 'center', color: '#000' }}>₹{res.amount}</Text>
                                            <Text style={{ alignSelf: 'center', color: 'green' }}>#{res._id.toString().substring(0, 4)}...<AntDesign name="copy1" size={18} color="black" onPress={() => { copydata(res._id) }} /></Text>
                                            <Text style={{ alignSelf: 'center', color: '#000' }}>{res.status === 0 ? "Pending" : res.status === 1 ? "Completed" : "Cancelled"}</Text>

                                            <View style={{ alignSelf: 'center' }}>
                                                <Text style={{ alignSelf: 'center', color: '#000', fontWeight: '400', fontSize: 13 }}>{new Date(res.createdAt).toLocaleDateString()}</Text>
                                                <Text style={{ alignSelf: 'center', color: '#000', fontWeight: '400', fontSize: 13 }}>{new Date(res.createdAt).toLocaleTimeString()}</Text>
                                            </View>


                                        </View>
                                    )
                                })
                            }
                        </ScrollView>

                    </View>
                </>
                    : null
            }


            {
                widraw == 1 ? <>
                    <View style={{ height: responsiveHeight(8.1), flexDirection: 'row', width: responsiveWidth(97), alignSelf: 'center', marginTop: 20, borderRadius: 10, backgroundColor: '#6A5AE0' }}>

                        <View style={{ backgroundColor: '#fff', height: responsiveHeight(5.5), width: responsiveWidth(86), borderRadius: 10, justifyContent: 'center', marginTop: 10, flexDirection: 'row', marginHorizontal: 20 }}>

                            <View style={{ flex: 0.15, justifyContent: 'center', alignSelf: 'center' }}>
                                <Image source={require('../images/search.png')} style={{ tintColor: '#C0C0C0', height: responsiveHeight(3), width: responsiveWidth(6), marginLeft: 10 }} />
                            </View>

                            <View style={{ flex: 0.80, justifyContent: 'center', alignSelf: 'center' }}>
                                <TextInput require placeholder='Search here..' placeholderTextColor={'#000'} style={{ color: '#000', marginLeft: 15, fontWeight: '400', fontSize: 17, fontFamily: 'Jaldi-Regular' }} />
                            </View>

                        </View>

                        {/* <View style={{ alignSelf: 'center' }}>
                            <Image source={require('../images/calender.png')} style={{ tintColor: '#fff', height: responsiveHeight(4), width: responsiveWidth(8), marginLeft: 10 }} />

                        </View> */}

                    </View>


                    <View style={{ height: responsiveHeight(52), width: responsiveWidth(95), marginBottom: 10, paddingHorizontal: 10, backgroundColor: '#fff', alignSelf: 'center', borderBottomLeftRadius: 8, borderBottomRightRadius: 8 }}>

                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', height: responsiveHeight(6), width: responsiveWidth(90), borderRadius: 2, marginTop: 10, backgroundColor: '#fff', alignSelf: 'center' }}>
                            <Text style={{ alignSelf: 'center', color: '#000', fontWeight: '500' }}>Sno.</Text>
                            <Text style={{ alignSelf: 'center', color: '#000', fontWeight: '500' }}>Amount</Text>
                            <Text style={{ alignSelf: 'center', color: '#000', fontWeight: '500' }}>TransitionId</Text>

                            <Text style={{ alignSelf: 'center', color: '#000', fontWeight: '500' }}>Status</Text>


                            <Text style={{ alignSelf: 'center', color: '#000', fontWeight: '500' }}>Date&time</Text>

                        </View>
                        <ScrollView showsVerticalScrollIndicator={false}>
                            {
                                widrawdata?.map((res, index) => {
                                    return (
                                        <View key={index} style={{ flexDirection: 'row', justifyContent: 'space-between', height: responsiveHeight(8), width: responsiveWidth(90), paddingHorizontal: 10, borderRadius: 2, marginTop: 5, backgroundColor: '#EDEAFB', alignSelf: 'center' }}>
                                            <Text style={{ alignSelf: 'center', color: '#6A5AE0' }}>{index + 1}</Text>
                                            <Text style={{ alignSelf: 'center', color: '#000' }}>₹{res.amount}</Text>
                                            <Text style={{ alignSelf: 'center', color: 'green' }}>#{res._id.toString().substring(0, 4)}...<AntDesign name="copy1" size={18} color="black" onPress={() => { copydata(res._id) }} /></Text>
                                            <Text style={{ alignSelf: 'center', color: '#000' }}>{res.status === 0 ? "Pending" : res.status === 1 ? "Completed" : "Rejected"}</Text>

                                            <View style={{ alignSelf: 'center' }}>
                                                <Text style={{ alignSelf: 'center', color: '#000', fontWeight: '400', fontSize: 13 }}>{new Date(res.createdAt).toLocaleDateString()}</Text>
                                                <Text style={{ alignSelf: 'center', color: '#000', fontWeight: '400', fontSize: 13 }}>{new Date(res.createdAt).toLocaleTimeString()}</Text>
                                            </View>


                                        </View>
                                    )
                                })
                            }
                        </ScrollView>




                    </View>
                </>
                    : null
            }


            {
                widraw == 2 ? <>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 20 }}>
                        <TouchableOpacity style={{ height: responsiveHeight(4.8), justifyContent: 'center', borderRadius: 25, width: responsiveWidth(43), marginTop: 20, backgroundColor: his == 0 ? '#6A5AE0' : '#fff', borderWidth: his == 0 ? 0 : 1, alignSelf: 'flex-start' }}
                            onPress={() => setHis(0)}>
                            <Text style={{ color: his == 0 ? '#fff' : '#000', fontWeight: '500', alignSelf: 'center', fontSize: 16 }}>Quiz Reward History</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={{ height: responsiveHeight(4.8), justifyContent: 'center', borderRadius: 25, width: responsiveWidth(43), marginTop: 20, backgroundColor: his == 1 ? '#6A5AE0' : '#fff', borderWidth: his == 1 ? 0 : 1, alignSelf: 'flex-start' }}
                            onPress={() => setHis(1)}>
                            <Text style={{ color: his == 1 ? '#fff' : '#000', fontWeight: '500', alignSelf: 'center', fontSize: 16 }}>Refer Income History</Text>
                        </TouchableOpacity>

                    </View>

                    {
                        his == 0 ? <>
                            <View>
                                <View style={{ height: responsiveHeight(8.1), flexDirection: 'row', width: responsiveWidth(97), alignSelf: 'center', marginTop: 20, borderRadius: 10, backgroundColor: '#6A5AE0' }}>

                                    <View style={{ backgroundColor: '#fff', height: responsiveHeight(5.5), width: responsiveWidth(86), borderRadius: 10, justifyContent: 'center', marginTop: 10, flexDirection: 'row', marginHorizontal: 20 }}>

                                        <View style={{ flex: 0.15, justifyContent: 'center', alignSelf: 'center' }}>
                                            <Image source={require('../images/search.png')} style={{ tintColor: '#C0C0C0', height: responsiveHeight(3), width: responsiveWidth(6), marginLeft: 10 }} />
                                        </View>

                                        <View style={{ flex: 0.80, justifyContent: 'center', alignSelf: 'center' }}>
                                            <TextInput require placeholder='Search here..' placeholderTextColor={'#000'} style={{ color: '#000', marginLeft: 15, fontWeight: '400', fontSize: 17, fontFamily: 'Jaldi-Regular' }} />
                                        </View>

                                    </View>

                                    {/* <View style={{ alignSelf: 'center' }}>
                                        <Image source={require('../images/calender.png')} style={{ tintColor: '#fff', height: responsiveHeight(4), width: responsiveWidth(8), marginLeft: 10 }} />

                                    </View> */}

                                </View>


                                <View style={{ height: responsiveHeight(62), width: responsiveWidth(95), marginBottom: 10, paddingHorizontal: 10, backgroundColor: '#fff', alignSelf: 'center', borderBottomLeftRadius: 8, borderBottomRightRadius: 8 }}>

                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', height: responsiveHeight(7), width: responsiveWidth(90), borderRadius: 2, marginTop: 10, backgroundColor: '#fff', alignSelf: 'center' }}>
                                        <Text style={{ alignSelf: 'center', color: '#000', fontSize: 13, fontWeight: '500' }}>Sno.</Text>

                                        <View style={{ alignSelf: 'center' }}>
                                            <Text style={{ alignSelf: 'center', color: '#000', fontSize: 13, fontWeight: '500' }}>Quiz</Text>
                                            <Text style={{ alignSelf: 'center', color: '#000', fontSize: 13, fontWeight: '500', marginTop: -3 }}>Name</Text>
                                        </View>


                                        <View style={{ alignSelf: 'center' }}>
                                            <Text style={{ alignSelf: 'center', color: '#000', fontSize: 13, fontWeight: '500' }}>Dep</Text>
                                            <Text style={{ alignSelf: 'center', color: '#000', fontSize: 13, fontWeight: '500', marginTop: -3 }}>osit</Text>
                                            <Text style={{ alignSelf: 'center', color: '#000', fontSize: 13, fontWeight: '500', marginTop: -3 }}>Fees</Text>

                                        </View>


                                        <Text style={{ alignSelf: 'center', color: '#000', fontSize: 13, fontWeight: '500' }}>Point</Text>

                                        <Text style={{ alignSelf: 'center', color: '#000', fontSize: 13, fontWeight: '500' }}>Rank</Text>

                                        <View style={{ alignSelf: 'center' }}>
                                            <Text style={{ alignSelf: 'center', color: '#000', fontSize: 13, fontWeight: '500' }}>Reward</Text>
                                            <Text style={{ alignSelf: 'center', color: '#000', fontSize: 13, fontWeight: '500', marginTop: -3 }}>earn</Text>
                                        </View>

                                        <View style={{ alignSelf: 'center' }}>
                                            <Text style={{ alignSelf: 'center', color: '#000', fontSize: 13, fontWeight: '500' }}>Date</Text>
                                            <Text style={{ alignSelf: 'center', color: '#000', fontSize: 13, fontWeight: '500', marginTop: -3 }}>&time</Text>
                                        </View>



                                    </View>
                                    <ScrollView showsVerticalScrollIndicator={false}>
                                        {quiseRewarddata?.map((res, index) => {
                                            return (
                                                <>
                                                    <View key={index} style={{ flexDirection: 'row', height: responsiveHeight(9), width: responsiveWidth(95), paddingHorizontal: 10, borderRadius: 2, marginTop: 5, backgroundColor: '#EDEAFB', alignSelf: 'center' }}>
                                                        <Text style={{ alignSelf: 'center', color: '#6A5AE0', flex: 0.1 }}>{index + 1}</Text>
                                                        <Text style={{ alignSelf: 'center', color: '#000', flex: 0.4 }}>{res?.gameId.gameNameInEnglish}</Text>
                                                        <Text style={{ alignSelf: 'center', color: 'green', flex: 0.2, marginRight: 15 }}>₹{res.amount}</Text>
                                                        <Text style={{ alignSelf: 'center', color: '#000', flex: 0.2 }}>{res?.mainPoints}</Text>
                                                        <Text style={{ alignSelf: 'center', color: '#000', flex: 0.2 }}>#{res?.rank}</Text>
                                                        <Text style={{ alignSelf: 'center', color: '#000', flex: 0.2 }}>{res?.wonAmount}</Text>

                                                        <View style={{ alignSelf: 'center' }}>
                                                            <Text style={{ alignSelf: 'center', color: '#000', fontWeight: '400', fontSize: 13 }}>{(res?.gameId?.updatedAt).slice(0,10)}</Text>
                                                            <Text style={{ alignSelf: 'center', color: '#000', fontWeight: '400', fontSize: 13 }}>{(res?.gameId?.updatedAt).slice(11,19)}</Text>
                                                        </View>


                                                    </View>

                                                </>
                                            )
                                        })}

                                    </ScrollView>


                                </View>
                            </View>

                        </>
                            : null
                    }

                    {
                        his == 1 ? <>
                            <View>
                                <View style={{ height: responsiveHeight(8.1), flexDirection: 'row', width: responsiveWidth(97), alignSelf: 'center', marginTop: 20, borderRadius: 10, backgroundColor: '#6A5AE0' }}>

                                    <View style={{ backgroundColor: '#fff', height: responsiveHeight(5.5), width: responsiveWidth(86), borderRadius: 10, justifyContent: 'center', marginTop: 10, flexDirection: 'row', marginHorizontal: 20 }}>

                                        <View style={{ flex: 0.15, justifyContent: 'center', alignSelf: 'center' }}>
                                            <Image source={require('../images/search.png')} style={{ tintColor: '#C0C0C0', height: responsiveHeight(3), width: responsiveWidth(6), marginLeft: 10 }} />
                                        </View>

                                        <View style={{ flex: 0.80, justifyContent: 'center', alignSelf: 'center' }}>
                                            <TextInput require placeholder='Search here..' placeholderTextColor={'#000'} style={{ color: '#000', marginLeft: 15, fontWeight: '400', fontSize: 17, fontFamily: 'Jaldi-Regular' }} />
                                        </View>

                                    </View>

                                    {/* <View style={{ alignSelf: 'center' }}>
                                        <Image source={require('../images/calender.png')} style={{ tintColor: '#fff', height: responsiveHeight(4), width: responsiveWidth(8), marginLeft: 10 }} />

                                    </View> */}

                                </View>


                                <View style={{ height: responsiveHeight(65), width: responsiveWidth(95), marginBottom: 1, paddingHorizontal: 1, backgroundColor: '#fff', alignSelf: 'center', borderBottomLeftRadius: 8, borderBottomRightRadius: 8 }}>

                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', height: responsiveHeight(6), width: responsiveWidth(90), borderRadius: 2, marginTop: 10, backgroundColor: '#fff', alignSelf: 'center' }}>
                                        <Text style={{ alignSelf: 'center', color: '#000', fontSize: 13, fontWeight: '500', }}>Sno.</Text>

                                        <View style={{ alignSelf: 'center' }}>
                                            <Text style={{ alignSelf: 'center', color: '#000', fontSize: 13, fontWeight: '500' }}>Refer By</Text>
                                        </View>

                                        <View style={{ alignSelf: 'center' }}>
                                            <Text style={{ alignSelf: 'center', color: '#000', fontSize: 13, fontWeight: '500', marginRight: 25 }}>Refer Income</Text>
                                        </View>




                                        <View style={{ alignSelf: 'center' }}>
                                            <Text style={{ alignSelf: 'center', color: '#000', fontSize: 13, fontWeight: '500' }}>Date&time</Text>
                                        </View>



                                    </View>

                                    <ScrollView showsVerticalScrollIndicator={false}>

                                        {
                                            mydata?.map((data, index) => {
                                                console.log(data, 'inin');
                                                return (
                                                    <>

                                                        <View key={index} style={{ flexDirection: 'row', height: responsiveHeight(9), width: responsiveWidth(95), paddingHorizontal: 10, borderRadius: 2, marginTop: 5, backgroundColor: '#EDEAFB', alignSelf: 'center' }}>
                                                            <Text style={{ alignSelf: 'center', color: '#000', flex: 0.2 }}>
                                                                {index + 1}
                                                            </Text>
                                                            <Text style={{ alignSelf: 'center', color: '#000', flex: 0.5, marginLeft: 10 }}>{data?.userId}</Text>
                                                            <Text style={{ alignSelf: 'center', color: 'green', flex: 0.5, marginLeft: 25 }}>{data?.amount}</Text>


                                                            <View style={{ alignSelf: 'center' }}>
                                                                <Text style={{ alignSelf: 'center', color: '#000', fontWeight: '400', fontSize: 13 }}>{new Date(data.createdAt).toLocaleDateString()}</Text>
                                                                <Text style={{ alignSelf: 'center', color: '#000', fontWeight: '400', fontSize: 13 }}>{new Date(data.createdAt).toLocaleTimeString()}</Text>
                                                            </View>


                                                        </View>
                                                    </>
                                                )
                                            })
                                        }

                                    </ScrollView>




                                </View>
                            </View>
                        </> : null
                    }


                </>
                    : null
            }

        </SafeAreaView>
    )
}

export default MyTransaction