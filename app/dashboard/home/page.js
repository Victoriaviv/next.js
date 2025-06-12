'use client';
import React from 'react';
import 'styles/home.css'

const DashboardHome = () => (
  <div className="dashboard-home">
    <h2>Dashboard Overview</h2>
    <div className="summary-cards">
      <div className="card">
        <div className="card-title">Total Blogs</div>
        <div className="card-value">15</div>
      </div>
      <div className="card">
        <div className="card-title">Published</div>
        <div className="card-value">10</div>
      </div>
      <div className="card">
        <div className="card-title">Drafts</div>
        <div className="card-value">5</div>
      </div>
      <div className="card">
        <div className="card-title">Users</div>
        <div className="card-value">32</div>
      </div>
    </div>

    <div className="recent-section">
      <h3>Recent Activity</h3>
      <ul>
        <li>New post published: “Green Energy Trends”</li>
        <li>Admin approved 3 comments</li>
        <li>New user registered: John Doe</li>
      </ul>
    </div>
  </div>
);

export default DashboardHome;
