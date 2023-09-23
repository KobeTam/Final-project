import { HStack } from 'native-base'
import React from 'react'
import TextBoxImage from './smallComponents/TextBoxImage'
import TextBoxText from './smallComponents/TextBoxText'

export default function HomeTop({ navigation }: any) {
    return (
        <HStack space={2} justifyContent="center" mb="2">
            <TextBoxImage navigation={navigation} />
            <TextBoxText navigation={navigation} />
        </HStack>
    )
}
