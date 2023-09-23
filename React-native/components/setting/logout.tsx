import { useAppDispatch } from "../../app/hook"
import { Button } from 'native-base';
import { logout } from "../../features/auth/authSlice";
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTranslation, Trans } from "react-i18next";

export default function LogoutBtn() {
    const dispatch = useAppDispatch();
    const navigation = useNavigation();
    const { t, i18n } = useTranslation();

    return (
        <Button mt="5" bg={'#235BEC'} onPress={async () => {
            dispatch(logout());
            // @ts-ignore
            navigation.navigate("SignInScreen")
            await AsyncStorage.removeItem('token');
        }}>
            {t("content.Logout")}
        </Button>
    )

}