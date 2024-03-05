import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { DataEntry } from '../Service/dto';

interface ThresholdLimitProps {
  data: DataEntry;
}

const ThresholdLimit: React.FC<ThresholdLimitProps> = ({ data }) => {
    if(!data){
        console.log("Error: There is no children data to the ThresholdLimit Page");
    }
    const [minText, setMinText] = React.useState("");
    const [maxText, setMaxText] = React.useState("");

    function submitBtnPressed() {
        console.log('Submit Pressed')
    }
  return (
    <View style={styles.container}>
      <Text>Set the Min and Max for your threshold. Also get notified when humidity reaches the value!</Text>

      <View style={styles.thresholdInputs}>
        <TextInput label="Set Min" value={minText} onChangeText={text => setMinText(text)} />
        <TextInput label="Set Max" value={maxText} onChangeText={text => setMaxText(text)} />
        <Button icon="send" mode="contained" onPress={submitBtnPressed}>
            Submit
        </Button>
      </View>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  thresholdInputs: {

  }
});

export default ThresholdLimit;
