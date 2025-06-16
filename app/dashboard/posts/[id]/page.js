'use client';

import React from 'react';
import PostForm from 'Components/PostForm';

export default function EditPostPage({ params }) {
  const { id } = params;

  return (
    <div style={{ padding: '24px' }}>
      <h1>Edit Post</h1>
      <PostForm postId={id} />
    </div>
  );
}
