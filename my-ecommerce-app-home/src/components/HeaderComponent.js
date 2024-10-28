import React from 'react';
import '../styles/HeaderComponent.css'; 
import Navigation from './NavigationComponent'; 

const Header = () => {
  return(
    <header className="header">
      <div className="page-title">
        <h2>Home page</h2> 
        <hr className='header-divider'/>
      </div>
      <div className="header-container">
        <div className="logo-container">
          <img src="/logo.png" alt="Logo" className="logo-img" />
          <h1 className="logo-text">World of books</h1> 
        </div>
        <Navigation /> 
      </div>
    </header>
  );
};
export default Header;
