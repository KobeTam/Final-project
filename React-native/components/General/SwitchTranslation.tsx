import { CheckIcon, Select, useColorMode, Text } from 'native-base';
import React, { useState } from 'react';
import { View } from 'react-native';
import { useTranslation, Trans } from "react-i18next";

export default function SwitchLanguage() {
    const [language, setLanguage] = useState('en'); // Default language is English

    const [position, setPosition] = React.useState("en");

    const { colorMode, toggleColorMode } = useColorMode();
    const textColor = colorMode === 'dark' ? '#FFFFFF' : '#000000';
    const { t, i18n } = useTranslation();
    const [selectedLanguage, setSelectedLanguage] = useState(i18n.language);

    const changeLng = (lng) => {
        i18n.changeLanguage(lng);
        setSelectedLanguage(lng);
    };
    return (
        <View>
            {/* <Text>{getTranslatedText('Hello!', language)}</Text>
            <Text>{getTranslatedText('Welcome!', language)}</Text>
            <Text>{getTranslatedText('Goodbye!', language)}</Text> */}
            <Text color={textColor}>{t("content.changeLng")}</Text>
            <Select selectedValue={selectedLanguage} mx={{
                base: 0,
                md: "en"
            }} onValueChange={(value) => changeLng(value)} _selectedItem={{
                bg: "#235BEC",
                endIcon: <CheckIcon size={4} />
            }} accessibilityLabel="Select a position for Menu">
                <Select.Item label="English" value="en" />
                <Select.Item label="中文繁體" value="zh" />
                <Select.Item label="ไทย" value="ti" />
                <Select.Item label="日本語" value="jp" />
                <Select.Item label="العربية" value="ar" />
                <Select.Item label="한국어" value="ko" />
                <Select.Item label="Deutsch" value="ge" />
                <Select.Item label="Español" value="sp" />
                <Select.Item label="русский" value="ru" />
                <Select.Item label="Français" value="fr" />

            </Select>
        </View>
    )
};
