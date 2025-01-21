import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Form, Button, InputGroup, Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Password dan konfirmasi password tidak cocok!');
      return;
    }
    fetch('http://localhost:5000/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password, role: 'user', status: 'active' }),
    })
      .then((res) => {
        if (res.ok) {
          alert('Registrasi berhasil!');
          navigate('/login');
        } else if (res.status === 409) {
          throw new Error('Username sudah digunakan!');
        } else {
          throw new Error('Terjadi kesalahan saat registrasi.');
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
          <h2 className="text-center mb-4">Register</h2>
          <Form onSubmit={handleRegister}>
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
            <Form.Group controlId="formConfirmPassword" className="mt-3">
              <Form.Label>Konfirmasi Password</Form.Label>
              <InputGroup>
                <Form.Control
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="Ulangi Password Anda"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
                <Button
                  variant="outline-secondary"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
                </Button>
              </InputGroup>
            </Form.Group>
            <Button variant="primary" type="submit" className="w-100 mt-4">
              Register
            </Button>
            <p className="text-center mt-3">
              Sudah memiliki akun? <a href="/login">Tekan disini</a>
            </p>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Register;