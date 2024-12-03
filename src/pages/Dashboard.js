import React, { useEffect, useState } from 'react';
import { Container, Table, Button, Modal, Form } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import AdminNavbar from '../components/AdminNavbar';

const Dashboard = () => {
  const navigate = useNavigate();
  const [resep, setResep] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ id: null, nama: "", kategori: "", image_url: "" });

  useEffect(() => {
    const storedRecipes = JSON.parse(localStorage.getItem('recipes')) || [];
    if (storedRecipes.length === 0) {
      const defaultRecipes = [
        { id: 1, nama: "Sosis Bakar Praktis", kategori: "Cemilan", image_url: "/images/sosis.jpg" },
        { id: 2, nama: "Ayam Goreng Praktis", kategori: "Sarapan", image_url: "/images/ayam.jpg" },
        { id: 3, nama: "Japanese Oyakodon Simple", kategori: "Makan Siang", image_url: "/images/oyakodon.jpg" },
        { id: 4, nama: "Donat Simple", kategori: "Cemilan", image_url: "/images/donat.jpg" },
      ];
      localStorage.setItem('recipes', JSON.stringify(defaultRecipes));
      setResep(defaultRecipes);
    } else {
      setResep(storedRecipes);
    }
  }, []);

  const handleShowModal = (data = { id: null, nama: "", kategori: "", image_url: "" }) => {
    setFormData(data);
    setShowModal(true);
  };

  const handleSave = () => {
    let updatedRecipes;
    if (formData.id) {
      updatedRecipes = resep.map(r => (r.id === formData.id ? formData : r));
    } else {
      const newRecipe = { ...formData, id: Date.now() };
      updatedRecipes = [...resep, newRecipe];
    }
    setResep(updatedRecipes);
    localStorage.setItem('recipes', JSON.stringify(updatedRecipes));
    setShowModal(false);
  };

  const handleDelete = (id) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus resep ini?")) {
      const updatedRecipes = resep.filter(r => r.id !== id);
      setResep(updatedRecipes);
      localStorage.setItem('recipes', JSON.stringify(updatedRecipes));
    }
  };

  useEffect(() => {
    const isAdmin = localStorage.getItem('isAdmin');
    if (!isAdmin || isAdmin === 'false') {
      alert('Anda harus login sebagai admin untuk mengakses halaman ini!');
      navigate('/login');
    }
  }, [navigate]);

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
                  <th>Gambar</th>
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
                      <img src={item.image_url} alt={item.nama} style={{ width: "100px" }} />
                    </td>
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
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Kategori</Form.Label>
                    <Form.Control
                      type="text"
                      value={formData.kategori}
                      onChange={(e) => setFormData({ ...formData, kategori: e.target.value })}
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>URL Gambar</Form.Label>
                    <Form.Control
                      type="text"
                      value={formData.image_url}
                      onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                      required
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