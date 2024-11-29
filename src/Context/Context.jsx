import React, { useState, createContext, useEffect } from "react";
import axios from "axios";

export const userContext = createContext();

function Context({ children }) {
  const id = localStorage.getItem("id"); // User ID from localStorage
  const [cart, setCart] = useState([]); // Cart state
  const [products, setProducts] = useState([]); // Products state
  const[order,setOrder]=useState([])

  // Fetch products on initial load
  useEffect(() => {
    axios
      .get("http://localhost:4000/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.log("Error fetching products:", err));
  }, []);

  // Fetch the user's cart when the component mounts
  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:4000/users/${id}`)
        .then((res) => setCart(res.data.cart)) // Set cart data from server
        .catch((err) => console.log("Error fetching cart data:", err));
    }
  }, [id]); // Re-run when id changes (if needed)
  useEffect(()=>{
    axios.get(`http://localhost:4000/users/${id}`)
    .then((res=>{
        setOrder(res.data?.order)
    }))
    .catch((error)=>{
        console.log(error)
    })
  },[])

  // Function to add item to cart
  const Addtocart = async (product) => {
    
    const existcart = cart.find((item) => item.id === product.id);
    if (existcart) return; // Prevent adding duplicate products to the cart

    try {
      product.quantity = 1; // Initialize quantity to 1
      const updatedCart = [...cart, product]; // Add product to cart array

      // Send PATCH request to update cart on the server
      await axios.patch(`http://localhost:4000/users/${id}`, {
        cart: updatedCart, // Update cart in the backend
      });

      // Update the frontend cart state
      setCart(updatedCart);
      console.log("Product added to cart:", product);
    } catch (error) {
      console.log("Error adding to cart:", error);
    }
  };

  // Function to remove an item from cart
  const RemoveCart = async (cartId) => {
    try {
      const updatedCart = cart?.filter((item) => item.id !== cartId); // Filter out item by ID

      // Send PATCH request to update cart on the server
      await axios.patch(`http://localhost:4000/users/${id}`, {
        cart: updatedCart, // Update cart in the backend
      });

      // Update the frontend cart state
      setCart(updatedCart);
      console.log("Item removed from cart:", cartId);
    } catch (error) {
      console.log("Error removing from cart:", error);
    }
  };

  // Function to update product quantity in cart
  const updatedquantity = async (product, num) => {
    console.log("Current Cart before update:", cart); // Log the current cart

    if (num === -1 && product.quantity === 1) return; // Don't decrease below 1

    // Update the cart locally (optimistic update)
    const newCart = cart?.map((item) =>
      item.id === product.id ? { ...item, quantity: item.quantity + num } : item
    );

    console.log("Updated Cart:", newCart); // Log the updated cart

    try {
      // Send PATCH request to JSON Server to update the cart
      const response = await axios.patch(`http://localhost:4000/users/${id}`, {
        cart: newCart, // Send updated cart to backend
      });

      // Check if the backend responded successfully
      if (response.status === 200) {
        setCart(newCart); // Update frontend cart state
        console.log("Cart successfully updated on the backend.");
      } else {
        console.error("Failed to update cart on the backend:", response);
      }
    } catch (error) {
      console.log("Error updating quantity:", error);
    }
  };
  const totalAmount = cart?.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <userContext.Provider
      value={{ cart, setCart, Addtocart, RemoveCart,updatedquantity,order ,totalAmount}}
    >
      {children}
    </userContext.Provider>
  );
}

export default Context;
