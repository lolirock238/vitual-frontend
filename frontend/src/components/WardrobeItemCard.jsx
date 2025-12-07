 import React from 'react';
import './WardrobeItemCard.css';

const API_URL = 'http://localhost:8000';

export default function WardrobeItemCard({ item, onSelect, isSelected, CATEGORIES }) {
  return (
    <div
      className={`wardrobe-item-card ${isSelected ? 'selected' : ''}`}
      onClick={onSelect}
    >
      <div className="wardrobe-image">
        {item.image_url ? (
          <img src={`${API_URL}${item.image_url}`} alt={item.category} />
        ) : (
          <span>No Image</span>
        )}
      </div>
      <div className="wardrobe-info">
        <span>{CATEGORIES.find(c => c.id === item.category)?.name}</span>
      </div>
    </div>
  );
}
