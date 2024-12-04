import React, { useContext } from 'react';
import { userContext } from '../Context/Context';
import { Link, useNavigate } from 'react-router-dom'; 
import { FaArrowLeft } from 'react-icons/fa'; 
import './Cart .css';

function Cart() {
  const { cart = [], RemoveCart, updatedquantity, totalAmount } = useContext(userContext);
  const navigate = useNavigate(); 

  return (
    <div className="container mt-4">
      <div className="d-flex align-items-center mb-3">
        <FaArrowLeft 
          size={24} 
          className="me-2" 
          style={{ cursor: 'pointer' }} 
          onClick={() => navigate(-1)} 
        />
        <h2 className="mb-2 ">My Cart</h2>
      </div>

      {cart.length > 0 ? (
        <>
          <div className="row g-3">
            {cart.map((item) => (
              <div key={item.id} className="col-md-4">
                <div className="card">
                  <img
                    src={item.image_url}
                    alt={item.name}
                    className="card-img-top"
                    style={{ height: '200px', objectFit: 'contain' }}
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
                      <button onClick={() => RemoveCart(item.id)} className="btn btn-primary btn-sm ms-2">Remove</button>
                    </p>
                    <p className="card-text">
                      Total: <strong>₹{(item.price * item.quantity).toFixed(2)}</strong>
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          
          <div className="total-price-section sticky-bottom order">
            <div className="d-flex justify-content-between align-items-center">
              <h3 className="total-price"><span>Total Price:</span> ₹{totalAmount.toFixed(2)}</h3>
        
              <Link to="/order-details">
                <button className="btn btn-success btn-lg order-btn">
                  Order Now
                </button>
              </Link>
            </div>
          </div>
        </>
      ) : (
        <p>Your cart is empty!</p>
      )}
    </div>
  );
}

export default Cart;
