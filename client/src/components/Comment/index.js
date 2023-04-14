import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../styles.css"

const Comment = () => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchComments = async () => {
      const res = await axios.get('/api/comments');
      setComments(res.data);
    };
    fetchComments();
  }, []);

  return (
    <div>
      <h1>Comments</h1>
      {comments.map(comment => (
        <div key={comment.id}>
          <h3>{comment.title}</h3>
          <p>{comment.body}</p>
        </div>
      ))}
    </div>
  );
};

export default Comment;
