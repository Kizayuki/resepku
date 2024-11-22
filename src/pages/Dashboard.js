import React, { useEffect, useState } from 'react';
import { Container, Table, Button, Modal, Form } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import AdminNavbar from '../components/AdminNavbar';

const Dashboard = () => {
  const navigate = useNavigate();
  const [resep, setResep] = useState([
    { id: 1, nama: "Nasi Goreng", kategori: "Makanan Utama" },
    { id: 2, nama: "Es Teh Manis", kategori: "Minuman" },
  ]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ id: null, nama: "", kategori: "" });

  useEffect(() => {
    const isAdmin = localStorage.getItem('isAdmin');
    if (!isAdmin || isAdmin === 'false') {
      alert('Anda harus login sebagai admin untuk mengakses halaman ini!');
      navigate('/login');
    }
  }, [navigate]);

  const handleShowModal = (data = { id: null, nama: "", kategori: "" }) => {
    setFormData(data);
    setShowModal(true);
  };

  const handleSave = () => {
    if (formData.id) {
      setResep(resep.map(r => (r.id === formData.id ? formData : r)));
    } else {
      setResep([...resep, { ...formData, id: Date.now() }]);
    }
    setShowModal(false);
  };

  const handleDelete = (id) => {
    setResep(resep.filter(r => r.id !== id));
  };

  return (
    <div className="d-flex" style={{ minHeight: "100vh" }}>
      <Sidebar />
      <div className="flex-grow-1">
        <AdminNavbar />
        <Container className="mt-4">
          <div className="p-4">
            <h4>List Data Resep</h4>
            <Button onClick={() => handleShowModal()} className="mb-3">Tambah Resep</Button>
            <Table bordered>
              <thead>
                <tr>
                  <th>No</th>
                  <th>Nama Resep</th>
                  <th>Kategori</th>
                  <th>Tindakan</th>
                </tr>
              </thead>
              <tbody>
                {resep.map((item, index) => (
                  <tr key={item.id}>
                    <td>{index + 1}</td>
                    <td>{item.nama}</td>
                    <td>{item.kategori}</td>
                    <td>
                      <Button
                        variant="warning"
                        size="sm"
                        onClick={() => handleShowModal(item)}
                      >
                        Edit
                      </Button>{" "}
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleDelete(item.id)}
                      >
                        Hapus
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <Modal show={showModal} onHide={() => setShowModal(false)}>
              <Modal.Header closeButton>
                <Modal.Title>{formData.id ? "Edit Resep" : "Tambah Resep"}</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form>
                  <Form.Group className="mb-3">
                    <Form.Label>Nama Resep</Form.Label>
                    <Form.Control
                      type="text"
                      value={formData.nama}
                      onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Kategori</Form.Label>
                    <Form.Control
                      type="text"
                      value={formData.kategori}
                      onChange={(e) => setFormData({ ...formData, kategori: e.target.value })}
                    />
                  </Form.Group>
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={() => setShowModal(false)}>
                  Batal
                </Button>
                <Button variant="primary" onClick={handleSave}>
                  Simpan
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Dashboard;