'use client';

import React, { use } from 'react';
import PostForm from 'Components/PostForm';

export default function EditPostPage({ params }) {
  const { id } = use(params); // 🔥 unwrap the async params safely

  return (
    <div style={{ padding: '24px' }}>
      <h1>Edit Post</h1>
      <PostForm postId={id} />
    </div>
  );
}
