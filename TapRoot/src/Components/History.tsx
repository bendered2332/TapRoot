import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, } from 'react-native';
import HistoryTable from '../SubComponents/historyTable';
import DataService from '../Service/firestoreService';

import Chips from '../SubComponents/chip';
import { DataEntry, HistoryChip } from '../Service/dto';
import NewHistoryTable from '../SubComponents/newHistoryTale';


export default function History(){
  // stores all data from firestore
  const [dataEntries, setDataEntries] = useState<DataEntry[]>([]);
  // data for chips page
  const [allDates, setAllDates] = useState<HistoryChip[]>([]);
  //output data from the chips page selected chips and their ID
  const [selectedChips, setSelectedChips] = useState<string[]>([]);
  const [selectedChipsData, setSelectedChipsData] = useState<DataEntry[]>([]);

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

  // the output function for chips component
  const handleSelectedChipsChange = (chips: string[]) => {
    setSelectedChips(chips);
  };

  // Call the function whenever selectedChips change
  useEffect(() => {
    updateSelectedDataEntries();
  }, [selectedChips]);

  // update function to update data passed into history table depending on selected chips
  function updateSelectedDataEntries() {
    const newDataEntries = dataEntries.filter((entry) =>
      selectedChips.includes(entry.id)
    );
    setSelectedChipsData(newDataEntries);
  }

  return (
    <View style={styles.container}>
      
       {// render domponent only when data is filled
       allDates && <Chips data={allDates} onSelectedChipsChange={handleSelectedChipsChange}/>} 
      <NewHistoryTable data={selectedChipsData} />
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


