import React, { useState, useCallback, useEffect } from 'react'
import { GiftedChat, IMessage } from 'react-native-gifted-chat'
import { uuidGen } from '../../../../utils/uuid';
// @ts-ignore
import Logo from '../../../../assets/ChatLogo.png'
import { API_URL } from '@env';
import { useSelector } from 'react-redux';
import { IRootState } from '../../../../store/store';
import { chatGptApi } from '../../../../api/openaiAPI';


export function TextBarGPT({ route, navigation }: { route: any, navigation: any }) {
    console.log(">>>chatroom");
    const { questionsInit } = route.params;
    const [messages, setMessages] = useState<IMessage[]>([]);
    const [isTyping, setIsTyping] = useState(false)
    let initialRun = true



    useEffect(() => {
        console.log(route.params);
        if (initialRun == true && questionsInit != "") {
            console.log(questionsInit);
            setMessages([
                // {
                //     _id: uuidGen(),
                //     text: questionsInit,
                //     createdAt: new Date(),
                //     user: {
                //         _id: 1,
                //         name: 'Me',
                //         avatar: 'https://placeimg.com/140/140/any',
                //     },
                // },
            ])
            chatWithGPT([{
                _id: uuidGen(),
                text: questionsInit,
                createdAt: new Date(),
                user: {
                    _id: 1,
                    name: 'Chat Check Track',
                    avatar: Logo,
                },
            }])
            initialRun = false

        }

    }, [route.params])

    const userId = useSelector((state: IRootState) => state.auth.userId);
    async function chatWithGPT(messages: IMessage[]) {
        console.log("initialRun: ", initialRun);


        setMessages(previousMessages => GiftedChat.append(previousMessages, messages))

        console.log(">>>>chatroom.tsx chatroom chatWithGPT");

        const question = messages[0].text
        try {
            setIsTyping(true)
            const data = await chatGptApi(userId, question)
            console.log("@TextBarGPT-chatWithGPT response", await data);
            setMessages(previousMessages => GiftedChat.append(previousMessages, [{
                _id: uuidGen(),
                text: data.content,
                createdAt: new Date(),
                user: {
                    _id: 2,
                    name: 'Chat Check Track',
                    avatar: Logo,
                },
            }]))
            setIsTyping(false)
        } catch (error) {
            console.error(error);
        }



    }

    const onSend = useCallback((messages: IMessage[] = []) => {
        setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
        // console.log(messages);
    }, [])

    return (

        <GiftedChat
            isTyping={isTyping}
            messages={messages}
            onSend={(messages) => chatWithGPT(messages as IMessage[])}
            user={{
                _id: 1,
            }}
        />
    )
}