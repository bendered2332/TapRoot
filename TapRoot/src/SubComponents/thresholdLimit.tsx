import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TextInput, Button, Modal, Dialog, Portal, ActivityIndicator, Snackbar } from 'react-native-paper';
import { DataEntry, ThresholdLimitProps, Limit } from '../Service/dto';
import DataService from '../Service/firestoreService';


const ThresholdLimit: React.FC<ThresholdLimitProps> = ({ data }) => {
    if(!data){
        console.log("Error: There is no children data to the ThresholdLimit Page");
    } 
    // min and max user input
    const [minText, setMinText] = useState("");
    const [maxText, setMaxText] = useState("");
    // dialog box
    const [visible, setVisible] = useState(false);
    const [currentHumPer, setHumPer] = useState<number>();
    // gets the db stored limit
    const [limit, setLimit] = useState<Limit>();
    // validation checker for min and max input
    const [validationError, setValidationError] = useState<string>("");
    // submitting spinner when data is posting to firestore
    const [submitting, setSubmitting] = useState(false);
    // snackbar notification when humidity is outside set range
    const [snackbarVisible, setSnackbarVisible] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    //show dialog and close
    const showDialog = () => setVisible(true);
    const hideDialog = () => setVisible(false);
    // show snackbar
    const showSnackbar = (message: string) => {
        setSnackbarMessage(message);
        setSnackbarVisible(true);
    };
    // configure service and db path
    const documentName = "ThresholdLimits";
    const collectionName = "Data";
    const dataService = new DataService();

    useEffect(() => {
        const getLimitData = async () => {
            try {
                const data = await dataService.getThresholdLimitsData(collectionName, documentName);
                if (data) {
                    setLimit(data);
                }
            } catch (error) {
                console.error('Error fetching data on ThresholdLimit.tsx:', error);
            }
        };
    
        getLimitData();
    }, []);

    useEffect(() => {
        loadPageData(); // run this function once
    }, []);

    useEffect(() => {
        // Check if current humidity percentage exceeds the threshold
        if (currentHumPer && limit && (currentHumPer < limit.min || currentHumPer > limit.max)) {
            showSnackbar('Humidity is out of your threshold range.');
        }
        // will always check when the limit or current humidity is updated
    }, [currentHumPer, limit]);

    function loadPageData() {
        // set the current humidty percentage convert from number to percentage
        const length = data.readings.length
        const humidity_raw = data.readings[length - 1].humidity;
        const percentHumidity = parseInt(humidityToPercent(humidity_raw));
        setHumPer(percentHumidity);
    }

    function humidityToPercent(rawHumidity : number) {
        var finalHumidity
        var base = rawHumidity / 1000
        finalHumidity = base * 100
        return finalHumidity.toFixed(2);
    }

    //#region Validate and set min and max inputs 
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
    
    // post limit data to firestore
    async function postData(min: number, max: number) {
        const limitData: Limit = {
            min : min,
            max: max
        };
        const success = await dataService.postThresholdLimitsData(collectionName,documentName,limitData);
        if(success) {
            hideDialog();
            console.log("Limit Data saved successfully to Firestore");
            setLimit(limitData);
        } else {
            console.error("Failed to save limit data to Firestore");
        }
        setSubmitting(false);
    }

    //#region button function
    function save() {
        const min = parseFloat(minText);
        const max = parseFloat(maxText);
        if (max <= min) {
            setValidationError("Max value must be greater than min value.");
            return;
        } 

        // Post the data to firestore here
        setSubmitting(true); // a spinner which takes place of ok button when psot call happens
        postData(min, max)
    }


    function cancel() {
        setValidationError("");
        hideDialog();
    }

    //#endregion

  return (
    
    <View style={styles.container}>
        <Text>Set the Min and Max for your threshold. Also get notified when humidity reaches the value!</Text>
        
        <View style={styles.limitText}>
            <Text>Current Set Min: {limit?.min}</Text>
            <Text>Current Set Max: {limit?.max}</Text>
        </View>
        

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
            <Text style={styles.dialogText}>New Min Threshold: {minText}</Text>
            <Text style={styles.dialogText}>New Max Threshold: {maxText}</Text>
            <Text style={styles.dialogText}>Current Humidity Percent: {currentHumPer} </Text>

            {/* // this only shows when there is a validation error in max and min values */}
            {validationError ? (
                <Text style={styles.errorText}>{validationError}</Text>
            ) : null}
          </Dialog.Content>

          <Dialog.Actions>
                {submitting? ( // a submitting spinner. when the post call is happening a spinner will appear
                    <ActivityIndicator animating={true} color="#42a5f5" />
                ): (
                <><Button
                    mode="outlined"
                    style={styles.buttonCancel}
                    labelStyle={{ color: 'black' }}
                    onPress={cancel}>
                        Cancel
                </Button>
                <Button
                    mode="outlined"
                    // disable button when one or the other is null and follow disableButtonStyle
                    style={[styles.buttonOk, !minText || !maxText ? styles.disabledButton : null]}
                    labelStyle={{ color: !minText || !maxText ? '#aaa' : 'black' }}
                    onPress={save}
                    // the disabled when inputs are blank the button is disabled.
                    disabled={!minText || !maxText}>
                        OK
                </Button></>
                )}
          </Dialog.Actions>

        </Dialog>
      </Portal>
    
         {/* Snackbar component */}
         <Snackbar
                visible={snackbarVisible}
                onDismiss={() => setSnackbarVisible(false)}
                style={styles.snackbarPosition}
                duration={5000} // how long snackbar will be visible
                action={{
                    label: 'Dismiss',
                    onPress: () => setSnackbarVisible(false),
                }}
            >
                {snackbarMessage}
        </Snackbar>
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
  }, 
  limitText: {
    paddingTop: 10
  },
  disabledButton: {

  }, 
  errorText: {
    color: 'red'
  },
  snackbarPosition: { // trying to get the snackbar on the top but it isnt working
    top: 0,
    bottom: 0 
  }
});

export default ThresholdLimit;
