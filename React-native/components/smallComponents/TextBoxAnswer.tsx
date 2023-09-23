import { Box, HStack, Pressable, Text, useToast } from 'native-base'
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Animated } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import { useTranslation, Trans } from "react-i18next";

export default function TextBoxAnswer(props: any) {

    const toast = useToast();

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
        }} rounded="xl" shadow={2} >
            <Pressable onPress={() => toast.show({
                title: "Travel function coming soon...",
                placement: "bottom-right"
            })}  >
                {({
                    isPressed
                }) => {
                    return <Box style={{
                        transform: [{
                            scale: isPressed ? 1 : 0.96
                        }]
                    }}>
                        <Box rounded="md" justifyContent={"space-between"} mt="3" ml="2" mr="2" >
                            <Box>
                                <Box>
                                    <Text fontSize={25} fontWeight='500'>
                                        {t("content.Answer1")}
                                    </Text>

                                    <Text fontSize={14} mt={6} >
                                        {t("content.Answer2")}
                                    </Text>
                                </Box>
                                <Animated.View style={{ opacity: fadeAnim }}>
                                    <Text fontSize={45} textAlign={'right'}>📒</Text>
                                </Animated.View>
                            </Box>
                        </Box >
                    </Box>;
                }}
            </Pressable>
        </Box>
        // </TouchableOpacity>
        // </Box>

    )
}

const styles = StyleSheet.create({

    borderBottomRight: {
        borderBottomRightRadius: 20,
        borderBottomLeftRadius: 0,
        // borderTopLeftRadius: 0,
    },
});


