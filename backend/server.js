const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Koneksi ke database
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'db_resep',
});

db.connect((err) => {
  if (err) {
    console.error('Koneksi ke database gagal:', err);
    return;
  }
  console.log('Koneksi ke database berhasil.');
});

// Routes

// Get semua resep
app.get('/recipes', (req, res) => {
  db.query('SELECT * FROM resep', (err, results) => {
    if (err) {
      res.status(500).send(err);
      return;
    }
    res.json(results);
  });
});

// Tambah resep
app.post('/recipes', (req, res) => {
  const { nama, kategori, image_url } = req.body;
  db.query(
    'INSERT INTO resep (nama, kategori, image_url) VALUES (?, ?, ?)',
    [nama, kategori, image_url],
    (err, result) => {
      if (err) {
        res.status(500).send(err);
        return;
      }
      res.json({ id: result.insertId, nama, kategori, image_url });
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

// Get semua favorit
app.get('/favorites', (req, res) => {
  db.query(
    `SELECT r.* FROM favorit f 
     INNER JOIN resep r ON f.id_resep = r.id`,
    (err, results) => {
      if (err) {
        res.status(500).send(err);
        return;
      }
      res.json(results);
    }
  );
});

// Tambah favorit
app.post('/favorites', (req, res) => {
  const { recipe_id } = req.body;
  db.query('INSERT INTO favorit (id_resep) VALUES (?)', [recipe_id], (err) => {
    if (err) {
      res.status(500).send(err);
      return;
    }
    res.sendStatus(201);
  });
});

// Hapus favorit
app.delete('/favorites/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM favorit WHERE id_resep = ?', [id], (err) => {
    if (err) {
      res.status(500).send(err);
      return;
    }
    res.sendStatus(200);
  });
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server berjalan di port ${PORT}`);
});