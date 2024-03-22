import {
  View,
  Text,
  StatusBar,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import { ScrollView } from "react-native-gesture-handler";
import ScrollableTabView, {
  DefaultTabBar,
} from "react-native-scrollable-tab-view";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { base_url } from "./Base_url";
import { useNavigation, useIsFocused, useRoute } from '@react-navigation/native'




const LeaderboardRank = ({ navigation, props }) => {

  const route = useRoute();

  const noOfQue = route.params?.QuestionNo || null;

  console.log(noOfQue, "noOfQuenoOfQue");

  const [mydata, setMydata] = useState([])
  const [filterText, setFilterText] = useState("");


  const leadershipApi = async ({ name }) => {
    try {
      var myHeaders = new Headers();
      myHeaders.append("Authorization", `${await AsyncStorage.getItem("token")}`);
      myHeaders.append("Content-Type", "application/json");

      console.log(`${await AsyncStorage.getItem("g_id")}`);

      var raw = JSON.stringify({
        "gameId": `${await AsyncStorage.getItem("g_id")}`
      });

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };

      fetch(`${base_url}/quiz-leadership?name=${name}`, requestOptions)
        .then(response => response.json())
        .then(result => {
          if (result.success == true) {
            console.log(result.data.gameLeadership[0].UserGame[0])
            setMydata(result.data.gameLeadership[0].UserGame)

          }
        })
        .catch(error => console.log('error', error));

    } catch (error) {

    }
  }

  useEffect(() => {
    leadershipApi({ name: filterText })
  }, [filterText]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <StatusBar
        translucent={true}
        barStyle={"light-content"}
        backgroundColor={"#6A5AE0"}
      />

      <View
        style={{
          height: responsiveHeight(7),
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
              marginTop: 4,
            }}
          >
            <AntDesign name="arrowleft" size={24} color="white" />
          </TouchableOpacity>

          <Text
            style={{
              color: "#fff",
              fontSize: 20,
              fontWeight: "400",
              alignSelf: "center",
              marginLeft: "6%",
            }}
          >
            Leaderboard Rank
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
            width: responsiveWidth(84),
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
          mydata?.map((res, index) => {
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
                  onPress={() => navigation.navigate("AllQuestion", { id: (res.User[0].id), queNo: noOfQue })}
                >
                  <Text style={{ alignSelf: "center", color: "#6A5AE0", flex: 0.25 }}>{res?.rank}</Text>
                  <Text style={{ alignSelf: "center", color: "#000", flex: 0.25 }}>{res.User[0].name}</Text>
                  <Text style={{ alignSelf: "center", color: "green", flex: 0.25 }}>{res.User[0].id}</Text>


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
    </SafeAreaView>
  );
};

export default LeaderboardRank;
