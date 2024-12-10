import React, { useEffect, useState } from 'react';
import RecipeCard from './RecipeCard';
import { Container, Row, Col } from 'react-bootstrap';

const RecipeList = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/recipes', {
      headers: {
        'Authorization': `Bearer ${sessionStorage.getItem('token')}`
      }
    })
      .then((res) => res.json())
      .then((data) => {
        setRecipes(data);
      })
      .catch((err) => console.error('Error:', err));
  }, []);

  return (
    <Container>
      <Row>
        {recipes.map((recipe) => (
          <Col md={4} key={recipe.id}>
            <RecipeCard recipe={recipe} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default RecipeList;