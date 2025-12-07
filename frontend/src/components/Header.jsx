import React from 'react';
import './Header.css';

export default function Header({ view, setView }) {
  return (
    <header className="header">
      <div className="header-container">
        <h1 className="header-title">My Wardrobe</h1>
        <div className="header-buttons">
          <button
            onClick={() => setView('wardrobe')}
            className={view === 'wardrobe' ? 'active' : ''}
          >
            Wardrobe
          </button>
          <button
            onClick={() => setView('create')}
            className={view === 'create' ? 'active' : ''}
          >
            Create Outfit
          </button>
          <button
            onClick={() => setView('outfits')}
            className={view === 'outfits' ? 'active' : ''}
          >
            My Outfits
          </button>
        </div>
      </div>
    </header>
  );
}
