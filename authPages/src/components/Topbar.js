import { View, Text, StatusBar, Image, TextInput, Linking, FlatList, RefreshControl } from "react-native";
import { TouchableOpacity } from 'react-native';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { responsiveFontSize, responsiveHeight, responsiveWidth, } from "react-native-responsive-dimensions";
import { myProfile, pdowinLogo } from "../../slices/userSlice";

const Topbar = ({ navigation }) => {
    const dispatch = useDispatch()
    const { myProfileData, brandLogo } = useSelector((state) => state.userCustom)

    useEffect(() => {
        dispatch(pdowinLogo())
    }, [dispatch])

    useEffect(() => {
        dispatch(myProfile())
    }, [dispatch])


    return (
        <>
            <TouchableOpacity onPress={() => navigation.openDrawer()}>
                {
                    !(myProfileData?.user[0]?.avatar) ?
                        <Image
                            source={require('../images/user.jpg')}
                            style={{
                                height: responsiveHeight(6),
                                width: responsiveWidth(12),
                                borderRadius: 100,
                                alignSelf: "center",
                                marginTop: 3,
                            }}
                        />
                        :
                        <Image
                            source={{ uri: `https://quiz.metablocktechnologies.org/uploads/${myProfileData?.user[0]?.avatar}` }}
                            style={{
                                height: responsiveHeight(6),
                                width: responsiveWidth(12),
                                borderRadius: 100,
                                alignSelf: "center",
                                marginTop: 3,
                            }}
                        />

                }

            </TouchableOpacity>
            <Image
                source={{
                    uri: `https://quiz.metablocktechnologies.org/uploads/${brandLogo}`,
                }}
                style={{
                    height: responsiveHeight(4),
                    marginRight: 10,
                    width: responsiveWidth(40),
                    alignSelf: "center",
                    marginTop: 5,
                }}
            />

            <View
                style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
                <TouchableOpacity
                    style={{ marginRight: 9, alignSelf: "center", marginTop: 1 }}
                    onPress={() => navigation.navigate("Notification")}
                >
                    <Image
                        source={require("../images/notification.png")}
                        style={{
                            height: responsiveHeight(5),
                            width: responsiveWidth(10),
                        }}
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    style={{ marginRight: 9, alignSelf: "center", marginTop: 1 }}
                    onPress={() => navigation.navigate("MyBalance")}>
                    <Image
                        source={require("../images/walletcopy.png")}
                        style={{
                            height: responsiveHeight(3.5),
                            width: responsiveWidth(7),
                        }}
                    />
                </TouchableOpacity>
            </View>
        </>
    )
}

export default Topbar