import React, { useEffect } from 'react';
import { Container, Row, Col, Card, ListGroup, Navbar, Nav, Button } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const isAdmin = localStorage.getItem('isAdmin');
    if (!isAdmin || isAdmin === 'false') {
      alert('Anda harus login sebagai admin untuk mengakses dashboard ini!');
      navigate('/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('isAdmin');
    alert('Anda telah logout!');
    navigate('/login');
  };

  return (
    <div className="d-flex" style={{ minHeight: "100vh" }}>
      <div
        className="bg-primary text-white p-3"
        style={{ width: "250px", minHeight: "100vh" }}
      >
        <h4 className="text-center">Dahboard Admin Resepku</h4>
        <ListGroup variant="flush" className="mt-4">
          <ListGroup.Item action className="bg-primary text-white border-0">
            <i className="bi bi-house-door-fill me-2"></i> Data Resep
          </ListGroup.Item>
          <ListGroup.Item action className="bg-primary text-white border-0">
            <i className="bi bi-person-fill me-2"></i> Data User
          </ListGroup.Item>
          <ListGroup.Item action className="bg-primary text-white border-0">
            <i className="bi bi-table me-2"></i> Riwayat Pengunjung
          </ListGroup.Item>
        </ListGroup>
      </div>

      <div className="flex-grow-1">
        <Navbar bg="light" expand="lg" className="shadow-sm">
          <Container fluid>
            <Navbar.Brand>Menu Dashboard</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ms-auto">
                <Button variant="danger" onClick={handleLogout}>Logout</Button>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>

        <Container className="mt-4">
          <Row>
            <Col md={6}>
              <Card>
                <Card.Body>
                  <Card.Title>Email Statistics</Card.Title>
                  <Card.Text>Last Campaign Performance</Card.Text>
                  <div className="d-flex justify-content-center">
                    <img
                      src="https://via.placeholder.com/200"
                      alt="Pie Chart"
                      className="img-fluid"
                    />
                  </div>
                  <p className="text-muted mt-3">
                    <i>Campaign sent 2 days ago</i>
                  </p>
                </Card.Body>
              </Card>
            </Col>

            <Col md={6}>
              <Card>
                <Card.Body>
                  <Card.Title>User Behavior</Card.Title>
                  <Card.Text>24 Hours Performance</Card.Text>
                  <div className="d-flex justify-content-center">
                    <img
                      src="https://via.placeholder.com/300x150"
                      alt="Line Chart"
                      className="img-fluid"
                    />
                  </div>
                  <p className="text-muted mt-3">
                    <i>Updated 3 minutes ago</i>
                  </p>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default AdminDashboard;