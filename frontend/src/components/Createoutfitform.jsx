import { useState, useEffect } from "react";
import { fetchItems, fetchOutfits, createOutfit, addItemToOutfit } from "../api";
import "./CreateOutfitForm.css";

export default function CreateOutfitForm({ onOutfitCreated }) {
  const [name, setName] = useState("");
  const [occasion, setOccasion] = useState("");
  const [items, setItems] = useState([]);
  const [selectedItemIds, setSelectedItemIds] = useState([]);

  useEffect(() => {
    fetchItems().then(setItems);
  }, []);

  const toggleItem = (id) => {
    setSelectedItemIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || selectedItemIds.length === 0) return;

    const outfit = await createOutfit(name, occasion);

    // Add selected items to the outfit
    for (let itemId of selectedItemIds) {
      await addItemToOutfit(outfit.id, itemId);
    }

    setName("");
    setOccasion("");
    setSelectedItemIds([]);
    onOutfitCreated && onOutfitCreated();
  };

  return (
    <form className="create-outfit-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Outfit name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Occasion (optional)"
        value={occasion}
        onChange={(e) => setOccasion(e.target.value)}
      />

      <div className="item-selection">
        {items.map((item) => (
          <div
            key={item.id}
            className={`item-card ${selectedItemIds.includes(item.id) ? "selected" : ""}`}
            onClick={() => toggleItem(item.id)}
          >
            {item.name}
          </div>
        ))}
      </div>

      <button type="submit">Create Outfit</button>
    </form>
  );
}
