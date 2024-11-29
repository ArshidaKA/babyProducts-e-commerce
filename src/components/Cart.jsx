import React, { useContext } from 'react';
import { userContext } from '../Context/Context';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate for programmatic navigation
import { FaArrowLeft } from 'react-icons/fa'; // Import back arrow icon
import './Cart .css';

function Cart() {
  const { cart=[], RemoveCart, updatedquantity } = useContext(userContext);
  const navigate = useNavigate(); // Initialize the navigate function

  // Calculate the total price of the items in the cart
  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className="container mt-4">
      {/* Back Icon - Click to navigate to the previous page */}
      <div className="d-flex align-items-center mb-3">
        <FaArrowLeft 
          size={24} 
          className="me-2" 
          style={{ cursor: 'pointer' }} 
          onClick={() => navigate(-1)} // Use navigate(-1) to go back to the previous page
        />
        <h2 className="mb-2 ">My Cart</h2>
      </div>

      {cart.length > 0 ? (
        <div className="row g-3">
          {cart.map((item) => (
            <div key={item.id} className="col-md-4">
              <div className="card">
                <img
                  src={item.image_url}
                  alt={item.name}
                  className="card-img-top"
                  style={{ height: '200px', objectFit: 'cover' }}
                />
                <div className="card-body">
                  <h5 className="card-title">{item.name}</h5>
                  <p className="card-text">
                    Price: <strong>₹{item.price.toFixed(2)}</strong>
                  </p>
                  <p className="card-text">
                    Quantity:
                    <button onClick={() => updatedquantity(item, 1)} className="btn btn-outline-secondary btn-sm ms-2">+</button>
                    <strong>{item.quantity}</strong>
                    <button onClick={() => updatedquantity(item, -1)} className="btn btn-outline-secondary btn-sm ms-2">-</button>
                    <button onClick={() => RemoveCart(item.id)} className="btn btn-danger btn-sm ms-2">Remove</button>
                  </p>
                  <p className="card-text">
                    Total: <strong>₹{(item.price * item.quantity).toFixed(2)}</strong>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>Your cart is empty!</p>
      )}

      {/* Total Price Section */}
      <div className="total-price-section sticky-bottom order">
        <div className="d-flex justify-content-between align-items-center">
          <h3 className="total-price"><span>Total Price:</span> ₹{totalPrice.toFixed(2)}</h3>
          {/* Order Now Button */}
          <Link to="/order-details">
            <button className="btn btn-success btn-lg order-btn">
              Order Now
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Cart;
