// CatalogPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CatalogFilters from './CatalogFilters'; 
import CatalogItem from './CatalogItem';
import '../styles/Catalog.css';

import booksImage from '../images/books.jpg';
import bookEventImage from '../images/book-event.jpg';
import signWriterImage from '../images/sign-writer.jpg';
import audiobooksImage from '../images/audiobooks.jpg';
import merchandiseImage from '../images/merchandise.jpg';

const products = [
  { id: 3, name: 'Pride and Prejudice', description: 'A timeless romance novel by Jane Austen.', price: 180, category: 'Books', additionalInfo: 'Author: Jane Austen', image: booksImage },
  { id: 9, name: 'Literary Festival Ticket', description: 'Access to a three-day literary festival.', price: 50, category: 'Book Events', additionalInfo: 'Date: July 15-17, 2024', image: bookEventImage },
  { id: 5, name: 'Signed Copy of Harry Potter', description: 'A signed copy of "Harry Potter and the Philosopher\'s Stone".', price: 350, category: 'Author Signs', additionalInfo: 'Signed by: J.K. Rowling', image: signWriterImage },
  { id: 7, name: 'Stephen King Audiobook Collection', description: 'Collection of Stephen King\'s top audiobooks.', price: 220, category: 'Audiobooks', additionalInfo: 'Includes: The Shining, It, Carrie', image: audiobooksImage },
  { id: 10, name: 'Literary Mug', description: 'A beautiful mug with famous literary quotes.', price: 2.5, category: 'Merchandise', additionalInfo: 'Material: Ceramic, 300ml', image: merchandiseImage },
  { id: 8, name: 'Book Signing Event Ticket', description: 'Get access to live book signing events.', price: 30, category: 'Book Events', additionalInfo: 'Date: June 12, 2024', image: bookEventImage },
  { id: 2, name: '1984', description: 'A dystopian novel about a totalitarian regime.', price: 250, category: 'Books', additionalInfo: 'Author: George Orwell', image: booksImage },
  { id: 4, name: 'Signed Photo of Stephen King', description: 'Exclusive signed photo of the horror master.', price: 200, category: 'Author Signs', additionalInfo: 'Signed by: Stephen King', image: signWriterImage },
  { id: 6, name: 'Audiobook Subscription', description: 'A subscription to the best audiobooks for one year.', price: 150, category: 'Audiobooks', additionalInfo: 'Length: 12 months', image: audiobooksImage },
  { id: 1, name: 'The Catcher in the Rye', description: 'A classic novel by J.D. Salinger.', price: 245, category: 'Books', additionalInfo: 'Author: J.D. Salinger', image: booksImage }
];

const CatalogPage = ({ searchTerm, setSearchTerm }) => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortCriteria, setSortCriteria] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [filteredProducts, setFilteredProducts] = useState(products);
  const navigate = useNavigate();

  const handleApplyFilters = () => {
    let filtered = products.filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedCategory ? product.category === selectedCategory : true)
    );

    if (sortCriteria) {
      filtered = filtered.sort((a, b) => {
        const fieldA = sortCriteria === 'price' ? a.price : a[sortCriteria].toLowerCase();
        const fieldB = sortCriteria === 'price' ? b.price : b[sortCriteria].toLowerCase();
        return sortOrder === 'asc' ? (fieldA > fieldB ? 1 : -1) : (fieldA < fieldB ? 1 : -1);
      });
    }

    setFilteredProducts(filtered);
  };

  const resetFilters = () => {
    setSelectedCategory('');
    setSortCriteria('');
    setSortOrder('asc');
    setSearchTerm('');
    setFilteredProducts(products);
  };

  const viewProductDetails = (product) => {
    navigate(`/item/${product.id}`, { state: { product } });
  };

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
