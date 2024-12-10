import React, { useState, useEffect } from 'react';
import RecipeCard from './RecipeCard';
import { Container, Row } from 'react-bootstrap';

const Home = () => {
  const [resep, setResep] = useState([]);

  useEffect(() => {
    // Mengambil data resep dari API
    fetch('http://localhost:5000/recipes')  // Sesuaikan URL API sesuai kebutuhan
      .then((res) => res.json())
      .then((data) => setResep(data))
      .catch((err) => console.error('Error:', err));
  }, []);

  return (
    <Container>
      <Row>
        {resep.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </Row>
    </Container>
  );
};

export default Home;