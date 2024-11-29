import React from 'react';
import Products from './Products';

function Home() {
  return (
    <div>
      {/* <div className="p-5 ">  {/* Add padding using Bootstrap class 
        <img
          src="https://cdn0.desidime.com/cdn-cgi/image/fit=contain,f=auto,onerror=redirect,w=1200,h=675,q=90/attachments/photos/678619/original/Baby-Product.jpg"
          alt="Featured Product"
          className="img-fluid"  // This will make the image responsive
          style={{
            objectFit: 'cover',  // Ensures the image covers the container without distortion
            width: '1200px',  // Makes the image stretch across the full width
            height: 600, 
            marginLeft:40// Keeps the aspect ratio intact
          }}
        />
      </div> */}
      <Products />
    </div>
  );
}

export default Home;
