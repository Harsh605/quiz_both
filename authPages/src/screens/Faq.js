import { View, Text, TouchableOpacity, Image, ScrollView,RefreshControl } from 'react-native'
import React, { useEffect, useState } from 'react'
import { AntDesign } from '@expo/vector-icons';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import { } from 'react-native-gesture-handler';
import { base_url } from './Base_url';

const Faq = ({ navigation }) => {
    const [open, setOpen] = useState(false);
    const [open2, setOpen2] = useState(false);
    const [open3, setOpen3] = useState(false);

    const [mydata, setMydata] = useState([{}])

    const [refreshing, setRefreshing] = useState(false);

    

    const faqApi = (n) => {
        alert(n)
        try {

            var requestOptions = {
                method: 'GET',
                redirect: 'follow'
            };

            fetch(`${base_url}/faq?id=${n}`, requestOptions)
                .then(response => response.json())
                .then(result => {
                    if (result.success == true) {
                        console.log(result.data.data)
                        setMydata(result.data.data)
                    }
                })
                .catch(error => console.log('error', error));

        } catch (error) {

        }
    }

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            faqApi()
          setRefreshing(false);
        }, 2000);
      }, []);

    useEffect(() => {
        onRefresh
        faqApi();
       
    }, [])

    console.log(mydata, 'mydata');

    return (
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
            <View style={{ height: responsiveHeight(13), width: responsiveWidth(100), justifyContent: 'center', backgroundColor: '#6A5AE0', paddingHorizontal: 20 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={{ justifyContent: 'center', alignSelf: 'flex-start', marginTop: 30 }}>
                        <AntDesign name="arrowleft" size={24} color="white" />
                    </TouchableOpacity>

                    <Text style={{ color: '#fff', fontSize: 18, fontWeight: '500', alignSelf: 'center', marginTop: 30, marginLeft: '5%' }}>Faq</Text>
                </View>
            </View>

            

            <ScrollView style={{marginBottom:20}} refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>

                {
                    mydata?.length > 0 ? (mydata.map((data,n) => {
                        console.log(data, 'datatata');
                        return (
                            <>
                                <TouchableOpacity  style={{ height: open == 0 ? responsiveHeight(9) : responsiveHeight(30), width: responsiveWidth(90), borderColor: '#6A5AE0', borderWidth: 1,paddingHorizontal:10, borderRadius: 5, alignSelf: 'center', marginTop: 20 }}
                                    onPress={() => setOpen(!open)}>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 20, marginTop: '6%' }}>
                                        <Text style={{ alignSelf: 'center', fontWeight: '500' }}>{data?.question}</Text>
                                        <Image source={require('../images/plus.png')} style={{ height: responsiveHeight(3.5), width: responsiveWidth(7), tintColor: '#6A5AE0' }} />

                                    </View>

                                    <View style={{ borderBottomWidth:open==1 ? 1 :0, borderColor: '#6A5AE0',marginTop:'4%' }}></View>
                                    {
                                        open == 1 ? (<>
                                            <Text style={{ alignSelf: 'center', fontWeight: '400', marginTop: 20 }}>{data?.answer}</Text>

                                        </>)
                                            : (null)
                                    }
                                </TouchableOpacity>
                            </>
                        )
                    })) :
                        (
                            <Text style={{ textAlign: 'center', color: 'red', justifyContent: 'center', fontFamily: 'Jaldi-Regular', alignItems: 'center', borderColor: 'red', borderRadius: 10, marginVertical: 20, marginHorizontal: 20, paddingVertical: 20, fontSize: 18 }}>No data found</Text>

                        )

                }


            </ScrollView>

        </View>
    )
}

export default Faq