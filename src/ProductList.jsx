import React from 'react';
import { useDispatch } from 'react-redux';
import { addItem } from './CartSlice';

function ProductList() {
  const dispatch = useDispatch();

  const plants = [
    { name: 'Monstera', cost: 15, image: 'https://via.placeholder.com/150' },
    { name: 'Snake Plant', cost: 12, image: 'https://via.placeholder.com/150' },
  ];

  return (
    <div>
      <h2>Product Catalog</h2>
      <div className="product-grid">
        {plants.map((plant) => (
          <div key={plant.name} className="product-card">
            <img src={plant.image} alt={plant.name} />
            <h3>{plant.name}</h3>
            <p>${plant.cost}</p>
            <button onClick={() => dispatch(addItem(plant))}>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductList;
