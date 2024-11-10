// ItemPage.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchProductById } from '../api';
import '../styles/ItemPage.css';

const ItemPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [deliveryOption, setDeliveryOption] = useState('');
  const [packagingDetails, setPackagingDetails] = useState('');
  const [packagingType, setPackagingType] = useState('');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productData = await fetchProductById(id);
        if (productData) {
          setProduct(productData);
        } else {
          console.error("Product not found");
        }
      } catch (error) {
        console.error("Failed to fetch product details:", error);
      }
    };
    fetchProduct();
  }, [id]);

  const handleQuantityChange = (e) => setQuantity(parseInt(e.target.value, 10));
  const handleDeliveryChange = (e) => {
    setDeliveryOption(e.target.value);
    setPackagingDetails('');
    setPackagingType('');
  };

  const renderPackagingFields = () => {
    if (deliveryOption === 'Standard' || deliveryOption === 'Express') {
      return (
        <>
          <input
            type="text"
            className="countable-field"
            placeholder="Enter packaging details"
            value={packagingDetails}
            onChange={(e) => setPackagingDetails(e.target.value)}
          />
          <select
            className="selectable-field"
            value={packagingType}
            onChange={(e) => setPackagingType(e.target.value)}
          >
            <option value="">Select packaging</option>
            <option value="basic">Basic Packaging</option>
            <option value="gift">Gift Packaging</option>
          </select>
        </>
      );
    }
    return null;
  };

  if (!product) return <p>Loading...</p>;

  return (
    <div className="item-page">
      <div className="item-header">
        <img 
          src={product.image_url ? `/${product.image_url}` : '/default.jpg'} 
          alt={product.name} 
          className="item-image" 
        />
        <div className="item-info">
          <h1>{product.name}</h1>
          <p className="item-description">{product.description}</p>
          <div className="item-fields">
            <input
              type="number"
              className="countable-field"
              value={quantity}
              onChange={handleQuantityChange}
              placeholder="Enter quantity"
              min="1"
            />
            <select
              className="selectable-field"
              value={deliveryOption}
              onChange={handleDeliveryChange}
            >
              <option value="">Select Delivery Option</option>
              <option value="Standard">Standard</option>
              <option value="Express">Express</option>
            </select>
          </div>
          {renderPackagingFields()}
          <p className="item-price">Price: ${product.price}</p>
          <div className="item-actions">
            <button onClick={() => navigate(-1)}>Go back</button>
            <button>Add to cart</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemPage;
