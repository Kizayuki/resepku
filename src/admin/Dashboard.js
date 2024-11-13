import React, { useEffect } from 'react';
import { Container, Button } from 'react-bootstrap';
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
    <Container className="my-5">
      <h2>Dashboard Admin</h2>
      <p>Selamat datang di dashboard admin!</p>
      <Button variant="danger" onClick={handleLogout}>Logout</Button>
    </Container>
  );
};

export default AdminDashboard;