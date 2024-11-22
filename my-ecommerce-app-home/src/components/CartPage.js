import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchProducts, removeItem, modifyQuantity } from '../redux/cartAction';
import "../styles/CartPage.css";

const CartPage = () => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchProducts()); 
  }, [dispatch]);

  const handleRemoveItem = (id, selectedOption) => {
    dispatch(removeItem({ id, selectedOption }));
  };

  const handleQuantityChange = (id, selectedOption, quantity) => {
    const item = cart.find(
      (item) => item.id === id && item.selectedOption === selectedOption
    );

    if (item) {
      const maxQuantity = item.selectableOptions?.find(
        (opt) => opt.value === selectedOption
      )?.quantity || Infinity; 

      if (quantity > maxQuantity) {
        alert(`Only ${maxQuantity} items available for ${item.name} (${selectedOption}).`);
        return;
      }
    }

    if (quantity > 0) {
      dispatch(modifyQuantity(id, selectedOption, quantity)); 
    } else {
      alert("Quantity must be at least 1.");
    }
  };

  const calculateTotalAmount = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <div className="cart-page">
      <h2>Shopping Cart</h2>

      {cart.length === 0 ? (
        <div className="empty-cart-message">
            <span className="sad-face">😔</span>
            <p>Your cart is empty!</p>
            <button 
              className="empty-cart-back-btn" 
              onClick={() => navigate('/catalog')}
            >
              Back to Catalog
            </button>
        </div>
    ) : (
        <div className="cart-items">
          {cart.map((item) => (
            <div key={item.id + item.selectedOption} className="cart-item">
              <img src={item.image_url || '/default-image.jpg'} alt={item.name} className="cart-item-image" />
              <div className="cart-item-details">
                <h3 className="item-title">{item.name}</h3> 
                <p className="item-cost">Cost: ${item.price}</p>
                <p className="item-type">Category: {item.category}</p>
                {item.selectedOption && (
                  <p className="item-option">Option: <strong>{item.selectedOption}</strong></p>
                )}

                <div className="quantity-container">
                  <span>Amount:</span>
                  <div className="quantity-controls">
                    <button onClick={() => handleQuantityChange(item.id, item.selectedOption, item.quantity - 1)}>-</button>
                    <input
                      type="number"
                      value={item.quantity}
                      min="1"
                      onChange={(e) => handleQuantityChange(item.id, item.selectedOption, parseInt(e.target.value))}
                    />
                    <button onClick={() => handleQuantityChange(item.id, item.selectedOption, item.quantity + 1)}>+</button>
                  </div>
                </div>
              </div>
              <button className="remove-button" onClick={() => handleRemoveItem(item.id, item.selectedOption)}>
                Remove
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="cart-summary">
        <p>Total amount: <strong>${calculateTotalAmount()}</strong></p>
        <button className="checkout-button" onClick={() => navigate('/checkout')}>Continue</button>
      </div>
    </div>
  );
};

export default CartPage;
