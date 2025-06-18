'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import 'styles/post.css';

export default function DashboardBlogsPage() {
  const [blogs, setBlogs] = useState([]);
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [comments, setComments] = useState([]);
  const router = useRouter();

  useEffect(() => {
    fetchBlogs();
  }, []);

  async function fetchBlogs() {
    try {
      const token = localStorage.getItem('userToken');
      const { data } = await axios.get('http://localhost:5000/api/posts', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setBlogs(data);
    } catch (error) {
      console.error('Error fetching blogs!', error);
    }
  }

  function handleDelete(id) {
    if (!window.confirm('Are you sure you want to delete this post?')) return;
  
    const token = localStorage.getItem('userToken');
  
    axios.delete(`http://localhost:5000/api/posts/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(fetchBlogs)
      .catch(console.error);
  }
  async function openComments(postId) {
    setSelectedPostId(postId);
    // Mock comments until backend is ready
    setComments([
      { id: 'c1', username: 'alice', comment: 'Love this post!', createdAt: '2025-06-18T09:15:00Z' },
      { id: 'c2', username: 'bob', comment: 'Very insightful.', createdAt: '2025-06-18T10:30:00Z' },
    ]);

    // TODO: Replace with real API call:
    // const { data } = await axios.get(`/api/posts/${postId}/comments`, { withCredentials: true });
    // setComments(data.comments);
  }

  return (
    <div className="post-list-container">
      <button
        className="create-post-btn"
        onClick={() => router.push('/dashboard/posts/create')}
      >
        + Create Post
      </button>

      <h1>All Posts</h1>
      <table>
        <thead>
          <tr>
            <th>Thumbnail</th><th>Title</th><th>Author</th><th>Summary</th>
            <th>Category</th><th>Tags</th><th>Published</th>
            <th>Comments</th><th>Likes</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {blogs.length > 0 ? blogs.map((blog) => (
            <tr key={blog.id}>
              <td>{blog.projectImage ?
                <img
                src={post.coverImage || "/default-cover.jpg"}
                alt="Cover"
                className="w-full h-40 object-cover"
              /> :
                <i>No image</i>
              }</td>
              <td>{blog.title}</td>
              <td>{blog.author?.username || "Unknown"}</td>
              <td>{blog.summary?.substring(0, 60)}</td>
              <td>{blog.category}</td>
              <td>{(blog.tags || []).join(', ')}</td>
              <td>{new Date(blog.time_published).toLocaleString()}</td>
              <td>
                <button onClick={() => openComments(blog.id)}>
                  {blog.commentsCount || 0} Comments
                </button>
              </td>
              <td>{blog.likesCount || 0}</td>
              <td>
                <button onClick={() => router.push(`/dashboard/posts/${blog.id}`)} className="action-btn edit-btn">Edit</button>
                <button onClick={() => handleDelete(blog.id)} className="action-btn delete-btn">Delete</button>
              </td>
            </tr>
          )) : (
            <tr><td colSpan="10">No posts found</td></tr>
          )}
        </tbody>
      </table>

      {/* Comments panel */}
      {selectedPostId && (
        <div className="comments-panel">
          <h3>Comments for Post ID: {selectedPostId}</h3>
          <button className="close-btn" onClick={() => setSelectedPostId(null)}>×</button>
          <ul>
            {comments.length > 0 ? comments.map((c) => (
              <li key={c.id} className="comment-item">
                <strong>{c.username}</strong> said:
                <p>{c.comment}</p>
                <span className="comment-date">
                  {new Date(c.createdAt).toLocaleString()}
                </span>
              </li>
            )) : <p>No comments yet.</p>}
          </ul>
        </div>
      )}
    </div>
  );
}
