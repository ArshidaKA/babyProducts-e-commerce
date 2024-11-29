import React,{useContext} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import './Payment .css'; // For custom styling if needed
import axios from 'axios';
import { userContext } from '../../../Context/Context';

const Payment = () => {
    const{order,cart,totalAmount}=useContext(userContext)
  const navigate = useNavigate();
  const id=localStorage.getItem('id')

  const handleBack = () => {
    navigate(-1); // Navigate back to the previous page
  };
  function submitt(){
    const newOrders={
        cartitems:cart,
        totalAmount

    }
    axios.patch(`http://localhost:4000/users/${id}`,{order:[...order,newOrders],cart:[]})
             .then(res=>console.log(success))
             .catch(err=>console.log(err))
            alert('succes')
            navigate("/orders")


  }

  return (
    <div className="container mt-5">
      {/* Back Button */}
      <div className="d-flex justify-content-start mb-4">
        <button className="btn btn-secondary btn-sm" onClick={handleBack}>
          <FaArrowLeft /> 
        </button>
      </div>

      <h2 className="text-center mb-4">Payment Methods</h2>

      {/* Payment Options */}
      <div className="row">
        <div className="col-md-4">
          <div className="card p-3">
            <h5>Credit/Debit Card</h5>
            <div className="payment-option">
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/8/81/Wikimedia-logo.svg"
                alt="Visa"
                className="payment-logo"
              />
              <img
                src="data:image/png;base64,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"
                alt="MasterCard"
                className="payment-logo"
              />
            </div>
            <button className="btn btn-primary w-100 mt-3">Pay with Card</button>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card p-3">
            <h5>Net Banking</h5>
            <div className="payment-option">
              <img
                src="https://yt3.googleusercontent.com/vPPqGWRhlGmEBvp3Xj8XxTpHlfRF6-VhqJnfdLyxpdDyAcnsYTsXSrcpZnQvQbg7a54g7xpj=s900-c-k-c0x00ffffff-no-rj"
                alt="ICICI Bank"
                className="payment-logo"
              />
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNoQMLUXxpQbDeMQ_RUh-jjYxMqRR0xqfC-g&s"
                alt="HDFC Bank"
                className="payment-logo"
              />
            </div>
            <button className="btn btn-primary w-100 mt-3">Pay with Net Banking</button>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card p-3">
            <h5>UPI</h5>
            <div className="payment-option">
              <img 
                src="https://indiashippingnews.com/wp-content/uploads/2024/08/UPI.jpg"
                alt="UPI"
                className="payment-logo"
              />
            </div>
            <button className="btn btn-primary w-100 mt-3">Pay with UPI</button>
          </div>
        </div>
      </div>

      {/* Cash on Delivery Option */}
      <div className="mt-5">
        <div className="card p-3">
          <h5>Cash on Delivery</h5>
          <p>Pay when the product is delivered to you.</p>
          <button className="btn btn-success w-100 mt-3" onClick={submitt}>place order</button>
        </div>
      </div>

    </div>
  );
};

export default Payment;
