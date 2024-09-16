import React, { useState, useEffect } from "react";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db, storage } from "../firebaseauth"; // Firebase setup file
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import "./AdminPanelStyles.css"; // CSS file for Admin Panel styling

const AdminPanel = () => {
  const [accommodation, setAccommodation] = useState({
    name: "",
    price: "",
    availability: "",
    images: [],
  });
  const [accommodationsList, setAccommodationsList] = useState([]);
  const [images, setImages] = useState([]); // For handling image files

  // Fetch accommodations from Firestore on component mount
  useEffect(() => {
    const fetchAccommodations = async () => {
      const querySnapshot = await getDocs(collection(db, "accommodations"));
      const accommodations = [];
      querySnapshot.forEach((doc) => {
        accommodations.push({ ...doc.data(), id: doc.id });
      });
      setAccommodationsList(accommodations);
    };

    fetchAccommodations();
  }, []);

  // Handle form input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAccommodation({
      ...accommodation,
      [name]: value,
    });
  };

  // Handle image upload input change
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files); // Get the selected files
    const filePreviews = files.map((file) => {
      const previewUrl = URL.createObjectURL(file); // Generate a URL for preview
      return { file, previewUrl }; // Store both file and preview URL
    });
    setImages(filePreviews); // Update state with previews and files
  };

  // Function to upload images to Firebase Storage and get their URLs
  const uploadImages = async () => {
    const imageUrls = [];
    for (let i = 0; i < images.length; i++) {
      const imageRef = ref(storage, `accommodations/${images[i].name}`); // Create a reference for each image
      await uploadBytes(imageRef, images[i]); // Upload image
      const url = await getDownloadURL(imageRef); // Get the download URL
      imageUrls.push(url); // Store the image URL
    }
    return imageUrls;
  };

  // Handle form submission to add a new accommodation
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Upload images to Firebase Storage and get URLs
    const imageUrls = await uploadImages();

    // Save accommodation data including image URLs to Firestore
    await addDoc(collection(db, "accommodations"), {
      ...accommodation,
      images: imageUrls, // Store image URLs in Firestore
    });

    // Reset form inputs and images state
    setAccommodation({
      name: "",
      price: "",
      availability: "",
      images: [],
    });
    setImages([]);

    // Fetch updated accommodations list from Firestore
    const querySnapshot = await getDocs(collection(db, "accommodations"));
    const accommodations = [];
    querySnapshot.forEach((doc) => {
      accommodations.push({ ...doc.data(), id: doc.id });
    });
    setAccommodationsList(accommodations);
  };

  // Handle delete accommodation from Firestore
  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "accommodations", id)); // Delete accommodation document
    setAccommodationsList(accommodationsList.filter((acc) => acc.id !== id)); // Update list after deletion
  };

  return (
    <div className="admin-panel">
      <h2>Admin Panel</h2>

      {/* Add Accommodation Form */}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={accommodation.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Price</label>
          <input
            type="number"
            name="price"
            value={accommodation.price}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Availability</label>
          <input
            type="text"
            name="availability"
            value={accommodation.availability}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <form onSubmit={handleSubmit}>
            <div>
              <label>Upload Images</label>
              <input
                type="file"
                multiple
                onChange={handleImageChange}
                required
              />
            </div>

            {/* Display selected image previews */}
            <div className="image-preview-container">
              {images.map((image, index) => (
                <div key={index} className="image-preview">
                  <img src={image.previewUrl} alt={`preview-${index}`} />
                </div>
              ))}
            </div>

            <button type="submit">Add Accommodation</button>
          </form>
        </div>
        <button type="submit">Add Accommodation</button>
      </form>

      {/* Accommodations List */}
      <h3>Accommodations</h3>
      <div className="accommodations-list">
        {accommodationsList.map((acc) => (
          <div key={acc.id} className="accommodation-item">
            <h4>{acc.name}</h4>
            <p>Price: ${acc.price}</p>
            <p>Availability: {acc.availability}</p>
            <div className="images">
              {acc.images.map((image, index) => (
                <img key={index} src={image} alt="Accommodation" width="100" />
              ))}
            </div>
            <button onClick={() => handleDelete(acc.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminPanel;
