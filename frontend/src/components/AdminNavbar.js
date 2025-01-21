import React, { useEffect } from 'react';
import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const AdminNavbar = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Memeriksa apakah token ada di sessionStorage dan apakah role adalah 'admin'
    const token = sessionStorage.getItem('token');
    const username = sessionStorage.getItem('username');
    
    if (!token || !username) {
      navigate('/login');
    } else {
      const userData = JSON.parse(atob(token.split('.')[1]));
      if (userData.role !== 'admin') {
        navigate('/');
      }
    }
  }, [navigate]);

  const handleLogout = () => {
    // Menghapus token dari sessionStorage untuk logout
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('username');
    alert("Berhasil Logout!");
    navigate('/login');
  };

  return (
    <Navbar bg="light" expand="lg" className="shadow-sm">
      <Container fluid>
        <Navbar.Brand>Menu Dashboard Admin Resepku</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Button variant="danger" onClick={handleLogout}>
              Logout
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AdminNavbar;