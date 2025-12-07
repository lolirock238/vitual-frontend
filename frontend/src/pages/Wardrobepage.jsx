// src/pages/WardrobePage.jsx
import React, { useState, useEffect } from "react";
import { fetchItems, fetchItemImages } from "../api";
import ItemCard from "../components/ItemCard";
import AvatarPreview from "../components/AvatarPreview";

export default function WardrobePage() {
  const [items, setItems] = useState([]);
  const [images, setImages] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);

  useEffect(() => {
    fetchItems().then(setItems);
    fetchItemImages().then(setImages);
  }, []);

  const handleSelect = (item) => setSelectedItems(prev => [...prev, images.find(img => img.item_id === item.id) || item]);

  return (
    <div>
      <h1>My Wardrobe</h1>
      <AvatarPreview outfitItems={selectedItems} />
      <div className="item-grid">
        {items.map(item => (
          <ItemCard key={item.id} item={images.find(img => img.item_id === item.id) || item} onSelect={handleSelect}/>
        ))}
      </div>
    </div>
  );
}
