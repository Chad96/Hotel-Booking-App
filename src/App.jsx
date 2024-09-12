import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebaseauth";
import { useDispatch, useSelector } from "react-redux";
import { setRole } from "./store/userSlice";

import Home from "./pages/Home";
import AccommodationDetail from "./pages/AccommodationDetail";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminDashboard from "./pages/AdminDashboard";
import Header from "./components/Header";
import Footer from "./components/Footer";

const App = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const role = useSelector((state) => state.user.role); // Get role from Redux

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser?.email === "admin@example.com") {
        dispatch(setRole("admin")); // Set role to admin if the user is an admin
      } else {
        dispatch(setRole("user"));
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [dispatch]);

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

        {/* Admin Route - Only accessible if the user is an admin */}
        <Route
          path="/admin"
          element={role === "admin" ? <AdminDashboard /> : <Navigate to="/" />}
        />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
