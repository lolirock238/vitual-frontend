// src/pages/SavedOutfitsPage.jsx
import React, { useEffect, useState } from "react";
import { fetchOutfits, fetchOutfitItems, fetchItemImages } from "../api";
import OutfitCard from "../components/OutfitCard";

export default function SavedOutfitsPage() {
  const [outfits, setOutfits] = useState([]);
  const [images, setImages] = useState([]);
  const [associations, setAssociations] = useState([]);

  useEffect(() => {
    fetchOutfits().then(setOutfits);
    fetchOutfitItems().then(setAssociations);
    fetchItemImages().then(setImages);
  }, []);

  // Attach items with images to each outfit
  const outfitsWithItems = outfits.map(outfit => ({
    ...outfit,
    items: associations
      .filter(a => a.outfit_id === outfit.id)
      .map(a => images.find(img => img.item_id === a.item_id))
  }));

  return (
    <div>
      <h1>Saved Outfits</h1>
      <div className="outfit-grid">
        {outfitsWithItems.map(outfit => <OutfitCard key={outfit.id} outfit={outfit} />)}
      </div>
    </div>
  );
}
