import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Card, Button, Form, Alert } from 'react-bootstrap';

const RecipeDetail = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  useEffect(() => {
    // Ambil detail resep
    fetch(`http://localhost:5000/recipes/${id}`)
      .then((res) => res.json())
      .then((data) => setRecipe(data))
      .catch((err) => console.error('Error fetching recipe:', err));

    const token = sessionStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);

      // Ambil daftar favorit user
      fetch('http://localhost:5000/favorites', {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => res.json())
        .then((data) => setFavorites(data))
        .catch((err) => console.error('Error fetching favorites:', err));

      // Ambil komentar untuk resep ini
      fetch(`http://localhost:5000/comments/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => res.json())
        .then((data) => setComments(Array.isArray(data) ? data : []))
        .catch((err) => console.error('Error fetching comments:', err));
    }
  }, [id]);

  const toggleFavorite = () => {
    if (!isLoggedIn) {
      setAlertMessage('Login terlebih dahulu untuk menambahkan ke favorit.');
      return;
    }

    const token = sessionStorage.getItem('token');
    const isFavorited = favorites.some((fav) => fav.id === recipe.id);

    if (isFavorited) {
      fetch(`http://localhost:5000/favorites/${recipe.id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      })
        .then(() => setFavorites((prev) => prev.filter((fav) => fav.id !== recipe.id)))
        .catch((err) => console.error('Error:', err));
    } else {
      fetch('http://localhost:5000/favorites', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ id_resep: recipe.id }),
      })
        .then(() => setFavorites((prev) => [...prev, recipe]))
        .catch((err) => console.error('Error:', err));
    }
  };

  const handleCommentSubmit = () => {
    if (!isLoggedIn) {
      setAlertMessage('Login terlebih dahulu untuk menambahkan komentar.');
      return;
    }

    if (!comment.trim()) {
      setAlertMessage('Komentar tidak boleh kosong.');
      return;
    }

    const token = sessionStorage.getItem('token');
    fetch('http://localhost:5000/comments', {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id_resep: recipe.id,
        komen: comment,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setComments((prev) => Array.isArray(prev) ? [...prev, data] : [data]);
        setComment('');
        setAlertMessage('Komentar berhasil ditambahkan.');
      })
      .catch((err) => {
        console.error('Error:', err);
        setAlertMessage('Terjadi kesalahan saat menambahkan komentar.');
      });
  };

  if (!recipe) return <p>Resep tidak ditemukan.</p>;

  return (
    <Container className="my-5">
      <Card>
        <Card.Body>
          <Card.Title>{recipe.judul}</Card.Title>
          <Card.Img
            variant="top"
            className="img-fluid"
            src={`http://localhost:5000${recipe.image}`}
            alt={recipe.judul}
            onError={(e) => { e.target.src = '/default-placeholder.jpg'; }}
          />
          <Card.Text><strong>Deskripsi:</strong> {recipe.deskripsi}</Card.Text>
          <Card.Text><strong>Kategori:</strong> {recipe.kategori}</Card.Text>
          <Card.Text><strong>Bahan:</strong> {recipe.bahan}</Card.Text>
          <Card.Text><strong>Langkah:</strong> {recipe.langkah}</Card.Text>

          <Button variant="link" onClick={toggleFavorite} className="d-block mt-3">
            {favorites.some((fav) => fav.id === recipe.id) ? '❤️' : '🤍'} Tambah ke Favorit
          </Button>
        </Card.Body>
      </Card>

      {alertMessage && <Alert variant="warning" className="mt-3">{alertMessage}</Alert>}

      <h4 className="mt-4">Komentar</h4>

      {isLoggedIn ? (
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Tulis Komentar Anda</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </Form.Group>
          <Button variant="primary" onClick={handleCommentSubmit}>Kirim Komentar</Button>
        </Form>
      ) : (
        <Button variant="primary" onClick={() => setAlertMessage("Login terlebih dahulu untuk menambahkan komentar.")}>
          Beri Komentar
        </Button>
      )}

      <ul className="mt-4">
        {comments.length > 0 ? (
          comments.map((comment, index) => (
            <li key={index}>
              <strong>{comment.username}:</strong> {comment.komen} <br />
              <em>{new Date(comment.tanggal).toLocaleString()}</em>
            </li>
          ))
        ) : (
          <p>Belum ada komentar untuk resep ini.</p>
        )}
      </ul>
    </Container>
  );
};

export default RecipeDetail;