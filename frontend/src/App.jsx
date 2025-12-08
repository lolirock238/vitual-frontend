import React, { useState } from 'react';
import Header from './components/Header';
import WardrobePage from './pages/WardrobePage';
import CreateOutfitPage from './pages/CreateOutfitPage';
import OutfitsPage from './pages/OutfitsPage';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('wardrobe');

  const renderPage = () => {
    switch (currentPage) {
      case 'wardrobe':
        return <WardrobePage />;
      case 'create-outfit':
        return <CreateOutfitPage />;
      case 'outfits':
        return <OutfitsPage />;
      default:
        return <WardrobePage />;
    }
  };

  return (
    <div className="app">
      <Header currentPage={currentPage} onNavigate={setCurrentPage} />
      <main className="main-content">
        {renderPage()}
      </main>
    </div>
  );
}

export default App;