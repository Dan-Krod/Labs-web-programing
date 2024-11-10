// CatalogPage.js
import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import CatalogFilters from './CatalogFilters'; 
import CatalogItem from './CatalogItem';
import { fetchProducts } from '../api'; 
import Loader from './Loader';
import '../styles/Catalog.css';

const CatalogPage = ({ searchTerm, setSearchTerm }) => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortCriteria, setSortCriteria] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const getProducts = useCallback(async () => {
    setLoading(true);

    const params = {
        search: searchTerm || '',
        category: selectedCategory || '',
        sortCriteria: sortCriteria || '',
        sortOrder: sortOrder || 'asc',
    };

    Object.keys(params).forEach(key => {
        if (!params[key]) delete params[key];
    });

    console.log("Fetching products with parameters:", params);

    try {
        const products = await fetchProducts(params.search, params.sortCriteria, params.sortOrder, params.category);
        setFilteredProducts(products);
        console.log("Products fetched:", products);
    } catch (error) {
        console.error("Failed to fetch products:", error);
    } finally {
        setTimeout(() => setLoading(false), 500);
    }
}, [searchTerm, selectedCategory, sortCriteria, sortOrder]);



  useEffect(() => {
    getProducts();
  }, [getProducts]); 

  const handleApplyFilters = () => {
    console.log("Applying filters...");
    getProducts(); 
  };

  const resetFilters = () => {
    console.log("Resetting filters...");
    setSelectedCategory('');
    setSortCriteria('');
    setSortOrder('asc');
    setSearchTerm('');
    
    getProducts(); 
  };

  const viewProductDetails = (product) => {
    navigate(`/item/${product.id}`, { state: { product } });
  };


  if (loading) {
    return (
      <div className="loader-container">
        <Loader />
      </div>
    );
  }

  return (
    <div className="catalog">
      <CatalogFilters
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        sortCriteria={sortCriteria}
        setSortCriteria={setSortCriteria}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
        handleApplyFilters={handleApplyFilters}
        resetFilters={resetFilters}
      />

      <div className="divider"></div>

      <div className="catalog-items">
        {filteredProducts.map((product) => (
          <CatalogItem key={product.id} product={product} onViewDetails={viewProductDetails} />
        ))}
      </div>
    </div>
  );
};

export default CatalogPage;
