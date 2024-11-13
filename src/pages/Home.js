import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, Container, Row, Col, Button } from 'react-bootstrap';

const recipes = [
  {
    id: 1,
    title: 'Nasi Goreng Sederhana',
    description: 'Nasi goreng sederhana dengan bumbu khas Indonesia.',
    image_url: '/images/nasi goreng.jpg'
  },

  {
    id: 2,
    title: 'Sosis Bakar Praktis',
    description: 'Sosis bakar yang enak dan mudah dibuat, cocok untuk merayakan tahun baru.',
    image_url: '/images/sosis.jpg'
  },

  {
    id: 3,
    title: 'Ayam Goreng Praktis',
    description: 'Ayam goreng lezat dengan rasa gurih, cocok untuk lauk.',
    image_url: '/images/ayam.jpg'
  },

  {
    id: 4,
    title: 'Japannese Oyakodon Simple',
    description: 'Masakan telur khas jepang yang mudah dibuat.',
    image_url: '/images/oyakodon.jpg'
  },

  {
    id: 5,
    title: 'Donat Simple',
    description: 'Donat yang mudah dibuat tanpa mixer.',
    image_url: '/images/donat.jpg'
  }
];

const Home = () => {
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
      <h1 className="my-4">Daftar Resep</h1>
      <Row>
        {recipes.map((recipe) => (
          <Col md={4} key={recipe.id} className="mb-4">
            <Card>
              <Card.Img variant="top" src={recipe.image_url} alt={recipe.title} />
              <Card.Body>
                <Card.Title>{recipe.title}</Card.Title>
                <Card.Text>{recipe.description}</Card.Text>
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