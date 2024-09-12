import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";

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
const auth = getAuth(app);
const db = getFirestore(app);

// Function to set a user as an admin
export const setAdminRole = async (userId) => {
  await setDoc(doc(db, "users", userId), {
    role: "admin",
  });
};

// Function to check if a user is an admin
export const checkAdminRole = async (userId) => {
  const userDoc = await getDoc(doc(db, "users", userId));
  return userDoc.exists() && userDoc.data().role === "admin";
};

export { auth, db };
export default app;
