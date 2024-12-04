import React, { useState, createContext, useEffect } from "react";
import axios from "axios";

export const userContext = createContext();

function Context({ children }) {
  const id = localStorage.getItem("id");
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState([]);
  const [order, setOrder] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:4000/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.log("Error fetching products:", err));
  }, []);

  useEffect(() => {
    if (!id) return; 
      axios
        .get(`http://localhost:4000/users/${id}`)
        .then((res) =>{
          setCart(res.data.cart);
          setOrder(res.data?.order)

        } )
        .catch((err) => console.log("Error fetching cart data:", err));
    
  }, [id]);
 

  const Addtocart = async (product) => {
    const existcart = cart.find((item) => item.id === product.id);
    if (existcart) return;

    try {
      product.quantity = 1;
      const updatedCart = [...cart, product];

      await axios.patch(`http://localhost:4000/users/${id}`, {
        cart: updatedCart,
      });

      setCart(updatedCart);
      console.log("Product added to cart:", product);
    } catch (error) {
      console.log("Error adding to cart:", error);
    }
  };

  const RemoveCart = async (cartId) => {
    try {
      const updatedCart = cart?.filter((item) => item.id !== cartId);

      await axios.patch(`http://localhost:4000/users/${id}`, {
        cart: updatedCart,
      });

      setCart(updatedCart);
      console.log("Item removed from cart:", cartId);
    } catch (error) {
      console.log("Error removing from cart:", error);
    }
  };

  const updatedquantity = async (product, num) => {
    console.log("Current Cart before update:", cart);

    if (num === -1 && product.quantity === 1) return;

    const newCart = cart?.map((item) =>
      item.id === product.id ? { ...item, quantity: item.quantity + num } : item
    );

    console.log("Updated Cart:", newCart);

    try {
      const response = await axios.patch(`http://localhost:4000/users/${id}`, {
        cart: newCart,
      });

      if (response.status === 200) {
        setCart(newCart);
        console.log("Cart successfully updated on the backend.");
      } else {
        console.error("Failed to update cart on the backend:", response);
      }
    } catch (error) {
      console.log("Error updating quantity:", error);
    }
  };
  const totalAmount = cart?.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <userContext.Provider
      value={{
        cart,
        setCart,
        Addtocart,
        RemoveCart,
        updatedquantity,
        order,
        totalAmount,
        products
      }}
    >
      {children}
    </userContext.Provider>
  );
}

export default Context;
