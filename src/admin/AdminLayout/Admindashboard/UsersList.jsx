import React, { useState, useEffect } from "react";
import axios from "axios";

function Users() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:4000/users");
        setUsers(response.data.slice(1)); // Fetch all users from db.json
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

  const toggleBlockUser = async (userId, isBlocked) => {
    try {
      await axios.patch(`http://localhost:4000/users/${userId}`, {
        blocked: !isBlocked,
      });

      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === userId ? { ...user, blocked: !isBlocked } : user
        )
      );
    } catch (error) {
      console.error("Error toggling block status:", error);
    }
  };

  const handleRowClick = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  return (
    <div className="container mt-4">
      <h1 className="mb-4 text-center">User Management</h1>
      {users.length === 0 ? (
        <div className="alert alert-info text-center">No users available</div>
      ) : (
        <table className="table table-bordered table-hover text-center">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} onClick={() => handleRowClick(user)} className="clickable-row">
                <td>{user.id}</td>
                <td>{user.email}</td>
                <td>
                  <button
                    className={`btn ${user.blocked ? "btn-success" : "btn-danger"} btn-sm`}
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleBlockUser(user.id, user.blocked);
                    }}
                  >
                    {user.blocked ? "Unblock" : "Block"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Modal */}
      {showModal && selectedUser && (
        <div
          className="modal fade show d-block"
          style={{ background: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header bg-primary text-white">
                <h5 className="modal-title">User Details</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <p>
                  <strong>ID:</strong> {selectedUser.id}
                </p>
                <p>
                  <strong>Username:</strong> {selectedUser.username}
                </p>
                <p>
                  <strong>Email:</strong> {selectedUser.email}
                </p>
                <div>
                  <strong>Orders:</strong>{" "}
                  {selectedUser.order?.length > 0 ? (
                    selectedUser.order.map((o, idx) => (
                      <div key={idx} className="mb-3">
                        <p>
                          <strong>Order #{idx + 1}</strong>
                        </p>
                        <ul className="list-group">
                          {o.cartitems.map((item, index) => (
                            <li key={index} className="list-group-item d-flex align-items-center">
                              <img
                                src={item.image_url}
                                alt={item.name}
                                className="me-2"
                                style={{ width: "50px", height: "50px" }}
                              />
                              <span>
                                {item.name} - ${item.price} x {item.quantity}
                              </span>
                            </li>
                          ))}
                        </ul>
                        <p className="mt-2">
                          <strong>Total Amount:</strong> ${o.totalAmount}
                        </p>
                      </div>
                    ))
                  ) : (
                    <p>No orders</p>
                  )}
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowModal(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Users;
