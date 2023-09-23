import React, { useEffect, useState } from "react";
// import AuthProvider from "./context/AuthContent";
import { NativeBaseProvider, extendTheme, theme, useColorMode } from 'native-base';
import { store } from "./store/store";

import { Provider } from "react-redux";
import AppStack from "./pages/screens/StackScreen/AppStack/AppStack";
// import AppStack from "./pages/screens/StackScreen/AuthPage/AppStack";
import { API_URL } from "@env"
import "./components/General/i18n"

const config = {
  useSystemColorMode: false,
  initialColorMode: 'dark',
};

const customTheme = extendTheme({ config });

export default function App() {

  useEffect(() => {
    console.log("API_URL: ", API_URL);

  }, [])

  return (
    <Provider store={store}>
      <NativeBaseProvider theme={customTheme}>
        <AppStack />
      </NativeBaseProvider>
    </Provider>
  );
}

