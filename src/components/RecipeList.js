import React from 'react';
import RecipeCard from './RecipeCard';
import { Container, Row, Col } from 'react-bootstrap';

const RecipeList = ({ recipes }) => {
  return (
    <Container>
      <Row>
        {recipes.map(recipe => (
          <Col md={4} key={recipe.id}>
            <RecipeCard recipe={recipe} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default RecipeList;