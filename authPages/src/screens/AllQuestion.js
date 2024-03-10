import { View, Text, StatusBar, Image, TextInput, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import { ScrollView } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context';
import { AntDesign } from '@expo/vector-icons';
import PieChart from 'react-native-pie-chart';
import { useNavigation, useRoute } from '@react-navigation/native'
import { RadioButton } from "react-native-paper";
import { useDispatch, useSelector } from 'react-redux';
import { winnersListPageAllDataOfAUserForParticularExam } from '../../slices/examSlice';


const AllQuestion = (props) => {
    const dispatch = useDispatch()
    const navigation = useNavigation();
    const route = useRoute();


    const gameId = route.params?.gameId || null;
    const noOfQue = route.params?.noOfQue || null;

    const [selectedQueNo, setSelectedQueNo] = useState(1)
    const [select, setSelect] = useState('')

    const { winnersListPageAllDataOfAUserForParticularExamData } = useSelector((state) => state.examCustom)
    const options = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];


    useEffect(() => {
        dispatch(winnersListPageAllDataOfAUserForParticularExam({ gameId, que_no: selectedQueNo }))
    }, [dispatch, selectedQueNo])

    const renderButtons = () => {
        const buttons = [];

        for (let i = 1; i <= noOfQue; i++) {
            buttons.push(
                <TouchableOpacity
                    key={i}
                    style={{
                        height: responsiveHeight(4.8),
                        marginRight: 10,
                        backgroundColor: selectedQueNo === i ? '#6A5AE0' : '#fff',
                        width: responsiveWidth(10),
                        borderWidth: 1,
                        borderRadius: 100,
                        justifyContent: 'center',
                    }}
                    onPress={() => {
                        setSelectedQueNo(i);
                    }}
                >
                    <Text
                        style={{
                            alignSelf: 'center',
                            fontWeight: '600',
                            fontSize: 18,
                            color: selectedQueNo === i ? '#fff' : '#6A5AE0',
                        }}
                    >
                        {i}
                    </Text>
                </TouchableOpacity>
            );
        }

        return buttons;
    };

    const pieChartWidth = 150;
    const series2 = [`${winnersListPageAllDataOfAUserForParticularExamData?.correctPercnt}`, `${winnersListPageAllDataOfAUserForParticularExamData?.wrongPercnt}`];
    const sliceColor2 = ['#0085FF', '#A8A8A8'];

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
                        {renderButtons()}
                    </View>
                </ScrollView>



                <View style={{ height: responsiveHeight(32), width: responsiveWidth(90), marginBottom: 10, paddingHorizontal: 20, backgroundColor: '#fff', alignSelf: 'center', marginTop: 10, borderRadius: 8, elevation: 10 }}>
                    <Text style={{ marginTop: 20, fontSize: 17, fontWeight: '500', color: '#000' }}>Q. {winnersListPageAllDataOfAUserForParticularExamData?.question}</Text>
                    {winnersListPageAllDataOfAUserForParticularExamData?.options?.map((res) => {
                        return (
                            <>
                                <View style={{ marginTop: 10, flexDirection: 'row', marginRight: 20 }}>
                                    <TouchableOpacity style={{ height: responsiveHeight(3.5), marginRight: 10, backgroundColor: select == 0 ? '#6A5AE0' : '#fff', width: responsiveWidth(7), borderWidth: 1, borderRadius: 100, justifyContent: 'center' }}
                                        onPress={() => setSelect(0)}>
                                        <Text style={{ alignSelf: 'center', fontWeight: '600', fontSize: 18, color: select == 0 ? '#fff' : '#6A5AE0' }}>{res.id}</Text>
                                    </TouchableOpacity>

                                    <Text style={{ alignSelf: 'center', fontSize: 13 }}>{res?.answer}</Text>

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
                                value="5"
                                status={winnersListPageAllDataOfAUserForParticularExamData?.UserQuestion?.rM == 5.5 ? "checked" : "unchecked"}
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
                                status={winnersListPageAllDataOfAUserForParticularExamData?.UserQuestion?.rM === 3.5 ? "checked" : "unchecked"}
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
                        height: responsiveHeight(12),
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
                        {options.map((option, index) => (
                            <TouchableOpacity
                                key={index}
                                style={{
                                    height: responsiveHeight(3),
                                    justifyContent: "center",
                                    backgroundColor: winnersListPageAllDataOfAUserForParticularExamData?.UserQuestion?.rC === index ? "#000" : "#fff",
                                    width: responsiveWidth(6),
                                    borderWidth: 1,
                                    borderRadius: 5,
                                }}
                            // onPress={() => onPress(index)}
                            >
                                <Text
                                    style={{
                                        alignSelf: "center",
                                        fontWeight: "600",
                                        fontSize: 15,
                                        color: winnersListPageAllDataOfAUserForParticularExamData?.UserQuestion?.rC === index ? "#fff" : "#000",
                                    }}
                                >
                                    {option}
                                </Text>
                            </TouchableOpacity>
                        ))}
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
                        Row Point Panel
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
                                {winnersListPageAllDataOfAUserForParticularExamData?.UserQuestion?.rM}
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
                                {winnersListPageAllDataOfAUserForParticularExamData?.UserQuestion?.rC}
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
                                {winnersListPageAllDataOfAUserForParticularExamData?.UserQuestion?.timeTaken}
                            </Text>
                        </View>
                    </View>

                    <View style={{ borderBottomWidth: 0.6, marginTop: 4 }}></View>


                    <View style={{ flexDirection: 'row', justifyContent: 'flex-start', marginLeft: 20, marginTop: 5 }}>
                        <View style={{ transform: [{ rotate: '47deg' }] }}>
                            <Image source={require('../images/line.png')} style={{ height: responsiveHeight(5), width: responsiveWidth(16) }} />
                        </View>

                        <View style={{ transform: [{ rotate: '130deg' }] }}>
                            <Image source={require('../images/line.png')} style={{ height: responsiveHeight(5), width: responsiveWidth(14), marginRight: 20 }} />
                        </View>

                        <View style={{ transform: [{ rotate: '38deg' }], marginTop: 5 }}>
                            <Image source={require('../images/line.png')} style={{ height: responsiveHeight(5), width: responsiveWidth(22) }} />
                        </View>

                        <View style={{ transform: [{ rotate: '130deg' }] }}>
                            <Image source={require('../images/line.png')} style={{ height: responsiveHeight(5), width: responsiveWidth(16), marginRight: 20 }} />
                        </View>




                    </View>

                    <View
                        style={{
                            flexDirection: "row",
                            marginTop: 5,
                            justifyContent: 'space-evenly',
                            marginHorizontal: 20, marginLeft: 10
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
                                {winnersListPageAllDataOfAUserForParticularExamData?.UserQuestion?.rawPoints}
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
                                {winnersListPageAllDataOfAUserForParticularExamData?.UserQuestion?.timeTaken}
                            </Text>

                        </TouchableOpacity>
                    </View>

                    <View style={{ flexDirection: 'row', justifyContent: 'center', marginLeft: 0, marginTop: 10 }}>
                        <View style={{ transform: [{ rotate: '47deg' }] }}>
                            <Image source={require('../images/line.png')} style={{ height: responsiveHeight(5), width: responsiveWidth(20) }} />
                        </View>

                        <View style={{ transform: [{ rotate: '130deg' }] }}>
                            <Image source={require('../images/line.png')} style={{ height: responsiveHeight(5), width: responsiveWidth(20), marginRight: 20 }} />
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
                            <Text style={{ fontSize: 15, marginTop: 10, marginHorizontal: 20 }}>Correct Answer : -</Text>
                            <View style={{ alignSelf: 'center', marginTop: 10, height: responsiveHeight(3), width: responsiveWidth(7), borderWidth: 0.5, borderRadius: 5 }}>
                                <Text style={{ alignSelf: 'center' }}>{winnersListPageAllDataOfAUserForParticularExamData?.answer}</Text>
                            </View>
                        </View>

                        <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
                            <Text style={{ fontSize: 15, marginTop: 10, marginHorizontal: 20 }}>Your Answer      : -</Text>
                            <View style={{ alignSelf: 'center', marginTop: 10, height: responsiveHeight(3), width: responsiveWidth(7), borderWidth: 0.5, borderRadius: 5 }}>
                                <Text style={{ alignSelf: 'center' }}>{winnersListPageAllDataOfAUserForParticularExamData?.UserQuestion?.answer}</Text>
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
                            marginTop: 10
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
                            Main Point Panel
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
                                    {winnersListPageAllDataOfAUserForParticularExamData?.UserQuestion?.mM}
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
                                    {winnersListPageAllDataOfAUserForParticularExamData?.UserQuestion?.mC}
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
                                    {winnersListPageAllDataOfAUserForParticularExamData?.UserQuestion?.timeTaken}
                                </Text>
                            </View>
                            <View>
                                <Text style={{ fontWeight: "500", fontSize: 15 }}>C+T(correct% +T) </Text>
                                <Text
                                    style={{
                                        fontWeight: "500",
                                        fontSize: 15,
                                        alignSelf: "center",
                                        marginTop: 5,
                                    }}
                                >
                                    {(winnersListPageAllDataOfAUserForParticularExamData?.UserQuestion?.mC) + (winnersListPageAllDataOfAUserForParticularExamData?.UserQuestion?.timeTaken)}
                                </Text>
                            </View>
                        </View>

                        <View style={{ borderBottomWidth: 0.6, marginTop: 4 }}></View>

                        {/* <View style={{ transform: [{ rotate: '140deg'}] }}>
                            <Image source={require('../images/line.png')} style={{ height: responsiveHeight(5), width: responsiveWidth(34),marginRight:20,zIndex:1,position:'absolute'}} />
                        </View> */}


                        <View style={{ flexDirection: 'row', justifyContent: 'flex-start', marginLeft: 20, marginTop: 5 }}>
                            <View style={{ transform: [{ rotate: '47deg' }] }}>
                                <Image source={require('../images/line.png')} style={{ height: responsiveHeight(5), width: responsiveWidth(16) }} />
                            </View>


                            <View style={{ transform: [{ rotate: '130deg' }] }}>
                                <Image source={require('../images/line.png')} style={{ height: responsiveHeight(5), width: responsiveWidth(14), marginRight: 20 }} />
                            </View>

                            <View style={{ transform: [{ rotate: '38deg' }], marginTop: 5 }}>
                                <Image source={require('../images/line.png')} style={{ height: responsiveHeight(5), width: responsiveWidth(22) }} />
                            </View>

                            <View style={{ transform: [{ rotate: '130deg' }] }}>
                                <Image source={require('../images/line.png')} style={{ height: responsiveHeight(5), width: responsiveWidth(16), marginRight: 20 }} />
                            </View>




                        </View>

                        <View
                            style={{
                                flexDirection: "row",
                                marginTop: 5,
                                justifyContent: 'space-evenly',
                                marginHorizontal: 20, marginLeft: 10
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
                                    {(winnersListPageAllDataOfAUserForParticularExamData?.UserQuestion?.mM) + (winnersListPageAllDataOfAUserForParticularExamData?.UserQuestion?.mC) + (winnersListPageAllDataOfAUserForParticularExamData?.UserQuestion?.timeTaken)}

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
                                    {(winnersListPageAllDataOfAUserForParticularExamData?.UserQuestion?.mC) + (winnersListPageAllDataOfAUserForParticularExamData?.UserQuestion?.timeTaken)}
                                </Text>

                            </TouchableOpacity>
                        </View>

                        <View style={{ flexDirection: 'row', justifyContent: 'center', marginLeft: 0, marginTop: 10 }}>
                            <View style={{ transform: [{ rotate: '47deg' }] }}>
                                <Image source={require('../images/line.png')} style={{ height: responsiveHeight(5), width: responsiveWidth(20) }} />
                            </View>

                            <View style={{ transform: [{ rotate: '130deg' }] }}>
                                <Image source={require('../images/line.png')} style={{ height: responsiveHeight(5), width: responsiveWidth(20), marginRight: 20 }} />
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
                            >{winnersListPageAllDataOfAUserForParticularExamData?.UserQuestion?.mainPoints}</Text>
                        </TouchableOpacity>
                    </View>



                    <View style={{ height: responsiveHeight(35), alignSelf: 'center', width: responsiveWidth(90), marginBottom: 10, backgroundColor: '#fff', alignSelf: 'center', marginTop: 10, borderRadius: 8, elevation: 10 }}>


                        <View style={{ flexDirection: 'row', justifyContent: 'center', marginHorizontal: 10 }}>

                            <View style={{ marginTop: 30, alignSelf: 'center' }}>
                                <PieChart
                                    widthAndHeight={pieChartWidth}
                                    series={series2}
                                    sliceColor={sliceColor2}
                                    coverRadius={0.45}
                                    coverFill={'#FFF'}
                                />
                            </View>

                        </View>

                        {
                            winnersListPageAllDataOfAUserForParticularExamData?.correctPercnt <= winnersListPageAllDataOfAUserForParticularExamData?.wrongPercnt ? (

                                <Text style={{ fontSize: 14, position: 'absolute', color: '#000', fontWeight: '500', top: '20%', right: '33%' }}>{((winnersListPageAllDataOfAUserForParticularExamData?.correctPercnt) / (winnersListPageAllDataOfAUserForParticularExamData?.wrongPercnt + winnersListPageAllDataOfAUserForParticularExamData?.correctPercnt) * 100).toFixed(1)}%</Text>
                            ) :
                                (
                                    <>
                                        <Text style={{ fontSize: 14, position: 'absolute', color: '#000', fontWeight: '500', top: '20%', right: '33%' }}>{((winnersListPageAllDataOfAUserForParticularExamData?.correctPercnt) / (winnersListPageAllDataOfAUserForParticularExamData?.wrongPercnt + winnersListPageAllDataOfAUserForParticularExamData?.correctPercnt) * 100).toFixed(1)}%</Text>
                                    </>
                                )
                        }

                        {
                            winnersListPageAllDataOfAUserForParticularExamData?.correctPercnt >= winnersListPageAllDataOfAUserForParticularExamData?.wrongPercnt ? (
                                <Text style={{ fontSize: 14, position: 'absolute', top: '20%', fontWeight: '500', right: '54%', color: '#0085FF' }}>{((winnersListPageAllDataOfAUserForParticularExamData?.wrongPercnt) / (winnersListPageAllDataOfAUserForParticularExamData?.wrongPercnt + winnersListPageAllDataOfAUserForParticularExamData?.correctPercnt) * 100).toFixed(1)}%

                                </Text>
                            ) :
                                (
                                    <>
                                        <Text style={{ fontSize: 14, position: 'absolute', top: '20%', fontWeight: '500', right: '54%', color: '#0085FF' }}>{((winnersListPageAllDataOfAUserForParticularExamData?.wrongPercnt) / (winnersListPageAllDataOfAUserForParticularExamData?.wrongPercnt + winnersListPageAllDataOfAUserForParticularExamData?.correctPercnt) * 100).toFixed(1)}%

                                        </Text>
                                    </>
                                )
                        }




                        <View style={{ marginTop: '5%', alignSelf: 'center', flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 50 }}>

                            <View>

                                <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
                                    <View style={{ height: responsiveHeight(1.9), width: responsiveWidth(3.8), backgroundColor: '#0085FF', alignSelf: 'center' }}>

                                    </View>

                                    <Text style={{ fontSize: 13, marginRight: 10, marginLeft: 10 }}>{winnersListPageAllDataOfAUserForParticularExamData?.correctPercnt} Correct</Text>
                                </View>
                            </View>

                            <View style={{ flexDirection: 'row' }}>
                                <View style={{ height: responsiveHeight(1.9), width: responsiveWidth(3.8), backgroundColor: '#A8A8A8', alignSelf: 'center' }}>

                                </View>

                                <Text style={{ fontSize: 13, marginLeft: 10 }}>{winnersListPageAllDataOfAUserForParticularExamData?.wrongPercnt} Incorrect</Text>
                            </View>





                        </View>
                    </View>

                </View>





            </ScrollView>

        </SafeAreaView>
    )
}

export default AllQuestion