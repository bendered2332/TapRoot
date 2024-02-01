import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

interface ThresholdChartProps {
  data: {
    date: string;
    time: string;
    humidity: number;
    id: number;
  }[];
}

const ThresholdChart: React.FC<ThresholdChartProps> = ({ data }) => {
  const [selectedPoint, setSelectedPoint] = useState<{
    date: string;
    time: string;
    humidity: number;
  } | null>(null);

  const uniqueDates = Array.from(new Set(data.map((entry) => entry.date)));
  
  const firstRecordings = uniqueDates.reverse().map((date) => {
    const firstEntry = data.find((entry) => entry.date === date);
    return firstEntry ? { date, time: firstEntry.time, humidity: firstEntry.humidity } : null;
  }).filter(Boolean) as { date: string; time: string; humidity: number }[];

  const timeLabels = firstRecordings
    .filter((_, index) => index % 2 === 0) // every other date for x axis 
    .map((entry) => entry.date.slice(5)); // extract month and day - mm/dd remove year

  const onPointPress = (point: { index: number; value: number }) => {
    const selectedEntry = firstRecordings[point.index];
    setSelectedPoint({
      date: selectedEntry.date,
      time: selectedEntry.time,
      humidity: selectedEntry.humidity,
    });
  };

  const chartData = {
    labels: timeLabels,
    datasets: [
      {
        data: firstRecordings.map((entry) => entry.humidity), // display points in correct order
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
    // container styles if needed
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  tooltipContainer: {
    //  tooltip container styles if needed
  },
});

export default ThresholdChart;
