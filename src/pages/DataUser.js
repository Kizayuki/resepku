import React, { useEffect, useState } from 'react';
import { Container, Table, Button } from 'react-bootstrap';
import Sidebar from '../components/Sidebar';
import AdminNavbar from '../components/AdminNavbar';

const DataUser = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
    setUsers(storedUsers);
  }, []);

  const toggleBlockUser = (username) => {
    const updatedUsers = users.map(user =>
      user.username === username ? { ...user, blocked: !user.blocked } : user
    );
    setUsers(updatedUsers);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
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
                <tr key={user.username}>
                  <td>{index + 1}</td>
                  <td>{user.username}</td>
                  <td>{user.blocked ? 'Diblokir' : 'Aktif'}</td>
                  <td>
                    <Button
                      variant={user.blocked ? 'success' : 'danger'}
                      onClick={() => toggleBlockUser(user.username)}
                    >
                      {user.blocked ? 'Unblokir' : 'Blokir'}
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