import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux"; // Assuming you're using Redux for state management
import { Link, useNavigate } from "react-router-dom";
import { auth, db } from "../../firebaseauth"; // Import Firebase auth and Firestore
import { getDoc, doc, collection, getDocs } from "firebase/firestore"; // Firestore methods
import { signOut } from "firebase/auth"; // Sign-out functionality
import "bootstrap/dist/css/bootstrap.min.css";
import "./ProfileStyles.css"; // Import CSS for styling

const Profile = () => {
  const reduxUser = useSelector((state) => state.user); // Assuming user data is stored in Redux
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: reduxUser.name || "",
    email: reduxUser.email || "",
    // Add other fields as needed
  });
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [bookings, setBookings] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch user profile from Firestore
    const fetchUserProfile = async () => {
      try {
        const userDoc = await getDoc(doc(db, "users", auth.currentUser.uid));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setUser(userData);
          setProfileData({
            name: userData.name || "",
            email: userData.email || "",
          });
          setIsAdmin(userData.role === "admin");

          // Fetch bookings
          const bookingsSnapshot = await getDocs(
            collection(db, "bookings", auth.currentUser.uid, "userBookings")
          );
          setBookings(
            bookingsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
          );

          // Fetch favorites
          const favoritesSnapshot = await getDocs(
            collection(db, "favorites", auth.currentUser.uid, "userFavorites")
          );
          setFavorites(
            favoritesSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
          );
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching profile data:", error);
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSave = () => {
    // Save the updated profile data, possibly by dispatching a Redux action or sending an API request
    console.log("Profile data saved:", profileData);
    setIsEditing(false);
  };

  const handleSignOut = () => {
    signOut(auth).then(() => navigate("/login"));
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="container" style={{ marginTop: "80px" }}>
      <h2 className="text-center mb-4">Profile Page</h2>
      <div className="card p-4">
        <div className="form-group mb-3">
          <label>Name</label>
          {isEditing ? (
            <input
              type="text"
              className="form-control"
              name="name"
              value={profileData.name}
              onChange={handleInputChange}
            />
          ) : (
            <p>{profileData.name}</p>
          )}
        </div>

        <div className="form-group mb-3">
          <label>Email</label>
          {isEditing ? (
            <input
              type="email"
              className="form-control"
              name="email"
              value={profileData.email}
              onChange={handleInputChange}
            />
          ) : (
            <p>{profileData.email}</p>
          )}
        </div>

        <div className="text-center">
          {isEditing ? (
            <button className="btn btn-success" onClick={handleSave}>
              Save
            </button>
          ) : (
            <button className="btn btn-primary" onClick={handleEditToggle}>
              Edit Profile
            </button>
          )}
        </div>

        {/* Admin Section */}
        {isAdmin && (
          <div className="admin-section mt-4">
            <h3>Admin Section</h3>
            <p>You have admin access. Click below to manage accommodations.</p>
            <button
              onClick={() => navigate("/admin")}
              className="btn btn-primary"
            >
              Go to Admin Dashboard
            </button>
          </div>
        )}

        {/* User Bookings */}
        <div className="mt-4">
          <h3>Your Bookings</h3>
          <ul>
            {bookings.length > 0 ? (
              bookings.map((booking) => (
                <li key={booking.id}>
                  {booking.accommodationName} - Check-in: {booking.checkInDate} - Check-out:{" "}
                  {booking.checkOutDate}
                </li>
              ))
            ) : (
              <p>No bookings found.</p>
            )}
          </ul>
        </div>

        {/* User Favorites */}
        <div className="mt-4">
          <h3>Your Favorites</h3>
          <ul>
            {favorites.length > 0 ? (
              favorites.map((fav) => <li key={fav.id}>{fav.name}</li>)
            ) : (
              <p>No favorites yet.</p>
            )}
          </ul>
        </div>

        <div className="text-center mt-4">
          <Link to="/bookings" className="btn btn-secondary">
            View My Bookings
          </Link>
        </div>

        <div className="text-center mt-4">
          <button onClick={handleSignOut} className="btn btn-danger">
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
