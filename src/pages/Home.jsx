import React from "react";
import AccommodationCard from "../components/AccommodationCard";
import accommodations from "../data/accommodations";

const Home = () => {
  return (
    <div className="home">
      <div className="container">
        <h2>Our Accommodations</h2>
        <div className="accommodation-list">
          {accommodations.map((accommodation) => (
            <AccommodationCard
              key={accommodation.id}
              accommodation={accommodation}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
