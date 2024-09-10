import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth"; // Firebase auth methods
import { auth } from "../firebaseauth"; // Import auth from firebaseauth.js
import Home from "./pages/Home";
import AccommodationDetail from "./pages/AccommodationDetail";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminDashboard from "./pages/AdminDashboard";
import Header from "./components/Header";
import Footer from "./components/Footer";

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/accommodation/:id" element={<AccommodationDetail />} />
        
        {/* Protected route for AdminDashboard */}
        <Route
          path="/admin"
          element={user ? <AdminDashboard /> : <Navigate to="/login" />}
        />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
