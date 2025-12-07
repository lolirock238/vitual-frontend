// src/pages/OutfitPage.jsx
import React, { useEffect, useState } from "react";
import { fetchOutfits, fetchItems, addItemToOutfit, createOutfit } from "../api";
import OutfitCard from "../components/OutfitCard";
import CreateOutfitForm from "../components/CreateOutfitForm";

const OutfitPage = () => {
  const [outfits, setOutfits] = useState([]);
  const [items, setItems] = useState([]);

  // Fetch outfits and items on mount
  useEffect(() => {
    fetchOutfits().then(setOutfits);
    fetchItems().then(setItems);
  }, []);

  const handleCreateOutfit = async (name, occasion, selectedItemIds) => {
    const newOutfit = await createOutfit(name, occasion);
    for (const itemId of selectedItemIds) {
      await addItemToOutfit(newOutfit.id, itemId);
    }
    const updatedOutfits = await fetchOutfits();
    setOutfits(updatedOutfits);
  };

  return (
    <div className="outfit-page">
      <h1>Your Outfits</h1>
      <CreateOutfitForm items={items} onSubmit={handleCreateOutfit} />
      <div className="outfit-list">
        {outfits.map((outfit) => (
          <OutfitCard key={outfit.id} outfit={outfit} />
        ))}
      </div>
    </div>
  );
};

export default OutfitPage;
