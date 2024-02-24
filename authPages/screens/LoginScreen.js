import { View, Text, StatusBar, Image, TextInput, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import { SafeAreaView } from 'react-native-safe-area-context'
import CheckBox from '@react-native-community/checkbox';
import { base_url } from '../utils/BaseUrl';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../slices/userSlice'


const LoginScreen = ({ navigation }) => {
    const dispatch = useDispatch()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    const [isChecked, setChecked] = useState(false);
    const [hidePass, setHidePass] = useState(true);

    const { userData, isAuthenticated, error } = useSelector((state) => state.userCustom)

    const handleCheckBoxChange = () => {
        setChecked(!isChecked);
    };

    const loginApi = () => {
        if (isChecked, email, password) {
            dispatch(login({ email, password })).then(() => {
                navigation.navigate("Signup")
            })
        }
        if (!email, !password) {
            alert("Please Fill All Fields.")
        }
        else (
            alert("Please Check this checkbox first.")
        )

    }

    return (
        <SafeAreaView style={{ backgroundColor: '#fff', flex: 1 }}>
            <StatusBar translucent={true} barStyle={'light-content'} backgroundColor={'#6A5AE0'} />

            <View style={{ height: responsiveHeight(15), justifyContent: 'center', width: responsiveWidth(100), backgroundColor: '#6A5AE0' }}>
                <Text style={{ alignSelf: 'center', color: '#fff', fontWeight: '500', marginBottom: 10, fontSize: 22 }}>Welcome to Podwin</Text>
                <Text style={{ alignSelf: 'center', color: '#fff', fontWeight: '400', fontSize: 14 }}>Login to continue</Text>

            </View>

            <Text style={{ fontSize: 18, fontWeight: '500', marginTop: 30, marginHorizontal: 20 }}>Email</Text>

            <View style={{ borderWidth: 1, height: responsiveHeight(6), alignSelf: 'center', borderRadius: 10, borderColor: '#A0A0A0', width: responsiveWidth(90), marginTop: 5 }}>
                <TextInput require placeholder='Your Email' value={email} onChangeText={(text) => { setEmail(text) }} style={{ marginLeft: 15, fontWeight: '400', fontSize: 14, marginTop: 8 }} />
            </View>

            <Text style={{ fontSize: 18, fontWeight: '500', marginTop: 20, marginHorizontal: 20 }}>Password</Text>

            <View style={{ borderWidth: 1, height: responsiveHeight(6), alignSelf: 'center', flexDirection: 'row', paddingHorizontal: 20, borderRadius: 10, justifyContent: 'space-between', borderColor: '#A0A0A0', width: responsiveWidth(90), marginTop: 5 }}>
                <TextInput require placeholder='Your Password'
                    value={password} onChangeText={(text) => { setPassword(text) }}
                    secureTextEntry={hidePass ? true : false}
                    style={{ fontWeight: '400', fontSize: 14 }} />

                <TouchableOpacity onPress={() => setHidePass(!hidePass)} style={{ alignSelf: 'center' }}>
                    <Image source={require('../assets/images/eye.png')} style={{ alignSelf: 'center', tintColor: hidePass == true ? '#A0A0A0' : 'black', height: responsiveHeight(2), width: responsiveWidth(6) }} />
                </TouchableOpacity>
            </View>

            <View style={{ marginHorizontal: 20, marginTop: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
                <CheckBox value={isChecked}
                    onValueChange={handleCheckBoxChange}
                />

                <Text style={{ alignSelf: 'center', marginLeft: '24%' }}>Remember me</Text>

                <TouchableOpacity style={{ alignSelf: 'center' }} onPress={() => { navigation.navigate('ForgotPass') }}>
                    <Text style={{ alignSelf: 'center', color: 'blue', borderBottomWidth: 1, borderColor: 'blue' }}>Forgot password?</Text>
                </TouchableOpacity>
            </View>

            <TouchableOpacity style={{ height: responsiveHeight(7), width: responsiveWidth(90), marginTop: '22%', backgroundColor: '#6A5AE0', borderRadius: 15, alignSelf: 'center', justifyContent: 'center' }}
                onPress={() => { loginApi() }} >
                <Text style={{ fontSize: 18, color: '#fff', textAlign: 'center', fontFamily: 'Jaldi-Bold' }}>Login</Text>
            </TouchableOpacity>


            <View style={{ marginHorizontal: 20, marginTop: '15%', flexDirection: 'row', alignSelf: 'center' }}>

                <Text style={{ alignSelf: 'center' }}>Don't have an account?</Text>

                <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
                    <Text style={{ alignSelf: 'center', color: 'blue', borderBottomWidth: 1, borderColor: 'blue', fontSize: 16 }}> Register now</Text>
                </TouchableOpacity>
            </View>


        </SafeAreaView>
    )
}

export default LoginScreen