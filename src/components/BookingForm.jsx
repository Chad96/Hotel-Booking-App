import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../firebaseauth";
import "./BookingForm.css";

const BookingForm = ({ accommodation }) => {
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [rooms, setRooms] = useState(1);
  const [guests, setGuests] = useState(1);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { id } = useParams(); // Assuming route is /book/:id

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await addDoc(collection(db, "bookings"), {
        accommodationId: id,
        checkInDate,
        checkOutDate,
        rooms,
        guests,
      });
      alert("Booking successful!");
    } catch (err) {
      setError("Error submitting booking.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="booking-form">
      <h2>Book Accommodation</h2>
      <form onSubmit={handleBookingSubmit}>
        <label>Check-in Date:</label>
        <input
          type="date"
          value={checkInDate}
          onChange={(e) => setCheckInDate(e.target.value)}
          required
        />

        <label>Check-out Date:</label>
        <input
          type="date"
          value={checkOutDate}
          onChange={(e) => setCheckOutDate(e.target.value)}
          required
        />

        <label>Number of Rooms:</label>
        <input
          type="number"
          min="1"
          value={rooms}
          onChange={(e) => setRooms(e.target.value)}
          required
        />

        <label>Number of Guests:</label>
        <input
          type="number"
          min="1"
          value={guests}
          onChange={(e) => setGuests(e.target.value)}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? "Processing..." : "Book Now"}
        </button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
    </div>
  );
};

export default BookingForm;
