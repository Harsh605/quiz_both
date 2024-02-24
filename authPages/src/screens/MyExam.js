import {
  View,
  Text,
  StatusBar,
  Image,
  TextInput,
  TouchableOpacity,
  RefreshControl
} from "react-native";
import React, { useEffect, useState } from "react";
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import { ScrollView } from "react-native-gesture-handler";
import ScrollableTabView, {
  DefaultTabBar,
} from "react-native-scrollable-tab-view";
import moment from "moment";
import { base_url } from "./Base_url";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { formatTimestamp } from "./../utils/formatDate";
import { formattedTime } from "./../utils/FormateTime";
// import { FormatDateTime, } from './../utils/FormateTime';
// import { formatTimestamp } from "./../utils/formatDate";
import { useRoute } from '@react-navigation/native';
import Topbar from "../components/Topbar";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";


const MyExam = ({ navigation }) => {

  const route = useRoute();

  const [live, setLive] = useState(0);
  const [logodata, setLogodata] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [imgs, setimgs] = useState("")




  const [hit, setHit] = useState("LIVE");
  const [mydata, setMydata] = useState([]);
  // console.log(mydata[0]?.gameId,"hi");
  const [completedata, setCompletedata] = useState([]);
  const [seduleTime, setSeduleTime] = useState([]);
  const [filterText, setFilterText] = useState("");

  const [question, setQuestion] = useState([]);

  const [myUserid, setMyUserid] = useState();
  console.log(myUserid, "userIdoutline");
  const [myGameid, setMyGameid] = useState();

  const [times, settimes] = useState()


  function convertMillisecondsToDateTime(milliseconds) {
    const dateObject = new Date(milliseconds);
    return dateObject.toLocaleString();
  }

  const currentDate = new Date();
  const currentTime = currentDate.getTime();



  const millisToMinutesAndSeconds = (millis) => {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
  }

  const myexamApi = async ({ name, index }) => {
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
      console.log("hit",hit)

      fetch(`${base_url}/my-exam?type=${hit}&name=${name}`, requestOptions)
        .then((response) => response.json())
        .then(async (result) => {
          if (result.success == true) {
            console.log(result.data.userGameList, "popop");
            setMydata(result.data.userGameList);

            await AsyncStorage.setItem("_id2", result.data.userGameList[0]._id);
          } else {
            console.log(result.message, "else");
          }
        })
        .catch((error) => console.log("errorcatch", error));
    } catch (error) {
      console.log(error, "examerror");
    }
  };

  async function navigetLo(times) {
    const currentTimeInMilliseconds = new Date().getTime();
    let availableTime = times - currentTimeInMilliseconds
    const availableMinutes = Math.floor(availableTime / (1000 * 60));
    settimes(availableMinutes)
    if (availableMinutes < 0) {
      alert("Expiration date ")
    }
    else if (availableMinutes <= 5) {
      navigation.navigate("Instruction", {
        times: await availableMinutes,
        g_id: await myGameid,
        u_id: await myUserid,

      });
    }
    else {
      alert(`Wait ${availableMinutes - 5} minutes and try again`);
      // navigation.navigate("Instruction",{
      //   times:availableMinutes
      // });
    }

  }

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      myexamApi()
      setRefreshing(false);
    }, 2000);
  }, []);



  useEffect(async () => {
    setimgs(await AsyncStorage.getItem("pr"))
    onRefresh()
    myexamApi({ name: filterText })
  }, [filterText]);



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
            borderWidth: live == 0 ? 0 : 1,
            width: responsiveWidth(42),
            marginTop: 20,
            backgroundColor: live == 0 ? "#6A5AE0" : "#fff",
            alignSelf: "flex-start",
          }}
          onPress={() => setLive(0)}
        >
          <Text
            style={{
              color: live == 0 ? "#fff" : "#000",
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
            borderWidth: live == 1 ? 0 : 1,
            justifyContent: "center",
            borderRadius: 25,
            width: responsiveWidth(42),
            marginTop: 20,
            backgroundColor: live == 1 ? "#6A5AE0" : "#fff",
            alignSelf: "flex-start",
          }}
          onPress={() =>
            setLive(1)
            // , setHit("COMPLETED");
          }
        >
          <Text
            style={{
              color: live == 1 ? "#fff" : "#000",
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
              // value={filterText}
              onChangeText={(value) => setFilterText(value)}
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
          {live == 0 ? (
            <View>
              {mydata?.length > 0 ? (
                mydata.filter(item => item.isCompleted === true).map((data, index) => {
                  // console.log(data, 'data');
                  // console.log(data?.userId,"inlineUseriddd..");
                  // console.log(data?.isCompleted,"isCompleted..");


                  return (
                    <>
                      <View
                        style={{
                          height: responsiveHeight(45),
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
                          {data?.Game[0].category}
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
                            {data?.Game[0].noOfQuestion} Questions | Time {millisToMinutesAndSeconds(data?.Game[0].duration)} minss
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
                            Joined Member : {data?.Game[0].UserGame.length}
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
                            Joined Fees: ₹{data?.Game[0].entranceAmount}
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
                            width: responsiveWidth(28),
                            marginTop: 20,
                            backgroundColor: "#A9A3E9",
                            alignSelf: "flex-start",
                          }}
                          onPress={() => {
                            setMyGameid(data?.gameId), setMyUserid(data?.userId),
                              navigetLo(data?.schedule)
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
                            Join Now
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

          {live == 1 ? (
            <View>
              {mydata?.length > 0 ? (
                mydata.filter(item => item.isCompleted === true).map((item) => {
                  // console.log(item.gameNameInEnglish, "inlinedataabhi");
                  // console.log(item?.isCompleted,"isCompleted..");

                  return (
                    <>
                      <View
                        style={{
                          height: responsiveHeight(45),
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
                            {formatTimestamp(item?.schedule)}
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
                            {item?.Game[0].noOfQuestion} Questions | Time 18 mins
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
                            Joined : {item?.businessDate}
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
                            Joined Fees: {item?.amount}
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
                            onPress={() => navigation.navigate("LeaderboardRank", { QuestionNo: (item?.Game[0].noOfQuestion) })}
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
                            onPress={() => navigation.navigate("MyQuestions", { QuestionNo: (item?.Game[0].noOfQuestion) })}
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
                  No data
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
