import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import OpenAIService from "../Service/openAIService";

const OpenAI: React.FC = () => {

    // Instantiate the service
    const [text, setText] = useState("");
    const [response, setResponse] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const openaiService = new OpenAIService();
    const handleSendChat = async () => {
        setIsLoading(true);
        try {
            console.log("Question sent: ", text);
            const response = await openaiService.chatResponse(text)
            if (response) {
                setResponse(response)
            }
        } catch (error) {
            setResponse("An error occurred while processing your request");

        } finally {

            setIsLoading(false);
        }
    };


    return (
        <View style={styles.container}>
            <Text style={styles.text}>Welcome to the New Feature Screen!</Text>
            <TextInput
                label="Enter Your Prompt"
                value={text}
                onChangeText={setText}
            />
            <Button icon="send" onPress={handleSendChat}>Send</Button>
            {/* render response when data is filled */}
            {isLoading ? (
                <Text>Loading...</Text>
            ) : (
                <Text>{response}</Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        position: 'relative',
        backgroundColor: '#5DB075',
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
    },
});

export default OpenAI;
