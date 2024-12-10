import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const CategoryPage = () => {
  const { kategori } = useParams(); // Mengambil kategori dari URL
  const [resep, setResep] = useState([]);

  useEffect(() => {
    // Ambil data resep berdasarkan kategori
    fetch(`http://localhost:5000/recipes/category/${kategori}`)
      .then((res) => res.json())
      .then((data) => setResep(data))
      .catch((err) => console.error('Error:', err));
  }, [kategori]);

  return (
    <Container>
      <h1 className="my-4">Resep Kategori: {kategori.charAt(0).toUpperCase() + kategori.slice(1)}</h1>
      <Row>
        {resep.length === 0 ? (
          <p>Tidak ada resep di kategori ini.</p>
        ) : (
          resep.map((recipe) => (
            <Col md={4} key={recipe.id} className="mb-4">
              <Card>
                <Card.Img variant="top" src={recipe.image} alt={recipe.judul} />
                <Card.Body>
                  <Card.Title>{recipe.judul}</Card.Title>
                  <Card.Text>{recipe.kategori}</Card.Text>
                  <Button as={Link} to={`/recipe/${recipe.id}`} variant="primary">Lihat Detail</Button>
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