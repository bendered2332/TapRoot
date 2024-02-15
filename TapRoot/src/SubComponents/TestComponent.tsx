import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { DataEntry, Reading } from '../Service/dto';
import DataService from '../Service/firestoreService';

const YourComponent: React.FC = () => {
  const [dataEntries, setDataEntries] = useState<DataEntry[] | null>(null); // set null
  const documentName = "DataEntry";
  const collectionName = "Data";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dataService = new DataService();
        //console.log("service created making data request")
        const data = await dataService.getData(collectionName, documentName);
        console.log("Data is back to the component page");

        if (data) {
          setDataEntries(data);
          //console.log(`Data from DB on test page::: \n  ${JSON.stringify(data)}`); // Logging the fetched data
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  dataEntries? console.log("Is not NUll"): console.log("IS NULL");
  dataEntries?.map((entry: DataEntry, index: number) => {
    console.log(entry);
  });

  return (
    <View>
      <Text>Data Entries:</Text>
      {dataEntries ? (
        <View>
          {dataEntries.map((entry: DataEntry, index: number) => (
            <View key={index}>
              <Text>Date: {entry.date}</Text>
              <Text>ID: {entry.id}</Text>
              
              {entry.readings.map((reading: Reading, index: number) => (
                <View key={index}>
                  <Text>Reading Humidity: {reading.humidity}</Text>
                  <Text>Reading Time: {reading.time}</Text>
                </View>
              ))}
            </View>
          ))}
        </View>
      ) : (
        <Text>Loading...</Text>
      )}
    </View>
  );
};

export default YourComponent;
