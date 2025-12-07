// App.js - Complete Virtual Wardrobe Application
// Copy this ENTIRE file into your App.js

import React, { useState, useEffect } from 'react';

// ============================================
// CONFIGURATION & CONSTANTS
// ============================================

const API_URL = 'http://localhost:5000';

const CATEGORIES = [
  { id: 'tops', name: 'Tops', icon: '👚' },
  { id: 'bottoms', name: 'Bottoms', icon: '👖' },
  { id: 'dresses', name: 'Dresses', icon: '👗' },
  { id: 'shoes', name: 'Shoes', icon: '👠' },
  { id: 'bags', name: 'Bags', icon: '👜' },
  { id: 'accessories', name: 'Accessories', icon: '💍' }
];

// ============================================
// COMPONENTS
// ============================================

// Header Component
function Header({ view, setView }) {
  return (
    <header className="bg-white/80 backdrop-blur-sm border-b-4 border-pink-200 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent flex items-center gap-2">
            ✨ My Wardrobe
          </h1>
          <div className="flex gap-2">
            <button
              onClick={() => setView('wardrobe')}
              className={`px-6 py-2 rounded-full font-semibold transition-all ${
                view === 'wardrobe'
                  ? 'bg-gradient-to-r from-pink-400 to-purple-400 text-white shadow-lg scale-105'
                  : 'bg-white text-gray-600 hover:bg-pink-50'
              }`}
            >
              👗 Wardrobe
            </button>
            <button
              onClick={() => setView('create')}
              className={`px-6 py-2 rounded-full font-semibold transition-all ${
                view === 'create'
                  ? 'bg-gradient-to-r from-pink-400 to-purple-400 text-white shadow-lg scale-105'
                  : 'bg-white text-gray-600 hover:bg-pink-50'
              }`}
            >
              ✨ Create Outfit
            </button>
            <button
              onClick={() => setView('outfits')}
              className={`px-6 py-2 rounded-full font-semibold transition-all ${
                view === 'outfits'
                  ? 'bg-gradient-to-r from-pink-400 to-purple-400 text-white shadow-lg scale-105'
                  : 'bg-white text-gray-600 hover:bg-pink-50'
              }`}
            >
              🛍️ My Outfits
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

// Category Filter Component
function CategoryFilter({ selectedCategory, setSelectedCategory }) {
  return (
    <div className="mb-6 flex gap-2 flex-wrap">
      <button
        onClick={() => setSelectedCategory('all')}
        className={`px-4 py-2 rounded-full font-medium transition-all ${
          selectedCategory === 'all'
            ? 'bg-gradient-to-r from-pink-400 to-purple-400 text-white shadow-lg'
            : 'bg-white text-gray-600 hover:bg-pink-50'
        }`}
      >
        All Items
      </button>
      {CATEGORIES.map(cat => (
        <button
          key={cat.id}
          onClick={() => setSelectedCategory(cat.id)}
          className={`px-4 py-2 rounded-full font-medium transition-all ${
            selectedCategory === cat.id
              ? 'bg-gradient-to-r from-pink-400 to-purple-400 text-white shadow-lg'
              : 'bg-white text-gray-600 hover:bg-pink-50'
          }`}
        >
          {cat.icon} {cat.name}
        </button>
      ))}
    </div>
  );
}

// Add Item Section Component
function AddItemSection({ onAddItem, loading }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [selectedCat, setSelectedCat] = useState('');

  const handleFileChange = (e, category) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setSelectedCat(category);
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = () => {
    if (selectedFile && selectedCat) {
      onAddItem(selectedCat, selectedFile);
      setSelectedFile(null);
      setPreviewUrl(null);
      setSelectedCat('');
    }
  };

  return (
    <div className="mb-8 bg-white rounded-3xl p-6 shadow-xl border-2 border-pink-200">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
        ➕ Add New Item
      </h2>
      
      {previewUrl && (
        <div className="mb-4 p-4 bg-pink-50 rounded-2xl">
          <div className="flex gap-4 items-center">
            <img src={previewUrl} alt="Preview" className="w-32 h-32 object-cover rounded-xl" />
            <div className="flex-1">
              <p className="font-semibold text-gray-700 mb-2">
                {CATEGORIES.find(c => c.id === selectedCat)?.icon} {CATEGORIES.find(c => c.id === selectedCat)?.name}
              </p>
              <p className="text-sm text-gray-600 mb-3">{selectedFile?.name}</p>
              <button
                onClick={handleUpload}
                disabled={loading}
                className="bg-gradient-to-r from-pink-400 to-purple-400 text-white px-6 py-2 rounded-full font-semibold hover:shadow-lg transition-all disabled:opacity-50"
              >
                {loading ? 'Uploading...' : '⬆️ Upload Item'}
              </button>
            </div>
          </div>
        </div>
      )}
      
      <div className="flex gap-4 flex-wrap">
        {CATEGORIES.map(cat => (
          <label key={cat.id} className="cursor-pointer">
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => handleFileChange(e, cat.id)}
            />
            <div className="bg-gradient-to-br from-pink-100 to-purple-100 hover:from-pink-200 hover:to-purple-200 p-4 rounded-2xl transition-all hover:scale-105 shadow-md">
              <div className="text-4xl mb-2">{cat.icon}</div>
              <div className="text-sm font-semibold text-gray-700">{cat.name}</div>
            </div>
          </label>
        ))}
      </div>
      
      <div className="mt-4 p-4 bg-purple-50 rounded-xl">
        <div className="flex items-start gap-2">
          <span className="text-2xl">📸</span>
          <div className="text-sm text-gray-700">
            <p className="font-semibold mb-1">How to add your images:</p>
            <ol className="list-decimal list-inside space-y-1">
              <li>Click on a category button above</li>
              <li>Select an image from your device</li>
              <li>Preview will appear - click "Upload Item"</li>
              <li>Your image will be saved to your wardrobe!</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}

// Wardrobe Item Card Component
function WardrobeItemCard({ item, onSelect, isSelected }) {
  return (
    <div
      onClick={onSelect}
      className={`cursor-pointer bg-white rounded-2xl overflow-hidden shadow-lg transition-all hover:scale-105 border-4 ${
        isSelected ? 'border-pink-400 shadow-2xl' : 'border-transparent hover:border-pink-200'
      }`}
    >
      <div className="aspect-square bg-gradient-to-br from-pink-50 to-purple-50 flex items-center justify-center relative">
        {item.image_url ? (
          <img
            src={`${API_URL}${item.image_url}`}
            alt={item.category}
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="text-6xl">🖼️</span>
        )}
        {isSelected && (
          <div className="absolute top-2 right-2 bg-pink-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">
            ✓
          </div>
        )}
      </div>
      <div className="p-3">
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold text-gray-700">
            {CATEGORIES.find(c => c.id === item.category)?.icon} {item.category}
          </span>
          <span className="text-xl">💖</span>
        </div>
      </div>
    </div>
  );
}

// Outfit Card Component
function OutfitCard({ outfit, wardrobeItems }) {
  return (
    <div className="bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all hover:scale-105 border-2 border-pink-200">
      <div className="aspect-square bg-gradient-to-br from-pink-50 to-purple-50 flex items-center justify-center">
        {outfit.image_url ? (
          <img
            src={`${API_URL}${outfit.image_url}`}
            alt={outfit.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="text-6xl">✨</div>
        )}
      </div>
      <div className="p-4">
        <h3 className="text-xl font-bold text-gray-800 mb-2">{outfit.name}</h3>
        <div className="flex gap-2 flex-wrap">
          {outfit.items && outfit.items.map((itemId, idx) => {
            const item = wardrobeItems.find(i => i.id === itemId);
            return (
              <span key={idx} className="text-2xl">
                {CATEGORIES.find(c => c.id === item?.category)?.icon}
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// Wardrobe Page Component
function WardrobePage({ wardrobeItems, onAddItem, loading }) {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredItems = selectedCategory === 'all'
    ? wardrobeItems
    : wardrobeItems.filter(item => item.category === selectedCategory);

  return (
    <div>
      <CategoryFilter
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      <AddItemSection onAddItem={onAddItem} loading={loading} />
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredItems.map((item) => (
          <WardrobeItemCard
            key={item.id}
            item={item}
            onSelect={() => {}}
          />
        ))}
      </div>
    </div>
  );
}

// Create Outfit Page Component
function CreateOutfitPage({ wardrobeItems, onCreateOutfit, loading }) {
  const [selectedItems, setSelectedItems] = useState([]);
  const [outfitName, setOutfitName] = useState('');
  const [outfitImage, setOutfitImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const toggleItemSelection = (itemId) => {
    setSelectedItems(prev =>
      prev.includes(itemId)
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setOutfitImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
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
    <div>
      <div className="bg-white rounded-3xl p-6 shadow-xl border-2 border-pink-200 mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          ✨ Create New Outfit
        </h2>
        <input
          type="text"
          placeholder="Outfit name..."
          value={outfitName}
          onChange={(e) => setOutfitName(e.target.value)}
          className="w-full px-4 py-3 rounded-xl border-2 border-pink-200 focus:border-pink-400 focus:outline-none mb-4"
        />
        <label className="block">
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageChange}
          />
          <div className="bg-gradient-to-br from-pink-100 to-purple-100 hover:from-pink-200 hover:to-purple-200 p-6 rounded-2xl transition-all cursor-pointer text-center">
            {previewUrl ? (
              <img src={previewUrl} alt="Outfit preview" className="w-full h-48 object-cover rounded-xl mb-2" />
            ) : (
              <span className="text-6xl block mb-2">📸</span>
            )}
            <div className="text-sm font-semibold text-gray-700">
              {outfitImage ? outfitImage.name : 'Add outfit photo (optional)'}
            </div>
          </div>
        </label>
      </div>

      <div className="bg-white rounded-3xl p-6 shadow-xl border-2 border-pink-200 mb-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Selected Items ({selectedItems.length})</h3>
        <div className="flex gap-2 flex-wrap mb-4">
          {selectedItems.map(id => {
            const item = wardrobeItems.find(i => i.id === id);
            return (
              <div key={id} className="bg-pink-100 px-3 py-1 rounded-full text-sm font-medium flex items-center gap-2">
                {CATEGORIES.find(c => c.id === item?.category)?.icon}
                <button onClick={() => toggleItemSelection(id)}>
                  ❌
                </button>
              </div>
            );
          })}
        </div>
        <button
          onClick={handleCreate}
          disabled={loading || selectedItems.length === 0 || !outfitName}
          className="w-full bg-gradient-to-r from-pink-400 to-purple-400 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          💾 {loading ? 'Saving...' : 'Save Outfit'}
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {wardrobeItems.map((item) => (
          <WardrobeItemCard
            key={item.id}
            item={item}
            onSelect={() => toggleItemSelection(item.id)}
            isSelected={selectedItems.includes(item.id)}
          />
        ))}
      </div>
    </div>
  );
}

// Outfits Page Component
function OutfitsPage({ outfits, wardrobeItems, setView }) {
  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-2">
        🛍️ My Saved Outfits
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {outfits.map((outfit) => (
          <OutfitCard
            key={outfit.id}
            outfit={outfit}
            wardrobeItems={wardrobeItems}
          />
        ))}
      </div>
      {outfits.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg mb-4">No outfits created yet!</p>
          <button
            onClick={() => setView('create')}
            className="bg-gradient-to-r from-pink-400 to-purple-400 text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg transition-all"
          >
            Create Your First Outfit
          </button>
        </div>
      )}
    </div>
  );
}

// ============================================
// MAIN APP COMPONENT
// ============================================

export default function App() {
  const [view, setView] = useState('wardrobe');
  const [wardrobeItems, setWardrobeItems] = useState([]);
  const [outfits, setOutfits] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchWardrobeItems();
    fetchOutfits();
  }, []);

  const fetchWardrobeItems = async () => {
    try {
      const response = await fetch(`${API_URL}/api/items`);
      if (response.ok) {
        const data = await response.json();
        setWardrobeItems(data);
      }
    } catch (error) {
      console.error('Error fetching wardrobe items:', error);
    }
  };

  const fetchOutfits = async () => {
    try {
      const response = await fetch(`${API_URL}/api/outfits`);
      if (response.ok) {
        const data = await response.json();
        setOutfits(data);
      }
    } catch (error) {
      console.error('Error fetching outfits:', error);
    }
  };

  const handleAddItem = async (category, imageFile) => {
    const formData = new FormData();
    formData.append('category', category);
    formData.append('image', imageFile);

    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/api/items`, {
        method: 'POST',
        body: formData
      });
      
      if (response.ok) {
        await fetchWardrobeItems();
      }
    } catch (error) {
      console.error('Error adding item:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateOutfit = async (name, items, image) => {
    if (items.length === 0 || !name) {
      alert('Please select items and enter an outfit name!');
      return;
    }

    const formData = new FormData();
    formData.append('name', name);
    formData.append('items', JSON.stringify(items));
    if (image) {
      formData.append('image', image);
    }

    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/api/outfits`, {
        method: 'POST',
        body: formData
      });
      
      if (response.ok) {
        await fetchOutfits();
        setView('outfits');
      }
    } catch (error) {
      console.error('Error creating outfit:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-pink-100">
      <Header view={view} setView={setView} />
      <main className="max-w-7xl mx-auto px-4 py-8">
        {view === 'wardrobe' && (
          <WardrobePage
            wardrobeItems={wardrobeItems}
            onAddItem={handleAddItem}
            loading={loading}
          />
        )}
        {view === 'create' && (
          <CreateOutfitPage
            wardrobeItems={wardrobeItems}
            onCreateOutfit={handleCreateOutfit}
            loading={loading}
          />
        )}
        {view === 'outfits' && (
          <OutfitsPage
            outfits={outfits}
            wardrobeItems={wardrobeItems}
            setView={setView}
          />
        )}
      </main>
    </div>
  );
}