import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import {DataEntry, Reading} from '../Service/dto'
import DataService from '../Service/firestoreService'; 

const YourComponent: React.FC = () => {
  const [dataEntries, setDataEntries] = useState<DataEntry[]>([]);
    var documentName = "DataEntry";
    var collectionName = "Data";
    useEffect(() => {
    const fetchData = async () => {
        const dataService = new DataService();
        const data = await dataService.getData(collectionName, documentName);
        if (data) {
        setDataEntries(data);
        console.log(`Data from DB::: \n  ${data}`)
        }
    };

    fetchData();
  }, []);

  return (
    <View>

    </View>
  );
};

export default YourComponent;
