import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import React from 'react';

const doc = firestore().collection("Stuff").doc("Hello");

export default function App() {
  const [text, setText] = React.useState("loading...");

  React.useEffect(() => {
    doc.get().then(docSnapshot => {
      if(docSnapshot.exists){
        setText(JSON.stringify(docSnapshot.data(), null, 2));
      }else{
        setText(
          "the document Stuff/Hello doesn't exists :/\n" +
          "Create it in Firestore and try again"
        );
      }
    }).catch((e) => {
      console.warn(e);
      setText("Failed :(");
    });
  }, []);


  return (
    <View style={styles.container}>
      <Text>Your firebase is configured!</Text>
      <Text> FireStore Stuff/Hello:</Text>
      <Text>{text}</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
