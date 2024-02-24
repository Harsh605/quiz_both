import { View, Text, StatusBar, Image, TextInput, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import { ScrollView } from 'react-native-gesture-handler'
import ScrollableTabView, { DefaultTabBar } from 'react-native-scrollable-tab-view';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AntDesign } from '@expo/vector-icons';
import PieChart from 'react-native-pie-chart';
import { BarChart } from 'react-native-chart-kit';
import { useNavigation, useIsFocused, useRoute } from '@react-navigation/native'
import AsyncStorage from "@react-native-async-storage/async-storage";
import { base_url } from "./Base_url";
import { RadioButton } from "react-native-paper";



const AllQuestion = (props) => {
    const [select, setSelect] = useState('')
    const [number, setNumber] = useState(1)
    const [Qnumber, setQumber] = useState(1)

    const [mydata, setMydata] = useState("")
    const [question, setquestion] = useState([])
    const navigation = useNavigation();
    const route = useRoute();
    const [correct, setCorrect] = useState(0);


    const [rowdata, setRowdata] = useState([])

    const [chartdata, setChartdata] = useState([])
    const [attempte, setAttempte] = useState([])
    const [checked, setChecked] = useState("first");


    const noOfQue = route.params?.queNo || null;

    console.log(noOfQue, "noOfQuefinal");


    const myuserid = route.params?.id || null;
    // alert(myid)
    // console.log(myuserid,"myuserid");

    const right = 5.5;
    const wrong = 3.5;

    const A = 0;
    const B = 1;
    const C = 2;
    const D = 3;
    const E = 4;
    const F = 5;
    const G = 6;
    const H = 7;
    const I = 8;
    const J = 9;


    const resultApi = async (n) => {
        // alert(n)
        try {
            var myHeaders = new Headers();
            myHeaders.append("Authorization", `${await AsyncStorage.getItem("token")}`);

            var requestOptions = {
                method: 'GET',
                headers: myHeaders,
                redirect: 'follow'
            };

            fetch(`${base_url}/quiz-result?q_no=${n}`, requestOptions)
                .then(response => response.json())
                .then(result => {
                    if (result.success == true) {
                        console.log(result.data.gameQuestion[0].answer, "rcc")
                        setAttempte(result.data.gameQuestion[0])
                        const rowdata = result.data.gameQuestion[0].UserQuestion;

                        setRowdata(rowdata)
                        setMydata(result.data.gameQuestion[0].question)
                        setquestion(result.data.gameQuestion[0].options)

                        setChartdata(result.data.gameQuestion[0].ContestMembers)

                        if (rowdata.rM > 4) {
                            setChecked("first");
                        } else {
                            setChecked("second");
                        }

                        if (rowdata.rC == 0) {
                            setCorrect(0)
                        }
                        else if (rowdata.rC == 1) {
                            setCorrect(1)
                        }
                        else if (rowdata.rC == 2) {
                            setCorrect(2)
                        }
                        else if (rowdata.rC == 3) {
                            setCorrect(3)
                        }
                        else if (rowdata.rC == 4) {
                            setCorrect(4)
                        }
                        else if (rowdata.rC == 5) {
                            setCorrect(5)
                        }
                        else if (rowdata.rC == 6) {
                            setCorrect(6)
                        }
                        else if (rowdata.rC == 7) {
                            setCorrect(7)
                        }
                        else if (rowdata.rC == 8) {
                            setCorrect(8)
                        }
                        else if (rowdata.rC == 9) {
                            setCorrect(9)
                        }
                        else {
                            setCorrect(null)
                        }

                    }
                })
                .catch(error => console.log('error', error));

        } catch (error) {
            console.log(error, "ghgh");
        }
    }

    const renderButtons = () => {
        const buttons = [];

        for (let i = 1; i <= noOfQue; i++) {
            buttons.push(
                <TouchableOpacity
                    key={i}
                    style={{
                        height: responsiveHeight(4.8),
                        marginRight: 10,
                        backgroundColor: number === i ? '#6A5AE0' : '#fff',
                        width: responsiveWidth(10),
                        borderWidth: 1,
                        borderRadius: 100,
                        justifyContent: 'center',
                    }}
                    onPress={() => {
                        setNumber(i);
                        resultApi(i);
                    }}
                >
                    <Text
                        style={{
                            alignSelf: 'center',
                            fontWeight: '600',
                            fontSize: 18,
                            color: number === i ? '#fff' : '#6A5AE0',
                        }}
                    >
                        {i}
                    </Text>
                </TouchableOpacity>
            );
        }

        return buttons;
    };

    console.log(attempte, "attempte");


    const widthAndHeight = 150;
    const series = [`${attempte.attempted}`, `${attempte.not_attempted}`];
    const sliceColor = ['#6A5AE0', '#A8A8A8'];


    const widthAndHeight2 = 150;
    const series2 = [`${attempte.correctPercnt}`, `${attempte.wrongPercnt}`];
    const sliceColor2 = ['#0085FF', '#A8A8A8'];



    const data = {
        labels: ['A', 'B', 'C', 'D'],
        datasets: [
            {
                data: [`${chartdata.A}`, `${chartdata.B}`, `${chartdata.C}`, `${chartdata.D}`],
                color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // Default color for all bars
                barColors: ['red', 'green', 'blue', 'purple']
            },
        ],
    };

    useEffect(() => {
        resultApi()
    }, [])
    console.log(rowdata, "rowdata");

    // if (rowdata.rM>4) {
    //     console.log("sunil");
    // }
    // else{
    //     console.log("hhhhhhh");
    // }

    return (
        <SafeAreaView>
            <StatusBar translucent={true} barStyle={'light-content'} backgroundColor={'#6A5AE0'} />

            <View style={{ height: responsiveHeight(7), width: responsiveWidth(100), justifyContent: 'center', backgroundColor: '#6A5AE0', paddingHorizontal: 20 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={{ justifyContent: 'center', alignSelf: 'flex-start', marginTop: 15 }}>
                        <AntDesign name="arrowleft" size={24} color="white" />
                    </TouchableOpacity>

                    <Text style={{ color: '#fff', fontSize: 20, fontWeight: '500', alignSelf: 'center', marginTop: 15, marginLeft: '26%' }}>All Question</Text>
                </View>
            </View>



            <ScrollView style={{ marginBottom: 40 }}>


                <ScrollView style={{ flexDirection: 'row' }} horizontal showsHorizontalScrollIndicator={false} >
                    <View style={{ flexDirection: 'row', marginTop: 15, marginHorizontal: 20 }}>

                        {/* <TouchableOpacity style={{ height: responsiveHeight(4.8), marginRight: 10, backgroundColor: number == 1 ? '#6A5AE0' : '#fff', width: responsiveWidth(10), borderWidth: 1, borderRadius: 100, justifyContent: 'center' }}
                            onPress={() => setNumber(1)}>
                            <Text style={{ alignSelf: 'center', fontWeight: '600', fontSize: 18, color: number == 1 ? '#fff' : '#6A5AE0' }}>1</Text>
                        </TouchableOpacity> */}

                        {renderButtons()}



                    </View>
                </ScrollView>

                {/* <Text style={{ fontSize: 15, alignSelf: 'center' }}>myid : {JSON.stringify(myid)}</Text> */}


                <View style={{ height: responsiveHeight(32), width: responsiveWidth(90), marginBottom: 10, paddingHorizontal: 20, backgroundColor: '#fff', alignSelf: 'center', marginTop: 10, borderRadius: 8, elevation: 10 }}>
                    <Text style={{ marginTop: 20, fontSize: 17, fontWeight: '500', color: '#000' }}>Q. {mydata}</Text>
                    {question?.map((res) => {
                        return (
                            <>
                                <View style={{ marginTop: 10, flexDirection: 'row', marginRight: 20 }}>
                                    <TouchableOpacity style={{ height: responsiveHeight(3.5), marginRight: 10, backgroundColor: select == 0 ? '#6A5AE0' : '#fff', width: responsiveWidth(7), borderWidth: 1, borderRadius: 100, justifyContent: 'center' }}
                                        onPress={() => setSelect(0)}>
                                        <Text style={{ alignSelf: 'center', fontWeight: '600', fontSize: 18, color: select == 0 ? '#fff' : '#6A5AE0' }}>{res.id}</Text>
                                    </TouchableOpacity>

                                    <Text style={{ alignSelf: 'center', fontSize: 13 }}>{res.answer}</Text>

                                </View>
                            </>
                        )
                    })

                    }

                </View>


                <View
                    style={{
                        height: responsiveHeight(8),
                        flexDirection: "row",
                        width: responsiveWidth(90),
                        marginBottom: 10,
                        paddingHorizontal: 20,
                        backgroundColor: "#fff",
                        alignSelf: "center",
                        marginTop: 7,
                        borderRadius: 5,
                        elevation: 5,
                    }}
                >
                    <View
                        style={{
                            justifyContent: "flex-start",
                            flexDirection: "row",
                            marginTop: 5,
                            marginHorizontal: 20,
                            height: responsiveHeight(7),
                            borderRadius: 10,
                        }}
                    >
                        <View style={{ justifyContent: "center" }}>
                            <RadioButton
                                color="#0085FF"
                                uncheckedColor="#B9C3CC"
                                value="first"
                                status={checked === "first" ? "checked" : "unchecked"}
                            // onPress={() => { setChecked("first") }}
                            />
                        </View>

                        <View style={{ marginLeft: 5, justifyContent: "center" }}>
                            <Text style={{ fontWeight: "500", fontSize: 16 }}>Right</Text>
                        </View>

                        <Image
                            source={require("../images/right2.png")}
                            style={{
                                height: responsiveHeight(2.6),
                                width: responsiveWidth(5.2),
                                alignSelf: "center",
                                marginLeft: 5,
                            }}
                        />
                    </View>

                    <View
                        style={{
                            justifyContent: "flex-start",
                            flexDirection: "row",
                            marginTop: 5,
                            marginHorizontal: 20,
                            height: responsiveHeight(7),
                            borderRadius: 10,
                        }}
                    >
                        <View style={{ justifyContent: "center", marginLeft: 5 }}>
                            <RadioButton
                                color="#0085FF"
                                uncheckedColor="#B9C3CC"
                                value="second"
                                status={checked === "second" ? "checked" : "unchecked"}
                            // onPress={() => { setChecked("second") }}
                            />
                        </View>

                        <View style={{ marginLeft: 5, justifyContent: "center" }}>
                            <Text style={{ fontWeight: "500", fontSize: 16 }}>Wrong</Text>
                        </View>
                        <Image
                            source={require("../images/wrong.png")}
                            style={{
                                height: responsiveHeight(4),
                                width: responsiveWidth(8),
                                alignSelf: "center",
                                marginTop: 4,
                                marginLeft: 5,
                            }}
                        />
                    </View>
                </View>


                <View
                    style={{
                        height: responsiveHeight(15),
                        width: responsiveWidth(90),
                        marginBottom: 10,
                        paddingHorizontal: 20,
                        backgroundColor: "#fff",
                        alignSelf: "center",
                        marginTop: 7,
                        borderRadius: 5,
                        elevation: 5,
                    }}
                >
                    <Text
                        style={{
                            marginTop: 10,
                            fontSize: 18,
                            fontWeight: "500",
                            color: "#000",
                        }}
                    >
                        Correct %
                    </Text>

                    <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            marginTop: 10,
                        }}
                    >
                        <TouchableOpacity
                            style={{
                                height: responsiveHeight(3),
                                backgroundColor: correct == 0 ? "#000" : "#fff",
                                justifyContent: "center",
                                width: responsiveWidth(6),
                                borderWidth: 1,
                                borderRadius: 5,
                            }}
                        // onPress={() => { calculation(mainValuerl, 0), setCorrect(0) }}
                        // onPress={() => { setChecked("second"); setmainValuerl(3.5) }}

                        >
                            <Text
                                style={{
                                    alignSelf: "center",
                                    fontWeight: "600",
                                    fontSize: 15,
                                    color: correct == 0 ? "#fff" : "#000",
                                }}
                            >
                                {A}
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={{
                                height: responsiveHeight(3),
                                justifyContent: "center",
                                backgroundColor: correct == 1 ? "#000" : "#fff",
                                width: responsiveWidth(6),
                                borderWidth: 1,
                                borderRadius: 5,
                            }}
                        // onPress={() => { calculation(mainValuerl, 1), setCorrect(1) }}
                        >
                            <Text
                                style={{
                                    alignSelf: "center",
                                    fontWeight: "600",
                                    fontSize: 15,
                                    color: correct == 1 ? "#fff" : "#000",
                                }}
                            >
                                {B}
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={{
                                height: responsiveHeight(3),
                                justifyContent: "center",
                                backgroundColor: correct == 2 ? "#000" : "#fff",
                                width: responsiveWidth(6),
                                borderWidth: 1,
                                borderRadius: 5,
                            }}
                        // onPress={() => { setCorrect(2), calculation(mainValuerl, 2) }}
                        >
                            <Text
                                style={{
                                    alignSelf: "center",
                                    fontWeight: "600",
                                    fontSize: 15,
                                    color: correct == 2 ? "#fff" : "#000",
                                }}
                            >
                                {C}
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={{
                                height: responsiveHeight(3),
                                justifyContent: "center",
                                backgroundColor: correct == 3 ? "#000" : "#fff",
                                width: responsiveWidth(6),
                                borderWidth: 1,
                                borderRadius: 5,
                            }}
                        // onPress={() => { setCorrect(3), calculation(mainValuerl, 3) }}
                        >
                            <Text
                                style={{
                                    alignSelf: "center",
                                    fontWeight: "600",
                                    fontSize: 15,
                                    color: correct == 3 ? "#fff" : "#000",
                                }}
                            >
                                {D}
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={{
                                height: responsiveHeight(3),
                                justifyContent: "center",
                                backgroundColor: correct == 4 ? "#000" : "#fff",
                                width: responsiveWidth(6),
                                borderWidth: 1,
                                borderRadius: 5,
                            }}
                        // onPress={() => { setCorrect(4), calculation(mainValuerl, 4) }}
                        >
                            <Text
                                style={{
                                    alignSelf: "center",
                                    fontWeight: "600",
                                    fontSize: 15,
                                    color: correct == 4 ? "#fff" : "#000",
                                }}
                            >
                                {E}
                            </Text>
                        </TouchableOpacity>
                    </View>

                    <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            marginTop: 12,
                        }}
                    >
                        <TouchableOpacity
                            style={{
                                height: responsiveHeight(3),
                                justifyContent: "center",
                                backgroundColor: correct == 5 ? "#000" : "#fff",
                                width: responsiveWidth(6),
                                borderWidth: 1,
                                borderRadius: 5,
                            }}
                        // onPress={() => { setCorrect(5), calculation(mainValuerl, 5) }}
                        >
                            <Text
                                style={{
                                    alignSelf: "center",
                                    fontWeight: "600",
                                    fontSize: 15,
                                    color: correct == 5 ? "#fff" : "#000",
                                }}
                            >
                                {F}
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={{
                                height: responsiveHeight(3),
                                justifyContent: "center",
                                backgroundColor: correct == 6 ? "#000" : "#fff",
                                width: responsiveWidth(6),
                                borderWidth: 1,
                                borderRadius: 5,
                            }}
                        // onPress={() => { setCorrect(6), calculation(mainValuerl, 6) }}
                        >
                            <Text
                                style={{
                                    alignSelf: "center",
                                    fontWeight: "600",
                                    fontSize: 15,
                                    color: correct == 6 ? "#fff" : "#000",
                                }}
                            >
                                {G}
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={{
                                height: responsiveHeight(3),
                                justifyContent: "center",
                                backgroundColor: correct == 7 ? "#000" : "#fff",
                                width: responsiveWidth(6),
                                borderWidth: 1,
                                borderRadius: 5,
                            }}
                        // onPress={() => { setCorrect(7), calculation(mainValuerl, 7) }}
                        >
                            <Text
                                style={{
                                    alignSelf: "center",
                                    fontWeight: "600",
                                    fontSize: 15,
                                    color: correct == 7 ? "#fff" : "#000",
                                }}
                            >
                                {H}
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={{
                                height: responsiveHeight(3),
                                justifyContent: "center",
                                backgroundColor: correct == 8 ? "#000" : "#fff",
                                width: responsiveWidth(6),
                                borderWidth: 1,
                                borderRadius: 5,
                            }}
                        // onPress={() => { setCorrect(8), calculation(mainValuerl, 8) }}
                        >
                            <Text
                                style={{
                                    alignSelf: "center",
                                    fontWeight: "600",
                                    fontSize: 15,
                                    color: correct == 8 ? "#fff" : "#000",
                                }}
                            >
                                {I}
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={{
                                height: responsiveHeight(3),
                                justifyContent: "center",
                                backgroundColor: correct == 9 ? "#000" : "#fff",
                                width: responsiveWidth(6),
                                borderWidth: 1,
                                borderRadius: 5,
                            }}
                        // onPress={() => { setCorrect(9), calculation(mainValuerl, 9) }}
                        >
                            <Text
                                style={{
                                    alignSelf: "center",
                                    fontWeight: "600",
                                    fontSize: 15,
                                    color: correct == 9 ? "#fff" : "#000",
                                }}
                            >
                                {J}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>


                <View
                    style={{
                        height: responsiveHeight(40),
                        elevation: 10,
                        borderRadius: 10,
                        width: responsiveWidth(90),
                        backgroundColor: "#fff",
                        alignSelf: 'center'
                    }}
                >
                    <Text
                        style={{
                            alignSelf: "center",
                            marginTop: 12,
                            fontSize: 14,
                            fontWeight: "500",
                        }}
                    >
                        Row point Panel
                    </Text>

                    <View style={{ borderBottomWidth: 0.6, padding: 4 }}></View>

                    <View
                        style={{
                            flexDirection: "row",
                            marginTop: 7,
                            justifyContent: "space-between",
                            marginHorizontal: 20,
                        }}
                    >
                        <View>
                            <Text style={{ fontWeight: "500", fontSize: 15 }}>M</Text>

                            <Text
                                style={{
                                    fontWeight: "500",
                                    fontSize: 15,
                                    alignSelf: "center",
                                    marginTop: 5,
                                }}
                            >
                                {rowdata.rM}
                            </Text>
                        </View>

                        <View>
                            <Text style={{ fontWeight: "500", fontSize: 15 }}>C%</Text>
                            <Text
                                style={{
                                    fontWeight: "500",
                                    fontSize: 15,
                                    alignSelf: "center",
                                    marginTop: 5,
                                }}
                            >
                                {rowdata.rC}
                            </Text>

                        </View>



                        <View>
                            <Text style={{ fontWeight: "500", fontSize: 15 }}>T(Time)</Text>
                            <Text
                                style={{
                                    fontWeight: "500",
                                    fontSize: 15,
                                    alignSelf: "center",
                                    marginTop: 5,
                                }}
                            >
                                {rowdata.timeTaken}
                            </Text>
                        </View>
                    </View>

                    <View style={{ borderBottomWidth: 0.6, marginTop: 4 }}></View>


                    <View style={{ flexDirection: 'row', justifyContent: 'flex-start',marginLeft:20,marginTop:5 }}>
                        <View style={{ transform: [{ rotate: '47deg' }] }}>
                            <Image source={require('../images/line.png')} style={{ height: responsiveHeight(5), width: responsiveWidth(16) }} />
                        </View>

                        <View style={{ transform: [{ rotate: '130deg' }] }}>
                            <Image source={require('../images/line.png')} style={{ height: responsiveHeight(5), width: responsiveWidth(14),marginRight:20}} />
                        </View>

                        <View style={{ transform: [{ rotate: '38deg' }],marginTop:5 }}>
                            <Image source={require('../images/line.png')} style={{ height: responsiveHeight(5), width: responsiveWidth(22) }} />
                        </View>

                        <View style={{ transform: [{ rotate: '130deg' }] }}>
                            <Image source={require('../images/line.png')} style={{ height: responsiveHeight(5), width: responsiveWidth(16),marginRight:20}} />
                        </View>

                        

                        
                    </View>

                    <View
                        style={{
                            flexDirection: "row",
                            marginTop: 5,
                            justifyContent: 'space-evenly',
                            marginHorizontal: 20,marginLeft:10
                        }}
                    >
                        <TouchableOpacity
                            style={{
                                height: responsiveHeight(3.5),
                                justifyContent: "center",
                                width: responsiveWidth(11),
                                borderWidth: 1,
                                borderRadius: 5,
                            }}
                        >
                            <Text
                                style={{
                                    alignSelf: "center",
                                    fontWeight: "600",
                                    fontSize: 15,
                                }}
                            >
                                {rowdata.rawPoints}

                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={{
                                height: responsiveHeight(3.5),
                                justifyContent: "center",
                                width: responsiveWidth(8),
                                borderWidth: 1,
                                borderRadius: 5,
                            }}
                        >
                            <Text
                                style={{
                                    alignSelf: "center",
                                    fontWeight: "600",
                                    fontSize: 15,
                                }}
                            >
                                +
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={{
                                height: responsiveHeight(3.5),
                                justifyContent: "center",
                                width: responsiveWidth(8),
                                borderWidth: 1,
                                borderRadius: 5,
                            }}
                        >
                            <Text
                                style={{
                                    alignSelf: "center",
                                    fontWeight: "600",
                                    fontSize: 15,
                                }}
                            >
                                {rowdata.timeTaken}
                            </Text>
                            
                        </TouchableOpacity>
                    </View>

                    <View style={{ flexDirection: 'row', justifyContent: 'center',marginLeft:0,marginTop:10 }}>
                        <View style={{ transform: [{ rotate: '47deg' }] }}>
                            <Image source={require('../images/line.png')} style={{ height: responsiveHeight(5), width: responsiveWidth(20) }} />
                        </View>

                        <View style={{ transform: [{ rotate: '130deg' }] }}>
                            <Image source={require('../images/line.png')} style={{ height: responsiveHeight(5), width: responsiveWidth(20),marginRight:20}} />
                        </View>
                        </View>

                    <TouchableOpacity
                        style={{
                            height: responsiveHeight(4),
                            alignSelf: "center",
                            marginTop: 15,
                            justifyContent: "center",
                            width: responsiveWidth(28),
                            borderWidth: 1,
                            borderRadius: 5,
                        }}
                    >
                        <Text
                            style={{ alignSelf: "center", fontWeight: "600", fontSize: 15 }}
                        >9</Text>
                    </TouchableOpacity>
                </View>


                <View style={{ height: responsiveHeight(95), elevation: 10, marginBottom: '10%', marginTop: 20, width: responsiveWidth(90), borderRadius: 10, backgroundColor: '#fff', alignSelf: 'center' }}>
                    <Text style={{ alignSelf: 'center', fontSize: 20, marginTop: 10, fontWeight: '500' }}>Answer Analysis</Text>

                    <View style={{ height: responsiveHeight(10), elevation: 10, marginTop: 20, width: responsiveWidth(90), borderRadius: 10, backgroundColor: '#fff', alignSelf: 'center' }}>

                        <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
                            <Text style={{ fontSize: 15, marginTop: 10, marginHorizontal: 20 }}>Currect Answer    : -</Text>
                            <View style={{ alignSelf: 'center', marginTop: 10, height: responsiveHeight(3), width: responsiveWidth(7), borderWidth: 0.5, borderRadius: 5 }}>
                                <Text style={{ alignSelf: 'center' }}>{attempte.answer}</Text>
                            </View>
                        </View>

                        <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
                            <Text style={{ fontSize: 15, marginTop: 10, marginHorizontal: 20 }}>Your Answer         : -</Text>
                            <View style={{ alignSelf: 'center', marginTop: 10, height: responsiveHeight(3), width: responsiveWidth(7), borderWidth: 0.5, borderRadius: 5 }}>
                                <Text style={{ alignSelf: 'center' }}>{rowdata.answer}</Text>
                            </View>
                        </View>

                    </View>


                    <View
                    style={{
                        height: responsiveHeight(40),
                        elevation: 10,
                        borderRadius: 10,
                        width: responsiveWidth(90),
                        backgroundColor: "#fff",
                        alignSelf: 'center',
                        marginTop:10
                    }}
                >
                    <Text
                        style={{
                            alignSelf: "center",
                            marginTop: 12,
                            fontSize: 14,
                            fontWeight: "500",
                        }}
                    >
                        main point Panel
                    </Text>

                    <View style={{ borderBottomWidth: 0.6, padding: 4 }}></View>

                    <View
                        style={{
                            flexDirection: "row",
                            marginTop: 7,
                            justifyContent: "space-between",
                            marginHorizontal: 20,
                        }}
                    >
                        <View>
                            <Text style={{ fontWeight: "500", fontSize: 15 }}>M</Text>

                            <Text
                                style={{
                                    fontWeight: "500",
                                    fontSize: 15,
                                    alignSelf: "center",
                                    marginTop: 5,
                                }}
                            >
                                {rowdata.mM}
                            </Text>
                        </View>

                        <View>
                            <Text style={{ fontWeight: "500", fontSize: 15 }}>C%</Text>
                            <Text
                                style={{
                                    fontWeight: "500",
                                    fontSize: 15,
                                    alignSelf: "center",
                                    marginTop: 5,
                                }}
                            >
                                {rowdata.mC}
                            </Text>

                        </View>



                        <View>
                            <Text style={{ fontWeight: "500", fontSize: 15 }}>T(Time)</Text>
                            <Text
                                style={{
                                    fontWeight: "500",
                                    fontSize: 15,
                                    alignSelf: "center",
                                    marginTop: 5,
                                }}
                            >
                                {rowdata.timeTaken}
                            </Text>
                        </View>
                    </View>

                    <View style={{ borderBottomWidth: 0.6, marginTop: 4 }}></View>

                    {/* <View style={{ transform: [{ rotate: '140deg'}] }}>
                            <Image source={require('../images/line.png')} style={{ height: responsiveHeight(5), width: responsiveWidth(34),marginRight:20,zIndex:1,position:'absolute'}} />
                        </View> */}


                    <View style={{ flexDirection: 'row', justifyContent: 'flex-start',marginLeft:20,marginTop:5 }}>
                        <View style={{ transform: [{ rotate: '47deg' }] }}>
                            <Image source={require('../images/line.png')} style={{ height: responsiveHeight(5), width: responsiveWidth(16) }} />
                        </View>

                        
                        <View style={{ transform: [{ rotate: '130deg' }] }}>
                            <Image source={require('../images/line.png')} style={{ height: responsiveHeight(5), width: responsiveWidth(14),marginRight:20}} />
                        </View>

                        <View style={{ transform: [{ rotate: '38deg' }],marginTop:5 }}>
                            <Image source={require('../images/line.png')} style={{ height: responsiveHeight(5), width: responsiveWidth(22) }} />
                        </View>

                        <View style={{ transform: [{ rotate: '130deg' }] }}>
                            <Image source={require('../images/line.png')} style={{ height: responsiveHeight(5), width: responsiveWidth(16),marginRight:20}} />
                        </View>

                        

                        
                    </View>

                    <View
                        style={{
                            flexDirection: "row",
                            marginTop: 5,
                            justifyContent: 'space-evenly',
                            marginHorizontal: 20,marginLeft:10
                        }}
                    >
                        <TouchableOpacity
                            style={{
                                height: responsiveHeight(3.5),
                                justifyContent: "center",
                                width: responsiveWidth(11),
                                borderWidth: 1,
                                borderRadius: 5,
                            }}
                        >
                            <Text
                                style={{
                                    alignSelf: "center",
                                    fontWeight: "600",
                                    fontSize: 15,
                                }}
                            >
                                {rowdata.mainPoints}

                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={{
                                height: responsiveHeight(3.5),
                                justifyContent: "center",
                                width: responsiveWidth(8),
                                borderWidth: 1,
                                borderRadius: 5,
                            }}
                        >
                            <Text
                                style={{
                                    alignSelf: "center",
                                    fontWeight: "600",
                                    fontSize: 15,
                                }}
                            >
                                +
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={{
                                height: responsiveHeight(3.5),
                                justifyContent: "center",
                                width: responsiveWidth(8),
                                borderWidth: 1,
                                borderRadius: 5,
                            }}
                        >
                            <Text
                                style={{
                                    alignSelf: "center",
                                    fontWeight: "600",
                                    fontSize: 15,
                                }}
                            >
                                {rowdata.timeTaken}
                            </Text>
                            
                        </TouchableOpacity>
                    </View>

                    <View style={{ flexDirection: 'row', justifyContent: 'center',marginLeft:0,marginTop:10 }}>
                        <View style={{ transform: [{ rotate: '47deg' }] }}>
                            <Image source={require('../images/line.png')} style={{ height: responsiveHeight(5), width: responsiveWidth(20) }} />
                        </View>

                        <View style={{ transform: [{ rotate: '130deg' }] }}>
                            <Image source={require('../images/line.png')} style={{ height: responsiveHeight(5), width: responsiveWidth(20),marginRight:20}} />
                        </View>
                        </View>

                    <TouchableOpacity
                        style={{
                            height: responsiveHeight(4),
                            alignSelf: "center",
                            marginTop: 15,
                            justifyContent: "center",
                            width: responsiveWidth(28),
                            borderWidth: 1,
                            borderRadius: 5,
                        }}
                    >
                        <Text
                            style={{ alignSelf: "center", fontWeight: "600", fontSize: 15 }}
                        >7</Text>
                    </TouchableOpacity>
                </View>



                <View style={{ height: responsiveHeight(35), alignSelf: 'center', width: responsiveWidth(90), marginBottom: 10, backgroundColor: '#fff', alignSelf: 'center', marginTop: 10, borderRadius: 8, elevation: 10 }}>


