'use client';
import React from 'react';
import PostForm from 'Components/PostForm';


export default function CreatePostPage() {
  const handleNewPost = (post) => {
    // You could push into a global store, context, or call an API
    console.log('New post:', post);
  };

  return (
    <div style={{ padding: '24px', color:'black' }}>
      <h1>Create a New Post</h1>
      <PostForm onSubmit={handleNewPost} />
    </div>
  );
}
