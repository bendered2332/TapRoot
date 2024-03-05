import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TextInput, Button, Modal, Dialog, Portal } from 'react-native-paper';
import { DataEntry, ThresholdLimitProps } from '../Service/dto';


const ThresholdLimit: React.FC<ThresholdLimitProps> = ({ data }) => {
    if(!data){
        console.log("Error: There is no children data to the ThresholdLimit Page");
    }
    const [minText, setMinText] = useState("");
    const [maxText, setMaxText] = useState("");
    const [visible, setVisible] = useState(false);

    const showDialog = () => setVisible(true);
    const hideDialog = () => setVisible(false);


    //#region Validate and set inputs 
    const validateAndSetMinInput = (text: string) => {
        const number = parseFloat(text);
        if ((!isNaN(number) && number >= 0 ) || text === "") {
            setMinText(text);
        }
    };
    const validateAndSetMaxInput = (text: string, maxValue: number) => {
        const number = parseFloat(text);
        if ((!isNaN(number) && number >= 0 && number <= maxValue) || text === "") {
            setMaxText(text);
        }
    };

    //#endregion
    
    function save() {
        hideDialog()
        console.log("I will now send this data to the db");
    }

  return (
    <View style={styles.container}>
      <Text>Set the Min and Max for your threshold. Also get notified when humidity reaches the value!</Text>

      <View style={styles.thresholdInputs}>
        <TextInput label="Set Min" 
        keyboardType="numeric"
        value={minText} 
        onChangeText={text => validateAndSetMinInput(text)}  />

        <TextInput label="Set Max" 
        keyboardType="numeric" 
        value={maxText} 
        onChangeText={text => validateAndSetMaxInput(text, 100)}  />

        <Button icon="send" mode="contained" onPress={showDialog}>
            Submit
        </Button>
      </View>
      
      {/* Dialog to show the user inputs before setting the data and sending to firestore */}
      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Title style={styles.dialogTitle}>Threshold Limits</Dialog.Title>
          <Dialog.Content>
            <Text style={styles.dialogText}>Min Threshold: {minText}</Text>
            <Text style={styles.dialogText}>Max Threshold: {maxText}</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button mode="outlined" style={styles.buttonCancel} onPress={hideDialog}>Cancel</Button>
            <Button mode="outlined" style={styles.buttonOk} onPress={save}>OK</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
      
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
    flex: 1,
    paddingTop: 16,
    paddingBottom: 16,
    position: 'relative',
  },
  dialogTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  dialogText: {
    fontSize: 16,
    marginBottom: 5,
  },
  buttonCancel: {
    backgroundColor : '#ffee58', // work around for button color
    color: 'black'
  },
  buttonOk: {
    backgroundColor : '#42a5f5',
    color: 'black' // doesnt seem to wrok
  }
});

export default ThresholdLimit;
