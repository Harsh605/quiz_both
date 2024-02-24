import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import { AntDesign } from '@expo/vector-icons';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import { } from 'react-native-gesture-handler';
import { WebView } from 'react-native-webview';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {base_url} from "./Base_url"

const Feedback = ({ navigation }) => {
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

fetch(`${base_url}/faq`, requestOptions)
  .then(response => response.text())
  .then(result => {console.log(result)
  
    setdata(result)
  })
  .catch(error => console.log('error', error));
    } catch (error) {
      console.log('====================================');
      console.log(error);
      console.log('====================================');
    }
  }

  useEffect(()=>{
    Api()
  },[])
  return (
    <WebView
    style={{flex:1  }}
    originWhitelist={['*']}
    source={{ html: data }}
  />
  )
}

export default Feedback