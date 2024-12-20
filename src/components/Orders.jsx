import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaArrowLeft } from 'react-icons/fa';  
import { Link } from 'react-router-dom';  

function Orders() {
  const id = localStorage.getItem('id');
  const [items, setItems] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:4000/users/${id}`)
      .then((res) => setItems(res.data.order))
      .catch((err) => console.log(err));
  }, [id]);

  console.log(items);

  return (
    <div className="container mt-5">
    
      <div className="d-flex align-items-center mb-4">
    
        <Link to="/" className="text-decoration-none text-dark me-3">
          <FaArrowLeft size={30} />
        </Link>
        
        <h2 className="mb-0">Your Orders</h2>
      </div>

      <div className="row">
        
        {items.map((order, index) => (
          <div className="col-12 col-md-6 col-lg-4 mb-4" key={index}>
            <div className="card shadow-sm">
              <div className="card-body">
                <p className="card-text">
                  <strong>Total Amount:</strong> ${order.totalAmount}
                </p>

        
                <div>
                  {order.cartitems.map((product, idx) => (
                    <div className="d-flex mb-3" key={idx}>
              
                      <img
                        src={product.image_url}
                        alt={product.name}
                        className="rounded me-3"
                        style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                      />
              
                      <div className="d-flex flex-column justify-content-center">
                        <span className="fw-bold">{product.name}</span>
                  
                        <span className="text-muted" style={{ fontSize: '0.9em' }}>
                          {product.description}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Orders;
