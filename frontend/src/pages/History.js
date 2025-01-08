import React, { useEffect, useState } from 'react';
import { Container, Table } from 'react-bootstrap';
import Sidebar from '../components/Sidebar';
import AdminNavbar from '../components/AdminNavbar';

const History = () => {
  const [history, setHistory] = useState([]);

  // Ambil data riwayat login dari backend
  useEffect(() => {
    fetch('http://localhost:5000/history')
      .then((res) => res.json())
      .then((data) => setHistory(data))
      .catch((err) => console.error('Error:', err));
  }, []);

  return (
    <div className="d-flex" style={{ minHeight: "100vh" }}>
      <Sidebar />
      <div className="flex-grow-1">
        <AdminNavbar />
        <Container className="mt-4">
          <h4>Riwayat Login</h4>
          <Table bordered>
            <thead>
              <tr>
                <th>Username</th>
                <th>Waktu Login</th>
              </tr>
            </thead>
            <tbody>
              {history.length === 0 ? (
                <tr>
                  <td colSpan="2">Tidak ada riwayat login.</td>
                </tr>
              ) : (
                history.map((item, index) => (
                  <tr key={index}>
                    <td>{item.username}</td>
                    <td>{new Date(item.login_time).toLocaleString()}</td>
                  </tr>
                ))
              )}
            </tbody>
          </Table>
        </Container>
      </div>
    </div>
  );
};

export default History;