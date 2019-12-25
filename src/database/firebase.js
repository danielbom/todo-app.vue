import firebase from "firebase/app";
import "firebase/database";

import firebaseConfig from "./firebaseConfig";

const db = firebase.initializeApp(firebaseConfig).database();

export const database = db;
