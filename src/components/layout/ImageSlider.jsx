import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './ImageSlider.css';  // Import custom styles
import {Link}from 'react-router-dom';

const ImageSlider = () => {
  return (
    <>
      {/* Image Slider (Carousel) */}
      <div id="carouselExampleAutoplay" className="carousel slide" data-bs-ride="carousel" data-bs-interval="2000">
        <div className="carousel-inner">
          {/* First slide */}
          <div className="image1 carousel-item active">
            <img
        src="https://img.freepik.com/free-psd/baby-shop-landing-page-template_23-2148741790.jpg"
              className="d-block w-100 carousel-image"https
              alt="Image 1"
            />
          </div>
          {/* Second slide */}
          <div className="image1 carousel-item">
            <img
              src="https://via.placeholder.com/800x400?text=Image+2"
              className="d-block w-100 carousel-image"
              alt="Image 2"
            />
          </div>
          {/* Third slide */}
          <div className="image1 carousel-item">
            <img
              src="https://via.placeholder.com/800x400?text=Image+3"
              className="d-block w-100 carousel-image"
              alt="Image 3"
            />
          </div>
        </div>

        {/* Carousel Controls (Optional) */}
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleAutoplay"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleAutoplay"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      {/* Categories Section */}
      <div className="categories-section text-center mt-5">
        <h2 className="section-title">Explore Categories</h2>
        <div className="row mt-4">
          {/* Example category items */}
          <div className="col-lg-3 col-md-4 col-6 mb-3">
            <Link to="/categories/clothing"><div  className="category-card">
              <img
                src="https://assets.biglots.com/is/image/biglots/810444493"
                alt="Clothing"
                className="category-image img-fluid"
              />
              <h5 className="category-title">Clothing</h5>
            </div>
            </Link>
          </div>
          <div className="col-lg-3 col-md-4 col-6 mb-3">
          <Link to="/categories/toys">
            <div className="category-card">
              <img
                src="https://media.very.co.uk/i/very/UJPQP_SQ2_0000000047_GREEN_SLf?$pdp_300x400_x2$&fmt=jpg"
                alt="Toys"
                className="category-image img-fluid"
              />
              <h5 className="category-title">Toys</h5>
            </div>
            </Link>
          </div>
          <div className="col-lg-3 col-md-4 col-6 mb-3">
          <Link to="/categories/feeding">
            <div className="category-card">
              <img
                src="https://www.consobaby.co.uk/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/w/w/ww1_1/Confetti-Party-Play-Mat-Mothercare-31.png"
                alt="Feeding"
                className="category-image img-fluid"
              />
              <h5 className="category-title">Feeding</h5>
            </div>
            </Link>
          </div>
          <div className="col-lg-3 col-md-4 col-6 mb-3">
          <Link to="/categories/safety">
            <div className="category-card">
              <img
                src="https://ng.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/13/0649791/1.jpg?1642"
                alt="Safety"
                className="category-image img-fluid"
              />
              <h5 className="category-title">Safety</h5>
            </div>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default ImageSlider;
