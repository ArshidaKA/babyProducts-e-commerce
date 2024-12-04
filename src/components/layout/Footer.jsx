import React from 'react';
import './Footer.css'

function Footer() {
  return (
    <footer className="bg-dark text-light py-5">
      <div className="container">
        <div className="row">
        
          <div className="col-md-3 mb-4">
            <h4 className="text-uppercase mb-3">BabyBliss</h4>
            <p>Your trusted store for all baby products. Find the best baby essentials for your little one.</p>
          </div>

        
          <div className="col-md-3 mb-4">
            <h5 className="text-uppercase mb-3">Quick Links</h5>
            <ul className="list-unstyled">
              <li><a href="/" className="text-light">Home</a></li>
              <li><a href="/products" className="text-light">Products</a></li>
              <li><a href="/about" className="text-light">About Us</a></li>
              <li><a href="/contact" className="text-light">Contact</a></li>
            </ul>
          </div>

  
          <div className="col-md-3 mb-4">
            <h5 className="text-uppercase mb-3">Follow Us</h5>
            <div>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-icon me-3">
                <i className="fab fa-facebook-square"></i>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-icon me-3">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-icon me-3">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-icon">
                <i className="fab fa-linkedin"></i>
              </a>
            </div>
          </div>

          
          <div className="col-md-3 mb-4">
            <h5 className="text-uppercase mb-3">Subscribe to Our Newsletter</h5>
            <form>
              <div className="mb-2">
                <input type="email" className="form-control" placeholder="Enter your email" required />
              </div>
              <button type="submit" className="btn btn-success w-100">Subscribe</button>
            </form>
          </div>
        </div>

  
        <div className="row mt-4 border-top pt-3">
          <div className="col-12 text-center">
            <p className="mb-0">&copy; 2024 BabyBliss. All Rights Reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
