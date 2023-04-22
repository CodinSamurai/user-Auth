import { initializeApp } from 'firebase/app'
import {getAuth} from 'firebase/auth'
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDc6IADyA73j0G6JNNwesxtzP7sjfiA7x8",
  authDomain: "car-vehicle-management-auth.firebaseapp.com",
  projectId: "car-vehicle-management-auth",
  storageBucket: "car-vehicle-management-auth.appspot.com",
  messagingSenderId: "883758974425",
  appId: "1:883758974425:web:35600a435b32809475c5c8",
  measurementId: "G-P0SQN5RFVF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app)
export {auth}