import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Home = () => {
  const [resep, setResep] = useState([]);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/recipes')
      .then((res) => res.json())
      .then((data) => setResep(data))
      .catch((err) => console.error('Error:', err));
    
    fetch('http://localhost:5000/favorites')
      .then((res) => res.json())
      .then((data) => setFavorites(data))
      .catch((err) => console.error('Error:', err));
  }, []);

  const toggleFavorite = (recipe) => {
    const isFavorited = favorites.some((fav) => fav.id === recipe.id);
    if (isFavorited) {
      fetch(`http://localhost:5000/favorites/${recipe.id}`, { method: 'DELETE' })
        .then(() => {
          setFavorites((prev) => prev.filter((fav) => fav.id !== recipe.id));
          toast.success('Resep dihapus dari favorit!');
        })
        .catch((err) => {
          toast.error('Terjadi kesalahan saat menghapus dari favorit.');
          console.error('Error:', err);
        });
    } else {
      fetch('http://localhost:5000/favorites', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id_resep: recipe.id }),
      })
        .then(() => {
          setFavorites((prev) => [...prev, recipe]);
          toast.success('Resep ditambahkan ke favorit!');
        })
        .catch((err) => {
          toast.error('Terjadi kesalahan saat menambahkan favorit.');
          console.error('Error:', err);
        });
    }
  };

  return (
    <Container>
      <ToastContainer />
      <h1 className="my-4">Daftar Resep</h1>
      <Row>
        {resep.map((recipe) => (
          <Col md={4} key={recipe.id} className="mb-4">
            <Card>
              <Card.Img variant="top" src={recipe.image} alt={recipe.judul} />
              <Card.Body>
                <Card.Title>{recipe.judul}</Card.Title>
                <Card.Text>{recipe.deskripsi}</Card.Text>
                <Button variant="link" onClick={() => toggleFavorite(recipe)}>
                  {favorites.some((fav) => fav.id === recipe.id) ? '❤️' : '🤍'}
                </Button>
                <Link to={`/recipe/${recipe.id}`} className="btn btn-primary ml-2">Lihat Detail</Link>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Home;