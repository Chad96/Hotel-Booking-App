import React, { useState, useEffect } from 'react';
import { collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebaseauth'; // assuming firebaseauth.js contains your Firestore config
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const AdminPanel = () => {
  const [accommodation, setAccommodation] = useState({
    name: '',
    price: '',
    availability: '',
    images: [],
  });
  const [accommodationsList, setAccommodationsList] = useState([]);
  const [images, setImages] = useState([]);

  const storage = getStorage(); // Initialize Firebase storage

  // Fetch accommodations from Firestore
  useEffect(() => {
    const fetchAccommodations = async () => {
      const querySnapshot = await getDocs(collection(db, 'accommodations'));
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

  // Handle image upload
  const handleImageChange = (e) => {
    setImages([...e.target.files]);
  };

  // Upload images to Firebase Storage and return their URLs
  const uploadImages = async () => {
    const imageUrls = [];
    for (let i = 0; i < images.length; i++) {
      const imageRef = ref(storage, `images/${images[i].name}`);
      await uploadBytes(imageRef, images[i]);
      const url = await getDownloadURL(imageRef);
      imageUrls.push(url);
    }
    return imageUrls;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Upload images first
    const imageUrls = await uploadImages();

    // Add accommodation details with image URLs to Firestore
    await addDoc(collection(db, 'accommodations'), {
      ...accommodation,
      images: imageUrls,
    });

    // Reset form and refresh accommodations list
    setAccommodation({
      name: '',
      price: '',
      availability: '',
      images: [],
    });
    setImages([]);
    const querySnapshot = await getDocs(collection(db, 'accommodations'));
    const accommodations = [];
    querySnapshot.forEach((doc) => {
      accommodations.push({ ...doc.data(), id: doc.id });
    });
    setAccommodationsList(accommodations);
  };

  // Handle delete accommodation
  const handleDelete = async (id) => {
    await deleteDoc(doc(db, 'accommodations', id));
    setAccommodationsList(accommodationsList.filter((acc) => acc.id !== id));
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
          <label>Upload Images</label>
          <input type="file" multiple onChange={handleImageChange} required />
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
