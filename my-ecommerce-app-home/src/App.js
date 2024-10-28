import React from 'react';
import Header from './components/HeaderComponent';
import MainContent from './components/MainContent'; 
import Footer from './components/FooterComponent';
import Button from './components/ButtonComponent';
import Categories from './components/Categories';
import './App.css'; 

function App() {
  return (
    <div className="App">
      <Header />  
      <MainContent /> 
      <Categories />
      <Button label="View more" /> 
      <Footer />
    </div>
  );
}

export default App;
