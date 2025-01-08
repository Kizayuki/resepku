const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const app = express();
app.use(bodyParser.json());
app.use(cors());

// ** Koneksi ke Database **
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'resepku',
});

db.connect((err) => {
  if (err) {
    console.error('Koneksi ke database gagal:', err);
    return;
  }
  console.log('Koneksi ke database berhasil.');
});

// ** Middleware untuk Verifikasi Token **
const authenticateToken = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];
  if (!token) return res.status(401).send('Akses ditolak. Token tidak ditemukan.');

  jwt.verify(token, 'secret_key', (err, user) => {
    if (err) return res.status(403).send('Token tidak valid.');
    req.user = user; // Menyimpan informasi user di request
    next();
  });
};

// ** Routes **
// Ambil semua data resep
app.get('/recipes', (req, res) => {
  db.query('SELECT * FROM resep', (err, results) => {
    if (err) {
      res.status(500).send(err);
      return;
    }
    res.json(results.length > 0 ? results : []); // Selalu kirim array
  });
});

// Ambil resep berdasarkan ID
app.get('/recipes/:id', (req, res) => {
  const { id } = req.params;

  db.query('SELECT * FROM resep WHERE id = ?', [id], (err, results) => {
    if (err) {
      res.status(500).send(err);
      return;
    }
    if (results.length === 0) {
      res.status(404).send('Resep tidak ditemukan.');
      return;
    }
    res.json(results[0]);
  });
});

// Tambah resep
app.post('/recipes', (req, res) => {
  const { judul, deskripsi, kategori, bahan, langkah, image } = req.body;

  db.query(
    'INSERT INTO resep (judul, deskripsi, kategori, bahan, langkah, image, tanggal) VALUES (?, ?, ?, ?, ?, ?, NOW())',
    [judul, deskripsi, kategori, bahan, langkah, image],
    (err, result) => {
      if (err) {
        res.status(500).send(err);
        return;
      }
      res.json({
        id: result.insertId,
        judul,
        deskripsi,
        kategori,
        bahan,
        langkah,
        image,
        tanggal: new Date(),
      });
    }
  );
});

// Edit resep
app.put('/recipes/:id', (req, res) => {
  const { id } = req.params;
  const { judul, deskripsi, kategori, bahan, langkah, image } = req.body;

  db.query(
    'UPDATE resep SET judul = ?, deskripsi = ?, kategori = ?, bahan = ?, langkah = ?, image = ? WHERE id = ?',
    [judul, deskripsi, kategori, bahan, langkah, image, id],
    (err, result) => {
      if (err) {
        res.status(500).send(err);
        return;
      }
      if (result.affectedRows > 0) {
        res.json({ id, judul, deskripsi, kategori, bahan, langkah, image });
      } else {
        res.status(404).send('Resep tidak ditemukan.');
      }
    }
  );
});

// Hapus resep
app.delete('/recipes/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM resep WHERE id = ?', [id], (err) => {
    if (err) {
      res.status(500).send(err);
      return;
    }
    res.sendStatus(200);
  });
});

// Endpoint untuk daftar favorit
app.get('/favorites', authenticateToken, (req, res) => {
  const id_user = req.user.id;

  db.query(
    'SELECT r.id, r.judul, r.kategori, r.image FROM favorit f JOIN resep r ON f.id_resep = r.id WHERE f.id_user = ?',
    [id_user],
    (err, results) => {
      if (err) {
        console.error('Error fetching favorites:', err);
        res.status(500).send(err);
        return;
      }
      res.json(results);
    }
  );
});

// Tambah ke favorit
app.post('/favorites', authenticateToken, (req, res) => {
  const { id_resep } = req.body;
  const id_user = req.user.id; // Ambil id_user dari token

  if (!id_resep) {
    return res.status(400).send('ID Resep harus diisi.');
  }

  db.query(
    'INSERT INTO favorit (id_resep, id_user) VALUES (?, ?)',
    [id_resep, id_user],
    (err) => {
      if (err) {
        console.error('Query Error:', err);
        res.status(500).send(err);
        return;
      }
      res.status(201).send('Resep berhasil ditambahkan ke favorit.');
    }
  );
});

// Hapus dari favorit
app.delete('/favorites/:id', authenticateToken, (req, res) => {
  const { id } = req.params; // ID resep
  const id_user = req.user.id; // Ambil id_user dari token

  db.query(
    'DELETE FROM favorit WHERE id_resep = ? AND id_user = ?',
    [id, id_user],
    (err) => {
      if (err) {
        console.error('Query Error:', err);
        res.status(500).send(err);
        return;
      }
      res.status(200).send('Resep berhasil dihapus dari favorit.');
    }
  );
});

