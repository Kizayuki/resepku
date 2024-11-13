import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Form, Button } from 'react-bootstrap';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    
    if (username === 'admin' && password === 'admin123') {
      localStorage.setItem('isAdmin', 'true');
      alert('Login berhasil sebagai Admin!');
      navigate('/admin-dashboard');
    } else {
      localStorage.setItem('isAdmin', 'false');
      alert('Login berhasil sebagai User!');
      navigate('/');
    }
  };

  return (
    <Container className="my-5">
      <h2>Login</h2>
      <Form onSubmit={handleLogin}>
        <Form.Group controlId="formUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Masukkan Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Masukkan Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="mt-3">Login</Button>
      </Form>
      <p className="mt-3">
        Belum memiliki akun? <a href="/register">Tekan disini</a>
      </p>
    </Container>
  );
};

export default Login;