import React, { useContext } from "react";
import { Link } from "react-router-dom"; // Import Link for navigation
import { userContext } from "../../../Context/Context";
import "./ProductsCard.css";

const ProductsCard = ({ product }) => {
  const { Addtocart, cart } = useContext(userContext); // Get cart from context

  // Check if the product is in the cart
  const isInCart = cart.some((item) => item.id === product.id);

  return (
    <div className="col mb-4">
      <div className="card h-100 shadow-sm border-light rounded">
        {/* Wrap the entire card in Link for navigation */}
        <Link to={`/product/${product.id}`} className="text-decoration-none">
          {/* Product Image */}
          <img
            src={product.image_url}
            className="card-img-top product-image"
            alt={product.name}
          />

          {/* Card Body */}
          <div className="card-body">
            {/* Product Title */}
            <h5 className="card-title">{product.name}</h5>

            {/* Product Description */}
            <p className="card-text">{product.description}</p>
          </div>
        </Link>

        {/* Card Footer */}
        <div className="card-footer d-flex justify-content-between align-items-center">
          {/* Product Price */}
          <h5 className="text-success font-weight-bold">₹{product.price}</h5>

          {/* Conditional Button: Either "Add to Cart" or "View in Cart" */}
          {isInCart ? (
            // "View in Cart" button when the product is in the cart
            <Link to="/cart" className="btn btn-secondary btn-sm">
              View in Cart
            </Link>
          ) : (
            // "Add to Cart" button when the product is not in the cart
            <button
              className="btn btn-primary btn-sm add-to-cart-btn"
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
    </div>
  );
};

export default ProductsCard;
