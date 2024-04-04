import React from 'react';
import { Text, StyleSheet} from 'react-native';

import { DataTable } from 'react-native-paper';
import { DataEntry  } from '../Service/dto';


const HistoryTable =({ data }: { data: DataEntry[]}) => {
    if (!data || data.length === 0) {
      return <Text style={{ fontSize: 18, paddingLeft: 8, fontWeight: 'bold',}}>Please select a Date for the table to appear!</Text>    }
    // just return the data
  return (
    <DataTable>
      <DataTable.Header>     
        <DataTable.Title>Date</DataTable.Title>
        <DataTable.Title>Time</DataTable.Title>
        <DataTable.Title numeric>Humidity</DataTable.Title>
      </DataTable.Header>

      {data.map((entry, index) => (
        entry.readings.map((reading, i) => (
          <DataTable.Row
            key={entry.id + '-' + i}
            style={{ backgroundColor: i % 2 === 0 ? '#5DB075' : '#47935D' }} // Alternate row colors based on reading index
          >
            <DataTable.Cell>{entry.date}</DataTable.Cell>
            <DataTable.Cell>{reading.time.substring(0, 5)}</DataTable.Cell>
            <DataTable.Cell numeric>{reading.humidity.toFixed(2)}</DataTable.Cell>
          </DataTable.Row>
        ))
      ))}
    </DataTable>
  );
};

export default HistoryTable;
