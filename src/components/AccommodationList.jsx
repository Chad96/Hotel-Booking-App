import React, { useState, useEffect } from "react";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../../firebaseauth";
import { Link } from "react-router-dom";
import "./AccommodationList.css"; // Importing CSS

const AccommodationList = () => {
  const [accommodations, setAccommodations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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

  if (loading) return <p>Loading accommodations...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="accommodation-list-container">
      {accommodations.map((accommodation) => (
        <div key={accommodation.id} className="accommodation-card">
          {/* Accommodation image */}
          <img
            src={accommodation.imageUrl} // Using imageUrl from database
            alt={accommodation.name}
            className="accommodation-image"
          />

          {/* Accommodation details */}
          <div className="accommodation-details">
            <h3>{accommodation.name}</h3>
            <p>{accommodation.address}</p>
            <p className="accommodation-price">${accommodation.price} / night</p>

            {/* Placeholder for map */}
            <div id={`map-${accommodation.id}`} className="accommodation-map">
              <iframe
                src={`https://www.google.com/maps?q=${accommodation.location}&output=embed`}
                title={`Map of ${accommodation.name}`}
                style={{ width: "100%", height: "200px" }}
              />
            </div>

            {/* Call-to-action button */}
            <Link to={`/booking/${accommodation.id}`} className="book-now-button">
              Book Now
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AccommodationList;
