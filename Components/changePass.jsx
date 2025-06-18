// src/components/ChangePass.jsx
'use client';

import React, { useState } from 'react';
import axios from 'axios';
import { Notify } from 'notiflix';
import 'styles/changepass.css';

function ChangePass({ token }) {
  const [prevPass, setPrevPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleChange(e) {
    e.preventDefault();

    if (!prevPass || !newPass) {
      Notify.failure('All fields are required');
      return;
    }
    setLoading(true);
    try {
      await axios.post('http://localhost:5000/api/users/change-password', 
        { prevPass, newPass },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      Notify.success('Password changed successfully');
      setPrevPass('');
      setNewPass('');
    } catch (err) {
      console.error(err);
      Notify.failure('Error changing password');
    } finally {
      setLoading(false);
    }
  }
  
  return (
    <form onSubmit={handleChange} className="changepass-form">
      <h2>Change Password</h2>
      <input
        type="password"
        placeholder="Current password"
        onChange={(e) => setPrevPass(e.target.value)}
        value={prevPass}
        required
      />
      <input
        type="password"
        placeholder="New password"
        onChange={(e) => setNewPass(e.target.value)}
        value={newPass}
        required
      />
      <button disabled={loading}>
        {loading ? 'Changing...' : 'Change Password'}
      </button>
    </form>
  )
}

export default ChangePass;
