import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Form, Button, InputGroup, Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    fetch('http://localhost:5000/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else if (res.status === 403) {
          throw new Error('Akun Anda telah diblokir.');
        } else {
          throw new Error('Username atau password salah.');
        }
      })
      .then((data) => {
        if (data.token) {
          sessionStorage.setItem('token', data.token);
          sessionStorage.setItem('username', data.username);

          if (data.role === 'admin') {
            alert('Login berhasil sebagai Admin!');
            navigate('/dashboard');
          } else {
            alert('Login berhasil!');
            navigate('/');
          }
        }
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Card style={{ width: '25rem' }} className="shadow-sm">
        <Card.Body>
          <h2 className="text-center mb-4">Login</h2>
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
            <Form.Group controlId="formPassword" className="mt-3">
              <Form.Label>Password</Form.Label>
              <InputGroup>
                <Form.Control
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Masukkan Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <Button
                  variant="outline-secondary"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
                </Button>
              </InputGroup>
            </Form.Group>
            <Button variant="primary" type="submit" className="w-100 mt-4">
              Login
            </Button>
            <p className="text-center mt-3">
              Belum memiliki akun? <a href="/register">Tekan disini</a>
            </p>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Login;