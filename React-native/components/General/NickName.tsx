// import { View, Text } from 'react-native'
import { useSelector } from 'react-redux';
import { StyleSheet } from 'react-native';
import { IRootState } from '../../store/store';
import { useColorMode, Text, View, HStack } from 'native-base';
import React, { useState, useEffect, useRef } from 'react';
import { Animated } from 'react-native';
import { useTranslation, Trans } from "react-i18next";

export default function NickName() {
    const { colorMode, toggleColorMode } = useColorMode();
    const nickname = useSelector((state: IRootState) => state.auth.nickname);

    const fadeAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        animateText();
    }, []);

    const animateText = () => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 2000, // Adjust the duration as needed
            useNativeDriver: true,
        }).start();
    };


    const { t, i18n } = useTranslation();


    return (
        <Animated.View style={{ opacity: fadeAnim }}>
            <HStack>
                <Text style={styles.textSize}>{t("content.welcome")}!</Text>
                <Text style={styles.nickname}> {nickname}</Text>
            </HStack>
        </Animated.View>

    )
}




const styles = StyleSheet.create({
    textSize: {
        fontSize: 20,
        paddingBottom: 5
    },
    nickname: {
        fontSize: 20,
        paddingLeft: 2,
        color: "#235BEC",
        paddingBottom: 5
    },
});