import { Box, Flex, HStack, Stack, VStack } from 'native-base'
import React from 'react'
import TextBoxAnswer from './smallComponents/TextBoxAnswer'
import TextBoxTravel from './smallComponents/TextBoxTravel'
import { TouchableOpacity, StyleSheet } from 'react-native'

export default function HomeTop({ navigation }: any) {

    return (

        <HStack space={2} justifyContent="center">
            <TextBoxTravel navigation={navigation} />
            <TextBoxAnswer navigation={navigation} />
        </HStack>

    )
}


const styles = StyleSheet.create({

    flexLR: {

    },
});
