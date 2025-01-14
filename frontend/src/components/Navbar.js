import React from 'react';
import { Navbar as BootstrapNavbar, Nav, Container, NavDropdown, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

const NavBar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Menghapus token dari sessionStorage
    sessionStorage.removeItem('token');
    alert('Logout berhasil!');
    navigate('/login');
  };

  const isLoggedIn = !!sessionStorage.getItem('token'); // Cek jika ada token di sessionStorage

  return (
    <BootstrapNavbar bg="light" expand="lg">
      <Container>
        <BootstrapNavbar.Brand as={Link} to="/">Resepku</BootstrapNavbar.Brand>
        <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />
        <BootstrapNavbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {/* Menu Home */}
            <Nav.Link as={Link} to="/">Home</Nav.Link>

            {/* Dropdown Kategori */}
            <NavDropdown title="Kategori" id="basic-nav-dropdown">
              <NavDropdown.Item as={Link} to="/category/sarapan">Sarapan</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/category/makan siang">Makan Siang</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/category/makan malam">Makan Malam</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/category/cemilan">Cemilan</NavDropdown.Item>
            </NavDropdown>

            {/* Menu Favorit dan Komentar (Hanya Muncul Jika Login) */}
            {isLoggedIn && (
              <>
                <Nav.Link as={Link} to="/favorites">Favorit</Nav.Link>
                <Nav.Link as={Link} to="/comments">Komentar</Nav.Link>
              </>
            )}
          </Nav>
          <Nav className="ms-auto">
            {/* Tombol Login atau Logout */}
            {isLoggedIn ? (
              <Button variant="danger" onClick={handleLogout}>
                Logout
              </Button>
            ) : (
              <Button as={Link} to="/login" variant="primary">
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