import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice';
import CartItem from './CartItem';
import './ProductList.css';

function ProductList() {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.items);
  const [showCart, setShowCart] = useState(false);

  const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);

  const plantsArray = [
    {
      category: "Air Purifying Plants",
      plants: [
        { name: "Snake Plant", image: "https://cdn.pixabay.com/photo/2021/01/22/06/04/snake-plant-5939187_1280.jpg", description: "Produces oxygen at night.", cost: "$15" },
        { name: "Spider Plant", image: "https://cdn.pixabay.com/photo/2018/07/11/06/47/chlorophytum-3530413_1280.jpg", description: "Filters formaldehyde and xylene.", cost: "$12" }
      ]
    },
    {
      category: "Aromatic Fragrant Plants",
      plants: [
        { name: "Lavender", image: "https://images.unsplash.com/photo-1611909023032-2d6b3134ecba", description: "Calming aroma, helps relaxation.", cost: "$20" },
        { name: "Jasmine", image: "https://images.unsplash.com/photo-1592729808999-66b255483ec0", description: "Sweet scent, beautifully fragrant.", cost: "$18" }
      ]
    }
  ];

  const isPlantAdded = (plantName) => {
    return cart.some((item) => item.name === plantName);
  };

  const handleAddToCart = (plant) => {
    dispatch(addItem(plant));
  };

  return (
    <div>
      <nav className="navbar">
        <h1 onClick={() => setShowCart(false)} style={{ cursor: 'pointer' }}>Paradise Nursery</h1>
        <div className="cart-icon" onClick={() => setShowCart(true)} style={{ cursor: 'pointer' }}>
          🛒 Cart ({totalQuantity})
        </div>
      </nav>

      {showCart ? (
        <CartItem onContinueShopping={() => setShowCart(false)} />
      ) : (
        <div className="product-grid">
          {plantsArray.map((categoryObj, index) => (
            <div key={index} className="category-section">
              <h2>{categoryObj.category}</h2>
              <div className="plants-container" style={{ display: 'flex', gap: '20px' }}>
                {categoryObj.plants.map((plant) => (
                  <div key={plant.name} className="product-card" style={{ border: '1px solid #ccc', padding: '15px' }}>
                    <img src={plant.image} alt={plant.name} style={{ width: '150px', height: '150px' }} />
                    <h3>{plant.name}</h3>
                    <p>{plant.description}</p>
                    <p>{plant.cost}</p>
                    <button 
                      onClick={() => handleAddToCart(plant)}
                      disabled={isPlantAdded(plant.name)}
                    >
                      {isPlantAdded(plant.name) ? "Added to Cart" : "Add to Cart"}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ProductList;
