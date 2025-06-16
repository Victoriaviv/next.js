'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import 'styles/post.css';

const PostForm = ({ postId }) => {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Tech');
  const [status, setStatus] = useState('Draft');
  const [content, setContent] = useState('');

  useEffect(() => {
    if (postId) {
      // Fetch existing post to edit
      fetch(`http://localhost:5000/api/posts/${postId}`, { credentials: 'include' })
        .then(res => res.json())
        .then(data => {
          setTitle(data.title || '');
          setCategory(data.category || 'Tech');
          setStatus(data.status || 'Draft');
          setContent(data.content || '');
        })
        .catch(console.error);
    }
  }, [postId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const postPayload = { title, category, status, content };
    try {
      const url = postId ? `http://localhost:5000/api/posts/${postId}` : 'http://localhost:5000/api/posts';
      const method = postId ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(postPayload),
      });

      if (res.ok) {
        alert(`Post ${postId ? 'updated' : 'created'} successfully!`);
        router.push('/dashboard/posts');
      } else {
        alert('Failed to save post.');
      }
    } catch (error) {
      console.error(error);
      alert('Error occurred while saving post.');
    }
  };

  return (
    <div className="post-form-container">
      <form onSubmit={handleSubmit} className="post-form">
        <label>Title</label>
        <input
          type="text"
          value={title}
          placeholder="Post title"
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <label>Category</label>
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="Tech">Tech</option>
          <option value="Education">Education</option>
          <option value="Health">Health</option>
        </select>

        <label>Status</label>
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="Draft">Draft</option>
          <option value="Published">Published</option>
        </select>

        <label>Content</label>
        <textarea
          value={content}
          placeholder="Post content..."
          onChange={(e) => setContent(e.target.value)}
          rows={6}
        />

        <button type="submit" className="submit-btn">
          {postId ? 'Update Post' : (status === 'Published' ? 'Publish Post' : 'Save Draft')}
        </button>
      </form>
    </div>
  );
};

export default PostForm;
