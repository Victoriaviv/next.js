'use client';

import React, { useState } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import 'styles/post.css';

export default function CreatePostForm() {
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [editorState, setEditorState] = useState(() => EditorState.createEmpty());
  const [category, setCategory] = useState('Tech');
  const [tags, setTags] = useState('');
  const [image, setImage] = useState(null);
  const [timePublished, setTimePublished] = useState(new Date().toISOString().slice(0, 16));

  const handleSubmit = async (e) => {
    e.preventDefault();

    const rawDescription = JSON.stringify(convertToRaw(editorState.getCurrentContent()));

    const formData = new FormData();
    formData.append('title', title);
    formData.append('summary', summary);
    formData.append('description', rawDescription);
    formData.append('category', category);
    formData.append('tags', tags);
    formData.append('time_published', timePublished);
    if (image) formData.append('project_image', image); // ✅ updated to match multer field name

    const token = localStorage.getItem('token');
    if (!token) {
      alert('You must be logged in to create a post.');
      return;
    }

    try {
      const res = await fetch('http://localhost:5000/api/posts', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`, // ✅ send JWT
        },
        body: formData,
      });

      if (res.ok) {
        alert('Post created!');
        setTitle('');
        setSummary('');
        setEditorState(EditorState.createEmpty());
        setCategory('Tech');
        setTags('');
        setImage(null);
        setTimePublished(new Date().toISOString().slice(0, 16));
      } else {
        const errData = await res.json();
        alert(`Failed to create post: ${errData.message || 'Unknown error'}`);
      }
    } catch (err) {
      console.error('Submit error:', err);
      alert('Something went wrong.');
    }
  };

  return (
    <form className="post-form" onSubmit={handleSubmit}>
      <h2 className="form-heading">Create a New Post</h2>

      <div className="form-group">
        <label className="form-label">Project Image</label>
        <input
          className="form-control"
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files?.[0] || null)}
        />
      </div>

      <div className="form-group">
        <label className="form-label">Title</label>
        <input
          className="form-control"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label className="form-label">Summary</label>
        <textarea
          className="form-control"
          rows={3}
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label className="form-label">Description</label>
        <div className="quill-wrapper">
          <Editor
            editorState={editorState}
            toolbarClassName="toolbar-class"
            wrapperClassName="wrapper-class"
            editorClassName="editor-class"
            onEditorStateChange={setEditorState}
          />
        </div>
      </div>

      <div className="form-group">
        <label className="form-label">Category</label>
        <select
          className="form-control"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="Tech">Tech</option>
          <option value="Education">Education</option>
          <option value="Health">Health</option>
          <option value="Personal">Personal</option>
        </select>
      </div>

      <div className="form-group">
        <label className="form-label">Tags (comma separated)</label>
        <input
          className="form-control"
          type="text"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label className="form-label">Time Published</label>
        <input
          className="form-control"
          type="datetime-local"
          value={timePublished}
          onChange={(e) => setTimePublished(e.target.value)}
        />
      </div>

      <button className="form-submit" type="submit">
        Submit Post
      </button>
    </form>
  );
}
