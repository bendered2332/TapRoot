import React, { useEffect, useState } from 'react';
import mockData from '../mockData/mockData.json';
import { View, Text, Button } from 'react-native';
import { FIRESTORE_DB } from '../../firebaseConfig';
import { QuerySnapshot, collection, getDocs, orderBy, query } from 'firebase/firestore';

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
    <View>
      {historyList.map(history =>{
        return (
          <Text key={history.id}>{history.value}</Text>
        )
      })}
      <Text>Me baby</Text>
      <Text>This is the History screen which will show past api data in chart form??????TBD</Text>
    </View>
  );
};

