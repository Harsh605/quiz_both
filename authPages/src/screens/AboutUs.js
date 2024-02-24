import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import { AntDesign } from '@expo/vector-icons';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import { } from 'react-native-gesture-handler';
import { WebView } from 'react-native-webview';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {base_url} from "./Base_url"
import { SafeAreaView } from 'react-native-safe-area-context';


const AboutUs = ({ navigation }) => {
  const [data, setdata] = useState()
  
 
  const Api = async() =>{
    try {
      var myHeaders = new Headers();
myHeaders.append("Authorization", `${await AsyncStorage.getItem('token')}`);

var requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow'
};

fetch(`${base_url}/about-us`, requestOptions)
  .then(response => response.json())
  .then(result => {console.log(result)
  
    setdata(result.data.data)

  })
  .catch(error => console.log('error', error));
    } catch (error) {
      console.log('====================================');
      console.log(error);
      console.log('====================================');
    }
  }
console.log(data,"daata");
  useEffect(()=>{
    Api()
  },[])
  return (
    <SafeAreaView>
      <View style={{ height: responsiveHeight(7), width: responsiveWidth(100), justifyContent: 'center', backgroundColor: '#6A5AE0', paddingHorizontal: 20 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={{ justifyContent: 'center', alignSelf: 'flex-start', marginTop: 10 }}>
                        <AntDesign name="arrowleft" size={24} color="white" />
                    </TouchableOpacity>

                    <Text style={{ color: '#fff', fontSize: 18, fontWeight: '500', alignSelf: 'center', marginTop: 10, marginLeft: '5%' }}>About Us</Text>
                </View>
            </View>
      <ScrollView>
        <Text style={{marginHorizontal:20,marginTop:'5%',fontSize:13,fontWeight:'300'}}>{data}</Text>
      </ScrollView>
    </SafeAreaView>
  )
}

export default AboutUs