"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import BlogData from "data/Blog.json";
import "styles/blog.css";

export default function SingleBlogPage({ params }) {
  const { slug } = params;
  const blog = BlogData.find((b) => b.slug === slug);

  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [likes, setLikes] = useState(0);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    if (!blog?.id) return;

    // Fetch comments
    axios
      .get(`https://ecohub-2.onrender.com/comment/getCommentsByBlogId/${blog.id}`)
      .then((res) => setComments(res.data.comments))
      .catch(console.error);

    // Fetch likes
    axios
      .get(`https://ecohub-2.onrender.com/like/getLikesByBlogId/${blog.id}`)
      .then((res) => setLikes(res.data.likes))
      .catch(() => setLikes(0));
  }, [blog?.id]);

  const handleLike = async () => {
    if (liked || !blog?.id) return;

    try {
      await axios.post("https://ecohub-2.onrender.com/like/addLike", { blogId: blog.id });
      setLikes((prev) => prev + 1);
      setLiked(true);
    } catch (err) {
      console.error(err);
    }
  };

  const handleComment = async () => {
    if (!newComment.trim() || !blog?.id) return;

    try {
      await axios.post("https://ecohub-2.onrender.com/comment/createComment", {
        blogId: blog.id,
        text: newComment,
      });

      const res = await axios.get(`https://ecohub-2.onrender.com/comment/getCommentsByBlogId/${blog.id}`);
      setComments(res.data.comments);
      setNewComment("");
    } catch (error) {
      console.error("Comment failed", error);
    }
  };

  if (!blog) return <p>Blog not found.</p>;

  return (
    <div className="blog-detail">
      <h2>{blog.title}</h2>
      <img className="blog-img" src={blog.image} alt={blog.title} />
      <p>{blog.description}</p>

      <div className="blog-actions">
        <span
          onClick={handleLike}
          style={{
            cursor: liked ? "default" : "pointer",
            color: liked ? "gray" : "black",
          }}
        >
          👍 Like {likes}
        </span>
      </div>

      <div className="comment-section">
        <h4>Comments</h4>
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment"
        />
        <button onClick={handleComment}>Post</button>

        <div className="comments-list">
          {comments.length === 0 && <p>No comments yet.</p>}
          {comments.map((c) => (
            <div key={c.id} className="comment">
              <strong>{c.user?.username || "Anonymous"}:</strong> {c.text}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
