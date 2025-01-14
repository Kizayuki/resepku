import React, { useEffect, useState } from 'react';
import { Container, Table, Button } from 'react-bootstrap';
import Sidebar from '../components/Sidebar';
import AdminNavbar from '../components/AdminNavbar';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const DataUser = () => {
  const [users, setUsers] = useState([]);

  // Mengambil data user dari backend
  useEffect(() => {
    const token = sessionStorage.getItem('token');
    fetch('http://localhost:5000/users', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Gagal mengambil data user.');
        }
        return res.json();
      })
      .then((data) => {
        if (data.length === 0) {
          toast.info('Tidak ada user yang ditemukan.');
        }
        setUsers(data);
      })
      .catch((err) => {
        console.error('Error:', err);
        toast.error('Terjadi kesalahan saat mengambil data user.');
      });
  }, []);

  // Blokir atau unblock user
  const toggleBlockUser = (id, status) => {
    const newStatus = status === 'active' ? 'blocked' : 'active';

    fetch(`http://localhost:5000/users/${id}`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status: newStatus }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Gagal memperbarui status user.');
        }
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user.id === id ? { ...user, status: newStatus } : user
          )
        );
        toast.success(
          `User berhasil ${newStatus === 'blocked' ? 'diblokir' : 'diunblokir'}.`
        );
      })
      .catch((err) => {
        console.error('Error:', err);
        toast.error('Terjadi kesalahan saat memperbarui status user.');
      });
  };

  return (
    <div className="d-flex" style={{ minHeight: '100vh' }}>
      <Sidebar />
      <div className="flex-grow-1">
        <AdminNavbar />
        <Container className="mt-4">
          <ToastContainer />
          <h4>List Data User</h4>
          {users.length === 0 ? (
            <p>Tidak ada user yang ditemukan.</p>
          ) : (
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
          )}
        </Container>
      </div>
    </div>
  );
};

export default DataUser;