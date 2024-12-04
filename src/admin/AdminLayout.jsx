import React from "react";
import Sidebar from "./AdminLayout/SideBar";
import Navbar from "./AdminLayout/AdminNavbar";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <div>
      <Sidebar />
      <Navbar />
    
      <div
        className="content-area"
        style={{
          marginTop: "60px", // to make space for navbar
          marginLeft: "250px", // to align with the sidebar width
        }}
      >
        <Outlet/>
      
      </div>
    </div>
  );
};

export default AdminLayout;
