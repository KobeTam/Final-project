import { Box, HStack, Pressable, Text } from 'native-base'
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Animated } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import { useTranslation, Trans } from "react-i18next";

export default function TextBoxImage(props: any) {

    const fadeAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        animateText();
    }, []);

    const animateText = () => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 3000, // Adjust the duration as needed
            useNativeDriver: true,
        }).start();
    };
    const { t, i18n } = useTranslation();

    return (
        <Box pl="2" h="40" w="55%" _dark={{
            bg: "#262626"
        }} _light={{
            bg: "white"
        }} rounded="xl" shadow={2}>
            <Pressable onPress={() => props.navigation.navigate("ImagePick")} >
                {({
                    isPressed
                }) => {
                    return <Box style={{
                        transform: [{
                            scale: isPressed ? 1 : 0.96
                        }]
                    }}>
                        <Box mt="3" ml="2" mr="2" rounded="md" justifyContent={"space-between"}>
                            <Box>
                                <Box>
                                    <Text fontSize={25} fontWeight='500'>
                                        {t("content.Image1")}
                                    </Text>
                                    <Text fontSize={14} mt={6} >
                                        {t("content.Image2")}
                                    </Text>
                                </Box>
                                <Animated.View style={{ opacity: fadeAnim }}>
                                    <Text fontSize={45} textAlign={'right'}>📸</Text>
                                </Animated.View>
                            </Box>
                        </Box>
                    </Box>;
                }}
            </Pressable>
        </Box>
    )
}

const styles = StyleSheet.create({
    borderTopLeft: {
        borderTopLeftRadius: 20,
        borderTopRightRadius: 0,
        // borderBottomRightRadius:0,
    }
});