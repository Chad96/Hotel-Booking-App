import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Carousel } from "react-bootstrap"; // Using Bootstrap's Carousel component
import "bootstrap/dist/css/bootstrap.min.css"; // Make sure to import Bootstrap's CSS

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
    images: [hotels, hot, hotel], // Use imported images
  },
  {
    id: 2,
    name: "Garden View Room",
    shortDescription: "A room with a view of the garden.",
    images: [hot, garden2, garden3], // Use imported images
  },
];

// AccommodationCard Component
const AccommodationCard = ({ accommodation }) => {
  // State to track the current image index
  const [currentIndex, setCurrentIndex] = useState(0);

  // Handle carousel index change
  const handleSelect = (selectedIndex) => {
    setCurrentIndex(selectedIndex);
  };

  return (
    <div className="accommodation-card card-size">
      {" "}
      {/* Apply custom class */}
      <Carousel
        activeIndex={currentIndex}
        onSelect={handleSelect}
        interval={null} // Remove auto-play for more control
        indicators={false} // Hide dots for a cleaner look
        nextLabel=""
        prevLabel=""
        className="mb-3"
      >
        {accommodation.images.map((image, index) => (
          <Carousel.Item key={index}>
            <img
              className="d-block w-100"
              src={image}
              alt={`View ${index + 1} of ${accommodation.name}`}
              style={{
                borderRadius: "10px",
                height: "300px",
                width: "100%",
                objectFit: "cover",
              }} // Increase height
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
    <div className="container mt-5">
      <div className="row">
        {accommodations.map((accommodation) => (
          <div key={accommodation.id} className="col-md-6 mb-4">
            {" "}
            {/* Adjust column width */}
            <AccommodationCard accommodation={accommodation} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AccommodationList;
