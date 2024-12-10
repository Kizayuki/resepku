import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Form, Button, InputGroup } from 'react-bootstrap';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // Mengirim permintaan login ke backend
    fetch('http://localhost:5000/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json(); // Mengembalikan token jika login berhasil
        } else if (res.status === 403) {
          throw new Error('Akun Anda telah diblokir.');
        } else {
          throw new Error('Username atau password salah.');
        }
      })
      .then((data) => {
        if (data.token) {
          // Simpan token JWT di sessionStorage
          sessionStorage.setItem('token', data.token);
          sessionStorage.setItem('username', data.username); // Simpan username jika diperlukan

          // Navigasi berdasarkan role pengguna
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
        alert(err.message); // Menampilkan pesan error jika login gagal
      });
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
          <InputGroup>
            <Form.Control
              type={showPassword ? "text" : "password"}
              placeholder="Masukkan Password Anda"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Button
              variant="outline-secondary"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "Sembunyikan" : "Lihat"}
            </Button>
          </InputGroup>
        </Form.Group>
        <Button variant="primary" type="submit" className="mt-3">
          Login
        </Button>
        <p className="mt-3">
          Belum memiliki akun? <a href="/register">Tekan disini</a>
        </p>
      </Form>
    </Container>
  );
};

export default Login;