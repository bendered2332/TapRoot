import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDFPpKl6031BJs1MgApXy18Dmpkb8DQlJE",
  authDomain: "taproot-152cf.firebaseapp.com",
  projectId: "taproot-152cf",
  storageBucket: "taproot-152cf.appspot.com",
  messagingSenderId: "295191071593",
  appId: "1:295191071593:web:0105376e4ee9ad858ecbf8",
  measurementId: "G-B8EB1H3T6G"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);