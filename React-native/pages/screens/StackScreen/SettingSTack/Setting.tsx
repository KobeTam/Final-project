import React, { useState } from 'react';
import { View, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import ToggleDarkMode from '../../../../components/General/ToggleDarkMode';
import SwitchLanguage from '../../../../components/General/SwitchTranslation';
import { Button, Divider, theme, Text, Switch, HStack } from 'native-base';
import LogoutBtn from '../../../../components/setting/logout';
import NickName from '../../../../components/General/NickName';
import DeleteAC from '../../../../components/setting/DeleteAC';

import { useTranslation, Trans } from "react-i18next";

export default function SettingScreen() {
    const { t, i18n } = useTranslation();

    return (
        <View style={styles.container}>
            <View style={styles.positionTop}>
                <NickName />
                <Divider />
            </View>
            <ToggleDarkMode />
            {/* <Text>{t("content.changeLng")}</Text> */}
            {/* 
            <Button bg={'#235BEC'} onPress={() => changeLng("zh")}>中文</Button>
            <Button bg={'#235BEC'} onPress={() => changeLng("en")}>English</Button> */}
            {/* <HStack space={2} alignItems="center">
                <Text>English</Text>
                <Switch
                    value={isChineseSelected}
                    onValueChange={(value) => changeLng(value ? 'zh' : 'en')}
                    trackColor={{ false: '#235BEC', true: '#235BEC' }}
                    thumbColor={'white'}
                />
                <Text>中文</Text>
            </HStack>

            <HStack space={2} alignItems="center">
                <Text>Thai</Text>
                <Switch
                    value={isJapaneseSelected}
                    onValueChange={(value) => changeLng(value ? 'jp' : 'ti')}
                    trackColor={{ false: '#235BEC', true: '#235BEC' }}
                    thumbColor={'white'}
                />
                <Text>Japanese</Text>
            </HStack> */}

            <SwitchLanguage />
            <LogoutBtn />
            <View style={styles.positionBottom}>
                <DeleteAC />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        //   backgroundColor: 'black',
    },
    positionTop: {
        position: 'absolute',
        top: 70,
    },
    positionBottom: {
        position: 'absolute',

        bottom: 15,
    },

});