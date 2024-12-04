import React, { useState, useEffect } from "react";
import axios from "axios";

function BlockList() {
  const [blocked, setBlocked] = useState([]);

  useEffect(() => {
    const fetchBlockedUsers = async () => {
      try {
        const response = await axios.get("http://localhost:4000/users");
        const blockedUsers = response.data.filter((user) => user.blocked === true);
        setBlocked(blockedUsers);
      } catch (error) {
        console.error("Error fetching blocked users:", error);
      }
    };

    fetchBlockedUsers();
  }, []);

  const handleUnblock = async (id) => {
    try {
      await axios.patch(`http://localhost:4000/users/${id}`, { blocked: false })
      setBlocked((prevBlocked) => prevBlocked.filter((user) => user.id !== id));
    } catch (error) {
      console.error("Error unblocking user:", error);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center">Blocked Users</h2>
      {blocked.length > 0 ? (
        <table className="table table-bordered table-striped">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {blocked.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.email}</td>
                <td>
                  <button
                    className="btn btn-success"
                    onClick={() => handleUnblock(user.id)}
                  >
                    Unblock
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-center text-muted">No blocked users found.</p>
      )}
    </div>
  );
}

export default BlockList;
