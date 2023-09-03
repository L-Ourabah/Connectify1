
import { getAuth } from "firebase/auth";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAaZ12OTyXEq-qMu--38fc3-kYXUGmWrn0",
  authDomain: "test-3a72e.firebaseapp.com",
  projectId: "test-3a72e",
  storageBucket: "test-3a72e.appspot.com",
  messagingSenderId: "733939924500",
  appId: "1:733939924500:web:f774433164f00d0b3db101",
  measurementId: "G-Q78H751KKE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);