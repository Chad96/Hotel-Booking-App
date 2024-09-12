import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebaseauth"; // Import Firestore instance

const BookingForm = () => {
  const [accommodations, setAccommodations] = useState([]);

  useEffect(() => {
    const fetchAccommodations = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "accommodations"));
        const accommodationList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setAccommodations(accommodationList);
      } catch (error) {
        console.error("Error fetching accommodations:", error);
      }
    };

    fetchAccommodations();
  }, []);

  return (
    <div>
      <h2>Available Accommodations</h2>
      {accommodations.length > 0 ? (
        <ul>
          {accommodations.map((accommodation) => (
            <li key={accommodation.id}>
              <h3>{accommodation.name}</h3>
              <p>Price: {accommodation.price}</p>
              <p>Availability: {accommodation.availability}</p>
              {/* Add other details and booking functionality */}
            </li>
          ))}
        </ul>
      ) : (
        <p>No accommodations available.</p>
      )}
    </div>
  );
};

export default BookingForm;
