import React, { useEffect, useState } from 'react';
import { Card, Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);

  // Ambil data favorit dari backend
  useEffect(() => {
    fetch('http://localhost:5000/favorites')
      .then((res) => res.json())
      .then((data) => setFavorites(data))
      .catch((err) => console.error('Error:', err));
  }, []);

  // Tambah atau hapus dari favorit
  const toggleFavorite = (recipe) => {
    const isFavorited = favorites.some((fav) => fav.id === recipe.id);

    if (isFavorited) {
      fetch(`http://localhost:5000/favorites/${recipe.id}`, { method: 'DELETE' })
        .then(() => setFavorites((prev) => prev.filter((fav) => fav.id !== recipe.id)))
        .catch((err) => console.error('Error:', err));
    } else {
      fetch('http://localhost:5000/favorites', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id_resep: recipe.id }),
      })
        .then(() => setFavorites((prev) => [...prev, recipe]))
        .catch((err) => console.error('Error:', err));
    }
  };

  return (
    <Container>
      <h1 className="my-4">List Resep Favorit</h1>
      <Row>
        {favorites.length === 0 ? (
          <p>Belum ada resep yang ditambahkan ke favorit.</p>
        ) : (
          favorites.map((recipe) => (
            <Col md={4} key={recipe.id} className="mb-4">
              <Card>
                <Card.Img variant="top" src={recipe.image} alt={recipe.judul} />
                <Card.Body>
                  <Card.Title>{recipe.judul}</Card.Title>
                  <Card.Text>{recipe.kategori}</Card.Text>
                  <Button variant="link" onClick={() => toggleFavorite(recipe)}>
                    {favorites.some((fav) => fav.id === recipe.id) ? '❤️' : '🤍'}
                  </Button>
                  <Link to={`/recipe/${recipe.id}`} className="btn btn-primary">Lihat Detail</Link>
                </Card.Body>
              </Card>
            </Col>
          ))
        )}
      </Row>
    </Container>
  );
};

export default Favorites;