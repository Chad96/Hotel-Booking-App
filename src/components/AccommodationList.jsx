import React, { useState, useEffect } from "react";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../../firebaseauth";
import { Link } from "react-router-dom";
import "./AccommodationList.css";

const AccommodationList = () => {
  const [accommodations, setAccommodations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchLocation, setSearchLocation] = useState(""); // For location filter
  const [minPrice, setMinPrice] = useState(""); // For min price filter
  const [maxPrice, setMaxPrice] = useState(""); // For max price filter
  const [favorites, setFavorites] = useState([]); // Manage favorite accommodations

  useEffect(() => {
    const fetchAccommodations = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "accommodations"));
        const accommodationsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setAccommodations(accommodationsData);
        setLoading(false);
      } catch (err) {
        setError("Error fetching accommodations.");
        setLoading(false);
      }
    };
    fetchAccommodations();
  }, []);

  const handleSearch = () => {
    return accommodations.filter((accommodation) => {
      const matchesLocation =
        searchLocation === "" ||
        accommodation.location
          .toLowerCase()
          .includes(searchLocation.toLowerCase());
      const matchesMinPrice =
        minPrice === "" || accommodation.price >= parseFloat(minPrice);
      const matchesMaxPrice =
        maxPrice === "" || accommodation.price <= parseFloat(maxPrice);

      return matchesLocation && matchesMinPrice && matchesMaxPrice;
    });
  };

  const filteredAccommodations = handleSearch();

  // Handle adding to favorites
  const handleAddToFavorites = (accommodation) => {
    if (favorites.includes(accommodation.id)) {
      setFavorites(favorites.filter((favId) => favId !== accommodation.id));
    } else {
      setFavorites([...favorites, accommodation.id]);
    }
  };

  // Handle star rating
  const handleStarClick = (index, accommodationId) => {
    console.log(`Accommodation ${accommodationId} rated ${index + 1} stars`);
  };

  const handleShare = (accommodation) => {
    if (navigator.share) {
      navigator
        .share({
          title: accommodation.name,
          text: `Check out this accommodation at ${accommodation.address}`,
          url: window.location.href,
        })
        .then(() => console.log("Shared successfully!"))
        .catch((error) => console.log("Error sharing:", error));
    } else {
      alert("Sharing is not supported on this browser.");
    }
  };

  if (loading) return <p>Loading accommodations...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1
        style={{
          fontSize: "48px",
          fontWeight: "bold",
          marginTop: "80px",
          marginLeft: "25%",
        }}
      >
        Welcome to{" "}
        <span style={{ color: "green", marginBottom: "5%" }}>Le paradis</span>{" "}
        Beach Hotel
      </h1>

      {/* Search Inputs */}
      <div className="search-filters">
        <input
          type="text"
          placeholder="Search by location"
          value={searchLocation}
          onChange={(e) => setSearchLocation(e.target.value)}
        />
        <input
          type="number"
          placeholder="Min price"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
        />
        <input
          type="number"
          placeholder="Max price"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      <div className="accommodation-list-container">
        {filteredAccommodations.map((accommodation) => (
          <div key={accommodation.id} className="accommodation-card">
            {/* Accommodation Image Gallery */}
            <div className="accommodation-images">
              {accommodation.images && accommodation.images.length > 0 ? (
                <div className="image-gallery">
                  {accommodation.images.map((imageUrl, index) => (
                    <img
                      key={index}
                      src={imageUrl}
                      alt={`Accommodation ${index}`}
                      className="accommodation-image"
                    />
                  ))}
                </div>
              ) : (
                <p>No images available</p>
              )}
            </div>

            <div className="accommodation-details">
              <h3>{accommodation.name}</h3>
              <p>{accommodation.address}</p>
              <p className="accommodation-price">
                ${accommodation.price} / night
              </p>

              {/* Star Rating Feature */}
              <div className="star-rating">
                {[...Array(5)].map((_, index) => (
                  <span
                    key={index}
                    onClick={() => handleStarClick(index, accommodation.id)}
                    style={{
                      cursor: "pointer",
                      color: index < 3 ? "orange" : "gray", // Customize logic as per ratings
                    }}
                  >
                    ★
                  </span>
                ))}
              </div>

              {/* Map Placeholder */}
              <div id={`map-${accommodation.id}`} className="accommodation-map">
                <iframe
                  src={`https://www.google.com/maps?q=${accommodation.location}&output=embed`}
                  title={`Map of ${accommodation.name}`}
                  style={{ width: "100%", height: "150px" }}
                />
              </div>

              {/* Add to Favorites */}
              <button
                className={`favorite-button ${
                  favorites.includes(accommodation.id) ? "favorited" : ""
                }`}
                onClick={() => handleAddToFavorites(accommodation)}
              >
                {favorites.includes(accommodation.id)
                  ? "Remove from Favorites"
                  : "Add to Favorites"}
              </button>

              {/* Share Button */}
              <button
                className="share-button"
                onClick={() => handleShare(accommodation)}
              >
                Share
              </button>

              <Link
                to={`/booking/${accommodation.id}`}
                className="book-now-button"
              >
                Book Now
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AccommodationList;
