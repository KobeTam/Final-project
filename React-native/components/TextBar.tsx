import { Box, HStack, Pressable, Text } from 'native-base'
import React, { useState, useEffect, useRef } from 'react';
import { Animated } from 'react-native';

interface TextBarProps {
    title: string;
    emoji: string;
    navigation: any;
}

export default function TextBar({ title, emoji, navigation }: TextBarProps) {
    // const handlerLongClick = () => {
    //     alert('Nothing will happen here');
    // };

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

    return (
        <Pressable onPress={() => navigation.navigate('TextBarGPT', { questionsInit: title })}  >
            {({
                isPressed
            }) => {
                return <Box style={{
                    transform: [{
                        scale: isPressed ? 1.03 : 1
                    }],
                }}>
                    <HStack space={1} h="50" ml="4" mr="4" _dark={{
                        bg: "#262626"
                    }} _light={{
                        bg: "white"
                    }} rounded="md" shadow={2} justifyContent={"space-between"} padding="3" >
                        {/* <Flex h="50" w="370" bg="muted.500" rounded="md" shadow={8} justifyContent="space-between"> */}
                        <Text fontSize={16} >
                            {title}
                        </Text>
                        {/* <Animated.View style={{ opacity: fadeAnim }}> */}
                        <Text fontSize={16} >
                            {emoji}
                        </Text>
                        {/* </Animated.View> */}
                    </HStack>
                </Box>;
            }}
        </Pressable>
    )
}


