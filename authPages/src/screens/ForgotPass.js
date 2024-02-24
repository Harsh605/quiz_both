import { View, Text, StatusBar, Image, TextInput, TouchableOpacity,ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import { ScrollView } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import CheckBox from '@react-native-community/checkbox';
import { AntDesign } from '@expo/vector-icons';
import { base_url } from './Base_url'
import Toast from 'react-native-toast-message';




const ForgotPass = ({ navigation }) => {
    const [hidepass, sethidepass] = useState(true);

    const [email, setEmail] = useState('')
    const [indicator2, setIndicator2] = useState(true)



    const forgotApi = () => {
        try {
            setIndicator2(false)

            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            var raw = JSON.stringify({
                "email": email
            });

            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };

            fetch(`${base_url}/forgot-password`, requestOptions)
                .then(response => response.json())
                .then(result => {
                    if (result.success == true) {
                        console.log(result)
                        setIndicator2(true)
                        navigation.navigate('NewPass')
                        Toast.show({
                            type: 'success',
                            text1: `${result.message}`,
                            visibilityTime: 2000,
                            autoHide: true,
                        });

                    } else {
                        Toast.show({
                            type: 'error',
                            text1: `${result.message}`,
                            visibilityTime: 2000,
                            autoHide: true,
                        });
                        setIndicator2(true)

                    }
                })
                .catch(error => console.log('error', error));
        } catch (error) {

        } finally {
            setIndicator2(false);
        }
    };

    console.log(email);


    return (
        <SafeAreaView style={{ backgroundColor: '#fff', flex: 1 }}>
            <StatusBar translucent={true} barStyle={'light-content'} backgroundColor={'#6A5AE0'} />

            <View style={{ height: responsiveHeight(10), width: responsiveWidth(100), justifyContent: 'center', backgroundColor: '#6A5AE0', paddingHorizontal: 20 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={{ justifyContent: 'center', alignSelf: 'flex-start', marginTop: 3 }}>
                        <AntDesign name="arrowleft" size={24} color="white" />
                    </TouchableOpacity>

                    <Text style={{ color: '#fff', fontSize: 21, fontWeight: '600', alignSelf: 'center', marginLeft: '5%' }}>Forgot Password</Text>
                </View>
            </View>

            <Toast email={(email) => Toast.email(email)} />


            <Text style={{ fontSize: 15, alignSelf: 'center', fontWeight: '400', color: '#000', marginTop: 20, marginHorizontal: 20 }}>Enter the email associated with your account,</Text>
            <Text style={{ fontSize: 15, alignSelf: 'center', fontWeight: '400', color: '#000', marginHorizontal: 20 }}>and we'll send an email with a recovery link and</Text>
            <Text style={{ fontSize: 15, alignSelf: 'center', fontWeight: '400', color: '#000', marginHorizontal: 20 }}>instructions to reset your password.</Text>



            <Text style={{ fontSize: 18, fontWeight: '500', color: '#000', marginTop: 35, marginHorizontal: 20 }}>Email Address</Text>

            <View style={{ borderWidth: 1, height: responsiveHeight(6), alignSelf: 'center', borderRadius: 5, borderColor: '#A0A0A0', width: responsiveWidth(90), marginTop: 10 }}>
                <TextInput require placeholder='Your Email Address' value={email} onChangeText={(text) => { setEmail(text) }} style={{ marginLeft: 15, fontWeight: '400', fontSize: 14, marginTop: 8 }} />
            </View>

            <TouchableOpacity style={{ height: responsiveHeight(7), width: responsiveWidth(80), marginTop: '15%', backgroundColor: '#6A5AE0', borderRadius: 5, alignSelf: 'center', justifyContent: 'center' }}
                onPress={indicator2 == true ? () => forgotApi() : <>null</>} >
                {
                    indicator2 == true ? <Text style={{ fontSize: 18, color: '#fff', textAlign: 'center', fontFamily: 'Jaldi-Bold' }}>Send</Text> :
                        <ActivityIndicator size={30} color={'#fff'} style={{ justifyContent: 'center' }} />

                }

            </TouchableOpacity>


        </SafeAreaView>
    )
}

export default ForgotPass