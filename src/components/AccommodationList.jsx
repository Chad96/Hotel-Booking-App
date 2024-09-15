import React, { useState, useEffect } from "react";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../../firebaseauth";
import { Link } from "react-router-dom";
import "./AccommodationList.css";

const AccommodationList = () => {
  const [accommodations, setAccommodations] = useState([]);
  const [filteredAccommodations, setFilteredAccommodations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  
  // Search filters
  const [search, setSearch] = useState({ location: "", minPrice: "", maxPrice: "" });
  
  useEffect(() => {
    const fetchAccommodations = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "accommodations"));
        const accommodationsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setAccommodations(accommodationsData);
        setFilteredAccommodations(accommodationsData); // Initial filtering
        setLoading(false);
      } catch (err) {
        setError("Error fetching accommodations.");
        setLoading(false);
      }
    };
    fetchAccommodations();
  }, []);

  // Handle Search Filter
  const handleSearchChange = (e) => {
    const { name, value } = e.target;
    setSearch({
      ...search,
      [name]: value,
    });
  };

  const applyFilters = () => {
    const { location, minPrice, maxPrice } = search;
    const filtered = accommodations.filter((accommodation) => {
      const matchesLocation = location ? accommodation.location.includes(location) : true;
      const matchesMinPrice = minPrice ? accommodation.price >= parseFloat(minPrice) : true;
      const matchesMaxPrice = maxPrice ? accommodation.price <= parseFloat(maxPrice) : true;
      return matchesLocation && matchesMinPrice && matchesMaxPrice;
    });
    setFilteredAccommodations(filtered);
  };

  if (loading) return <p>Loading accommodations...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="accommodation-list-container">
      {/* Search Filters */}
      <div className="search-filters">
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={search.location}
          onChange={handleSearchChange}
        />
        <input
          type="number"
          name="minPrice"
          placeholder="Min Price"
          value={search.minPrice}
          onChange={handleSearchChange}
        />
        <input
          type="number"
          name="maxPrice"
          placeholder="Max Price"
          value={search.maxPrice}
          onChange={handleSearchChange}
        />
        <button onClick={applyFilters}>Search</button>
      </div>

      {/* Accommodation List */}
      {filteredAccommodations.map((accommodation) => (
        <div key={accommodation.id} className="accommodation-card">
          <img
            src={accommodation.imageUrl}
            alt={accommodation.name}
            className="accommodation-image"
          />

          <div className="accommodation-details">
            <h3>{accommodation.name}</h3>
            <p>{accommodation.address}</p>
            <p className="accommodation-price">${accommodation.price} / night</p>

            <div id={`map-${accommodation.id}`} className="accommodation-map">
              <iframe
                src={`https://www.google.com/maps?q=${accommodation.location}&output=embed`}
                title={`Map of ${accommodation.name}`}
                style={{ width: "100%", height: "200px" }}
              />
            </div>

            <Link to={`/booking/${accommodation.id}`} className="book-now-button">
              Book Now
            </Link>

            {/* Reviews & Ratings */}
            <div className="reviews-section">
              <h4>Reviews & Ratings</h4>
              {/* Display reviews (hardcoded for now, can be fetched from Firestore) */}
              <p>⭐ 4.5 (20 Reviews)</p>
              {/* Placeholder for user input for review */}
              <textarea placeholder="Leave a review"></textarea>
              <button>Submit Review</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AccommodationList;
