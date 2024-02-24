import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native'
import React from 'react'
import { AntDesign } from '@expo/vector-icons';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import { } from 'react-native-gesture-handler';

const HowtoPlay = ({ navigation }) => {
    return (
        <View style={{ flex: 1, backgroundColor: '#fff' }}>

            <View style={{ height: responsiveHeight(13), width: responsiveWidth(100), justifyContent: 'center', backgroundColor: '#6A5AE0', paddingHorizontal: 20 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={{ justifyContent: 'center', alignSelf: 'flex-start', marginTop: 30 }}>
                        <AntDesign name="arrowleft" size={24} color="white" />
                    </TouchableOpacity>

                    <Text style={{ color: '#fff', fontSize: 18, fontWeight: '500', alignSelf: 'center', marginTop: 30, marginLeft: '5%' }}>How to Play</Text>
                </View>
            </View>

            <View>

                <View style={{ borderWidth: 1, height: responsiveHeight(30), width: responsiveWidth(100), alignSelf: 'center' }}>
                    <Image source={require('../images/inst.png')} style={{ borderWidth: 1, height: responsiveHeight(28), borderRadius: 10, marginTop: 15, width: responsiveWidth(90), alignSelf: 'center' }} />
                </View>

                <View style={{ marginHorizontal: 20, marginTop: 10, flexDirection: 'row' }}>
                    <Text style={{ marginRight: 5 }}>👉</Text>
                    <Text>प्रत्येक Question पर maximum 9.5 point बनाने हैं जो कि Answer के option A/B/C/D, सही/गलत, currect % और Time के point से मिलकर बनते हैं।</Text>
                </View>

                <View style={{ marginHorizontal: 20, marginTop: 10, flexDirection: 'row' }}>
                    <Text style={{ marginRight: 5 }}>👉</Text>
                    <Text>सही option select करने पर 5.5 point और गलत option select करने पर 3.3 point मिलते हैं।</Text>
                </View>

                <View style={{ marginHorizontal: 20, marginTop: 10, flexDirection: 'row' }}>
                    <Text style={{ marginRight: 5 }}>👉</Text>
                    <Text>currect %, question level और concept modification को बताता है 0,1,2,3,4,5,6,7,8,9 में से आप उचित अंक select करें।</Text>
                </View>

                <View style={{ marginHorizontal: 20, marginTop: 10, flexDirection: 'row' }}>
                    <Text style={{ marginRight: 5 }}>👉</Text>
                    <Text>प्रत्येक question के लिए 20 Second दिया गया है।</Text>
                </View>

                <View style={{ marginHorizontal: 20, marginTop: 10, flexDirection: 'row' }}>
                    <Text style={{ marginRight: 5 }}>👉</Text>
                    <Text>सही / ग़लत के point और currect % के D.S point मे Time के point जोड़ने के लिए निश्चित second आने पर save बटन click करे ।</Text>
                </View>

                <View style={{ marginHorizontal: 20, marginTop: 10, flexDirection: 'row' }}>
                    <Text style={{ marginRight: 5 }}>👉</Text>
                    <Text>Question का निश्चित समय समाप्त होने पर आपको 5 second का समय leaderbord में rank, answer and other users की data देखने के लिए मिलेंगा उसके बाद Next question आयेगा।</Text>
                </View>

                <View style={{ marginHorizontal: 20, marginTop: 10, flexDirection: 'row' }}>
                    <Text style={{ marginRight: 5 }}>👉</Text>
                    <Text>Test समाप्त होने पर रैंक के अनुसार scholarship आपके wallet में Transfer कर दी जायेगी।</Text>
                </View>

                <View style={{ marginHorizontal: 20, marginTop: 10, flexDirection: 'row' }}>
                    <Text style={{ marginRight: 5 }}>👉</Text>
                    <Text>Screen पर आपको Timer में Time second में चलता हुआ Show होगा।</Text>
                </View>

            </View>

        </View>
    )
}

export default HowtoPlay