import React from "react";
import AccommodationCard from "../components/AccommodationCard";
import accommodations from "../data/accommodations";
import "bootstrap/dist/css/bootstrap.min.css";
import hotelImage from "../assets/hotel.jpg";

// Assuming some color and font details from Figma
const primaryColor = "#FF5733"; // Example color
const fontFamily = "'Roboto', sans-serif"; // Example font

const Home = () => {
  return (
    <>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark" style={{ 
        backgroundColor: "rgba(255, 255, 255, 0.1)", // Slightly transparent white
        backdropFilter: "blur(10px)", // Glassy effect
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
          <div
            className="d-flex align-items-center"
          >
            <a className="nav-link" href="/" style={{ color: "#fff", margin: "0 10px" }}>Home</a>
            <a className="nav-link" href="/login" style={{ color: "#fff", margin: "0 10px" }}>Login</a>
            <a className="nav-link" href="/register" style={{ color: "#fff", margin: "0 10px" }}>Register</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="hero-section" style={{ paddingTop: "60px" }}> {/* Padding to prevent content overlap */}
        <div
          className="hero-image"
          style={{
            backgroundImage: `url(${hotelImage})`,
            height: "600px",
            backgroundSize: "cover",
            backgroundPosition: "center",
            position: "relative",
          }}
        >
          <div
            className="hero-overlay"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(0, 0, 0, 0.5)", // Adjust opacity as needed
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div className="text-center text-white" style={{ fontFamily }}>
              <h1 style={{ fontSize: "48px", fontWeight: "bold" }}>
                Chuini Zanzibar Beach Lodge
              </h1>
              <p style={{ fontSize: "20px" }}>
                Experience Paradise on the Shores of Zanzibar
              </p>
              <a href="#accommodations" className="btn btn-primary mt-3" style={{ backgroundColor: primaryColor, borderColor: primaryColor }}>
                Explore Accommodations
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Accommodations Section */}
      <div className="home my-5" id="accommodations">
        <div className="container">
          <h2 className="text-center mb-5" style={{ fontFamily }}>
            Our Accommodations
          </h2>
          <div className="row">
            {accommodations.map((accommodation) => (
              <div key={accommodation.id} className="col-lg-4 col-md-6 mb-4">
                <AccommodationCard accommodation={accommodation} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
