import React, { useState, useEffect } from 'react';
import CategoryFilterSection from '../components/CategoryFilterSection';
import WardrobeItemCard from '../components/WardrobeItemCard';
import './CreateOutfitPage.css';

function CreateOutfitPage() {
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedItems, setSelectedItems] = useState([]);
  const [outfitName, setOutfitName] = useState('');
  const [outfitImage, setOutfitImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [itemsRes, categoriesRes] = await Promise.all([
        fetch('http://localhost:8000/items/'),
        fetch('http://localhost:8000/categories/')
      ]);
      
      const itemsData = await itemsRes.json();
      const categoriesData = await categoriesRes.json();
      
      setItems(itemsData);
      setCategories(categoriesData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleItemSelect = (item) => {
    setSelectedItems(prev => {
      const isSelected = prev.find(i => i.id === item.id);
      if (isSelected) {
        return prev.filter(i => i.id !== item.id);
      } else {
        return [...prev, item];
      }
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setOutfitImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleCreateOutfit = async (e) => {
    e.preventDefault();
    
    if (!outfitName.trim()) {
      alert('Please enter an outfit name');
      return;
    }
    
    if (selectedItems.length === 0) {
      alert('Please select at least one item');
      return;
    }

    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append('name', outfitName);
      formData.append('items', JSON.stringify(selectedItems.map(item => item.id)));
      
      if (outfitImage) {
        formData.append('image', outfitImage);
      }

      const response = await fetch('http://localhost:8000/outfits/', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        alert('Outfit created successfully!');
        setOutfitName('');
        setSelectedItems([]);
        setOutfitImage(null);
        setPreviewUrl('');
      }
    } catch (error) {
      console.error('Error creating outfit:', error);
      alert('Failed to create outfit');
    } finally {
      setIsLoading(false);
    }
  };

  const filteredItems = selectedCategory === 'all'
    ? items
    : items.filter(item => item.category_id === selectedCategory);

  return (
    <div className="create-outfit-page">
      <div className="page-header">
        <h1 className="page-title">Create New Outfit</h1>
        <p className="page-description">
          Select items from your wardrobe to create an outfit
        </p>
      </div>

      <div className="outfit-form-section">
        <form onSubmit={handleCreateOutfit} className="outfit-form">
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Outfit Name</label>
              <input
                type="text"
                value={outfitName}
                onChange={(e) => setOutfitName(e.target.value)}
                placeholder="e.g., Summer Casual, Office Look"
                className="outfit-name-input"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Outfit Photo (Optional)</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="outfit-image-input"
              />
            </div>
          </div>

          {previewUrl && (
            <div className="preview-container">
              <img src={previewUrl} alt="Outfit preview" className="outfit-preview" />
            </div>
          )}

          <div className="selected-items-section">
            <h3 className="selected-title">
              Selected Items ({selectedItems.length})
            </h3>
            {selectedItems.length > 0 ? (
              <div className="selected-items-list">
                {selectedItems.map(item => (
                  <div key={item.id} className="selected-item-mini">
                    <img
                      src={`http://localhost:8000${item.image_url}`}
                      alt="Selected item"
                      className="mini-image"
                    />
                    <button
                      type="button"
                      className="remove-item-button"
                      onClick={() => handleItemSelect(item)}
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="no-items-message">No items selected yet</p>
            )}
          </div>

          <button 
            type="submit" 
            className="create-outfit-button"
            disabled={isLoading || selectedItems.length === 0}
          >
            {isLoading ? 'Creating...' : 'Create Outfit'}
          </button>
        </form>
      </div>

      <CategoryFilterSection
        categories={categories}
        selectedCategory={selectedCategory}
        onCategorySelect={setSelectedCategory}
      />

      <div className="items-selection-section">
        <h2 className="section-title">Select Items</h2>
        {filteredItems.length === 0 ? (
          <div className="empty-message">
            No items available. Add items to your wardrobe first!
          </div>
        ) : (
          <div className="items-grid">
            {filteredItems.map((item) => (
              <WardrobeItemCard
                key={item.id}
                item={item}
                selectable={true}
                selected={!!selectedItems.find(i => i.id === item.id)}
                onSelect={handleItemSelect}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default CreateOutfitPage;