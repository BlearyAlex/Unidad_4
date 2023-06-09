// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAIGmANvyqMQsDOlSx-gYuzlPSVIfZM0Ls',
  authDomain: 'react-native-firebase-b71a7.firebaseapp.com',
  projectId: 'react-native-firebase-b71a7',
  storageBucket: 'react-native-firebase-b71a7.appspot.com',
  messagingSenderId: '353837273408',
  appId: '1:353837273408:web:5243f94557cf78e1f4aaa5',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
