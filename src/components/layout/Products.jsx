import React, { useState, useEffect } from 'react';
import ProductsCard from './Products/ProductsCard';
import axios from 'axios';

const Products = () => {
  const [products, setProducts] = useState([]);

  
  useEffect(() => {
    axios.get('http://localhost:4000/products').then((res)=>setProducts(res.data))
    .catch((error) => console.error('Error fetching data: ', error));
  
  }, []); 

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-5">Baby Products</h1>
      <div className="row row-cols-1 row-cols-md-3 g-4">
        {products.map((product) => (
          <ProductsCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Products;
