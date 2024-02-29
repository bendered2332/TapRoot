import { View, Text, Button, StyleSheet} from 'react-native';
import React, { useState, useEffect } from 'react';
import { DataEntry, Reading } from '../Service/dto';
import DataService from '../Service/firestoreService';
import ThresholdChart from '../SubComponents/thresholdChart';
import { TabsProvider, Tabs, TabScreen } from 'react-native-paper-tabs';

const EditThreshold = () => {
  const [latestDataEntry, setLatestDataEntry] = useState<DataEntry[]>([]);
  const [dataEntries, setDataEntries] = useState<DataEntry[]>([]);
  const documentName = "EntryData";
  const collectionName = "Data";
  const dataService = new DataService();
  const [CHARTDATA, setChartData] = useState<DataEntry[]>([]);
  const [CHARTTYPE, setChartType] = useState<boolean>(true); // isSvenDay placeholder
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

  useEffect(() => {
    const fetchData = async () => {
      const data = await dataService.getLatestData(collectionName,documentName);
      let res: DataEntry[] = []
      if(data) {
        res.push(data);
        setLatestDataEntry(res)
      }
      
    };
    fetchData();
  }, []);

  function sevenDay() {
    setChartData(dataEntries);
    setChartType(true)

    console.log("The 7-Day tab was clicked");
  }
  
  function twentyFourHour() {
    setChartData(latestDataEntry);
    setChartType(false)
    console.log("The 24 Hr tab was clicked")
  }
  return (
    <View style={styles.container}>
      <Text>This is the Edit Threshold screen where you can se the threshold and get notifications on when it hits! </Text>
      <TabsProvider>
        <Tabs style={styles.tabs}>
          <TabScreen label="7-Day" icon="chart-line" onPress={sevenDay}>
            <View style={styles.chartContainer}>
            </View>
          </TabScreen>
          <TabScreen label="24-Hr" icon="chart-line" onPress={twentyFourHour}>
            <View style={styles.chartContainer}>
            </View>
          </TabScreen>
        </Tabs>
      </TabsProvider>
      <ThresholdChart data={CHARTDATA} isSevenDay={CHARTTYPE}/>
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
    chartContainer: {
    flex: 1,
    position: 'relative',
  },
  tabs: {
    flex: 1,
    backgroundColor: '#eee',
  },
})

export default EditThreshold;