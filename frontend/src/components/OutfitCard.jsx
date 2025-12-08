import React from 'react';
import './OutfitCard.css';

function OutfitCard({ outfit, onDelete }) {
  const handleDelete = async () => {
    if (window.confirm(`Are you sure you want to delete "${outfit.name}"?`)) {
      try {
        const response = await fetch(`http://localhost:8000/outfits/${outfit.id}`, {
          method: 'DELETE',
        });
        if (response.ok && onDelete) {
          onDelete(outfit.id);
        }
      } catch (error) {
        console.error('Error deleting outfit:', error);
      }
    }
  };

  return (
    <div className="outfit-card">
      <div className="outfit-header">
        <h3 className="outfit-name">{outfit.name}</h3>
        <span className="outfit-count">{outfit.items.length} items</span>
      </div>

      {outfit.image_url && (
        <div className="outfit-image-container">
          <img
            src={`http://localhost:8000${outfit.image_url}`}
            alt={outfit.name}
            className="outfit-image"
          />
        </div>
      )}

      <div className="outfit-items-preview">
        {outfit.itemDetails && outfit.itemDetails.slice(0, 3).map((item) => (
          <div key={item.id} className="outfit-item-thumbnail">
            <img
              src={`http://localhost:8000${item.image_url}`}
              alt="Item"
              className="thumbnail-image"
            />
          </div>
        ))}
        {outfit.items.length > 3 && (
          <div className="more-items">+{outfit.items.length - 3}</div>
        )}
      </div>

      <button className="delete-outfit-button" onClick={handleDelete}>
        Delete Outfit
      </button>
    </div>
  );
}

export default OutfitCard;