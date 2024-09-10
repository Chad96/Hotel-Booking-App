// firebaseauth.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

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

// Export the Firebase auth instance
export const auth = getAuth(app);

export default app;
