import React from "react";
import AccommodationCard from "../components/AccommodationCard";
import accommodations from "../data/accommodations";
import "bootstrap/dist/css/bootstrap.min.css";
import hotelImage from "../assets/hotelb.jpg"; // Importing the new hotel image
import logo from "../assets/logo.png"; // Importing the logo
import largeImage from "../assets/largeImage.jpg"; // Add your large image here

// Assuming some color and font details from Figma
const primaryColor = "#FF5733"; // Example color
const fontFamily = "'Roboto', sans-serif"; // Example font

const Home = () => {
  return (
    <>
      {/* Navbar */}
      <nav
        className="navbar navbar-expand-lg navbar-dark"
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.1)", // Slightly transparent white
          backdropFilter: "blur(10px)", // Glassy effect
          position: "fixed",
          width: "100%",
          top: 0,
          left: 0,
          zIndex: 1000,
        }}
      >
        <div className="container" style={{ justifyContent: "space-between" }}>
          {/* Navbar brand with logo */}
          <a className="navbar-brand" href="/">
            <img
              src={logo} // Use imported logo
              alt="Hotel Logo"
              style={{ height: "50px" }}
            />
          </a>
          <div className="d-flex align-items-center">
            <a
              className="nav-link"
              href="/"
              style={{ color: "#fff", margin: "0 10px" }}
            >
              Home
            </a>
            <a
              className="nav-link"
              href="/login"
              style={{ color: "#fff", margin: "0 10px" }}
            >
              Login
            </a>
            <a
              className="nav-link"
              href="/register"
              style={{ color: "#fff", margin: "0 10px" }}
            >
              Register
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="hero-section" style={{ paddingTop: "60px" }}>
        <div
          className="hero-image"
          style={{
            backgroundImage: `url(${hotelImage})`, // Use the new image
            height: "600px",
            backgroundSize: "cover",
            backgroundPosition: "center",
            position: "relative",
            marginTop: "-2%",
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
              backgroundColor: "rgba(0, 0, 0, 0.5)", // Dark overlay
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div className="text-center text-white" style={{ fontFamily }}>
              <h1 style={{ fontSize: "48px", fontWeight: "bold" }}>
                Welcome to Chad's Beach Hotel
              </h1>
              <p style={{ fontSize: "20px" }}>
                Experience Paradise on the Shores of the Beach
              </p>
              <a
                href="#accommodations"
                className="btn btn-primary mt-3"
                style={{ backgroundColor: primaryColor, borderColor: primaryColor }}
              >
                Explore Accommodations
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* New Section with Image on the Left and Text on the Right */}
      <div className="container my-5">
        <div className="row">
          {/* Image on the Left */}
          <div className="col-lg-6">
            <img
              src={largeImage} // Use the new large image
              alt="Large Display"
              className="img-fluid" // Bootstrap class for responsive images
              style={{ borderRadius: "4px" }} // Add some styling if needed
            />
          </div>

          {/* Text on the Right */}
          <div className="col-lg-6 d-flex align-items-center">
            <div style={{ fontFamily }}>
              <h2 style={{ color: primaryColor }}>Discover Our Exclusive Packages</h2>
              <p style={{ fontSize: "18px", textAlign: "justify" }}>
                At Chad's Beach Hotel, we offer an array of exclusive packages designed 
                to give you the ultimate relaxation and luxury experience. Whether you 
                are looking for a romantic getaway, family vacation, or a corporate retreat, 
                we have something for everyone. Enjoy breathtaking views, world-class 
                amenities, and unmatched hospitality during your stay.
              </p>
              <p style={{ fontSize: "18px", textAlign: "justify" }}>
                Book now and indulge in the serenity and beauty of the beachside, 
                where every moment feels like paradise.
              </p>
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
