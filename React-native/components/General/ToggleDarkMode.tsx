import { HStack, Switch, extendTheme, useColorMode, Text } from 'native-base';
import React from 'react'
import { useThemeStore } from '../../store/usethemeStore';
import { useTranslation, Trans } from "react-i18next";

const config = {
    useSystemColorMode: false,
    initialColorMode: "dark",
};

// extend the theme
export const theme = extendTheme({ config });
type MyThemeType = typeof theme;
declare module "native-base" {
    interface ICustomTheme extends MyThemeType { }
}

export default function ToggleDarkMode() {
    const { t, i18n } = useTranslation();

    const toggleTheme = useThemeStore((state) => state.toggleTheme)

    const { colorMode, toggleColorMode } = useColorMode();
    return (
        <HStack space={2} alignItems="center">
            <Text>{t("content.colorMode")}</Text>
            <Switch
                isChecked={colorMode === "light"}
                onToggle={() => {
                    toggleTheme(colorMode === "dark" ? "light" : "dark")
                    toggleColorMode()
                }}
                aria-label={
                    colorMode === "light" ? "switch to dark mode" : "switch to light mode"
                }
                offTrackColor="#235BEC" onTrackColor="#235BEC"
            />
        </HStack>
    );
}
