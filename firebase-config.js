// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBKxEeID_ytaUsNQwNEDQur9N0cubWPT0Y",
  authDomain: "dhs-dashboard-97701.firebaseapp.com",
  projectId: "dhs-dashboard-97701",
  storageBucket: "dhs-dashboard-97701.firebasestorage.app",
  messagingSenderId: "883924365862",
  appId: "1:883924365862:web:4e4f77d48c4f89bc332ce7",
  measurementId: "G-ZBLNWG1WDP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
