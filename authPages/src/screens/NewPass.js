import { View, Text, StatusBar, Image, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import { ScrollView } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import CheckBox from '@react-native-community/checkbox';
import { AntDesign } from '@expo/vector-icons';
import { base_url } from './Base_url'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';





const NewPass = ({ navigation }) => {
    const [hidepass, sethidepass] = useState(true);
    const [hidepass2, sethidepass2] = useState(true);

    const [password, setPassword] = useState('');
    const [confirmPass, setConfirmPass] = useState('');
    const [indicator2, setIndicator2] = useState(true)




    const newpassApi = async () => {
        try {
            setIndicator2(false)

            var myHeaders = new Headers();
            myHeaders.append("Authorization", `${await AsyncStorage.getItem('token')}`);
            // alert(`${await AsyncStorage.getItem("token")}`)

            myHeaders.append("Content-Type", "application/json");

            var raw = JSON.stringify({
                "password": password,
                "cnfpassword": confirmPass
            });

            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };

            fetch(`${base_url}/reset-password`, requestOptions)
                .then(response => response.json())
                .then(result => {
                    if (result.success == true) {
                        setIndicator2(true)
                        Toast.show({
                            type: 'success',
                            text1: `${result.message}`,
                            visibilityTime: 2000,
                            autoHide: true,
                        });

                        console.log(result.message, "if")
                        // console.log(token, "tokennnnn")
                        navigation.navigate('Login')
                    }
                    else {
                        setIndicator2(true)
                        Toast.show({
                            type: 'error',
                            text1: `${result.message}`,
                            visibilityTime: 2000,
                            autoHide: true,
                        });

                        // console.log(result.message, "else")

                    }

                })
                .catch(error => console.log('error', error));

        } catch (error) {

        } finally {
            setIndicator2(false);
        }
    }

    console.log(password, 'password');
    console.log(confirmPass, 'confirmPass');


    return (
        <SafeAreaView style={{ backgroundColor: '#fff', flex: 1 }}>
            <StatusBar translucent={true} barStyle={'light-content'} backgroundColor={'#6A5AE0'} />

            <View style={{ height: responsiveHeight(10), width: responsiveWidth(100), justifyContent: 'center', backgroundColor: '#6A5AE0', paddingHorizontal: 20 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={{ justifyContent: 'center', alignSelf: 'flex-start', marginTop: 3 }}>
                        <AntDesign name="arrowleft" size={24} color="white" />
                    </TouchableOpacity>

                    <Text style={{ color: '#fff', fontSize: 21, fontWeight: '600', alignSelf: 'center', marginLeft: '5%' }}>Create new Password</Text>
                </View>
            </View>

            <Toast password={(password) => Toast.password(password)} />
            <Toast confirmPass={(confirmPass) => Toast.confirmPass(confirmPass)} />



            <Text style={{ fontSize: 15, alignSelf: 'center', fontWeight: '400', color: '#000', marginTop: 20, marginHorizontal: 20 }}>Your new password must be diffrent from</Text>
            <Text style={{ fontSize: 15, alignSelf: 'center', fontWeight: '400', color: '#000', marginHorizontal: 20 }}>previously used passwords.</Text>

            <Text style={{ fontSize: 18, fontWeight: '500', marginTop: 30, marginHorizontal: 20 }}>Password</Text>

            <View style={{ borderWidth: 1, height: responsiveHeight(6), alignSelf: 'center', flexDirection: 'row', paddingHorizontal: 20, borderRadius: 10, justifyContent: 'space-between', borderColor: '#A0A0A0', width: responsiveWidth(90), marginTop: 5 }}>
                <TextInput require placeholder='Your Password'
                    value={password} onChangeText={(text) => { setPassword(text) }}
                    secureTextEntry={hidepass ? true : false}
                    style={{ fontWeight: '400', fontSize: 14, flex: 0.7 }} />

                <TouchableOpacity onPress={() => sethidepass(!hidepass)} style={{ alignSelf: 'center' }}>
                    <Image source={require('../images/eye.png')} style={{ alignSelf: 'center', tintColor: hidepass == true ? '#A0A0A0' : 'black', height: responsiveHeight(2), width: responsiveWidth(6) }} />
                </TouchableOpacity>
            </View>

            <Text style={{ fontSize: 15, fontWeight: '400', color: '#000', marginTop: 10, marginHorizontal: 20 }}>Must be at least 8 charactors</Text>


            <Text style={{ fontSize: 18, fontWeight: '500', marginTop: 30, marginHorizontal: 20 }}>Confirm Password</Text>

            <View style={{ borderWidth: 1, height: responsiveHeight(6), alignSelf: 'center', flexDirection: 'row', paddingHorizontal: 20, borderRadius: 10, justifyContent: 'space-between', borderColor: '#A0A0A0', width: responsiveWidth(90), marginTop: 5 }}>
                <TextInput require placeholder='Your Confirm Password'
                    value={confirmPass} onChangeText={(text) => { setConfirmPass(text) }}
                    secureTextEntry={hidepass2 ? true : false}
                    style={{ fontWeight: '400', fontSize: 14, flex: 0.7 }} />

                <TouchableOpacity onPress={() => sethidepass2(!hidepass2)} style={{ alignSelf: 'center' }}>
                    <Image source={require('../images/eye.png')} style={{ alignSelf: 'center', tintColor: hidepass2 == true ? '#A0A0A0' : 'black', height: responsiveHeight(2), width: responsiveWidth(6) }} />
                </TouchableOpacity>
            </View>

            <Text style={{ fontSize: 15, fontWeight: '400', color: '#000', marginTop: 10, marginHorizontal: 20 }}>Both password must match.</Text>


            <TouchableOpacity style={{ height: responsiveHeight(7), width: responsiveWidth(80), marginTop: '15%', backgroundColor: '#6A5AE0', borderRadius: 5, alignSelf: 'center', justifyContent: 'center' }}
                onPress={indicator2 == true ? () => newpassApi() : <>null</>} >
                {
                    indicator2 == true ? <Text style={{ fontSize: 18, color: '#fff', textAlign: 'center', fontFamily: 'Jaldi-Bold' }}>Reset Password</Text> :
                        <ActivityIndicator size={30} color={'#fff'} style={{ justifyContent: 'center' }} />

                }

            </TouchableOpacity>


        </SafeAreaView>
    )
}

export default NewPass