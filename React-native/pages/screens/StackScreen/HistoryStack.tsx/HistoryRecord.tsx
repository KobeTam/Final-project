import React, { useState, useCallback, useEffect } from 'react'
// @ts-ignore
import { GiftedChat, IMessage, QuickReplies, User } from 'react-native-gifted-chat'
// @ts-ignore
import Logo from '../../../../assets/ChatLogo.png'
export interface IMessage {
    _id: string | number
    text: string
    createdAt: Date | number
    user: User
    image?: string
    video?: string
    audio?: string
    system?: boolean
    sent?: boolean
    received?: boolean
    pending?: boolean
    quickReplies?: QuickReplies
}

interface Reply {
    title: string
    value: string
    messageId?: any
}

interface QuickReplies {
    type: 'radio' | 'checkbox'
    values: Reply[]
    keepIt?: boolean
}
export default function HistoryRecord() {

    const [messages, setMessages] = useState<IMessage[]>([])

    useEffect(() => {
        setMessages([
            {
                _id: 2,
                text: 'Hello! How can I assist you today?',
                createdAt: new Date(Date.UTC(2023, 5, 26, 8, 20, 0)),
                user: {
                    _id: 2,
                    name: 'Chat Check Track',
                    avatar: Logo,
                },
            },
            {
                _id: 1,
                text: 'Hi',
                createdAt: new Date(Date.UTC(2023, 5, 26, 8, 20, 0)),
                user: {
                    _id: 1,
                    name: 'User',
                },
            },
        ])
    }, [])

    const onSend = useCallback((messages = []) => {
        setMessages(previousMessages =>
            GiftedChat.append(previousMessages, messages),
        )
    }, [])

    return (
        <GiftedChat
            messages={messages}
            onSend={(messages: any) => onSend(messages)}
            user={{
                _id: 1,
            }}
        />
    )
}
