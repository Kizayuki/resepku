import React, { useContext } from 'react';
import { Navbar as BootstrapNavbar, Nav, Container, NavDropdown, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { LoginContext } from '../context/LoginContext';

const NavBar = () => {
  const { isLoggedIn, logout } = useContext(LoginContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <BootstrapNavbar bg="light" expand="lg">
      <Container>
        <BootstrapNavbar.Brand as={Link} to="/">Resepku</BootstrapNavbar.Brand>
        <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />
        <BootstrapNavbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <NavDropdown title="Kategori" id="basic-nav-dropdown">
              <NavDropdown.Item href="#breakfast">Sarapan</NavDropdown.Item>
              <NavDropdown.Item href="#lunch">Makan Siang</NavDropdown.Item>
              <NavDropdown.Item href="#dinner">Makan Malam</NavDropdown.Item>
              <NavDropdown.Item href="#snack">Cemilan</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link as={Link} to="/favorites">Favorit</Nav.Link>
          </Nav>
          <Nav className="ms-auto">
            {isLoggedIn ? (
              <Button variant="danger" onClick={handleLogout} className="ml-auto">
                Logout
              </Button>
            ) : (
              <Button as={Link} to="/login" variant="primary" className="ml-auto">
                Login
              </Button>
            )}
          </Nav>
        </BootstrapNavbar.Collapse>
      </Container>
    </BootstrapNavbar>
  );
};

export default NavBar;