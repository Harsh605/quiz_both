import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native'
import React,{useState} from 'react'
import { AntDesign } from '@expo/vector-icons';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import { } from 'react-native-gesture-handler';
import Share from 'react-native-share';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { base_url } from "./Base_url";


const Help = ({ navigation }) => {
    const [refer, setRefer] = useState('')

    const shareContent = async () => {
        try {
            const options = {
                message: `${JSON.stringify(refer)}`,
                // You can specify more options, such as URL, title, type, etc.
            };

            const result = await Share.open(options);

            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    console.log(`Shared via ${result.activityType}`);
                } else {
                    console.log('Shared');
                }
            } else if (result.action === Share.dismissedAction) {
                console.log('Share dismissed');
            }
        } catch (error) {
            console.log('Error sharing:', error.message);
        }
    };

    const referApi = async () => {
        try {
            var myHeaders = new Headers();
            myHeaders.append("Authorization", `${await AsyncStorage.getItem('token')}`);
            // alert(`${await AsyncStorage.getItem('token')}`)

            var requestOptions = {
                method: 'GET',
                headers: myHeaders,
                redirect: 'follow'
            };

            fetch(`${base_url}/refer-link`, requestOptions)
                .then(response => response.json())
                .then(result => {
                    if (result.success == true) {
                        console.log(result.data)
                        setRefer(result.data)
                    }
                })
                .catch(error => console.log('error', error));

        } catch (error) {
            console.log(error, "uuuu");
        }
    }


    return (
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
            <View style={{ height: responsiveHeight(13), width: responsiveWidth(100), justifyContent: 'center', backgroundColor: '#6A5AE0', paddingHorizontal: 20 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={{ justifyContent: 'center', alignSelf: 'flex-start', marginTop: 30 }}>
                        <AntDesign name="arrowleft" size={24} color="white" />
                    </TouchableOpacity>

                    <Text style={{ color: '#fff', fontSize: 18, fontWeight: '500', alignSelf: 'center', marginTop: 30, marginLeft: '5%' }}>Help</Text>
                </View>
            </View>

            <View style={{ height: responsiveHeight(26), width: responsiveWidth(90), backgroundColor: '#6A5AE0', marginTop: '10%', alignSelf: 'center', borderRadius: 10 }}>
                <Text style={{ color: '#fff', fontWeight: '500', marginHorizontal: 20, marginTop: '3%', fontSize: 18 }}>Help & Support</Text>
                <Text style={{ color: '#fff', fontWeight: '400', marginHorizontal: 20, marginTop: '1%', fontSize: 13 }}>If you like QuizApp, let your friend know!</Text>
                <Text style={{ color: '#fff', fontWeight: '400', marginHorizontal: 20, marginTop: '1%', fontSize: 13 }}>Quizapp helps you in managing expenses and</Text>
                <Text style={{ color: '#fff', fontWeight: '400', marginHorizontal: 20, fontSize: 13 }}>wealth to achieve future financial goals.</Text>
                <Text style={{ color: '#fff', fontWeight: '400', marginHorizontal: 20, fontSize: 13 }}>Refer your friend to join QUIzapp community</Text>

                <View style={{ borderBottomWidth: 0.5, borderColor: '#fff', marginTop: 10 }}></View>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 40, marginTop: 10 }}>
                    <TouchableOpacity  onPress={() => { referApi(),shareContent() }}>
                        <Image source={require('../images/msg.png')} style={{ height: responsiveHeight(4), width: responsiveWidth(8), alignSelf: 'center' }} />
                        <Text style={{ color: '#fff', fontSize: 13 }}>Message</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => { referApi(),shareContent() }}>
                        <Image source={require('../images/watsapp.png')} style={{ backgroundColor: '#fff', height: responsiveHeight(4), width: responsiveWidth(8), alignSelf: 'center', borderRadius: 20 }} />
                        <Text style={{ color: '#fff', fontSize: 13 }}>WhatsApp</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => { referApi(),shareContent() }}>
                        <Image source={require('../images/fb.png')} style={{ backgroundColor: '#fff', borderRadius: 20, height: responsiveHeight(4), width: responsiveWidth(8), alignSelf: 'center' }} />
                        <Text style={{ color: '#fff', fontSize: 13 }}>facebook</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => { referApi(),shareContent() }}>
                        <Image source={require('../images/google.png')} style={{ height: responsiveHeight(4.5), width: responsiveWidth(9), marginTop: -3, alignSelf: 'center' }} />
                        <Text style={{ color: '#fff', fontSize: 13 }}>Google</Text>
                    </TouchableOpacity>


                </View>

            </View>
        </View>
    )
}

export default Help