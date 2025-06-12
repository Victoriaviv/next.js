'use client';
import React, { useState } from 'react';
import 'styles/post.css';
import Link from 'next/link';

const initialPosts = [
  { id: 1, title: 'First Post', category: 'Tech', status: 'Published', date: '2025-06-01', comments: 3, likes: 12 },
  { id: 2, title: 'Second Post', category: 'Education', status: 'Draft',     date: '2025-06-05', comments: 0, likes:  4 },
  { id: 3, title: 'Third Post', category: 'Health', status: 'Published', date: '2025-06-07', comments: 5, likes: 20 },
];

export default function PostTable({ posts: propPosts, setPosts: setPropPosts }) {
  // use props if passed, else use local state
  const [posts, setPosts] = useState(propPosts ?? initialPosts);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [filterCategory, setFilterCategory] = useState('');

  const filtered = posts.filter(p =>
    p.title.toLowerCase().includes(search.toLowerCase()) &&
    (filterStatus ? p.status === filterStatus : true) &&
    (filterCategory ? p.category === filterCategory : true)
  );

  const handleDelete = id => setPosts(posts.filter(p => p.id !== id));
  const handleLike   = id => setPosts(posts.map(p => p.id === id ? { ...p, likes: p.likes + 1 } : p));

  return (
    <div className="post-table-container">
      <div className="list-header">
        <h2>Blog Posts</h2>
        <Link href="/dashboard/posts/create" className="create-btn">+ Create Post</Link>
      </div>

      <div className="filters">
        <input
          type="text" placeholder="Search by title…" value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)}>
          <option value="">All Status</option>
          <option>Published</option>
          <option>Draft</option>
        </select>
        <select value={filterCategory} onChange={e => setFilterCategory(e.target.value)}>
          <option value="">All Categories</option>
          <option>Tech</option>
          <option>Education</option>
          <option>Health</option>
        </select>
      </div>

      <table className="post-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Category</th>
            <th>Status</th>
            <th>Date</th>
            <th>Comments</th>
            <th>Likes</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map(p => (
            <tr key={p.id}>
              <td>{p.title}</td>
              <td>{p.category}</td>
              <td className={`status ${p.status.toLowerCase()}`}>{p.status}</td>
              <td>{p.date}</td>
              <td>
                {p.comments}{' '}
                <Link href={`/dashboard/comments?post=${p.id}`} className="manage-comments">
                  Manage
                </Link>
              </td>
              <td>
                <button className="like-btn" onClick={() => handleLike(p.id)}>
                  ❤️ {p.likes}
                </button>
              </td>
              <td className="action-buttons">
                <Link href={`/dashboard/posts/${p.id}/edit`}><button className="edit-btn">Edit</button></Link>
                <button className="delete-btn" onClick={() => handleDelete(p.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
