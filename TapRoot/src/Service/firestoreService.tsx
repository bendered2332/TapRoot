import { DataEntry, Limit } from "./dto";
import { doc, getDoc } from 'firebase/firestore';
import 'firebase/firestore';
import { FIRESTORE_DB } from '../../firebaseConfig';

class FirestoreService {
  //#region Fetch Data from Entry Data
  // fetch data from Firestore collection and document
  async getAllData(collectionName: string, documentId: string): Promise<DataEntry[] | null> {
    try {
      const docRef = doc(FIRESTORE_DB, collectionName, documentId);
      const docSnapshot = await getDoc(docRef);
  
      if (docSnapshot.exists()) {
        const data = docSnapshot.data() as DataEntry[];
        console.log("Service Class: getAllData Document found");
        let result = data.Data; // .data is returning the variable that contians the array
        return result; 
      } else {
        console.log("Document not found");
        return null;
      }
    } catch (error) {
      console.error("Error fetching document:", error);
      throw error;
    }
  }
  
  // get the latest data from db - last element of 'data' array
  async getLatestData(collectionName: string, documentId: string): Promise<DataEntry | null> {
    try {
      const docRef = doc(FIRESTORE_DB, collectionName, documentId);
      const docSnapshot = await getDoc(docRef);
  
      if (docSnapshot.exists()) {
        const data = docSnapshot.data() as DataEntry[];
        console.log("Service Class: getLatestData Document found");
        let result = data.Data; // .data is returning the variable that contians the array
        let lastElement = result[result.length - 1];
        return lastElement; 
      } else {
        console.log("Document not found");
        return null;
      }
    } catch (error) {
      console.error("Error fetching document:", error);
      throw error;
    }
  }
  //#endregion
  //#region Get and Post data from ThresholdLimits
  // Get Data
  async getThresholdLimitsData(collectionName: string, documentId: string): Promise<Limit | null> {
    try {
      const docRef = doc(FIRESTORE_DB, collectionName, documentId);
      const docSnapshot = await getDoc(docRef);

      if (docSnapshot.exists()) {
        const data = docSnapshot.data() as Limit;
        console.log("Service Class getThresholdLimitsData Document found");
        return data

      } else {
        console.log("Document not found");
        return null;
      }
    } catch (error) {
      console.error("Error fetching document:", error);
      throw error;
    }
  }

  //#endregion

}

export default FirestoreService;
