import React, { useEffect, useState } from 'react';
import { Container, ListGroup, Button, Row, Col, Modal, Form } from 'react-bootstrap';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

const Comments = () => {
  const [comments, setComments] = useState([]);
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedComment, setSelectedComment] = useState(null);
  const [newComment, setNewComment] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (!token) {
      toast.warning('Login terlebih dahulu untuk melihat komentar.');
      navigate('/login');
      return;
    }

    fetch('http://localhost:5000/user-comments', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setComments(Array.isArray(data) ? data : []))
      .catch((err) => {
        toast.error('Terjadi kesalahan saat mengambil komentar.');
        console.error('Error fetching comments:', err);
      });
  }, [navigate]);

  const handleNavigateToRecipe = (id) => {
    navigate(`/recipe/${id}`);
  };

  const handleEdit = () => {
    const token = sessionStorage.getItem('token');
    if (!token || !selectedComment) return;

    fetch(`http://localhost:5000/comments/${selectedComment.id}`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ komen: newComment }),
    })
      .then((res) => {
        if (res.ok) {
          setComments((prev) =>
            prev.map((comment) =>
              comment.id === selectedComment.id
                ? { ...comment, komen: newComment }
                : comment
            )
          );
          toast.success('Komentar berhasil diperbarui.');
          setEditModal(false);
        } else {
          toast.error('Gagal memperbarui komentar.');
        }
      })
      .catch((err) => {
        console.error('Error updating comment:', err);
        toast.error('Terjadi kesalahan saat memperbarui komentar.');
      });
  };

  const handleDelete = () => {
    const token = sessionStorage.getItem('token');
    if (!token || !selectedComment) return;

    fetch(`http://localhost:5000/comments/${selectedComment.id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (res.ok) {
          setComments((prev) => prev.filter((comment) => comment.id !== selectedComment.id));
          toast.success('Komentar berhasil dihapus.');
          setDeleteModal(false);
        } else {
          toast.error('Gagal menghapus komentar.');
        }
      })
      .catch((err) => {
        console.error('Error deleting comment:', err);
        toast.error('Terjadi kesalahan saat menghapus komentar.');
      });
  };

  return (
    <Container className="my-4">
      <ToastContainer />
      <h2>Daftar Komentar Anda</h2>
      {comments.length === 0 ? (
        <p>Tidak ada komentar untuk ditampilkan karena anda belum menambahkan komentar.</p>
      ) : (
        <ListGroup>
          {comments.map((comment) => (
            <ListGroup.Item key={comment.id}>
              <Row>
                <Col>
                  <strong>{comment.judul}</strong>: {comment.komen}
                  <br />
                  <em>{new Date(comment.tanggal).toLocaleString()}</em>
                </Col>
                <Col xs="auto">
                  <Button
                    variant="info"
                    onClick={() => handleNavigateToRecipe(comment.id_resep)}
                  >
                    Lihat Resep
                  </Button>{' '}
                  <Button
                    variant="warning"
                    onClick={() => {
                      setSelectedComment(comment);
                      setNewComment(comment.komen);
                      setEditModal(true);
                    }}
                  >
                    Edit
                  </Button>{' '}
                  <Button
                    variant="danger"
                    onClick={() => {
                      setSelectedComment(comment);
                      setDeleteModal(true);
                    }}
                  >
                    Hapus
                  </Button>
                </Col>
              </Row>
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}

      {/* Modal Edit Komentar */}
      <Modal show={editModal} onHide={() => setEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Komentar</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Komentar</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setEditModal(false)}>
            Batal
          </Button>
          <Button variant="primary" onClick={handleEdit}>
            Simpan
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal Hapus Komentar */}
      <Modal show={deleteModal} onHide={() => setDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Hapus Komentar</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Apakah Anda yakin ingin menghapus komentar ini?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setDeleteModal(false)}>
            Batal
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Hapus
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Comments;