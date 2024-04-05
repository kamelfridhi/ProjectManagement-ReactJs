// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBvM2T8sf_kzNMupinuRo9qc309s8HVcWk",
    authDomain: "teamsphere-pi.firebaseapp.com",
    projectId: "teamsphere-pi",
    storageBucket: "teamsphere-pi.appspot.com",
    messagingSenderId: "1039260180890",
    appId: "1:1039260180890:web:1d35f3e38ad6372d779a23"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);