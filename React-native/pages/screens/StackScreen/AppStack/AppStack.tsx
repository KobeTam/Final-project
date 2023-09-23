import React, { useEffect, useState } from "react";
import { NavigationContainer, DarkTheme, DefaultTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Home from '../HomeStack/Home';
import { NativeBaseProvider, extendTheme, useColorMode } from 'native-base';
import { ChatRoom } from '../../chatRoom';
import { createStackNavigator } from '@react-navigation/stack';
import { useThemeStore } from '../../../../store/usethemeStore';
import LoginPage from "../../LoginSignUpStack/LoginPage";
import SignUp from "../../LoginSignUpStack/SignUp";
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View } from "react-native";
import { TextBarGPT } from "../HomeStack/TextBarGPT";
import SettingScreen from "../SettingSTack/Setting";
import { IRootState, store } from '../../../../store/store'
import { Provider, useDispatch, useSelector } from 'react-redux'
import NickName from "../../../../components/General/NickName";
import ToggleDarkMode from "../../../../components/General/ToggleDarkMode";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { login } from "../../../../features/auth/authSlice";
import jwt_decode from "jwt-decode";
import TestScreen from "../../TestScreen";
import HistoryHome from "../HistoryStack.tsx/HistoryHome";
import HistoryRecord from "../HistoryStack.tsx/HistoryRecord";
import OcrResult from "../HomeStack/OcrResult";
import ImagePickerExample from "../HomeStack/ImagePicker";
import { TravelChatRoom } from "../HomeStack/TravelChatRoom";
import { useTranslation, Trans } from "react-i18next";

// import { useNavigation } from '@react-navigation/native';


// import dotenv from 'dotenv';
// dotenv.config();


const Stack = createStackNavigator();

const Tab = createBottomTabNavigator();

const config = {
  useSystemColorMode: false,
  initialColorMode: 'dark',
};

const customTheme = extendTheme({ config });

function HomeStack() {
  const { t, i18n } = useTranslation();

  return (
    <Stack.Navigator screenOptions={{
      // headerRight: () => <NickName />
      // headerRight: () => <ToggleDarkMode />
    }}>
      <Stack.Screen name="Home" component={Home} options={{ title: `${t("content.Home")}`, headerTitleAlign: "center", }} />
      <Stack.Screen name="ImagePick" component={ImagePickerExample} options={{ title: `${t("content.ImagePick")}`, headerTitleAlign: "center", }} />
      <Stack.Screen name="TextBarGPT" component={TextBarGPT} options={{ title: `${t("content.TextBarGPT")}`, headerTitleAlign: "center", }} />
      <Stack.Screen name="Summaries" component={OcrResult} options={{ title: `${t("content.Summaries")}`, headerTitleAlign: "center", }} />
      <Stack.Screen name="TravelChatRoom" component={TravelChatRoom} options={{ title: `${t("content.TravelTips")}`, headerTitleAlign: "center", }} />

    </Stack.Navigator>
  )
}

function HistoryStack() {
  const { t, i18n } = useTranslation();

  return (
    <Stack.Navigator screenOptions={{
      // headerRight: () => <NickName />
      // headerRight: () => <ToggleDarkMode />
    }}>
      <Stack.Screen name="HistoryHome" component={HistoryHome} options={{ title: `${t("content.History")}`, headerTitleAlign: "center", }} />
      <Stack.Screen name="HistoryRecord" component={HistoryRecord} options={{ title: `${t("content.ChatRecord")}`, headerTitleAlign: "center", }} />

    </Stack.Navigator>
  )
}
function ChatsStack() {
  const { t, i18n } = useTranslation();

  return (
    <Stack.Navigator screenOptions={{

      // headerRight: () => <ToggleDarkMode />
    }}>
      <Stack.Screen name="ChatsScreen" component={ChatRoom} options={{ title: `${t("content.Chat")}`, headerTitleAlign: "center", }} />
    </Stack.Navigator>
  )
}

