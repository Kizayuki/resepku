import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CategoryPage = () => {
  const { kategori } = useParams();
  const [resep, setResep] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    setIsLoggedIn(!!token);

    if (token) {
      fetch('http://localhost:5000/favorites', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => setFavorites(Array.isArray(data) ? data : []))
        .catch((err) => toast.error('Terjadi kesalahan saat mengambil data favorit.'));
    }
    
    fetch(`http://localhost:5000/recipes/category/${kategori}`)
      .then((res) => res.json())
      .then((data) => setResep(Array.isArray(data) ? data : []))
      .catch((err) => toast.error('Terjadi kesalahan saat mengambil data kategori.'));
  }, [kategori]);

  const toggleFavorite = (recipe) => {
    const token = sessionStorage.getItem('token');
    if (!token) {
      toast.warning('Login terlebih dahulu untuk menambah ke favorit.');
      return;
    }

    const isFavorited = favorites.some((fav) => fav.id === recipe.id);

    if (isFavorited) {
      fetch(`http://localhost:5000/favorites/${recipe.id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then(() => {
          setFavorites((prev) => prev.filter((fav) => fav.id !== recipe.id));
          toast.success('Resep dihapus dari favorit!');
        })
        .catch(() => toast.error('Terjadi kesalahan saat menghapus dari favorit.'));
    } else {
      fetch('http://localhost:5000/favorites', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id_resep: recipe.id }),
      })
        .then(() => {
          setFavorites((prev) => [...prev, recipe]);
          toast.success('Resep ditambahkan ke favorit!');
        })
        .catch(() => toast.error('Terjadi kesalahan saat menambahkan favorit.'));
    }
  };

  return (
    <Container>
      <ToastContainer />
      <h1 className="my-4">Kategori Resep: {kategori.charAt(0).toUpperCase() + kategori.slice(1)}</h1>
      <Row>
        {resep.length === 0 ? (
          <p>Tidak ada resep di kategori ini.</p>
        ) : (
          resep.map((recipe) => (
            <Col md={4} key={recipe.id} className="mb-4">
              <Card>
                <Card.Img
                  className="img-fluid"
                  style={{ height: '300px', objectFit: 'cover' }}
                  src={`http://localhost:5000${recipe.image}`}
                  alt={recipe.judul}
                />
                <Card.Body>
                  <Card.Title>{recipe.judul}</Card.Title>
                  <Card.Text>{recipe.deskripsi ? `${recipe.deskripsi.slice(0, 100)}...` : ''}</Card.Text>
                  {isLoggedIn && (
                    <Button variant="link" onClick={() => toggleFavorite(recipe)}>
                      {favorites.some((fav) => fav.id === recipe.id) ? '❤️' : '🤍'}
                    </Button>
                  )}
                  <Link to={`/recipe/${recipe.id}`} className="btn btn-primary ml-2">
                    Lihat Detail
                  </Link>
                </Card.Body>
              </Card>
            </Col>
          ))
        )}
      </Row>
    </Container>
  );
};

export default CategoryPage;