import { View, Text, StatusBar, Image, TextInput, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import { ScrollView } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context';
import { AntDesign } from '@expo/vector-icons';
import PieChart from 'react-native-pie-chart';
import { BarChart } from 'react-native-chart-kit';
import { useDispatch, useSelector } from 'react-redux';
import { winnersListPageAllDataOfAUserForParticularExam } from '../../slices/examSlice';



const MyQuesInPercentage = ({ navigation, route }) => {
    const dispatch = useDispatch()

    const [selectedQueNo, setSelectedQueNo] = useState(1)
    const [select, setSelect] = useState('')
    const [chartData, setChartData] = useState('')


    const gameId = route.params?.gameid || null;
    const noOfQue = route.params?.noOfQue || null;

    const { winnersListPageAllDataOfAUserForParticularExamData } = useSelector((state) => state.examCustom)


    const [searchQuery, setSearchQuery] = useState('');
    const [searchFilteredData, setSearchFilteredData] = useState(winnersListPageAllDataOfAUserForParticularExamData?.questionleaderShip);
    const handleSearch = () => {
        const filtered = winnersListPageAllDataOfAUserForParticularExamData?.questionleaderShip?.filter(item => {
            const nameMatches = item?.User?.name?.toLowerCase().includes(searchQuery.toLowerCase());
            const regIdMatches = item?.User?.id?.toLowerCase().includes(searchQuery.toLowerCase());
            return nameMatches || regIdMatches;
        });
        setSearchFilteredData(filtered);
    };



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
                        dispatch(winnersListPageAllDataOfAUserForParticularExam({ gameId, que_no: i }))
                        handleSearch()
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




    // const widthAndHeight = 150;
    // const series = [`${winnersListPageAllDataOfAUserForParticularExamData?.attempted}`, `${winnersListPageAllDataOfAUserForParticularExamData?.not_attempted}`];
    // const sliceColor = ['#6A5AE0', '#A8A8A8'];

    const widthAndHeight2 = 150;
    const series2 = [`${winnersListPageAllDataOfAUserForParticularExamData?.correctPercentage}`, `${winnersListPageAllDataOfAUserForParticularExamData?.wrongPercentage}`];
    const sliceColor2 = ['#0085FF', '#A8A8A8'];

    const data = {
        labels: ['A', 'B', 'C', 'D'],
        datasets: [{
            data: [
                winnersListPageAllDataOfAUserForParticularExamData?.optionPercentages[1], // Count of users who selected option A
                winnersListPageAllDataOfAUserForParticularExamData?.optionPercentages[2], // Count of users who selected option B
                winnersListPageAllDataOfAUserForParticularExamData?.optionPercentages[3], // Count of users who selected option C
                winnersListPageAllDataOfAUserForParticularExamData?.optionPercentages[4], // Count of users who selected option D
            ],
            color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // Default color for all bars
            barColors: ['red', 'green', 'blue', 'purple']
        }]
    };

    useEffect(() => {
        dispatch(winnersListPageAllDataOfAUserForParticularExam({ gameId, que_no: selectedQueNo }))
        handleSearch()
    }, [dispatch, selectedQueNo])

    useEffect(() => {
        // Ensure winnersListPageAllDataOfAUserForParticularExamData is not null before accessing its properties
        if (winnersListPageAllDataOfAUserForParticularExamData) {
            const counts = {
                A: 0,
                B: 0,
                C: 0,
                D: 0
            };

            // Iterate through questionleaderShip array to count occurrences of each option
            winnersListPageAllDataOfAUserForParticularExamData?.questionleaderShip?.forEach(item => {
                const userAnswer = item?.UserQuestion?.answer;
                if (userAnswer) {
                    counts[String.fromCharCode(64 + userAnswer)]++; // Convert answer number to option letter (A, B, C, D)
                }
            });

            // Update chartdata state with the new counts
            setChartData(counts);
        }
    }, [winnersListPageAllDataOfAUserForParticularExamData]);

    console.log("rank", winnersListPageAllDataOfAUserForParticularExamData?.questionleaderShip[0]?.rank)
    console.log("name", winnersListPageAllDataOfAUserForParticularExamData?.questionleaderShip[0]?.name)
    console.log("regId", winnersListPageAllDataOfAUserForParticularExamData?.wrongPercentage)
    return (
        <SafeAreaView  >
            <StatusBar translucent={true} barStyle={'light-content'} backgroundColor={'#6A5AE0'} />


            <View style={{ height: responsiveHeight(7), width: responsiveWidth(100), justifyContent: 'center', backgroundColor: '#6A5AE0', paddingHorizontal: 20 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={{ justifyContent: 'center', alignSelf: 'flex-start', marginTop: 15 }}>
                        <AntDesign name="arrowleft" size={24} color="white" />
                    </TouchableOpacity>

                    <Text style={{ color: '#fff', fontSize: 20, fontWeight: '500', alignSelf: 'center', marginTop: 15, marginLeft: '26%' }}>Correct Percentage</Text>
                </View>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} >

                <ScrollView style={{ flexDirection: 'row' }} horizontal showsHorizontalScrollIndicator={false} >
                    <View style={{ flexDirection: 'row', marginTop: 15, marginHorizontal: 20 }}>

                        {renderButtons()}

                    </View>
                </ScrollView>


                <View style={{ height: responsiveHeight(32), width: responsiveWidth(90), marginBottom: 10, paddingHorizontal: 20, backgroundColor: '#fff', alignSelf: 'center', marginTop: 10, borderRadius: 8, elevation: 10 }}>
                    <Text style={{ marginTop: 20, fontSize: 17, fontWeight: '500', color: '#000' }}>Q. {winnersListPageAllDataOfAUserForParticularExamData?.question}</Text>

                    {winnersListPageAllDataOfAUserForParticularExamData?.options?.map((res, index) => {
                        return (
                            <>
                                <View key={index} style={{ marginTop: 10, flexDirection: 'row', marginRight: 20 }}>
                                    <TouchableOpacity style={{
                                        height: responsiveHeight(3.5), marginRight: 10,
                                        backgroundColor:
                                            res.id === winnersListPageAllDataOfAUserForParticularExamData?.answer
                                                ? 'green' // Real answer shown in green
                                                : winnersListPageAllDataOfAUserForParticularExamData?.UserQuestion?.answer === res.id
                                                    ? 'red' // Wrong answer given, option turns red
                                                    : select === res.id // If option is selected
                                                        ? '#0085FF' // Blueish color
                                                        : '#6A5AE0', // All other options in blueish color
                                        width: responsiveWidth(7), borderWidth: 1, borderRadius: 100, justifyContent: 'center'
                                    }}
                                        onPress={() => setSelect(0)}>
                                        <Text style={{ alignSelf: 'center', fontWeight: '600', fontSize: 18, color: select == 0 ? '#fff' : '#6A5AE0' }}>{res.id}</Text>
                                    </TouchableOpacity>

                                    <Text style={{
                                        alignSelf: 'center', fontSize: 13, color:
                                            res.id === winnersListPageAllDataOfAUserForParticularExamData?.answer
                                                ? 'green' // Real answer shown in green
                                                : winnersListPageAllDataOfAUserForParticularExamData?.UserQuestion?.answer === res.id
                                                    ? 'red' // Wrong answer given, text turns red
                                                    : '#000000' // All other text colors
                                    }}>
                                        {res?.answer}
                                    </Text>
                                </View>
                            </>
                        )
                    })

                    }

                </View>



                <View style={{ height: responsiveHeight(60), alignSelf: 'center', width: responsiveWidth(90), marginBottom: 10, backgroundColor: '#fff', alignSelf: 'center', marginTop: 10, borderRadius: 8, elevation: 10 }}>


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


                        {/* <View style={{ marginTop: 30, alignSelf: 'center' }}>
                            <PieChart
                                widthAndHeight={widthAndHeight}
                                series={series}
                                sliceColor={sliceColor}
                                coverRadius={0.45}
                                coverFill={'#FFF'}
                            />
                        </View> */}



                    </View>

                    {/* {
                        winnersListPageAllDataOfAUserForParticularExamData?.attempted <= winnersListPageAllDataOfAUserForParticularExamData?.not_attempted ? (

                            <Text style={{ fontSize: 14, position: 'absolute', color: '#fff', fontWeight: '500', top: '10%', right: '12%' }}>{((winnersListPageAllDataOfAUserForParticularExamData?.attempted) / (winnersListPageAllDataOfAUserForParticularExamData?.not_attempted + winnersListPageAllDataOfAUserForParticularExamData?.attempted) * 100).toFixed(2)}</Text>
                        ) :
                            (
                                <>
                                    <Text style={{ fontSize: 14, position: 'absolute', color: '#fff', fontWeight: '500', top: '20%', right: '4%' }}>{((winnersListPageAllDataOfAUserForParticularExamData?.attempted) / (winnersListPageAllDataOfAUserForParticularExamData?.not_attempted + winnersListPageAllDataOfAUserForParticularExamData?.attempted) * 100).toFixed(2)}</Text>
                                </>
                            )
                    } */}

                    {/* {
                        winnersListPageAllDataOfAUserForParticularExamData?.attempted <= winnersListPageAllDataOfAUserForParticularExamData?.not_attempted ? (
                            <Text style={{ fontSize: 14, position: 'absolute', top: '20%', fontWeight: '500', right: '35%', color: '#6A5AE0' }}>{((winnersListPageAllDataOfAUserForParticularExamData?.not_attempted) / (winnersListPageAllDataOfAUserForParticularExamData?.not_attempted + winnersListPageAllDataOfAUserForParticularExamData?.attempted) * 100).toFixed(2)}

                            </Text>
                        ) :
                            (
                                <>
                                    <Text style={{ fontSize: 14, position: 'absolute', top: '10%', fontWeight: '500', right: '28%', color: '#6A5AE0' }}>{((winnersListPageAllDataOfAUserForParticularExamData?.not_attempted) / (winnersListPageAllDataOfAUserForParticularExamData?.not_attempted + winnersListPageAllDataOfAUserForParticularExamData?.attempted) * 100).toFixed(2)}

                                    </Text>
                                </>
                            )
                    } */}

                    {/* aall */}


                    {
                        winnersListPageAllDataOfAUserForParticularExamData?.correctPercentage <= winnersListPageAllDataOfAUserForParticularExamData?.wrongPercentage ? (

                            <Text style={{ fontSize: 14, position: 'absolute', color: '#000', fontWeight: '500', top: '10%', right: '36%' }}>{(((winnersListPageAllDataOfAUserForParticularExamData?.correctPercentage >= 1) && winnersListPageAllDataOfAUserForParticularExamData?.correctPercentage.toFixed(1) + "%"))}</Text>
                        ) :
                            (
                                <>
                                    <Text style={{ fontSize: 14, position: 'absolute', color: '#000', fontWeight: '500', top: '20%', right: '30%' }}>{(((winnersListPageAllDataOfAUserForParticularExamData?.correctPercentage >= 1) && winnersListPageAllDataOfAUserForParticularExamData?.correctPercentage.toFixed(1) + "%"))}</Text>
                                </>
                            )
                    }

                    {
                        winnersListPageAllDataOfAUserForParticularExamData?.correctPercentage >= winnersListPageAllDataOfAUserForParticularExamData?.wrongPercentage ? (
                            <Text style={{ fontSize: 14, position: 'absolute', top: '20%', fontWeight: '500', right: '58%', color: '#000000' }}>{(((winnersListPageAllDataOfAUserForParticularExamData?.wrongPercentage >= 1) && winnersListPageAllDataOfAUserForParticularExamData?.wrongPercentage.toFixed(1) + "%"))}

                            </Text>
                        ) :
                            (
                                <>
                                    <Text style={{ fontSize: 14, position: 'absolute', top: '10%', fontWeight: '500', right: '53%', color: '#000000' }}>{(((winnersListPageAllDataOfAUserForParticularExamData?.wrongPercentage >= 1) && winnersListPageAllDataOfAUserForParticularExamData?.wrongPercentage.toFixed(1) + "%"))}

                                    </Text>
                                </>
                            )
                    }




                    <View style={{ marginTop: '5%', flexDirection: 'row', justifyContent: 'center', marginHorizontal: 50 }}>

                        <View>

                            <View style={{ flexDirection: 'row' }}>
                                <View style={{ height: responsiveHeight(1.5), width: responsiveWidth(3), backgroundColor: '#0085FF', alignSelf: 'center' }}>

                                </View>
                                <Text style={{ fontSize: 11, marginRight: 10, marginLeft: 10 }}>{winnersListPageAllDataOfAUserForParticularExamData?.correctCount} Correct</Text>
                            </View>

                            <View style={{ flexDirection: 'row' }}>
                                <View style={{ height: responsiveHeight(1.5), width: responsiveWidth(3), backgroundColor: '#A8A8A8', alignSelf: 'center' }}>

                                </View>

                                <Text style={{ fontSize: 11, marginLeft: 10 }}>{winnersListPageAllDataOfAUserForParticularExamData?.wrongCount} Incorrect</Text>
                            </View>
                        </View>

                        {/* <View>

                            <View style={{ flexDirection: 'row' }}>
                                <View style={{ height: responsiveHeight(1.5), width: responsiveWidth(3), backgroundColor: '#6A5AE0', alignSelf: 'center' }}>

                                </View>

                                <Text style={{ fontSize: 11, marginRight: 10, marginLeft: 10 }}>{winnersListPageAllDataOfAUserForParticularExamData?.attempted} Attempted</Text>
                            </View>

                            <View style={{ flexDirection: 'row' }}>
                                <View style={{ height: responsiveHeight(1.5), width: responsiveWidth(3), backgroundColor: '#A8A8A8', alignSelf: 'center' }}>

                                </View>

                                <Text style={{ fontSize: 11, marginLeft: 10 }}>{winnersListPageAllDataOfAUserForParticularExamData?.not_attempted} Not Attempted</Text>
                            </View>
                        </View> */}




                    </View>





                    <View style={{ alignSelf: 'center', marginTop: 30 }}>
                        <BarChart
                            data={data}
                            showBarTops={true}
                            width={300}
                            height={200}
                            yAxisLabel=""
                            chartConfig={{
                                backgroundColor: '#fff',
                                backgroundGradientFrom: '#A9A3E9',
                                backgroundGradientTo: '#fff',
                                decimalPlaces: 0,
                                // color: (opacity = 1) => `rgba(107, 45, 166, ${opacity})`,
                                color: (opacity = 1) => `rgba(106, 90, 224, ${opacity})`,
                                labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                                style: {
                                    borderRadius: 16,
                                },
                            }}

                            style={{
                                marginVertical: 8,
                                borderRadius: 16,
                            }}
                        />
                        <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-around", marginTop: 10 }}>
                            <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                                <Text>Option Choose:-</Text>
                            </View>
                            <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", gap: 10 }}>
                                <Text>A- {winnersListPageAllDataOfAUserForParticularExamData?.optionCount[1]}</Text>
                                <Text>B- {winnersListPageAllDataOfAUserForParticularExamData?.optionCount[2]}</Text>
                                <Text>C- {winnersListPageAllDataOfAUserForParticularExamData?.optionCount[3]}</Text>
                                <Text>D- {winnersListPageAllDataOfAUserForParticularExamData?.optionCount[4]}</Text>
                            </View>
                        </View>

                    </View>


                </View>




                <View style={{ height: responsiveHeight(6), width: responsiveWidth(90), paddingHorizontal: 20, backgroundColor: '#6A5AE0', alignSelf: 'center', marginTop: 20, borderTopLeftRadius: 8, borderTopRightRadius: 8, elevation: 10 }}>
                    <View style={{ flexDirection: 'row', marginTop: 12, justifyContent: 'space-between', marginHorizontal: 20 }}>

                        <View style={{ justifyContent: 'center' }}>
                            <Text style={{ fontSize: 18, fontWeight: '400', alignSelf: 'center', color: '#fff' }}>Leaderboard Winner</Text>
                        </View>

                        <View style={{ justifyContent: 'center', marginBottom: 5 }}>
                            <Image source={require('../images/leaderboard.png')} style={{ tintColor: '#fff', width: responsiveWidth(7), alignSelf: 'center', height: responsiveHeight(3.5) }} />
                        </View>

                    </View>
                </View>

                <View style={{ height: responsiveHeight(8.1), flexDirection: 'row', width: responsiveWidth(90), alignSelf: 'center', backgroundColor: '#6A5AE0' }}>

                    <View style={{ backgroundColor: '#fff', height: responsiveHeight(5.5), width: responsiveWidth(70), borderRadius: 10, justifyContent: 'center', marginTop: 10, flexDirection: 'row', marginHorizontal: 15 }}>

                        <View style={{ flex: 0.15, justifyContent: 'center', alignSelf: 'center' }}>
                            <Image source={require('../images/search.png')} style={{ tintColor: '#C0C0C0', height: responsiveHeight(3), width: responsiveWidth(6), marginLeft: 10 }} />
                        </View>

                        <View style={{ flex: 0.80, justifyContent: 'center', alignSelf: 'center' }}>
                            <TextInput
                                require placeholder='Search here..' placeholderTextColor={'#000'} style={{ color: '#000', marginLeft: 15, fontWeight: '400', fontSize: 17, fontFamily: 'Jaldi-Regular' }}
                                value={searchQuery}
                                onChangeText={text => setSearchQuery(text)}
                                onSubmitEditing={handleSearch}
                            />
                        </View>

                    </View>

                    {/* <View style={{ alignSelf: 'center' }}>
                        <Image source={require('../images/calender.png')} style={{ tintColor: '#fff', height: responsiveHeight(4), width: responsiveWidth(8) }} />

                    </View> */}

                </View>

                <View style={{ height: responsiveHeight(42), marginBottom: 50, width: responsiveWidth(90), elevation: 10, paddingHorizontal: 5, backgroundColor: '#fff', alignSelf: 'center', borderBottomLeftRadius: 8, borderBottomRightRadius: 8 }}>
                    <ScrollView>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', height: responsiveHeight(6), width: responsiveWidth(86), borderRadius: 2, marginTop: 5, backgroundColor: '#fff', alignSelf: 'center' }}>
                            <Text style={{ alignSelf: 'center', color: '#000', fontWeight: '500' }}>Rank</Text>
                            <Text style={{ alignSelf: 'center', color: '#000', fontWeight: '500', marginLeft: 20 }}>Name</Text>
                            <Text style={{ alignSelf: 'center', color: '#000', fontWeight: '500', marginLeft: 20 }}>Reg.ID</Text>

                            <Text style={{ alignSelf: 'center', color: '#000', fontWeight: '500' }}>Points</Text>

                        </View>

                        {

                            //  // Sort by rank
                            searchFilteredData?.filter(item => item.isCorrect === true).sort((a, b) => a?.rank - b?.rank).map((item, index) => {
                                console.log(item, "myitem");
                                return (
                                    <>
                                        <View key={index} style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10, height: responsiveHeight(6), width: responsiveWidth(86), borderRadius: 2, marginTop: 5, backgroundColor: '#EDEAFB', alignSelf: 'center' }}>
                                            <Text style={{ alignSelf: 'center', color: '#6A5AE0' }}>#{item?.rank}</Text>
                                            <Text style={{ alignSelf: 'center', color: '#000' }}>{item?.User?.name}</Text>
                                            <Text style={{ alignSelf: 'center', color: 'green' }}>{item?.User?.id}</Text>
                                            <Text style={{ alignSelf: 'center', color: '#000', fontWeight: '500' }}>{item?.mainPoints}</Text>
                                        </View>
                                    </>
                                );
                            })



                        }


                    </ScrollView>
                </View>

            </ScrollView>

        </SafeAreaView>
    )
}

export default MyQuesInPercentage