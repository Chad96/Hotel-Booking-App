import React, { useState, useEffect } from "react";
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { db, storage } from "../../firebaseauth";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const AdminDashboard = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [availability, setAvailability] = useState(true);
  const [images, setImages] = useState([]);
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [rooms, setRooms] = useState([]);
  const [reservations, setReservations] = useState([]); // To manage reservations
  const [editingRoomId, setEditingRoomId] = useState(null);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "accommodations"));
        const roomsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setRooms(roomsData);
      } catch (fetchError) {
        setError("Error fetching accommodations.");
        console.error(fetchError);
      }
    };

    const fetchReservations = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "reservations"));
        const reservationsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setReservations(reservationsData);
      } catch (fetchError) {
        setError("Error fetching reservations.");
        console.error(fetchError);
      }
    };

    fetchRooms();
    fetchReservations(); // Fetch reservations on page load
  }, []);

  const handleFileChange = async (e) => {
    const files = e.target.files;
    const imageUrls = [];
    try {
      for (const file of files) {
        const storageRef = ref(storage, `images/${file.name}`);
        await uploadBytes(storageRef, file);
        const downloadURL = await getDownloadURL(storageRef);
        imageUrls.push(downloadURL);
      }
      setImages(imageUrls);
    } catch (uploadError) {
      setError("Error uploading images. Please try again.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (editingRoomId) {
        const roomRef = doc(db, "accommodations", editingRoomId);
        await updateDoc(roomRef, {
          name,
          description,
          price: parseFloat(price),
          availability,
          images,
          location,
        });
        alert("Accommodation updated successfully!");
      } else {
        await addDoc(collection(db, "accommodations"), {
          name,
          description,
          price: parseFloat(price),
          availability,
          images,
          location,
        });
        alert("Accommodation added successfully!");
      }

      setName("");
      setDescription("");
      setPrice("");
      setAvailability(true);
      setImages([]);
      setLocation("");
      setEditingRoomId(null);
      setError("");
    } catch (error) {
      setError("Error adding/updating accommodation. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "accommodations", id));
      setRooms(rooms.filter((room) => room.id !== id));
      alert("Accommodation deleted successfully!");
    } catch (error) {
      setError("Error deleting accommodation.");
    }
  };

  const handleEdit = (room) => {
    setName(room.name);
    setDescription(room.description);
    setPrice(room.price);
    setAvailability(room.availability);
    setImages(room.images);
    setLocation(room.location);
    setEditingRoomId(room.id);
  };

  const handleApproveReservation = async (id) => {
    // Update reservation status
    const reservationRef = doc(db, "reservations", id);
    await updateDoc(reservationRef, { status: "Approved" });
    alert("Reservation approved.");
  };

  const handleCancelReservation = async (id) => {
    // Update reservation status
    const reservationRef = doc(db, "reservations", id);
    await updateDoc(reservationRef, { status: "Cancelled" });
    alert("Reservation cancelled.");
  };

  const containerStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    padding: "20px",
    gap: "20px",
    backgroundColor: "#f0f0f0",
  };

  const formContainerStyle = {
    flex: 1,
    backgroundColor: "#ffffff",
    borderRadius: "10px",
    padding: "30px",
    boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
    display: "flex",
    flexDirection: "column",
  };

  const listContainerStyle = {
    flex: 1,
    backgroundColor: "#ffffff",
    borderRadius: "10px",
    padding: "30px",
    boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
    display: "flex",
    flexDirection: "column",
  };

  const inputStyle = {
    width: "100%",
    padding: "12px",
    borderRadius: "5px",
    border: "1px solid #ddd",
    marginBottom: "20px",
  };

  const buttonStyle = {
    width: "100%",
    padding: "12px",
    backgroundColor: "#28a745",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background-color 0.3s",
  };

  const roomCardStyle = {
    padding: "20px",
    marginBottom: "20px",
    border: "1px solid #ddd",
    borderRadius: "5px",
    boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.1)",
    textAlign: "left",
  };

  const reservationCardStyle = {
    ...roomCardStyle,
    backgroundColor: "#f8f9fa",
  };

  const deleteButtonStyle = {
    ...buttonStyle,
    backgroundColor: "#dc3545",
    marginTop: "10px",
  };

  return (
    <div style={containerStyle}>
      {/* Form for adding/editing accommodations */}
      <div style={formContainerStyle}>
        <h1>{editingRoomId ? "Edit Accommodation" : "Add Accommodation"}</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              style={inputStyle}
            />
          </div>
          <div>
            <label>Description:</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              style={inputStyle}
            />
          </div>
          <div>
            <label>Price:</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
              style={inputStyle}
            />
          </div>
          <div>
            <label>Availability:</label>
            <input
              type="checkbox"
              checked={availability}
              onChange={(e) => setAvailability(e.target.checked)}
            />
          </div>
          <div>
            <label>Images:</label>
            <input
              type="file"
              multiple
              onChange={handleFileChange}
              style={inputStyle}
            />
          </div>
          <div>
            <label>Location:</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
              style={inputStyle}
            />
          </div>
          <button type="submit" disabled={loading} style={buttonStyle}>
            {loading ? "Processing..." : editingRoomId ? "Update Accommodation" : "Add Accommodation"}
          </button>
          {error && <p style={{ color: "red" }}>{error}</p>}
        </form>
      </div>

      {/* Accommodation List (Read, Edit, Delete) */}
      <div style={listContainerStyle}>
        <h2>Manage Accommodations</h2>
        {rooms.length === 0 ? (
          <p>No accommodations available.</p>
        ) : (
          rooms.map((room) => (
            <div key={room.id} style={roomCardStyle}>
              <h3>{room.name}</h3>
              <p>{room.description}</p>
              <p>Price: ${room.price}</p>
              <p>Availability: {room.availability ? "Available" : "Unavailable"}</p>
              <p>Location: {room.location}</p>
              <button
                onClick={() => handleEdit(room)}
                style={{ ...buttonStyle, marginBottom: "10px" }}
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(room.id)}
                style={deleteButtonStyle}
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>

      {/* Reservations List (Read, Approve, Cancel) */}
      <div style={listContainerStyle}>
        <h2>Manage Reservations</h2>
        {reservations.length === 0 ? (
          <p>No reservations available.</p>
        ) : (
          reservations.map((reservation) => (
            <div key={reservation.id} style={reservationCardStyle}>
              <h3>{reservation.guestName}</h3>
              <p>Room: {reservation.roomName}</p>
              <p>Check-in: {reservation.checkIn}</p>
              <p>Check-out: {reservation.checkOut}</p>
              <p>Status: {reservation.status}</p>
              <button
                onClick={() => handleApproveReservation(reservation.id)}
                style={{ ...buttonStyle, marginBottom: "10px" }}
              >
                Approve
              </button>
              <button
                onClick={() => handleCancelReservation(reservation.id)}
                style={deleteButtonStyle}
              >
                Cancel
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
