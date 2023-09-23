import { Button } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { useTranslation, Trans } from "react-i18next";

export default function DeleteAC() {
    // const dispatch = useAppDispatch();
    const navigation = useNavigation();
    const { t, i18n } = useTranslation();

    return (
        <Button mt="5" bg={'#ff0000'} onPress={async () => {
            // dispatch(logout());
            // @ts-ignore
            navigation.navigate("SignInScreen")
            // await AsyncStorage.removeItem('token');
        }}>
            {t("content.DeleteAC")}
        </Button>
    )

}