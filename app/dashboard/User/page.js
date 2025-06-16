'use client';

import React, { useEffect, useState } from "react";
import axios from "axios";
import 'styles/user.css';

export default function DashboardUsersPage() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchUsers() {
      const token = localStorage.getItem("userToken");
      if (!token) {
        setError("No token found, please login");
        return;
      }

      try {
        const res = await axios.get("http://localhost:5000/api/users", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setUsers(res.data);
        setError(null);
      } catch (error) {
        console.error("Error fetching users", error);
        setError(error.response?.data?.message || "Failed to fetch users");
      }
    }
    fetchUsers();
  }, []);

  return (
    <div>
      <h1>All Registered Users</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Email</th>
            <th>Role</th>
            <th>Created At</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.role || "Not defined"}</td>
                <td>{new Date(user.createdAt).toLocaleString()}</td>
              </tr>
            ))
          ) : (
            !error && (
              <tr>
                <td colSpan="5">No users found</td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  )
}
