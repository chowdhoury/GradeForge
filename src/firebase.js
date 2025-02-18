// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA14cJBqGIAvfMbg7yahPi_aj38cn26auU",
  authDomain: "gradeforge-5d4ae.firebaseapp.com",
  databaseURL: "https://gradeforge-5d4ae-default-rtdb.firebaseio.com",
  projectId: "gradeforge-5d4ae",
  storageBucket: "gradeforge-5d4ae.firebasestorage.app",
  messagingSenderId: "333935691308",
  appId: "1:333935691308:web:b1971f13760c4dab6b7389",
  measurementId: "G-711P5C2PJ9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);