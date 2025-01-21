import React, { useEffect, useState } from 'react';
import RecipeCard from './RecipeCard';
import { Container, Row, Col, Spinner } from 'react-bootstrap';

const RecipeList = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5000/recipes', {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('token')}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setRecipes(Array.isArray(data) ? data : []);
      })
      .catch((err) => console.error('Error:', err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <Spinner animation="border" variant="primary" />
        <span className="ms-3">Memuat data...</span>
      </div>
    );
  }

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