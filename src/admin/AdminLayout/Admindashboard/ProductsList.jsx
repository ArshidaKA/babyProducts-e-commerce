import { useState, useEffect } from 'react';
import axios from 'axios';

const ProductsList = () => {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [currentProduct, setCurrentProduct] = useState(null);

  
  useEffect(() => {
    axios.get('http://localhost:4000/products').then(response => {
      setProducts(response.data);
    });
  }, []);

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const openModal = (type, product = null) => {
    setModalType(type);
    setCurrentProduct(product);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setCurrentProduct(null);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const productData = Object.fromEntries(formData.entries());

    if (modalType === 'add') {
      axios.post('http://localhost:4000/products', productData)
        .then(response => {
          setProducts([...products, response.data]);
          closeModal();
        });
    } else if (modalType === 'edit') {
      axios.put(`http://localhost:4000/products/${currentProduct.id}`, productData)
        .then(response => {
          setProducts(products.map(p => p.id === currentProduct.id ? response.data : p));
          closeModal();
        });
    }
  };

  const handleDelete = (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      axios.delete(`http://localhost:4000/products/${productId}`)
        .then(() => {
          setProducts(products.filter(product => product.id !== productId));
        })
        .catch(error => {
          console.error('Error deleting product:', error);
          alert('Failed to delete product.');
        });
    }
  };

  return (
    <div>
      <h1>Products</h1>

  
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <div>
          <label htmlFor="category" style={{ marginRight: '10px' }}>Category:</label>
          <select id="category" value={selectedCategory} onChange={handleCategoryChange}>
            <option value="All">All</option>
            <option value="Feeding">Feeding</option>
            <option value="Safety">Safety</option>
            <option value="Toys">Toys</option>
            <option value="Clothing">Clothing</option>
          </select>
        </div>

        <button
          onClick={() => openModal('add')}
          style={{
            padding: '10px 20px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          Add Product
        </button>
      </div>

      <table border="1" style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Image</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products
            .filter(product => selectedCategory === 'All' || product.category === selectedCategory)
            .map(product => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>{product.description}</td>
                <td>
                  <img src={product.image_url} alt={product.name} style={{ width: '50px', height: '50px' }} />
                </td>
                <td>{product.price}</td>
                <td>{product.stock}</td>
                <td>
                  <button onClick={() => openModal('edit', product)}>Edit</button>
                  <button onClick={() => handleDelete(product.id)}>Delete</button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>


      {showModal && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <div
            style={{
              backgroundColor: 'white',
              padding: '20px',
              borderRadius: '5px',
              width: '400px',
              boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)',
            }}
          >
            <h2>{modalType === 'add' ? 'Add Product' : 'Edit Product'}</h2>
            <form onSubmit={handleFormSubmit}>
              <div style={{ marginBottom: '10px' }}>
                <label>Name:</label>
                <input
                  type="text"
                  name="name"
                  defaultValue={modalType === 'edit' ? currentProduct.name : ''}
                  required
                  style={{ width: '100%' }}
                />
              </div>
              <div style={{ marginBottom: '10px' }}>
                <label>Description:</label>
                <textarea
                  name="description"
                  defaultValue={modalType === 'edit' ? currentProduct.description : ''}
                  required
                  style={{ width: '100%' }}
                />
              </div>
              <div style={{ marginBottom: '10px' }}>
                <label>Image URL:</label>
                <input
                  type="url"
                  name="image_url"
                  defaultValue={modalType === 'edit' ? currentProduct.image_url : ''}
                  required
                  style={{ width: '100%' }}
                />
              </div>
              <div style={{ marginBottom: '10px' }}>
                <label>Price:</label>
                <input
                  type="number"
                  name="price"
                  defaultValue={modalType === 'edit' ? currentProduct.price : ''}
                  required
                  style={{ width: '100%' }}
                />
              </div>
              <div style={{ marginBottom: '10px' }}>
                <label>Stock:</label>
                <input
                  type="number"
                  name="stock"
                  defaultValue={modalType === 'edit' ? currentProduct.stock : ''}
                  required
                  style={{ width: '100%' }}
                />
              </div>
              <button type="submit" style={{ marginRight: '10px' }}>Save</button>
              <button type="button" onClick={closeModal}>Cancel</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductsList;
