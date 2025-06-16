'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import 'styles/post.css';

export default function DashboardBlogsPage() {
  const [blogs, setBlogs] = useState([]);
  const router = useRouter();

  useEffect(() => {
    fetchBlogs();
  }, []);

  async function fetchBlogs() {
    try {
      const res = await axios.get('http://localhost:5000/api/posts', { withCredentials: true });
      setBlogs(res.data);
    } catch (error) {
      console.error('Error fetching blogs', error);
    }
  }

  async function handleDelete(id) {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        await axios.delete(`http://localhost:5000/api/posts/${id}`, { withCredentials: true });
        fetchBlogs();
      } catch (error) {
        console.error('Error deleting post', error);
      }
    }
  }

  return (
    <div className="post-list-container">
      <button className="create-post-btn" onClick={() => router.push('/dashboard/posts/create')}>
        + Create Post
      </button>

      <h1>All Blogs</h1>
      <table>
  <thead>
    <tr>
      <th>ID</th>
      <th>Title</th>
      <th>Author</th>
      <th>Date</th>
      <th>Body</th>
      <th>Actions</th>
    </tr>
  </thead>
  <tbody>
    {blogs.length > 0 ? (
      blogs.map((blog) => (
        <tr key={blog.id}>
          <td>{blog.id}</td>
          <td>{blog.title}</td>
          <td>{blog.author?.username || "Unknown"}</td>
          <td>{new Date(blog.createdAt).toLocaleString()}</td>
          <td>{blog.body ? blog.body?.substring(0, 50) : <i>(no content)</i>}</td>
          <td>
            <button
              className="action-btn edit-btn"
              onClick={() => router.push(`/dashboard/posts/${blog.id}`)}
            >
              Edit
            </button>
            <button
              className="action-btn delete-btn"
              onClick={() => handleDelete(blog.id)}
            >
              Delete
            </button>
          </td>
        </tr>
      ))
    ) : (
      <tr>
        <td colSpan="6">No blogs found</td>
      </tr>
    )}

  </tbody>
</table>

    </div>
  );
}
