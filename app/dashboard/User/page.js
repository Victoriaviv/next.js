'use client';
import React, { useState } from "react";
import "styles/user.css";

const UsersTable = () => {
  const [users, setUsers] = useState([
    { id: 1, name: "Alice", email: "alice@email.com", role: "User", status: "Active" },
    { id: 2, name: "John", email: "john@email.com", role: "User", status: "Inactive" },
    { id: 3, name: "Emily", email: "emily@email.com", role: "User", status: "Active" },
  ]);

  const toggleStatus = (id) => {
    setUsers(users.map(user =>
      user.id === id
        ? { ...user, status: user.status === "Active" ? "Inactive" : "Active" }
        : user
    ));
  };

  return (
    <div className="users-table-container">
      <h2>User Management</h2>
      <table className="users-table">
        <thead>
          <tr>
            <th>#ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody >
          {users.map(({ id, name, email, role, status }) => (
            <tr key={id}>
              <td>{id}</td>
              <td>{name}</td>
              <td>{email}</td>
              <td>{role}</td>
              <td className={status.toLowerCase()}>{status}</td>
              <td>
                <button
                  className={status === "Active" ? "deactivate-btn" : "activate-btn"}
                  onClick={() => toggleStatus(id)}
                >
                  {status === "Active" ? "Deactivate" : "Activate"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersTable;
