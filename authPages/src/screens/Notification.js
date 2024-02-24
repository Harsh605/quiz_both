import { View, Text, TouchableOpacity,Image, ScrollView, RefreshControl } from 'react-native'
import React, { useEffect, useState } from 'react'
import { AntDesign } from '@expo/vector-icons';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import { } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {base_url} from "./Base_url"



const Notification = ({ navigation }) => {
    const [data, setdata] = useState([])
    const [refreshing, setRefreshing] = useState(false);
    const Api = async()=>{
      
        try {
            var myHeaders = new Headers();
            myHeaders.append("Authorization", `${await AsyncStorage.getItem('token')}`);
            
            var requestOptions = {
              method: 'GET',
              headers: myHeaders,
              redirect: 'follow'
            };
            
            fetch(`${base_url}/get-notification`, requestOptions)
              .then(response => response.json())
              .then(result => {
                console.log(result)
                if (result.success == true) {
                    setdata(result.data.notifications)
                }
            
            })
              .catch(error => console.log('error', error)); 
        } catch (error) {
            console.log(error);
        }
    }


    const deleteApi = async(id)=>{
       
        try {
            var myHeaders = new Headers();
            myHeaders.append("Authorization", `${await AsyncStorage.getItem('token')}`);
            myHeaders.append("Content-Type", "application/json");
            
            var raw = JSON.stringify({
              "_id": id
            });
            
            var requestOptions = {
              method: 'POST',
              headers: myHeaders,
              body: raw,
              redirect: 'follow'
            };
            
            fetch(`${base_url}/delete-notification`, requestOptions)
              .then(response => response.json())
              .then(result => {console.log(result)
            
                Api()
            })
              .catch(error => console.log('error', error)); 
        } catch (error) {
          console.log(error);  
        }
    }
    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            Api()
          setRefreshing(false);
        }, 2000);
      }, []);
    useEffect(()=>{
      onRefresh()
        Api()
    },[])
    return (
        <View style={{ flex: 1, backgroundColor: '#fff' }}>

            <View style={{height:responsiveHeight(13),width:responsiveWidth(100),justifyContent:'center',backgroundColor:'#6A5AE0',paddingHorizontal:20}}>
                <View style={{flexDirection:'row',justifyContent:'flex-start'}}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={{ justifyContent: 'center', alignSelf:'flex-start',marginTop:30 }}>
                    <AntDesign name="arrowleft" size={24} color="white" />
                </TouchableOpacity>

                <Text style={{color:'#fff',fontSize:18,fontWeight:'500',alignSelf:'center',marginTop:30,marginLeft:'5%'}}>Notification</Text>
                </View>
            </View>

            <ScrollView refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }  >
               { 
                data.length != 0 ? data?.map((res)=>{
                    return(
                        <>
                        <View style={{flexDirection:'row',justifyContent:'space-between',marginTop:25,marginHorizontal:20}}>
                    <View style={{flex:0.65,alignSelf:'center'}}>
                        <Text style={{fontSize:16}}>{res.title}</Text>
                        <Text style={{fontSize:13,color:'#A8A8A8'}}>{res.body}</Text>
                    </View>

                    <View style={{flex:0.25}}>
                    <Text style={{fontSize:13,color:'#A8A8A8'}}>{new Date(res.createdAt).toLocaleDateString()}</Text>
                    <TouchableOpacity onPress={()=>{deleteApi(res._id)}} >
                    <Image source={require('../images/delete.png')} style={{ height: responsiveHeight(2.4),tintColor:'#6A5AE0',marginTop:10, width: responsiveWidth(4.8),alignSelf:'center' }} />
                    </TouchableOpacity>
    
                    </View>

                </View>
                
                <View style={{borderBottomWidth:0.7,marginTop:15,marginHorizontal:15}}></View>
                        </>
                    )
                })
                : <Text style={{color:"red",alignSelf:'center',marginTop:'10%',fontSize:16}} >Data Not Found</Text>
               
                }

                

            </ScrollView>
        </View>
    )
}

export default Notification