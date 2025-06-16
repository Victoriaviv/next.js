'use client';
import React, { useState, useEffect } from 'react';
import 'styles/home.css';

const DashboardHome = () => {
  const [stats, setStats] = useState({ blogs: 0, published: 0, drafts: 0, users: 0 });
  const [recentActivity, setRecentActivity] = useState([]);

  useEffect(() => {
    // 1. Fetch statistics from your API
    fetch('/api/dashboard/User')
      .then((res) => res.json()) // make sure your API responds with { blogs, published, drafts, users }
      .then((data) => setStats(data))
      .catch((err) => console.error(err));

    // 2. Fetch recent activity from your API
    fetch('/api/dashboard/recent-activity')
      .then((res) => res.json()) // make sure your API responds with an array of messages
      .then((data) => setRecentActivity(data))
      .catch((err) => console.error(err));

  }, []);

  return (
    <div className="dashboard-home">
      <h2>Dashboard Overview</h2>
      <div className="summary-cards">
        <div className="card">
          <div className="card-title">Total Blogs</div>
          <div className="card-value">{stats.blogs}</div>
        </div>
        <div className="card">
          <div className="card-title">Published</div>
          <div className="card-value">{stats.published}</div>
        </div>
        <div className="card">
          <div className="card-title">Drafts</div>
          <div className="card-value">{stats.drafts}</div>
        </div>
        <div className="card">
          <div className="card-title">Users</div>
          <div className="card-value">{stats.users}</div>
        </div>
      </div>

      <div className="recent-section">
        <h3>Recent Activity</h3>
        <ul>
          {recentActivity.length > 0 ? (
            recentActivity.map((item, idx) => <li key={idx}>{item}</li>)
          ) : (
            <li>Loading...</li>
          )}

        </ul>
      </div>
    </div>
  )
};

export default DashboardHome;
