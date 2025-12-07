import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import WardrobePage from './pages/WardrobePage';
import CreateOutfitPage from './pages/CreateOutfitPage';
import OutfitsPage from './pages/OutfitsPage';

const API_URL = 'http://localhost:8000';
const CATEGORIES = [
  { id: 'tops', name: 'Tops' },
  { id: 'bottoms', name: 'Bottoms' },
  { id: 'dresses', name: 'Dresses' },
  { id: 'shoes', name: 'Shoes' },
  { id: 'bags', name: 'Bags' },
  { id: 'accessories', name: 'Accessories' },
];

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
      const res = await fetch(`${API_URL}/api/items`);
      if (res.ok) setWardrobeItems(await res.json());
    } catch (err) {
      console.error(err);
    }
  };

  const fetchOutfits = async () => {
    try {
      const res = await fetch(`${API_URL}/api/outfits`);
      if (res.ok) setOutfits(await res.json());
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddItem = async (category, imageFile) => {
  const formData = new FormData();
  formData.append('category_id', category); // matches FastAPI
  formData.append('image', imageFile);      // matches FastAPI

  try {
    setLoading(true);
    const response = await fetch(`${API_URL}/items/`, {
      method: 'POST',
      body: formData
    });

    if (response.ok) {
      await fetchWardrobeItems();
    } else {
      const err = await response.json();
      console.error('Add item failed', err);
    }
  } catch (error) {
    console.error('Error adding item:', error);
  } finally {
    setLoading(false);
  }
};


  const handleCreateOutfit = async (name, items, image) => {
    if (!name || items.length === 0) return alert('Provide name and select items');
    const formData = new FormData();
    formData.append('name', name);
    formData.append('items', JSON.stringify(items));
    if (image) formData.append('image', image);

    try {
      setLoading(true);
      const res = await fetch(`${API_URL}/api/outfits`, { method: 'POST', body: formData });
      if (res.ok) {
        fetchOutfits();
        setView('outfits');
      }
    } catch (err) {
      console.error(err);
      alert('Failed to create outfit.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Header view={view} setView={setView} />
      <main>
        {view === 'wardrobe' && <WardrobePage wardrobeItems={wardrobeItems} onAddItem={handleAddItem} loading={loading} CATEGORIES={CATEGORIES} />}
        {view === 'create' && <CreateOutfitPage wardrobeItems={wardrobeItems} onCreateOutfit={handleCreateOutfit} loading={loading} CATEGORIES={CATEGORIES} />}
        {view === 'outfits' && <OutfitsPage outfits={outfits} wardrobeItems={wardrobeItems} setView={setView} CATEGORIES={CATEGORIES} />}
      </main>
    </div>
  );
}
