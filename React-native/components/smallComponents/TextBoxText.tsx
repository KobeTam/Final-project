import { Box, HStack, Icon, Pressable, Text, useToast } from 'native-base'
import React, { useRef } from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native';
import { useTranslation, Trans } from "react-i18next";


export default function TextBoxText(props: any) {
    const { t, i18n } = useTranslation();

    return (
        <Box h="40" w="35%" _dark={{
            bg: "#262626"
        }} _light={{
            bg: "white"
        }} rounded="xl" shadow={2}>
            <Pressable onPress={() => props.navigation.navigate("ImagePick")}>
                {({
                    isPressed
                }) => {
                    return <Box style={{
                        transform: [{
                            scale: isPressed ? 1 : 0.96
                        }]
                    }}>
                        <HStack space={1} mt="3" ml="2" mr="2" rounded="md" justifyContent={"space-between"}>
                            <Box>
                                <Box>
                                    <Text fontSize={25} fontWeight='500'>
                                        {t("content.Text1")}
                                    </Text>

                                    <Text fontSize={14} mt={6} >
                                        {t("content.Text2")}
                                    </Text>
                                </Box>
                                {/* <Text fontSize={30} textAlign={'right'}>📸</Text> */}
                            </Box>
                        </HStack>
                    </Box>;
                }}
            </Pressable>
        </Box>
    )
}

const styles = StyleSheet.create({

    borderTopRight: {
        borderTopRightRadius: 20,
        borderTopLeftRadius: 0,
        // borderBottomLeftRadius: 0,
    }
});