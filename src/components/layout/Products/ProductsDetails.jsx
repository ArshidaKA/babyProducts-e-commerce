
import React, { useEffect, useState, useContext } from "react";
import { useParams, Link, useNavigate } from "react-router-dom"; 
import { MdArrowBack } from "react-icons/md";
import "./ProductDetails.css";
import { userContext } from "../../../Context/Context";

const ProductDetails = () => {
  const { productId } = useParams(); 
  const [product, setProduct] = useState(null);
  const { Addtocart, cart = [] } = useContext(userContext); 
  const navigate = useNavigate(); 

  
  const isInCart = cart.some((item) => item.id === productId);

  useEffect(() => {
    
    const fetchProduct = async () => {
      const response = await fetch(`http://localhost:4000/products/${productId}`);
      const data = await response.json();
      setProduct(data);
    };

    fetchProduct();
  }, [productId]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mt-5">

      <button
        className="btn btn-link position-absolute top-0 start-0 ms-3 mt-3"
        onClick={() => navigate(-1)}
        style={{
          fontSize: "1.5rem",
          color: "#007bff",
          padding: "0.25rem 0.5rem",
        }}
      >
        <MdArrowBack />
      </button>


      <div className="product-details">
        <img
          src={product.image_url}
          alt={product.name}
          className="product-details-image img-fluid"
        />
        <h2>{product.name}</h2>
        <p>{product.description}</p>
        <h3>Price: ₹{product.price}</h3>


        {isInCart ? (
        
          <Link to="/cart" className="btn btn-secondary">
            View in Cart
          </Link>
        ) : (
          
          <button
            className="btn btn-primary"
            onClick={(e) => {
              e.stopPropagation(); 
              alert(`${product.name} added to cart!`);
              Addtocart(product); 
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
