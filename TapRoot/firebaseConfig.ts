// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { initializeAuth, inMemoryPersistence } from "firebase/auth";
import { getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBDCv9y-buDbsVEx9Hy4ePuFbsAnIw5-tQ",
  authDomain: "taproot-561bd.firebaseapp.com",
  projectId: "taproot-561bd",
  storageBucket: "taproot-561bd.appspot.com",
  messagingSenderId: "708016590340",
  appId: "1:708016590340:web:b4525c7a0210b6898eaf51"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const FIRESTORE_DB = getFirestore(app);
export const initAuth = initializeAuth(app,{
  persistence:inMemoryPersistence
});