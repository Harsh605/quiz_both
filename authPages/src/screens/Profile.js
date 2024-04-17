import { View, Text, TouchableOpacity, TextInput, Image, ScrollView, ActivityIndicator, Alert } from 'react-native'
import React, { useState, useEffect } from 'react'
import { AntDesign } from '@expo/vector-icons';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import { } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { width } from 'deprecated-react-native-prop-types/DeprecatedImagePropType';
import * as ImagePicker from 'expo-image-picker';
import { Permissions } from 'expo';
import { base_url } from './Base_url';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import { useDispatch, useSelector } from 'react-redux';
import { myProfile, updateProfile } from '../../slices/userSlice';



const Profile = ({ navigation }) => {

    const dispatch = useDispatch()
    const { myProfileData, isProfileUpdate } = useSelector((state) => state.userCustom)


    const [name, setName] = useState(myProfileData?.user[0]?.name);
    const [email, setEmail] = useState(myProfileData?.user[0]?.email)
    const [registration, setRegistration] = useState(myProfileData?.user[0]?.id);
    const [mobile, setMobile] = useState(myProfileData?.user[0]?.mobile);
    const [address, setAddress] = useState(myProfileData?.user[0]?.street_address)
    const [city, setCity] = useState(myProfileData?.user[0]?.city)
    const [state, setState] = useState(myProfileData?.user[0]?.state)
    const [pincode, setPincode] = useState(myProfileData?.user[0]?.pincode)
    const [kycStatus, setKycStatus] = useState(myProfileData?.user[0]?.kyc || 0)
    const [profilePic, setProfilePic] = useState(myProfileData?.user[0]?.avatar);
    const [ isImageChanged,setIsImageChanged]= useState(false)
    const [buttonLoading, setButtonLoading] = useState(true)


    const [imgs, setImgs] = useState("")



    const getPermissions = async () => {
        const { kycStatus } = await Permissions.askAsync([Permissions.CAMERA, Permissions.MEDIA_LIBRARY]);
        if (kycStatus !== 'granted') {
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

        if (!result.cancelled) {
            console.log(result.assets[0].uri);
            setProfilePic(result.assets[0].uri);
            setIsImageChanged(true)
        }
    };
    const updateProfileFunc = () => {
        const formData = new FormData();
        formData.append('name', name);
        formData.append('street_address', address);
        formData.append('city', city);
        formData.append('state', state);
        formData.append('pincode', pincode);
        if(isImageChanged){
            formData.append("avatar", {
                uri: profilePic,
                type: "image/jpeg",
                name: "avatar.jpg",
            });
        }
       

        dispatch(updateProfile({ formData })).then(() => {
            if (isProfileUpdate) {
                alert("Profile Updated")
                dispatch(myProfile())
                setIsImageChanged(false)
            }
        });
    }


    useEffect(() => {
        dispatch(myProfile())
    }, [dispatch])

    console.log(myProfileData)

    return (
        <SafeAreaView>

            <View style={{ height: responsiveHeight(8), width: responsiveWidth(100), justifyContent: 'center', backgroundColor: '#6A5AE0', paddingHorizontal: 20 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={{ justifyContent: 'center', alignSelf: 'flex-start' }}>
                        <AntDesign name="arrowleft" size={24} color="white" />
                    </TouchableOpacity>

                    <Text style={{ color: '#fff', fontSize: 18, fontWeight: '500', alignSelf: 'center', marginLeft: '5%' }}>Edit Profile</Text>
                </View>
            </View>

            <Toast ref={(ref) => Toast.setRef(ref)} />


            <ScrollView style={{ marginBottom: 20, height: responsiveHeight(90) }}>

                <TouchableOpacity style={{ marginTop: 20 }} onPress={pickImage}>

                    {profilePic ? <Image source={{ uri: `https://quiz.metablocktechnologies.org/uploads/${profilePic}` }} style={{ height: responsiveHeight(8), width: responsiveWidth(16), borderRadius: 100, alignSelf: 'center', marginTop: 3 }} /> :
                        <TouchableOpacity onPress={pickImage} style={{ borderWidth: 2.5, borderColor: '#000', height: responsiveHeight(9), width: responsiveWidth(18), borderRadius: 100, alignSelf: 'center' }}
                        >
                            <Image source={{
                                uri: `https://quiz.metablocktechnologies.org/uploads/${imgs}`,
                            }} style={{ height: responsiveHeight(8), width: responsiveWidth(16), borderRadius: 100, alignSelf: 'center', marginTop: 3 }} />

                            <View style={{ backgroundColor: '#6A5AE0', height: responsiveHeight(3), borderRadius: 100, justifyContent: 'center', width: responsiveWidth(6), zIndex: 1, marginTop: -20, marginLeft: 50 }}>
                                <Image source={require('../images/gallery.png')} style={{ height: responsiveHeight(2.5), width: responsiveWidth(5), borderRadius: 100, tintColor: '#fff', alignSelf: 'center' }} />
                            </View>
                        </TouchableOpacity>
                    }

                </TouchableOpacity>

                <Text style={{ fontSize: 18, fontWeight: '500', marginTop: 30, marginHorizontal: 20 }}>Full Name</Text>

                <View style={{ borderWidth: 1, height: responsiveHeight(6), alignSelf: 'center', borderRadius: 10, borderColor: '#A0A0A0', width: responsiveWidth(90), marginTop: 5 }}>
                    <TextInput require placeholder='Your Name' editable={true} value={name} onChangeText={(text) => { setName(text) }} style={{ color: '#000', marginLeft: 15, fontWeight: '400', fontSize: 14, marginTop: 8 }} />
                </View>


                <Text style={{ fontSize: 18, fontWeight: '500', marginTop: 30, marginHorizontal: 20 }}>Registration No.</Text>

                <View style={{ borderWidth: 1, height: responsiveHeight(6), alignSelf: 'center', borderRadius: 10, borderColor: '#A0A0A0', width: responsiveWidth(90), marginTop: 5 }}>
                    <TextInput require placeholder='Your Registration No.' value={registration} editable={false} onChangeText={(text) => { setRegistration(text) }} style={{ color: '#000', marginLeft: 15, fontWeight: '400', fontSize: 14, marginTop: 8 }} />
                </View>


                <Text style={{ fontSize: 18, fontWeight: '500', marginTop: 30, marginHorizontal: 20 }}>Mobile No.</Text>

                <View style={{ borderWidth: 1, height: responsiveHeight(6), alignSelf: 'center', borderRadius: 10, borderColor: '#A0A0A0', width: responsiveWidth(90), marginTop: 5 }}>
                    <TextInput require placeholder='Your Mobile No.' value={mobile} editable={false} onChangeText={(text) => { setMobile(text) }} style={{ color: '#000', marginLeft: 15, fontWeight: '400', fontSize: 14, marginTop: 8 }} />
                </View>


                <Text style={{ fontSize: 18, fontWeight: '500', marginTop: 30, marginHorizontal: 20 }}>Email Id</Text>

                <View style={{ borderWidth: 1, height: responsiveHeight(6), alignSelf: 'center', borderRadius: 10, borderColor: '#A0A0A0', width: responsiveWidth(90), marginTop: 5 }}>
                    <TextInput require placeholder='Your Email' value={email} editable={false} onChangeText={(text) => { setEmail(text) }} style={{ color: '#000', marginLeft: 15, fontWeight: '400', fontSize: 14, marginTop: 8 }} />
                </View>


                <Text style={{ fontSize: 18, fontWeight: '500', marginTop: 30, marginHorizontal: 20 }}>Address</Text>

                <View style={{ borderWidth: 1, height: responsiveHeight(6), alignSelf: 'center', borderRadius: 10, borderColor: '#A0A0A0', width: responsiveWidth(90), marginTop: 5 }}>
                    <TextInput require placeholder='Address' value={address} onChangeText={(text) => { setAddress(text) }} style={{ color: "#000", marginLeft: 15, fontWeight: '400', fontSize: 14, marginTop: 8 }} />
                </View>


                <Text style={{ fontSize: 18, fontWeight: '500', marginTop: 30, marginHorizontal: 20 }}>City</Text>

                <View style={{ borderWidth: 1, height: responsiveHeight(6), alignSelf: 'center', borderRadius: 10, borderColor: '#A0A0A0', width: responsiveWidth(90), marginTop: 5 }}>
                    <TextInput require placeholder='City' value={city} onChangeText={(text) => { setCity(text) }} style={{ marginLeft: 15, fontWeight: '400', fontSize: 14, marginTop: 8 }} />
                </View>


                <Text style={{ fontSize: 18, fontWeight: '500', marginTop: 30, marginHorizontal: 20 }}>State</Text>

                <View style={{ borderWidth: 1, height: responsiveHeight(6), alignSelf: 'center', borderRadius: 10, borderColor: '#A0A0A0', width: responsiveWidth(90), marginTop: 5 }}>
                    <TextInput require placeholder='State' value={state} onChangeText={(text) => { setState(text) }} style={{ marginLeft: 15, fontWeight: '400', fontSize: 14, marginTop: 8 }} />
                </View>

                <Text style={{ fontSize: 18, fontWeight: '500', marginTop: 30, marginHorizontal: 20 }}>Pincode</Text>

                <View style={{ borderWidth: 1, height: responsiveHeight(6), alignSelf: 'center', borderRadius: 10, borderColor: '#A0A0A0', width: responsiveWidth(90), marginTop: 5 }}>
                    <TextInput require placeholder='Pincode' value={pincode} onChangeText={(text) => { setPincode(text) }} style={{ marginLeft: 15, fontWeight: '400', fontSize: 14, marginTop: 8 }} />
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20 }}>
                    <TouchableOpacity style={{ height: responsiveHeight(4.8), justifyContent: 'center', borderRadius: 25, width: responsiveWidth(48), marginTop: 20, backgroundColor: '#EDEAFB' }}
                    >
                        {
                            kycStatus == 1 ? <Text style={{ color: '#6A5AE0', fontWeight: '500', alignSelf: 'center', fontSize: 16 }}>Kyc Status : Pending </Text> :
                                kycStatus == 2 ? <Text style={{ color: '#6A5AE0', fontWeight: '500', alignSelf: 'center', fontSize: 16 }}>Kyc Status : Rejected </Text> :
                                    kycStatus == 3 ? <Text style={{ color: '#6A5AE0', fontWeight: '500', alignSelf: 'center', fontSize: 16 }}>Kyc Status : Completed </Text> :
                                        <Text style={{ color: '#6A5AE0', fontWeight: '500', alignSelf: 'center', fontSize: 16 }}>Kyc Status : Not Submitted </Text>

                        }


                    </TouchableOpacity>

                    <TouchableOpacity style={{ height: responsiveHeight(4.8), justifyContent: 'center', borderRadius: 5, width: responsiveWidth(38), marginTop: 20, backgroundColor: '#6A5AE0' }}
                        onPress={() => {
                            if (kycStatus === 0) {
                                navigation.navigate('UploadKyc');
                            } else {
                                // Handle the case when kycStatus is not 0, such as showing an alert
                                alert('Documents are already uploaded.');
                            }
                        }}
                    >
                        <Text style={{ color: '#fff', fontWeight: '500', alignSelf: 'center', fontSize: 16 }}>Update Kyc</Text>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity style={{ height: responsiveHeight(6), justifyContent: 'center', alignSelf: 'center', borderRadius: 5, width: responsiveWidth(90), marginTop: 20, backgroundColor: '#6A5AE0' }}
                    onPress={buttonLoading == true ? () => updateProfileFunc() : <>null</>}>
                    {
                        buttonLoading == true ? <Text style={{ color: '#fff', fontWeight: '500', alignSelf: 'center', fontSize: 16 }}>Update Proflie</Text> :
                            <ActivityIndicator size={30} color={'#fff'} style={{ justifyContent: 'center' }} />

                    }

                </TouchableOpacity>

            </ScrollView>

        </SafeAreaView>
    )
}

export default Profile