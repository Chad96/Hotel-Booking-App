import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebaseauth"; // Adjusted import for firebaseauth from the root folder
import Home from "./pages/Home";
import AccommodationDetail from "./pages/AccommodationDetail";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminDashboard from "./pages/AdminDashboard";
import Header from "./components/Header";
import Footer from "./components/Footer";
import AccommodationList from "./components/AccommodationList";
import BookingForm from "./components/BookingForm";
import Profile from "./components/Profile"; // Adjusted import for Profile from components folder

const App = () => {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);

        // Check if the user is an admin
        try {
          const userDoc = await getDoc(doc(db, "users", currentUser.uid));
          if (userDoc.exists() && userDoc.data().role === "admin") {
            setIsAdmin(true);
          } else {
            setIsAdmin(false);
          }
        } catch (error) {
          console.error("Error fetching user document:", error);
          setIsAdmin(false);
        }
      } else {
        setUser(null);
        setIsAdmin(false);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div>Loading...</div>; 
  }

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/accommodation/:id" element={<AccommodationDetail />} />
        <Route path="/booking/:id" element={<BookingForm />} />
        <Route path="/accommodations" element={<AccommodationList />} />

        {/* Temporarily bypass admin route protection */}
        <Route path="/admin" element={<AdminDashboard />} />

        {/* Temporarily bypass profile route protection */}
        <Route path="/profile" element={<Profile />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
