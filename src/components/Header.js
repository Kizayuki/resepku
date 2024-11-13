import React from 'react';
import { Container } from 'react-bootstrap';

const Header = () => {
  return (
    <header className="bg-dark text-white text-center py-3">
      <Container>
        <h1>Selamat Datang di Resepku</h1>
        <p>Temukan berbagai resep masakan sederhana di sini!</p>
      </Container>
    </header>
  );
};

export default Header;