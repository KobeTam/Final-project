import { StyleSheet } from "react-native";
import { Text, ScrollView, View, Divider, FlatList, Center, Heading, Image } from "native-base";
import React, { useState } from "react";
import { useRoute, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useTranslation, Trans } from "react-i18next";

type RootStackParamList = {
    Summaries: { response: any, imagesUri: string };
};
type SummariesScreenRouteProp = RouteProp<RootStackParamList, 'Summaries'>;

type SummariesScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Summaries'>;

type Props = {
    route?: SummariesScreenRouteProp;
    navigation?: SummariesScreenNavigationProp;
};

const OcrResult = ({ route }: Props) => {
    // const route = useRoute();
    const { response, imagesUri } = route!.params;
    const summary = response.result.content;
    const ocrText = response.ocrText
    const { t, i18n } = useTranslation();

    return (
        <ScrollView>
            <Center mt="2">
                <Heading>
                    {t("content.Image1")}
                </Heading>
            </Center>
            <Center>
                {imagesUri && <Image source={{ uri: imagesUri }} style={styles.image} alt="logo" />}
            </Center>

            <View style={styles.container}>
                <Center mb="2">
                    <Heading>
                        {t("content.Content")}
                    </Heading>

                </Center>
                <Center style={styles.OCRcontainer} _dark={{
                    borderColor: "white"
                }} _light={{
                    borderColor: "#235BEC"
                }}>
                    <Text>
                        {ocrText}
                    </Text>
                </Center>
            </View>
            {/* <Divider /> */}
            <View style={styles.container} mx="3">

                <Center mt="2" mb="2">
                    <Heading>
                        {t("content.Summaries")}
                    </Heading>

                </Center>
                <Center style={styles.sumContainer} _dark={{
                    borderColor: "white"
                }} _light={{
                    borderColor: "#235BEC"
                }}>
                    <Text>
                        {summary}
                    </Text>
                </Center>
            </View>


        </ScrollView >
    )
}

export default OcrResult

const styles = StyleSheet.create({
    OCRcontainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 2,
        borderRadius: 10,
        margin: 4,
        padding: 5,
        paddingLeft: 10,
        paddingRight: 10,
    },
    sumContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 2,
        borderRadius: 10,
        margin: 4,
        padding: 5,
        paddingLeft: 10,
        paddingRight: 10,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: 500,
        height: 500,
        resizeMode: "contain",
    },
});
