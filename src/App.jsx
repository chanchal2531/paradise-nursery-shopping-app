import React, { useState } from 'react';
import './App.css';
import ProductList from './ProductList';
import AboutUs from './AboutUs';

function App() {
  const [showProductList, setShowProductList] = useState(false);

  return (
    <div>
      {!showProductList ? (
        <div className="landing-page">
          <h1>Welcome To Paradise Nursery</h1>
          <AboutUs />
          <button onClick={() => setShowProductList(true)}>Get Started</button>
        </div>
      ) : (
        <ProductList />
      )}
    </div>
  );
}

export default App;
