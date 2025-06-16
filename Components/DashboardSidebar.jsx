'use client';
import React from "react";
import { FaHome, FaFileAlt, FaComments, FaUsers, FaSignOutAlt } from "react-icons/fa";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import "styles/sidebar.css"; 
import axios from "axios";

const DashboardSidebar = () => {
  const router = useRouter();

 

  return (
    <div className="sidebar">
    
      <ul>
        <li><Link href="/dashboard/home"><FaHome /> Home</Link></li>
        <li><Link href="/dashboard/posts"><FaFileAlt /> Posts</Link></li>
        <li><Link href="/dashboard/User"><FaUsers /> Users</Link></li>
        <li><Link href="/dashboard/logout"><FaSignOutAlt /> Logout</Link></li>
        </ul>
    </div>
  );
};

export default DashboardSidebar;
