import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native'
import React from 'react'
import { AntDesign } from '@expo/vector-icons';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import { } from 'react-native-gesture-handler';

const More = ({ navigation }) => {
    return (
        <View style={{ flex: 1, backgroundColor: '#fff' }}>

            <View style={{ height: responsiveHeight(13), width: responsiveWidth(100), justifyContent: 'center', backgroundColor: '#6A5AE0', paddingHorizontal: 20 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={{ justifyContent: 'center', alignSelf: 'flex-start', marginTop: 30 }}>
                        <AntDesign name="arrowleft" size={24} color="white" />
                    </TouchableOpacity>

                    <Text style={{ color: '#fff', fontSize: 18, fontWeight: '500', alignSelf: 'center', marginTop: 30, marginLeft: '5%' }}>More</Text>
                </View>
            </View>

            <TouchableOpacity style={{ height: responsiveHeight(6),marginTop:20, width: responsiveWidth(100), justifyContent: 'center', backgroundColor: '#6A5AE0', paddingHorizontal: 20 }}
            onPress={()=>navigation.navigate('AboutUs')}>
                <View style={{flexDirection:'row',justifyContent:'flex-start'}}>
                    <Image source={require('../images/about.png')} style={{height:responsiveHeight(3),marginRight:15,width:responsiveWidth(6),tintColor:'#fff'}} />
                <Text style={{ color: '#fff', fontSize: 16, fontWeight: '500', alignSelf: 'center'}}>About Us</Text>
                </View>
            </TouchableOpacity>

            <TouchableOpacity style={{ height: responsiveHeight(6),marginTop:20, width: responsiveWidth(100), justifyContent: 'center', backgroundColor: '#6A5AE0', paddingHorizontal: 20 }}
           onPress={()=>navigation.navigate('Policy')}>
                <View style={{flexDirection:'row',justifyContent:'flex-start'}}>
                    <Image source={require('../images/about.png')} style={{height:responsiveHeight(3),marginRight:15,width:responsiveWidth(6),tintColor:'#fff'}} />
                <Text style={{ color: '#fff', fontSize: 16, fontWeight: '500', alignSelf: 'center'}}>Privacy Policy</Text>
                </View>
            </TouchableOpacity>

            <TouchableOpacity style={{ height: responsiveHeight(6),marginTop:20, width: responsiveWidth(100), justifyContent: 'center', backgroundColor: '#6A5AE0', paddingHorizontal: 20 }}
            onPress={()=>navigation.navigate('TermCondition')}>
                <View style={{flexDirection:'row',justifyContent:'flex-start'}}>
                    <Image source={require('../images/about.png')} style={{height:responsiveHeight(3),marginRight:15,width:responsiveWidth(6),tintColor:'#fff'}} />
                <Text style={{ color: '#fff', fontSize: 16, fontWeight: '500', alignSelf: 'center'}}>Term & Conditions</Text>
                </View>
            </TouchableOpacity>

            <TouchableOpacity style={{ height: responsiveHeight(6),marginTop:20, width: responsiveWidth(100), justifyContent: 'center', backgroundColor: '#6A5AE0', paddingHorizontal: 20 }}
            onPress={()=>navigation.navigate('Refund')}>
                <View style={{flexDirection:'row',justifyContent:'flex-start'}}>
                    <Image source={require('../images/about.png')} style={{height:responsiveHeight(3),marginRight:15,width:responsiveWidth(6),tintColor:'#fff'}} />
                <Text style={{ color: '#fff', fontSize: 16, fontWeight: '500', alignSelf: 'center'}}>Refund and Cancellation Policy</Text>
                </View>
            </TouchableOpacity>

            {/* <TouchableOpacity style={{ height: responsiveHeight(6),marginTop:10, width: responsiveWidth(100), justifyContent: 'center', backgroundColor: '#6A5AE0', paddingHorizontal: 20 }}
            onPress={()=>navigation.navigate('Feedback')}>
                <View style={{flexDirection:'row',justifyContent:'flex-start'}}>
                    <Image source={require('../images/about.png')} style={{height:responsiveHeight(3),marginRight:15,width:responsiveWidth(6),tintColor:'#fff'}} />
                <Text style={{ color: '#fff', fontSize: 16, fontWeight: '500', alignSelf: 'center'}}>Feedback</Text>
                </View>
            </TouchableOpacity> */}


        </View>
    )
}

export default More