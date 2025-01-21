import React from 'react';
import { Card, Button } from 'react-bootstrap';

const RecipeCard = ({ recipe }) => {
  return (
    <Card style={{ width: '18rem' }} className="mb-3">
      <Card.Img
        variant="top"
        className="img-fluid"
        style={{ height: '200px', objectFit: 'cover' }}
        src={`http://localhost:5000${recipe.image}`}
        alt={recipe.judul}
        onError={(e) => { e.target.src = '/default-placeholder.jpg'; }}
      />
      <Card.Body>
        <Card.Title>{recipe.judul}</Card.Title>
        <Card.Text>{recipe.deskripsi ? `${recipe.deskripsi.slice(0, 100)}...` : 'Tidak ada deskripsi.'}</Card.Text>
        <Button variant="primary" href={`/recipe/${recipe.id}`}>
          Lihat Resep
        </Button>
      </Card.Body>
    </Card>
  );
};

export default RecipeCard;