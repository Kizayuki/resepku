import React, { useEffect, useState } from 'react';
import { Container, Table, Button, Modal, Form } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import AdminNavbar from '../components/AdminNavbar';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const [resep, setResep] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    id: null,
    nama: "",
    deskripsi: "",
    kategori: "",
    bahan: "",
    langkah: "",
    image: null, // Untuk gambar baru
    oldImage: null, // Untuk gambar yang sudah ada
  });

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (!token) {
      alert('Anda harus login untuk mengakses halaman ini!');
      navigate('/login');
      return;
    }

    const userData = JSON.parse(atob(token.split('.')[1]));
    if (userData.role !== 'admin') {
      alert('Anda harus login sebagai admin untuk mengakses halaman ini!');
      navigate('/login');
    }
  }, [navigate]);

  useEffect(() => {
    fetch('http://localhost:5000/recipes', {
      headers: {
        'Authorization': `Bearer ${sessionStorage.getItem('token')}`
      }
    })
      .then((res) => res.json())
      .then((data) => setResep(data))
      .catch((err) => console.error('Error:', err));
  }, []);

  const handleShowModal = (data = null) => {
    setFormData({
      id: data?.id || null,
      nama: data?.judul || "",
      deskripsi: data?.deskripsi || "",
      kategori: data?.kategori || "",
      bahan: data?.bahan || "",
      langkah: data?.langkah || "",
      image: null,
      oldImage: data?.image || null, // Menyimpan gambar lama untuk ditampilkan jika tidak ada gambar baru
    });
    setShowModal(true);
  };

  const handleSave = () => {
    const method = formData.id ? 'PUT' : 'POST';
    const endpoint = formData.id
      ? `http://localhost:5000/recipes/${formData.id}`
      : 'http://localhost:5000/recipes';
  
    const formPayload = new FormData();
    formPayload.append('judul', formData.nama);
    formPayload.append('deskripsi', formData.deskripsi);
    formPayload.append('kategori', formData.kategori);
    formPayload.append('bahan', formData.bahan);
    formPayload.append('langkah', formData.langkah);
  
    // Kirim gambar baru atau referensi gambar lama
    if (formData.image) {
      formPayload.append('image', formData.image); // Gambar baru
    } else {
      formPayload.append('oldImage', formData.oldImage); // Gambar lama
    }
  
    fetch(endpoint, {
      method,
      headers: {
        'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
      },
      body: formPayload,
    })
      .then((res) => res.json())
      .then((data) => {
        if (formData.id) {
          setResep((prev) =>
            prev.map((recipe) => (recipe.id === data.id ? data : recipe))
          );
          toast.success('Resep berhasil diubah!');
        } else {
          setResep((prev) => [...prev, data]);
          toast.success('Resep berhasil ditambahkan!');
        }
      })
      .catch((err) => {
        toast.error('Terjadi kesalahan saat menyimpan resep.');
        console.error('Error:', err);
      });
    setShowModal(false);
  };  

  const handleDelete = (id) => {
    toast.warn(
      <div>
        Apakah Anda yakin ingin menghapus resep ini?
        <div className="d-flex justify-content-end mt-2">
          <Button
            size="sm"
            variant="danger"
            onClick={() => {
              fetch(`http://localhost:5000/recipes/${id}`, {
                method: 'DELETE',
                headers: {
                  Authorization: `Bearer ${sessionStorage.getItem('token')}`,
                },
              })
                .then((res) => {
                  if (res.ok) {
                    setResep((prev) => prev.filter((recipe) => recipe.id !== id));
                    toast.dismiss();
                    toast.success('Resep berhasil dihapus!');
                  } else if (res.status === 404) {
                    toast.dismiss();
                    toast.error('Resep tidak ditemukan.');
                  } else {
                    throw new Error('Gagal menghapus resep.');
                  }
                })
                .catch((err) => {
                  console.error('Error:', err);
                  toast.dismiss();
                  toast.error('Terjadi kesalahan saat menghapus resep.');
                });
            }}
          >
            Hapus
          </Button>
        </div>
      </div>,
      {
        position: "top-right",
        autoClose: false,
        closeOnClick: false,
        draggable: false,
      }
    );
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
                  <th>Gambar</th>
                  <th>Tindakan</th>
                </tr>
              </thead>
              <tbody>
                {resep.map((item, index) => (
                  <tr key={item.id}>
                    <td>{index + 1}</td>
                    <td>{item.judul}</td>
                    <td>{item.kategori}</td>
                    <td>
                      <img
                        src={`http://localhost:5000${item.image}`}
                        alt={item.judul}
                        style={{ width: '100px', height: '70px', objectFit: 'cover' }}
                      />
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
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Deskripsi</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      value={formData.deskripsi}
                      onChange={(e) => setFormData({ ...formData, deskripsi: e.target.value })}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Kategori</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      value={formData.kategori}
                      onChange={(e) => setFormData({ ...formData, kategori: e.target.value })}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Bahan</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      value={formData.bahan}
                      onChange={(e) => setFormData({ ...formData, bahan: e.target.value })}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Langkah</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      value={formData.langkah}
                      onChange={(e) => setFormData({ ...formData, langkah: e.target.value })}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Gambar</Form.Label>
                    <Form.Control
                      type="file"
                      accept="image/*"
                      onChange={(e) => setFormData({ ...formData, image: e.target.files[0] })}
                    />
                    {formData.oldImage && (
                      <div>
                        <small>Gambar Sebelumnya:</small>
                        <img
                          src={`http://localhost:5000${formData.oldImage}`}
                          alt="Gambar Sebelumnya"
                          style={{ width: '100px', height: '70px', objectFit: 'cover', marginTop: '10px' }}
                        />
                      </div>
                    )}
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
      <ToastContainer />
    </div>
  );
};

export default Dashboard;