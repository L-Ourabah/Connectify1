// Import des modules Firebase nécessaires
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "@firebase/firestore";
import { getStorage } from "firebase/storage";

// Configuration Firebase récupérée à partir des variables d'environnement
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: "G-F79K7F34HQ"
};

// Initialise Firebase avec la configuration
const app = initializeApp(firebaseConfig);

// Exporte les instances des services Firebase pour les utiliser ailleurs dans l'application
export const storage = getStorage(app); // Service Firebase Storage
export const auth = getAuth(app);         // Service Firebase Auth (authentification)
export const db = getFirestore(app);      // Service Firebase Firestore (base de données)

