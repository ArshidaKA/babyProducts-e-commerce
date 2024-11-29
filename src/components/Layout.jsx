import React from 'react';
import { Outlet } from 'react-router-dom';
import NavbarComponent from './layout/Navbar';
import Footer from './layout/Footer';


function Layout() {
  return (
    <div>
      <NavbarComponent/>
      <Outlet/>
      <Footer/>
      
    </div>
  )
}

export default Layout
