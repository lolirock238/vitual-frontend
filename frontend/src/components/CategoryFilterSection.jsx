import React from 'react';
import './CategoryFilterSection.css';

function CategoryFilterSection({ categories, selectedCategory, onCategorySelect }) {
  return (
    <div className="category-filter-section">
      <h3 className="filter-title">Filter by Category</h3>
      <div className="category-buttons">
        <button
          className={`category-button ${selectedCategory === 'all' ? 'active' : ''}`}
          onClick={() => onCategorySelect('all')}
        >
          All Items
        </button>
        {categories.map((category) => (
          <button
            key={category.id}
            className={`category-button ${selectedCategory === category.id ? 'active' : ''}`}
            onClick={() => onCategorySelect(category.id)}
          >
            {category.name}
          </button>
        ))}
      </div>
    </div>
  );
}

export default CategoryFilterSection;