'use client';
import React, { useState } from 'react';

import PostTable from 'Components/PostTable';

const PostsPage = () => {
  const [posts, setPosts] = useState([]);

  const handleNewPost = (post) => {
    setPosts([post, ...posts]);
  };

  return (
    <div>

      <PostTable posts={posts} setPosts={setPosts} />
    </div>
  );
};

export default PostsPage;
