// src/components/OutfitCard.jsx
import React from "react";
import "./OutfitCard.css";

export default function OutfitCard({ outfit }) {
  return (
    <div className="outfit-card fade-in">
      <h4>{outfit.name}</h4>
      {outfit.items?.map(item => (
        <img key={item.id} src={item.image_url} alt={item.name} />
      ))}
    </div>
  );
}