// Endpoint untuk registrasi
app.post('/register', (req, res) => {
  const { username, password, role, status } = req.body;

  // Periksa apakah username sudah ada
  db.query('SELECT * FROM user WHERE username = ?', [username], (err, results) => {
    if (err) {
      res.status(500).send(err);
      return;
    }

    if (results.length > 0) {
      res.status(409).send('Username sudah digunakan!');
      return;
    }

    // Tambahkan user baru ke database
    db.query(
      'INSERT INTO user (username, password, role, status) VALUES (?, ?, ?, ?)',
      [username, password, role, status],
      (err) => {
        if (err) {
          res.status(500).send(err);
          return;
        }
        res.sendStatus(201); // Registrasi berhasil
      }
    );
  });
});

// Endpoint untuk login
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  db.query(
    'SELECT * FROM user WHERE username = ? AND password = ?',
    [username, password],
    (err, results) => {
      if (err) {
        res.status(500).send(err);
        return;
      }
      if (results.length > 0) {
        const user = results[0];

        // Cek apakah akun diblokir
        if (user.status === 'blocked') {
          res.status(403).send('Akun Anda telah diblokir.');
          return;
        }

        // Simpan riwayat login ke tabel 'history'
        db.query(
          'INSERT INTO history (username) VALUES (?)',
          [username],
          (err) => {
            if (err) {
              res.status(500).send(err);
              return;
            }
          }
        );

        // Generate JWT token
        const token = jwt.sign(
          { id: user.id, username: user.username, role: user.role },
          'secret_key', // Gantilah dengan key yang lebih aman
          { expiresIn: '1h' } // Token akan expired dalam 1 jam
        );

        // Kirim token kepada pengguna
        res.json({ token, username: user.username, role: user.role });
      } else {
        res.status(401).send('Username atau password salah.');
      }
    }
  );
});

// Ambil History
app.get('/history', (req, res) => {
  db.query(
    'SELECT username, login_time FROM history WHERE username != "admin" ORDER BY login_time DESC',
    (err, results) => {
      if (err) {
        res.status(500).send(err);
        return;
      }
      res.json(results);
    }
  );
});

// Endpoint untuk mengambil semua user (kecuali admin)
app.get('/users', authenticateToken, (req, res) => {
  const { role } = req.user;
  if (role !== 'admin') {
    return res.status(403).send('Akses ditolak, hanya admin yang bisa melihat data user.');
  }

  db.query('SELECT id, username, status FROM user WHERE role != "admin"', (err, results) => {
    if (err) {
      res.status(500).send(err);
      return;
    }
    res.json(results);
  });
});

// Endpoint untuk memperbarui status user
app.patch('/users/:id', authenticateToken, (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  db.query(
    'UPDATE user SET status = ? WHERE id = ?',
    [status, id],
    (err) => {
      if (err) {
        res.status(500).send(err);
        return;
      }
      res.sendStatus(200); // Berhasil memperbarui
    }
  );
});

// Endpoint untuk mengambil resep berdasarkan kategori
app.get('/recipes/category/:kategori', (req, res) => {
  const { kategori } = req.params;

  db.query(
    'SELECT * FROM resep WHERE kategori = ?',
    [kategori],
    (err, results) => {
      if (err) {
        res.status(500).send(err);
        return;
      }
      res.json(results);
    }
  );
});

// Ambil semua komentar berdasarkan ID resep
app.get('/comments/:id_resep', (req, res) => {
  const { id_resep } = req.params;

  db.query(
    'SELECT komentar.komen, komentar.tanggal, user.username FROM komentar JOIN user ON komentar.id_user = user.id WHERE komentar.id_resep = ? ORDER BY komentar.tanggal DESC',
    [id_resep],
    (err, results) => {
      if (err) {
        console.error('Error fetching comments:', err);
        res.status(500).send('Terjadi kesalahan saat mengambil komentar.');
        return;
      }
      res.json(results);
    }
  );
});

// Tambah komentar
app.post('/comments', authenticateToken, (req, res) => {
  const { id_resep, komen } = req.body;
  const id_user = req.user.id;

  if (!id_resep || !komen) {
    return res.status(400).send('ID Resep dan komentar harus diisi');
  }

  db.query(
    'INSERT INTO komentar (id_resep, id_user, komen) VALUES (?, ?, ?)',
    [id_resep, id_user, komen],
    (err, result) => {
      if (err) {
        console.error('Error inserting comment:', err);
        res.status(500).send('Gagal menambahkan komentar.');
        return;
      }

      db.query(
        'SELECT komentar.id, komentar.komen, komentar.tanggal, user.username FROM komentar JOIN user ON komentar.id_user = user.id WHERE komentar.id = ?',
        [result.insertId],
        (err, results) => {
          if (err) {
            console.error('Error fetching inserted comment:', err);
            res.status(500).send('Gagal mengambil komentar yang ditambahkan.');
            return;
          }
          res.status(201).json(results[0]);
        }
      );
    }
  );
});

// Middleware lainnya...
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server berjalan di port ${PORT}`);
});