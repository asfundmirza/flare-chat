// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBZvLPfwntBRdmB9rBQUvC8xIv5AW8wyEc",
  authDomain: "flare-chat-6d2c6.firebaseapp.com",
  projectId: "flare-chat-6d2c6",
  storageBucket: "flare-chat-6d2c6.appspot.com",
  messagingSenderId: "409432643944",
  appId: "1:409432643944:web:1ff43263632fc1f4b19edd",
  measurementId: "G-PDTZQXM1TH",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const auth = getAuth(app);
