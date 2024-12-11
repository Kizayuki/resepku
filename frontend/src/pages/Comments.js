import React, { useEffect, useState } from 'react';
import { Container, ListGroup, Button, Row, Col } from 'react-bootstrap';
import { toast, ToastContainer } from 'react-toastify';
import { Link, useParams } from 'react-router-dom'; // Menggunakan useParams untuk mendapatkan ID resep dari URL
import 'react-toastify/dist/ReactToastify.css';

const Comments = () => {
  const { id } = useParams(); // Mendapatkan ID resep dari URL
  const [comments, setComments] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Untuk mengecek status login user

  // Cek login status
  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (!token) {
      toast.warning('Login terlebih dahulu untuk melihat komentar.');
      setIsLoggedIn(false);
      return;
    }

    setIsLoggedIn(true); // User login jika token ada

    fetch(`http://localhost:5000/comments/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`, // Kirimkan token JWT
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setComments(data);
        } else {
          setComments([]); // Jika tidak ada komentar, tampilkan array kosong
        }
      })
      .catch((err) => {
        toast.error('Terjadi kesalahan saat mengambil komentar.');
        console.error('Error fetching comments:', err);
      });
  }, [id]);

  // Hapus komentar (misalnya, menambahkan aksi hapus jika perlu)
  const handleDelete = (commentId) => {
    const token = sessionStorage.getItem('token');
    if (!token) {
      toast.warning('Login terlebih dahulu untuk menghapus komentar.');
      return;
    }

    // Memastikan user yakin sebelum menghapus
    if (window.confirm('Apakah Anda yakin ingin menghapus komentar ini?')) {
      fetch(`http://localhost:5000/comments/${commentId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => {
          if (res.ok) {
            setComments((prevComments) => prevComments.filter((comment) => comment.id !== commentId));
            toast.success('Komentar berhasil dihapus!');
          } else {
            toast.error('Terjadi kesalahan saat menghapus komentar.');
          }
        })
        .catch((err) => {
          toast.error('Terjadi kesalahan saat menghapus komentar.');
          console.error('Error deleting comment:', err);
        });
    }
  };

  return (
    <Container className="my-4">
      <ToastContainer />
      <h2>Daftar Komentar</h2>
      {comments.length === 0 ? (
        <p>Tidak ada komentar untuk ditampilkan.</p>
      ) : (
        <ListGroup>
          {comments.map((comment) => (
            <ListGroup.Item key={comment.id}>
              <Row>
                <Col>
                  <strong>{comment.username}</strong>: {comment.komen}
                  <br />
                  <em>{new Date(comment.tanggal).toLocaleString()}</em>
                </Col>
                <Col className="text-end">
                  {isLoggedIn && (
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleDelete(comment.id)} // Menambahkan aksi hapus pada komentar
                    >
                      Hapus
                    </Button>
                  )}
                </Col>
              </Row>
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}

      {/* Link ke halaman detail resep jika diperlukan */}
      <Link to={`/recipe/${id}`}>
        <Button variant="secondary" className="mt-3">
          Kembali ke Detail Resep
        </Button>
      </Link>
    </Container>
  );
};

export default Comments;