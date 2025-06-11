'use client';
import React from 'react';
// import './DashboardSidebar.css';
import Link from 'next/link';

const DashboardSidebar = () => {
  return (
    <aside className="dashboard-sidebar">
      <ul>
        <li><Link href="/dashboard">Dashboard</Link></li>
        <li><Link href="/dashboard/projects">Projects</Link></li>
        <li><Link href="/dashboard/blog">Blog</Link></li>
        <li><Link href="/dashboard/profile">Profile</Link></li>
      </ul>
    </aside>
  );
};

export default DashboardSidebar;
