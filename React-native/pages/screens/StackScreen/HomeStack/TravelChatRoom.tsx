import React, { useState, useCallback, useEffect } from 'react'
import { GiftedChat, IMessage } from 'react-native-gifted-chat'
import { uuidGen } from '../../../../utils/uuid';
// @ts-ignore
import Logo from '../../../../assets/ChatLogo.png'
import { API_URL } from "@env";
import { useSelector } from 'react-redux';
import { IRootState } from '../../../../store/store';
import { chatGptApi } from '../../../../api/openaiAPI';




let prompts = ["點稱呼你呀？", "你有冇話想去邊個國家或者城市去玩?", "你預計你邊段時間有假期? 有冇確實日子呀？諗住去幾多日？", "除咗你之外，仲有冇屋企人或親戚朋友一齊去架？", "咁你想靜態多啲定係動態多啲？ 例如去遊樂場呀、購物呀、定係睇風景呀? 或者一d特別體驗?"]
let instructions = ["請根據以上對話，給我一個詳細的旅游日程表，要顯示每個項目的開始和結束時間啊，項目的地點，交通安排及其所需時間等等"]

export function TravelChatRoom({ route, navigation }: { route: any, navigation: any }) {
    console.log(">>>Travel chatroom");
    // const { questionsInit } = route.params;
    const [messages, setMessages] = useState<IMessage[]>([]);
    const [isTyping, setIsTyping] = useState(false)
    const userId = useSelector((state: IRootState) => state.auth.userId);
    const [dialog, setDialog] = useState<Array<{ id: number, text: string, user: string }>>([]);
    const robotUser = 'Robot';
    const [currentPromptIndex, setCurrentPromptIndex] = useState(0);

    useEffect(() => {
        // Initialize the dialog with the first prompt
        // setDialog([
        //     { id: 1, text: prompts[0], user: robotUser }
        // ]);

        // Send the first prompt
        setMessages([
            {
                _id: uuidGen(),
                text: prompts[0],
                createdAt: new Date(),
                user: {
                    _id: 2,
                    name: 'Chat Check Track',
                    avatar: Logo,
                },
            }
        ]);
        setCurrentPromptIndex(currentPromptIndex => currentPromptIndex + 1);
        setDialog(dialog => [
            ...dialog,
            { id: dialog.length + 1, text: prompts[0], user: robotUser }
        ]);

    }, []);

    const onSend = useCallback((newMessages: IMessage[] = []) => {
        console.log(">>> inside onSend");

        const userMessage = newMessages[0];
        setMessages(previousMessages =>
            GiftedChat.append(previousMessages, newMessages),
        );

        // Update the dialog with the user's message
        setDialog(dialog => [
            ...dialog,
            { id: dialog.length + 1, text: userMessage.text, user: userMessage.user._id.toString() }
        ]);

        // Send the next prompt
        setCurrentPromptIndex(currentPromptIndex => currentPromptIndex + 1);

        // Check if all prompts have been answered and end the conversation
        // if (currentPromptIndex >= prompts.length) {
        //     setMessages(previousMessages =>
        //         GiftedChat.append(previousMessages, newMessages),
        //     );
        //     return;
        // }


        // Append the next prompt to the messages state
        if (currentPromptIndex <= prompts.length) {
            console.log("currentPromptIndex: ", currentPromptIndex);
            console.log("prompts.length", prompts.length)


            const robotMessage = {
                _id: uuidGen(),
                text: prompts[currentPromptIndex],
                createdAt: new Date(),
                user: {
                    _id: 2,
                    name: 'Chat Check Track',
                    avatar: Logo,
                },
            };

            setMessages(previousMessages =>
                GiftedChat.append(previousMessages, [robotMessage]),
            );

            setDialog(dialog => [
                ...dialog,
                { id: dialog.length + 1, text: robotMessage.text, user: robotMessage.user._id.toString() }
            ]);
        }


    }, [currentPromptIndex, prompts]);

    useEffect(() => {

        console.log("dialog.length", dialog.length);

        if (dialog.length === (prompts.length * 2) + 1) {
            console.log("FINAL", dialog);
            chatWithGPT(dialog.filter(v => !!v.text))
        }
    }, [dialog])

    async function chatWithGPT(dialog: Array<{ id: number, text: string, user: string }>) {
        const messages: IMessage[] = dialog.map((item) => ({
            _id: item.id.toString(),
            text: item.text,
            createdAt: new Date(),
            user: {
                _id: item.user,
                name: item.user,
                avatar: Logo,
            },
        }));

        setIsTyping(true);

        try {
            const newDialog: string = dialog.toString() + instructions[0]
            console.log("newDialog", newDialog);

            const response = await chatGptApi(userId, newDialog);

            console.log("response", response);

            const result = response.content.trim();

            console.log(result);


            // Update the dialog with the GPT-3 response
            setDialog(dialog => [
                ...dialog,
                { id: dialog.length + 1, text: result, user: robotUser }
            ]);

            // Append the GPT-3 response to the messages state
            const gptMessage: IMessage = {
                _id: uuidGen(),
                text: result,
                createdAt: new Date(),
                user: {
                    _id: 2,
                    name: 'Chat Check Track',
                    avatar: Logo,
                },
            };

            setMessages(previousMessages =>
                GiftedChat.append(previousMessages, [gptMessage]),
            );

        } catch (error) {
            console.error(error);
        }
        setIsTyping(false)


    }

    useEffect(() => {
        console.log("dialog", dialog);
    }, [dialog]);

    return (

        <GiftedChat
            isTyping={isTyping}
            messages={messages}
            onSend={(messages) => onSend(messages as IMessage[])}
            user={{
                _id: 1,
            }}
        />
    )
}