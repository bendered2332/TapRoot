import { View, Text, Button, StyleSheet} from 'react-native';
import React, { useState, useEffect } from 'react';
import { DataEntry, Reading } from '../Service/dto';
import DataService from '../Service/firestoreService';
import ThresholdChart from '../SubComponents/thresholdChart';
import { TabsProvider, Tabs, TabScreen } from 'react-native-paper-tabs';
import ThresholdLimit from '../SubComponents/thresholdLimit';

const EditThreshold = () => {
  const [latestDataEntry, setLatestDataEntry] = useState<DataEntry[]>([]);
  const [dataEntries, setDataEntries] = useState<DataEntry[]>([]);
  const documentName = "EntryData";
  const collectionName = "Data";
  const dataService = new DataService();
  const [CHARTDATA, setChartData] = useState<DataEntry[]>([]);
  const [CHARTTYPE, setChartType] = useState<boolean>(true); // isSvenDay placeholder
  const [thresholdSetData, setThresholdSetData] = useState<DataEntry | undefined>();

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const data = await dataService.getAllData(collectionName, documentName);
        if (data) {
          setDataEntries(data);
        }
      } catch (error) {
        console.error('Error fetching data on threshholdChart:', error);
      }
    };

    fetchAllData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await dataService.getLatestData(collectionName,documentName);
        let res: DataEntry[] = []
        if(data) {
          res.push(data);
          setLatestDataEntry(res)
          setThresholdSetData(res[0]); // set the data as an object to pass onto ThresholdLimit.tsx page
        }
      } catch (error) {
        console.error('Error fetching data on threshholdChart:', error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    sevenDay(); // Call sevenDay function when the dataEntries is set
  }, [dataEntries]);

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

      <View style={styles.thresholdLimit}>
        {/* render component when thresholdSetData is filled */}
        {thresholdSetData && <ThresholdLimit data={thresholdSetData} />} 
      </View>
      
      <TabsProvider defaultIndex={0}>
        <Tabs style={styles.tabs}>
          <TabScreen label="7-Day" icon="chart-line" onPress={sevenDay}>
            <View></View>
          </TabScreen>
          <TabScreen label="24-Hr" icon="chart-line" onPress={twentyFourHour}>
              <View></View>
          </TabScreen>
        </Tabs>
      </TabsProvider>

      <View style={styles.chartContainer}>
        <ThresholdChart data={CHARTDATA} isSevenDay={CHARTTYPE}/>
      </View>
      
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
  thresholdLimit: {
    flex: 1,
    paddingTop: 16,
    paddingBottom: 16,
    position: 'relative',
  }
})

export default EditThreshold;