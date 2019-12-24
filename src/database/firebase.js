import firebase from "firebase/app";
require("firebase/database");

const firebaseConfig = {
  apiKey: "AIzaSyDy43ttotWbtBoUxfZWnlLU5UmF4_ohSRk",
  authDomain: "todoapp-ff313.firebaseapp.com",
  databaseURL: "https://todoapp-ff313.firebaseio.com",
  projectId: "todoapp-ff313",
  storageBucket: "todoapp-ff313.appspot.com",
  messagingSenderId: "368378695011",
  appId: "1:368378695011:web:880733446a6937f5649756",
  measurementId: "G-V80NMX6YZS"
};

const db = firebase.initializeApp(firebaseConfig).database();

export const database = db;
