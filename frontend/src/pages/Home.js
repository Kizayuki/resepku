import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Home = () => {
  const [resep, setResep] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Status login user

  useEffect(() => {
    // Cek login berdasarkan token
    const token = sessionStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);

      // Ambil data favorit
      fetch('http://localhost:5000/favorites', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error('Gagal mengambil data favorit.');
          }
          return res.json();
        })
        .then((data) => setFavorites(data))
        .catch((err) => {
          console.error('Error fetching favorites:', err);
          toast.error('Terjadi kesalahan saat mengambil data favorit.');
        });
    }

    // Ambil data resep
    fetch('http://localhost:5000/recipes')
      .then((res) => res.json())
      .then((data) => setResep(data))
      .catch((err) => {
        console.error('Error:', err);
        toast.error('Terjadi kesalahan saat mengambil data resep.');
      });
  }, []);

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
        .catch((err) => {
          console.error('Error:', err);
          toast.error('Terjadi kesalahan saat menghapus dari favorit.');
        });
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
        .catch((err) => {
          console.error('Error:', err);
          toast.error('Terjadi kesalahan saat menambahkan favorit.');
        });
    }
  };

  return (
    <Container>
      <ToastContainer />
      <h1 className="my-4">Daftar Resep</h1>
      <Row>
        {resep.map((recipe) => (
          <Col md={4} key={recipe.id} className="mb-4">
            <Card>
              <Card.Img variant="top" src={recipe.image} alt={recipe.judul} />
              <Card.Body>
                <Card.Title>{recipe.judul}</Card.Title>
                <Card.Text>{recipe.deskripsi}</Card.Text>
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
        ))}
      </Row>
    </Container>
  );
};

export default Home;