import React, { useState, useEffect } from 'react';
import OutfitCard from '../components/OutfitCard';
import './OutfitsPage.css';

function OutfitsPage() {
  const [outfits, setOutfits] = useState([]);
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const [outfitsRes, itemsRes] = await Promise.all([
        fetch('http://localhost:8000/outfits/'),
        fetch('http://localhost:8000/items/')
      ]);
      
      const outfitsData = await outfitsRes.json();
      const itemsData = await itemsRes.json();
      
      // Enrich outfits with item details
      const enrichedOutfits = outfitsData.map(outfit => ({
        ...outfit,
        itemDetails: outfit.items.map(itemId => 
          itemsData.find(item => item.id === itemId)
        ).filter(Boolean)
      }));
      
      setOutfits(enrichedOutfits);
      setItems(itemsData);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOutfitDeleted = (outfitId) => {
    setOutfits(outfits.filter(outfit => outfit.id !== outfitId));
  };

  return (
    <div className="outfits-page">
      <div className="page-header">
        <h1 className="page-title">My Outfits</h1>
        <p className="page-description">
          View and manage your saved outfit combinations
        </p>
      </div>

      {isLoading ? (
        <div className="loading-message">Loading your outfits...</div>
      ) : outfits.length === 0 ? (
        <div className="empty-state">
          <h2 className="empty-title">No outfits yet</h2>
          <p className="empty-text">
            Create your first outfit by combining items from your wardrobe!
          </p>
        </div>
      ) : (
        <div className="outfits-grid">
          {outfits.map((outfit) => (
            <OutfitCard
              key={outfit.id}
              outfit={outfit}
              onDelete={handleOutfitDeleted}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default OutfitsPage;