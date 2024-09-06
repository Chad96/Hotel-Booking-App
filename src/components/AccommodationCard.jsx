import React from "react";
import { Link } from "react-router-dom";

const AccommodationCard = ({ accommodation }) => {
  return (
    <div className="accommodation-card">
      <img src={accommodation.image} alt={accommodation.name} />
      <h3>{accommodation.name}</h3>
      <p>{accommodation.shortDescription}</p>
      <Link to={`/accommodation/${accommodation.id}`}>View More</Link>
    </div>
  );
};

export default AccommodationCard;
