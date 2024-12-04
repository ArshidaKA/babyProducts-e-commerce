import React from "react";
import { FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const username = "Admin"; 
  const navigate=useNavigate();
  const handle=()=>{
    localStorage.clear();
    navigate("/login");
  }

  return (
    <nav
      className="navbar navbar-expand-lg navbar-light fixed-top shadow-sm"
      style={{
        backgroundColor: "#007bff", // Bootstrap primary blue color
        color: "white", // Ensure text contrasts with the blue background
        marginLeft: "250px",
        width: "calc(100% - 250px)",
        borderRadius: "20px", // Curved bottom corners
        padding: "0.5rem 2rem", // Adjust padding for a clean look
        borderBottom: "2px solid #0056b3", // Optional: Adds a darker blue border at the bottom
      }}
    >
      <div className="container-fluid">
        
        
        <div className="navbar-nav ms-auto">
          {/* Username with Icon */}
          <li className="nav-item d-flex align-items-center me-3">
            <FaUserCircle className="text-white fs-4 me-2" />
            <span className="text-white">{username}</span>
          </li>
          
          {/* Logout Button */}
          <li className="nav-item">
            <button  onClick={handle}className="btn btn-outline-light">Logout</button>
          </li>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
