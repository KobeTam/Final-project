import { Heading, Text, View, useColorMode } from 'native-base';
import React, { useState, useEffect } from 'react';
import { useTranslation, Trans } from "react-i18next";

const Heading3 = () => {

    const { colorMode } = useColorMode();
    const textColor = colorMode === 'dark' ? '#FFFFFF' : 'black';
    const { t, i18n } = useTranslation();

    const [typedText, setTypedText] = useState<string>('');
    const [words, setWords] = useState<string>(t("content.Heading3"));
    const typingSpeed: number = 130; // Adjust the typing speed as needed
    const animationDuration: number = 5000; // Adjust the animation duration in milliseconds

    useEffect(() => {
        let currentWordIndex: number = 0;
        let currentLetterIndex: number = 0;
        let animationTimer: NodeJS.Timeout;

        const typingInterval = setInterval(() => {
            const currentWord: string = words[currentWordIndex];
            const currentLetter: string = currentWord[currentLetterIndex];

            setTypedText(prevTypedText => prevTypedText + currentLetter);

            if (currentLetterIndex === currentWord.length - 1) {
                // Move to the next word
                currentWordIndex++;
                currentLetterIndex = 0;

                if (currentWordIndex === words.length) {
                    // Reached the end, stop the animation
                    clearInterval(typingInterval);
                    clearTimeout(animationTimer);
                }
            } else {
                currentLetterIndex++;
            }
        }, typingSpeed);

        // Stop the animation after the specified duration
        animationTimer = setTimeout(() => {
            clearInterval(typingInterval);
        }, animationDuration);

        return () => {
            clearInterval(typingInterval);
            clearTimeout(animationTimer);
        };
    }, [words]);

    useEffect(() => {
        // Update the 'words' variable whenever the language changes
        setWords(t("content.Heading3"));
        setTypedText("");
    }, [i18n.language]);


    return (
        <Heading ml="16px" mt="3" mb="3" color={textColor}>{typedText}</Heading>
    )
}

export default Heading3