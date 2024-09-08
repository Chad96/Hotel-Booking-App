import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const Header = () => {
  return (
    <header className="header">
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg" style={{ 
         backgroundColor: "#333", // Dark background for the navbar
        position: "fixed",
        width: "100%",
        top: 0,
        left: 0,
        zIndex: 1000,
      }}>
        <div className="container" style={{ justifyContent: "space-between" }}>
          <a className="navbar-brand" href="/">
            <img
              src="/assets/logo.png"
              alt="Hotel Logo"
              style={{ height: "50px" }}
            />
          </a>
          <div className="d-flex align-items-center">
            <Link className="nav-link" to="/" style={{ color: "#FFD700", margin: "0 10px" }}>Home</Link>
            <Link className="nav-link" to="/login" style={{ color: "#FFD700", margin: "0 10px" }}>Login</Link>
            <Link className="nav-link" to="/register" style={{ color: "#FFD700", margin: "0 10px" }}>Register</Link>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
