import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function OrdersList() {
  const { id } = useParams(); 
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/users/${id}`);
        setOrders(response.data.order); 
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };
    fetchOrders();
  }, [id]);

  return (
    <div className="container mt-4">
      <h2>Orders for User ID: {id}</h2>
      {orders.length > 0 ? (
        <table className="table table-bordered table-striped">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Product</th>
              <th>Quantity</th>
              <th>Total Price</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr key={index}>
                <td>{order.id}</td>
                <td>{order.product}</td>
                <td>{order.quantity}</td>
                <td>{order.totalPrice}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No orders found for this user.</p>
      )}
    </div>
  );
}

export default OrdersList;
