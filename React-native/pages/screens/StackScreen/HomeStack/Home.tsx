import React, { useState, useEffect, useRef } from 'react';
import { View, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Text, Button, NativeBaseProvider, Box, HStack, Heading, VStack, Stack, extendTheme, Switch, useColorMode, Divider, FlatList } from "native-base";
import TextBar from '../../../../components/TextBar';
import HomeTop from '../../../../components/HomeTop';
import HomeBottom from '../../../../components/HomeBottom';
import BubbleList from '../../../../components/BubbleList';
import { useSelector } from 'react-redux';
import { IRootState } from '../../../../store/store';
// import { wrap } from 'module';
// import { background } from 'native-base/lib/typescript/theme/styled-system';
import { useNavigation } from '@react-navigation/native';
import { Animated } from 'react-native';
import Heading1 from '../../../../components/smallComponents/Heading/Heading1';
import Heading2 from '../../../../components/smallComponents/Heading/Heading2';
import Heading3 from '../../../../components/smallComponents/Heading/Heading3';
import Heading4 from '../../../../components/smallComponents/Heading/Heading4';
import Heading5 from '../../../../components/smallComponents/Heading/Heading5';
import Heading6 from '../../../../components/smallComponents/Heading/Heading6';
// import { useTranslation } from 'react-i18next';
// import { Translation } from 'react-i18next';
import { useTranslation, Trans } from "react-i18next";



export default function Home() {
  const { t, i18n } = useTranslation();


  const navigation = useNavigation();
  // const route = useRoute();

  // const isAuthenticated = useSelector((state: IRootState) => state.auth.isAuthenticated);

  const { colorMode } = useColorMode();
  const textColor = colorMode === 'dark' ? '#FFFFFF' : 'black';

  // useEffect(() => {
  //   console.log(route.name);

  // }, [route.name])

  return (
    <View style={{ flex: 1 }}>
      <ScrollView>
        <Box >
          <BubbleList />

          <Heading1 />
          {/* <Heading ml="16px" mt="3" mb="3" color={textColor}>Suggested</Heading > */}

          <HomeTop navigation={navigation} />

          <HomeBottom navigation={navigation} />

          <Heading2 />
          <VStack space={2}>
            {[{ title: `${t("content.TextBar1")}`, emoji: `${t("content.Emoji1")}` },
            { title: `${t("content.TextBar2")}`, emoji: `${t("content.Emoji2")}` },
            { title: `${t("content.TextBar3")}`, emoji: `${t("content.Emoji3")}` }].map(v => <TextBar key={v.title} title={v.title} emoji={v.emoji} navigation={navigation} />)}
          </VStack>

          <Heading3 />
          <VStack space={2}>
            {[{ title: `${t("content.TextBar4")}`, emoji: `${t("content.Emoji4")}` },
            { title: `${t("content.TextBar5")}`, emoji: `${t("content.Emoji5")}` },
            { title: `${t("content.TextBar6")}`, emoji: `${t("content.Emoji6")}` }].map(v => <TextBar key={v.title} title={v.title} emoji={v.emoji} navigation={navigation} />)}
          </VStack>

          <Heading4 />
          <VStack space={2}>
            {[{ title: `${t("content.TextBar7")}`, emoji: `${t("content.Emoji7")}` },
            { title: `${t("content.TextBar8")}`, emoji: `${t("content.Emoji8")}` }].map(v => <TextBar key={v.title} title={v.title} emoji={v.emoji} navigation={navigation} />)}
          </VStack>

          <Heading5 />
          <VStack space={2}>
            {[{ title: `${t("content.TextBar9")}`, emoji: `${t("content.Emoji9")}` },
            { title: `${t("content.TextBar10")}`, emoji: `${t("content.Emoji10")}` }].map(v => <TextBar key={v.title} title={v.title} emoji={v.emoji} navigation={navigation} />)}
          </VStack>

          <Heading6 />
          <VStack space={2} mb="5">
            {[{ title: `${t("content.TextBar11")}`, emoji: `${t("content.Emoji11")}` },
            { title: `${t("content.TextBar12")}`, emoji: `${t("content.Emoji12")}` }].map(v => <TextBar key={v.title} title={v.title} emoji={v.emoji} navigation={navigation} />)}
          </VStack>

        </Box >
      </ScrollView>
    </View >
  )
}

function ToggleDarkMode() {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <HStack space={2} alignItems="center">
      <Text>Dark</Text>
      <Switch
        isChecked={colorMode === "light"}
        onToggle={toggleColorMode}
        aria-label={
          colorMode === "light" ? "switch to dark mode" : "switch to light mode"
        }
      />
      <Text>Light</Text>
    </HStack>
  );
}


const styles = StyleSheet.create({
  textIcon: {
    display: 'flex',
    alignContent: "space-between",
    alignSelf: "flex-start",
    flexDirection: "row",
    padding: 10,
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  textStyle: {
    fontSize: 14,
    padding: 9,
    // backgroundColor: "#262626",
    marginTop: 5,
    marginLeft: 5,
    color: "white",
    borderRadius: 50,
  },
  listStyle: {
    textAlign: "center",
    margin: 10,
    padding: 0,
  },
});