import { View, Text, StatusBar, Image, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import { ScrollView } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import CheckBox from '@react-native-community/checkbox';
import { base_url } from './Base_url'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';



const Login = ({ navigation }) => {
    const [isChecked, setChecked] = useState(false);
    const [hidepass, sethidepass] = useState(true);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')

    const [mydata, setMydata] = useState(true)
    const [indicator2, setIndicator2] = useState(true)



    const handleCheckBoxChange = () => {
        setChecked(!isChecked);
    };


    const loginApi = () => {
        try {
            setIndicator2(false)

            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            var raw = JSON.stringify({
                "email": email,
                "password": password
            });

            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };

            fetch(`${base_url}/log-in`, requestOptions)
                .then(response => response.json())
                .then(async (result) => {
                    if (result.success == true) {
                        setIndicator2(true)
                        // console.log(result.message,"gggggggggggggggggggggggggggggg")
                        if (isChecked == true) {
                            // alert(isChecked)
                            Toast.show({
                                type: 'success',
                                text1: `${result.message}`,
                                visibilityTime: 2000,
                                autoHide: true,
                            });
                            navigation.navigate('Home')
                            console.log(result.data.user.jwt, "tokentoken")
                            await AsyncStorage.setItem('token', result.data.user.jwt)

                        }

                    }
                    else {
                        Toast.show({
                            type: 'error',
                            text1: `${result.message}`,
                            visibilityTime: 2000,
                            autoHide: true,
                        });
                        setIndicator2(true)
                        console.log(result.message);
                    }

                })
                .catch(error => console.log('error', error));

        } catch (error) {
            console.log(error);
        }
        finally {
            setIndicator2(false);

        }
    }


    // console.log(password,"password");


    return (
        <SafeAreaView style={{ backgroundColor: '#fff', flex: 1 }}>
            <StatusBar translucent={true} barStyle={'light-content'} backgroundColor={'#6A5AE0'} />

            <View style={{ height: responsiveHeight(15), justifyContent: 'center', width: responsiveWidth(100), backgroundColor: '#6A5AE0' }}>
                <Text style={{ alignSelf: 'center', color: '#fff', fontWeight: '500', marginBottom: 10, fontSize: 22 }}>Welcome to Podwin</Text>
                <Text style={{ alignSelf: 'center', color: '#fff', fontWeight: '400', fontSize: 14 }}>Login to continue</Text>

            </View>
            <Toast email={(email) => Toast.email(email)} />
            <Toast password={(password) => Toast.password(password)} />



            <Text style={{ fontSize: 18, fontWeight: '500', marginTop: 30, marginHorizontal: 20 }}>Email</Text>

            <View style={{ borderWidth: 1, height: responsiveHeight(6), alignSelf: 'center', borderRadius: 10, borderColor: '#A0A0A0', width: responsiveWidth(90), marginTop: 5 }}>
                <TextInput require placeholder='Your Email' value={email} onChangeText={(text) => { setEmail(text) }} style={{ marginLeft: 15, fontWeight: '400', fontSize: 14, marginTop: 8 }} />
            </View>

            <Text style={{ fontSize: 18, fontWeight: '500', marginTop: 20, marginHorizontal: 20 }}>Password</Text>

            <View style={{ borderWidth: 1, height: responsiveHeight(6), alignSelf: 'center', flexDirection: 'row', paddingHorizontal: 20, borderRadius: 10, justifyContent: 'space-between', borderColor: '#A0A0A0', width: responsiveWidth(90), marginTop: 5 }}>
                <TextInput require placeholder='Your Password'
                    value={password} onChangeText={(text) => { setPassword(text) }}
                    secureTextEntry={hidepass ? true : false}
                    style={{ fontWeight: '400', fontSize: 14 }} />

                <TouchableOpacity onPress={() => sethidepass(!hidepass)} style={{ alignSelf: 'center' }}>
                    <Image source={require('../images/eye.png')} style={{ alignSelf: 'center', tintColor: hidepass == true ? '#A0A0A0' : 'black', height: responsiveHeight(2), width: responsiveWidth(6) }} />
                </TouchableOpacity>
            </View>

            <TouchableOpacity style={{ alignSelf:'flex-end',marginHorizontal:20 }} onPress={() => { navigation.navigate('ForgotPass') }}>
                    <Text style={{ alignSelf: 'center',marginTop:'3%', color: 'blue', borderBottomWidth: 1, borderColor: 'blue' }}>Forgot password?</Text>
                </TouchableOpacity>

            <View style={{ marginHorizontal: 20, marginTop: 10, flexDirection: 'row', justifyContent: 'flex-start' }}>
                <CheckBox value={isChecked}
                    onValueChange={handleCheckBoxChange}
                />

                <Text style={{ alignSelf: 'center', color: '#A0A0A0' }}>I agree with </Text>

                <TouchableOpacity style={{ alignSelf: 'center' }} onPress={() => navigation.navigate("TermCondition")}>
                    <Text style={{ alignSelf: 'center', color: 'blue', fontWeight: '500' }}>Term & Conditions</Text>
                </TouchableOpacity>

                
            </View>

            

            <TouchableOpacity style={{ height: responsiveHeight(7), width: responsiveWidth(90), marginTop: '15%', backgroundColor: '#6A5AE0', borderRadius: 15, alignSelf: 'center', justifyContent: 'center' }}
                onPress={indicator2 == true ? () => loginApi() : <>null</>} >
                {
                    indicator2 == true ? <Text style={{ fontSize: 18, color: '#fff', textAlign: 'center', fontFamily: 'Jaldi-Bold' }}>Login</Text> :
                        <ActivityIndicator size={30} color={'#fff'} style={{ justifyContent: 'center' }} />

                }

            </TouchableOpacity>


            <View style={{ marginHorizontal: 20, marginTop: '10%', flexDirection: 'row', alignSelf: 'center' }}>

                <Text style={{ alignSelf: 'center' }}>Don't have an account?</Text>

                <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                    <Text style={{ alignSelf: 'center', color: 'blue', borderBottomWidth: 1, borderColor: 'blue', fontSize: 18 }}> Register now</Text>
                </TouchableOpacity>
            </View>





        </SafeAreaView>
    )
}

export default Login