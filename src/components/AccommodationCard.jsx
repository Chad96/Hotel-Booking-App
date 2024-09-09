import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Carousel } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./AccommodationStyles.css"; // Import the new CSS file

// Importing images
import hotels from "../assets/hotels.jpg";
import hot from "../assets/hot.jpg";
import hotel from "../assets/hotel.jpg";
import garden2 from "../assets/hot.jpg";
import garden3 from "../assets/hotel.jpg";

// Accommodations data with imported images
const accommodations = [
  {
    id: 1,
    name: "Ocean View Room",
    shortDescription: "A room with a view of the ocean.",
    images: [hotels, hot, hotel],
    price: "$150 per night",
  },
  {
    id: 2,
    name: "Garden View Room",
    shortDescription: "A room with a view of the garden.",
    images: [hot, garden2, garden3],
    price: "$120 per night",
  },
];

// AccommodationCard Component
const AccommodationCard = ({ accommodation }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setCurrentIndex(selectedIndex);
  };

  return (
    <div className="accommodation-card card-size">
      <Carousel
        activeIndex={currentIndex}
        onSelect={handleSelect}
        interval={null}
        indicators={false}
        nextLabel=""
        prevLabel=""
        className="mb-3 carousel-container"
      >
        {accommodation.images.map((image, index) => (
          <Carousel.Item key={index}>
            <img
              className="d-block w-100"
              src={image}
              alt={`View ${index + 1} of ${accommodation.name}`}
            />
          </Carousel.Item>
        ))}
      </Carousel>
      <h3>{accommodation.name}</h3>
      <p>{accommodation.shortDescription}</p>
      <Link
        to={`/accommodation/${accommodation.id}`}
        className="btn btn-primary"
      >
        View More
      </Link>
    </div>
  );
};

// Main Component to display accommodation cards
const AccommodationList = () => {
  return (
    <div className="custom-container mt-5">
      <div className="row">
        {accommodations.map((accommodation) => (
          <div key={accommodation.id} className="col-md-6 mb-4">
            <AccommodationCard accommodation={accommodation} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AccommodationList;
