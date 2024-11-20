// Import the functions you need from the SDKs you need
import { initializeApp, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import firebase from "firebase/compat/app";
import Constants from "expo-constants";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
const firebaseApiKey = Constants.expoConfig.extra.FIREBASE_API_KEY;
console.log("apiKey", firebaseApiKey);
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: Constants.expoConfig.extra.FIREBASE_API_KEY,
  authDomain: "sportsperformanceai.firebaseapp.com",
  projectId: "sportsperformanceai",
  storageBucket: "sportsperformanceai.appspot.com",
  messagingSenderId: "724683150922",
  appId: "1:724683150922:web:e5f7d61016beb2fa87b8b3",
  measurementId: "G-LQQMT8GGQ4",
};
/* 
// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth with AsyncStorage persistence
const authInstance = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export { authInstance };
*/

let app;
if (firebase.apps.length === 0) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApp();
}

const auth = getAuth();
export { auth };
