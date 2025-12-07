import React, { useState } from 'react';
import './AddItemSection.css';

export default function AddItemSection({ onAddItem, loading, CATEGORIES }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [selectedCat, setSelectedCat] = useState('');

  const handleFileChange = (e, category) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setSelectedCat(category);
      const reader = new FileReader();
      reader.onloadend = () => setPreviewUrl(reader.result);
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
    <div className="add-item-section">
      {previewUrl && (
        <div className="preview-container">
          <img src={previewUrl} alt="Preview" className="preview-image" />
          <div className="preview-info">
            <p>{CATEGORIES.find(c => c.id === selectedCat)?.name}</p>
            <p>{selectedFile?.name}</p>
            <button onClick={handleUpload} disabled={loading}>
              {loading ? 'Uploading...' : 'Upload Item'}
            </button>
          </div>
        </div>
      )}
      <div className="file-buttons">
        {CATEGORIES.map(cat => (
          <label key={cat.id}>
            <input
              type="file"
              accept="image/*"
              className="hidden-input"
              onChange={e => handleFileChange(e, cat.id)}
            />
            <span className="file-button">{cat.name}</span>
          </label>
        ))}
      </div>
    </div>
  );
}
