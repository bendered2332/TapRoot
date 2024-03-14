import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import {OpenAIService} from '../Service/openAIService'; // service made but not supported
import axios from 'axios'; 
const OpenAI: React.FC = () => {

    const [text, setText] = React.useState("");
    const [response, setResponse] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleSendChat = async () => {
        // try {
        //     setIsLoading(true);
        //     const response = await openaiService.sendChat(text);
        //     setResponse(response); // update with response
        // } catch (error) {
        //     console.error('Error:', error);
        // }  finally {
        //     setIsLoading(false); // to false regardless of success or failure
        // }
        const apiKey = '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'
        const prompt = 'Once upon a time'
        try {
          const result = await axios.post(
            'https://api.openai.com/v1/engines/davinci-codex/completions',
            {
              prompt: prompt,
              max_tokens: 50,
            },
            {
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${apiKey}`,
              },
            },
          )
          setResponse(result.data.choices[0].text)
        } catch (error) {
          console.error('Error fetching AI response:', error)
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
