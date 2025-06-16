"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";

export default function ManagePosts() {
  const [posts, setPosts] = useState([]);

  const [loading, setLoading] = useState(true);
  const [editPostId, setEditPostId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");

  // Fetch posts from your backend API
  useEffect(() => {
    async function fetchPosts() {
      const token = localStorage.getItem('token'); // if you store it upon login
      
      if (!token) {
        console.error('Not authenticated');
        return;
      }
    
      try {
        const response = axios.get('http://localhost:5000/api/posts', { withCredentials: true })
        .then(response => {
          setPosts(response.data);
        })
        .catch(err => console.error(err));
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching posts!', error);
      }
    }
    fetchPosts();
  }, []);
  
  // Start editing a post
  const startEdit = (post) => {
    setEditPostId(post.id);
    setEditTitle(post.title);
    setEditContent(post.body);
  };

  // Cancel editing
  const cancelEdit = () => {
    setEditPostId(null);
    setEditTitle("");
    setEditContent("");
  };

  // Save edited post
  const saveEdit = async () => {
    try {
      await axios.put(`http://localhost:5000/api/posts/${editPostId}`, { title: editTitle, body: editContent });

      setPosts(posts.map((post) =>
        post.id === editPostId ? { ...post, title: editTitle, body: editContent } : post
      ));

      cancelEdit();
      alert("Post updated successfully!");
    } catch (error) {
      console.error("Error updating post:", error);
      alert("Failed to update post.");
    }
  };

  // Delete a post
  const deletePost = async (id) => {
    if (!confirm("Are you sure you want to delete this post?")) return;

    try {
      await axios.delete(`http://localhost:5000/api/posts/${id}`);

      setPosts(posts.filter((post) => post.id !== id)); 
      alert("Post deleted successfully!");
    } catch (error) {
      console.error("Error deleting post:", error);
      alert("Failed to delete post.");
    }
  };

  if (loading) return <p>Loading posts...</p>;

  return (
    <div style={{ padding: 20 }}>
      <h2>Manage Posts</h2>
      {posts.length === 0 && <p>No posts available.</p>}

      <ul>
        {posts.length > 0 ? (
          posts.map((post) => (
            <li key={post.id}>
              {editPostId === post.id ? (
                <>
                   <input
                     type="text"
                     value={editTitle}
                     onChange={(e) => setEditTitle(e.target.value)}
                     style={{ width: "100%", marginBottom: 8 }}
                   />
                   <textarea
                     value={editContent}
                     onChange={(e) => setEditContent(e.target.value)}
                     rows={4}
                     style={{ width: "100%", marginBottom: 8 }}
                   />
                   <div style={{ marginBottom: 8 }}>
                     <button onClick={saveEdit} style={{ marginRight: 8 }}>
                       Save
                     </button>
                     <button onClick={cancelEdit}>
                       Cancel
                     </button>
                   </div>
                </>
              ) : (
                <>
                   <h3>{post.title}</h3>
                   <p>{post.body ? post.body.substring(0, 100) + "…" : "No content available"}</p>
                   <button onClick={() => startEdit(post)} style={{ marginRight: 8 }}>
                     Edit
                   </button>
                   <button onClick={() => deletePost(post.id)} style={{ color: "red" }}>
                     Delete
                   </button>
                 </>
               )}

            </li>
          ))
        ) : (
          <p>No posts available</p>
        )}

      </ul>
    </div>
  );
}

