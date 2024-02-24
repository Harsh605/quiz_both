import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { AntDesign } from '@expo/vector-icons';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import { } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { width } from 'deprecated-react-native-prop-types/DeprecatedImagePropType';
import Share from 'react-native-share';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { base_url } from "./Base_url";



const ReferEarn = ({ navigation }) => {

  const [refer,setRefer] = useState('')

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
          if(result.success==true){
            console.log(result.data)
            setRefer(result.data)
          }
        })
        .catch(error => console.log('error', error));

    } catch (error) {
console.log(error,"uuuu");
    }
  }

  // console.log(refer,"refer");

  return (
    <SafeAreaView>
      <View style={{ height: responsiveHeight(33), width: responsiveWidth(100), backgroundColor: '#6A5AE0', paddingHorizontal: 20 }}>
        <View style={{ flexDirection: 'row', marginTop: 20 }}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={{}}>
            <AntDesign name="arrowleft" size={24} color="white" />
          </TouchableOpacity>

          <Text style={{ color: '#fff', fontSize: 18, fontWeight: '500', marginLeft: '5%' }}>Refer a Friend</Text>
        </View>
      </View>

      <View style={{ height: responsiveHeight(58), elevation: 10, width: responsiveWidth(90), position: 'absolute', backgroundColor: '#fff', alignSelf: 'center', marginTop: '30%', borderRadius: 10 }}>
        <Image source={require('../images/refer_a_friend.png')} style={{ alignSelf: 'center', height: responsiveHeight(30), width: responsiveWidth(60) }} />

        <View style={{ height: responsiveHeight(7), justifyContent: 'center', width: responsiveWidth(40), borderWidth: 1, alignSelf: 'center', borderStyle: 'dashed' }}>
          <Text style={{ alignSelf: 'center', color: '#6A5AE0', fontSize: 18 }}>SADJK170S</Text>
        </View>

        <Text style={{ alignSelf: 'center', color: '#8A8A8A', marginTop: 20 }}>Share your code with your friend and get</Text>
        <Text style={{ alignSelf: 'center', color: '#8A8A8A' }}>exciting bonus points</Text>


        <TouchableOpacity style={{ height: responsiveHeight(7), width: responsiveWidth(80), marginTop: '12%', backgroundColor: '#6A5AE0', borderRadius: 5, alignSelf: 'center', justifyContent: 'center' }}
          // onPress={shareContent}
          onPress={() => { referApi(),shareContent() }}
        >
          <Text style={{ fontSize: 18, color: '#fff', textAlign: 'center', fontFamily: 'Jaldi-Bold' }}>Refer</Text>
        </TouchableOpacity>


      </View>

      <View style={{ justifyContent: 'center', marginTop: '85%', marginHorizontal: 20 }}>
        <Text style={{ alignSelf: 'flex-start', color: '#000', fontWeight: '500', fontSize: 15 }}>Share</Text>
      </View>


      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 40, marginTop: 20 }}>
        <TouchableOpacity  onPress={() => { referApi(),shareContent() }}>
          <Image source={require('../images/msg.png')} style={{ height: responsiveHeight(4), width: responsiveWidth(8), alignSelf: 'center' }} />
          <Text>Message</Text>
        </TouchableOpacity>

        <TouchableOpacity  onPress={() => { referApi(),shareContent() }}>
          <Image source={require('../images/watsapp.png')} style={{ height: responsiveHeight(4), width: responsiveWidth(8), alignSelf: 'center' }} />
          <Text>WhatsApp</Text>
        </TouchableOpacity>

        <TouchableOpacity  onPress={() => { referApi(),shareContent() }}>
          <Image source={require('../images/fb.png')} style={{ height: responsiveHeight(4), width: responsiveWidth(8), alignSelf: 'center' }} />
          <Text style={{marginTop:1}}>FaceBook</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={()=>{referApi(),shareContent()}} style={{alignSelf:'center',marginTop:-4}}>
          <Image source={require('../images/google.png')} style={{ height: responsiveHeight(5), width: responsiveWidth(10), alignSelf: 'center' }} />
          <Text style={{marginTop:-3}}>Google</Text>
        </TouchableOpacity>


      </View>




    </SafeAreaView>
  )
}

export default ReferEarn