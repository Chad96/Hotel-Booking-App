import React from "react";
import { useParams } from "react-router-dom";
import accommodations from "../data/accommodations";

const AccommodationDetail = () => {
  const { id } = useParams();
  const accommodation = accommodations.find((accom) => accom.id === id);

  if (!accommodation) {
    return <div>Accommodation not found!</div>;
  }

  return (
    <div className="accommodation-detail">
      <div className="container">
        <h2>{accommodation.name}</h2>
        <img src={accommodation.image} alt={accommodation.name} />
        <p>{accommodation.description}</p>
        <h3>Price: {accommodation.price}</h3>
        <button>Book Now</button>
      </div>
    </div>
  );
};

export default AccommodationDetail;
