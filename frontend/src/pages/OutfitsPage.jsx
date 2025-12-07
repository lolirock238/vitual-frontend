import React from 'react';
import OutfitCard from '../components/OutfitCard';
import './OutfitsPage.css';

export default function OutfitsPage({ outfits, wardrobeItems, setView, CATEGORIES }) {
  return (
    <div className="outfits-page">
      <h2>My Saved Outfits</h2>
      <div className="outfits-grid">
        {outfits.map((outfit) => (
          <OutfitCard key={outfit.id} outfit={outfit} wardrobeItems={wardrobeItems} CATEGORIES={CATEGORIES} />
        ))}
      </div>
      {outfits.length === 0 && (
        <div className="no-outfits">
          <p>No outfits created yet!</p>
          <button onClick={() => setView('create')}>Create Your First Outfit</button>
        </div>
      )}
    </div>
  );
}
