// src/app/profile/ProfilePage.jsx
'use client';

import React, { useEffect, useState } from 'react';
import ChangePass from 'Components/changePass';
import axios from 'axios';
import { useAuth } from 'context/AuthContext';

function ProfilePage() {
  const { auth } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    if (auth?.token) {
      fetchProfile();
    }
  }, [auth]);

  async function fetchProfile() {
    try {
      const res = await axios.get('http://localhost:5000/api/profile', {
        headers: { Authorization: `Bearer ${auth?.token}` }
      });
      setProfile(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }
  
  if (loading) return <div>Loading...</div>;
  if (!profile) return <div>Not authenticated</div>;
  
  return (
    <div>
      <img src={profile.image} alt="profile" style={{width:'100px'}} />
      <p>Email: {profile.email}</p>
      <p>Username: {profile.username}</p>
      <p>Role: {profile.role}</p>

      {/* Change password form */}
      <ChangePass token={auth?.token} />
    </div>
  )
}

export default ProfilePage;
