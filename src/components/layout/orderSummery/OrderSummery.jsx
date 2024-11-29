import React, { useContext } from 'react';
import { userContext } from '../../../Context/Context';
import { Link, useNavigate } from 'react-router-dom'; 
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'; 

const OrderSummary = () => {
  const navigate = useNavigate(); 
  const orderDetails = JSON.parse(localStorage.getItem('orderDetails')) || {};
  const { cart } = useContext(userContext);

  
  const totalPrice = cart.reduce((total, item) => total + (item.price * item.quantity), 0);

  const handleChangeAddress = () => {
    navigate("/order-details"); 
  
  };

  return (
    <div className="container mt-5">
    
      <div className="d-flex justify-content-between align-items-center mb-4">
        <FaArrowLeft
          className="fs-3 text-primary"
          onClick={() => navigate('/')} 
          style={{ cursor: 'pointer' }}
        />
        <h2 className="text-center">Order Summary</h2>
        <FaArrowRight
          className="fs-3 text-primary"
          onClick={() => navigate('/payment')} 
          style={{ cursor: 'pointer' }}
        />
      </div>

    
      <div className="mb-4">
        <h6><strong>Deliver to:</strong></h6>
        <h5>{orderDetails.fullName} </h5>
        <p>{orderDetails.address}, {orderDetails.state}, {orderDetails.pincode}</p>
        <p>{orderDetails.phoneNumber}</p>
        
        
        <button
          className="btn btn-warning mt-3"
          onClick={handleChangeAddress}
        >
          Change Address
        </button>
      </div>

      
      <h3>Cart Items</h3>
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
                    Price: <strong>₹{item.price}</strong>
                  </p>
                  <p className="card-text">
                    Quantity: <strong>{item.quantity}</strong>
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

      
      <div className="sticky-bottom bg-light p-4 mt-4 shadow-sm" style={{ height: 100 }}>
        <div className="d-flex justify-content-between align-items-center">
          <h3 className="mb-0">Total Price:<span style={{ color: 'green' }}> ₹{totalPrice.toFixed(2)}</span></h3>
          <Link to="/payment">
            <button className="btn btn-success">Proceed to Payment</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
