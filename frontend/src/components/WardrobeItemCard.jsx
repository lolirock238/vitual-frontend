import React from 'react';
import './WardrobeItemCard.css';

function WardrobeItemCard({ item, onDelete, selectable, selected, onSelect }) {
  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      try {
        const response = await fetch(`http://localhost:8000/items/${item.id}`, {
          method: 'DELETE',
        });
        if (response.ok && onDelete) {
          onDelete(item.id);
        }
      } catch (error) {
        console.error('Error deleting item:', error);
      }
    }
  };

  const handleCardClick = () => {
    if (selectable && onSelect) {
      onSelect(item);
    }
  };

  return (
    <div
      className={`wardrobe-item-card ${selectable ? 'selectable' : ''} ${selected ? 'selected' : ''}`}
      onClick={handleCardClick}
    >
      <div className="item-image-container">
        <img
          src={`http://localhost:8000${item.image_url}`}
          alt="Wardrobe item"
          className="item-image"
        />
      </div>
      
      {!selectable && (
        <button className="delete-button" onClick={handleDelete}>
          Delete
        </button>
      )}
      
      {selected && <div className="selected-indicator">Selected</div>}
    </div>
  );
}

export default WardrobeItemCard;