import { View, Text, StatusBar, Image, TextInput, TouchableOpacity, Linking, FlatList, RefreshControl } from "react-native";
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { allSocialLinks } from '../../slices/userSlice'
import { responsiveFontSize, responsiveHeight, responsiveWidth, } from "react-native-responsive-dimensions";

const Footer = ({ navigation }) => {

    const dispatch = useDispatch()
    const { allLiveExams, isLoading, sliders, myProfileData, socialLinks, brandLogo } = useSelector((state) => state.userCustom)

    useEffect(() => {
        dispatch(allSocialLinks())
    }, [dispatch])

    const getYoutubeLink = () => {
        const youtubeLink = socialLinks.find(link => link.Name === "YOUTUBE");
        return youtubeLink ? youtubeLink.Link : ""; // Return link or empty string if not found
    };

    const getTelegramLink = () => {
        const telegramLink = socialLinks.find(link => link.Name === "TELEGRAM");
        return telegramLink ? telegramLink.Link : ""; // Return link or empty string if not found
    };

    const getEmailLink = () => {
        const emailLink = socialLinks.find(link => link.Name === "EMAIL");
        return emailLink ? `mailto:${emailLink.Link}` : ""; // Return mailto link or empty string if not found
    };

    const handleLinkPress = (l) => {
        Linking.openURL(l);
    };
    return (
        <View
            style={{
                height: responsiveHeight(8),
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
                width: responsiveWidth(100),
                backgroundColor: "#6A5AE0",
                justifyContent: "space-between",
                paddingHorizontal: 20,
                flexDirection: "row",
            }}
        >
            <TouchableOpacity style={{ alignSelf: "center" }} onPress={() => handleLinkPress(getYoutubeLink())}>
                <Image
                    source={require("../images/yt.webp")}
                    style={{
                        tintColor: '#A9A9A9',
                        height: responsiveHeight(2.4),
                        width: responsiveWidth(5.8),
                        alignSelf: "center",
                    }}
                />
                <Text style={{ color: "#A9A9A9", fontWeight: "400", fontSize: 12 }}>Youtube</Text>
            </TouchableOpacity>

            <TouchableOpacity style={{ alignSelf: "center" }} onPress={() => handleLinkPress(getTelegramLink())}>
                <Image
                    source={require("../images/gram.webp")}
                    style={{
                        tintColor: "#A9A9A9",
                        height: responsiveHeight(2.4),
                        width: responsiveWidth(5.2),
                        alignSelf: "center",
                    }}
                />
                <Text style={{ color: "#A9A9A9", fontWeight: "400", fontSize: 12 }}>Telegram</Text>
            </TouchableOpacity>

            <TouchableOpacity style={{ alignSelf: "center" }} onPress={() => handleLinkPress(getEmailLink())}>
                <Image
                    source={require("../images/tmail.png")}
                    style={{
                        tintColor: "#A9A9A9",
                        height: responsiveHeight(2.4),
                        width: responsiveWidth(5.8),
                        alignSelf: "center",
                    }}
                />
                <Text style={{ color: "#A9A9A9", fontWeight: "400", fontSize: 12 }}>Email</Text>
            </TouchableOpacity>


            <TouchableOpacity
                style={{ alignSelf: "center" }}
                onPress={() => navigation.navigate("Introduction")}
            >
                <Image
                    source={require("../images/intr.png")}
                    style={{
                        tintColor: "#A9A9A9",
                        height: responsiveHeight(2.4),
                        width: responsiveWidth(5.9),
                        alignSelf: "center",
                    }}
                />

                <Text style={{ color: "#A9A9A9", fontWeight: "400", fontSize: 12 }}>
                    Point System
                </Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={{ alignSelf: "center" }}
                onPress={() => navigation.navigate("Profile")}
            >
                <Image
                    source={require("../images/usericon.png")}
                    style={{
                        tintColor: "#A9A9A9",
                        height: responsiveHeight(2.5),
                        width: responsiveWidth(4.5),
                        alignSelf: "center",
                    }}
                />

                <Text style={{ color: "#A9A9A9", fontWeight: "400", fontSize: 12 }}>
                    Profile
                </Text>
            </TouchableOpacity>
        </View>
    )
}

export default Footer