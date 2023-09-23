import React, { useState } from 'react'
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Text, NativeBaseProvider, Box, HStack, Center, Heading, VStack, Icon, FormControl, Input, Link, Button, Alert, IconButton, CloseIcon, useColorMode, Skeleton, FlatList } from "native-base";
import { registerAPI } from '../../../api/authAPI';
import { login } from '../../../features/auth/authSlice';
import { useTranslation, Trans } from "react-i18next";

import { useAppDispatch } from "../../../app/hook"
import { useNavigation } from '@react-navigation/native';
export default function SignUp({ navigation }: { navigation: any }) {
  const [email, setEmail] = useState('');
  const [nickname, setNickName] = useState('');
  const [password, setPassword] = useState('');
  const { t, i18n } = useTranslation();

  const { colorMode, toggleColorMode } = useColorMode();
  const textColor = colorMode === 'dark' ? '#FFFFFF' : '#000000';
  const dispatch = useAppDispatch()
  const navigationHooks = useNavigation();

  const handleSignUp = async () => {
    try {

      const result = await registerAPI(email, password, nickname)
      if (result) {
        console.log(result);
        // dispatch(login(result))
        // @ts-ignore
        navigationHooks.navigate('Sign In')
      } else {
        // Error Handling, using react-toast is one possibility
      }


    } catch (error) {
      console.log('Server login error: ' + error);
      throw error;
    }
  }

  return (
    <View style={{ flex: 1 }}>
      <ScrollView>

        <Center w="100%">
          <Box safeArea p="2" w="90%" maxW="290" py="40">
            <Heading size="lg" color={colorMode === 'dark' ? 'white' : 'black'} fontWeight="semibold">
              {t("content.Welcome")}
            </Heading>
            <Heading mt="1" color="#235BEC" fontWeight="medium" size="xs">
              {t("content.continue")}
            </Heading>
            <VStack space={3} mt="5">
              <FormControl>
                <FormControl.Label>{t("content.Email")}</FormControl.Label>
                <Input value={email}
                  onChangeText={setEmail}
                  color={textColor}

                />
              </FormControl>
              <FormControl>
                <FormControl.Label>{t("content.Nickname")}</FormControl.Label>
                <Input type="text"
                  value={nickname}
                  onChangeText={setNickName}
                  color={textColor}
                />
              </FormControl>
              <FormControl>
                <FormControl.Label>{t("content.Password")}</FormControl.Label>
                <Input type="password"
                  secureTextEntry
                  value={password}
                  onChangeText={setPassword}
                  color={textColor}
                />
              </FormControl>
              <Button mt="2" bg="#235BEC" onPress={handleSignUp}>
                {t("content.Create")}
              </Button>
            </VStack>
          </Box>
        </Center>


        {/* <Center w="100%">
          <HStack w="90%" maxW="400" borderWidth="1" space={8} rounded="md" _dark={{
            borderColor: "coolGray.500"
          }} _light={{
            borderColor: "coolGray.200"
          }} p="4">
            <Skeleton flex="1" h="150" rounded="md" startColor="coolGray.100" />
            <VStack flex="3" space="4">
              <Skeleton startColor="coolGray.100" />
              <Skeleton.Text />
              <HStack space="2" alignItems="center">
                <Skeleton size="5" rounded="full" />
                <Skeleton h="3" flex="2" rounded="full" />
                <Skeleton h="3" flex="1" rounded="full" startColor="indigo.300" />
              </HStack>
            </VStack>
          </HStack>
        </Center> */}
        {/*<Center> 
        <Alert w="90%" status="success" bg={'white'}>
            <VStack space={1} flexShrink={1} w="100%" alignItems="center">
              <Alert.Icon size="md" />
              <Text fontSize="md" fontWeight="medium" _dark={{
                color: "coolGray.800"
              }}>
                Application received!
              </Text>

              <Box _text={{
                textAlign: "center"
              }} _dark={{
                _text: {
                  color: "coolGray.600"
                }
              }}>
                Your application has been received. We will review your
                application and respond within the next 48 hours.
              </Box>
            </VStack>
          </Alert> 
          </Center>*/}

      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //   backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },

});