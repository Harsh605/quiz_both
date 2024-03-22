import { View, Text, StatusBar, Image, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import { ScrollView } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import CheckBox from '@react-native-community/checkbox';
import { AntDesign } from '@expo/vector-icons';
import { base_url } from './Base_url'
import Modal from "react-native-modal";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';




const Register = ({ navigation }) => {
    const [isChecked, setChecked] = useState(false);
    const [hidepass, sethidepass] = useState(true);
    const [hidepass2, sethidepass2] = useState(true);
    const [tkn, setTkn] = useState(true);
    const [otp, setOtp] = useState(true);

    const [indicator2, setIndicator2] = useState(true)
    const [indicator3, setIndicator3] = useState(true)





    const [modalVisible1, setModalVisible1] = useState(false);
    const openModal1 = () => setModalVisible1(true);
    const closeModal1 = () => setModalVisible1(false);

    const et1 = useRef();
    const et2 = useRef();
    const et3 = useRef();
    const et4 = useRef();

    const [f1, setF1] = useState();
    const [f2, setF2] = useState();
    const [f3, setF3] = useState();
    const [f4, setF4] = useState();


    const [email, setEmail] = useState('');
    const [name, setName] = useState('')
    const [mobile, setMobile] = useState('')
    const [password, setPassword] = useState('')
    const [coPass, setCoPass] = useState('')
    const [referCode, setReferCode] = useState('')



    const handleCheckBoxChange = () => {
        setChecked(!isChecked);
    };



    const registerApi1 = () => {
        try {
            setIndicator2(false)

            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            var raw = JSON.stringify({
                "name": name,
                "email": email,
                "mobile": mobile,
                "password": password,
                "confirm_password": coPass,
                "referCode": referCode.toUpperCase()
            });

            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };

            fetch(`${base_url}/signup`, requestOptions)
                .then(response => response.json())
                .then(result => {
                    if (result.success == true) {
                        if (isChecked == true) {
                            console.log('message', result.message);
                            console.log("open modal");
                            openModal1();
                            setIndicator2(true)

                            Toast.show({
                                type: 'success',
                                text1: `${result.message}`,
                                visibilityTime: 2000,
                                autoHide: true,
                            });
                            setTkn(result.data.resetToken)
                            console.log(result.data.resetToken, "resetToken");
                        }


                    } else {
                        Toast.show({
                            type: 'error',
                            text1: `${result.message}`,
                            visibilityTime: 2000,
                            autoHide: true,
                        });
                        setIndicator2(true)
                        console.log(result.message)

                    }
                })
                .catch(error => console.log('error', error));

        } catch (error) {

        } finally {
            setIndicator2(false);
        }
    }

    console.log("resettkn", tkn);


    const resetApi = () => {
        try {
            setIndicator3(false)

            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            var raw = JSON.stringify({
                "resetToken": tkn,
                "otp": `${f1}${f2}${f3}${f4}`,
                "email": email
            });

            // DVKHOLKTKAVC

            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };

            fetch(`${base_url}/verify-otp`, requestOptions)
                .then(response => response.json())
                .then(result => {
                    if (result.success == true) {
                        setIndicator3(true)

                        Toast.show({
                            type: 'success',
                            text1: `${result.message}`,
                            visibilityTime: 2000,
                            autoHide: true,
                        });
                        console.log(result.message);
                        navigation.navigate("Login")
                        closeModal1();
                        setF1('');
                        setF2('');
                        setF3('');
                        setF4('');
                    }
                    else {
                        Toast.show({
                            type: 'error',
                            text1: `${result.message}`,
                            visibilityTime: 2000,
                            autoHide: true,
                        });
                        setIndicator3(true)

                        console.log(result.message, "else");
                        console.log(tkn, "in");

                    }
                    console.log(result, "log")
                })
                .catch(error => console.log('error', error));

        } catch (error) {

        } finally {
            setIndicator2(false);

        }
    }

    // console.log(f1,"f1");
    // console.log(f2,"f2");
    // console.log(f3,"f3");
    // console.log(f4,"f4");


    const resendOtp = () => {
        try {
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            var raw = JSON.stringify({
                "resetToken": tkn,
                "email": email
            });

            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };

            fetch(`${base_url}/resend-otp`, requestOptions)
                .then(response => response.json())
                .then(result => {
                    if (result.success == true) {
                        console.log(result.message)
                    }
                })
                .catch(error => console.log('error', error));

        } catch (error) {

        }
    }



    return (
        <SafeAreaView style={{ backgroundColor: '#fff', flex: 1 }}>
            <StatusBar translucent={true} barStyle={'light-content'} backgroundColor={'#6A5AE0'} />

            <View style={{ height: responsiveHeight(13), justifyContent: 'center', width: responsiveWidth(100), backgroundColor: '#6A5AE0' }}>


                <View style={{ flexDirection: 'row', justifyContent: 'flex-start', marginHorizontal: 20 }}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={{ justifyContent: 'center', alignSelf: 'flex-start', marginTop: 10 }}>
                        <AntDesign name="arrowleft" size={24} color="white" />
                    </TouchableOpacity>

                    <View style={{ alignSelf: 'center', justifyContent: 'center', marginLeft: '12%' }}>
                        <Text style={{ alignSelf: 'center', color: '#fff', fontWeight: '500', marginBottom: 5, fontSize: 25 }}>Welcome to Podwin</Text>
                        <Text style={{ alignSelf: 'center', color: '#fff', fontWeight: '400', fontSize: 14 }}>Create an account to continue</Text>
                    </View>
                </View>

            </View>

            <Toast email={(email) => Toast.email(email)} />


            <ScrollView showsVerticalScrollIndicator={false}>
                <Text style={{ fontSize: 18, fontWeight: '500', color: '#000', marginTop: 20, marginHorizontal: 20 }}>Full Name</Text>

                <View style={{ borderWidth: 1, height: responsiveHeight(6), alignSelf: 'center', borderRadius: 5, borderColor: '#A0A0A0', width: responsiveWidth(90), marginTop: 5 }}>
                    <TextInput require placeholder='Your Full Name' value={name} onChangeText={(text) => { setName(text) }} style={{ marginLeft: 15, fontWeight: '400', fontSize: 14, marginTop: 8 }} />
                </View>

                <Text style={{ fontSize: 18, fontWeight: '500', color: '#000', marginTop: 20, marginHorizontal: 20 }}>Email</Text>

                <View style={{ borderWidth: 1, height: responsiveHeight(6), alignSelf: 'center', borderRadius: 5, borderColor: '#A0A0A0', width: responsiveWidth(90), marginTop: 5 }}>
                    <TextInput require placeholder='Your Email' value={email} onChangeText={(text) => { setEmail(text) }} style={{ marginLeft: 15, fontWeight: '400', fontSize: 14, marginTop: 8 }} />
                </View>

                <Text style={{ fontSize: 18, fontWeight: '500', color: '#000', marginTop: 20, marginHorizontal: 20 }}>Mobile</Text>

                <View style={{ borderWidth: 1, height: responsiveHeight(6), alignSelf: 'center', borderRadius: 5, borderColor: '#A0A0A0', width: responsiveWidth(90), marginTop: 5 }}>
                    <TextInput require placeholder='Your Mobile Number' inputMode='numeric' maxLength={10} value={mobile} onChangeText={(text) => { setMobile(text) }} style={{ marginLeft: 15, fontWeight: '400', fontSize: 14, marginTop: 8 }} />
                </View>
                <Text style={{ fontSize: 18, fontWeight: '500', color: '#000', marginTop: 20, marginHorizontal: 20 }}>Referral Code</Text>

                <View style={{ borderWidth: 1, height: responsiveHeight(6), alignSelf: 'center', borderRadius: 5, borderColor: '#A0A0A0', width: responsiveWidth(90), marginTop: 5 }}>
                    <TextInput require placeholder='Referral Code' maxLength={10} value={referCode} onChangeText={(text) => { setReferCode(text) }} style={{ marginLeft: 15, fontWeight: '400', fontSize: 14, marginTop: 8 }} />
                </View>



                <Text style={{ fontSize: 18, fontWeight: '500', color: '#000', marginTop: 20, marginHorizontal: 20 }}>Password</Text>

                <View style={{ borderWidth: 1, height: responsiveHeight(6), alignSelf: 'center', flexDirection: 'row', paddingHorizontal: 20, borderRadius: 5, justifyContent: 'space-between', borderColor: '#A0A0A0', width: responsiveWidth(90), marginTop: 5 }}>
                    <TextInput require placeholder='Your Password'
                        value={password} onChangeText={(text) => { setPassword(text) }}
                        secureTextEntry={hidepass ? true : false}
                        style={{ fontWeight: '400', fontSize: 14 }} />

                    <TouchableOpacity onPress={() => sethidepass(!hidepass)} style={{ alignSelf: 'center' }}>
                        <Image source={require('../images/eye.png')} style={{ alignSelf: 'center', tintColor: hidepass == true ? '#A0A0A0' : 'black', height: responsiveHeight(2), width: responsiveWidth(6) }} />
                    </TouchableOpacity>
                </View>

                <Text style={{ fontSize: 18, fontWeight: '500', color: '#000', marginTop: 20, marginHorizontal: 20 }}>Confirm Password</Text>

                <View style={{ borderWidth: 1, height: responsiveHeight(6), alignSelf: 'center', flexDirection: 'row', paddingHorizontal: 20, borderRadius: 5, justifyContent: 'space-between', borderColor: '#A0A0A0', width: responsiveWidth(90), marginTop: 5 }}>
                    <TextInput require placeholder='Confirm Password'
                        value={coPass} onChangeText={(text) => { setCoPass(text) }}
                        secureTextEntry={hidepass2 ? true : false}
                        style={{ fontWeight: '400', fontSize: 14 }} />

                    <TouchableOpacity onPress={() => sethidepass2(!hidepass2)} style={{ alignSelf: 'center' }}>
                        <Image source={require('../images/eye.png')} style={{ alignSelf: 'center', tintColor: hidepass2 == true ? '#A0A0A0' : 'black', height: responsiveHeight(2), width: responsiveWidth(6) }} />
                    </TouchableOpacity>
                </View>


                <View style={{ marginHorizontal: 20, marginTop: 10, flexDirection: 'row', justifyContent: 'flex-start' }}>
                    <CheckBox value={isChecked}
                        onValueChange={handleCheckBoxChange}
                    />

                    <Text style={{ alignSelf: 'center', color: '#A0A0A0' }}>I agree with </Text>

                    <TouchableOpacity style={{ alignSelf: 'center' }} onPress={() => navigation.navigate("TermCondition")}>
                        <Text style={{ alignSelf: 'center', color: 'blue', fontWeight: '500' }}>Term & Conditions</Text>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity style={{ height: responsiveHeight(6), width: responsiveWidth(90), marginTop: '10%', backgroundColor: '#6A5AE0', borderRadius: 10, alignSelf: 'center', justifyContent: 'center' }}
                    onPress={indicator2 == true ? () => registerApi1() : <>null</>} >
                    {
                        indicator2 == true ? <Text style={{ fontSize: 18, color: '#fff', textAlign: 'center', fontFamily: 'Jaldi-Bold' }}>Register</Text> :
                            <ActivityIndicator size={30} color={'#fff'} style={{ justifyContent: 'center' }} />
                    }

                </TouchableOpacity>


                <View style={{ marginHorizontal: 20, marginVertical: 40, marginTop: '5%', flexDirection: 'row', alignSelf: 'center' }}>

                    <Text style={{ alignSelf: 'center', color: '#A0A0A0' }}>Already have an account?</Text>

                    <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                        <Text style={{ fontSize: 18, alignSelf: 'center', color: 'blue', borderBottomWidth: 1, borderColor: 'blue' }}>  Login now</Text>
                    </TouchableOpacity>
                </View>


                <Modal style={{ width: '100%', marginLeft: 0, marginBottom: 0, backgroundColor: 'rgba(0,0,0,0.8)', marginTop: 0 }}
                    visible={modalVisible1}
                    animationType="slide"
                    onRequestClose={closeModal1}
                >
                    <Toast f1={(f1) => Toast.f1(f1)} />

                    <View style={{
                        width: responsiveWidth(100), position: 'absolute', marginBottom: 0, bottom: 0, backgroundColor: '#fff',
                        borderTopLeftRadius: 20, borderTopRightRadius: 20, height: responsiveHeight(54), flex: 1
                    }}>
                        <View style={{ justifyContent: 'space-between', flexDirection: 'row', marginHorizontal: 20, marginTop: 20 }}>

                            <Text style={{ fontSize: responsiveFontSize(2.8), fontWeight: '500', color: '#606060' }}>Enter Code</Text>

                            <View style={{ backgroundColor: '#EDEDED', height: 35, width: 35, justifyContent: 'center', borderRadius: 100 }}>
                                <TouchableOpacity style={{}} onPress={() => {
                                    closeModal1();
                                    setF1('');
                                    setF2('');
                                    setF3('');
                                    setF4('');
                                    // setF5('');
                                    // setF6('');
                                }}>
                                    <Image source={require('../images/crosss.png')} style={{ height: responsiveHeight(2.5), width: responsiveWidth(5), alignSelf: 'center' }} />
                                </TouchableOpacity>
                            </View>
                        </View>

                        <Text style={{ color: '#616161', marginLeft: 20, marginTop: 10, fontSize: 15 }}>Enter 4 Digit Code sent at</Text>

                        <Text style={{ color: '#555555', marginLeft: 20, marginTop: 5, fontSize: 18, fontWeight: '500' }}>{email}</Text>

                        <Text style={{ color: '#616161', marginLeft: 20, marginTop: 5, fontSize: 15 }}>To Change your password</Text>



                        <View style={{ justifyContent: 'space-between', flexDirection: 'row', marginHorizontal: 20, marginTop: 30 }}>

                            <View style={{ backgroundColor: '#F2F2F2', height: responsiveHeight(8), width: responsiveWidth(16), justifyContent: 'center', alignSelf: 'center', borderRadius: 10, marginTop: 10 }}>
                                <TextInput
                                    keyboardType="numeric"
                                    ref={et1}
                                    maxLength={1}
                                    value={f1}
                                    onChangeText={(txt) => {
                                        setF1(txt);
                                        if (txt.length >= 1) {
                                            et2.current.focus();
                                        }
                                    }}
                                    style={{ fontWeight: '800', color: '#747474', fontSize: responsiveFontSize(2.5), alignSelf: 'center' }}
                                />
                            </View>

                            <View style={{ backgroundColor: '#F2F2F2', height: responsiveHeight(8), width: responsiveWidth(16), justifyContent: 'center', alignSelf: 'center', borderRadius: 10, marginTop: 10 }}>
                                <TextInput
                                    keyboardType="numeric"
                                    ref={et2}
                                    maxLength={1}
                                    value={f2}
                                    onChangeText={(txt) => {
                                        setF2(txt);
                                        if (txt.length >= 1) {
                                            et3.current.focus();
                                        } else if (txt.length < 1) {
                                            et1.current.focus();
                                        }
                                    }}
                                    style={{ fontWeight: '800', color: '#747474', fontSize: responsiveFontSize(2.5), alignSelf: 'center' }}
                                />
                            </View>
                            <View style={{ backgroundColor: '#F2F2F2', height: responsiveHeight(8), width: responsiveWidth(16), justifyContent: 'center', alignSelf: 'center', borderRadius: 10, marginTop: 10 }}>
                                <TextInput
                                    keyboardType="numeric"
                                    ref={et3}
                                    maxLength={1}
                                    value={f3}
                                    onChangeText={(txt) => {
                                        setF3(txt);
                                        if (txt.length >= 1) {
                                            et4.current.focus();
                                        } else if (txt.length < 1) {
                                            et2.current.focus();
                                        }
                                    }}
                                    style={{ fontWeight: '800', color: '#747474', fontSize: responsiveFontSize(2.5), alignSelf: 'center' }}
                                />
                            </View>

                            {/* <View style={{ backgroundColor: '#F2F2F2', height: responsiveHeight(7), width: responsiveWidth(14), justifyContent: 'center', alignSelf: 'center', borderRadius: 10, marginTop: 10 }}>
                            <TextInput
                                keyboardType="numeric"
                                ref={et4}
                                maxLength={1}
                                value={f4}
                                onChangeText={(txt) => {
                                    setF4(txt);
                                    if (txt.length >= 1) {
                                        et5.current.focus();
                                    } else if (txt.length < 1) {
                                        et3.current.focus();
                                    }
                                }}
                                style={{ fontWeight: '800', color: '#747474', fontSize: responsiveFontSize(2.5), alignSelf: 'center' }}
                            />
                        </View>

                        <View style={{ backgroundColor: '#F2F2F2', height: responsiveHeight(7), width: responsiveWidth(14), justifyContent: 'center', alignSelf: 'center', borderRadius: 10, marginTop: 10 }}>
                            <TextInput
                                keyboardType="numeric"
                                ref={et5}
                                maxLength={1}
                                value={f5}
                                onChangeText={(txt) => {
                                    setF5(txt);
                                    if (txt.length >= 1) {
                                        et6.current.focus();
                                    } else if (txt.length < 1) {
                                        et4.current.focus();
                                    }
                                }}
                                style={{ fontWeight: '800', color: '#747474', fontSize: responsiveFontSize(2.5), alignSelf: 'center' }}
                            />
                        </View> */}

                            <View style={{ backgroundColor: '#F2F2F2', height: responsiveHeight(8), width: responsiveWidth(16), justifyContent: 'center', alignSelf: 'center', borderRadius: 10, marginTop: 10 }}>
                                <TextInput
                                    keyboardType="numeric"
                                    ref={et4}
                                    maxLength={1}
                                    value={f4}
                                    onChangeText={(txt) => {
                                        setF4(txt);
                                        if (txt.length > 1) {
                                            et4.current.focus();
                                        } else if (txt.length < 1) {
                                            et3.current.focus();
                                        }
                                    }
                                    }
                                    style={{ fontWeight: '800', color: '#747474', fontSize: responsiveFontSize(2.5), alignSelf: 'center' }}
                                />
                            </View>

                        </View>

                        <TouchableOpacity style={{ marginTop: 15, alignSelf: 'flex-end', marginHorizontal: 20 }}
                            onPress={() => { resendOtp() }}>
                            <Text style={{ color: 'red', fontSize: 16 }}>Resend Otp</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={{ height: responsiveHeight(6.3), width: responsiveWidth(89), backgroundColor: '#6A5AE0', justifyContent: 'center', borderRadius: 10, alignSelf: 'center', marginTop: 20 }}
                            onPress={indicator3 == true ? () => resetApi() : <>null</>} >
                            {
                                indicator3 == true ? <Text style={{ fontSize: responsiveFontSize(2), fontWeight: '600', color: 'white', textAlign: 'center' }}>Submit</Text> :
                                    <ActivityIndicator size={30} color={'#fff'} style={{ justifyContent: 'center' }} />

                            }

                        </TouchableOpacity>

                    </View>
                </Modal>


            </ScrollView>
        </SafeAreaView>
    )
}

export default Register