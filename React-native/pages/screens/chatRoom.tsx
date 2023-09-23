import React, { useState, useCallback, useEffect } from 'react'
import { GiftedChat, IMessage } from 'react-native-gifted-chat'
import { uuidGen } from '../../utils/uuid';
// @ts-ignore
import Logo from '../../assets/ChatLogo.png'
import { API_URL } from "@env";
import { useSelector } from 'react-redux';
import { IRootState } from '../../store/store';
import { chatGptApi } from '../../api/openaiAPI';



export function ChatRoom({ route, navigation }: { route: any, navigation: any }) {
    console.log(">>>chatroom");
    // const { questionsInit } = route.params;
    const [messages, setMessages] = useState<IMessage[]>([]);

    const [isTyping, setIsTyping] = useState(false)
    // console.log(questionsInit);


    // useEffect(() => {
    //     console.log(route.params);
    //     if (questionsInit) {
    //         setMessages([
    //             {
    //                 _id: uuidGen(),
    //                 text: questionsInit,
    //                 createdAt: new Date(),
    //                 user: {
    //                     _id: 1,
    //                     name: 'Me',
    //                     avatar: 'https://placeimg.com/140/140/any',
    //                 },
    //             },
    //         ])
    //     }
    // }, [route.params])
    const userId = useSelector((state: IRootState) => state.auth.userId);

    async function chatWithGPT(messages: IMessage[]) {
        setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
        const question = messages[0].text
        try {
            const input = { userId: userId, content: question };
            setIsTyping(true)
            const data = await chatGptApi(userId, question)
            console.log("@chatRoom-chatWithGPT response", await data);
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