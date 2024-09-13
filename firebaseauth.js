import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // Firestore import
import { getStorage } from "firebase/storage"; // Storage import

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCKbkzs9X2hNHSQ1UvUSez8xynIFMmX62g",
  authDomain: "hotel-booking-app-d2493.firebaseapp.com",
  projectId: "hotel-booking-app-d2493",
  storageBucket: "hotel-booking-app-d2493.appspot.com",
  messagingSenderId: "850286590028",
  appId: "1:850286590028:web:2c0900f30ebed591fd5ce9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app); // Firebase Authentication
export const db = getFirestore(app); // Firestore Database
export const storage = getStorage(app); // Firebase Storage

export default app;
