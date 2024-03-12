import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, } from 'react-native';
import HistoryTable from '../SubComponents/historyTable';
import DataService from '../Service/firestoreService';

import Chips from '../SubComponents/chip';
import { DataEntry, HistoryChip } from '../Service/dto';


export default function History(){
  // stores all data from firestore
  const [dataEntries, setDataEntries] = useState<DataEntry[]>([]);
  // data for chips page
  const [allDates, setAllDates] = useState<HistoryChip[]>([]);
  //output data from the chips page selected chips and their ID
  const [selectedChips, setSelectedChips] = useState<string[]>([]);

  const handleSelectedChipsChange = (chips: string[]) => {
    setSelectedChips(chips);
    // selectedChips.forEach( chip => {
    //   dataEntries.map
    // })
    console.log("Parent component selected Chips: ", selectedChips);
  };

  // data Service imports
  const documentName = "EntryData";
  const collectionName = "Data";
  const dataService = new DataService();

  // get data
  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const data = await dataService.getAllData(collectionName, documentName);
        if (data) {
          setDataEntries(data);
          // set the data for the chips component
          const historyChips: HistoryChip[] = data.map(entry => ({
            date: entry.date,
            id: entry.id
          }));
          setAllDates(historyChips);
        }
      } catch (error) {
        console.error('Error fetching data on threshholdChart:', error);
      }
    };

    fetchAllData();
  }, []);

  return (
    <View style={styles.container}>
      
       {// render domponent only when data is filled
       allDates && <Chips data={allDates} onSelectedChipsChange={handleSelectedChipsChange}/>} 
      
      <HistoryTable></HistoryTable>
    </View>
    );
  }
  
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    position: 'relative',
    backgroundColor: '#5DB075',
    justifyContent: 'center',
    alignItems: "flex-start",
  },
  chip: {
    margin: 6, 
    width: '45%',
  },
});


