import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';

function CartItem({ onContinueShopping }) {
  const cart = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const parseCost = (costString) => {
    if (typeof costString === 'number') return costString;
    return parseFloat(costString.replace('$', '')) || 0;
  };

  const calculateTotalAmount = () => {
    return cart.reduce((total, item) => total + parseCost(item.cost) * item.quantity, 0);
  };

  const calculateTotalCost = (item) => {
    return parseCost(item.cost) * item.quantity;
  };

  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    } else {
      dispatch(removeItem(item.name));
    }
  };

  const handleCheckoutShopping = () => {
    alert('Functionality to be added for future reference');
  };

  return (
    <div className="cart-container">
      <h2>Shopping Cart</h2>
      <h3>Total Cart Amount: ${calculateTotalAmount()}</h3>
      
      {cart.map((item) => (
        <div key={item.name} className="cart-item" style={{ borderBottom: '1px solid #ccc', margin: '10px 0' }}>
          <img src={item.image} alt={item.name} style={{ width: '100px' }} />
          <div>
            <h3>{item.name}</h3>
            <p>Unit Price: {item.cost}</p>
            <p>Subtotal: ${calculateTotalCost(item)}</p>
            <div>
              <button onClick={() => handleDecrement(item)}>-</button>
              <span style={{ margin: '0 10px' }}>{item.quantity}</span>
              <button onClick={() => handleIncrement(item)}>+</button>
            </div>
            <button onClick={() => dispatch(removeItem(item.name))} style={{ marginTop: '5px' }}>Delete</button>
          </div>
        </div>
      ))}

      <div style={{ marginTop: '20px' }}>
        <button onClick={onContinueShopping}>Continue Shopping</button>
        <button onClick={handleCheckoutShopping} style={{ marginLeft: '10px' }}>Checkout</button>
      </div>
    </div>
  );
}

export default CartItem;
