import React, { useEffect, useState } from 'react';
import { Card, Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);

  // Ambil data favorit dari backend
  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      toast.warning("Login terlebih dahulu untuk melihat daftar favorit.");
      return;
    }

    fetch('http://localhost:5000/favorites', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Gagal mengambil data favorit.");
        }
        return res.json();
      })
      .then((data) => setFavorites(data))
      .catch((err) => {
        console.error('Error fetching favorites:', err);
        toast.error("Terjadi kesalahan saat mengambil data favorit.");
      });
  }, []);

  // Hapus dari favorit
  const handleRemoveFavorite = (recipe) => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      toast.warning("Login terlebih dahulu untuk menghapus favorit.");
      return;
    }

    fetch(`http://localhost:5000/favorites/${recipe.id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Gagal menghapus dari favorit.");
        }
        setFavorites((prev) => prev.filter((fav) => fav.id !== recipe.id));
        toast.success("Resep berhasil dihapus dari favorit!");
      })
      .catch((err) => {
        console.error('Error removing favorite:', err);
        toast.error("Terjadi kesalahan saat menghapus dari favorit.");
      });
  };

  return (
    <Container>
      <ToastContainer />
      <h1 className="my-4">List Resep Favorit Anda</h1>
      <Row>
        {favorites.length === 0 ? (
          <p>Belum ada resep yang ditambahkan ke favorit.</p>
        ) : (
          favorites.map((recipe) => (
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
                  <Card.Text>{recipe.kategori}</Card.Text>
                  <Button
                    variant="danger"
                    onClick={() => handleRemoveFavorite(recipe)}
                  >
                    Hapus dari Favorit
                  </Button>
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

export default Favorites;