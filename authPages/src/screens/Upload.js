import { View, Text, TouchableOpacity, TextInput, Image, ScrollView } from 'react-native'
import React from 'react'
import { AntDesign } from '@expo/vector-icons';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import { } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';

const Upload = ({ navigation }) => {
    return (
        <SafeAreaView>
            <ScrollView style={{ height: responsiveHeight(90) }}>
                <View style={{ height: responsiveHeight(8), width: responsiveWidth(100), justifyContent: 'center', backgroundColor: '#6A5AE0', paddingHorizontal: 20 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
                        <TouchableOpacity onPress={() => navigation.goBack()} style={{ justifyContent: 'center', alignSelf: 'flex-start' }}>
                            <AntDesign name="arrowleft" size={24} color="white" />
                        </TouchableOpacity>

                        <Text style={{ color: '#fff', fontSize: 18, fontWeight: '500', alignSelf: 'center', marginLeft: '5%' }}>Upload Kyc</Text>
                    </View>
                </View>

                <Text style={{ marginHorizontal: 20, marginTop: 20, fontWeight: '600', fontSize: 18 }}>Setup User Account</Text>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 20 }}>
                    <Text style={{ marginTop: 10, fontWeight: '500', fontSize: 18 }}>ADDRESS</Text>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 20 }}>
                        <Text style={{ marginTop: 10, fontWeight: '500', fontSize: 18 }}>Step : </Text>
                        <Text style={{ marginTop: 10, fontWeight: '500', fontSize: 18, alignSelf: 'center', color: '#448EE4' }}>2/3</Text>

                    </View>
                </View>

                <Text style={{ marginHorizontal: 20, marginTop: 20, fontWeight: '500', fontSize: 14 }}>Upload front and back of the chosen</Text>
                <Text style={{ marginHorizontal: 20, fontWeight: '500', fontSize: 14 }}>document showingyour address</Text>


                <Text style={{ fontSize: 14, fontWeight: '500', marginTop: 30, marginHorizontal: 20 }}>Aadhaar Card Front</Text>

                <View style={{ borderWidth: 1, height: responsiveHeight(6), alignSelf: 'center', borderRadius: 10, borderColor: '#A0A0A0', width: responsiveWidth(90), marginTop: 5 }}>
                    <TextInput require placeholder='Upload Front Image' style={{ marginLeft: 15, fontWeight: '400', fontSize: 14, marginTop: 8 }} />
                </View>

                <Text style={{ fontSize: 14, fontWeight: '500', marginTop: 30, marginHorizontal: 20 }}>Aadhaar Card Back</Text>

                <View style={{ borderWidth: 1, height: responsiveHeight(6), alignSelf: 'center', borderRadius: 10, borderColor: '#A0A0A0', width: responsiveWidth(90), marginTop: 5 }}>
                    <TextInput require placeholder='Upload Back Image' style={{ marginLeft: 15, fontWeight: '400', fontSize: 14, marginTop: 8 }} />
                </View>

                <Text style={{ fontSize: 14, fontWeight: '500', marginTop: 30, marginHorizontal: 20 }}>Pan Card Front</Text>

                <View style={{ borderWidth: 1, height: responsiveHeight(6), alignSelf: 'center', borderRadius: 10, borderColor: '#A0A0A0', width: responsiveWidth(90), marginTop: 5 }}>
                    <TextInput require placeholder='Upload Front Image' style={{ marginLeft: 15, fontWeight: '400', fontSize: 14, marginTop: 8 }} />
                </View>

                <Text style={{ fontSize: 14, fontWeight: '500', marginTop: 30, marginHorizontal: 20 }}>Pan Card Back</Text>

                <View style={{ borderWidth: 1, height: responsiveHeight(6), alignSelf: 'center', borderRadius: 10, borderColor: '#A0A0A0', width: responsiveWidth(90), marginTop: 5 }}>
                    <TextInput require placeholder='Upload Back Image' style={{ marginLeft: 15, fontWeight: '400', fontSize: 14, marginTop: 8 }} />
                </View>

                <Text style={{ fontSize: 14, fontWeight: '400', marginTop: 20, marginHorizontal: 20 }}>Disclaimer:</Text>
                <Text style={{ fontSize: 12, fontWeight: '400', marginHorizontal: 20 }}>Aadhaar number at any stage will not get stored into Quizapp</Text>
                <Text style={{ fontSize: 12, fontWeight: '400', marginHorizontal: 20 }}>systems or any records with our partners. You'll be asked</Text>
                <Text style={{ fontSize: 12, fontWeight: '400', marginHorizontal: 20 }}>to input OTP shared by UIDAI when an Aadhar eSign /</Text>
                <Text style={{ fontSize: 12, fontWeight: '400', marginHorizontal: 20 }}>Verification in initiated</Text>





            </ScrollView>

            <TouchableOpacity style={{ height: responsiveHeight(6), justifyContent: 'center', alignSelf: 'center', borderRadius: 5, width: responsiveWidth(90), marginTop: 20, backgroundColor: '#6A5AE0' }}
                >
                <Text style={{ color: '#fff', fontWeight: '500', alignSelf: 'center', fontSize: 16 }}>Submit</Text>
            </TouchableOpacity>


        </SafeAreaView>
    )
}

export default Upload