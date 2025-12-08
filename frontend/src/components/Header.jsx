import React from 'react';
import './Header.css';

function Header({ currentPage, onNavigate }) {
  return (
    <header className="header">
      <div className="header-container">
        <h1 className="header-title">My Wardrobe</h1>
        <nav className="header-nav">
          <button
            className={`nav-button ${currentPage === 'wardrobe' ? 'active' : ''}`}
            onClick={() => onNavigate('wardrobe')}
          >
            Wardrobe
          </button>
          <button
            className={`nav-button ${currentPage === 'create-outfit' ? 'active' : ''}`}
            onClick={() => onNavigate('create-outfit')}
          >
            Create Outfit
          </button>
          <button
            className={`nav-button ${currentPage === 'outfits' ? 'active' : ''}`}
            onClick={() => onNavigate('outfits')}
          >
            My Outfits
          </button>
        </nav>
      </div>
    </header>
  );
}

export default Header;