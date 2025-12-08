import React, { useState, useEffect } from 'react';
import AddItemSection from '../components/AddItemSection';
import CategoryFilterSection from '../components/CategoryFilterSection';
import WardrobeItemCard from '../components/WardrobeItemCard';
import './WardrobePage.css';

function WardrobePage() {
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
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
    } finally {
      setIsLoading(false);
    }
  };

  const handleItemAdded = () => {
    fetchData();
  };

  const handleItemDeleted = (itemId) => {
    setItems(items.filter(item => item.id !== itemId));
  };

  const filteredItems = selectedCategory === 'all'
    ? items
    : items.filter(item => item.category_id === selectedCategory);

  return (
    <div className="wardrobe-page">
      <AddItemSection onItemAdded={handleItemAdded} />
      
      <CategoryFilterSection
        categories={categories}
        selectedCategory={selectedCategory}
        onCategorySelect={setSelectedCategory}
      />

      <div className="items-section">
        <h2 className="items-title">
          {selectedCategory === 'all' ? 'All Items' : categories.find(c => c.id === selectedCategory)?.name}
          <span className="items-count">({filteredItems.length})</span>
        </h2>

        {isLoading ? (
          <div className="loading-message">Loading your wardrobe...</div>
        ) : filteredItems.length === 0 ? (
          <div className="empty-message">
            No items yet. Add your first clothing item above!
          </div>
        ) : (
          <div className="items-grid">
            {filteredItems.map((item) => (
              <WardrobeItemCard
                key={item.id}
                item={item}
                onDelete={handleItemDeleted}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default WardrobePage;