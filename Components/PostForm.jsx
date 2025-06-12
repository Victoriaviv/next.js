'use client';
import React, { useState } from 'react';
import 'styles/post.css';

const PostForm = ({ onSubmit }) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Tech');
  const [status, setStatus] = useState('Draft');
  const [content, setContent] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newPost = {
      id: Date.now(),
      title,
      category,
      status,
      content,
      date: new Date().toISOString().split('T')[0],
    };
    onSubmit(newPost);
    setTitle('');
    setCategory('Tech');
    setStatus('Draft');
    setContent('');
  };

  return (
    <div className="post-form-container">
      {/* <h2>Create New Post</h2> */}
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
          {status === 'Published' ? 'Publish Post' : 'Save Draft'}
        </button>
      </form>
    </div>
  );
};

export default PostForm;
