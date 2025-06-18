'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import './CommentLikePanel.css';

export default function CommentLikePanel({ blogId, onClose }) {
  const [comments, setComments] = useState([]);
  const [likesCount, setLikesCount] = useState(0);

  useEffect(() => {
    if (!blogId) return;

    // Fetch comments
    axios.get(`https://ecohub-2.onrender.com/comment/getCommentsByBlogId/${blogId}`)
      .then((res) => setComments(res.data.comments))
      .catch(console.error);

    // Fetch likes
    axios.get(`https://ecohub-2.onrender.com/like/getLikesByBlogId/${blogId}`)
      .then((res) => setLikesCount(res.data.totalLikes))
      .catch(console.error);
  }, [blogId]);

  return (
    <div className="panel-overlay">
      <div className="panel">
        <button className="close-btn" onClick={onClose}>×</button>
        <h3>Comments</h3>
        {comments.length === 0 ? (
          <p>No comments yet</p>
        ) : (
          <ul className="comment-list">
            {comments.map((comment) => (
              <li key={comment.id}><strong>{comment.user?.username || 'Anonymous'}:</strong> {comment.text}</li>
            ))}
          </ul>
        )}

        <div className="likes-info">
          👍 Total Likes: {likesCount}
        </div>
      </div>
    </div>
  );
}
