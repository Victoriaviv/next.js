'use client';

import React from 'react';
import PostForm from 'Components/PostForm';

export default function CreatePostPage() {
  return (
    <div style={{ padding: '24px' }}>
      <h1>Create New Post</h1>
      <PostForm />
    </div>
  );
}
