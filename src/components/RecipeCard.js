import React from 'react';
import { Card, Button } from 'react-bootstrap';

const RecipeCard = ({ recipe }) => {
  return (
    <Card style={{ width: '18rem' }} className="mb-3">
      <Card.Img variant="top" src={recipe.image} />
      <Card.Body>
        <Card.Title>{recipe.title}</Card.Title>
        <Card.Text>{recipe.description}</Card.Text>
        <Button variant="primary" href={`/recipe/${recipe.id}`}>Lihat Resep</Button>
      </Card.Body>
    </Card>
  );
};

export default RecipeCard;