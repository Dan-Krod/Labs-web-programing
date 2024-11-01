import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import '../styles/NavigationComponent.css';

const Navigation = () => {
  const location = useLocation();

  return (
    <nav className="navigation">
      <NavLink to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}>
        Home
      </NavLink>
      <NavLink 
        to="/catalog" 
        className={`nav-link ${(location.pathname === '/catalog' || location.pathname.startsWith('/item')) ? 'active' : ''}`}
      >
        Catalog
      </NavLink>
      <NavLink to="/cart" className={`nav-link ${location.pathname === '/cart' ? 'active' : ''}`}>
        Cart
      </NavLink>
    </nav>
  );
};

export default Navigation;

