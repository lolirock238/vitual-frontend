import React, { useState } from 'react';
import WardrobeItemCard from '../components/WardrobeItemCard';
import './CreateOutfitPage.css';

export default function CreateOutfitPage({ wardrobeItems, onCreateOutfit, loading, CATEGORIES }) {
  const [selectedItems, setSelectedItems] = useState([]);
  const [outfitName, setOutfitName] = useState('');
  const [outfitImage, setOutfitImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const toggleItemSelection = (itemId) => {
    setSelectedItems((prev) =>
      prev.includes(itemId) ? prev.filter((id) => id !== itemId) : [...prev, itemId]
    );
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setOutfitImage(file);
      const reader = new FileReader();
      reader.onloadend = () => setPreviewUrl(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleCreate = () => {
    onCreateOutfit(outfitName, selectedItems, outfitImage);
    setSelectedItems([]);
    setOutfitName('');
    setOutfitImage(null);
    setPreviewUrl(null);
  };

  return (
    <div className="create-outfit-page">
      <div className="create-outfit-form">
        <input
          type="text"
          placeholder="Outfit name..."
          value={outfitName}
          onChange={(e) => setOutfitName(e.target.value)}
        />
        <label>
          <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
          <div className="file-label">
            {previewUrl ? (
              <img src={previewUrl} alt="Preview" />
            ) : (
              'Add outfit image (optional)'
            )}
          </div>
        </label>
        <button onClick={handleCreate} disabled={loading || selectedItems.length === 0 || !outfitName}>
          {loading ? 'Saving...' : 'Save Outfit'}
        </button>
      </div>
      <div className="create-outfit-grid">
        {wardrobeItems.map((item) => (
          <WardrobeItemCard
            key={item.id}
            item={item}
            CATEGORIES={CATEGORIES}
            onSelect={() => toggleItemSelection(item.id)}
            isSelected={selectedItems.includes(item.id)}
          />
        ))}
      </div>
    </div>
  );
}
