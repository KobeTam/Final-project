import { Box, HStack, Icon, Pressable, Text, VStack, useColorMode, useToast } from 'native-base'
import React from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native';
import { useTranslation, Trans } from "react-i18next";

export default function TextBoxTravel(props: any) {
    const { t, i18n } = useTranslation();

    const handleLongPress = () => {
        console.log('Button long pressed');
    };

    const toast = useToast();

    return (
        <Box pl="2" h="40" w="35%" _dark={{
            bg: "#262626"
        }} _light={{
            bg: "white"
        }} rounded="xl" shadow={2} >
            <Pressable onPress={() => props.navigation.navigate("TravelChatRoom")} >
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
                                <Text fontSize={25} fontWeight='500'>
                                    {t("content.Travel")}
                                </Text>

                                <Text fontSize={14} mt={6} >
                                    {t("content.Trave2")}
                                </Text>
                            </Box>
                        </Box>
                    </Box>;
                }}
            </Pressable>
        </Box>

    )
}


const styles = StyleSheet.create({
    borderBottomLeft: {
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 0,
        // borderTopRightRadius: 0

    }
});

