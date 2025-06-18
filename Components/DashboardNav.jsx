'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import "../styles/dashboardnav.css";

const DashboardNav = () => {
  const router = useRouter();

  return (
    <div className="navbar">
      <div className="logo">My Dashboard</div>
      <div className="nav-actions">
        <button onClick={() => router.push('/notifications')}>Notifications</button>
        <button onClick={() => router.push('/profile')}>Profile</button>
      </div>
    </div>
  );
};

export default DashboardNav;
