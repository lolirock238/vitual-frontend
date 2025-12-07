import React, { useState } from 'react';
import WardrobeItemCard from '../components/WardrobeItemCard';
import CategoryFilter from '../components/CategoryFilter';
import AddItemSection from '../components/AddItemSection';
import './WardrobePage.css';

export default function WardrobePage({ wardrobeItems, onAddItem, loading, CATEGORIES }) {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredItems =
    selectedCategory === 'all'
      ? wardrobeItems
      : wardrobeItems.filter((item) => item.category === selectedCategory);

  return (
    <div className="wardrobe-page">
      <CategoryFilter
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        CATEGORIES={CATEGORIES}
      />
      <AddItemSection onAddItem={onAddItem} loading={loading} CATEGORIES={CATEGORIES} />
      <div className="wardrobe-grid">
        {filteredItems.map((item) => (
          <WardrobeItemCard key={item.id} item={item} CATEGORIES={CATEGORIES} />
        ))}
      </div>
    </div>
  );
}
