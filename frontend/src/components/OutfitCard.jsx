import React from 'react';
import './OutfitCard.css';

const API_URL = 'http://localhost:8000';

export default function OutfitCard({ outfit, wardrobeItems, CATEGORIES }) {
  return (
    <div className="outfit-card">
      <div className="outfit-image">
        {outfit.image_url ? (
          <img src={`${API_URL}${outfit.image_url}`} alt={outfit.name} />
        ) : (
          <span>No Image</span>
        )}
      </div>
      <div className="outfit-info">
        <h3>{outfit.name}</h3>
        <div className="outfit-items">
          {outfit.items &&
            outfit.items.map((itemId) => {
              const item = wardrobeItems.find((i) => i.id === itemId);
              return (
                <span key={itemId}>
                  {CATEGORIES.find((c) => c.id === item?.category)?.name}
                </span>
              );
            })}
        </div>
      </div>
    </div>
  );
}
