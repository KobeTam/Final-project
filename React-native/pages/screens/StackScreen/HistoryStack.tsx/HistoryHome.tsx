import { Animated, TouchableOpacity } from 'react-native'
import React, { useEffect, useRef } from 'react';
import { Box, HStack, Pressable, ScrollView, Text, VStack, View, Popover, Button } from 'native-base';
import HistoryBar from '../../../../components/HistoryBar';
import { useNavigation } from '@react-navigation/native';



export default function HistoryHome() {
    // const navigation = navigation();
    const navigation = useNavigation();


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

    return (
        <View style={{ flex: 1 }}>
            <ScrollView>
                <VStack space={2} mt="3">
                    {[{ title: "Hi", emoji: "🗑️" },
                    { title: "Whats good study in Tecky?", emoji: "🗑️" },
                    { title: "Give me a step-by-step plan to get rich", emoji: "🗑️" },
                    { title: "How to be a NBA player?", emoji: "🗑️" },
                    { title: "What is the meaning of life?", emoji: "🗑️" },
                    { title: "Why am I so handsome?", emoji: "🗑️" }].map(v => <HistoryBar key={v.title} title={v.title} emoji={v.emoji} navigation={navigation} />)}
                </VStack>

            </ScrollView>
        </View >
    )
}

