import React, { useState, useEffect } from "react";
import { collection, getDocs, updateDoc, doc, deleteDoc } from "firebase/firestore";
import { db } from "../../firebaseauth"; // Ensure your Firebase setup is correctly imported

const ManageReservations = () => {
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    const fetchReservations = async () => {
      const reservationCollection = collection(db, "reservations");
      const reservationSnapshot = await getDocs(reservationCollection);
      const reservationList = reservationSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setReservations(reservationList);
    };

    fetchReservations();
  }, []);

  // Function to approve, modify or cancel reservations
  const handleUpdateReservation = async (id, status) => {
    const reservationRef = doc(db, "reservations", id);
    await updateDoc(reservationRef, { status });
    alert(`Reservation ${status}`);
  };

  const handleDeleteReservation = async (id) => {
    const reservationRef = doc(db, "reservations", id);
    await deleteDoc(reservationRef);
    alert("Reservation deleted");
  };

  return (
    <div>
      <h2>Manage Reservations</h2>
      {reservations.length > 0 ? (
        <ul>
          {reservations.map((reservation) => (
            <li key={reservation.id}>
              <p>Guest Name: {reservation.guestName}</p>
              <p>Room: {reservation.roomName}</p>
              <p>Check-in: {reservation.checkInDate}</p>
              <p>Check-out: {reservation.checkOutDate}</p>
              <p>Status: {reservation.status}</p>
              <button onClick={() => handleUpdateReservation(reservation.id, "approved")}>Approve</button>
              <button onClick={() => handleUpdateReservation(reservation.id, "modified")}>Modify</button>
              <button onClick={() => handleUpdateReservation(reservation.id, "cancelled")}>Cancel</button>
              <button onClick={() => handleDeleteReservation(reservation.id)}>Delete</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No reservations found</p>
      )}
    </div>
  );
};

export default ManageReservations;
