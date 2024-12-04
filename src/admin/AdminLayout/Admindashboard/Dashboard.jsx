import React, { useEffect, useState } from "react";
import axios from "axios";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, CategoryScale } from "chart.js";

// Register chart.js components
ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale);

function Dashboard() {
  const [stats, setStats] = useState({
    products: 0,
    stocks: 0,
    users: 0,
    sales: 0,
    totalOrders: 0,
    blockedUsers: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch products and users data
        const productsResponse = await axios.get("http://localhost:4000/products");
        const usersResponse = await axios.get("http://localhost:4000/users");

        // Calculate total orders and sales
        const allOrders = usersResponse.data.flatMap((user) => user.order || []);
        const totalSales = allOrders.reduce((acc, order) => acc + order.totalAmount, 0);
        const totalOrders = allOrders.length;

        // Calculate total stocks
        const totalStocks = productsResponse.data.reduce((acc, product) => acc + parseInt(product.stock), 0);

        // Calculate blocked users count
        const blockedUsers = usersResponse.data.filter((user) => user.blocked).length;

        // Update state
        setStats({
          products: productsResponse.data.length,
          users: usersResponse.data.length,
          sales: totalSales,
          stocks: totalStocks,
          totalOrders: totalOrders,
          blockedUsers: blockedUsers,
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Prepare Pie Chart data
  const pieData = {
    labels: ["Products", "Stocks", "Users", "Blocked Users"],
    datasets: [
      {
        data: [
          stats.products,
          stats.stocks,
          stats.users,
          stats.blockedUsers
        ],
        backgroundColor: ["#4e73df", "#1cc88a", "#f6c23e", "#e74a3b"],
        hoverBackgroundColor: ["#2e59d9", "#17a673", "#f1b32e", "#e14c32"],
        hoverBorderColor: "#fff",
      },
    ],
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4 fw-bold text-primary">Admin Dashboard</h1>
      <div className="row g-4">
        {/* Dashboard Cards */}
        <div className="col-md-3">
          <div className="card shadow-lg border-0">
            <div className="card-body text-center">
              <div className="icon-circle bg-primary text-white mb-3">
                <i className="bi bi-box-seam fs-1"></i>
              </div>
              <h4 className="card-title">Total Products</h4>
              <p className="card-text display-6">{stats.products}</p>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card shadow-lg border-0">
            <div className="card-body text-center">
              <div className="icon-circle bg-success text-white mb-3">
                <i className="bi bi-stack fs-1"></i>
              </div>
              <h4 className="card-title">Total Stocks</h4>
              <p className="card-text display-6">{stats.stocks}</p>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card shadow-lg border-0">
            <div className="card-body text-center">
              <div className="icon-circle bg-warning text-white mb-3">
                <i className="bi bi-people fs-1"></i>
              </div>
              <h4 className="card-title">Total Users</h4>
              <p className="card-text display-6">{stats.users}</p>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card shadow-lg border-0">
            <div className="card-body text-center">
              <div className="icon-circle bg-danger text-white mb-3">
                <i className="bi bi-cash-coin fs-1"></i>
              </div>
              <h4 className="card-title">Total Revenue</h4>
              <p className="card-text display-6">${stats.sales.toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card shadow-lg border-0">
            <div className="card-body text-center">
              <div className="icon-circle bg-info text-white mb-3">
                <i className="bi bi-cart-check fs-1"></i>
              </div>
              <h4 className="card-title">Total Orders</h4>
              <p className="card-text display-6">{stats.totalOrders}</p>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card shadow-lg border-0">
            <div className="card-body text-center">
              <div className="icon-circle bg-secondary text-white mb-3">
                <i className="bi bi-person-x fs-1"></i>
              </div>
              <h4 className="card-title">Blocked Users</h4>
              <p className="card-text display-6">{stats.blockedUsers}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Pie Chart */}
      <div className="row justify-content-center mt-5">
        <div className="col-md-6">
          <div className="card shadow-lg border-0">
            <div className="card-body text-center">
              <h4 className="card-title">Statistics Breakdown</h4>
              <Pie data={pieData} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
