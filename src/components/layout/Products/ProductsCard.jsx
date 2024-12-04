import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { userContext } from "../../../Context/Context";
import "./ProductsCard.css";

const ProductsCard = ({ product }) => {
  const { Addtocart, cart = [] } = useContext(userContext);

  const isInCart = cart.some((item) => item.id === product.id);

  return (
    <div className="col mb-4">
      <div className="card cardsize shadow-sm border-light rounded">
        <Link to={`/product/${product.id}`} className="text-decoration-none">
          <img
            src={product.image_url}
            className="card-img-top product-image"
            alt={product.name}
          />

          <div className="card-body">
            <h5 className="card-title">{product.name}</h5>

            <p className="card-text">{product.description}</p>
          </div>
        </Link>

        <div className="card-footer d-flex justify-content-between align-items-center">
          <h5 className="text-success font-weight-bold">₹{product.price}</h5>

          {isInCart ? (
            <Link to="/cart" className="btn btn-secondary btn-sm">
              View in Cart
            </Link>
          ) : (
            <button
              className="btn btn-primary btn-sm add-to-cart-btn change"
              onClick={(e) => {
                e.stopPropagation();
            
                Addtocart(product);
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
