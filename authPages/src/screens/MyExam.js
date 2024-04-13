import { View, Text, StatusBar, Image, TextInput, TouchableOpacity, Linking, FlatList, RefreshControl } from "react-native";
import React, { useEffect, useState } from "react";
import { responsiveFontSize, responsiveHeight, responsiveWidth, } from "react-native-responsive-dimensions";
import { ScrollView } from "react-native-gesture-handler";
import { formatTimestamp, millisToMinutesAndSeconds } from "./../utils/formatDate";
import { calculateRemainingTime, convertMillisecondsToDateTime, formattedTime } from "./../utils/FormateTime";
import Topbar from "../components/Topbar";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { allMyExams } from "../../slices/examSlice";


const MyExam = ({ navigation }) => {
  const dispatch = useDispatch()
  const [refreshing, setRefreshing] = useState(false);
  const [remainingTimes, setRemainingTimes] = useState({});

  const [tabSelect, setTabSelect] = useState(0);
  const [searchName, setSearchName] = useState("");

  const { examData } = useSelector((state) => state.examCustom)


  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);


  useEffect(() => {
    if (tabSelect == 0) {
      dispatch(allMyExams({ hit: "LIVE", name: searchName }))
    }
    else {
      dispatch(allMyExams({ hit: "COMPLETED", name: searchName }))
    }
  }, [dispatch, searchName, tabSelect])


  const timeNavigation = async ({ game_ID, times, scheduleTime, gameId, userId }) => {
    const currentTimeInMilliseconds = Date.now();
    const availableMinutes = Math.floor((times - currentTimeInMilliseconds) / (1000 * 60));

    if (availableMinutes < 0) {
      alert("Expiration date");
    } else if (availableMinutes <= 60) {
      navigation.navigate("Instruction", {
        times: availableMinutes,
        scheduleTime: scheduleTime,
        game_ID,
        gameId: gameId,
        userId: userId,
      });
    } else {
      alert(`Wait ${availableMinutes - 5} minutes and try again`);
    }
  }
  useEffect(() => {
    const intervalId = setInterval(() => {
      const updatedTimes = {};
      examData?.forEach(data => {
        updatedTimes[data?.gameId] = calculateRemainingTime(data?.Game[0].schedule);
      });
      setRemainingTimes(updatedTimes);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [examData]);


  // console.log("examData", examData)
  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <StatusBar
        translucent={true}
        barStyle={"light-content"}
        backgroundColor={"#6A5AE0"}
      />

      <View
        style={{
          height: responsiveHeight(20),
          width: responsiveWidth(100),
          backgroundColor: "#6A5AE0",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginHorizontal: 20,
            marginTop: 50,
          }}
        >
          <Topbar navigation={navigation} />


        </View>

        <Navbar navigation={navigation} />
      </View>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginHorizontal: 20,
        }}
      >
        <TouchableOpacity
          style={{
            height: responsiveHeight(4.3),
            justifyContent: "center",
            borderRadius: 25,
            borderWidth: tabSelect == 0 ? 0 : 1,
            width: responsiveWidth(42),
            marginTop: 20,
            backgroundColor: tabSelect == 0 ? "#6A5AE0" : "#fff",
            alignSelf: "flex-start",
          }}
          onPress={() => setTabSelect(0)}
        >
          <Text
            style={{
              color: tabSelect == 0 ? "#fff" : "#000",
              fontWeight: "400",
              alignSelf: "center",
              fontSize: 16,
            }}
          >
            Live
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            height: responsiveHeight(4.3),
            borderWidth: tabSelect == 1 ? 0 : 1,
            justifyContent: "center",
            borderRadius: 25,
            width: responsiveWidth(42),
            marginTop: 20,
            backgroundColor: tabSelect == 1 ? "#6A5AE0" : "#fff",
            alignSelf: "flex-start",
          }}
          onPress={() =>
            setTabSelect(1)
            // , setHit("COMPLETED");
          }
        >
          <Text
            style={{
              color: tabSelect == 1 ? "#fff" : "#000",
              fontWeight: "400",
              alignSelf: "center",
              fontSize: 16,
            }}
          >
            Completed
          </Text>
        </TouchableOpacity>
      </View>

      <View
        style={{
          height: responsiveHeight(8.1),
          flexDirection: "row",
          width: responsiveWidth(100),
          marginTop: 10,
          borderTopRightRadius: 10,
          borderTopLeftRadius: 10,
          backgroundColor: "#6A5AE0",
        }}
      >
        <View
          style={{
            backgroundColor: "#fff",
            height: responsiveHeight(5.5),
            width: responsiveWidth(88),
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
            style={{ flex: 0.8, justifyContent: "center", alignSelf: "center" }}
          >
            <TextInput
              // onChangeText={(value)=>{
              //   myexamApi(value)
              // }}
              // value={searchName}
              onChangeText={(value) => setSearchName(value)}
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

        {/* <View style={{ alignSelf: "center" }}>
          <Image
            source={require("../images/calender.png")}
            style={{
              tintColor: "#fff",
              height: responsiveHeight(4),
              width: responsiveWidth(8),
              marginLeft: 10,
            }}
          />
        </View> */}
      </View>

      <View style={{ height: responsiveHeight(59) }}>
        <ScrollView refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
          {tabSelect == 0 ? (
            <View>
              {examData?.length > 0 ? (
                [...examData].sort((a, b) => b.schedule - a.schedule).map((data, index) => {
                  return (
                    <>
                      <View
                        key={index}
                        style={{
                          // height: responsiveHeight(45),
                          width: responsiveWidth(90),
                          marginBottom: 10,
                          paddingHorizontal: 20,
                          paddingVertical: 20,
                          backgroundColor: "#fff",
                          alignSelf: "center",
                          marginTop: 20,
                          borderRadius: 5,
                          elevation: 10,
                        }}
                      >
                        <Text
                          style={{
                            color: "#6A5ADF",
                            fontWeight: "500",
                            fontSize: 16,
                            marginTop: 15,
                          }}
                        >
                          {/* {data?.Game[0].gameNameInEnglish} */}
                          {data?.gameNameInEnglish}
                        </Text>
                        <Text
                          style={{
                            color: "#000",
                            fontWeight: "400",
                            fontSize: 14,
                            marginTop: 5,
                          }}
                        >
                          {data?.Game[0]?.category}
                        </Text>

                        <View
                          style={{ borderBottomWidth: 0.6, marginTop: 10 }}
                        ></View>

                        <View
                          style={{
                            flexDirection: "row",
                            justifyContent: "flex-start",
                            marginTop: 10,
                          }}
                        >
                          <Image
                            source={require("../images/calender.png")}
                            style={{
                              tintColor: "#6A5ADF",
                              height: responsiveHeight(4),
                              width: responsiveWidth(8),
                            }}
                          />

                          <Text
                            style={{
                              alignSelf: "center",
                              marginLeft: 10,
                              fontSize: 13,
                            }}
                          >
                            {convertMillisecondsToDateTime(data?.schedule)}
                          </Text>
                        </View>

                        <View
                          style={{
                            flexDirection: "row",
                            justifyContent: "flex-start",
                            marginTop: 10,
                          }}
                        >
                          <Image
                            source={require("../images/question.png")}
                            style={{
                              tintColor: "#6A5ADF",
                              height: responsiveHeight(4),
                              width: responsiveWidth(8),
                            }}
                          />

                          <Text
                            style={{
                              alignSelf: "center",
                              marginLeft: 10,
                              fontSize: 13,
                            }}
                          >
                            {data?.Game[0]?.noOfQuestion} Questions | Time {millisToMinutesAndSeconds(data?.Game[0]?.duration)} mins
                          </Text>
                        </View>

                        <View
                          style={{
                            height: responsiveHeight(5),
                            justifyContent: "center",
                            borderRadius: 20,
                            width: responsiveWidth(80),
                            marginTop: 10,
                            backgroundColor: "#EDEAFB",
                            alignSelf: "center",
                          }}
                        >
                          <Text
                            style={{
                              marginLeft: 10,
                              color: "#6A5ADF",
                              fontWeight: "500",
                              fontSize: 14,
                            }}
                          >
                            Joined Member : {data?.Game[0]?.UserGame.length}
                          </Text>
                        </View>

                        <View
                          style={{
                            height: responsiveHeight(5),
                            justifyContent: "center",
                            borderRadius: 20,
                            width: responsiveWidth(80),
                            marginTop: 10,
                            backgroundColor: "#EDEAFB",
                            alignSelf: "center",
                          }}
                        >
                          <Text
                            style={{
                              marginLeft: 10,
                              color: "#6A5ADF",
                              fontWeight: "500",
                              fontSize: 14,
                            }}
                          >
                            Joined Fees: ₹{data?.Game[0]?.entranceAmount}
                          </Text>
                        </View>

                        {/* <Text
                          style={{
                            color: "#000",
                            fontWeight: "500",
                            fontSize: 13,
                            marginTop: 5,
                          }}
                        >
                          {times} minutes left to exam start
                        </Text> */}

                        <TouchableOpacity
                          style={{
                            height: responsiveHeight(4.8),
                            justifyContent: "center",
                            borderRadius: 25,
                            width: responsiveWidth(80),
                            marginTop: 20,
                            backgroundColor: "#A9A3E9",
                            alignSelf: "flex-start",

                          }}
                          onPress={() => {

                            timeNavigation({ times: data?.schedule, game_ID: data?._id, scheduleTime: data?.schedule, gameId: data?.gameId, userId: data?.userId })
                          }}
                          disabled={
                            Date.now() >= data?.Game[0].schedule || // Disable after exam starts
                            Date.now() <= data?.Game[0].schedule - 60 * 60 * 1000 // Disable 5 minutes before exam
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
                            {Date.now() <= data?.Game[0].schedule - 60 * 60 * 1000 ?
                              `Exam Starts in: ${remainingTimes[data?.gameId]?.hours}h ${remainingTimes[data?.gameId]?.minutes}m ${remainingTimes[data?.gameId]?.seconds}s`
                              : data?.Game[0].schedule < Date.now() ? "Exam Already Started" : "Join Now"
                            }
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </>
                  );
                })
              ) : (
                <Text
                  style={{
                    textAlign: "center",
                    color: "red",
                    justifyContent: "center",
                    fontFamily: "Jaldi-Regular",
                    alignItems: "center",
                    borderColor: "red",
                    borderRadius: 10,
                    marginVertical: 20,
                    marginHorizontal: 20,
                    paddingVertical: 20,
                    fontSize: 18,
                  }}
                >
                  No data found
                </Text>
              )}
            </View>
          ) : null}

          {tabSelect == 1 ? (
            <View>
              {examData?.length > 0 ? (
                [...examData].sort((a, b) => b.schedule - a.schedule).map((item, index) => {

                  return (
                    <View
                      key={index}
                      style={{
                        // height: responsiveHeight(45),
                        width: responsiveWidth(90),
                        paddingVertical: 20,
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
                          color: "#6A5ADF",
                          fontWeight: "500",
                          fontSize: 16,
                          marginTop: 15,
                        }}
                      >
                        {item.gameNameInEnglish}
                      </Text>
                      <Text
                        style={{
                          color: "#000",
                          fontWeight: "500",
                          fontSize: 14,
                          marginTop: 5,
                        }}
                      >
                        Rank : #{item?.rank}
                      </Text>

                      <View
                        style={{ borderBottomWidth: 0.6, marginTop: 10 }}
                      ></View>

                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "flex-start",
                          marginTop: 10,
                        }}
                      >
                        <Image
                          source={require("../images/calender.png")}
                          style={{
                            tintColor: "#6A5ADF",
                            height: responsiveHeight(4),
                            width: responsiveWidth(8),
                          }}
                        />

                        <Text
                          style={{
                            alignSelf: "center",
                            marginLeft: 10,
                            fontSize: 13,
                          }}
                        >
                          {convertMillisecondsToDateTime(item?.schedule)}
                        </Text>
                      </View>

                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "flex-start",
                          marginTop: 10,
                        }}
                      >
                        <Image
                          source={require("../images/question.png")}
                          style={{
                            tintColor: "#6A5ADF",
                            height: responsiveHeight(4),
                            width: responsiveWidth(8),
                          }}
                        />

                        <Text
                          style={{
                            alignSelf: "center",
                            marginLeft: 10,
                            fontSize: 13,
                          }}
                        >
                          {item?.Game[0].noOfQuestion} Questions 
                        </Text>
                      </View>

                      <View
                        style={{
                          height: responsiveHeight(5),
                          justifyContent: "center",
                          borderRadius: 20,
                          width: responsiveWidth(80),
                          marginTop: 10,
                          backgroundColor: "#EDEAFB",
                          alignSelf: "center",
                        }}
                      >
                        <Text
                          style={{
                            marginLeft: 10,
                            color: "#6A5ADF",
                            fontWeight: "500",
                            fontSize: 14,
                          }}
                        >
                          Joined : {item?.Game[0]?.UserGame.length}
                        </Text>
                      </View>

                      <View
                        style={{
                          height: responsiveHeight(5),
                          justifyContent: "center",
                          borderRadius: 20,
                          width: responsiveWidth(80),
                          marginTop: 10,
                          backgroundColor: "#EDEAFB",
                          alignSelf: "center",
                        }}
                      >
                        <Text
                          style={{
                            marginLeft: 10,
                            color: "#6A5ADF",
                            fontWeight: "500",
                            fontSize: 14,
                          }}
                        >
                          Joined Fees: ₹{item?.Game[0]?.entranceAmount}
                        </Text>
                      </View>

                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-between",
                        }}
                      >
                        <TouchableOpacity
                          style={{
                            height: responsiveHeight(4.8),
                            justifyContent: "center",
                            borderRadius: 25,
                            width: responsiveWidth(38),
                            marginTop: 20,
                            backgroundColor: "#6A5AE0",//{item?.Game[0].noOfQuestion}
                          }}
                          onPress={() => navigation.navigate("WinnerDetail", { gameid: item?.gameId, noOfQue: item?.Game[0].noOfQuestion })}
                        >
                          <Text
                            style={{
                              color: "#fff",
                              fontWeight: "400",
                              alignSelf: "center",
                              fontSize: 16,
                            }}
                          >
                            Leaderboard
                          </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                          style={{
                            height: responsiveHeight(4.8),
                            justifyContent: "center",
                            borderRadius: 25,
                            width: responsiveWidth(38),
                            marginTop: 20,
                            backgroundColor: "#6A5AE0",
                          }}
                          onPress={() => navigation.navigate("AllLeaderboard", { gameid: item?.gameId, noOfQue: item?.Game[0].noOfQuestion })}
                        >
                          <Text
                            style={{
                              color: "#fff",
                              fontWeight: "400",
                              alignSelf: "center",
                              fontSize: 16,
                            }}
                          >
                            Show Result
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  );
                })
              ) : (
                <Text
                  style={{
                    textAlign: "center",
                    color: "red",
                    justifyContent: "center",
                    fontFamily: "Jaldi-Regular",
                    alignItems: "center",
                    borderColor: "red",
                    borderRadius: 10,
                    marginVertical: 20,
                    marginHorizontal: 20,
                    paddingVertical: 20,
                    fontSize: 18,
                  }}
                >
                  No data found
                </Text>
              )}
            </View>
          ) : null}
        </ScrollView>
      </View>

      <Footer />
    </View>
  );
};

export default MyExam;
