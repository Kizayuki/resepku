import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, Container, Row, Col, Button } from 'react-bootstrap';

const Home = () => {
  const [resep, setResep] = useState([]);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const storedRecipes = JSON.parse(localStorage.getItem('recipes')) || [];
    const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setResep(storedRecipes);
    setFavorites(savedFavorites);
  }, []);

  const toggleFavorite = (recipe) => {
    const updatedFavorites = favorites.some((fav) => fav.id === recipe.id)
      ? favorites.filter((fav) => fav.id !== recipe.id)
      : [...favorites, recipe];
    setFavorites(updatedFavorites);
  
    const fullRecipe = resep.find((r) => r.id === recipe.id);
    const favoritesWithFullData = updatedFavorites.map((fav) => ({
      ...fullRecipe,
      ...fav,
    }));
    localStorage.setItem('favorites', JSON.stringify(favoritesWithFullData));
  };
  
  return (
    <Container>
      <h1 className="my-4">Daftar Resep</h1>
      <Row>
        {resep.map((recipe) => (
          <Col md={4} key={recipe.id} className="mb-4">
            <Card>
              <Card.Img variant="top" src={recipe.image_url} alt={recipe.nama} />
              <Card.Body>
                <Card.Title>{recipe.nama}</Card.Title>
                <Card.Text>{recipe.kategori}</Card.Text>
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