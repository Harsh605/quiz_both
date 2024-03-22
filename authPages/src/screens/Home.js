import { View, Text, StatusBar, Image, TextInput, TouchableOpacity, Linking, FlatList, RefreshControl } from "react-native";
import React, { useEffect, useState } from "react";
import loding from "../images/loding.gif"
import Modal from "react-native-modal";
import Toast from 'react-native-toast-message';
import { responsiveFontSize, responsiveHeight, responsiveWidth, } from "react-native-responsive-dimensions";
import { ScrollView } from "react-native-gesture-handler";
import { convertMillisecondsToDateTime } from "../utils/FormateTime";
import { useDispatch, useSelector } from "react-redux";
import { allOnGoingExams, allSliders, allSocialLinks, myProfile, pdowinLogo } from "../../slices/userSlice";
import Topbar from "../components/Topbar";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const Home = ({ navigation }) => {
  const dispatch = useDispatch()
  const [imgData, setimgData] = useState([]);
  const [logodata, setLogodata] = useState([]);

  const [refreshing, setRefreshing] = useState(false);
  const [lodings, setlodings] = useState(true)



  const { allLiveExams, isLoading, sliders, myProfileData, socialLinks, brandLogo } = useSelector((state) => state.userCustom)


  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      dispatch(allOnGoingExams())
      setRefreshing(false);
    }, 2000);
  }, []);

  useEffect(() => {
    const fetchData = () => {
      dispatch(allOnGoingExams())
    };

    // Fetch data immediately when the component mounts
    fetchData();

    // Set interval to fetch data every 2 minutes
    const intervalId = setInterval(fetchData, 1 * 50 * 1000); // 2 minutes

    // Clean up function to clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, [dispatch])

  useEffect(() => {
    dispatch(allSliders())
  }, [dispatch])

  useEffect(() => {
    dispatch(myProfile())
  }, [dispatch])

  useEffect(() => {
    onRefresh()
  }, []);


  // console.log(myProfileData?.user[0].userWallet[0].userId)
  // console.log("allLiveExams", allLiveExams?.upcomingGames[0])

  return (
    <>

      {/* <OrientationLoadingOverlay
        visible={isLoading}
        color="white"
        indicatorSize="large"
        messageFontSize={24}
        message="Loading... "
      /> */}
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

          <Toast ref={(ref) => Toast.setRef(ref)} />


          <Navbar navigation={navigation} />
        </View>




        <ScrollView style={{ height: responsiveHeight(100) }}>
          <View style={{ marginTop: "7%" }}>
            <FlatList
              showsHorizontalScrollIndicator={false}
              data={[1]}
              horizontal={true}
              renderItem={() => {
                return (
                  <View style={{ flexDirection: "row", flex: 1 }}>
                    {sliders?.map((data, index) => {
                      return (
                        <View
                          key={index}
                          style={{
                            height: responsiveHeight(10),
                            width: responsiveWidth(90),
                            backgroundColor: "white",
                            alignSelf: "center",
                            borderRadius: 10,
                            marginRight: 10,
                            marginLeft: 18,
                          }}
                        >
                          <TouchableOpacity style={{ flexDirection: "row" }}>
                            <Image
                              source={{
                                uri: `https://quiz.metablocktechnologies.org/uploads/${data.img}`,
                              }}
                              style={{
                                backgroundColor: "#EDEAFB",
                                height: responsiveHeight(9),
                                width: responsiveWidth(90),
                                alignSelf: "center",
                                borderRadius: 15,
                                resizeMode: 'cover'
                              }}
                            />
                          </TouchableOpacity>
                        </View>
                      );
                    })}
                  </View>
                );
              }}
            />
          </View>

          <Text
            style={{
              marginHorizontal: 20,
              marginTop: 15,
              color: "#000",
              fontSize: 18,
              fontWeight: "600",
            }}
          >
            Upcoming Quiz
          </Text>


          <ScrollView refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
            {allLiveExams?.upcomingGames.length > 0 ? (allLiveExams?.upcomingGames?.map((data, index) => {
              return (
                <>
                  <View
                    style={{
                      height: responsiveHeight(45),
                      width: responsiveWidth(90),
                      paddingHorizontal: 20,
                      backgroundColor: "#fff",
                      alignSelf: "center",
                      marginTop: 20,
                      borderRadius: 5,
                      elevation: 10,
                      marginVertical: 20
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
                      {/* {index} */}
                      {data?.gameNameInEnglish}
                    </Text>
                    {/* <Text style={{ color: '#6A5ADF', fontWeight: '500', fontSize: 16, marginTop: 15 }}>{data._id}</Text> */}

                    <Text
                      style={{
                        color: "#000",
                        fontWeight: "400",
                        fontSize: 14,
                        marginTop: 5,
                      }}
                    >
                      {data?.category}
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
                        {data.noOfQuestion} Questions
                        {/* Time{" "} */}
                        {/* {parseInt(parseInt(data.duration) / 60000)} mins */}
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
                        {/* {console.log(data.UserGame.length, "kkkjggy")} */}
                        Joined Member: {data.UserGame.length}
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
                        Joined Fees: ₹ {data?.entranceAmount}
                      </Text>
                    </View>

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
                      disabled={data.UserGame.some(userGame => userGame.userId === myProfileData?.user[0].userWallet[0].userId)}
                      onPress={() => navigation.navigate("QuizType", { joinedMembers: data?.UserGame.length, amount: data?.entranceAmount, g_idd: data._id, tsedule: data.schedule })}
                    >
                      <Text
                        style={{
                          color: "#fff",
                          fontWeight: "400",
                          alignSelf: "center",
                          fontSize: 16,
                        }}
                      >
                        {data.UserGame.some(userGame => userGame.userId === myProfileData?.user[0].userWallet[0].userId) ? "Joined" : "Join Now"}
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

          </ScrollView>



        </ScrollView>

        <Footer navigation={navigation} />
      </View>
    </>
  );
};

export default Home;
