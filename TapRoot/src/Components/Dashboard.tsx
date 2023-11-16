import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Svg, {Circle} from 'react-native-svg';

const Dashboard = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [humidityPercentage, setHumidityPercentage] = useState(60);
  const minThreshold = 20;
  const maxThreshold = 60;

  // Circle-Style
  const radius = 50;
  const strokeWidth = 10; 
  const circumference = 2 * Math.PI * radius;
  const progress = (humidityPercentage / 100) * circumference;

  // Determined color based on range
  let color;
  if (humidityPercentage >= 20 && humidityPercentage <= 60) {
    color = '#4CAF50'; // Green
  } else{ (humidityPercentage < 20) 
    color = '#FF0000'; // Red
  }

  const getHealthStatus = () => {
    if (humidityPercentage >= minThreshold && humidityPercentage <= maxThreshold) {
      return "Your plant feels awesome! 😎 Keep it up.";
    } else {
      return "Your plant is under the weather😓. You might want to water it.";
    }
  };
  const getHealthStatusColor = () => {
    return (humidityPercentage >= minThreshold && humidityPercentage <= maxThreshold) ? '#4CAF50' : '#FF0000';
  };

  const handleButtonPress = () => {
    // Update the time when the button is pressed
    setCurrentTime(new Date());
    setHumidityPercentage(Math.floor(Math.random() * 60));
    console.log('Button Pressed!');
  };

  return (
    <View style={styles.container}>
      {/* Dashboard content in here */}
      <Text style={styles.welcomeText}>Hi Bill!</Text>
       {/* First Card */}
       <View style={styles.card}>
          <Text style={styles.title}>Current Soil Humidity Level</Text>
        <View>
            <Svg width={2 * radius} height={2 * radius}>
        {/* Background Circle */}
        <Circle
          cx={radius}
          cy={radius}
          r={radius - strokeWidth / 2}
          fill="none"
          stroke="#ddd"
          strokeWidth={strokeWidth}
        />
        {/* Percentage Circle */}
        <Circle
          cx={radius}
          cy={radius}
          r={radius - strokeWidth / 2}
          fill="none"
          stroke={color} 
          strokeWidth={strokeWidth}
          strokeDasharray={`${progress} ${circumference}`}
        />
        {/* Percentage Text */}
        <Text style={[styles.humidityText, { color: getHealthStatusColor() }]}>{humidityPercentage}%</Text>
          </Svg>
          </View>
          <Text style={[styles.healthStatus, { color: getHealthStatusColor() }]}>{getHealthStatus()}</Text>
      </View>
       {/* 2nd Card */}
      <View style={styles.card2}>
        <Text style={styles.title2}>Recommended humidity levels</Text>
      </View>
      {/* Refresh button */}
      <Text style={styles.timeText}>Last refresh at: {currentTime.toLocaleTimeString()}</Text>
      <TouchableOpacity style={styles.refreshButton} onPress={handleButtonPress}>
        <Text style={styles.buttonText}>Refresh</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    padding: 16,
    position: 'relative',
    backgroundColor: '#5DB075',
  },
  welcomeText:{
    fontWeight: 'bold',
    paddingTop: 0,
    textAlign:'center',
    fontSize: 20,
  },
  card: {
    marginTop: 15,
    paddingTop: 20,
    paddingBottom:30,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    alignItems: 'center',
    justifyContent: 'flex-start', 
  },
  card2: {
    marginTop: 80,
    paddingTop: 20,
    paddingBottom: 40,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    alignItems: 'center',
    justifyContent: 'flex-start', 
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    flexDirection: 'row',
  },
  humidityText: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign:'center',
    paddingTop: 27,
  },
  healthStatus: {
    fontSize: 18,
    color: '#4CAF50',
    marginTop: 8,
    marginLeft: 10,
    marginRight: 10,
  },

  title2: {
    paddingTop: 20,
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    flexDirection: 'row',
    position:'absolute'
  },
  refreshButton: {
    backgroundColor: '#DBB92D',
    padding: 12,
    borderRadius: 8,
    position: 'absolute',
    alignItems: 'center',
    bottom: 50,
    left: 16,
    right: 16,
  },
  buttonText: {
    color: '#000',
    fontSize: 20,
    fontWeight: 'bold',
  },
  timeText: {
    position: 'absolute',
    fontSize: 15,
    bottom: 20,
    left: 20,
    right: 20,
    textAlign: 'right',
    fontStyle: 'italic',
  },
});

export default Dashboard;
