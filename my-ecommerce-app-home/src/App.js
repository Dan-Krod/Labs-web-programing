// App.js
import React, { useState } from 'react'; 
import { BrowserRouter as Router, Route, Routes, useLocation, Navigate } from 'react-router-dom';
import Header from './components/HeaderComponent';
import Footer from './components/FooterComponent';
import MainContent from './components/MainContent'; 
import CategoriesContainer from './components/CategoriesContainer';
import CatalogPage from './components/CatalogPage'; 
import ItemPage from './components/ItemPage'; 
import './App.css'; 

function App() {
  const location = useLocation(); 
  const [searchTerm, setSearchTerm] = useState(''); 

  const isCatalogPage = location.pathname === "/catalog"; 

  return (
    <div className="App">
      <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} isCatalogPage={isCatalogPage} />
      <Routes>
        <Route path="/" element={
          <>
            <MainContent />
            <CategoriesContainer />
          </>
        } />

        <Route path="/catalog" element={<CatalogPage searchTerm={searchTerm} setSearchTerm={setSearchTerm} />} />

        <Route path="/item/:id" element={<ItemPage />} />

        <Route path="/home" element={<Navigate to="/" replace />} />
      </Routes>
      <Footer />
    </div>
  );
}

const RootApp = () => (
    <Router>
      <App />
    </Router>
);

export default RootApp;

