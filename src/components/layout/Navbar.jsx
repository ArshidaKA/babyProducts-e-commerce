import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; 
import { FaShoppingCart, FaSignInAlt, FaSignOutAlt, FaSearch } from "react-icons/fa";
import './Navbar.css';
import axios from "axios";

const NavbarComponent = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [searchQuery, setSearchQuery] = useState(""); 
  const [searchResults, setSearchResults] = useState([]); 
  const [allProducts, setAllProducts] = useState([]); 

  
  useEffect(() => {
    const user = localStorage.getItem('id');
    if (user) {
      setIsLoggedIn(true); 
    }
  }, []);

  
  useEffect(() => {
    axios.get("http://localhost:4000/products")
      .then((response) => {
        setAllProducts(response.data); 
      })
      .catch((error) => {
        console.log("Error fetching products:", error);
      });
  }, []);

  
  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query); 

    if (query.trim() === "") {
      setSearchResults([]); 
      return;
    }

    
    const filteredProducts = allProducts.filter((product) =>
      product.name.toLowerCase().includes(query.toLowerCase())
    );
    setSearchResults(filteredProducts); 
  };

  
  const handleLogout = () => {
    localStorage.clear('id'); 
    localStorage.clear('user'); 
    setIsLoggedIn(false);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark">
      <div className="container">
        {/* App Name - Left side */}
        <Link className="name navbar-brand text-decoration-none font-weight-bold" to="/">
          <h3>Bab<span style={{ color: "yellow" }}>Y</span>bliss</h3>
        </Link>

        {/* Search Bar */}
        <div className="input-group mb-1" style={{ maxWidth: "400px", marginLeft: "20px" }}>
          <input
            type="text"
            className="form-control"
            placeholder="Search products..."
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <button className="btn colour btn-outline-secondary" type="button">
            <FaSearch size={20} />
          </button>
        </div>

        {/* Navbar toggler for mobile responsiveness */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar links - Right side */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {/* Home Link */}
            <li className="nav-item">
              <Link className="text-decoration-none nav-link text-light" to="/">
                Home
              </Link>
            </li>

            {/* Categories Link with Dropdown */}
            <li className="nav-item dropdown">
              <Link
                className="nav-link dropdown-toggle text-light"
                to="/categories"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Categories
              </Link>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                <li>
                  <Link className="dropdown-item" to="/categories/feeding">
                    Feeding
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/categories/clothing">
                    Clothing
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/categories/toys">
                    Toys
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/categories/safety">
                    Safety
                  </Link>
                </li>
              </ul>
            </li>

            {/* Shopping Cart Link with icon and text */}
            <li className="nav-item">
              <Link className="text-decoration-none nav-link text-light" to="/cart">
                <FaShoppingCart className="me-2" size={20} /> Cart
              </Link>
            </li>
            <li className="nav-item">
              <Link className="text-decoration-none nav-link text-light" to="/orders">
                Orders
              </Link>
            </li>

            {/* Conditional Login/Logout Link */}
            <li className="nav-item">
              {isLoggedIn ? (
                <button
                  className="nav-link btn text-light"
                  onClick={handleLogout}
                >
                  <FaSignOutAlt className="me-2" size={20} /> Logout
                </button>
              ) : (
                <Link className="text-decoration-none nav-link text-light" to="/login">
                  <FaSignInAlt className="me-2" size={20} /> Login
                </Link>
              )}
            </li>
          </ul>
        </div>
      </div>

      {/* Display search results in a dropdown */}
      {searchResults.length > 0 ? (
        <div
          className="dropdown-menu show"
          style={{
            position: "absolute",
            top: "60px",
            left: "20px",
            width: "auto",
            zIndex: 9999,
            backgroundColor: "#fff",
            borderRadius: "4px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)"
          }}
        >
          {searchResults.map((product) => (
            <Link
              key={product.id}
              className="dropdown-item d-flex align-items-center"
              to={`/product/${product.id}`}
            >
              <img
                src={product.image_url}
                alt={product.name}
                style={{ width: "30px", height: "30px", marginRight: "10px" }}
              />
              {product.name}
            </Link>
          ))}
        </div>
      ) : (
        searchQuery.trim() !== "" && (
          <div
            className="dropdown-menu show"
            style={{
              position: "absolute",
              top: "60px",
              left: "20px",
              width: "auto",
              zIndex: 9999,
              backgroundColor: "#fff",
              borderRadius: "4px",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)"
            }}
          >
            <div className="dropdown-item text-center">
              No products found for "{searchQuery}"
            </div>
          </div>
        )
      )}
    </nav>
  );
};

export default NavbarComponent;
