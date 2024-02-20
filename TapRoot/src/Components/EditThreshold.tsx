import { View, Text, Button, StyleSheet} from 'react-native';
import React, { useState, useEffect } from 'react';
import { DataEntry, Reading } from '../Service/dto';
import DataService from '../Service/firestoreService';
import ThresholdChart from '../SubComponents/thresholdChart';

const EditThreshold = () => {
  const [dataEntries, setDataEntries] = useState<DataEntry[]>([]);
  const documentName = "DataEntry";
  const collectionName = "Data";
  const dataService = new DataService();

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const data = await dataService.getAllData(collectionName, documentName);
        if (data) {
          setDataEntries(data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchAllData();
  }, []);

  return (
    <View style={styles.container}>
      <Text>This is the Edit Threshold screen where you can se the threshold and get notifications on when it hits! </Text>
      <ThresholdChart data={dataEntries}/>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    position: 'relative',
    backgroundColor: '#5DB075',
  }
})

export default EditThreshold;