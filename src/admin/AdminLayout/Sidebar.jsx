import React from "react";
import { FaHome, FaBox, FaShoppingCart, FaUsers, FaBan } from "react-icons/fa";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div
      className="d-flex flex-column vh-100 bg-white text-dark"
      style={{
        width: "250px",
        position: "fixed",
        left: 0,
        top: 0,
        boxShadow: "2px 0 5px rgba(0, 0, 0, 0.1)", // Optional: Adds a shadow to the sidebar
      }}
    >
      {/* Admin Panel Header with black background and curved corners */}
      <h2
        className="text-center bg-primary py-3 text-white"
        style={{
        
          borderRadius:"30px"
        }}
      >
        Admin Panel
      </h2>

      {/* Sidebar Links */}
      <ul className="nav flex-column">
        <li className="nav-item">
          <Link to="/adminlayout" className="nav-link text-dark">
            <FaHome className="me-2" /> Home
          </Link>
        </li>
       
        <li className="nav-item">
          <Link to="/adminlayout/product-list" className="nav-link text-dark">
            <FaBox className="me-2" /> Products
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/adminlayout/users-list" className="nav-link text-dark">
            <FaUsers className="me-2" /> Users
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/adminlayout/block-list" className="nav-link text-dark">
            <FaBan className="me-2" /> Block
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
