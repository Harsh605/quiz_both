import { View, Text, TouchableOpacity, TextInput, Image, ScrollView, ActivityIndicator } from 'react-native'
import React, { useState, useEffect } from 'react'
import { AntDesign } from '@expo/vector-icons';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import { } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';
import { Permissions } from 'expo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { base_url } from './Base_url';
import Toast from 'react-native-toast-message';



const UploadKyc = ({ navigation }) => {

    const [selectedImage, setSelectedImage] = useState(null);
    const [selectedImage2, setSelectedImage2] = useState(null);
    const [selectedImage3, setSelectedImage3] = useState(null);
    const [selectedImage4, setSelectedImage4] = useState(null);

    const [indicator2, setIndicator2] = useState(true)


    // const [selectPan, setSelectPan] = useState(null);
    const [selectPanback, setSelectPanback] = useState(null);





    const [adhaar, setAdhaar] = useState('')
    const [pan, setPan] = useState('')

    const [adhaarfront, setAdhaarfront] = useState('')
    console.log(selectedImage, "selectimage");
    const [adharback, setAdharback] = useState('')
    const [panFront, setPanfront] = useState('')
    const [panback, setPanback] = useState('')

    const [already, setAlready] = useState(false)





    async function getPermissions() {
        const { status } = await Permissions.askAsync(Permissions.CAMERA, Permissions.MEDIA_LIBRARY);
        if (status !== 'granted') {
            console.log('Permission denied!');
        }
    }

    useEffect(() => {
        getPermissions();
    }, []);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,

        });

        console.log(result.assets[0].uri, "rrrrrrrrr");

        if (!result.canceled) {
            setSelectedImage(result.assets[0].uri);
        }
    };

    const backadharpickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,

        });

        console.log(result, "rrrrrrrrr");

        if (!result.canceled) {
            setSelectedImage2(result.assets[0].uri);
        }
    };

    const panfrontimage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,

        });

        console.log(result, "rrrrrrrrr");

        if (!result.canceled) {
            setSelectedImage3(result.assets[0].uri);
        }
    };

    const panbackimage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,

        });

        console.log(result, "rrrrrrrrr");

        if (!result.canceled) {
            setSelectedImage4(result.assets[0].uri);
        }
    };


    const uploadApi = async () => {
        // alert(selectedImage)
        try {
            setIndicator2(false)

            var myHeaders = new Headers();
            myHeaders.append("Authorization", `${await AsyncStorage.getItem('token')}`);
            // alert(`${await AsyncStorage.getItem("token")}`)

            var formdata = new FormData();
            formdata.append("adhaarFront", {
                uri: selectedImage,
                type: "image/jpeg",
                name: "adhaarfront.jpg",
            });
            formdata.append("adhaarBack", {
                uri: selectedImage2,
                type: "image/jpeg",
                name: "adhaarback.jpg",
            });
            // formdata.append("adhaarFront", fileInput.files[0], adhaarfront);
            formdata.append("panFront", {
                uri: selectedImage3,
                type: "image/jpeg",
                name: "panFront.jpg",
            });

            formdata.append("panBack", {
                uri: selectedImage4,
                type: "image/jpeg",
                name: "panback.jpg",
            });
            // formdata.append("panFront", panFront);
            // formdata.append("panBack", panback);

            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: formdata,
                redirect: 'follow'
            };

            fetch(`${base_url}/upload-kyc`, requestOptions)
                .then(response => response.json())
                .then(result => {
                    if (result.success == true) {
                        Toast.show({
                            type: 'success',
                            text1: `${result.message}`,
                            visibilityTime: 2000,
                            autoHide: true,
                        });
                        navigation.navigate('Home')
                        setIndicator2(true)

                    }
                    else if (result.success == false) {
                        setAlready(true)
                        Toast.show({
                            type: 'success',
                            text1: `${result.message}`,
                            visibilityTime: 2000,
                            autoHide: true,
                        });
                    }
                    else {
                        Toast.show({
                            type: 'error',
                            text1: `${result.message}`,
                            visibilityTime: 2000,
                            autoHide: true,
                        });
                        navigation.navigate('Home')
                        setIndicator2(true)

                        console.log(result.message, "else")

                    }
                })
                .catch(error => Toast.show({
                    type: 'error',
                    text1: 'somthing went wrong',
                    visibilityTime: 2000,
                    autoHide: true,
                }));
            setIndicator2(false)


        } catch (error) {
            Toast.show({
                type: 'error',
                text1: 'somthing went wrong',
                visibilityTime: 2000,
                autoHide: true,
            });
            setIndicator2(false)

            console.log(error);
        } finally {
            setIndicator2(false);
        }
    }



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

                <Toast ref={(ref) => Toast.setRef(ref)} />




                <Text style={{ marginHorizontal: 20, marginTop: 20, fontWeight: '600', fontSize: 18 }}>Setup User Account</Text>

                <Text style={{ marginHorizontal: 20, marginTop: 20, fontWeight: '500', fontSize: 14 }}>Upload front and back of the chosen</Text>
                <Text style={{ marginHorizontal: 20, fontWeight: '500', fontSize: 14 }}>document showingyour address</Text>

                <Text style={{ fontSize: 15, fontWeight: '500', marginTop: 30, marginHorizontal: 20 }}>Aadhaar Card Number</Text>

                <View style={{ borderWidth: 1, height: responsiveHeight(6), alignSelf: 'center', borderRadius: 10, borderColor: '#A0A0A0', width: responsiveWidth(90), marginTop: 5 }}>
                    <TextInput require placeholder='Enter Aadhaar Card Number' value={adhaar} onChangeText={(text) => setAdhaar(text)} style={{ marginLeft: 15, fontWeight: '400', fontSize: 14, marginTop: 8 }} />
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 30 }}>

                    <View>
                        <Text style={{ fontSize: 14, fontWeight: '500', marginTop: 30, marginHorizontal: 20 }}>Aadhaar Card Front</Text>
                        <TouchableOpacity onPress={pickImage}>
                            <View style={{ borderWidth: 1, height: responsiveHeight(8), alignSelf: 'center', borderRadius: 10, borderColor: '#A0A0A0', width: responsiveWidth(30), marginTop: 5 }}>
                                <Image source={require('../images/upload.png')} value={adhaarfront} onChangeText={(text) => setAdhaarfront(text)} style={{ height: responsiveHeight(4), alignSelf: 'center', width: responsiveWidth(8) }} />
                                {selectedImage ? <Text style={{ color: 'green', fontSize: 12, alignSelf: 'center' }}>Uploaded</Text>
                                    :
                                    <Text style={{ color: '#8A8A8A', fontSize: 12, alignSelf: 'center' }}>Upload Front</Text>

                                }
                            </View>
                        </TouchableOpacity>
                    </View>

                    <View>
                        <Text style={{ fontSize: 14, fontWeight: '500', marginTop: 30, marginHorizontal: 20 }}>Aadhaar Card Back</Text>
                        <TouchableOpacity onPress={backadharpickImage}>
                            <View style={{ borderWidth: 1, height: responsiveHeight(8), alignSelf: 'center', borderRadius: 10, borderColor: '#A0A0A0', width: responsiveWidth(30), marginTop: 5 }}>
                                <Image source={require('../images/upload.png')} value={adharback} onChangeText={(text) => setAdharback(text)} style={{ height: responsiveHeight(4), alignSelf: 'center', width: responsiveWidth(8) }} />

                                {selectedImage2 ? <Text style={{ color: 'green', fontSize: 12, alignSelf: 'center' }}>Uploaded</Text>
                                    :
                                    <Text style={{ color: '#8A8A8A', fontSize: 12, alignSelf: 'center' }}>Upload Back</Text>

                                }
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* {selectedImage ? <Image source={{ uri: selectedImage }} style={{ height: responsiveHeight(5), width: responsiveWidth(10) }} />
                    :
                    <Text>jg</Text>
                } */}


                <Text style={{ fontSize: 15, fontWeight: '500', marginTop: 30, marginHorizontal: 20 }}>Pan Card Number</Text>

                <View style={{ borderWidth: 1, height: responsiveHeight(6), alignSelf: 'center', borderRadius: 10, borderColor: '#A0A0A0', width: responsiveWidth(90), marginTop: 5 }}>
                    <TextInput require placeholder='Pan Card Number' value={pan} onChangeText={(text) => { setPan(text) }} style={{ marginLeft: 15, fontWeight: '400', fontSize: 14, marginTop: 8 }} />
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 30 }}>

                    <View>
                        <Text style={{ fontSize: 14, fontWeight: '500', marginTop: 30, marginHorizontal: 20 }}>Pan Card Front</Text>
                        <TouchableOpacity onPress={panfrontimage}>
                            <View style={{ borderWidth: 1, height: responsiveHeight(8), alignSelf: 'center', borderRadius: 10, borderColor: '#A0A0A0', width: responsiveWidth(30), marginTop: 5 }}>
                                <Image source={require('../images/upload.png')} value={panFront} style={{ height: responsiveHeight(4), alignSelf: 'center', width: responsiveWidth(8) }} />
                                {selectedImage3 ? <Text style={{ color: 'green', fontSize: 12, alignSelf: 'center' }}>Uploaded</Text>
                                    :
                                    <Text style={{ color: '#8A8A8A', fontSize: 12, alignSelf: 'center' }}>Upload Back</Text>

                                }
                            </View>
                        </TouchableOpacity>
                    </View>

                    <View>
                        <Text style={{ fontSize: 14, fontWeight: '500', marginTop: 30, marginHorizontal: 20 }}>Pan Card Back</Text>
                        <TouchableOpacity onPress={panbackimage}>
                            <View style={{ borderWidth: 1, height: responsiveHeight(8), alignSelf: 'center', borderRadius: 10, borderColor: '#A0A0A0', width: responsiveWidth(30), marginTop: 5 }}>
                                <Image source={require('../images/upload.png')} value={panback} style={{ height: responsiveHeight(4), alignSelf: 'center', width: responsiveWidth(8) }} />

                                {selectedImage4 ? <Text style={{ color: 'green', fontSize: 12, alignSelf: 'center' }}>Uploaded</Text>
                                    :
                                    <Text style={{ color: '#8A8A8A', fontSize: 12, alignSelf: 'center' }}>Upload Back</Text>

                                }
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>

                <Text style={{ fontSize: 14, fontWeight: '400', marginTop: 20, marginHorizontal: 20 }}>Disclaimer:</Text>
                <Text style={{ fontSize: 12, fontWeight: '400', marginHorizontal: 20 }}>Aadhaar number at any stage will not get stored into Quizapp</Text>
                <Text style={{ fontSize: 12, fontWeight: '400', marginHorizontal: 20 }}>systems or any records with our partners. You'll be asked</Text>
                <Text style={{ fontSize: 12, fontWeight: '400', marginHorizontal: 20 }}>to input OTP shared by UIDAI when an Aadhar eSign /</Text>
                <Text style={{ fontSize: 12, fontWeight: '400', marginHorizontal: 20 }}>Verification in initiated</Text>

            </ScrollView>

            <TouchableOpacity style={{ height: responsiveHeight(6), justifyContent: 'center', alignSelf: 'center', borderRadius: 5, width: responsiveWidth(90), marginTop: 20, backgroundColor: '#6A5AE0' }}
                disabled={already == false}
                onPress={indicator2 == true ? () => uploadApi() : <>null</>}>
                {
                    indicator2 == true ? <Text style={{ color: '#fff', fontWeight: '500', alignSelf: 'center', fontSize: 16 }}>Submit</Text> :
                        <ActivityIndicator size={30} color={'#fff'} style={{ justifyContent: 'center' }} />

                }

            </TouchableOpacity>




        </SafeAreaView>
    )
}

export default UploadKyc