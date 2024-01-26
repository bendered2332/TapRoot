import React, { useState } from 'react';
import { View, Text } from 'react-native';
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

  const onPointPress = (point: { index: number; value: number }) => {
    const selectedEntry = data[point.index];
    setSelectedPoint({
      date: selectedEntry.date,
      time: selectedEntry.time,
      humidity: selectedEntry.humidity,
    });
  };

  // Extract unique dates from the data
  const uniqueDates = Array.from(new Set(data.map((entry) => entry.date)));

  // Extract the first recording for each date
  const firstRecordings = uniqueDates.map((date) => {
    const firstEntry = data.find((entry) => entry.date === date);
    return firstEntry ? { date, time: firstEntry.time, humidity: firstEntry.humidity } : null;
  }).filter(Boolean) as { date: string; time: string; humidity: number }[];

  // Extract time labels in "mm-dd" format from the first recording data, including every other date
  const timeLabels = firstRecordings
    .filter((_, index) => index % 2 === 0) // Include every other date
    .map((entry) => entry.date.slice(5)); // Extracts month and day

  const chartData = {
    labels: timeLabels,
    datasets: [
      {
        data: firstRecordings.map((entry) => entry.humidity),
        color: (opacity = 1) => `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, ${opacity})`,
        strokeWidth: 2,
      },
    ],
  };

  return (
    <View>
      <Text>Humidity Chart</Text>
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
      {selectedPoint && (
        <View>
          <Text>Date: {selectedPoint.date}</Text>
          <Text>Time: {selectedPoint.time}</Text>
          <Text>Humidity: {selectedPoint.humidity}</Text>
        </View>
      )}
    </View>
  );
};

export default ThresholdChart;
