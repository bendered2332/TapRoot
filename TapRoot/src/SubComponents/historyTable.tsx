import React from 'react';
import { Text, StyleSheet} from 'react-native';

import { DataTable } from 'react-native-paper';
import { DataEntry  } from '../Service/dto';


const HistoryTable =({ data }: { data: DataEntry[]}) => {
    if (!data || data.length === 0) {
        return <Text>Please select a Date for the table to appear!</Text>
    }
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
          <DataTable.Row key={entry.id + '-' + i}>
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
