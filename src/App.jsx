import React from "react";
import { Routes, Route} from "react-router-dom";
import SignUP from "./components/SignUp";
import Login from "./components/Login";
import Layout from "./components/Layout";
import Home from "./components/layout/Home";
import Cart from "./components/Cart";
import ProductDetails from "./components/layout/Products/ProductsDetails";
import Clothing from "./components/category/Clothing";
import Toys from "./components/category/Toys";
import Feeding from "./components/category/Feeding";
import Safety from "./components/category/Safety";
import OrderDetails from "./components/layout/orderSummery/OrderDetails";
import OrderSummary from "./components/layout/orderSummery/OrderSummery";
import Payment from "./components/layout/orderSummery/Payment";
import Orders from "./components/Orders";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/categories/clothing" element={<Clothing/>}/>
          <Route path="/categories/toys" element={<Toys/>}/>
          <Route path="/categories/feeding" element={<Feeding/>}/>
          <Route path="/categories/safety" element={<Safety/>}/>

        </Route>
        <Route path="/order-details" element={<OrderDetails/>} />
        <Route path="/order-summary" element={<OrderSummary/>} />
        <Route path="/payment" element={< Payment/>} />
        <Route path="/cart" element={<Cart/>} />
        <Route path="/signUP" element={<SignUP />} />
        <Route path="/login" element={<Login />} />
        <Route path='/product/:productId' element={<ProductDetails/>}/>
        <Route path='/orders' element={<Orders/>}/>
      </Routes>
    </>
  );
}

export default App;
