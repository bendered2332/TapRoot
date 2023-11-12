import React from 'react';
import { View, Text, Button, StyleSheet} from 'react-native';

const EditThreshold = () => {
  return (
    <View style={styles.container}>
      <Text>This is the Edit Threshold screen where you can se the threshold and get notifications on when it hits! </Text>
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