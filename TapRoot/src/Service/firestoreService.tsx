import { DataEntry } from "./dto";
import { doc, getDoc } from 'firebase/firestore';
import 'firebase/firestore';
import { FIRESTORE_DB } from '../../firebaseConfig';

class FirestoreService {
  // fetch data from Firestore collection and document
  async getData(collectionName: string, documentId: string): Promise<DataEntry[] | null> {
    try {
      const docRef = doc(FIRESTORE_DB, collectionName, documentId);
      const docSnapshot = await getDoc(docRef);
  
      if (docSnapshot.exists()) {
        const data = docSnapshot.data() as DataEntry[];
        console.log("Document found");
        console.log(data)
        return data;
      } else {
        console.log("Document not found");
        return null;
      }
    } catch (error) {
      console.error("Error fetching document:", error);
      throw error;
    }
  }
  
}

export default FirestoreService;
