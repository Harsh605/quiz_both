import { View, Text, TouchableOpacity, Image, StatusBar, ScrollView, TextInput } from "react-native";
import React, { useState, useEffect } from "react";
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

const MyLeaderBoard2 = ({ navigation, route }) => {
    const dispatch = useDispatch()

    const { questionData, gameId, userId, selectedQuestionLanguage } = route.params
    const [currentQuestionNo, setCurrentQuestionNo] = useState(1)

    const [isQuestionSave, setIsQuestionSave] = useState(false)
    const [selectedOption, setSelectedOption] = useState("")
    const [selectedRightOrWrong, setSelectedRightOrWrong] = useState(null)
    const [selectedCorrectPercent, setSelectedCorrectPercent] = useState(null)
    const [answerSubmitTime, setAnswerSubmitTime] = useState(null)
    const [nextQuestionTimer, setNextQuestionTimer] = useState(questionData.t);
    const [rowPointsValue, setRowPointsValue] = useState(0);

    const [remainingTimeAfterSave, setRemainingTimeAfterSave] = useState(0)
    const [questionIntervalCounter, setQuestionIntervalCounter] = useState(questionData.interval || 5);

    const [modalForLeaderBoard, setModalForLeaderBoard] = useState(false);
    const [modalForAnalysis, setModalForAnalysis] = useState(false);


    const { winnersListPageAllDataOfAUserForParticularExamData } = useSelector((state) => state.examCustom)


    const eachLeaderBoardFunc = () => {
        setModalForLeaderBoard(true);
        dispatch(winnersListPageAllDataOfAUserForParticularExam({ gameId, que_no: (currentQuestionNo - 1) }))
    };


    const options = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

    const attempte = {
        correctPercnt: 75, // Change values as needed
        wrongPercnt: 25,   // Change values as needed
    };



    const pieChartWidth = 150;
    const series2 = [`${attempte?.correctPercnt}`, `${attempte?.wrongPercnt}`];
    const sliceColor2 = ['#0085FF', '#A8A8A8'];

    useEffect(() => {
        const timer = setInterval(() => {
            if (nextQuestionTimer <= 0) {
                clearInterval(timer); // Clear the setInterval timer
                if (currentQuestionNo < questionData.noOfQuestion) {
                    let delayDuration;
                    if (isQuestionSave) {
                        delayDuration = questionData?.interval || 5; // Use questionData.interval for saved questions, default to 5 if undefined
                    } else {
                        delayDuration = 5; // Use 5 seconds delay for unsaved questions
                    }
                    setQuestionIntervalCounter(delayDuration); // Reset questionIntervalCounter
                    const intervalTimer = setInterval(() => {
                        console.log(questionIntervalCounter)
                        setQuestionIntervalCounter(prevCounter => prevCounter - 1); // Decrement questionIntervalCounter every second
                    }, 1000);
                    setTimeout(() => {
                        clearInterval(intervalTimer); // Clear intervalTimer when the countdown completes
                        setCurrentQuestionNo(prevQuestionNo => prevQuestionNo + 1);
                        setNextQuestionTimer(questionData.t); // Reset timer for next question
                        setSelectedOption(""); // Reset selected option
                        setSelectedRightOrWrong(null); // Reset selected right or wrong indicator
                        setSelectedCorrectPercent(null);
                        setQuestionIntervalCounter(questionData.interval)
                        setAnswerSubmitTime(null);
                        setIsQuestionSave(false);
                        setModalForLeaderBoard(false)
                        setModalForAnalysis(false)
                    }, delayDuration * 1000);
                }
            } else {
                setNextQuestionTimer(prevTimer => prevTimer - 1); // Decrement nextQuestionTimer
            }
        }, 1000);

        return () => clearInterval(timer); // Clear interval on component unmount
    }, [nextQuestionTimer, questionData.t, questionData.noOfQuestion, isQuestionSave]);


    useEffect(() => {
        const interval = setInterval(() => {
            setRemainingTimeAfterSave(prevRemainingTime => prevRemainingTime - 1);
        }, 1000);
        return () => clearInterval(interval);
    }, []);


    useEffect(() => {
        const calculateAndSet = () => {
            const newValue = selectedRightOrWrong === "first" ? (
                (() => {
                    const sum = 5.5 + selectedCorrectPercent + rowPointsValue;
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
                        const sum = 3.5 + selectedCorrectPercent + rowPointsValue;
                        const integerPart = Math.floor(sum);
                        const fractionalPart = sum - integerPart;
                        const integerDigits = integerPart.toString().split('').map(Number);
                        const totalInteger = integerDigits.reduce((acc, curr) => acc + curr, 0);
                        const singleDigitInteger = totalInteger > 9 ? totalInteger - 9 : totalInteger;
                        return singleDigitInteger + fractionalPart;
                    })()
                ) :
                    0;

            setRowPointsValue(newValue); // Set the calculated value into state
        };
        calculateAndSet()
    }, [nextQuestionTimer, selectedCorrectPercent])




    const submitQuestionAnswer = ({ answerSubmitTimeSend }) => {
        const socket = io('https://quiz.metablocktechnologies.org');
        setRemainingTimeAfterSave((questionData.t) - answerSubmitTimeSend)
        if (!selectedRightOrWrong || !selectedOption) {
            alert("Please Fill All Options");
            return;
        }
        setIsQuestionSave(true)
        const type = selectedRightOrWrong === "first" ? "RIGHT" : "WRONG";

        const currentQuestion = selectedQuestionLanguage === "English" ?
            questionData.QuestionEnglish[currentQuestionNo - 1] :
            questionData.QuestionHindi[currentQuestionNo - 1];


        const question = selectedQuestionLanguage === "English" ? questionData.QuestionEnglish[currentQuestionNo - 1].QuestionE : questionData.QuestionHindi[currentQuestionNo - 1].QuestionH;
        console.log({
            questionId: currentQuestion.questionId,
            gameId: gameId,
            userId: userId,
            question: question,
            q_no: currentQuestionNo - 1, // Are you sure this is intended? It seems to be the same as 'question'
            answer: selectedOption,
            q_time: questionData?.t,
            schedule: questionData?.schedule, // Changed the key to avoid duplication
            rawPoints: selectedRightOrWrong === "first" ? 5.5 : selectedRightOrWrong === "second" ? 3.5 : null,
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
            q_no: currentQuestionNo - 1,
            answer: selectedOption,
            q_time: questionData?.t,
            schedule: questionData?.schedule,
            rawPoints: selectedRightOrWrong === "first" ? 5.5 : selectedRightOrWrong === "second" ? 3.5 : null,
            rM: selectedRightOrWrong === "first" ? 5.5 : selectedRightOrWrong === "second" ? 3.5 : null,
            rC: selectedCorrectPercent,
            timeTaken: answerSubmitTimeSend,
            type: type
        });


        console.log("setRemainingTimeAfterSave", questionData.t - answerSubmitTimeSend)
        console.log("questionData.t", questionData.t)
        console.log("answerSubmitTime", answerSubmitTimeSend)
        console.log(questionData.interval)

    };
    // console.log("winnersListPageAllDataOfAUserForParticularExamData", questionData)



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
                        {(questionIntervalCounter < 5) ? (
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
                                {currentQuestionNo} / {questionData.noOfQuestion}
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
                        Q. {currentQuestionNo} {selectedQuestionLanguage === "English" ?
                            (questionData.QuestionEnglish[currentQuestionNo - 1].QuestionE) :
                            (questionData.QuestionHindi[currentQuestionNo - 1].QuestionH)}
                    </Text>

                    {(selectedQuestionLanguage === "English" ? (questionData.QuestionEnglish[currentQuestionNo - 1].optionH) :
                        (questionData.QuestionHindi[currentQuestionNo - 1].optionH))?.map((res) => {
                            return (
                                <>
                                    <View style={{ marginTop: 10, flexDirection: "row", marginRight: 20 }}>
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
                                    {nextQuestionTimer}
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
                                    {nextQuestionTimer}
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
                            {(!isQuestionSave && nextQuestionTimer > 0) ? "Time" : (!isQuestionSave && nextQuestionTimer < 0) ? "Next Que in.." : `Next Que in..`}
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

                            {(questionIntervalCounter < 5) ?
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
                                //   onPress={() => { AnalysisApi() }}
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

                            {/* {
                                winnersListPageAllDataOfAUserForParticularExamData.questionleaderShip?.map((res) => {
                                    // console.log(res);
                                    return (
                                        <>
                                            <TouchableOpacity
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
                                                <Text style={{ alignSelf: "center", color: "#6A5AE0", flex: 0.25 }}>{res?.UserQuestion?.rank}</Text>
                                                <Text style={{ alignSelf: "center", color: "#000", flex: 0.25 }}>{res.UserQuestion?.User?.name ? res.UserQuestion?.User?.name : "-"}</Text>
                                                <Text style={{ alignSelf: "center", color: "green", flex: 0.25 }}>{res.UserQuestion?.User?.id}</Text>


                                                <Text
                                                    style={{ alignSelf: "center", color: "#000", fontWeight: "500", flex: 0.10 }}
                                                >
                                                    {res?.UserQuestion?.mainPoints}
                                                </Text>
                                            </TouchableOpacity>
                                        </>
                                    )
                                })
                            } */}






                        </View>



                    </View>
                </SafeAreaView>
            </Modal>

            {/* 
            <Modal style={{ width: '100%', marginLeft: 0, top: 0, height: responsiveHeight(100), backgroundColor: '#fff' }}
                visible={modalVisible8}
                animationType="slide"
                onRequestClose={closeModal8}

            >
                <View style={{ top: 0, flex: 1, backgroundColor: '#fff', bottom: 0, height: responsiveHeight(100), marginBottom: -30 }}>

                    <View style={{ height: responsiveHeight(7), width: responsiveWidth(100), justifyContent: 'center', backgroundColor: '#6A5AE0', paddingHorizontal: 20, marginTop: -30 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
                            <TouchableOpacity onPress={closeModal8} style={{ justifyContent: 'center', alignSelf: 'flex-start', marginTop: 15 }}>
                                <AntDesign name="arrowleft" size={24} color="white" />
                            </TouchableOpacity>

                            <Text style={{ color: '#fff', fontSize: 20, fontWeight: '500', alignSelf: 'center', marginTop: 15, marginLeft: '30%' }}>Analysis</Text>
                        </View>
                    </View>
                    <ScrollView>

                        <View style={{ height: responsiveHeight(32), width: responsiveWidth(90), marginBottom: 10, paddingHorizontal: 20, backgroundColor: '#fff', alignSelf: 'center', marginTop: 10, borderRadius: 8, elevation: 10 }}>
                            <Text style={{ marginTop: 20, fontSize: 17, fontWeight: '500', color: '#000' }}>Q. {mydata}</Text>

                            {question1?.map((res) => {
                                return (
                                    <>
                                        <View style={{ marginTop: 10, flexDirection: 'row', marginRight: 20 }}>
                                            <TouchableOpacity style={{ height: responsiveHeight(3.5), marginRight: 10, backgroundColor: select2 == 0 ? '#6A5AE0' : '#fff', width: responsiveWidth(7), borderWidth: 1, borderRadius: 100, justifyContent: 'center' }}
                                                onPress={() => setSelectedOption2(0)}>
                                                <Text style={{ alignSelf: 'center', fontWeight: '600', fontSize: 18, color: select2 == 0 ? '#fff' : '#6A5AE0' }}>{res.id}</Text>
                                            </TouchableOpacity>

                                            <Text style={{ alignSelf: 'center', fontSize: 13 }}>{res.answer}</Text>

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
                                        status={checked === "first" ? "checked" : "unchecked"}
                                    // onPress={() => { setChecked("first"); setmainValuerl(5.5) }}
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
                                        status={checked === "second" ? "checked" : "unchecked"}
                                    // onPress={() => { setChecked("second"); setmainValuerl(3.5) }}
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
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                    marginTop: 10,
                                }}
                            >
                                <TouchableOpacity
                                    style={{
                                        height: responsiveHeight(3),
                                        backgroundColor: correct == 0 ? "#000" : "#fff",
                                        justifyContent: "center",
                                        width: responsiveWidth(6),
                                        borderWidth: 1,
                                        borderRadius: 5,
                                    }}
                                // onPress={() => { calculation(mainValuerl, 0), setCorrect(0) }}
                                // onPress={() => { setChecked("second"); setmainValuerl(3.5) }}

                                >
                                    <Text
                                        style={{
                                            alignSelf: "center",
                                            fontWeight: "600",
                                            fontSize: 15,
                                            color: correct == 0 ? "#fff" : "#000",
                                        }}
                                    >
                                        {A}
                                    </Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={{
                                        height: responsiveHeight(3),
                                        justifyContent: "center",
                                        backgroundColor: correct == 1 ? "#000" : "#fff",
                                        width: responsiveWidth(6),
                                        borderWidth: 1,
                                        borderRadius: 5,
                                    }}
                                // onPress={() => { calculation(mainValuerl, 1), setCorrect(1) }}
                                >
                                    <Text
                                        style={{
                                            alignSelf: "center",
                                            fontWeight: "600",
                                            fontSize: 15,
                                            color: correct == 1 ? "#fff" : "#000",
                                        }}
                                    >
                                        {B}
                                    </Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={{
                                        height: responsiveHeight(3),
                                        justifyContent: "center",
                                        backgroundColor: correct == 2 ? "#000" : "#fff",
                                        width: responsiveWidth(6),
                                        borderWidth: 1,
                                        borderRadius: 5,
                                    }}
                                // onPress={() => { setCorrect(2), calculation(mainValuerl, 2) }}
                                >
                                    <Text
                                        style={{
                                            alignSelf: "center",
                                            fontWeight: "600",
                                            fontSize: 15,
                                            color: correct == 2 ? "#fff" : "#000",
                                        }}
                                    >
                                        {C}
                                    </Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={{
                                        height: responsiveHeight(3),
                                        justifyContent: "center",
                                        backgroundColor: correct == 3 ? "#000" : "#fff",
                                        width: responsiveWidth(6),
                                        borderWidth: 1,
                                        borderRadius: 5,
                                    }}
                                // onPress={() => { setCorrect(3), calculation(mainValuerl, 3) }}
                                >
                                    <Text
                                        style={{
                                            alignSelf: "center",
                                            fontWeight: "600",
                                            fontSize: 15,
                                            color: correct == 3 ? "#fff" : "#000",
                                        }}
                                    >
                                        {D}
                                    </Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={{
                                        height: responsiveHeight(3),
                                        justifyContent: "center",
                                        backgroundColor: correct == 4 ? "#000" : "#fff",
                                        width: responsiveWidth(6),
                                        borderWidth: 1,
                                        borderRadius: 5,
                                    }}
                                // onPress={() => { setCorrect(4), calculation(mainValuerl, 4) }}
                                >
                                    <Text
                                        style={{
                                            alignSelf: "center",
                                            fontWeight: "600",
                                            fontSize: 15,
                                            color: correct == 4 ? "#fff" : "#000",
                                        }}
                                    >
                                        {E}
                                    </Text>
                                </TouchableOpacity>
                            </View>

                            <View
                                style={{
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                    marginTop: 12,
                                }}
                            >
                                <TouchableOpacity
                                    style={{
                                        height: responsiveHeight(3),
                                        justifyContent: "center",
                                        backgroundColor: correct == 5 ? "#000" : "#fff",
                                        width: responsiveWidth(6),
                                        borderWidth: 1,
                                        borderRadius: 5,
                                    }}
                                // onPress={() => { setCorrect(5), calculation(mainValuerl, 5) }}
                                >
                                    <Text
                                        style={{
                                            alignSelf: "center",
                                            fontWeight: "600",
                                            fontSize: 15,
                                            color: correct == 5 ? "#fff" : "#000",
                                        }}
                                    >
                                        {F}
                                    </Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={{
                                        height: responsiveHeight(3),
                                        justifyContent: "center",
                                        backgroundColor: correct == 6 ? "#000" : "#fff",
                                        width: responsiveWidth(6),
                                        borderWidth: 1,
                                        borderRadius: 5,
                                    }}
                                // onPress={() => { setCorrect(6), calculation(mainValuerl, 6) }}
                                >
                                    <Text
                                        style={{
                                            alignSelf: "center",
                                            fontWeight: "600",
                                            fontSize: 15,
                                            color: correct == 6 ? "#fff" : "#000",
                                        }}
                                    >
                                        {G}
                                    </Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={{
                                        height: responsiveHeight(3),
                                        justifyContent: "center",
                                        backgroundColor: correct == 7 ? "#000" : "#fff",
                                        width: responsiveWidth(6),
                                        borderWidth: 1,
                                        borderRadius: 5,
                                    }}
                                // onPress={() => { setCorrect(7), calculation(mainValuerl, 7) }}
                                >
                                    <Text
                                        style={{
                                            alignSelf: "center",
                                            fontWeight: "600",
                                            fontSize: 15,
                                            color: correct == 7 ? "#fff" : "#000",
                                        }}
                                    >
                                        {H}
                                    </Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={{
                                        height: responsiveHeight(3),
                                        justifyContent: "center",
                                        backgroundColor: correct == 8 ? "#000" : "#fff",
                                        width: responsiveWidth(6),
                                        borderWidth: 1,
                                        borderRadius: 5,
                                    }}
                                // onPress={() => { setCorrect(8), calculation(mainValuerl, 8) }}
                                >
                                    <Text
                                        style={{
                                            alignSelf: "center",
                                            fontWeight: "600",
                                            fontSize: 15,
                                            color: correct == 8 ? "#fff" : "#000",
                                        }}
                                    >
                                        {I}
                                    </Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={{
                                        height: responsiveHeight(3),
                                        justifyContent: "center",
                                        backgroundColor: correct == 9 ? "#000" : "#fff",
                                        width: responsiveWidth(6),
                                        borderWidth: 1,
                                        borderRadius: 5,
                                    }}
                                // onPress={() => { setCorrect(9), calculation(mainValuerl, 9) }}
                                >
                                    <Text
                                        style={{
                                            alignSelf: "center",
                                            fontWeight: "600",
                                            fontSize: 15,
                                            color: correct == 9 ? "#fff" : "#000",
                                        }}
                                    >
                                        {J}
                                    </Text>
                                </TouchableOpacity>
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
                                        }}
                                    >
                                        {rowdata.rM}
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
                                        }}
                                    >
                                        {rowdata.rC}
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
                                        {rowdata.timeTaken}
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
                                        }}
                                    >
                                        {rowdata.rawPoints}

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
                                        {rowdata.timeTaken}
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
                                >9</Text>
                            </TouchableOpacity>
                        </View>

                      <View style={{ height: responsiveHeight(87), borderRadius: 10, elevation: 10, marginBottom: 20, marginTop: 20, width: responsiveWidth(90), backgroundColor: '#fff', alignSelf: 'center' }}>
                    <Text style={{ alignSelf: 'center', fontSize: 20, marginTop: 10, fontWeight: '500' }}>Answer Analysis</Text>

                    <View style={{ height: responsiveHeight(10), elevation: 10, marginTop: 20, width: responsiveWidth(90), borderRadius: 10, backgroundColor: '#fff', alignSelf: 'center' }}>

                        <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
                            <Text style={{ fontSize: 15, marginTop: 10, marginHorizontal: 20 }}>Currect Answer     : -</Text>
                            <View style={{ alignSelf: 'center', marginTop: 10, height: responsiveHeight(3), width: responsiveWidth(7), borderWidth: 0.5, borderRadius: 5 }}>
                                <Text style={{ alignSelf: 'center' }}>attemptAns</Text>
                            </View>
                        </View>

                        <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
                            <Text style={{ fontSize: 15, marginTop: 10, marginHorizontal: 20 }}>Your Answer         : -</Text>
                            <View style={{ alignSelf: 'center', marginTop: 10, height: responsiveHeight(3), width: responsiveWidth(7), borderWidth: 0.5, borderRadius: 5 }}>
                                <Text style={{ alignSelf: 'center' }}>answer</Text>
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
                            main point Panel
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
                                    }}
                                >
                                    5.5
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
                                    }}
                                >
                                    3
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
                                    20
                                </Text>
                            </View>
                        </View>

                        <View style={{ borderBottomWidth: 0.6, marginTop: 4 }}></View>



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
                                    }}
                                >
                                    30

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
                                    5s
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
                            >7</Text>
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
                            attempte.correctPercnt <= attempte.wrongPercnt ? (

                                <Text style={{ fontSize: 14, position: 'absolute', color: '#000', fontWeight: '500', top: '20%', right: '33%' }}>{((attempte.correctPercnt) / (attempte.wrongPercnt + attempte.correctPercnt) * 100).toFixed(1)}%</Text>
                            ) :
                                (
                                    <>
                                        <Text style={{ fontSize: 14, position: 'absolute', color: '#000', fontWeight: '500', top: '20%', right: '33%' }}>{((attempte.correctPercnt) / (attempte.wrongPercnt + attempte.correctPercnt) * 100).toFixed(1)}%</Text>
                                    </>
                                )
                        }

                        {
                            attempte.correctPercnt >= attempte.wrongPercnt ? (
                                <Text style={{ fontSize: 14, position: 'absolute', top: '20%', fontWeight: '500', right: '54%', color: '#0085FF' }}>{((attempte.wrongPercnt) / (attempte.wrongPercnt + attempte.correctPercnt) * 100).toFixed(1)}%

                                </Text>
                            ) :
                                (
                                    <>
                                        <Text style={{ fontSize: 14, position: 'absolute', top: '20%', fontWeight: '500', right: '54%', color: '#0085FF' }}>{((attempte.wrongPercnt) / (attempte.wrongPercnt + attempte.correctPercnt) * 100).toFixed(1)}%

                                        </Text>
                                    </>
                                )
                        }




                        <View style={{ marginTop: '5%', alignSelf: 'center', flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 50 }}>

                            <View>

                                <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
                                    <View style={{ height: responsiveHeight(1.9), width: responsiveWidth(3.8), backgroundColor: '#0085FF', alignSelf: 'center' }}>

                                    </View>

                                    <Text style={{ fontSize: 13, marginRight: 10, marginLeft: 10 }}>{attempte.correctPercnt} Correct</Text>
                                </View>
                            </View>

                            <View style={{ flexDirection: 'row' }}>
                                <View style={{ height: responsiveHeight(1.9), width: responsiveWidth(3.8), backgroundColor: '#A8A8A8', alignSelf: 'center' }}>

                                </View>

                                <Text style={{ fontSize: 13, marginLeft: 10 }}>{attempte.wrongPercnt} Incorrect</Text>
                            </View>





                        </View>
                    </View>

                </View>

                    </ScrollView>

                </View>

            </Modal> */}

        </SafeAreaView>
    )
}

export default MyLeaderBoard2