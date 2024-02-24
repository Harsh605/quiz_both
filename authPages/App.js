import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
// import { ToastProvider } from 'react-native-toast-message';
import { Provider, useDispatch, useSelector } from 'react-redux'; // Import Provider from react-redux
import store from './Store'; // Import your Redux store

import Home from "./src/screens/Home";
import Sidebar from "./src/screens/Sidebar";
import Login from "./src/screens/Login";
import Notification from "./src/screens/Notification";
import Register from "./src/screens/Register";
import ForgotPass from "./src/screens/ForgotPass";
import NewPass from "./src/screens/NewPass";
import QuizType from "./src/screens/QuizType";
import Winner from "./src/screens/Winner";
import WinnerDetail from "./src/screens/WinnerDetail";
import LeaderboardRank from "./src/screens/LeaderboardRank";

import MyExam from "./src/screens/MyExam";
import Instruction from "./src/screens/Instruction";
import MyLeaderBoard from "./src/screens/MyLeaderBoard";
import ExamLeaderboard from "./src/screens/ExamLeaderboard";
import Dummy from "./src/screens/Dummy";
import sc1 from "./src/screens/sc1";
import Scc from "./src/screens/Scc";
import Percentage from "./src/screens/Percentage";
import AllLeaderRank from "./src/screens/AllLeaderRank";
import AllLeaderboard from "./src/screens/AllLeaderboard";
import Profile from "./src/screens/Profile";
import UploadKyc from "./src/screens/UploadKyc";
import Upload from "./src/screens/Upload";
import IntroSlider from "./src/screens/IntroSlider";
import MyBalance from "./src/screens/MyBalance";
import MyTransaction from "./src/screens/MyTransaction";
import ReferEarn from "./src/screens/ReferEarn";
import HowtoPlay from "./src/screens/HowtoPlay";
import More from "./src/screens/More";
import AboutUs from "./src/screens/AboutUs";
import Policy from "./src/screens/Policy";
import TermCondition from "./src/screens/TermCondition";
import Refund from "./src/screens/Refund";
import Feedback from "./src/screens/Feedback";
import kkk from "./src/screens/kkk";
import Help from "./src/screens/Help";
import Introduction from "./src/screens/Introduction";
import AllQuestion from "./src/screens/AllQuestion";
import Analysis from "./src/screens/Analysis";
import Faq from "./src/screens/Faq";
import Welcome from "./src/screens/Welcome";
import Socketio from "./src/screens/Socketio";
import InactiveLeaderBoard from "./src/screens/InactiveLeaderBoard";
import { SocketProvider } from "./src/screens/Context/SocketContext";
import MyQuestions from "./src/screens/MyQuestions";
import Successful from "./src/screens/Successful";
import { myProfile } from "./slices/userSlice";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function Stacks() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(myProfile());
  }, [dispatch]);

  return (
    // <ToastProvider>

    <SocketProvider>
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen
          name="kkk"
          component={kkk}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Successful"
          component={Successful}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="IntroSlider"
          component={IntroSlider}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Home"
          component={MyDrawer}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Sidebar"
          component={Sidebar}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Notification"
          component={Notification}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Register"
          component={Register}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ForgotPass"
          component={ForgotPass}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="NewPass"
          component={NewPass}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="QuizType"
          component={QuizType}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="MyExam"
          component={MyExam}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Instruction"
          component={Instruction}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="MyLeaderBoard"
          component={MyLeaderBoard}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Winner"
          component={Winner}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="WinnerDetail"
          component={WinnerDetail}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="LeaderboardRank"
          component={LeaderboardRank}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ExamLeaderboard"
          component={ExamLeaderboard}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Dummy"
          component={Dummy}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="sc1"
          component={sc1}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Scc"
          component={Scc}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Percentage"
          component={Percentage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AllLeaderRank"
          component={AllLeaderRank}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AllLeaderboard"
          component={AllLeaderboard}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Profile"
          component={Profile}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="UploadKyc"
          component={UploadKyc}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Upload"
          component={Upload}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="MyBalance"
          component={MyBalance}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="MyTransaction"
          component={MyTransaction}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ReferEarn"
          component={ReferEarn}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="HowtoPlay"
          component={HowtoPlay}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="More"
          component={More}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AboutUs"
          component={AboutUs}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Policy"
          component={Policy}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="TermCondition"
          component={TermCondition}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Refund"
          component={Refund}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Feedback"
          component={Feedback}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Help"
          component={Help}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Introduction"
          component={Introduction}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AllQuestion"
          component={AllQuestion}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Analysis"
          component={Analysis}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Faq"
          component={Faq}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Welcome"
          component={Welcome}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Socketio"
          component={Socketio}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="InactiveLeaderBoard"
          component={InactiveLeaderBoard}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="MyQuestions"
          component={MyQuestions}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </SocketProvider>

  );
}

function MyDrawer() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <Sidebar {...props} />}
      screenOptions={{ drawerStyle: { width: "70%" }, drawerPosition: "left" }}
    >
      <Drawer.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
      <Drawer.Screen
        name="MyExam"
        component={MyExam}
        options={{ headerShown: false }}
      />
      <Drawer.Screen
        name="Winner"
        component={Winner}
        options={{ headerShown: false }}
      />
      <Drawer.Screen
        name="Percentage"
        component={Percentage}
        options={{ headerShown: false }}
      />
    </Drawer.Navigator>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stacks />
      </NavigationContainer>
    </Provider>
  );
}