<View style={{ flexDirection: 'row', justifyContent: 'center', marginHorizontal: 10 }}>

  <View style={{ marginTop: 30, alignSelf: 'center' }}>
    <PieChart
      widthAndHeight={widthAndHeight2}
      series={series2}
      sliceColor={sliceColor2}
      coverRadius={0.45}
      coverFill={'#FFF'}
    />
  </View>

</View>

{
  attempte.correctPercnt <= attempte.wrongPercnt ? (

    <Text style={{ fontSize: 14, position: 'absolute', color: '#000', fontWeight: '500', top: '20%', right: '33%' }}>{((attempte.correctPercnt) / (attempte.wrongPercnt + attempte.correctPercnt) * 100).toFixed(1)}%</Text>
  ) :
    (
      <>
        <Text style={{ fontSize: 14, position: 'absolute', color: '#000', fontWeight: '500', top: '20%', right: '33%' }}>{((attempte.correctPercnt) / (attempte.wrongPercnt + attempte.correctPercnt) * 100).toFixed(1)}%</Text>
      </>
    )
}

{
  attempte.correctPercnt >= attempte.wrongPercnt ? (
    <Text style={{ fontSize: 14, position: 'absolute', top: '20%', fontWeight: '500', right: '54%', color: '#0085FF' }}>{((attempte.wrongPercnt) / (attempte.wrongPercnt + attempte.correctPercnt) * 100).toFixed(1)}%

    </Text>
  ) :
    (
      <>
        <Text style={{ fontSize: 14, position: 'absolute', top: '20%', fontWeight: '500', right: '54%', color: '#0085FF' }}>{((attempte.wrongPercnt) / (attempte.wrongPercnt + attempte.correctPercnt) * 100).toFixed(1)}%

        </Text>
      </>
    )
}




<View style={{ marginTop: '5%', alignSelf: 'center', flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 50 }}>

  <View>

    <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
      <View style={{ height: responsiveHeight(1.9), width: responsiveWidth(3.8), backgroundColor: '#0085FF', alignSelf: 'center' }}>

      </View>

      <Text style={{ fontSize: 13, marginRight: 10, marginLeft: 10 }}>{attempte.correctPercnt} Correct</Text>
    </View>
  </View>

  <View style={{ flexDirection: 'row' }}>
    <View style={{ height: responsiveHeight(1.9), width: responsiveWidth(3.8), backgroundColor: '#A8A8A8', alignSelf: 'center' }}>

    </View>

    <Text style={{ fontSize: 13, marginLeft: 10 }}>{attempte.wrongPercnt} Incorrect</Text>
  </View>





</View>
</View>

                </View>





            </ScrollView>

        </SafeAreaView>
    )
}

export default AllQuestion