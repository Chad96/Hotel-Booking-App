import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Carousel } from "react-bootstrap"; // Using Bootstrap's Carousel component
import "bootstrap/dist/css/bootstrap.min.css"; // Make sure to import Bootstrap's CSS

// Accommodations data
const accommodations = [
  {
    id: 1,
    name: "Ocean View Room",
    shortDescription: "A room with a view of the ocean.",
    images: ["/assets/hotels.jpg", "/assets/hot.jpg", "/assets/hotel.jpg"],
  },
  {
    id: 2,
    name: "Garden View Room",
    shortDescription: "A room with a view of the garden.",
    images: ["/assets/garden1.jpg", "/assets/garden2.jpg", "/assets/garden3.jpg"],
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
    <div className="accommodation-card">
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
              style={{ borderRadius: "10px", height: "250px", objectFit: "cover" }}
            />
          </Carousel.Item>
        ))}
      </Carousel>
      <h3>{accommodation.name}</h3>
      <p>{accommodation.shortDescription}</p>
      <Link to={`/accommodation/${accommodation.id}`} className="btn btn-primary">
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
            <AccommodationCard accommodation={accommodation} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AccommodationList;
