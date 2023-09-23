import { FlatList, Text, useToast } from 'native-base'
import React, { useRef, useEffect } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { useTranslation, Trans } from "react-i18next";

export default function BubbleList() {
    const { t, i18n } = useTranslation();
    const toast = useToast();

    const handleLongPress = () => {
        alert('Nothing will happen here');

    };
    const handleItemPress = () => {
        alert('Nothing will happen here');
    };
    const names = [
        {
            index: "1",
            name: `${t("content.Image1")}`,
        },
        {
            index: "2",
            name: `${t("content.Text1")}`,
        },
        {
            index: "3",
            name: `${t("content.Travel")}`,
        },
        {
            index: "4",
            name: `${t("content.Answer1")}`,
        },
        {
            index: "5",
            name: `${t("content.BubbleList1")}`,
        },
        {
            index: "6",
            name: `${t("content.BubbleList2")}`,

        },
        {
            index: "7",
            name: `${t("content.BubbleList2")}`,
        },
        {
            index: "8",
            name: `${t("content.BubbleList3")}`,
        },
        {
            index: "9",
            name: `${t("content.BubbleList4")}`,

        },
        {
            index: "10",
            name: `${t("content.BubbleList5")}`,
        },
        {
            index: "11",
            name: `${t("content.BubbleList6")}`,
        },
        {
            index: "12",
            name: `${t("content.BubbleList7")}`,
        },
        {
            index: "13",
            name: `${t("content.BubbleList8")}`,
        },
    ];

    return (
        <FlatList
            style={styles.listStyle}
            keyExtractor={(key) => {
                return key.index;
            }}

            horizontal
            showsHorizontalScrollIndicator={false}
            data={names}
            renderItem={({ item }) => {
                return <TouchableOpacity onPress={() => toast.show({
                    title: "Function coming soon...",
                    placement: "bottom"
                })} onLongPress={handleLongPress}>
                    <Text style={styles.textStyle} _dark={{
                        bg: "#262626"
                    }} _light={{
                        bg: "#235BEC"
                    }}> {item.name} </Text>
                </TouchableOpacity>

            }}
        />


    )
}

const styles = StyleSheet.create({
    textIcon: {
        display: 'flex',
        alignContent: "space-between",
        alignSelf: "flex-start",
        flexDirection: "row",
        padding: 10,
        flexWrap: "wrap",
        justifyContent: "space-between",
    },
    textStyle: {
        fontSize: 14,
        padding: 9,
        // backgroundColor: "#262626",
        marginTop: 5,
        marginLeft: 5,
        color: "white",
        borderRadius: 30,
    },
    listStyle: {
        textAlign: "center",
        margin: 10,
        padding: 0,
    },
});
