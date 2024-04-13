import { View, Text, StatusBar, Image, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useRef, useState } from 'react'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import { ScrollView } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import CheckBox from '@react-native-community/checkbox';
import { AntDesign } from '@expo/vector-icons';
import { base_url } from './Base_url'
import Toast from 'react-native-toast-message';
import Modal from "react-native-modal";




const ForgotPass = ({ navigation }) => {
    const [hidepass, sethidepass] = useState(true);

    const [modalVisible1, setModalVisible1] = useState(false);
    const openModal1 = () => setModalVisible1(true);
    const closeModal1 = () => setModalVisible1(false);
    const [tkn, setTkn] = useState(true);

    const [email, setEmail] = useState('')
    const [indicator2, setIndicator2] = useState(true)



    const et1 = useRef();
    const et2 = useRef();
    const et3 = useRef();
    const et4 = useRef();

    const [f1, setF1] = useState();
    const [f2, setF2] = useState();
    const [f3, setF3] = useState();
    const [f4, setF4] = useState();



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
                        openModal1();

                        // navigation.navigate('NewPass')
                        Toast.show({
                            type: 'success',
                            text1: `${result.message}`,
                            visibilityTime: 2000,
                            autoHide: true,
                        });
                        setTkn(result.data.resetToken)

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

    const resetApi = () => {
        try {
            setIndicator2(false)

            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            var raw = JSON.stringify({
                "resetToken": tkn,
                "otp": `${f1}${f2}${f3}${f4}`,
                "email": email,
                "TYPE":"forgetPassword"
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
                .then(async(result) => {
                    console.log(result,"result...........")
                    if (result.success == true) {
                        setIndicator2(true)

                        Toast.show({
                            type: 'success',
                            text1: `${result.message}`,
                            visibilityTime: 2000,
                            autoHide: true,
                        });
                        console.log(result.message);
                        if(result.data.TYPE === "forgetPassword"){
                            navigation.navigate('NewPass', {
                                jwtToken: result.data.user.jwt,
                                
                            })

                        }
                        else{
                            navigation.navigate("Login")
                        }
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
                        setIndicator2(true)

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
                        onPress={indicator2 == true ? () => resetApi() : <>null</>} >
                        {
                            indicator2 == true ? <Text style={{ fontSize: responsiveFontSize(2), fontWeight: '600', color: 'white', textAlign: 'center' }}>Submit</Text> :
                                <ActivityIndicator size={30} color={'#fff'} style={{ justifyContent: 'center' }} />

                        }

                    </TouchableOpacity>

                </View>
            </Modal>


        </SafeAreaView>
    )
}

export default ForgotPass