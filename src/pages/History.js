import React from 'react';
import { Container } from 'react-bootstrap';
import Sidebar from '../components/Sidebar';
import AdminNavbar from '../components/AdminNavbar';

const History = () => {
  return (
    <div className="d-flex" style={{ minHeight: "100vh" }}>
      <Sidebar />
      <div className="flex-grow-1">
        <AdminNavbar />
        <Container className="mt-4">
          <h4>Riwayat Pengunjung</h4>
          {/* Konten riwayat pengunjung */}
        </Container>
      </div>
    </div>
  );
};

export default History;