import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AccommodationDetail from "./pages/AccommodationDetail";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminDashboard from "./pages/AdminDashboard";
import Header from "./components/Header";
import Footer from "./components/Footer";


const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/accommodation/:id" element={<AccommodationDetail />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
