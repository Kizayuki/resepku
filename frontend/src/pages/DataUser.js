import React, { useEffect, useState } from 'react';
import { Container, Table, Button } from 'react-bootstrap';
import Sidebar from '../components/Sidebar';
import AdminNavbar from '../components/AdminNavbar';

const DataUser = () => {
  const [users, setUsers] = useState([]);

  // Mengambil data user dari backend
  useEffect(() => {
    fetch('http://localhost:5000/users')
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.error('Error:', err));
  }, []);

  // Blokir atau unblock user
  const toggleBlockUser = (id, status) => {
    const newStatus = status === 'active' ? 'blocked' : 'active';

    fetch(`http://localhost:5000/users/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newStatus }),
    })
      .then((res) => {
        if (res.ok) {
          setUsers((prevUsers) =>
            prevUsers.map((user) =>
              user.id === id ? { ...user, status: newStatus } : user
            )
          );
        } else {
          throw new Error('Gagal memperbarui status user.');
        }
      })
      .catch((err) => console.error('Error:', err));
  };

  return (
    <div className="d-flex" style={{ minHeight: "100vh" }}>
      <Sidebar />
      <div className="flex-grow-1">
        <AdminNavbar />
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
                <tr key={user.id}>
                  <td>{index + 1}</td>
                  <td>{user.username}</td>
                  <td>{user.status === 'blocked' ? 'Diblokir' : 'Aktif'}</td>
                  <td>
                    <Button
                      variant={user.status === 'blocked' ? 'success' : 'danger'}
                      onClick={() => toggleBlockUser(user.id, user.status)}
                    >
                      {user.status === 'blocked' ? 'Unblokir' : 'Blokir'}
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