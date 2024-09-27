import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC60Mf9Dd5GGP_6TNTSzUKE89WTxS_CZRg",
    authDomain: "college-event-2024-37311.firebaseapp.com",
    projectId: "college-event-2024-37311",
    storageBucket: "college-event-2024-37311.appspot.com",
    messagingSenderId: "72089899139",
    appId: "1:72089899139:web:106bed2a0f75c4a7980bb6",
    measurementId: "G-FN6YWE5052"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
  
  export const db = firebase.firestore();
  export const storage = firebase.storage();