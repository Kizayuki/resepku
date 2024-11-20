import React, { useEffect, useState } from 'react';
import { Card, Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(savedFavorites);
  }, []);

  const toggleFavorite = (recipe) => {
    const updatedFavorites = favorites.some((fav) => fav.id === recipe.id)
      ? favorites.filter((fav) => fav.id !== recipe.id)
      : [...favorites, recipe];
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
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
                <Card.Img variant="top" src={recipe.image_url} alt={recipe.title} />
                <Card.Body>
                  <Card.Title>{recipe.title}</Card.Title>
                  <Card.Text>{recipe.description}</Card.Text>
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