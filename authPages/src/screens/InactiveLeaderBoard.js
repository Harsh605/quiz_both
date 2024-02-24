import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import {
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import {} from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

const InactiveLeaderBoard = ({ navigation }) => {
  return (
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
            onPress={() => navigation.goBack()}
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
              marginLeft: 20,
            }}
          >
            Name
          </Text>
          <Text
            style={{
              alignSelf: "center",
              color: "#000",
              fontWeight: "500",
              marginLeft: 20,
            }}
          >
            Option
          </Text>
          <View>
            <Text
              style={{
                alignSelf: "center",
                color: "#000",
                fontWeight: "500",
                marginLeft: 10,
              }}
            >
              Time
            </Text>
            <Text
              style={{
                alignSelf: "center",
                color: "#000",
                fontWeight: "500",
                marginLeft: 10,
              }}
            >
              taken
            </Text>
          </View>
          <Text
            style={{ alignSelf: "center", color: "#000", fontWeight: "500" }}
          >
            %
          </Text>

          <Text
            style={{ alignSelf: "center", color: "#000", fontWeight: "500" }}
          >
            Point
          </Text>
        </View>

        <View
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
        >
          <Text style={{ alignSelf: "center", color: "#6A5AE0" }}>#1</Text>
          <Text style={{ alignSelf: "center", color: "#000" }}>Kamal ka..</Text>
          <Text style={{ alignSelf: "center", color: "green" }}>5 sec</Text>
          <Text style={{ alignSelf: "center", color: "#000" }}>B</Text>
          <Text style={{ alignSelf: "center", color: "#000" }}>7</Text>

          <Text
            style={{ alignSelf: "center", color: "#000", fontWeight: "500" }}
          >
            7.5
          </Text>
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingHorizontal: 10,
            height: responsiveHeight(6),
            width: responsiveWidth(90),
            borderRadius: 2,
            marginTop: 5,
            backgroundColor: "#fff",
            elevation: 10,
            alignSelf: "center",
          }}
        >
          <Text style={{ alignSelf: "center", color: "#6A5AE0" }}>#1</Text>
          <Text style={{ alignSelf: "center", color: "#000" }}>Kamal ka..</Text>
          <Text style={{ alignSelf: "center", color: "green" }}>5 sec</Text>
          <Text style={{ alignSelf: "center", color: "#000" }}>B</Text>
          <Text style={{ alignSelf: "center", color: "#000" }}>7</Text>

          <Text
            style={{ alignSelf: "center", color: "#000", fontWeight: "500" }}
          >
            7.5
          </Text>
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingHorizontal: 10,
            height: responsiveHeight(6),
            width: responsiveWidth(90),
            borderRadius: 2,
            marginTop: 5,
            backgroundColor: "#fff",
            elevation: 5,
            alignSelf: "center",
          }}
        >
          <Text style={{ alignSelf: "center", color: "#6A5AE0" }}>#1</Text>
          <Text style={{ alignSelf: "center", color: "#000" }}>Kamal ka..</Text>
          <Text style={{ alignSelf: "center", color: "green" }}>5 sec</Text>
          <Text style={{ alignSelf: "center", color: "#000" }}>B</Text>
          <Text style={{ alignSelf: "center", color: "#000" }}>7</Text>

          <Text
            style={{ alignSelf: "center", color: "#000", fontWeight: "500" }}
          >
            7.5
          </Text>
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingHorizontal: 10,
            height: responsiveHeight(6),
            width: responsiveWidth(90),
            borderRadius: 2,
            marginTop: 5,
            backgroundColor: "#fff",
            elevation: 5,
            alignSelf: "center",
          }}
        >
          <Text style={{ alignSelf: "center", color: "#6A5AE0" }}>#1</Text>
          <Text style={{ alignSelf: "center", color: "#000" }}>Kamal ka..</Text>
          <Text style={{ alignSelf: "center", color: "green" }}>5 sec</Text>
          <Text style={{ alignSelf: "center", color: "#000" }}>B</Text>
          <Text style={{ alignSelf: "center", color: "#000" }}>7</Text>

          <Text
            style={{ alignSelf: "center", color: "#000", fontWeight: "500" }}
          >
            7.5
          </Text>
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingHorizontal: 10,
            height: responsiveHeight(6),
            width: responsiveWidth(90),
            borderRadius: 2,
            marginTop: 5,
            backgroundColor: "#fff",
            elevation: 5,
            alignSelf: "center",
          }}
        >
          <Text style={{ alignSelf: "center", color: "#6A5AE0" }}>#1</Text>
          <Text style={{ alignSelf: "center", color: "#000" }}>Kamal ka..</Text>
          <Text style={{ alignSelf: "center", color: "green" }}>5 sec</Text>
          <Text style={{ alignSelf: "center", color: "#000" }}>B</Text>
          <Text style={{ alignSelf: "center", color: "#000" }}>7</Text>

          <Text
            style={{ alignSelf: "center", color: "#000", fontWeight: "500" }}
          >
            7.5
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default InactiveLeaderBoard;
