import { View, Text, StatusBar, Image, TextInput, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import { ScrollView } from 'react-native-gesture-handler'
import { AntDesign } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { formatTimestamp } from '../utils/formatDate';


import ScrollableTabView, { DefaultTabBar } from 'react-native-scrollable-tab-view';
import { SafeAreaView } from 'react-native-safe-area-context';
import { base_url } from './Base_url';
import OrientationLoadingOverlay from 'react-native-orientation-loading-overlay';


const QuizType = ({ navigation, route }) => {
    const { joinedMembers, amount, g_idd, tsedule } = route.params
    const [lodings, setlodings] = useState(true)
    const [sliderValue, setSliderValue] = useState(0);
    const [win, setWin] = useState(0);
    const [mydata, setMydata] = useState([]);
    const [mygameid, setMygameId] = useState(g_idd);
    const [myamount, setMyamount] = useState(amount)
    const [timesedule, setTimesedule] = useState(tsedule)


    console.log(mygameid, "quiztypegameidd....");
    // console.log(timesedule,"quizetimesedule");

    const quizApi = async () => {
        // alert(await AsyncStorage.getItem('_id'))
        try {
            var myHeaders = new Headers();
            myHeaders.append("Authorization", `${await AsyncStorage.getItem('token')}`);
            // alert(`${await AsyncStorage.getItem('_id')}`, "hhhhhhh");
            // setMyid(`${await AsyncStorage.getItem('_id')}`)
            // console.log(myid, 'myid');


            // console.log(`${await AsyncStorage.getItem('_id')}`,"iaiaiaa");


            var requestOptions = {
                method: 'GET',
                headers: myHeaders,
                redirect: 'follow'
            };

            fetch(`${base_url}/join-page?_id=${mygameid}`, requestOptions)

                .then(response => response.json())
                .then(result => {
                    if (result.success == true) {
                        // console.log(result, "myresult")
                        // console.log(result.data.joingGame, "datatata");
                        setMydata(result.data.joingGame)
                    }
                    else {
                        console.log(result.message, "else")

                    }
                })
                .catch(error => console.log('error', error)).finally(() => { setlodings(false) });
        } catch (error) {

        }
    }

    useEffect(() => {
        console.log(joinedMembers);
        console.log(amount);
        // console.log(g_idd,"g_iddg_idd");
        // console.log(id_game,"id_game");
        // alert(id_game);

        quizApi();
    }, [])

    const joingameApi = async () => {
        try {
            var myHeaders = new Headers();
            myHeaders.append("Authorization", `${await AsyncStorage.getItem('token')}`);
            myHeaders.append("Content-Type", "application/json");

            var raw = JSON.stringify({
                "_id": `${mygameid}`,
                "amount": `${myamount}`,
                "schedule": `${timesedule}`
            });

            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };

            fetch(`${base_url}/join-game`, requestOptions)
                .then(response => response.json())
                .then(result => {
                    if (result.success == true) {
                        // console.log(result,"resultt")
                        navigation.navigate('MyExam')
                    }
                    else {
                        console.log(result.message);
                    }
                })
                .catch(error => console.log('error', error));

        } catch (error) {

        }
    }

    // console.log(mydata, 'mydata');

    return (
        <>
            {
                lodings ?
                    <OrientationLoadingOverlay
                        visible={lodings}
                        color="white"
                        indicatorSize="large"
                        messageFontSize={24}
                        message="Loading... "
                    />
                    :
                    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
                        <StatusBar translucent={true} barStyle={'light-content'} backgroundColor={'#6A5AE0'} />



                        <View style={{ height: responsiveHeight(10), width: responsiveWidth(100), backgroundColor: '#6A5AE0' }}>

                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 20, marginTop: 20 }}>

                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <TouchableOpacity onPress={() => navigation.goBack()} style={{ justifyContent: 'center' }}>
                                        <AntDesign name="arrowleft" size={24} color="white" />
                                    </TouchableOpacity>

                                    <View style={{ alignSelf: 'center', marginLeft: '5%' }}>
                                        <Text style={{ color: '#fff', fontSize: 16 }}>Quiz Type</Text>
                                    </View>

                                </View>


                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignSelf: 'center' }}>

                                    <TouchableOpacity style={{ marginRight: 15, alignSelf: 'center', marginTop: 3 }}
                                    >
                                        <Image source={require('../images/chat.png')} style={{ tintColor: '#fff', height: responsiveHeight(3.5), width: responsiveWidth(7) }} />
                                    </TouchableOpacity>
                                    <TouchableOpacity style={{ marginRight: 9, alignSelf: 'center', marginTop: 3 }}>
                                        <Image source={require('../images/walletcopy.png')} style={{ height: responsiveHeight(3.3), width: responsiveWidth(6.6) }} />
                                    </TouchableOpacity>
                                </View>

                            </View>

                        </View>

                        {
                            mydata?.length > 0 ? (mydata?.map((item) => {
                                // console.log(item, "datainline");

                                return (
                                    <>
                                        <View>
                                            <View>
                                                <Text style={{ color: '#000', fontSize: 16, marginHorizontal: 20, marginTop: 10, color: '#8A8A8A' }}>Prize Pool</Text>
                                                {/* <Text style={{ color: '#000', marginHorizontal: 20 }}>{formatTimestamp(item.schedule)}</Text> */}


                                                <Text style={{ color: '#000', fontSize: 20, marginHorizontal: 20, marginTop: 7, color: '#000', fontWeight: '500' }}>₹ {amount * joinedMembers}</Text>


                                                <View style={{ backgroundColor: 'fff', justifyContent: 'center', alignItems: 'center' }}>
                                                    <Slider
                                                        style={{ width: responsiveWidth(94), height: responsiveHeight(5) }}
                                                        minimumValue={0}
                                                        thumbTintColor='#516AC4'
                                                        minimumTrackTintColor='#516AC4'
                                                        maximumTrackTintColor='#516AC4'
                                                        step={1}
                                                        maximumValue={item?.pricePool}
                                                        value={amount * joinedMembers}
                                                        disabled
                                                        onValueChange={(value) => setSliderValue(value)}
                                                    />

                                                    {/* <Text style={{ marginLeft: '6%', color: '#203C9F', fontSize: 18, fontFamily: 'Jaldi-Bold', marginTop: -5 }}>{sliderValue}</Text> */}


                                                </View>

                                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 20 }}>

                                                    <Text style={{ color: 'red', fontWeight: '500' }}>{item?.noOfParticipation - item?.UserGame?.length} Seat left</Text>

                                                </View>

                                                <TouchableOpacity style={{ height: responsiveHeight(6), width: responsiveWidth(80), marginTop: '5%', backgroundColor: '#6A5AE0', borderRadius: 10, alignSelf: 'center', justifyContent: 'center' }}
                                                    onPress={() => { joingameApi() }}>
                                                    <Text style={{ fontSize: 18, color: '#fff', textAlign: 'center', fontFamily: 'Jaldi-Bold' }}>JOIN ₹{item?.entranceAmount}</Text>
                                                </TouchableOpacity>
                                            </View>

                                            <View style={{ flexDirection: 'row', marginTop: 20, justifyContent: 'space-between', paddingHorizontal: 20, height: responsiveHeight(5), width: responsiveWidth(100), backgroundColor: '#F4B7B2' }}>
                                                <Text style={{ alignSelf: 'center' }}>Earn 1 for every ₹10 spent on a contest entry</Text>

                                            </View>


                                            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 15, marginHorizontal: 40 }}>

                                                <TouchableOpacity onPress={() => setWin(0)} style={{ borderBottomWidth: win == 0 ? 2 : 0, borderColor: 'red' }}>
                                                    <Text style={{ color: win == 0 ? 'red' : '#8A8A8A', fontWeight: '600', fontSize: 20 }}>Winnings</Text>
                                                </TouchableOpacity>

                                                <TouchableOpacity onPress={() => setWin(1)} style={{ borderBottomWidth: win == 1 ? 2 : 0, borderColor: 'red' }}>
                                                    <Text style={{ color: win == 1 ? 'red' : '#8A8A8A', fontWeight: '600', fontSize: 20 }}>Leaderboard</Text>
                                                </TouchableOpacity>

                                            </View>

                                            <View style={{ borderBottomWidth: 0.5, borderColor: '#8A8A8A', marginTop: 10 }}></View>


                                            <ScrollView>

                                                {
                                                    win == 0 ?
                                                        <View>
                                                            <Text style={{ marginHorizontal: 20, marginTop: 5, borderBottomWidth: 0.5, borderColor: '#8A8A8A' }}>Be the first in your network to join this content</Text>

                                                            <View style={{ marginHorizontal: 10, flexDirection: 'row', marginTop: 5, justifyContent: 'space-between', borderBottomWidth: 0.6 }}>
                                                                <Text style={{ fontSize: 18, fontWeight: '500', marginLeft: 10 }}>Rank</Text>
                                                                <Text style={{ fontSize: 18, fontWeight: '500', marginRight: 10 }}>Winning</Text>

                                                            </View>

                                                            {
                                                                item?.GamePool[0]?.pool?.map((res) => {
                                                                    return (
                                                                        <>
                                                                            <View style={{ marginHorizontal: 10, flexDirection: 'row', marginTop: 10, justifyContent: 'space-between' }}>
                                                                                <Text style={{ fontSize: 14, fontWeight: '400', marginLeft: 10 }}>{res?.from}</Text>
                                                                                <Text style={{ fontSize: 14, fontWeight: '400', marginRight: 10 }}>₹{res?.amount}</Text>
                                                                            </View>
                                                                        </>
                                                                    )
                                                                })


                                                            }

                                                            <View style={{ borderBottomWidth: 0.6, marginHorizontal: 10, marginTop: 7, marginBottom: 1 }}></View>

                                                        </View>
                                                        : null
                                                }

                                                {
                                                    win == 1 ?
                                                        <View>
                                                            <Text style={{ marginHorizontal: 20, marginTop: 5, borderBottomWidth: 0.5, borderColor: '#8A8A8A' }}>Be the first in your network to join this content</Text>
                                                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 20 }}>
                                                                <Text style={{ marginTop: 10 }}>All Team</Text>
                                                                <Text style={{ marginTop: 10 }}>Name</Text>
                                                                <Text style={{ marginTop: 10 }}>Reg.ID</Text>

                                                            </View>
                                                            <View style={{ borderBottomWidth: 0.6, marginHorizontal: 10, marginTop: 7, marginBottom: 1, borderColor: '#8A8A8A' }}></View>

                                                            {
                                                                item?.UserGame[0]?.User?.map((res) => {
                                                                    return (
                                                                        <>
                                                                            <View style={{ flexDirection: 'row', justifyContent: 'flex-start', marginHorizontal: 20 }}>
                                                                                <Image source={require('../images/quiz_banner.jpeg')} style={{ height: responsiveHeight(6), marginRight: '17%', width: responsiveWidth(12), borderRadius: 100, alignSelf: 'flex-start', marginHorizontal: 20, marginTop: 3 }} />
                                                                                <Text style={{ alignSelf: 'center', marginLeft: 20, flex: 0.8 }}>{res?.name}</Text>
                                                                                <Text style={{ alignSelf: 'center', marginLeft: 20 }}>{res?.id}</Text>

                                                                            </View>
                                                                        </>
                                                                    )
                                                                })
                                                            }
                                                            <View style={{ borderBottomWidth: 0.6, marginHorizontal: 10, marginTop: 7, marginBottom: 1, borderColor: '#8A8A8A' }}></View>


                                                        </View>
                                                        : null
                                                }


                                            </ScrollView>
                                        </View>

                                    </>
                                )
                            })) :
                                (
                                    <View>
                                        <Text style={{ color: '#000', fontSize: 16, marginHorizontal: 20, marginTop: 10, color: '#8A8A8A' }}>Prize Pool</Text>
                                        <Text style={{ color: '#000', marginHorizontal: 20 }}>17m 39s left</Text>


                                        <Text style={{ color: '#000', fontSize: 20, marginHorizontal: 20, marginTop: 7, color: '#000', fontWeight: '500' }}>₹ 1.50 Lakhs</Text>


                                        <View style={{ backgroundColor: 'fff', justifyContent: 'center', alignItems: 'center' }}>
                                            <Slider
                                                style={{ width: responsiveWidth(94), height: responsiveHeight(5) }}
                                                minimumValue={0}
                                                thumbTintColor='#516AC4'
                                                minimumTrackTintColor='#516AC4'
                                                maximumTrackTintColor='#516AC4'
                                                step={1}
                                                maximumValue={100}
                                                value={sliderValue}
                                                onValueChange={(value) => setSliderValue(value)}
                                            />

                                            {/* <Text style={{ marginLeft: '6%', color: '#203C9F', fontSize: 18, fontFamily: 'Jaldi-Bold', marginTop: -5 }}>{sliderValue}</Text> */}


                                        </View>

                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 20 }}>

                                            <Text style={{ color: 'red', fontWeight: '500' }}>3234 quiz left</Text>
                                            <Text style={{ color: 'blue', fontWeight: '500' }}>5123 quiz</Text>


                                        </View>

                                        <TouchableOpacity style={{ height: responsiveHeight(6), width: responsiveWidth(80), marginTop: '5%', backgroundColor: '#6A5AE0', borderRadius: 10, alignSelf: 'center', justifyContent: 'center' }}
                                        >
                                            <Text style={{ fontSize: 18, color: '#fff', textAlign: 'center', fontFamily: 'Jaldi-Bold' }}>JOIN ₹39</Text>
                                        </TouchableOpacity>

                                        <View style={{ flexDirection: 'row', marginTop: 20, justifyContent: 'space-between', paddingHorizontal: 20, height: responsiveHeight(5), width: responsiveWidth(100), backgroundColor: '#F4B7B2' }}>
                                            <Text style={{ alignSelf: 'center' }}>Earn 1 for every ₹10 spent on a contest entry</Text>

                                        </View>


                                        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 15, marginHorizontal: 40 }}>

                                            <TouchableOpacity onPress={() => setWin(0)} style={{ borderBottomWidth: win == 0 ? 2 : 0, borderColor: 'red' }}>
                                                <Text style={{ color: win == 0 ? 'red' : '#8A8A8A', fontWeight: '600', fontSize: 20 }}>Winnings</Text>
                                            </TouchableOpacity>

                                            <TouchableOpacity onPress={() => setWin(1)} style={{ borderBottomWidth: win == 1 ? 2 : 0, borderColor: 'red' }}>
                                                <Text style={{ color: win == 1 ? 'red' : '#8A8A8A', fontWeight: '600', fontSize: 20 }}>Leaderboard</Text>
                                            </TouchableOpacity>

                                        </View>

                                        <View style={{ borderBottomWidth: 0.5, borderColor: '#8A8A8A', marginTop: 10 }}></View>


                                        <ScrollView>

                                            {
                                                win == 0 ?
                                                    <View>
                                                        <Text style={{ marginHorizontal: 20, marginTop: 5, borderBottomWidth: 0.5, borderColor: '#8A8A8A' }}>Be the first in your network to join this content</Text>

                                                        <View style={{ marginHorizontal: 10, flexDirection: 'row', marginTop: 5, justifyContent: 'space-between', borderBottomWidth: 0.6 }}>
                                                            <Text style={{ fontSize: 18, fontWeight: '500', marginLeft: 10 }}>Rank</Text>
                                                            <Text style={{ fontSize: 18, fontWeight: '500', marginRight: 10 }}>Winning</Text>

                                                        </View>

                                                        <View style={{ marginHorizontal: 10, flexDirection: 'row', marginTop: 10, justifyContent: 'space-between' }}>
                                                            <Text style={{ fontSize: 14, fontWeight: '400', marginLeft: 10 }}>1</Text>
                                                            <Text style={{ fontSize: 14, fontWeight: '400', marginRight: 10 }}>₹40000</Text>
                                                        </View>

                                                        <View style={{ borderBottomWidth: 0.6, marginHorizontal: 10, marginTop: 7 }}></View>


                                                        <View style={{ marginHorizontal: 10, flexDirection: 'row', marginTop: 10, justifyContent: 'space-between' }}>
                                                            <Text style={{ fontSize: 14, fontWeight: '400', marginLeft: 10 }}>2</Text>
                                                            <Text style={{ fontSize: 14, fontWeight: '400', marginRight: 10 }}>₹30000</Text>
                                                        </View>

                                                        <View style={{ borderBottomWidth: 0.6, marginHorizontal: 10, marginTop: 7, marginBottom: 1 }}></View>

                                                        <View style={{ marginHorizontal: 10, flexDirection: 'row', marginTop: 10, justifyContent: 'space-between' }}>
                                                            <Text style={{ fontSize: 14, fontWeight: '400', marginLeft: 10 }}>3</Text>
                                                            <Text style={{ fontSize: 14, fontWeight: '400', marginRight: 10 }}>₹20000</Text>
                                                        </View>

                                                        <View style={{ borderBottomWidth: 0.6, marginHorizontal: 10, marginTop: 7, marginBottom: 1 }}></View>

                                                        <View style={{ marginHorizontal: 10, flexDirection: 'row', marginTop: 10, justifyContent: 'space-between' }}>
                                                            <Text style={{ fontSize: 14, fontWeight: '400', marginLeft: 10 }}>4</Text>
                                                            <Text style={{ fontSize: 14, fontWeight: '400', marginRight: 10 }}>₹10000</Text>
                                                        </View>

                                                        <View style={{ borderBottomWidth: 0.6, marginHorizontal: 10, marginTop: 7, marginBottom: 1 }}></View>

                                                        <View style={{ marginHorizontal: 10, flexDirection: 'row', marginTop: 10, justifyContent: 'space-between' }}>
                                                            <Text style={{ fontSize: 14, fontWeight: '400', marginLeft: 10 }}>5</Text>
                                                            <Text style={{ fontSize: 14, fontWeight: '400', marginRight: 10 }}>₹5000</Text>
                                                        </View>

                                                        <View style={{ borderBottomWidth: 0.6, marginHorizontal: 10, marginTop: 7, marginBottom: 1 }}></View>

                                                        <View style={{ marginHorizontal: 10, flexDirection: 'row', marginTop: 10, justifyContent: 'space-between' }}>
                                                            <Text style={{ fontSize: 14, fontWeight: '400', marginLeft: 10 }}>6</Text>
                                                            <Text style={{ fontSize: 14, fontWeight: '400', marginRight: 10 }}>₹2500</Text>
                                                        </View>

                                                        <View style={{ borderBottomWidth: 0.6, marginHorizontal: 10, marginTop: 7, marginBottom: 1 }}></View>

                                                        <View style={{ marginHorizontal: 10, flexDirection: 'row', marginTop: 10, justifyContent: 'space-between' }}>
                                                            <Text style={{ fontSize: 14, fontWeight: '400', marginLeft: 10 }}>7</Text>
                                                            <Text style={{ fontSize: 14, fontWeight: '400', marginRight: 10 }}>₹1000</Text>
                                                        </View>

                                                        <View style={{ borderBottomWidth: 0.6, marginHorizontal: 10, marginTop: 7, marginBottom: 1 }}></View>

                                                        <View style={{ marginHorizontal: 10, flexDirection: 'row', marginTop: 10, justifyContent: 'space-between' }}>
                                                            <Text style={{ fontSize: 14, fontWeight: '400', marginLeft: 10 }}>8</Text>
                                                            <Text style={{ fontSize: 14, fontWeight: '400', marginRight: 10 }}>₹100</Text>
                                                        </View>

                                                        <View style={{ borderBottomWidth: 0.6, marginHorizontal: 10, marginTop: 7, marginBottom: 1 }}></View>

                                                    </View>
                                                    : null
                                            }

                                            {
                                                win == 1 ?
                                                    <View>
                                                        <Text style={{ marginHorizontal: 20, marginTop: 5, borderBottomWidth: 0.5, borderColor: '#8A8A8A' }}>Be the first in your network to join this content</Text>
                                                        <Text style={{ marginHorizontal: 20, marginTop: 10 }}>All Team (278)</Text>
                                                        <View style={{ borderBottomWidth: 0.6, marginHorizontal: 10, marginTop: 7, marginBottom: 1, borderColor: '#8A8A8A' }}></View>

                                                        <View style={{ flexDirection: 'row', justifyContent: 'flex-start', marginHorizontal: 20 }}>
                                                            <Image source={require('../images/quiz_banner.jpeg')} style={{ height: responsiveHeight(6), width: responsiveWidth(12), borderRadius: 100, alignSelf: 'flex-start', marginHorizontal: 20, marginTop: 3 }} />
                                                            <Text style={{ alignSelf: 'center', marginLeft: 20 }}>joya</Text>
                                                        </View>
                                                        <View style={{ borderBottomWidth: 0.6, marginHorizontal: 10, marginTop: 7, marginBottom: 1, borderColor: '#8A8A8A' }}></View>

                                                        <Image source={require('../images/quiz_banner.jpeg')} style={{ height: responsiveHeight(6), width: responsiveWidth(12), borderRadius: 100, alignSelf: 'flex-start', marginHorizontal: 20, marginTop: 3 }} />
                                                        <View style={{ borderBottomWidth: 0.6, marginHorizontal: 10, marginTop: 7, marginBottom: 1, borderColor: '#8A8A8A' }}></View>

                                                        <Image source={require('../images/quiz_banner.jpeg')} style={{ height: responsiveHeight(6), width: responsiveWidth(12), borderRadius: 100, alignSelf: 'flex-start', marginHorizontal: 20, marginTop: 3 }} />
                                                        <View style={{ borderBottomWidth: 0.6, marginHorizontal: 10, marginTop: 7, marginBottom: 1, borderColor: '#8A8A8A' }}></View>

                                                        <Image source={require('../images/quiz_banner.jpeg')} style={{ height: responsiveHeight(6), width: responsiveWidth(12), borderRadius: 100, alignSelf: 'flex-start', marginHorizontal: 20, marginTop: 3 }} />
                                                        <View style={{ borderBottomWidth: 0.6, marginHorizontal: 10, marginTop: 7, marginBottom: 1, borderColor: '#8A8A8A' }}></View>

                                                        <Image source={require('../images/quiz_banner.jpeg')} style={{ height: responsiveHeight(6), width: responsiveWidth(12), borderRadius: 100, alignSelf: 'flex-start', marginHorizontal: 20, marginTop: 3 }} />
                                                        <View style={{ borderBottomWidth: 0.6, marginHorizontal: 10, marginTop: 7, marginBottom: 1, borderColor: '#8A8A8A' }}></View>


                                                    </View>
                                                    : null
                                            }




                                        </ScrollView>
                                    </View>
                                )
                        }








                    </SafeAreaView>
            }
        </>
    )

}

export default QuizType