"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import "../styles/blog.css";

export default function Blog({ blog }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [likes, setLikes] = useState(0);

  useEffect(() => {
    axios.get(`https://ecohub-2.onrender.com/comment/getCommentsByBlogId/${blog.id}`)
      .then(res => setComments(res.data.comments.map(c => c.text)))
      .catch(console.error);
    setLikes(Math.floor(Math.random() * 100));
  }, [blog.id]);

  const handleComment = async () => {
    if (!newComment.trim()) return;

    try {
      await axios.post("https://ecohub-2.onrender.com/comment/createComment", {
        blogId: blog.id,
        text: newComment
      });
      const res = await axios.get(`https://ecohub-2.onrender.com/comment/getCommentsByBlogId/${blog.id}`);
      setComments(res.data.comments.map(c => c.text));
      setNewComment("");
    } catch (error) {
      console.error("Comment failed", error);
    }
  };

  return (
    <div className="blog-detail">
      <h2>{blog.title}</h2>
      <img className="blog-img" src={blog.image} alt={blog.title} />
      <p>{blog.description}</p>

      <div className="blog-actions">
        <span onClick={() => setLikes(likes + 1)}>👍 Like {likes}</span>
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
          {comments.map((c, i) => (
            <div key={i} className="comment">{c}</div>
          ))}
        </div>
      </div>
    </div>
  );
}