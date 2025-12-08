// src/components/AddItemSection.jsx
import React, { useState, useEffect } from 'react';
import './AddItemSection.css';

function AddItemSection({ onItemAdded }) {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [newCategoryName, setNewCategoryName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showAddCategory, setShowAddCategory] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch('http://localhost:8000/categories/');
      const data = await response.json();
      setCategories(data);
      if (data.length > 0) setSelectedCategory(data[0].id); // Pre-select first category
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleAddCategory = async (e) => {
    e.preventDefault();
    if (!newCategoryName.trim()) return;

    try {
      const formData = new FormData();
      formData.append('name', newCategoryName);

      const response = await fetch('http://localhost:8000/categories/', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        setNewCategoryName('');
        setShowAddCategory(false);
        fetchCategories(); // Refresh categories
      }
    } catch (error) {
      console.error('Error adding category:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedCategory || !selectedFile) {
      alert('Please select a category and an image');
      return;
    }

    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append('category_id', selectedCategory);
      formData.append('image', selectedFile);

      const response = await fetch('http://localhost:8000/items/', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        setSelectedFile(null);
        setPreviewUrl('');
        setSelectedCategory(categories.length > 0 ? categories[0].id : ''); // Reset to first category
        if (onItemAdded) onItemAdded();
        alert('Item added successfully!');
      }
    } catch (error) {
      console.error('Error adding item:', error);
      alert('Failed to add item');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="add-item-section">
      <h2 className="section-title">Add New Item</h2>

      <div className="category-management">
        <button
          className="toggle-category-button"
          onClick={() => setShowAddCategory(!showAddCategory)}
        >
          {showAddCategory ? 'Cancel' : 'Add New Category'}
        </button>

        {showAddCategory && (
          <form onSubmit={handleAddCategory} className="add-category-form">
            <input
              type="text"
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              placeholder="Category name (e.g., Shoes, Bags)"
              className="category-input"
            />
            <button type="submit" className="submit-category-button">
              Add Category
            </button>
          </form>
        )}
      </div>

      <form onSubmit={handleSubmit} className="add-item-form">
        <div className="form-group">
          <label className="form-label">Category</label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="form-select"
            required
          >
            {categories.length === 0 ? (
              <option value="">No categories available</option>
            ) : (
              categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))
            )}
          </select>
        </div>

        <div className="form-group">
          <label className="form-label">Upload Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="form-file-input"
            required
          />
        </div>

        {previewUrl && (
          <div className="preview-container">
            <img src={previewUrl} alt="Preview" className="preview-image" />
          </div>
        )}

        <button type="submit" className="submit-button" disabled={isLoading}>
          {isLoading ? 'Adding...' : 'Add Item'}
        </button>
      </form>
    </div>
  );
}

export default AddItemSection;
