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



const Analysis = ({ navigation }) => {

    const widthAndHeight = 150;
    const series = [123, 321, 123, 789, 537];
    const sliceColor = ['#6A5AE0', '#ffb300', '#ff9100', '#ff6c00', '#ff3c00'];

    const data = {
        labels: ['A', 'B', 'C', 'D'],
        datasets: [
            {
                data: [28, 45, 15, 35],
            },
        ],
    };

   

    return (
        <SafeAreaView>
            <StatusBar translucent={true} barStyle={'light-content'} backgroundColor={'#6A5AE0'} />

            <View style={{ height: responsiveHeight(7), width: responsiveWidth(100), justifyContent: 'center', backgroundColor: '#6A5AE0', paddingHorizontal: 20 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={{ justifyContent: 'center', alignSelf: 'flex-start', marginTop: 15 }}>
                        <AntDesign name="arrowleft" size={24} color="white" />
                    </TouchableOpacity>

                    <Text style={{ color: '#fff', fontSize: 20, fontWeight: '500', alignSelf: 'center', marginTop: 15, marginLeft: '30%' }}>Analysis</Text>
                </View>
            </View>

            <View style={{ height: responsiveHeight(40), flexDirection: 'row', justifyContent: 'space-between', alignSelf: 'center', paddingHorizontal: 10, width: responsiveWidth(90), marginBottom: 10, backgroundColor: '#fff', alignSelf: 'center', marginTop: 10, borderRadius: 8, elevation: 10 }}>

            <View style={{ alignSelf: 'center', marginTop: 30 }}>
                        <BarChart
                            data={data}
                            width={300}
                            height={200}
                            color={'red'}
                            yAxisLabel=""
                            chartConfig={{
                                backgroundColor: '#fff',
                                backgroundGradientFrom: '#fff',
                                backgroundGradientTo: '#fff',
                                decimalPlaces: 0,
                                color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
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
                    </View>

            </View>


            <View style={{ height: responsiveHeight(46), alignSelf: 'center', justifyContent: 'center', width: responsiveWidth(90), marginBottom: 10, backgroundColor: '#fff', alignSelf: 'center', marginTop: 10, borderRadius: 8, elevation: 10 }}>
                <View style={{ height: responsiveHeight(6), justifyContent: 'center', width: responsiveWidth(85), borderWidth: 1, borderRadius: 10, alignSelf: 'center' }}>
                    <Text style={{ alignSelf: 'center', fontSize: 16, color: '#6A5AE0', fontWeight: '500' }}>Row Point Table</Text>
                </View>


                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 11, marginTop: 10 }}>
                    <View style={{ height: responsiveHeight(5), flexDirection: 'row', backgroundColor: '#EDEAFB', justifyContent: 'center', width: responsiveWidth(19), borderWidth: 1, borderRadius: 5, alignSelf: 'center' }}>
                        <Text style={{ alignSelf: 'center', fontSize: 16, color: '#6A5AE0' }}>M</Text>
                    </View>
                    <View style={{ height: responsiveHeight(5), flexDirection: 'row', justifyContent: 'center', backgroundColor: '#EDEAFB', width: responsiveWidth(19), borderWidth: 1, borderRadius: 5, alignSelf: 'center' }}>
                        <Text style={{ alignSelf: 'center', fontSize: 16, color: '#6A5AE0' }}>C</Text>
                    </View>
                    <View style={{ height: responsiveHeight(5), flexDirection: 'row', justifyContent: 'center', backgroundColor: '#EDEAFB', width: responsiveWidth(19), borderWidth: 1, borderRadius: 5, alignSelf: 'center' }}>
                        <Text style={{ alignSelf: 'center', fontSize: 16, color: '#6A5AE0' }}>T</Text>
                    </View>
                    <View style={{ height: responsiveHeight(5), flexDirection: 'row', justifyContent: 'center', backgroundColor: '#fff', width: responsiveWidth(19), borderWidth: 1, borderRadius: 5, alignSelf: 'center' }}>
                        <Text style={{ alignSelf: 'center', fontSize: 16, color: 'green' }}>Total</Text>
                    </View>
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10, marginHorizontal: 11 }}>
                    <View style={{ height: responsiveHeight(5), flexDirection: 'row', justifyContent: 'center', backgroundColor: '#EDEAFB', width: responsiveWidth(19), borderWidth: 1, borderRadius: 5, alignSelf: 'center' }}>
                        <Text style={{ alignSelf: 'center', fontSize: 16, color: '#6A5AE0' }}>2.5</Text>
                    </View>
                    <View style={{ height: responsiveHeight(5), flexDirection: 'row', justifyContent: 'center', backgroundColor: '#EDEAFB', width: responsiveWidth(19), borderWidth: 1, borderRadius: 5, alignSelf: 'center' }}>
                        <Text style={{ alignSelf: 'center', fontSize: 16, color: '#6A5AE0' }}>6</Text>
                    </View>
                    <View style={{ height: responsiveHeight(5), flexDirection: 'row', justifyContent: 'center', backgroundColor: '#EDEAFB', width: responsiveWidth(19), borderWidth: 1, borderRadius: 5, alignSelf: 'center' }}>
                        <Text style={{ alignSelf: 'center', fontSize: 16, color: '#6A5AE0' }}>7</Text>
                    </View>
                    <View style={{ height: responsiveHeight(5), flexDirection: 'row', justifyContent: 'center', backgroundColor: '#fff', width: responsiveWidth(19), borderWidth: 1, borderRadius: 5, alignSelf: 'center' }}>
                        <Text style={{ alignSelf: 'center', fontSize: 16, color: 'green' }}>9.5</Text>
                    </View>
                </View>

                <View style={{ height: responsiveHeight(6), justifyContent: 'center', width: responsiveWidth(85), borderWidth: 1, marginTop: 20, borderRadius: 10, alignSelf: 'center' }}>
                    <Text style={{ alignSelf: 'center', fontSize: 16, color: '#6A5AE0', fontWeight: '500' }}>Main Point Table</Text>
                </View>


                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 11, marginTop: 10 }}>
                    <View style={{ height: responsiveHeight(5), flexDirection: 'row', backgroundColor: '#EDEAFB', justifyContent: 'center', width: responsiveWidth(19), borderWidth: 1, borderRadius: 5, alignSelf: 'center' }}>
                        <Text style={{ alignSelf: 'center', fontSize: 16, color: '#000' }}>M</Text>
                    </View>
                    <View style={{ height: responsiveHeight(5), flexDirection: 'row', justifyContent: 'center', backgroundColor: '#EDEAFB', width: responsiveWidth(19), borderWidth: 1, borderRadius: 5, alignSelf: 'center' }}>
                        <Text style={{ alignSelf: 'center', fontSize: 16, color: '#000' }}>C</Text>
                    </View>
                    <View style={{ height: responsiveHeight(5), flexDirection: 'row', justifyContent: 'center', backgroundColor: '#EDEAFB', width: responsiveWidth(19), borderWidth: 1, borderRadius: 5, alignSelf: 'center' }}>
                        <Text style={{ alignSelf: 'center', fontSize: 16, color: '#000' }}>T</Text>
                    </View>
                    <View style={{ height: responsiveHeight(5), flexDirection: 'row', justifyContent: 'center', backgroundColor: '#fff', width: responsiveWidth(19), borderWidth: 1, borderRadius: 5, alignSelf: 'center' }}>
                        <Text style={{ alignSelf: 'center', fontSize: 16, color: 'green' }}>Total</Text>
                    </View>
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10, marginHorizontal: 11 }}>
                    <View style={{ height: responsiveHeight(5), flexDirection: 'row', justifyContent: 'center', backgroundColor: '#EDEAFB', width: responsiveWidth(19), borderWidth: 1, borderRadius: 5, alignSelf: 'center' }}>
                        <Text style={{ alignSelf: 'center', fontSize: 16, color: '#000' }}>2.5</Text>
                    </View>
                    <View style={{ height: responsiveHeight(5), flexDirection: 'row', justifyContent: 'center', backgroundColor: '#EDEAFB', width: responsiveWidth(19), borderWidth: 1, borderRadius: 5, alignSelf: 'center' }}>
                        <Text style={{ alignSelf: 'center', fontSize: 16, color: '#000' }}>6</Text>
                    </View>
                    <View style={{ height: responsiveHeight(5), flexDirection: 'row', justifyContent: 'center', backgroundColor: '#EDEAFB', width: responsiveWidth(19), borderWidth: 1, borderRadius: 5, alignSelf: 'center' }}>
                        <Text style={{ alignSelf: 'center', fontSize: 16, color: '#000' }}>7</Text>
                    </View>
                    <View style={{ height: responsiveHeight(5), flexDirection: 'row', justifyContent: 'center', backgroundColor: '#fff', width: responsiveWidth(19), borderWidth: 1, borderRadius: 5, alignSelf: 'center' }}>
                        <Text style={{ alignSelf: 'center', fontSize: 16, color: 'green' }}>9.5</Text>
                    </View>
                </View>

            </View>




        </SafeAreaView>
    )
}

export default Analysis