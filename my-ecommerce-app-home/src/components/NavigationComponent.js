import React from 'react';
import '../styles/NavigationComponent.css';

const Navigation = () => {
  return(
    <nav className="nav-bar">
      <ul className="nav-buttons">
        <li><a href="/home" className="nav-link active">Home</a></li>
        <li><a href="/catalog" className="nav-link">Catalog</a></li>
        <li><a href="/cart" className="nav-link">Cart</a></li>
      </ul>
    </nav>
  );
};
export default Navigation;
