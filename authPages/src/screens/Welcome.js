import { View, Text, Image,StatusBar } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions'

const Welcome = () => {
  const navigation = useNavigation();
  const [tkn, settkn] = useState('')


  const getData = async () => {
    try {

      const value = await AsyncStorage.getItem('token');
      if (value !== null) {
        settkn(value)
        
        navigation.navigate("Home")
      }
      else {
        navigation.navigate("Login")

      }

    } catch (error) {
    }
  }

  useEffect(() => {
    getData();
  })


  return (
     <View style={{ flex: 1, justifyContent: 'center', backgroundColor: '#fff' }}>
      <StatusBar translucent={true} barStyle={'dark-content'} backgroundColor={'#fff'} />

      <Image source={require('../images/logo.png')} style={{ alignSelf: 'center', height: responsiveHeight(14), width: responsiveWidth(40) }} />

    </View>
  )
}

export default Welcome