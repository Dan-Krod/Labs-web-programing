import React from 'react';
import PrimaryButton from './PrimaryButton';
import '../styles/CatalogItem.css';

const CatalogItem = ({ product, onViewDetails }) => {
  return (
    <div className="catalog-item">
      <div className="catalog-item-category">{product.category}</div>
      <img src={product.image} alt={product.name} className="catalog-item-image" />
      <h2>{product.name}</h2>
      <p className="catalog-item-description">{product.description}</p>
      <p className="catalog-item-additional">{product.additionalInfo}</p>
      <p className="catalog-item-price">Price: ${product.price}</p>
      <PrimaryButton className="primary-button" label="View more" onClick={() => onViewDetails(product)} />
    </div>
  );
};

export default CatalogItem;
