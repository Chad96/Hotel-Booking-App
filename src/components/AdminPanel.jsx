import React, { useState } from "react";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { getFirestore, collection, addDoc } from "firebase/firestore";

const AdminPanel = () => {
  const [accommodationData, setAccommodationData] = useState({
    name: "",
    price: "",
    availability: "",
    images: [],
  });

  const [uploading, setUploading] = useState(false);
  const storage = getStorage();
  const db = getFirestore();

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const uploadPromises = files.map((file) => {
      const storageRef = ref(storage, `accommodations/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);
      
      return new Promise((resolve, reject) => {
        uploadTask.on(
          "state_changed",
          null,
          (error) => reject(error),
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              resolve(downloadURL);
            });
          }
        );
      });
    });

    Promise.all(uploadPromises)
      .then((urls) => {
        setAccommodationData((prevData) => ({
          ...prevData,
          images: urls,
        }));
      })
      .catch((error) => {
        console.error("Image upload failed:", error);
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);

    try {
      await addDoc(collection(db, "accommodations"), accommodationData);
      alert("Accommodation added successfully!");
    } catch (error) {
      console.error("Error adding accommodation:", error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <h2>Admin Panel - Add Accommodation</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            value={accommodationData.name}
            onChange={(e) =>
              setAccommodationData({ ...accommodationData, name: e.target.value })
            }
            required
          />
        </label>
        <label>
          Price:
          <input
            type="number"
            value={accommodationData.price}
            onChange={(e) =>
              setAccommodationData({ ...accommodationData, price: e.target.value })
            }
            required
          />
        </label>
        <label>
          Availability:
          <input
            type="text"
            value={accommodationData.availability}
            onChange={(e) =>
              setAccommodationData({ ...accommodationData, availability: e.target.value })
            }
            required
          />
        </label>
        <label>
          Upload Images:
          <input
            type="file"
            multiple
            onChange={handleImageUpload}
            required
          />
        </label>
        <button type="submit" disabled={uploading}>
          {uploading ? "Uploading..." : "Add Accommodation"}
        </button>
      </form>
    </div>
  );
};

export default AdminPanel;
