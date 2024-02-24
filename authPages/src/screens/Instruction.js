import {
    View,
    Text,
    TouchableOpacity,
    Image,
    ScrollView,
    TextInput,
} from "react-native";
import React, { useEffect, useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import {
    responsiveHeight,
    responsiveWidth,
} from "react-native-responsive-dimensions";
import io from 'socket.io-client';

import { } from "react-native-gesture-handler";
import { base_url } from "./Base_url";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import Socketio from "./Socketio";
import { useSocket } from "./Context/SocketContext";
import { useRoute } from '@react-navigation/native';


const Instruction = ({ route, navigation }) => {


    const { times } = route.params
    const { g_id } = route.params
    const { u_id } = route.params
    const [imgData, setImgData] = useState("")


    const [lan, setLang] = useState(0);
    const [hit, setHit] = useState("HINDI");
    const [gameid, setGameid] = useState(g_id);
    const [userid, setUserid] = useState(u_id);

    // alert(gameid)
    // console.log(gameid,"instruction_gameid");
    // console.log(userid,"instruction_userid");



    const [lanslect, setlanslect] = useState()
    // Initial time in minutes
    const [minutes, setMinutes] = useState(times);

    const [seconds, setSeconds] = useState(0);

    useEffect(() => {
        // console.log('yes connected');
        socket.on('connect', () => {
            console.log("connect success ! sk");
        })
        const joinGameData = {
            gameId: gameid,
            userId: userid
        }
        socket.emit('joinGame', joinGameData)

        socket.on('message', (data) => {
            console.log("messgg serve", data);
        })
        socket.on('get-question', async (questionData) => {
            try {
                //   await setleft(questionData.q_left)
                //   await setnoOfQuestion(questionData.noOfQuestion)
                //   let leg = await AsyncStorage.getItem("lang")
                //   if (leg == "ENGLISH") {

                //     await setQuestion(questionData.question.questionInEnglish);
                //     await setoption(questionData.question.optionsInEnglish)
                //     await setGetId(questionData.question._id)
                //     await setMygameId(questionData.question.gameId)
                //     await setMyanswer()

                //   } else {
                //     await setQuestion(questionData.question.questionInHindi);
                //     await setoption(questionData.question.optionsInHindi);
                //     await setGetId(questionData.question._id)
                //     await setMygameId(questionData.question.gameId)
                //     await setMyanswer(questionData.question.optionsInEnglish[0].id)


                //   }
                // Update the component state with the received question
                console.log('Received question from the server: jon', JSON.stringify(questionData));



                navigation.navigate('MyLeaderBoard', { questionData: questionData, t: questionData.t, gameId: questionData.gameId, quid: questionData._id, no_qu: questionData.noOfQuestion, userid: userid })
                // console.log(questionData.noOfQuestion,"llllllllll");


                //   await setSelect("")
            } catch (error) {
                console.log(error);
            }

        });
    }, [gameid, userid])

    useEffect(() => {


        const interval = setInterval(() => {
            if (minutes === 0 && seconds === 0) {
                clearInterval(interval);
                // navigation.navigate('MyLeaderBoard');
            } else {
                if (seconds === 0) {
                    setMinutes((prevMinutes) => prevMinutes - 1);
                    setSeconds(59); // Set seconds to 59 when minutes decrement
                } else {
                    setSeconds((prevSeconds) => prevSeconds - 1);
                }
            }
        }, 990); // Adjusted to 1000 milliseconds (1 second)

        return () => clearInterval(interval);
    }, [minutes, seconds, navigation]);

    const socket = useSocket();
    // console.log(gameid,"mygameidgameidgameid");

    useEffect(() => {
        // console.log('yes connected');
        socket.on('connect', () => {
            console.log("connect success ! sk");
        })
        const joinGameData = {
            gameId: gameid,
            userId: userid
        }
        socket.emit('joinGame', joinGameData)

        socket.on('message', (data) => {
            console.log("messgg serve", data);
        })
        socket.on('get-question', async (questionData) => {
            try {
                //   await setleft(questionData.q_left)
                //   await setnoOfQuestion(questionData.noOfQuestion)
                //   let leg = await AsyncStorage.getItem("lang")
                //   if (leg == "ENGLISH") {

                //     await setQuestion(questionData.question.questionInEnglish);
                //     await setoption(questionData.question.optionsInEnglish)
                //     await setGetId(questionData.question._id)
                //     await setMygameId(questionData.question.gameId)
                //     await setMyanswer()

                //   } else {
                //     await setQuestion(questionData.question.questionInHindi);
                //     await setoption(questionData.question.optionsInHindi);
                //     await setGetId(questionData.question._id)
                //     await setMygameId(questionData.question.gameId)
                //     await setMyanswer(questionData.question.optionsInEnglish[0].id)


                //   }
                // Update the component state with the received question
                console.log('Received question from the server: jon', JSON.stringify(questionData));



                navigation.navigate('MyLeaderBoard', { questionData: questionData, t: questionData.t, gameId: questionData.gameId, quid: questionData._id, no_qu: questionData.noOfQuestion, userid: userid })
                // console.log(questionData.noOfQuestion,"llllllllll");


                //   await setSelect("")
            } catch (error) {
                console.log(error);
            }

        });
    }, [gameid, userid])


    const playimgApi = async () => {
        try {
            var myHeaders = new Headers();
            myHeaders.append("Authorization", `${await AsyncStorage.getItem('token')}`);

            var requestOptions = {
                method: 'GET',
                headers: myHeaders,
                redirect: 'follow'
            };

            fetch(`${base_url}/how-to-play`, requestOptions)
                .then(response => response.json())
                .then(result => {
                    if (result.success == true) {
                        // console.log(result.data.img)
                        setImgData(result.data.img)
                    }
                })
                .catch(error => console.log('error', error));

        } catch (error) {

        }
    }




    const langApi = async () => {
        // console.log(`${await AsyncStorage.getItem("_id2")}`, "ididididido");

        try {
            var myHeaders = new Headers();
            myHeaders.append(
                "Authorization",
                `${await AsyncStorage.getItem("token")}`
            );
            myHeaders.append("Content-Type", "application/json");

            var raw = JSON.stringify({
                _id: `${await AsyncStorage.getItem("_id2")}`,
                type: `${hit}`,
            });

            var requestOptions = {
                method: "POST",
                headers: myHeaders,
                body: raw,
                redirect: "follow",
            };

            fetch(`${base_url}/update-game`, requestOptions)
                .then((response) => response.json())
                .then((result) => {
                    if (result.success == true) {
                        console.log(result.message);
                    }
                })
                .catch((error) => console.log("error", error));
        } catch (error) { }
    };



    const gamelangApi = async () => {
        // alert(await AsyncStorage.getItem("_id2"))
        try {
            var myHeaders = new Headers();
            myHeaders.append(
                "Authorization",
                `${await AsyncStorage.getItem("token")}`
            );

            var requestOptions = {
                method: "GET",
                headers: myHeaders,
                redirect: "follow",
            };

            fetch(
                `${base_url}/game-lang?_id=${await AsyncStorage.getItem("_id2")}`,
                requestOptions
            )
                .then((response) => response.json())
                .then(async (result) => {
                    if (result.success == true) {

                        // setUserid(result.data.myGame.userId);
                        // alert(result.data.myGame.userId);

                        // setGameid(result.data.myGame.gameId);
                        // console.log(result.data.myGame.gameId, "result.data.myGame.gameId");

                        // alert(AsyncStorage.getItem("_id2"));
                        // console.log(AsyncStorage.getItem("_id2"));


                        // await AsyncStorage.setItem("gameid", result.data.myGame.gameId);
                        await AsyncStorage.setItem("lang", hit)
                        if (hit == "ENGLISH") {
                            setLang(1);
                        } else {
                            setLang(0);
                        }
                    }
                })
                .catch((error) => console.log("error", error));
        } catch (error) {
            console.log(error, "finalcatch error");
        }
    };

    useEffect(() => {
        gamelangApi();
        playimgApi()
    }, []);


    // useEffect(() => {
    //     if (socket) {
    //         socket.emit(
    //             "joinGame",
    //             { gameId: gameid, userId: userid }
    //         );
    //     }
    // }, [socket]);

    // alert(gameid)

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
                        <AntDesign name="arrowleft" size={24} color="white" />
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

                        <Text style={{ color: '#fff', alignSelf: 'center', fontSize: 16 }}>{`${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`}</Text>

                    </View>
                </View>
            </View>

            <ScrollView>
                {hit == "HINDI" ? (
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
                                    uri: `https://quiz.metablocktechnologies.org/uploads/${imgData}`,
                                }}
                                style={{
                                    borderWidth: 1,
                                    height: responsiveHeight(28),
                                    borderRadius: 10,
                                    marginTop: 15,
                                    width: responsiveWidth(90),
                                    alignSelf: "center",
                                    resizeMode: 'center'
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

                {hit == "ENGLISH" ? (
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
                                source={require("../images/inst.png")}
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
                                setLang(0), setHit("HINDI"), langApi();
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
                                setLang(1), setHit("ENGLISH"), gamelangApi;
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
                    onPress={() => {
                        gamelangApi();
                    }}
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
