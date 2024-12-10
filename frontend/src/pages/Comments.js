import React, { useEffect, useState } from 'react';
import { Container, ListGroup } from 'react-bootstrap';

const Comments = () => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/comments', {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('token')}`
      }
    })
      .then((res) => res.json())
      .then((data) => setComments(data))
      .catch((err) => console.error('Error fetching comments:', err));
  }, []);

  return (
    <Container className="my-4">
      <h2>Daftar Komentar</h2>
      <ListGroup>
        {comments.map((comment, index) => (
          <ListGroup.Item key={index}>
            <strong>{comment.username}:</strong> {comment.komen} - <em>{new Date(comment.tanggal).toLocaleString()}</em>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Container>
  );
};

export default Comments;