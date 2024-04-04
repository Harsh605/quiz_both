import { View, Text, TouchableOpacity, Image, StatusBar, ScrollView, TextInput, AppState } from "react-native";
import React, { useState, useEffect, useRef } from "react";
import {
    responsiveHeight,
    responsiveWidth,
} from "react-native-responsive-dimensions";
import { } from "react-native-gesture-handler";
import { RadioButton } from "react-native-paper";
import { useSocket } from "./Context/SocketContext";
import { disabled } from "deprecated-react-native-prop-types/DeprecatedTextPropTypes";
import io from 'socket.io-client';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation, useIsFocused, useRoute } from '@react-navigation/native'
import Modal from "react-native-modal";
import { AntDesign } from "@expo/vector-icons";
import { base_url } from "./Base_url";
import { SafeAreaView } from 'react-native-safe-area-context';
import { BarChart } from 'react-native-chart-kit';
import PieChart from 'react-native-pie-chart';
import { useDispatch, useSelector } from "react-redux";
import { quizPageEachQuestionLeaderBoard } from "../../slices/quizSlice";
import { winnersListPageAllDataOfAUserForParticularExam } from "../../slices/examSlice";
import { modifyNumber } from "../utils/changeSignleDigit";

const MyLeaderBoard2 = ({ navigation, route }) => {
    const dispatch = useDispatch()
    const socket = useSocket();
    const { gameId, userId, selectedQuestionLanguage, examScheduleTime } = route.params

    const [questionData, setQuestionData] = useState(null)
    const [isQuestionSave, setIsQuestionSave] = useState(false)

    const [selectedOption, setSelectedOption] = useState("")
    const [selectedRightOrWrong, setSelectedRightOrWrong] = useState(null)
    const [selectedCorrectPercent, setSelectedCorrectPercent] = useState(null)
    const [answerSubmitTime, setAnswerSubmitTime] = useState(null)

    const [nextQuestionTimer, setNextQuestionTimer] = useState(questionData?.t)
    const [rowPointsValue, setRowPointsValue] = useState(0);
    const [remainingTimeAfterSave, setRemainingTimeAfterSave] = useState(0)
    const [questionSubmitExactTiming, setQuestionSubmitExactTiming] = useState(0)
    const [questionIntervalCounter, setQuestionIntervalCounter] = useState(questionData?.interval);

    const [modalForLeaderBoard, setModalForLeaderBoard] = useState(false);
    const [modalForAnalysis, setModalForAnalysis] = useState(false);

    const [select, setSelect] = useState('')



    const { winnersListPageAllDataOfAUserForParticularExamData } = useSelector((state) => state.examCustom)

    const options = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    const pieChartWidth = 150;
    const series2 = [`${winnersListPageAllDataOfAUserForParticularExamData?.correctPercentage}`, `${winnersListPageAllDataOfAUserForParticularExamData?.wrongPercentage}`];
    const sliceColor2 = ['#0085FF', '#A8A8A8'];

    const eachLeaderBoardFunc = () => {
        setModalForLeaderBoard(true);
        dispatch(winnersListPageAllDataOfAUserForParticularExam({ gameId, userId, que_no: questionData?.QuestionEnglish.q_no - 1 }))
    };

    const onAnalysisFunc = () => {
        console.log("Modal.............................................................")
        setModalForAnalysis(true)
        dispatch(winnersListPageAllDataOfAUserForParticularExam({ gameId, userId, que_no: questionData?.QuestionEnglish.q_no - 1 }))

    }

    useEffect(() => {
        // Listen for incoming questions from the server
        socket.on('get-question', questionData => {

            setModalForLeaderBoard(false);
            setModalForAnalysis(false);
            setQuestionData(questionData);
            setNextQuestionTimer(questionData.t); // Reset timer for next question
            setSelectedOption(""); // Reset selected option
            setSelectedRightOrWrong(null); // Reset selected right or wrong indicator
            setSelectedCorrectPercent(null);
            setQuestionIntervalCounter(questionData.interval)
            setIsQuestionSave(false);
        });

        return () => {
            // Clean up socket listener
            socket.off('get-question');
        };
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            if (nextQuestionTimer > 0) {
                setNextQuestionTimer(prevRemainingTime => prevRemainingTime - 1);
            } else if (questionIntervalCounter > 0) {
                // If nextQuestionTimer is 0 or below, and there are remaining intervals, decrement the counter
                setQuestionIntervalCounter(prevCounter => prevCounter - 1);
            } else if (questionData && questionData.QuestionEnglish.q_no === questionData.noOfQuestion) {
                // Stop the timer and show popup if it's the last question
                clearInterval(interval);
                setNextQuestionTimer(0); // Ensure timer shows 0
                navigation.navigate("Successful")
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [nextQuestionTimer, questionIntervalCounter, questionData]);


    useEffect(() => {
        // Calculate and set rowPointsValue based on selectedRightOrWrong, selectedCorrectPercent, and nextQuestionTimer
        const calculateAndSet = () => {
            const newValue = selectedRightOrWrong === "first" ? (
                (() => {
                    const sum = 5.5 + selectedCorrectPercent + questionSubmitExactTiming;
                    const integerPart = Math.floor(sum);
                    const fractionalPart = sum - integerPart;
                    const integerDigits = integerPart.toString().split('').map(Number);
                    const totalInteger = integerDigits.reduce((acc, curr) => acc + curr, 0);
                    const singleDigitInteger = totalInteger > 9 ? totalInteger - 9 : totalInteger;
                    return singleDigitInteger + fractionalPart;
                })()
            ) :
                selectedRightOrWrong === "second" ? (
                    (() => {
                        const sum = 3.5 + selectedCorrectPercent + questionSubmitExactTiming;
                        const integerPart = Math.floor(sum);
                        const fractionalPart = sum - integerPart;
                        const integerDigits = integerPart.toString().split('').map(Number);
                        const totalInteger = integerDigits.reduce((acc, curr) => acc + curr, 0);
                        const singleDigitInteger = totalInteger > 9 ? totalInteger - 9 : totalInteger;
                        return singleDigitInteger + fractionalPart;
                    })()
                ) :
                    0;

            setRowPointsValue(newValue);
            console.log("New Row Points Value:", newValue); // Log the updated value for debugging
        };

        // Call the calculation function whenever any of these dependencies change
        calculateAndSet();

    }, [selectedRightOrWrong, nextQuestionTimer, selectedCorrectPercent]);


    const submitQuestionAnswer = ({ answerSubmitTimeSend }) => {
        const socket = io('https://quiz.metablocktechnologies.org');
        setQuestionSubmitExactTiming(answerSubmitTimeSend)
        setRemainingTimeAfterSave((questionData.t) - answerSubmitTimeSend)
        if (!selectedRightOrWrong || !selectedOption || !selectedCorrectPercent) {
            alert("Please Fill All Options");
            return;
        }
        setIsQuestionSave(true)
        const type = selectedRightOrWrong === "first" ? "RIGHT" : "WRONG";

        const currentQuestion = selectedQuestionLanguage === "ENGLISH" ?
            questionData.QuestionEnglish :
            questionData.QuestionHindi;


        const question = selectedQuestionLanguage === "ENGLISH" ? questionData.QuestionEnglish.QuestionE : questionData.QuestionHindi.QuestionH;
        console.log({
            questionId: currentQuestion.questionId,
            gameId: gameId,
            userId: userId,
            question: question,
            q_no: currentQuestion.q_no, // Are you sure this is intended? It seems to be the same as 'question'
            answer: selectedOption,
            q_time: questionData?.t,
            schedule: questionData?.schedule, // Changed the key to avoid duplication
            rawPoints: rowPointsValue,
            rM: selectedRightOrWrong === "first" ? 5.5 : selectedRightOrWrong === "second" ? 3.5 : null,
            rC: selectedCorrectPercent,
            timeTaken: answerSubmitTimeSend,
            type: type
        });

        socket.emit("give_answer", {
            questionId: currentQuestion.questionId,
            gameId: gameId,
            userId: userId,
            question: question,
            q_no: currentQuestion.q_no, // Are you sure this is intended? It seems to be the same as 'question'
            answer: selectedOption,
            q_time: questionData?.t,
            schedule: questionData?.schedule, // Changed the key to avoid duplication
            rawPoints: rowPointsValue,
            rM: selectedRightOrWrong === "first" ? 5.5 : selectedRightOrWrong === "second" ? 3.5 : null,
            rC: selectedCorrectPercent,
            timeTaken: answerSubmitTimeSend,
            type: type
        });


        // console.log("setRemainingTimeAfterSave", questionData.t - answerSubmitTimeSend)
        // console.log("questionData.t", questionData.t)
        // console.log("answerSubmitTime", answerSubmitTimeSend)
        // console.log(questionData.interval)
        console.log(selectedQuestionLanguage, "selectedQuestionLanguage.............................................")

    };



    console.log("questionIntervalCounter", questionIntervalCounter)
    console.log("nextQuestionTimer", nextQuestionTimer)
    // console.log("questionData:", questionData)
    // console.log("questionData:", questionData?.QuestionEnglish?.q_no)
    // console.log("questionData:", questionData?.QuestionEnglish.QuestionE)

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
            <ScrollView>
                <View
                    style={{
                        height: responsiveHeight(9),
                        width: responsiveWidth(100),
                        justifyContent: "center",
                        backgroundColor: "#6A5AE0",
                        paddingHorizontal: 20,
                    }}
                >
                    <View
                        style={{ flexDirection: "row", justifyContent: isQuestionSave ? 'flex-end' : 'space-evenly', }}
                    >
                        {(questionData?.QuestionEnglish.q_no !== 1 && (nextQuestionTimer < 18 || questionIntervalCounter < 5)) ? (
                            <TouchableOpacity
                                style={{
                                    height: responsiveHeight(5),
                                    width: responsiveWidth(40),
                                    borderRadius: 10,
                                    backgroundColor: "#EDEAFB",
                                    justifyContent: "center",
                                    marginLeft: "21%",
                                    marginRight: "5%"
                                }}
                                onPress={() => eachLeaderBoardFunc()}
                            >
                                <Text
                                    style={{
                                        color: "#6A5AE0",
                                        fontSize: 20,
                                        fontWeight: "500",
                                        alignSelf: "center",
                                        marginLeft: '15%',

                                    }}
                                >
                                    Leaderboard
                                </Text>
                            </TouchableOpacity>
                        ) : null}


                        <TouchableOpacity
                            style={{
                                height: responsiveHeight(4),
                                alignSelf: "center",
                                justifyContent: "center",
                                borderRadius: 10,
                                width: responsiveWidth(22),
                                borderWidth: 1,
                                borderColor: "#fff",
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
                                {questionData?.QuestionEnglish?.q_no} / {questionData?.noOfQuestion}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View
                    style={{
                        height: responsiveHeight(35),
                        width: responsiveWidth(90),
                        marginBottom: 10,
                        paddingHorizontal: 20,
                        backgroundColor: "#fff",
                        alignSelf: "center",
                        marginTop: 20,
                        borderRadius: 5,
                        elevation: 10,

                    }}
                >
                    <Text
                        style={{
                            marginTop: 20,
                            fontSize: 17,
                            fontWeight: "500",
                            color: "#000",
                        }}
                    >
                        Q. {questionData?.QuestionEnglish?.q_no} {selectedQuestionLanguage === "ENGLISH" ?
                            (questionData?.QuestionEnglish.QuestionE) :
                            (questionData?.QuestionHindi.QuestionH)}
                    </Text>

                    {(selectedQuestionLanguage === "ENGLISH" ? (questionData?.QuestionEnglish.optionH) :
                        (questionData?.QuestionHindi.optionH))?.map((res, index) => {
                            return (
                                <>
                                    <View key={index} style={{ marginTop: 10, flexDirection: "row", marginRight: 20 }}>
                                        <TouchableOpacity
                                            style={{
                                                height: responsiveHeight(3.5),
                                                marginRight: 10,
                                                backgroundColor: selectedOption == res.id ? "#6A5AE0" : "#fff",
                                                width: responsiveWidth(7),
                                                borderWidth: 1,
                                                borderRadius: 100,
                                                justifyContent: "center",
                                            }}
                                            onPress={() => setSelectedOption(res.id)}
                                        >
                                            <Text
                                                style={{
                                                    alignSelf: "center",
                                                    fontWeight: "600",
                                                    fontSize: 18,
                                                    color: selectedOption == res.id ? "#fff" : "#6A5AE0",
                                                }}
                                            >
                                                {res.id}
                                            </Text>
                                        </TouchableOpacity>

                                        <Text style={{ alignSelf: "center", fontSize: 13 }}>
                                            {res.answer}
                                        </Text>
                                    </View>

                                </>
                            )
                        })
                    }

                </View>


                <View
                    style={{
                        height: responsiveHeight(8),
                        flexDirection: "row",
                        width: responsiveWidth(90),
                        marginBottom: 10,
                        paddingHorizontal: 20,
                        backgroundColor: "#fff",
                        alignSelf: "center",
                        marginTop: 7,
                        borderRadius: 5,
                        elevation: 5,
                    }}
                >
                    <View
                        style={{
                            justifyContent: "flex-start",
                            flexDirection: "row",
                            marginTop: 5,
                            marginHorizontal: 20,
                            height: responsiveHeight(7),
                            borderRadius: 10,
                        }}
                    >
                        <View style={{ justifyContent: "center" }}>
                            <RadioButton
                                color="#0085FF"
                                uncheckedColor="#B9C3CC"
                                value="first"
                                status={selectedRightOrWrong === "first" ? "checked" : "unchecked"}
                                onPress={() => { setSelectedRightOrWrong("first") }}
                            />
                        </View>

                        <View style={{ marginLeft: 5, justifyContent: "center" }}>
                            <Text style={{ fontWeight: "500", fontSize: 16 }}>Right</Text>
                        </View>

                        <Image
                            source={require("../images/right2.png")}
                            style={{
                                height: responsiveHeight(2.6),
                                width: responsiveWidth(5.2),
                                alignSelf: "center",
                                marginLeft: 5,
                            }}
                        />
                    </View>

                    <View
                        style={{
                            justifyContent: "flex-start",
                            flexDirection: "row",
                            marginTop: 5,
                            marginHorizontal: 20,
                            height: responsiveHeight(7),
                            borderRadius: 10,
                        }}
                    >
                        <View style={{ justifyContent: "center", marginLeft: 5 }}>
                            <RadioButton
                                color="#0085FF"
                                uncheckedColor="#B9C3CC"
                                value="second"
                                status={selectedRightOrWrong === "second" ? "checked" : "unchecked"}
                                onPress={() => { setSelectedRightOrWrong("second") }}
                            />
                        </View>

                        <View style={{ marginLeft: 5, justifyContent: "center" }}>
                            <Text style={{ fontWeight: "500", fontSize: 16 }}>Wrong</Text>
                        </View>
                        <Image
                            source={require("../images/wrong.png")}
                            style={{
                                height: responsiveHeight(4),
                                width: responsiveWidth(8),
                                alignSelf: "center",
                                marginTop: 4,
                                marginLeft: 5,
                            }}
                        />
                    </View>
                </View>

                <View
                    style={{
                        height: responsiveHeight(15),
                        width: responsiveWidth(90),
                        marginBottom: 10,
                        paddingHorizontal: 20,
                        backgroundColor: "#fff",
                        alignSelf: "center",
                        marginTop: 7,
                        borderRadius: 5,
                        elevation: 5,
                    }}
                >
                    <Text
                        style={{
                            marginTop: 10,
                            fontSize: 18,
                            fontWeight: "500",
                            color: "#000",
                        }}
                    >
                        Correct %
                    </Text>

                    <View
                        style={{
                            marginTop: 10,
                        }}
                    >
                        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                            {options.slice(0, 5).map((option, index) => (
                                <TouchableOpacity
                                    key={index}
                                    style={{
                                        height: responsiveHeight(3),
                                        justifyContent: "center",
                                        backgroundColor: selectedCorrectPercent === index ? "#000" : "#fff",
                                        width: responsiveWidth(12), // Adjust width to fit 5 buttons in a row
                                        borderWidth: 1,
                                        borderRadius: 5,
                                    }}
                                    onPress={() => { setSelectedCorrectPercent(index) }}
                                >
                                    <Text
                                        style={{
                                            alignSelf: "center",
                                            fontWeight: "600",
                                            fontSize: 15,
                                            color: selectedCorrectPercent === index ? "#fff" : "#000",
                                        }}
                                    >
                                        {option}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>

                        {/* Second half of options */}
                        <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 10 }}>
                            {options.slice(5).map((option, index) => (
                                <TouchableOpacity
                                    key={index + 5} // Adjust the key to avoid duplicate keys
                                    style={{
                                        height: responsiveHeight(3),
                                        justifyContent: "center",
                                        backgroundColor: selectedCorrectPercent === index + 5 ? "#000" : "#fff",
                                        width: responsiveWidth(12), // Adjust width to fit 5 buttons in a row
                                        borderWidth: 1,
                                        borderRadius: 5,
                                    }}
                                    onPress={() => { setSelectedCorrectPercent(index + 5) }}
                                >
                                    <Text
                                        style={{
                                            alignSelf: "center",
                                            fontWeight: "600",
                                            fontSize: 15,
                                            color: selectedCorrectPercent === index + 5 ? "#fff" : "#000",
                                        }}
                                    >
                                        {option}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>
                </View>

                <View
                    style={{
                        flexDirection: "row",
                        marginBottom: 10,
                        justifyContent: "space-between",
                        marginHorizontal: 20,
                    }}
                >
                    <View
                        style={{
                            height: responsiveHeight(25),
                            elevation: 10,
                            borderRadius: 10,
                            width: responsiveWidth(55),
                            backgroundColor: "#fff",
                        }}
                    >
                        <Text
                            style={{
                                alignSelf: "center",
                                marginTop: 7,
                                fontSize: 14,
                                fontWeight: "500",
                            }}
                        >
                            Row point Panel
                        </Text>

                        <View style={{ borderBottomWidth: 0.6, padding: 4 }}></View>

                        <View
                            style={{
                                flexDirection: "row",
                                marginTop: 7,
                                justifyContent: "space-between",
                                marginHorizontal: 20,
                            }}
                        >
                            <View>
                                <Text style={{ fontWeight: "500", fontSize: 15 }}>M</Text>
                                <Text
                                    style={{
                                        fontWeight: "500",
                                        fontSize: 15,
                                        alignSelf: "center",
                                        marginTop: 5,
                                        color: "#6A5AE0"
                                    }}
                                >
                                    {selectedRightOrWrong === "first" ? 5.5 : selectedRightOrWrong === "second" ? "3.5" : null}
                                </Text>
                            </View>

                            <View>
                                <Text style={{ fontWeight: "500", fontSize: 15 }}>C%</Text>
                                {options.map((option, index) => (
                                    selectedCorrectPercent === index && (
                                        <Text
                                            key={index}
                                            style={{
                                                fontWeight: "500",
                                                fontSize: 15,
                                                alignSelf: "center",
                                                marginTop: 5,
                                                color: "#6A5AE0"
                                            }}
                                        >
                                            {option}
                                        </Text>
                                    )
                                ))}
                            </View>


                            <View>
                                <Text style={{ fontWeight: "500", fontSize: 15 }}>T(Time)</Text>
                                <Text
                                    style={{
                                        fontWeight: "500",
                                        fontSize: 15,
                                        alignSelf: "center",
                                        marginTop: 5,
                                    }}
                                >
                                    {isQuestionSave ? questionSubmitExactTiming : 0}
                                    {/* {nextQuestionTimer} */}
                                </Text>
                            </View>
                        </View>


                        <View style={{ borderBottomWidth: 0.6, padding: 4 }}></View>


                        <View
                            style={{
                                flexDirection: "row",
                                marginTop: 10,
                                justifyContent: "space-between",
                                marginHorizontal: 20,
                            }}
                        >
                            <TouchableOpacity
                                style={{
                                    height: responsiveHeight(3.5),
                                    justifyContent: "center",
                                    width: responsiveWidth(11),
                                    borderWidth: 1,
                                    borderRadius: 5,
                                }}
                            >
                                <Text
                                    style={{
                                        alignSelf: "center",
                                        fontWeight: "600",
                                        fontSize: 15,
                                        color: "#6A5AE0"
                                    }}
                                >
                                    {
                                        selectedRightOrWrong === "first" ? (
                                            (5.5 + selectedCorrectPercent) > 9 ?
                                                ((5.5 + selectedCorrectPercent) % 10) + Math.floor((5.5 + selectedCorrectPercent) / 10) :
                                                (5.5 + selectedCorrectPercent)
                                        ) :
                                            selectedRightOrWrong === "second" ? (
                                                (3.5 + selectedCorrectPercent) > 9 ?
                                                    ((3.5 + selectedCorrectPercent) % 10) + Math.floor((3.5 + selectedCorrectPercent) / 10) :
                                                    (3.5 + selectedCorrectPercent)
                                            ) :
                                                0
                                    }

                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{
                                    height: responsiveHeight(3.5),
                                    justifyContent: "center",
                                    width: responsiveWidth(8),
                                    borderWidth: 1,
                                    borderRadius: 5,
                                }}
                            >
                                <Text
                                    style={{
                                        alignSelf: "center",
                                        fontWeight: "600",
                                        fontSize: 15,
                                    }}
                                >
                                    +
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={{
                                    height: responsiveHeight(3.5),
                                    justifyContent: "center",
                                    width: responsiveWidth(8),
                                    borderWidth: 1,
                                    borderRadius: 5,
                                }}
                            >
                                <Text
                                    style={{
                                        alignSelf: "center",
                                        fontWeight: "600",
                                        fontSize: 15,
                                    }}
                                >
                                    {/* {formatTime(nextQuestionTimer)} */}
                                    {isQuestionSave ? modifyNumber(questionSubmitExactTiming) : 0}
                                    {/* {nextQuestionTimer} */}
                                </Text>
                            </TouchableOpacity>
                        </View>



                        <TouchableOpacity
                            style={{
                                height: responsiveHeight(4),
                                alignSelf: "center",
                                marginTop: 15,
                                justifyContent: "center",
                                width: responsiveWidth(28),
                                borderWidth: 1,
                                borderRadius: 5,
                            }}
                        >
                            <Text
                                style={{ alignSelf: "center", fontWeight: "600", fontSize: 15 }}
                            >
                                {rowPointsValue}


                            </Text>
                        </TouchableOpacity>

                    </View>



                    <View
                        style={{
                            height: responsiveHeight(25),
                            width: responsiveWidth(35),
                            backgroundColor: "#fff",
                        }}
                    >
                        <Text
                            style={{
                                color: "orange",
                                alignSelf: "flex-start",
                                alignSelf: "center",
                                fontWeight: "500",
                                fontSize: 18,
                            }}
                        >
                            {/* {(!isQuestionSave && nextQuestionTimer > 0) ? "Time" : (!isQuestionSave && nextQuestionTimer < 0) ? "Next Que in.." : `Next Que in..`} */}
                            {(!isQuestionSave && nextQuestionTimer > 0) ? "Time" : (isQuestionSave && nextQuestionTimer < 0 && questionData?.QuestionEnglish?.q_no !== questionData?.noOfQuestion) ? "Next Que in.." : (!isQuestionSave && questionData?.QuestionEnglish?.q_no === questionData?.noOfQuestion) ? "Exam Ends In.." : (isQuestionSave && questionData?.QuestionEnglish?.q_no === questionData?.noOfQuestion) ? "Exam Ends In.." : `Next Que in..`}
                        </Text>

                        <View
                            style={{
                                flexDirection: "row",
                                justifyContent: "space-between",
                                marginHorizontal: 20,
                                marginTop: 10,
                            }}
                        >
                            <TouchableOpacity
                                style={{
                                    height: responsiveHeight(4),
                                    alignSelf: "center",
                                    borderColor: "green",
                                    justifyContent: "center",
                                    width: responsiveWidth(9),
                                    borderWidth: 1,
                                    borderRadius: 5,
                                }}
                            >
                                <Text
                                    style={{
                                        alignSelf: "center",
                                        fontWeight: "600",
                                        fontSize: 15,
                                        color: "green",
                                    }}
                                >
                                    {(!isQuestionSave && nextQuestionTimer > 0) ? nextQuestionTimer : (!isQuestionSave && nextQuestionTimer <= 0) ? questionIntervalCounter : nextQuestionTimer + questionIntervalCounter}
                                    {/* {(!isQuestionSave && nextQuestionTimer > 0) ? formatTime(nextQuestionTimer) : (!isQuestionSave && nextQuestionTimer <= 0) ? questionIntervalCounter : formatTime(nextQuestionTimer) + questionIntervalCounter} */}
                                </Text>
                            </TouchableOpacity>

                            <Text
                                style={{
                                    alignSelf: "center",
                                    fontWeight: "900",
                                    color: "green",
                                }}
                            >
                                :
                            </Text>

                            <TouchableOpacity
                                style={{
                                    height: responsiveHeight(4),
                                    alignSelf: "center",
                                    borderColor: "green",
                                    justifyContent: "center",
                                    width: responsiveWidth(9),
                                    marginRight: "5%",
                                    borderWidth: 1,
                                    borderRadius: 5,
                                }}
                            >
                                <Text
                                    style={{
                                        alignSelf: "center",
                                        fontWeight: "600",
                                        fontSize: 15,
                                        color: "green",
                                    }}
                                >
                                    0
                                </Text>
                            </TouchableOpacity>
                        </View>

                        <View>
                            {!isQuestionSave && nextQuestionTimer > 0 && questionIntervalCounter === 5 ?
                                <TouchableOpacity
                                    // disabled={btndisebal}
                                    style={{
                                        height: responsiveHeight(5),
                                        marginTop: "30%",
                                        alignSelf: "center",
                                        justifyContent: "center",
                                        borderRadius: 5,
                                        width: responsiveWidth(22),
                                        backgroundColor: "#6A5AE0",
                                    }}
                                    onPress={() => { submitQuestionAnswer({ answerSubmitTimeSend: nextQuestionTimer }) }}
                                // onPress={() => { handleStopTimer(), savebtn() }}
                                >
                                    <Text
                                        style={{
                                            color: "#fff",
                                            fontWeight: "400",
                                            alignSelf: "center",
                                            fontSize: 16,
                                        }}
                                    >
                                        <><Text>Save</Text></>

                                    </Text>
                                </TouchableOpacity>
                                : null
                            }

                            {(questionData?.QuestionEnglish.q_no !== 1 && (nextQuestionTimer < 18 || questionIntervalCounter < 5)) ?
                                <TouchableOpacity
                                    style={{
                                        height: responsiveHeight(5),
                                        alignSelf: "center",
                                        marginTop: isQuestionSave ? "15%" : "5%",
                                        justifyContent: "center",
                                        borderRadius: 5,
                                        width: responsiveWidth(22),
                                        backgroundColor: "#6A5AE0",
                                    }}
                                    // onPress={() => navigation.navigate("Analysis")}
                                    onPress={() => onAnalysisFunc()}
                                >
                                    <Text
                                        style={{
                                            color: "#fff",
                                            fontWeight: "400",
                                            alignSelf: "center",
                                            fontSize: 16,
                                        }}
                                    >
                                        Analysis
                                    </Text>
                                </TouchableOpacity>
                                : null}

                        </View>
                    </View>
                </View>



            </ScrollView>

            <Modal style={{ width: '100%', marginLeft: 0, marginBottom: 0, height: '100%', marginTop: 0 }}
                visible={modalForLeaderBoard}
                animationType="slide"
                onRequestClose={() => setModalForLeaderBoard(false)}

            >
                <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
                    <View
                        style={{
                            height: responsiveHeight(8),
                            width: responsiveWidth(100),
                            justifyContent: "center",
                            backgroundColor: "#6A5AE0",
                            paddingHorizontal: 20,
                        }}
                    >
                        <View style={{ flexDirection: "row", justifyContent: "flex-start" }}>
                            <TouchableOpacity
                                onPress={() => setModalForLeaderBoard(false)}
                                style={{
                                    justifyContent: "center",
                                    alignSelf: "flex-start",
                                    marginTop: "3%",
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
                                    marginTop: "3%",
                                    marginLeft: "5%",
                                }}
                            >
                                LeaderBoard Ranks
                            </Text>
                        </View>
                    </View>

                    <View
                        style={{
                            height: responsiveHeight(8.1),
                            flexDirection: "row",
                            width: responsiveWidth(95),
                            alignSelf: "center",
                            marginTop: 20,
                            borderRadius: 10,
                            backgroundColor: "#6A5AE0",
                        }}
                    >
                        <View
                            style={{
                                backgroundColor: "#fff",
                                height: responsiveHeight(5.5),
                                width: responsiveWidth(70),
                                borderRadius: 10,
                                justifyContent: "center",
                                marginTop: 10,
                                flexDirection: "row",
                                marginHorizontal: 20,
                            }}
                        >
                            <View
                                style={{
                                    flex: 0.15,
                                    justifyContent: "center",
                                    alignSelf: "center",
                                }}
                            >
                                <Image
                                    source={require("../images/search.png")}
                                    style={{
                                        tintColor: "#C0C0C0",
                                        height: responsiveHeight(3),
                                        width: responsiveWidth(6),
                                        marginLeft: 10,
                                    }}
                                />
                            </View>

                            <View
                                style={{
                                    flex: 0.8,
                                    justifyContent: "center",
                                    alignSelf: "center",
                                }}
                            >
                                <TextInput
                                    require
                                    placeholder="Search here.."
                                    placeholderTextColor={"#000"}
                                    style={{
                                        color: "#000",
                                        marginLeft: 15,
                                        fontWeight: "400",
                                        fontSize: 17,
                                        fontFamily: "Jaldi-Regular",
                                    }}
                                />
                            </View>
                        </View>

                        <View style={{ alignSelf: "center" }}>
                            <Image
                                source={require("../images/calender.png")}
                                style={{
                                    tintColor: "#fff",
                                    height: responsiveHeight(4),
                                    width: responsiveWidth(8),
                                    marginLeft: 10,
                                }}
                            />
                        </View>
                    </View>

                    <View
                        style={{
                            height: responsiveHeight(42),
                            width: responsiveWidth(90),
                            marginBottom: 10,
                            paddingHorizontal: 20,
                            backgroundColor: "#fff",
                            alignSelf: "center",
                            borderBottomLeftRadius: 8,
                            borderBottomRightRadius: 8,
                        }}
                    >
                        <View
                            style={{
                                height: responsiveHeight(42),
                                width: responsiveWidth(95),
                                marginBottom: 10,
                                paddingHorizontal: 20,
                                backgroundColor: "#fff",
                                alignSelf: "center",
                                borderBottomLeftRadius: 8,
                                borderBottomRightRadius: 8,

                            }}
                        >
                            <View
                                style={{
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                    height: responsiveHeight(6),
                                    width: responsiveWidth(90),
                                    borderRadius: 2,
                                    marginTop: 10,
                                    backgroundColor: "#fff",
                                    alignSelf: "center",
                                }}
                            >
                                <Text
                                    style={{ alignSelf: "center", color: "#000", fontWeight: "500" }}
                                >
                                    Rank
                                </Text>

                                <Text
                                    style={{
                                        alignSelf: "center",
                                        color: "#000",
                                        fontWeight: "500",
                                        marginLeft: 10,
                                        marginRight: 30
                                    }}
                                >
                                    Name
                                </Text>

                                <Text
                                    style={{
                                        alignSelf: "center",
                                        color: "#000",
                                        fontWeight: "500",
                                        marginRight: 10,
                                    }}
                                >
                                    Id
                                </Text>


                                <Text
                                    style={{ alignSelf: "center", color: "#000", fontWeight: "500" }}
                                >
                                    Point
                                </Text>
                            </View>

                            {
                                winnersListPageAllDataOfAUserForParticularExamData?.questionleaderShip?.sort((a, b) => a?.rank - b?.rank).map((res, index) => {
                                    // console.log(res);
                                    return (
                                        <>
                                            <TouchableOpacity
                                                key={index}
                                                style={{
                                                    flexDirection: "row",
                                                    justifyContent: "space-between",
                                                    height: responsiveHeight(6),
                                                    width: responsiveWidth(90),
                                                    paddingHorizontal: 10,
                                                    borderRadius: 2,
                                                    marginTop: 5,
                                                    backgroundColor: "#EDEAFB",
                                                    alignSelf: "center",
                                                }}
                                            // onPress={() => navigation.navigate("AllQuestion", { id: (res.User[0].id) })}
                                            >
                                                <Text style={{ alignSelf: "center", color: "#6A5AE0", flex: 0.25 }}>{res?.rank}</Text>
                                                <Text style={{ alignSelf: "center", color: "#000", flex: 0.25 }}>{res?.User?.name ? res?.User?.name : "-"}</Text>
                                                <Text style={{ alignSelf: "center", color: "green", flex: 0.25 }}>{res?.User?.id}</Text>


                                                <Text
                                                    style={{ alignSelf: "center", color: "#000", fontWeight: "500", flex: 0.10 }}
                                                >
                                                    {res?.mainPoints}
                                                </Text>
                                            </TouchableOpacity>
                                        </>
                                    )
                                })
                            }

                        </View>



                    </View>
                </SafeAreaView>
            </Modal>

            <Modal style={{ width: '100%', marginLeft: 0, top: 0, height: responsiveHeight(100), backgroundColor: '#fff' }}
                visible={modalForAnalysis}
                animationType="slide"
                onRequestClose={() => setModalForAnalysis(false)}

            >
                <SafeAreaView>
                    <StatusBar translucent={true} barStyle={'light-content'} backgroundColor={'#6A5AE0'} />

                    <View style={{ height: responsiveHeight(7), width: responsiveWidth(100), justifyContent: 'center', backgroundColor: '#6A5AE0', paddingHorizontal: 20 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
                            <TouchableOpacity onPress={() => setModalForAnalysis(false)} style={{ justifyContent: 'center', alignSelf: 'flex-start', marginTop: 15 }}>
                                <AntDesign name="arrowleft" size={24} color="white" />
                            </TouchableOpacity>

                            <Text style={{ color: '#fff', fontSize: 20, fontWeight: '500', alignSelf: 'center', marginTop: 15, marginLeft: '26%' }}>Question Analysis</Text>
                        </View>
                    </View>



                    <ScrollView style={{ marginBottom: 0 }}>


                        <View style={{ height: responsiveHeight(32), width: responsiveWidth(90), marginBottom: 10, paddingHorizontal: 20, backgroundColor: '#fff', alignSelf: 'center', marginTop: 10, borderRadius: 8, elevation: 10 }}>
                            <Text style={{ marginTop: 20, fontSize: 17, fontWeight: '500', color: '#000' }}>Q. {winnersListPageAllDataOfAUserForParticularExamData?.question}</Text>
                            {winnersListPageAllDataOfAUserForParticularExamData?.options?.map((res, index) => {
                                return (
                                    <>
                                        <View key={index} style={{ marginTop: 10, flexDirection: 'row', marginRight: 20 }}>
                                            <TouchableOpacity style={{
                                                height: responsiveHeight(3.5), marginRight: 10,
                                                backgroundColor:
                                                    res.id === winnersListPageAllDataOfAUserForParticularExamData?.answer
                                                        ? 'green' // Real answer shown in green
                                                        : winnersListPageAllDataOfAUserForParticularExamData?.UserQuestion?.answer === res.id
                                                            ? 'red' // Wrong answer given, option turns red
                                                            : select === res.id // If option is selected
                                                                ? '#0085FF' // Blueish color
                                                                : '#6A5AE0', // All other options in blueish color
                                                width: responsiveWidth(7), borderWidth: 1, borderRadius: 100, justifyContent: 'center'
                                            }}
                                                onPress={() => setSelect(0)}>
                                                <Text style={{ alignSelf: 'center', fontWeight: '600', fontSize: 18, color: select == 0 ? '#fff' : '#6A5AE0' }}>{res.id}</Text>
                                            </TouchableOpacity>

                                            <Text style={{
                                                alignSelf: 'center', fontSize: 13, color:
                                                    res.id === winnersListPageAllDataOfAUserForParticularExamData?.answer
                                                        ? 'green' // Real answer shown in green
                                                        : winnersListPageAllDataOfAUserForParticularExamData?.UserQuestion?.answer === res.id
                                                            ? 'red' // Wrong answer given, text turns red
                                                            : '#000000' // All other text colors
                                            }}>
                                                {res?.answer}
                                            </Text>
                                        </View>
                                    </>
                                )
                            })

                            }

                        </View>

                        <View
                            style={{
                                height: responsiveHeight(8),
                                flexDirection: "row",
                                width: responsiveWidth(90),
                                marginBottom: 10,
                                paddingHorizontal: 20,
                                backgroundColor: "#fff",
                                alignSelf: "center",
                                marginTop: 7,
                                borderRadius: 5,
                                elevation: 5,
                            }}
                        >
                            <View
                                style={{
                                    justifyContent: "flex-start",
                                    flexDirection: "row",
                                    marginTop: 5,
                                    marginHorizontal: 20,
                                    height: responsiveHeight(7),
                                    borderRadius: 10,
                                }}
                            >
                                <View style={{ justifyContent: "center" }}>
                                    <RadioButton
                                        color="#0085FF"
                                        uncheckedColor="#B9C3CC"
                                        value="5"
                                        status={winnersListPageAllDataOfAUserForParticularExamData?.UserQuestion?.rM == 5.5 ? "checked" : "unchecked"}
                                    />
                                </View>

                                <View style={{ marginLeft: 5, justifyContent: "center" }}>
                                    <Text style={{ fontWeight: "500", fontSize: 16 }}>Right</Text>
                                </View>

                                <Image
                                    source={require("../images/right2.png")}
                                    style={{
                                        height: responsiveHeight(2.6),
                                        width: responsiveWidth(5.2),
                                        alignSelf: "center",
                                        marginLeft: 5,
                                    }}
                                />
                            </View>

                            <View
                                style={{
                                    justifyContent: "flex-start",
                                    flexDirection: "row",
                                    marginTop: 5,
                                    marginHorizontal: 20,
                                    height: responsiveHeight(7),
                                    borderRadius: 10,
                                }}
                            >
                                <View style={{ justifyContent: "center", marginLeft: 5 }}>
                                    <RadioButton
                                        color="#0085FF"
                                        uncheckedColor="#B9C3CC"
                                        value="second"
                                        status={winnersListPageAllDataOfAUserForParticularExamData?.UserQuestion?.rM === 3.5 ? "checked" : "unchecked"}
                                    />
                                </View>

                                <View style={{ marginLeft: 5, justifyContent: "center" }}>
                                    <Text style={{ fontWeight: "500", fontSize: 16 }}>Wrong</Text>
                                </View>
                                <Image
                                    source={require("../images/wrong.png")}
                                    style={{
                                        height: responsiveHeight(4),
                                        width: responsiveWidth(8),
                                        alignSelf: "center",
                                        marginTop: 4,
                                        marginLeft: 5,
                                    }}
                                />
                            </View>
                        </View>




                        <View
                            style={{
                                height: responsiveHeight(12),
                                width: responsiveWidth(90),
                                marginBottom: 10,
                                paddingHorizontal: 20,
                                backgroundColor: "#fff",
                                alignSelf: "center",
                                marginTop: 7,
                                borderRadius: 5,
                                elevation: 5,
                            }}
                        >
                            <Text
                                style={{
                                    marginTop: 10,
                                    fontSize: 18,
                                    fontWeight: "500",
                                    color: "#000",
                                }}
                            >
                                Correct %
                            </Text>

                            <View
                                style={{
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                    marginTop: 10,
                                }}
                            >
                                {options.map((option, index) => (
                                    <TouchableOpacity
                                        key={index}
                                        style={{
                                            height: responsiveHeight(3),
                                            justifyContent: "center",
                                            backgroundColor: winnersListPageAllDataOfAUserForParticularExamData?.UserQuestion?.rC === index && !(winnersListPageAllDataOfAUserForParticularExamData?.UserQuestion?.answer === 5) ? "#000" : "#fff",
                                            width: responsiveWidth(6),
                                            borderWidth: 1,
                                            borderRadius: 5,
                                        }}
                                    // onPress={() => onPress(index)}
                                    >
                                        <Text
                                            style={{
                                                alignSelf: "center",
                                                fontWeight: "600",
                                                fontSize: 15,
                                                color: winnersListPageAllDataOfAUserForParticularExamData?.UserQuestion?.rC === index && !(winnersListPageAllDataOfAUserForParticularExamData?.UserQuestion?.answer === 5) ? "#fff" : "#000",
                                            }}
                                        >
                                            {option}
                                        </Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        </View>

                        <View
                            style={{
                                height: responsiveHeight(40),
                                elevation: 10,
                                borderRadius: 10,
                                width: responsiveWidth(90),
                                backgroundColor: "#fff",
                                alignSelf: 'center'
                            }}
                        >
                            <Text
                                style={{
                                    alignSelf: "center",
                                    marginTop: 12,
                                    fontSize: 14,
                                    fontWeight: "500",
                                }}
                            >
                                Row Point Panel
                            </Text>

                            <View style={{ borderBottomWidth: 0.6, padding: 4 }}></View>

                            <View
                                style={{
                                    flexDirection: "row",
                                    marginTop: 7,
                                    justifyContent: "space-between",
                                    marginHorizontal: 20,
                                }}
                            >
                                <View>
                                    <Text style={{ fontWeight: "500", fontSize: 15 }}>M</Text>

                                    <Text
                                        style={{
                                            fontWeight: "500",
                                            fontSize: 15,
                                            alignSelf: "center",
                                            marginTop: 5,
                                            color: "#0085FF"
                                        }}
                                    >
                                        {winnersListPageAllDataOfAUserForParticularExamData?.UserQuestion?.rM}
                                    </Text>
                                </View>

                                <View>
                                    <Text style={{ fontWeight: "500", fontSize: 15 }}>C%</Text>
                                    <Text
                                        style={{
                                            fontWeight: "500",
                                            fontSize: 15,
                                            alignSelf: "center",
                                            marginTop: 5,
                                            color: "#0085FF"
                                        }}
                                    >
                                        {winnersListPageAllDataOfAUserForParticularExamData?.UserQuestion?.rC}
                                    </Text>

                                </View>



                                <View>
                                    <Text style={{ fontWeight: "500", fontSize: 15 }}>T(Time)</Text>
                                    <Text
                                        style={{
                                            fontWeight: "500",
                                            fontSize: 15,
                                            alignSelf: "center",
                                            marginTop: 5,
                                        }}
                                    >
                                        {winnersListPageAllDataOfAUserForParticularExamData?.UserQuestion?.timeTaken}
                                    </Text>
                                </View>
                            </View>

                            <View style={{ borderBottomWidth: 0.6, marginTop: 4 }}></View>


                            <View style={{ flexDirection: 'row', justifyContent: 'flex-start', marginLeft: 20, marginTop: 5 }}>
                                <View style={{ transform: [{ rotate: '47deg' }] }}>
                                    <Image source={require('../images/line.png')} style={{ height: responsiveHeight(5), width: responsiveWidth(16) }} />
                                </View>

                                <View style={{ transform: [{ rotate: '130deg' }] }}>
                                    <Image source={require('../images/line.png')} style={{ height: responsiveHeight(5), width: responsiveWidth(14), marginRight: 20 }} />
                                </View>

                                <View style={{ transform: [{ rotate: '38deg' }], marginTop: 5 }}>
                                    <Image source={require('../images/line.png')} style={{ height: responsiveHeight(5), width: responsiveWidth(22) }} />
                                </View>

                                <View style={{ transform: [{ rotate: '130deg' }] }}>
                                    <Image source={require('../images/line.png')} style={{ height: responsiveHeight(5), width: responsiveWidth(16), marginRight: 20 }} />
                                </View>




                            </View>

                            <View
                                style={{
                                    flexDirection: "row",
                                    marginTop: 5,
                                    justifyContent: 'space-evenly',
                                    marginHorizontal: 20, marginLeft: 10
                                }}
                            >
                                <TouchableOpacity
                                    style={{
                                        height: responsiveHeight(3.5),
                                        justifyContent: "center",
                                        width: responsiveWidth(11),
                                        borderWidth: 1,
                                        borderRadius: 5,
                                    }}
                                >
                                    <Text
                                        style={{
                                            alignSelf: "center",
                                            fontWeight: "600",
                                            fontSize: 15,
                                            color: "#0085FF"
                                        }}
                                    >
                                        {winnersListPageAllDataOfAUserForParticularExamData?.UserQuestion?.rMrC}
                                    </Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={{
                                        height: responsiveHeight(3.5),
                                        justifyContent: "center",
                                        width: responsiveWidth(8),
                                        borderWidth: 1,
                                        borderRadius: 5,
                                    }}
                                >
                                    <Text
                                        style={{
                                            alignSelf: "center",
                                            fontWeight: "600",
                                            fontSize: 15,
                                        }}
                                    >
                                        +
                                    </Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={{
                                        height: responsiveHeight(3.5),
                                        justifyContent: "center",
                                        width: responsiveWidth(8),
                                        borderWidth: 1,
                                        borderRadius: 5,
                                    }}
                                >
                                    <Text
                                        style={{
                                            alignSelf: "center",
                                            fontWeight: "600",
                                            fontSize: 15,
                                        }}
                                    >
                                        {modifyNumber(winnersListPageAllDataOfAUserForParticularExamData?.UserQuestion?.timeTaken)}
                                    </Text>

                                </TouchableOpacity>
                            </View>

                            <View style={{ flexDirection: 'row', justifyContent: 'center', marginLeft: 0, marginTop: 10 }}>
                                <View style={{ transform: [{ rotate: '47deg' }] }}>
                                    <Image source={require('../images/line.png')} style={{ height: responsiveHeight(5), width: responsiveWidth(20) }} />
                                </View>

                                <View style={{ transform: [{ rotate: '130deg' }] }}>
                                    <Image source={require('../images/line.png')} style={{ height: responsiveHeight(5), width: responsiveWidth(20), marginRight: 20 }} />
                                </View>
                            </View>

                            <TouchableOpacity
                                style={{
                                    height: responsiveHeight(4),
                                    alignSelf: "center",
                                    marginTop: 15,
                                    justifyContent: "center",
                                    width: responsiveWidth(28),
                                    borderWidth: 1,
                                    borderRadius: 5,
                                }}
                            >
                                <Text
                                    style={{ alignSelf: "center", fontWeight: "600", fontSize: 15 }}
                                >{winnersListPageAllDataOfAUserForParticularExamData?.UserQuestion?.rawPoints}</Text>
                            </TouchableOpacity>
                        </View>


                        <View style={{ height: responsiveHeight(95), elevation: 10, marginBottom: '10%', marginTop: 20, width: responsiveWidth(90), borderRadius: 10, backgroundColor: '#fff', alignSelf: 'center' }}>
                            <Text style={{ alignSelf: 'center', fontSize: 20, marginTop: 10, fontWeight: '500' }}>Answer Analysis</Text>

                            <View style={{ height: responsiveHeight(10), elevation: 10, marginTop: 20, width: responsiveWidth(90), borderRadius: 10, backgroundColor: '#fff', alignSelf: 'center' }}>

                                <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
                                    <Text style={{ fontSize: 15, marginTop: 10, marginHorizontal: 20 }}>Correct Answer : -</Text>
                                    <View style={{ alignSelf: 'center', marginTop: 10, height: responsiveHeight(3), width: responsiveWidth(10), borderWidth: 0.5, borderRadius: 5 }}>
                                        <Text style={{ alignSelf: 'center' }}>{winnersListPageAllDataOfAUserForParticularExamData?.answer}</Text>
                                    </View>
                                </View>

                                <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
                                    <Text style={{ fontSize: 15, marginTop: 10, marginHorizontal: 20 }}>Your Answer      : -</Text>
                                    <View style={{ alignSelf: 'center', marginTop: 10, height: responsiveHeight(3), width: responsiveWidth(10), borderWidth: 0.5, borderRadius: 5 }}>
                                        <Text style={{ alignSelf: 'center' }}>{winnersListPageAllDataOfAUserForParticularExamData?.UserQuestion?.answer === 5 ? "None" : winnersListPageAllDataOfAUserForParticularExamData?.UserQuestion?.answer}</Text>
                                    </View>
                                </View>
                            </View>


                            <View
                                style={{
                                    height: responsiveHeight(40),
                                    elevation: 10,
                                    borderRadius: 10,
                                    width: responsiveWidth(90),
                                    backgroundColor: "#fff",
                                    alignSelf: 'center',
                                    marginTop: 10
                                }}
                            >
                                <Text
                                    style={{
                                        alignSelf: "center",
                                        marginTop: 12,
                                        fontSize: 14,
                                        fontWeight: "500",
                                    }}
                                >
                                    Main Point Panel
                                </Text>

                                <View style={{ borderBottomWidth: 0.6, padding: 4 }}></View>

                                <View
                                    style={{
                                        flexDirection: "row",
                                        marginTop: 7,
                                        justifyContent: "space-between",
                                        marginHorizontal: 20,
                                    }}
                                >
                                    <View>
                                        <Text style={{ fontWeight: "500", fontSize: 15 }}>M</Text>

                                        <Text
                                            style={{
                                                fontWeight: "500",
                                                fontSize: 15,
                                                alignSelf: "center",
                                                marginTop: 5,
                                                color: "#0085FF"
                                            }}
                                        >
                                            {winnersListPageAllDataOfAUserForParticularExamData?.UserQuestion?.mM}
                                        </Text>
                                    </View>

                                    <View>
                                        <Text style={{ fontWeight: "500", fontSize: 15 }}>C%</Text>
                                        <Text
                                            style={{
                                                fontWeight: "500",
                                                fontSize: 15,
                                                alignSelf: "center",
                                                marginTop: 5,
                                                color: "#0085FF"
                                            }}
                                        >
                                            {winnersListPageAllDataOfAUserForParticularExamData?.UserQuestion?.mC}
                                        </Text>

                                    </View>



                                    <View>
                                        <Text style={{ fontWeight: "500", fontSize: 15 }}>T(Time)</Text>
                                        <Text
                                            style={{
                                                fontWeight: "500",
                                                fontSize: 15,
                                                alignSelf: "center",
                                                marginTop: 5,
                                                color: "#0085FF"
                                            }}
                                        >
                                            {winnersListPageAllDataOfAUserForParticularExamData?.UserQuestion?.timeTaken}
                                        </Text>
                                    </View>
                                    <View>
                                        <Text style={{ fontWeight: "500", fontSize: 15 }}>C+T(correct% +T) </Text>
                                        <Text
                                            style={{
                                                fontWeight: "500",
                                                fontSize: 15,
                                                alignSelf: "center",
                                                marginTop: 5,
                                            }}
                                        >
                                            {isNaN(winnersListPageAllDataOfAUserForParticularExamData?.UserQuestion?.mC) || isNaN(winnersListPageAllDataOfAUserForParticularExamData?.UserQuestion?.timeTaken)
                                                ? "0"
                                                : (winnersListPageAllDataOfAUserForParticularExamData?.UserQuestion?.mC + winnersListPageAllDataOfAUserForParticularExamData?.UserQuestion?.timeTaken)}
                                        </Text>
                                    </View>
                                </View>

                                <View style={{ borderBottomWidth: 0.6, marginTop: 4 }}></View>

                                {/* <View style={{ transform: [{ rotate: '140deg'}] }}>
                            <Image source={require('../images/line.png')} style={{ height: responsiveHeight(5), width: responsiveWidth(34),marginRight:20,zIndex:1,position:'absolute'}} />
                        </View> */}


                                <View style={{ flexDirection: 'row', justifyContent: 'flex-start', marginLeft: 20, marginTop: 5 }}>
                                    <View style={{ transform: [{ rotate: '47deg' }] }}>
                                        <Image source={require('../images/line.png')} style={{ height: responsiveHeight(5), width: responsiveWidth(16) }} />
                                    </View>


                                    <View style={{ transform: [{ rotate: '130deg' }] }}>
                                        <Image source={require('../images/line.png')} style={{ height: responsiveHeight(5), width: responsiveWidth(14), marginRight: 20 }} />
                                    </View>

                                    <View style={{ transform: [{ rotate: '38deg' }], marginTop: 5 }}>
                                        <Image source={require('../images/line.png')} style={{ height: responsiveHeight(5), width: responsiveWidth(22) }} />
                                    </View>

                                    <View style={{ transform: [{ rotate: '130deg' }] }}>
                                        <Image source={require('../images/line.png')} style={{ height: responsiveHeight(5), width: responsiveWidth(16), marginRight: 20 }} />
                                    </View>




                                </View>

                                <View
                                    style={{
                                        flexDirection: "row",
                                        marginTop: 5,
                                        justifyContent: 'space-evenly',
                                        marginHorizontal: 20, marginLeft: 10
                                    }}
                                >
                                    <TouchableOpacity
                                        style={{
                                            height: responsiveHeight(3.5),
                                            justifyContent: "center",
                                            width: responsiveWidth(11),
                                            borderWidth: 1,
                                            borderRadius: 5,
                                        }}
                                    >
                                        <Text
                                            style={{
                                                alignSelf: "center",
                                                fontWeight: "600",
                                                fontSize: 15,
                                                color: "#0085FF"
                                            }}
                                        >
                                            {(winnersListPageAllDataOfAUserForParticularExamData?.UserQuestion?.t_MPoints)}

                                        </Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        style={{
                                            height: responsiveHeight(3.5),
                                            justifyContent: "center",
                                            width: responsiveWidth(8),
                                            borderWidth: 1,
                                            borderRadius: 5,
                                        }}
                                    >
                                        <Text
                                            style={{
                                                alignSelf: "center",
                                                fontWeight: "600",
                                                fontSize: 15,
                                            }}
                                        >
                                            +
                                        </Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        style={{
                                            height: responsiveHeight(3.5),
                                            justifyContent: "center",
                                            width: responsiveWidth(8),
                                            borderWidth: 1,
                                            borderRadius: 5,
                                        }}
                                    >
                                        <Text
                                            style={{
                                                alignSelf: "center",
                                                fontWeight: "600",
                                                fontSize: 15,
                                            }}
                                        >
                                            {(winnersListPageAllDataOfAUserForParticularExamData?.UserQuestion?.t_m_Points)}
                                        </Text>

                                    </TouchableOpacity>
                                </View>

                                <View style={{ flexDirection: 'row', justifyContent: 'center', marginLeft: 0, marginTop: 10 }}>
                                    <View style={{ transform: [{ rotate: '47deg' }] }}>
                                        <Image source={require('../images/line.png')} style={{ height: responsiveHeight(5), width: responsiveWidth(20) }} />
                                    </View>

                                    <View style={{ transform: [{ rotate: '130deg' }] }}>
                                        <Image source={require('../images/line.png')} style={{ height: responsiveHeight(5), width: responsiveWidth(20), marginRight: 20 }} />
                                    </View>
                                </View>

                                <TouchableOpacity
                                    style={{
                                        height: responsiveHeight(4),
                                        alignSelf: "center",
                                        marginTop: 15,
                                        justifyContent: "center",
                                        width: responsiveWidth(28),
                                        borderWidth: 1,
                                        borderRadius: 5,
                                    }}
                                >
                                    <Text
                                        style={{ alignSelf: "center", fontWeight: "600", fontSize: 15 }}
                                    >{winnersListPageAllDataOfAUserForParticularExamData?.UserQuestion?.mainPoints}</Text>
                                </TouchableOpacity>
                            </View>



                            <View style={{ height: responsiveHeight(35), alignSelf: 'center', width: responsiveWidth(90), marginBottom: 10, backgroundColor: '#fff', alignSelf: 'center', marginTop: 10, borderRadius: 8, elevation: 10 }}>


                                <View style={{ flexDirection: 'row', justifyContent: 'center', marginHorizontal: 10 }}>

                                    <View style={{ marginTop: 30, alignSelf: 'center' }}>
                                        <PieChart
                                            widthAndHeight={pieChartWidth}
                                            series={series2}
                                            sliceColor={sliceColor2}
                                            coverRadius={0.45}
                                            coverFill={'#FFF'}
                                        />
                                    </View>

                                </View>

                                {
                                    winnersListPageAllDataOfAUserForParticularExamData?.correctPercentage <= winnersListPageAllDataOfAUserForParticularExamData?.wrongPercentage ? (

                                        <Text style={{ fontSize: 14, position: 'absolute', color: '#000', fontWeight: '500', top: '20%', right: '33%' }}>{(((winnersListPageAllDataOfAUserForParticularExamData?.correctPercentage >= 1) && winnersListPageAllDataOfAUserForParticularExamData?.correctPercentage + "%"))}</Text>
                                    ) :
                                        (
                                            <>
                                                <Text style={{ fontSize: 14, position: 'absolute', color: '#000', fontWeight: '500', top: '20%', right: '33%' }}>{(((winnersListPageAllDataOfAUserForParticularExamData?.correctPercentage >= 1) && winnersListPageAllDataOfAUserForParticularExamData?.correctPercentage + "%"))}</Text>
                                            </>
                                        )
                                }

                                {
                                    winnersListPageAllDataOfAUserForParticularExamData?.correctPercentage >= winnersListPageAllDataOfAUserForParticularExamData?.wrongPercentage ? (
                                        <Text style={{ fontSize: 14, position: 'absolute', top: '20%', fontWeight: '500', right: '54%', color: '#000' }}>{(((winnersListPageAllDataOfAUserForParticularExamData?.wrongPercentage >= 1) && winnersListPageAllDataOfAUserForParticularExamData?.wrongPercentage + "%"))}

                                        </Text>
                                    ) :
                                        (
                                            <>
                                                <Text style={{ fontSize: 14, position: 'absolute', top: '20%', fontWeight: '500', right: '54%', color: '#000' }}>{(((winnersListPageAllDataOfAUserForParticularExamData?.wrongPercentage >= 1) && winnersListPageAllDataOfAUserForParticularExamData?.wrongPercentage + "%"))}

                                                </Text>
                                            </>
                                        )
                                }





                                <View style={{ marginTop: '5%', alignSelf: 'center', flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 50 }}>

                                    <View>

                                        <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
                                            <View style={{ height: responsiveHeight(1.9), width: responsiveWidth(3.8), backgroundColor: '#0085FF', alignSelf: 'center' }}>

                                            </View>

                                            <Text style={{ fontSize: 13, marginRight: 10, marginLeft: 10 }}>{winnersListPageAllDataOfAUserForParticularExamData?.correctCount} Correct</Text>
                                        </View>
                                    </View>

                                    <View style={{ flexDirection: 'row' }}>
                                        <View style={{ height: responsiveHeight(1.9), width: responsiveWidth(3.8), backgroundColor: '#A8A8A8', alignSelf: 'center' }}>

                                        </View>

                                        <Text style={{ fontSize: 13, marginLeft: 10 }}>{winnersListPageAllDataOfAUserForParticularExamData?.wrongCount} Incorrect</Text>
                                    </View>





                                </View>
                            </View>

                        </View>





                    </ScrollView>

                </SafeAreaView>

            </Modal>

        </SafeAreaView>

    )
}

export default MyLeaderBoard2