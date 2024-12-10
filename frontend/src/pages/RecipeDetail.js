import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Card, Button, Form, Alert } from 'react-bootstrap';

const RecipeDetail = () => {
  const { id } = useParams(); // Mengambil ID resep dari URL
  const [recipe, setRecipe] = useState(null); // Menyimpan detail resep
  const [favorites, setFavorites] = useState([]); // Menyimpan daftar resep favorit
  const [comment, setComment] = useState(""); // Menyimpan komentar baru
  const [comments, setComments] = useState([]); // Menyimpan daftar komentar
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Status login user
  const [alertMessage, setAlertMessage] = useState(""); // Pesan peringatan atau status

  // Mengambil detail resep dan komentar dari backend
  useEffect(() => {
    // Ambil detail resep
    fetch(`http://localhost:5000/recipes/${id}`)
      .then((res) => res.json())
      .then((data) => setRecipe(data))
      .catch((err) => console.error('Error fetching recipe:', err));

    // Cek login status berdasarkan token
    const token = sessionStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true); // User dianggap login jika ada token
      // Ambil daftar favorit user
      fetch('http://localhost:5000/favorites', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => setFavorites(data))
        .catch((err) => console.error('Error fetching favorites:', err));

      // Ambil komentar untuk resep ini
      fetch(`http://localhost:5000/comments/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => setComments(data))
        .catch((err) => console.error('Error fetching comments:', err));
    }
  }, [id]);

  // Tambah atau hapus favorit
  const toggleFavorite = () => {
    if (!isLoggedIn) {
      setAlertMessage("Login terlebih dahulu untuk menambahkan ke favorit.");
      return;
    }

    const token = sessionStorage.getItem('token');
    const isFavorited = favorites.some((fav) => fav.id === recipe.id);

    if (isFavorited) {
      fetch(`http://localhost:5000/favorites/${recipe.id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then(() => setFavorites((prev) => prev.filter((fav) => fav.id !== recipe.id)))
        .catch((err) => console.error('Error:', err));
    } else {
      fetch('http://localhost:5000/favorites', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id_resep: recipe.id }),
      })
        .then(() => setFavorites((prev) => [...prev, recipe]))
        .catch((err) => console.error('Error:', err));
    }
  };

  // Tambah komentar
  const handleCommentSubmit = () => {
    if (!isLoggedIn) {
      setAlertMessage("Login terlebih dahulu untuk menambahkan komentar.");
      return;
    }

    if (!comment.trim()) {
      setAlertMessage("Komentar tidak boleh kosong.");
      return;
    }

    const token = sessionStorage.getItem('token');
    fetch('http://localhost:5000/comments', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id_resep: recipe.id,
        komen: comment,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setComments((prev) => [...prev, data]); // Tambahkan komentar baru ke daftar
        setComment(""); // Reset kolom komentar
        setAlertMessage("Komentar berhasil ditambahkan.");
      })
      .catch((err) => {
        console.error('Error:', err);
        setAlertMessage("Terjadi kesalahan saat menambahkan komentar.");
      });
  };

  if (!recipe) return <p>Resep tidak ditemukan.</p>;

  return (
    <Container className="my-5">
      <Card>
        <Card.Body>
          <Card.Title>{recipe.judul}</Card.Title>
          <Card.Text>
            <strong>Kategori:</strong> {recipe.kategori}
          </Card.Text>
          <Card.Text>
            <strong>Deskripsi:</strong> {recipe.deskripsi}
          </Card.Text>
          <Card.Text>
            <strong>Bahan:</strong> {recipe.bahan}
          </Card.Text>
          <Card.Text>
            <strong>Langkah:</strong> {recipe.langkah}
          </Card.Text>
          <Card.Img variant="top" src={recipe.image} alt={recipe.judul} className="my-3" />
          
          {/* Tombol Favorit */}
          <Button variant="link" onClick={toggleFavorite} className="d-block mt-3">
            {favorites.some((fav) => fav.id === recipe.id) ? '❤️' : '🤍'} Tambah ke Favorit
          </Button>
        </Card.Body>
      </Card>

      {/* Peringatan jika ada */}
      {alertMessage && <Alert variant="warning" className="mt-3">{alertMessage}</Alert>}

      {/* Komentar */}
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

      {/* List Komentar */}
      <ul className="mt-4">
        {comments.length === 0 ? (
          <p>Belum ada komentar untuk resep ini.</p>
        ) : (
          comments.map((comment, index) => (
          <li key={index}>
            <strong>{comment.username}:</strong> {comment.komen} <br />
            <em>{new Date(comment.tanggal).toLocaleString()}</em>
          </li>
          ))
        )}
      </ul>
    </Container>
  );
};

export default RecipeDetail;