// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBmLP9ZYyH7CehXCw2EiDGCWhcYYtyLtFM",
  authDomain: "e-commerce-galactical.firebaseapp.com",
  projectId: "e-commerce-galactical",
  storageBucket: "e-commerce-galactical.appspot.com",
  messagingSenderId: "587190348158",
  appId: "1:587190348158:web:1a5350ab747fafc5d56b2f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;