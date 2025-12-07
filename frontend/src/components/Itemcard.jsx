// src/components/ItemCard.jsx
import React from "react";
import "./ItemCard.css";

export default function ItemCard({ item, onSelect }) {
  return (
    <div className="item-card fade-in" onClick={() => onSelect(item)}>
      {item.image_url ? <img src={item.image_url} alt={item.name} /> : <div className="placeholder">No Image</div>}
      <p>{item.name}</p>
    </div>
  );
}
