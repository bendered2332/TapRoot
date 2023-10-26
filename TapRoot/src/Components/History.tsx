import React from 'react';
import { View, Text, Button } from 'react-native';
import mockData from '../mockData/mockData.json';

function getData() {
  return mockData.data[2];
}

const History = () => {
  return (
    <View>
      <Text>This is the History screen which will show past api data in chart form??????TBD</Text>
    </View>
  );
};

export default History;