function LoginPageStack() {
  const { t, i18n } = useTranslation();

  return (
    <Stack.Navigator screenOptions={{
      // headerShown: false
      // headerRight: () => <ToggleDarkMode />

    }}
    >
      <Stack.Screen name="Sign In" component={LoginPage} options={{
        title: `${t("content.Name")}`, headerTitleAlign: "center",
      }} />
      <Stack.Screen name="SignUp" component={SignUp} options={{ title: `${t("content.SignUp")}`, headerTitleAlign: "center" }} />

    </Stack.Navigator>
  )
}


function SettingStack() {
  const { t, i18n } = useTranslation();

  return (
    <Stack.Navigator screenOptions={{
      // headerRight: () => <NickName />
      // headerRight: () => <ToggleDarkMode />
    }}>
      <Stack.Screen name="Setting" component={SettingScreen} options={{ title: `${t("content.setting")}`, headerTitleAlign: "center", }} />

    </Stack.Navigator>
  )
}


export default function AppStack() {
  // const { colorMode, toggleColorMode } = useColorMode();

  const theme = useThemeStore((state) => state.theme);
  const dispatch = useDispatch();
  // const navigation = useNavigation();
  const isAuthenticated = useSelector((state: IRootState) => state.auth.isAuthenticated);

  useEffect(() => {
    (async () => {
      try {
        let token = await AsyncStorage.getItem("token");
        if (token) {
          const data: any = jwt_decode(token)
          console.log("data", data);

          dispatch(login({ userId: data.userId, nickname: data.nickname }));


          // setTimeout(() => navigation.navigate("HomeScreen"), 200)

        }
      } catch (error) {
        console.log(error);
      }
    })()
  }, [])


  const { t, i18n } = useTranslation();

  return (
    <Provider store={store}>
      <NativeBaseProvider theme={customTheme}>
        <NavigationContainer theme={theme === "dark" ? DarkTheme : DefaultTheme}>
          <Tab.Navigator screenOptions={{
            // tabBarStyle: {
            //   backgroundColor: "white"
            // },
            headerShown: false,
            tabBarActiveTintColor: '#235BEC',
            tabBarStyle: {
              height: 50,
              paddingBottom: 5,
            }
          }}
          >
            <Tab.Screen name="SignInScreen" component={LoginPageStack} options={{
              tabBarLabel: 'LogIn',
              tabBarItemStyle: { display: 'none', },
            }} />

            {isAuthenticated && (
              <>
                <Tab.Screen name="HomeScreen" component={HomeStack} options={{
                  tabBarLabel: `${t("content.Home")}`,
                  tabBarIcon: ({ color }) => (
                    <Ionicons name="chatbubble-ellipses-outline" color={color} size={25} />
                  ),
                }} />

                <Tab.Screen name="Chats" component={ChatsStack} options={{
                  // tabBarBadge: 20,

                  tabBarLabel: `${t("content.Chat")}`,
                  tabBarIcon: ({ color }) => (
                    <Ionicons name="ios-newspaper-outline" color={color} size={25} />
                  ), tabBarBadgeStyle: {
                    backgroundColor: 'red',  //Change the background color here
                    color: 'white', //Change the color here
                  },
                }} />
                <Tab.Screen name="History" component={HistoryStack} options={{
                  tabBarLabel: `${t("content.History")}`,
                  tabBarIcon: ({ color }) => (
                    <MaterialIcons name="history" color={color} size={25} />
                  ),
                }} />
                <Tab.Screen name="SettingScreen" component={SettingStack} options={{
                  tabBarLabel: `${t("content.setting")}`,
                  tabBarIcon: ({ color }) => (
                    <MaterialIcons name="build" color={color} size={25} />
                  ),
                }} />
                {/* <Tab.Screen name="TestScreen" component={TestScreen} options={{
                  tabBarLabel: 'TestScreen',
                  tabBarIcon: ({ color }) => (
                    <MaterialIcons name="build" color={color} size={25} />
                  ),
                }} /> */}
              </>
            )}



          </Tab.Navigator>
        </NavigationContainer>
      </NativeBaseProvider>
    </Provider>
  );
}

