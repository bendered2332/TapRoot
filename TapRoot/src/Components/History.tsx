import React from 'react';
import mockData from '../mockData/mockData.json';
import { View, Text, Button } from 'react-native';
import HistoryTable from '../SubComponents/historyTable';

function getData() {
  console.log(mockData.data[2]);
}

const History = () => {
  getData()
  return (
    <View>
      <Text>This is the History screen which will show past api data in chart form??????TBD</Text>
      <HistoryTable></HistoryTable>
    </View>
  );
};

export default History;