import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Svg, {Circle} from 'react-native-svg';
import { getDatabase, onValue, ref, set} from "firebase/database";
import { realTimeDB } from '../../firebaseConfig';
import { firebase } from '@react-native-firebase/auth';
import { DataEntry, Limit } from '../Service/dto';
import DataService from '../Service/firestoreService';


const Dashboard = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [humidityPercentage, setHumidityPercentage] = useState(60);
  const [latestDataEntry, setLatestDataEntry] = useState<DataEntry>();
  const [limit, setLimit] = useState<Limit>();
  const [minThreshold, setMinThreshold] = useState<number>();
  const [maxThreshold, setMaxThreshold] = useState<number>();

  const onLoadHumidityPercent = null;
  // firestore get data
  const documentName = "EntryData";
  const collectionName = "Data";
  const dataService = new DataService();

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
  // get limit data
  useEffect(() => {
    const getLimitData = async () => {
        try {
            const data = await dataService.getThresholdLimitsData("Data", "ThresholdLimits");
            if (data) {
                setLimit(data);
                setMinThreshold(data.min)
                setMaxThreshold(data.max)
            }
        } catch (error) {
            console.error('Error fetching data on ThresholdLimit.tsx:', error);
        }
    };

    getLimitData();
}, []);
  // get the latest data for dashboard
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await dataService.getLatestData(collectionName,documentName);
        let res: DataEntry[] = [] // getting data as an array of objects
        if(data) {
          res.push(data);
          setLatestDataEntry(res[0]) // setting the data as an object and not array
        }
      } catch (error) {
        console.error('Error fetching data on threshholdChart:', error);
      }
    };
    fetchData();
  }, []);
  
  useEffect(() => {
    setDashboard(); // Call this set dashboard function once latestDataEntry is set
  }, [latestDataEntry]);

  const getHealthStatus = () => {
    if (minThreshold !== undefined && maxThreshold !== undefined) {
      if (humidityPercentage >= minThreshold && humidityPercentage <= maxThreshold) {
        return "Your plant feels awesome! 😎 Keep it up.";
      } else {
        if(humidityPercentage < minThreshold) {
          return "You may have to start watering your plants!"
        } 
        if( humidityPercentage > maxThreshold) {
          return "You have watered your plants too much!"
        }
      }
    } else {
      // where thresholds are undefined
      return "Thresholds not available.";
    }
  };
  const getHealthStatusColor = () => {
    const defaultColor = '#000'; // default color if thresholds are undefined
    return (minThreshold !== undefined && maxThreshold !== undefined) ? 
      ((humidityPercentage >= minThreshold && humidityPercentage <= maxThreshold) ? '#4CAF50' : '#FF0000') :
      defaultColor;
  };

  const handleButtonPress = () => {
    // Update the time when the button is pressed

    setCurrentTime(new Date());   
    isRefreshPressed();
    writePlantHumidityLevel();
    console.log('Button Pressed!');

  };

  function setDashboard() {
    if(latestDataEntry) {
      const length = latestDataEntry.readings.length
      const humidity_raw = latestDataEntry.readings[length - 1].humidity;
      const percentHumidity = parseInt(humidityToPercent(humidity_raw));
      setHumidityPercentage(percentHumidity);
    }
  }

  function humidityToPercent(rawHumidity : number) {
    var finalHumidity
    var base = rawHumidity / 1000
    finalHumidity = base * 100
    return finalHumidity.toFixed(2);
  }

  function writePlantHumidityLevel(){
    const db = getDatabase();
    const humidityLevel = ref(db, '/testSensor/humidityLevel') 
    onValue(humidityLevel, (snapshot) => {
      const data = snapshot.val();
      console.log("data: ", data)
      const percentHumidity = parseInt(humidityToPercent(data)); 
      console.log("percent humidity: ", percentHumidity);
      setHumidityPercentage(percentHumidity)
    })
  }

  function isRefreshPressed(){
    const db = getDatabase();
    set(ref(db, 'testSensor/'),{
      isRefreshPressed: "true"
    });
  }

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
        <Text style={styles.title2}>Min Threshold: {minThreshold}%</Text>
      </View>
      <View style={styles.card3}>
        <Text style={styles.title2}>Max Threshold: {maxThreshold}%</Text>
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
  card3: {
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
