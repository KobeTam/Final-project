import React, { useEffect, useState } from 'react'
import { View, Image, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useToast, NativeBaseProvider, Box, HStack, Center, Heading, VStack, Icon, FormControl, Input, Link, Text, Button, useColorMode } from "native-base";
import { localLoginAPI } from '../../../api/authAPI';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAppDispatch } from "../../../app/hook"
import { useNavigation } from '@react-navigation/native';

import { login } from '../../../features/auth/authSlice';
import { useSelector } from 'react-redux';
import { IRootState } from '../../../store/store';
import { useTranslation, Trans } from "react-i18next";


export default function LoginPage({ navigation }: { navigation: any }) {
  const { t, i18n } = useTranslation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const isAuthenticated = useSelector((state: IRootState) => state.auth.isAuthenticated);
  const navigationHooks = useNavigation();
  const toast = useToast();

  const dispatch = useAppDispatch()
  const handleServerLogin = async () => {
    try {

      const result = await localLoginAPI(email, password)
      console.log("result:", result);

      if (result) {
        console.log("result:", result);
        dispatch(login(result))
        // #235BEC
        //@ts-ignore
        // navigationHooks.navigate('HomeScreen')
        // @ts-ignore
        toast.show({
          render: () => {
            return <Box bg="#235BEC" px="2" py="1" rounded="sm" mb={5}>
              {t("content.Toast")}Chat Check Track!
            </Box>;
          }
        })
        console.log("Navigating back to previous screen...");
        // Navigate to HomeScreen after successful login
        navigation.navigate('HomeScreen');
        console.log("Navigation complete.");
      } else {
        // Error Handling, using react-toast is one possibility
      }


    } catch (error) {
      console.log('Server login error: ' + error);
      throw error;
    }
  }

  useEffect(() => {
    if (isAuthenticated) {
      // @ts-ignore
      // setTimeout(() => navigation.navigate("HomeScreen"), 30)
      navigation.navigate("HomeScreen")
    }
  }, [isAuthenticated])

  const { colorMode, toggleColorMode } = useColorMode();
  const textColor = colorMode === 'dark' ? '#FFFFFF' : '#3873FF';
  const inputColor = colorMode === 'dark' ? '#FFFFFF' : '#000000';


  return (
    <NativeBaseProvider>
      <Center style={styles.container}>
        <Box safeArea p="2" py="40" w="90%" maxW="290">
          <Center>
            <Image
              source={require('../../../assets/LoginChatbotGrey.png')}
              style={styles.image}
            />
          </Center>
          {/* <Heading size="lg" fontWeight="600" color={colorMode === 'dark' ? 'white' : 'black'}
          >
            Welcome
          </Heading>
          <Heading mt="1"
            color="#235BEC"
            fontWeight="medium" size="xs">
            Sign in to continue!
          </Heading> */}

          <VStack space={3} mt="5">
            <FormControl>
              <FormControl.Label >{t("content.Email")}</FormControl.Label>
              <Input
                value={email}
                onChangeText={setEmail}
                color={inputColor}
              />
            </FormControl>
            <FormControl>
              <FormControl.Label>{t("content.Password")}</FormControl.Label>
              <Input type="password"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
                color={inputColor}
              />
              <Link _text={{
                fontSize: "xs",
                fontWeight: "500",
                color: textColor
              }} alignSelf="flex-end" mt="1">
                {t("content.Forgot")}
              </Link>
            </FormControl>
            {/* <Button mt="2" colorScheme="muted" onPress={createTwoButtonAlert}>
              Sign in
            </Button> */}

            <Button mt="2" bg="#235BEC" onPress={handleServerLogin}>
              {t("content.signIn")}
            </Button>

            <HStack mt="6" justifyContent="center">
              <Text fontSize="sm" color="coolGray.600" _dark={{
                color: "warmGray.200"
              }}>
                {t("content.New")}.{" "}
              </Text>
              <Link _text={{
                color: textColor,
                fontWeight: "medium",
                fontSize: "sm"
              }} onPress={() => navigation.navigate('SignUp')}>
                {t("content.SignUp")}
              </Link>
            </HStack>
          </VStack>
        </Box>
      </Center>
    </NativeBaseProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //   backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerBtn: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    width: 240,
    height: 70,
    borderWidth: 1,
    borderColor: "#666",
    borderRadius: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 20
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 50
  },
});