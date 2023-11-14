import * as React from 'react';
import { DataTable } from 'react-native-paper';
import mockData from '../mockData/mockData.json';

const HistoryTable = () => {
  interface exData {
    date: string;
    time: string;
    humidity: number;
    id: number;
  }
  console.log(mockData.data[4]);
  const [page, setPage] = React.useState<number>(0);
  const [numberOfItemsPerPageList] = React.useState([5, 10]);
  const [itemsPerPage, onItemsPerPageChange] = React.useState(
    numberOfItemsPerPageList[0]
  );
  const [sortDirection, setSortDirection] = React.useState<'ascending' | 'descending'>('descending');
  const [items, setItems] = React.useState(
    mockData.data
  );
  const from = page * itemsPerPage;
  const to = Math.min((page + 1) * itemsPerPage, items.length);

  React.useEffect(() => {
    setPage(0);
  }, [itemsPerPage]);

  const sortDateData = (direction: 'ascending' | 'descending') => {
    const sortedItems = [...items].sort((a: exData, b: exData) => {
      if (direction === 'ascending') {
        return a.date.localeCompare(b.date); 
      } else {
         return b.date.localeCompare(a.date);
      }
    });
    setItems(sortedItems);
  };
  const handleSort = (key: string) => {
    const newSortDirection = sortDirection === 'ascending' ? 'descending' : 'ascending';
    console.log("new: ", newSortDirection, "old: ",sortDirection);
    setSortDirection(newSortDirection);
    switch(key) { 
      case 'date': { 
        sortDateData(newSortDirection);
         break; 
      } 
      case 'humidity': { 
         // to add humidity sorter or by time sorter
         break; 
      } 
   } 
  };

  return (
    <DataTable>
      <DataTable.Header>     
      <DataTable.Title 
         onPress={() => handleSort('date')} 
         sortDirection={sortDirection === 'ascending' ? 'ascending' : 'descending'}>Date</DataTable.Title>
        <DataTable.Title>Time</DataTable.Title>
        <DataTable.Title numeric>Humidity</DataTable.Title>
      </DataTable.Header>

      {items.slice(from, to).map((item, i) => ( 
        <DataTable.Row key={i}>
          <DataTable.Cell>{item.date}</DataTable.Cell>
          <DataTable.Cell>{item.time?.substring(0,5)}</DataTable.Cell> 
          <DataTable.Cell numeric>{item.humidity.toFixed(2)}</DataTable.Cell>
        </DataTable.Row>
      ))}

      <DataTable.Pagination
        page={page}
        numberOfPages={Math.ceil(items.length / itemsPerPage)}
        onPageChange={(page) => setPage(page)}
        label={`${from + 1}-${to} of ${items.length}`}
        numberOfItemsPerPageList={numberOfItemsPerPageList}
        numberOfItemsPerPage={itemsPerPage}
        onItemsPerPageChange={onItemsPerPageChange}
        showFastPaginationControls
        selectPageDropdownLabel={'Rows per page'}
      />
    </DataTable>
  );
};

export default HistoryTable;
