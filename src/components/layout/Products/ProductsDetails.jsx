import React, { useEffect, useState, useContext } from "react";
import { useParams, Link } from "react-router-dom"; // For getting dynamic route params
import "./ProductDetails.css"; // Style as needed
import { userContext } from "../../../Context/Context";

const ProductDetails = () => {
  const { productId } = useParams(); // Get product ID from the URL
  const [product, setProduct] = useState(null);
  const { Addtocart, cart=[] } = useContext(userContext); // Get cart and Addtocart from context

  // Check if the product is in the cart
  const isInCart = cart.some((item) => item.id === productId);

  useEffect(() => {
    // Fetch product details based on productId
    const fetchProduct = async () => {
      const response = await fetch(`http://localhost:4000/products/${productId}`);
      const data = await response.json();
      setProduct(data);
    };

    fetchProduct();
  }, [productId]);

  if (!product) {
    return <div>Loading...</div>; // Handle loading state
  }

  return (
    <div className="container">
      <div className="product-details">
        <img
          src={product.image_url}
          alt={product.name}
          className="product-details-image"
        />
        <h2>{product.name}</h2>
        <p>{product.description}</p>
        <h3>Price: ₹{product.price}</h3>

        {/* Conditional Button: Either "Add to Cart" or "View in Cart" */}
        {isInCart ? (
          // "View in Cart" button when the product is in the cart
          <Link to="/cart" className="btn btn-secondary">
            View in Cart
          </Link>
        ) : (
          // "Add to Cart" button when the product is not in the cart
          <button
            className="btn btn-primary"
            onClick={(e) => {
              e.stopPropagation(); // Prevent the click from propagating to the Link
              alert(`${product.name} added to cart!`);
              Addtocart(product); // Add the product to the cart
            }}
          >
            Add to Cart
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
