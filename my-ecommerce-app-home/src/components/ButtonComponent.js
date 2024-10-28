import React from 'react';
import '../styles/ButtonComponent.css';

const Button = ({ label }) => {
  return (
    <div class='view-more-button-container'>
    <button className="view-more-button">
      {label}
    </button>
    </div>
  );
};

export default Button;
