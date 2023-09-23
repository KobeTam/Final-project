import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    textToWhite: {
        color: 'white',
    },
    bottomWhite: {
        color: 'white',
        fontSize: 20
    },
    textIcon: {
        display: 'flex',
        alignContent: "space-between",
        alignSelf: "flex-start",
        flexDirection: "row",
        padding: 10,
        flexWrap: "wrap",
        justifyContent: "space-between",
    },
    borderTopLeft: {
        borderTopLeftRadius: 20,
        borderTopRightRadius: 0,
        // borderBottomRightRadius:0,
    },
    borderTopRight: {
        borderTopRightRadius: 20,
        borderTopLeftRadius: 0,
        // borderBottomLeftRadius: 0,
    },
    borderBottomLeft: {
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 0,
        // borderTopRightRadius: 0

    },
    borderBottomRight: {
        borderBottomRightRadius: 20,
        borderBottomLeftRadius: 0,
        // borderTopLeftRadius: 0,
    },
});