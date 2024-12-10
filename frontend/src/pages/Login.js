import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Form, Button } from 'react-bootstrap';
import { LoginContext } from '../context/LoginContext';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(LoginContext);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
    const user = storedUsers.find(u => u.username === username && u.password === password);

    if (user) {
      if (user.blocked) {
        alert("Akun Anda telah diblokir!");
      } else {
        login();
        alert("Login berhasil!");
        navigate('/');
      }
    } else if (username === 'admin' && password === 'admin123') {
      localStorage.setItem('isAdmin', 'true');
      login();
      alert('Login berhasil sebagai Admin!');
      navigate('/dashboard');
    } else {
      alert('Username atau password salah!');
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
            placeholder="Masukkan Username Anda"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Masukkan Password Anda"
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