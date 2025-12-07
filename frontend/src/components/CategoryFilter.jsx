import React from 'react';
import './CategoryFilter.css';

export default function CategoryFilter({ selectedCategory, setSelectedCategory, CATEGORIES }) {
  return (
    <div className="category-filter">
      <button
        onClick={() => setSelectedCategory('all')}
        className={selectedCategory === 'all' ? 'active' : ''}
      >
        All Items
      </button>
      {CATEGORIES.map(cat => (
        <button
          key={cat.id}
          onClick={() => setSelectedCategory(cat.id)}
          className={selectedCategory === cat.id ? 'active' : ''}
        >
          {cat.name}
        </button>
      ))}
    </div>
  );
}
