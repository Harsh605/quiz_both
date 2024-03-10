import { View, Text, StatusBar, Image, TextInput, TouchableOpacity, Linking, FlatList, RefreshControl } from "react-native";
import React, { useEffect, useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import { ScrollView } from "react-native-gesture-handler";
import { responsiveFontSize, responsiveHeight, responsiveWidth, } from "react-native-responsive-dimensions";
import io from 'socket.io-client';

import { useSocket } from "./Context/SocketContext";
import { useRoute } from '@react-navigation/native';
import { getGameLanguage, getHowToPlayImage, updateGameLanguage } from "../../slices/examSlice";
import { useDispatch, useSelector } from "react-redux";
import { calculateRemainingTime } from "../utils/FormateTime";


const Instruction = ({ route, navigation }) => {
    const dispatch = useDispatch()
    const socket = useSocket();
    const { times, scheduleTime, userId, gameId, game_ID } = route.params

    const [remainingTime, setRemainingTime] = useState(times);
    const [lan, setLang] = useState(0);
    const [chooseLanguage, setChooseLanguage] = useState("HINDI");

    const { getHowToPlayImageData, getGameLanguageData } = useSelector((state) => state.examCustom)

    // console.log("game_ID", game_ID)
    // console.log("gameId", gameId)
    // console.log("userId", userId)

    useEffect(() => {
        const connectSocket = () => {
            socket.on('connect', () => {
                console.log("Socket Connected Successfully");
            });
            const joinGameData = {
                gameId: gameId,
                userId: userId
            };
            socket.emit('joinGame', joinGameData);

            socket.on('message', (data) => {
                console.log("Message serve", data);
            });

            socket.on('get-question', async (questionData) => {
                try {
                    console.log('Received question from the server', JSON.stringify(questionData));
                    navigation.navigate('MyLeaderBoard2', { selectedQuestionLanguage: chooseLanguage, questionData: questionData, t: questionData.t, gameId: questionData.gameId, quid: questionData._id, no_qu: questionData.noOfQuestion, userId: userId });
                } catch (error) {
                    console.log(error);
                }
            });
        };

        connectSocket();

        return () => {
            socket.off('connect');
            socket.off('message');
            socket.off('get-question');
        };
    }, [gameId, userId]);



    useEffect(() => {
        dispatch(getGameLanguage({ _id: game_ID }))
    }, [dispatch])
    useEffect(() => {
        dispatch(getHowToPlayImage({ _id: game_ID }))
    }, [dispatch])


    useEffect(() => {
        const interval = setInterval(() => {
            const remainingTime = calculateRemainingTime(scheduleTime);
            setRemainingTime(remainingTime);

            // Check if remaining time is zero
            if (remainingTime.minutes === 0 && remainingTime.seconds === 0) {
                clearInterval(interval);
            }
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    // console.log("getGameLanguageData", getGameLanguageData)
    return (
        <View style={{ flex: 1, backgroundColor: "#fff" }}>
            <View
                style={{
                    height: responsiveHeight(13),
                    width: responsiveWidth(100),
                    justifyContent: "center",
                    backgroundColor: "#6A5AE0",
                    paddingHorizontal: 20,
                }}
            >
                <View style={{ flexDirection: "row", justifyContent: "flex-start" }}>
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        style={{
                            justifyContent: "center",
                            alignSelf: "flex-start",
                            marginTop: 34,
                        }}
                    >
                        <AntDesign name="arrowleft" size={24} color="wchooseLanguagee" />
                    </TouchableOpacity>

                    <Text
                        style={{
                            color: "#fff",
                            fontSize: 18,
                            fontWeight: "500",
                            alignSelf: "center",
                            marginTop: 30,
                            marginLeft: "5%",
                        }}
                    >
                        Instruction
                    </Text>

                    <View
                        style={{ marginTop: 32, flexDirection: "row", marginLeft: "25%" }}
                    >
                        {<Text
                            style={{ alignSelf: "center", color: "#fff", fontWeight: "500" }}
                        >
                            Start in :{" "}
                        </Text>}

                        <Text style={{ color: '#fff', alignSelf: 'center', fontSize: 16 }}>{`${String(remainingTime.minutes).padStart(2, '0')}:${String(remainingTime.seconds).padStart(2, '0')}`}</Text>

                    </View>
                </View>
            </View>

            <ScrollView>
                {chooseLanguage == "HINDI" ? (
                    <View>
                        <View
                            style={{
                                borderWidth: 1,
                                height: responsiveHeight(30),
                                width: responsiveWidth(100),
                                alignSelf: "center",
                            }}
                        >
                            <Image
                                source={{
                                    uri: `https://quiz.metablocktechnologies.org/uploads/${getHowToPlayImageData}`,
                                }}
                                style={{
                                    borderWidth: 1,
                                    height: responsiveHeight(28),
                                    borderRadius: 10,
                                    marginTop: 15,
                                    width: responsiveWidth(90),
                                    alignSelf: "center",
                                    // resizeMode: 'center'
                                }}
                            />
                        </View>

                        <View
                            style={{
                                marginHorizontal: 20,
                                marginTop: 10,
                                paddingHorizontal: 10,
                                flexDirection: "row",
                            }}
                        >
                            <Text style={{ marginRight: 5 }}>👉</Text>
                            <Text>
                                प्रत्येक Question पर maximum 9.5 point बनाने हैं जो कि Answer के
                                option A/B/C/D, सही/गलत, currect % और Time के point से मिलकर
                                बनते हैं।
                            </Text>
                        </View>

                        <View
                            style={{
                                marginHorizontal: 20,
                                marginTop: 10,
                                paddingHorizontal: 10,
                                flexDirection: "row",
                            }}
                        >
                            <Text style={{ marginRight: 5 }}>👉</Text>
                            <Text>
                                सही option select करने पर 5.5 point और गलत option select करने पर
                                3.5 point मिलते हैं।
                            </Text>
                        </View>

                        <View
                            style={{
                                marginHorizontal: 20,
                                marginTop: 10,
                                paddingHorizontal: 10,
                                flexDirection: "row",
                            }}
                        >
                            <Text style={{ marginRight: 5 }}>👉</Text>
                            <Text>
                                currect %, question level और concept modification को बताता है
                                0,1,2,3,4,5,6,7,8,9 में से आप उचित अंक select करें।
                            </Text>
                        </View>

                        <View
                            style={{
                                marginHorizontal: 20,
                                marginTop: 10,
                                paddingHorizontal: 10,
                                flexDirection: "row",
                            }}
                        >
                            <Text style={{ marginRight: 5 }}>👉</Text>
                            <Text>प्रत्येक question के लिए 25 Second दिया गया है।</Text>
                        </View>

                        <View
                            style={{
                                marginHorizontal: 20,
                                marginTop: 10,
                                paddingHorizontal: 10,
                                flexDirection: "row",
                            }}
                        >
                            <Text style={{ marginRight: 5 }}>👉</Text>
                            <Text>
                                सही / ग़लत के point और currect % के D.S point मे Time के point
                                जोड़ने के लिए निश्चित second आने पर save बटन click करे ।
                            </Text>
                        </View>

                        <View
                            style={{
                                marginHorizontal: 20,
                                marginTop: 10,
                                paddingHorizontal: 10,
                                flexDirection: "row",
                            }}
                        >
                            <Text style={{ marginRight: 5 }}>👉</Text>
                            <Text>
                                Question का निश्चित समय समाप्त होने पर आपको 5 second का समय
                                leaderbord में rank, answer and other users की data देखने के लिए
                                मिलेंगा उसके बाद Next question आयेगा।
                            </Text>
                        </View>

                        <View
                            style={{
                                marginHorizontal: 20,
                                marginTop: 10,
                                paddingHorizontal: 10,
                                flexDirection: "row",
                            }}
                        >
                            <Text style={{ marginRight: 5 }}>👉</Text>
                            <Text>
                                Test समाप्त होने पर रैंक के अनुसार scholarship आपके wallet में
                                Transfer कर दी जायेगी।
                            </Text>
                        </View>

                        <View
                            style={{
                                marginHorizontal: 20,
                                marginTop: 10,
                                paddingHorizontal: 10,
                                flexDirection: "row",
                            }}
                        >
                            <Text style={{ marginRight: 5 }}>👉</Text>
                            <Text>
                                Screen पर आपको Timer में Time second में चलता हुआ Show होगा।
                            </Text>
                        </View>
                    </View>
                ) : null}

                {chooseLanguage == "ENGLISH" ? (
                    <View>
                        <View
                            style={{
                                borderWidth: 1,
                                height: responsiveHeight(30),
                                width: responsiveWidth(100),
                                alignSelf: "center",
                            }}
                        >
                            <Image
                                source={{
                                    uri: `https://quiz.metablocktechnologies.org/uploads/${getHowToPlayImageData}`,
                                }}
                                style={{
                                    borderWidth: 1,
                                    height: responsiveHeight(28),
                                    borderRadius: 10,
                                    marginTop: 15,
                                    width: responsiveWidth(90),
                                    alignSelf: "center",
                                }}
                            />
                        </View>

                        <View
                            style={{
                                marginHorizontal: 20,
                                paddingHorizontal: 10,
                                marginTop: 10,
                                flexDirection: "row",
                            }}
                        >
                            <Text style={{ marginRight: 5 }}>👉</Text>
                            <Text style={{ marginRight: 10 }}>
                                Maximum 9.5 points are to be made on each question which
                                consists of answer options A/B/C/D, right/wrong, correct % and
                                time points.
                            </Text>
                        </View>

                        <View
                            style={{
                                marginHorizontal: 20,
                                paddingHorizontal: 10,
                                marginTop: 10,
                                flexDirection: "row",
                            }}
                        >
                            <Text style={{ marginRight: 5 }}>👉</Text>
                            <Text style={{ marginRight: 10 }}>
                                You get 5.5 points for selecting the correct option and 3.3
                                points for selecting the wrong option.
                            </Text>
                        </View>

                        <View
                            style={{
                                marginHorizontal: 20,
                                paddingHorizontal: 10,
                                marginTop: 10,
                                flexDirection: "row",
                            }}
                        >
                            <Text style={{ marginRight: 5 }}>👉</Text>
                            <Text style={{ marginRight: 10 }}>
                                Correct % tells the question level and concept modification.
                                Select the appropriate marks from 0,1,2,3,4,5,6,7,8,9
                            </Text>
                        </View>

                        <View
                            style={{
                                marginHorizontal: 20,
                                paddingHorizontal: 10,
                                marginTop: 10,
                                flexDirection: "row",
                            }}
                        >
                            <Text style={{ marginRight: 5 }}>👉</Text>
                            <Text style={{ marginRight: 10 }}>
                                20 seconds are given for each question.
                            </Text>
                        </View>

                        <View
                            style={{
                                marginHorizontal: 20,
                                paddingHorizontal: 10,
                                marginTop: 10,
                                flexDirection: "row",
                            }}
                        >
                            <Text style={{ marginRight: 5 }}>👉</Text>
                            <Text style={{ marginRight: 10 }}>
                                To add time point to the point of right/wrong and D.S point of
                                correct %, click on save button when the specified second comes.
                            </Text>
                        </View>

                        <View
                            style={{
                                marginHorizontal: 20,
                                paddingHorizontal: 10,
                                marginTop: 10,
                                flexDirection: "row",
                            }}
                        >
                            <Text style={{ marginRight: 5 }}>👉</Text>
                            <Text style={{ marginRight: 10 }}>
                                After the fixed time of the question is over, you will get 5
                                seconds to see the rank, answer and data of other users in the
                                leaderboard, after that the next question will come.
                            </Text>
                        </View>

                        <View
                            style={{
                                marginHorizontal: 20,
                                paddingHorizontal: 10,
                                marginTop: 10,
                                flexDirection: "row",
                            }}
                        >
                            <Text style={{ marginRight: 5 }}>👉</Text>
                            <Text style={{ marginRight: 10 }}>
                                After the test is over, the scholarship will be transferred to
                                your wallet as per your rank.
                            </Text>
                        </View>

                        <View
                            style={{
                                marginHorizontal: 20,
                                paddingHorizontal: 10,
                                marginTop: 10,
                                flexDirection: "row",
                            }}
                        >
                            <Text style={{ marginRight: 5 }}>👉</Text>
                            <Text style={{ marginRight: 10 }}>
                                On the screen you will see the timer showing the time running in
                                seconds.
                            </Text>
                        </View>
                    </View>
                ) : null}

                <View
                    style={{
                        height: responsiveHeight(18),
                        marginBottom: 10,
                        justifyContent: "center",
                        width: responsiveWidth(90),
                        backgroundColor: "#fff",
                        marginTop: 20,
                        alignSelf: "center",
                        elevation: 10,
                    }}
                >
                    <Text
                        style={{
                            alignSelf: "center",
                            fontWeight: "600",
                            fontSize: 20,
                            color: "#6A5AE0",
                        }}
                    >
                        Choose your Preferred Language
                    </Text>

                    <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            marginHorizontal: 20,
                        }}
                    >
                        <TouchableOpacity
                            style={{
                                height: responsiveHeight(5),
                                borderWidth: lan == 0 ? 0 : 1,
                                justifyContent: "center",
                                borderRadius: 5,
                                width: responsiveWidth(38),
                                marginTop: 20,
                                backgroundColor: lan == 0 ? "#6A5AE0" : "#fff",
                                alignSelf: "flex-start",
                            }}
                            onPress={() => {
                                // setLang(0), setChooseLanguage("HINDI"), langApi();
                                setLang(0), setChooseLanguage("HINDI");
                            }}
                        >
                            <Text
                                style={{
                                    color: lan == 0 ? "#fff" : "#000",
                                    fontWeight: "400",
                                    alignSelf: "center",
                                    fontSize: 16,
                                }}
                            >
                                Hindi
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={{
                                height: responsiveHeight(5),
                                borderWidth: lan == 1 ? 0 : 1,
                                justifyContent: "center",
                                borderRadius: 5,
                                width: responsiveWidth(38),
                                marginTop: 20,
                                backgroundColor: lan == 1 ? "#6A5AE0" : "#fff",
                                alignSelf: "flex-start",
                            }}
                            onPress={() => {
                                // setLang(1), setChooseLanguage("ENGLISH"), gamelangApi();
                                setLang(1), setChooseLanguage("ENGLISH");
                            }}
                        >
                            <Text
                                style={{
                                    color: lan == 1 ? "#fff" : "#000",
                                    fontWeight: "400",
                                    alignSelf: "center",
                                    fontSize: 16,
                                }}
                            >
                                English
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <TouchableOpacity
                    style={{
                        height: responsiveHeight(6),
                        justifyContent: "center",
                        marginBottom: 10,
                        borderRadius: 5,
                        width: responsiveWidth(90),
                        marginTop: 20,
                        backgroundColor: "#6A5AE0",
                        alignSelf: "center",
                    }}
                    onPress={() =>
                        dispatch(updateGameLanguage({ _id: game_ID, type: chooseLanguage }))
                    }
                >
                    <Text
                        style={{
                            color: "#fff",
                            fontWeight: "400",
                            alignSelf: "center",
                            fontSize: 16,
                        }}
                    >
                        Save Language
                    </Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
};


export default Instruction;
