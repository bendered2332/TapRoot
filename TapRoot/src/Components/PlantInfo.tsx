import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const PlantInfo = () => {
  return (
    <View style={styles.container}>
      <Text>This is the Plant Information screen where you can search your plant see its reccomended humidity threshold levels</Text>
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
export default PlantInfo;