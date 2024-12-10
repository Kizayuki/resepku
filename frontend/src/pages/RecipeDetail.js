import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Card, Button } from 'react-bootstrap';

const RecipeDetail = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const storedRecipes = JSON.parse(localStorage.getItem('recipes')) || [];
    const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const selectedRecipe = storedRecipes.find((item) => item.id === parseInt(id));
    setRecipe(selectedRecipe);
    setFavorites(savedFavorites);
  }, [id]);

  const toggleFavorite = (recipe) => {
    const updatedFavorites = favorites.some((fav) => fav.id === recipe.id)
      ? favorites.filter((fav) => fav.id !== recipe.id)
      : [...favorites, recipe];

    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  if (!recipe) return <p>Resep tidak ditemukan.</p>;

  return (
    <Container className="my-5">
      <Card>
        <Card.Body>
          <Card.Title>{recipe.nama}</Card.Title>
          <Card.Text>{recipe.kategori}</Card.Text>
          <Card.Img variant="top" src={recipe.image_url} alt={recipe.nama} />
          <Button variant="link" onClick={() => toggleFavorite(recipe)}>
            {favorites.some((fav) => fav.id === recipe.id) ? '❤️' : '🤍'}
          </Button>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default RecipeDetail;