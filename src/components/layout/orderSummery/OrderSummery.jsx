import React, { useContext } from 'react';
import { userContext } from '../../../Context/Context'; // Assuming you are using context for the cart
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'; // Importing icon library

const OrderSummary = () => {
  const navigate = useNavigate(); // For programmatic navigation
  const orderDetails = JSON.parse(localStorage.getItem('orderDetails')) || {};
  const { cart } = useContext(userContext);

  // Calculate total price of the cart
  const totalPrice = cart.reduce((total, item) => total + (item.price * item.quantity), 0);

  return (
    <div className="container mt-5">
      {/* Header with Back and Forward Icons */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <FaArrowLeft
          className="fs-3 text-primary"
          onClick={() => navigate(-1)} // Go back to the previous page
          style={{ cursor: 'pointer' }}
        />
        <h2 className="text-center">Order Summary</h2>
        <FaArrowRight
          className="fs-3 text-primary"
          onClick={() => navigate('/payment')} // Go to the payment page
          style={{ cursor: 'pointer' }}
        />
      </div>

      {/* Address Section */}
      <div className="mb-4">
        <h6><strong>Deliver to:</strong></h6>
        <h5>{orderDetails.fullName} </h5>
        <p>{orderDetails.address}, {orderDetails.state}, {orderDetails.pincode}</p>
        <p>{orderDetails.phoneNumber}</p>
      </div>

      {/* Cart Items Section */}
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

      {/* Sticky Total Price Section */}
      <div className="sticky-bottom bg-light p-4 mt-4 shadow-sm" style={{height:100}}>
        <div className="d-flex justify-content-between align-items-center">
          <h3 className="mb-0">Total Price:<span style={{color:"green"}}> ₹{totalPrice.toFixed(2)}</span></h3>
          <Link to="/payment">
            <button className="btn btn-success">Proceed to Payment</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
