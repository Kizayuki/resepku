import React, { useEffect, useState } from 'react';
import { Container, ListGroup, Navbar, Nav, Button, Table } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';

const DataUser = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
    setUsers(storedUsers);
  }, []);

  useEffect(() => {
    const isAdmin = localStorage.getItem('isAdmin');
    if (!isAdmin || isAdmin === 'false') {
      alert('Anda harus login sebagai admin untuk mengakses halaman ini!');
      navigate('/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('isAdmin');
    alert('Anda telah logout!');
    navigate('/login');
  };

  const toggleBlockUser = (username) => {
    const updatedUsers = users.map(user =>
      user.username === username ? { ...user, blocked: !user.blocked } : user
    );
    setUsers(updatedUsers);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
  };

  return (
    <div className="d-flex" style={{ minHeight: "100vh" }}>
      <div className="bg-primary text-white p-3" style={{ width: "250px", minHeight: "100vh" }}>
        <h5 className="text-center">Dashboard Admin Resepku</h5>
        <ListGroup variant="flush" className="mt-4">
          <ListGroup.Item
            action
            className="bg-primary text-white border-0"
            onClick={() => navigate('/dashboard')}
          >
            <i className="bi bi-house-door-fill me-2"></i> Data Resep
          </ListGroup.Item>
          <ListGroup.Item
            action
            className="bg-primary text-white border-0"
            onClick={() => navigate('/data-user')}
          >
            <i className="bi bi-person-fill me-2"></i> Data User
          </ListGroup.Item>
          <ListGroup.Item
            action
            className="bg-primary text-white border-0"
            onClick={() => navigate('/history')}
          >
            <i className="bi bi-table me-2"></i> Riwayat Pengunjung
          </ListGroup.Item>
        </ListGroup>
      </div>
      <div className="flex-grow-1">
        <Navbar bg="light" expand="lg" className="shadow-sm">
          <Container fluid>
          <Navbar.Brand>Menu Dashboard Admin Resepku</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ms-auto">
                <Button variant="danger" onClick={handleLogout}>Logout</Button>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <Container className="mt-4">
          <h4>List Data User</h4>
          <Table bordered>
            <thead>
              <tr>
                <th>#</th>
                <th>Username</th>
                <th>Status</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={user.username}>
                  <td>{index + 1}</td>
                  <td>{user.username}</td>
                  <td>
                    {user.blocked ? (
                      <span className="text-danger">Diblokir</span>
                    ) : (
                      <span className="text-success">Aktif</span>
                    )}
                  </td>
                  <td>
                    <Button
                      variant={user.blocked ? "success" : "danger"}
                      size="sm"
                      onClick={() => toggleBlockUser(user.username)}
                    >
                      {user.blocked ? "Unblokir" : "Blokir"}
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Container>
      </div>
    </div>
  );
};

export default DataUser;