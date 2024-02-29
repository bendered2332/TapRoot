import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { DataEntry} from '../Service/dto';
import { ActivityIndicator, MD2Colors } from 'react-native-paper';

const ThresholdChart = ({ data, isSevenDay }: { data: DataEntry[], isSevenDay: boolean }) => {
    if (!data || data.length === 0) {
      return <ActivityIndicator animating={true} color={MD2Colors.purple600} />
    }
    const [selectedPoint, setSelectedPoint] = useState<{
      date: string;
      time: string;
      humidity: number;
    } | null>(null);

    const dateLabels: string[] = [];
    const humidityData: number[] = [];
    setData()

    function setData() {
      if(isSevenDay) 
        {
          // 7 day chart default
          data.forEach((dataEntry, index) => {
            // get 2nd to last entry  of the day
            const lastReading = dataEntry.readings[(dataEntry.readings.length - 1)];
            if (lastReading) {
              // Add every other label to the dateLabels array
              if (index % 2 === 0) {
                dateLabels.push(dataEntry.date.slice(5)); // get only the mm:dd part
              } else {
                dateLabels.push(''); // Add an empty string for labels to be skipped
              }
              humidityData.push(lastReading.humidity);
            }
          });
        }
      else 
        {
          // past 24 hours chart
          data.forEach((dataEntry) => {
            dataEntry.readings.forEach((readingVal, index) =>{
              humidityData.push(readingVal.humidity) // store the humididity data

              if (index % 2 === 0) { // get every second, every 2 point
                dateLabels.push(readingVal.time.substring(0,5)); // get only the hh:mm part
              } else {
                dateLabels.push(''); // Add an empty string for labels to be skipped
              }
            })

          });
        }

    }
    
    const onPointPress = (point: { index: number }) => { 
      if (isSevenDay) {
        const selectedEntry = data[point.index];
        const lastReading = selectedEntry.readings[selectedEntry.readings.length - 1];
        if (lastReading) {
          setSelectedPoint({
            date: selectedEntry.date,
            time: lastReading.time,
            humidity: lastReading.humidity,
          });
        }
      } else {
        const selectedEntry = data[0].readings[point.index];
        if (selectedEntry) {
          setSelectedPoint({
            date: data[0].date,
            time: selectedEntry.time,
            humidity: selectedEntry.humidity,
          });
        }
      }
    }
      
  
    const chartData = {
      labels: dateLabels,
      datasets: [
        {
          data: humidityData,
          color: (opacity: number) => `rgba(90, 142, 215, ${opacity})`,
          strokeWidth: 2,
        },
      ],
    };

    return (
      <View style={styles.container}>
        <Text style={styles.chartTitle}>Humidity Chart</Text>
        <LineChart
          data={chartData}
          width={300}
          height={200}
          yAxisSuffix="%"
          yAxisInterval={1}
          chartConfig={{
            backgroundColor: '#ffffff',
            backgroundGradientFrom: '#ffffff',
            backgroundGradientTo: '#ffffff',
            decimalPlaces: 2,
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          }}
          bezier
          onDataPointClick={onPointPress}
        />
        {selectedPoint && <Tooltip selectedPoint={selectedPoint} />}
      </View>
    );
  };

  const Tooltip: React.FC<{ selectedPoint: { date: string; time: string; humidity: number } }> = ({ selectedPoint }) => (
    <View style={styles.tooltipContainer}>
      <Text>Date: {selectedPoint.date}</Text>
      <Text>Time: {selectedPoint.time}</Text>
      <Text>Humidity: {selectedPoint.humidity}</Text>
    </View>
  );

  const styles = StyleSheet.create({
    container: {
      // Add container styles if needed
    },
    chartTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    tooltipContainer: {
      // Add tooltip container styles if needed
    },
  });


export default ThresholdChart;

