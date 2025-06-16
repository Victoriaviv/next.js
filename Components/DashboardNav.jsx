'use client';

import React from 'react';
import "../styles/dashboardnav.css";

const DashboardNav = () => {
  return (
    <div className="navbar">
      <div className="logo">My Dashboard</div>
      <div className="nav-actions">
        {/* <button>Notifications</button>
        <button>Profile</button> */}
      </div>
    </div>
  );
};

export default DashboardNav;
