import { Animated, TouchableOpacity } from 'react-native'
import React, { useEffect, useRef } from 'react';
import { Box, HStack, Pressable, Text, Popover, Button } from 'native-base';


interface HistoryBarProps {
    title: string;
    emoji: string;
    navigation: any;
}

export default function HistoryBar({ title, emoji, navigation }: HistoryBarProps) {

    const fadeAnim = useRef(new Animated.Value(0)).current;

    // const handlerLongClick = () => {
    //     alert('Do you want to delete this history?');
    // };
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
        <TouchableOpacity onPress={() => navigation.navigate('HistoryRecord')}  >
            <HStack space={1} h="50" ml="4" mr="4" _dark={{
                bg: "#262626"
            }} _light={{
                bg: "white"
            }} rounded="md" shadow={2} justifyContent={"space-between"} padding="3" >
                {/* <Flex h="50" w="370" bg="muted.500" rounded="md" shadow={8} justifyContent="space-between"> */}
                {/* <Animated.View style={{ opacity: fadeAnim }}> */}
                <Text fontSize={16} >
                    {title}
                </Text>
                <Popover trigger={triggerProps => {
                    return <Text fontSize={16} {...triggerProps} >
                        {emoji}
                    </Text>;
                }}>
                    <Popover.Content accessibilityLabel="🗑️" >
                        <Popover.Arrow />
                        <Popover.CloseButton />
                        <Popover.Header>Delete History</Popover.Header>
                        <Popover.Body>
                            This will remove all data in this chat room. This action cannot be
                            reversed. Deleted data can not be recovered.
                        </Popover.Body>
                        <Popover.Footer justifyContent="flex-end">
                            <Button.Group space={2}>
                                <Button colorScheme="coolGray" variant="ghost">
                                    Cancel
                                </Button>
                                <Button colorScheme="danger">Delete</Button>
                            </Button.Group>
                        </Popover.Footer>
                    </Popover.Content>
                </Popover>
                {/* </Animated.View> */}
            </HStack>
        </TouchableOpacity>
    )
}

// <Text fontSize={16} >
// {emoji}
// </Text>