import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import HistoryTable from '../SubComponents/historyTable';
import { FIRESTORE_DB } from '../../firebaseConfig';
import { QuerySnapshot, collection, getDocs, query } from 'firebase/firestore';

type HistoryTypeItem ={
  value: string;
  id: string;
}


export default function History(){

  const [historyList, setHistoryList] = useState(new Array<HistoryTypeItem>());

  function getHistoryList(){
    const historyRef = collection(FIRESTORE_DB, "History");
  
  
    getDocs(query(historyRef)).then(
      (querySnapshot: QuerySnapshot) => {
        const data = querySnapshot.docs.map(
          (doc) => {
            return ({value: doc.data().value, id: doc.data().id } as HistoryTypeItem);
          }
        );
        setHistoryList(data)
      }
    )
  }

  useEffect(() => {
    getHistoryList();
  }); 

  return (
    <View style={styles.container}>
      {historyList.map(history =>{
        return (
          <Text key={history.id}>{history.value}</Text>
        )
      })}
      <HistoryTable></HistoryTable>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    position: 'relative',
    backgroundColor: '#5DB075',
    justifyContent: 'center',
    alignItems: "flex-start",
  }
});

