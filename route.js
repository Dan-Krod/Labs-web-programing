const express = require('express'); 
const router = express.Router();
const db = require('./book-db');  

// GET - Отримання всіх книг
router.get('/books', (req, res) => {
  const { search = '', sortBy, order = 'asc' } = req.query;

  const cleanedSearch = search.toLowerCase().replace(/\s+/g, '').toLowerCase('uk');

  let query = `
    SELECT * FROM books 
    WHERE LOWER(REPLACE(title, ' ', '')) LIKE ? 
    OR LOWER(REPLACE(author, ' ', '')) LIKE ?`;
  
  const params = [`%${cleanedSearch}%`, `%${cleanedSearch}%`]; 

  console.log(`SQL query: ${query}, Search params: ${params}`);

  if (sortBy) {
    query += ` ORDER BY ${sortBy} ${order.toUpperCase()}`;
  }

  db.all(query, params, (err, rows) => {
    if (err) {
      console.error('Error fetching books:', err.message);
      return res.status(500).json({ error: err.message });
    }

    res.json(rows); 
  });
});


// GET - Отримання книги за ID
router.get('/books/:id', (req, res) => {
  const id = req.params.id;
  db.get('SELECT * FROM books WHERE id = ?', [id], (err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!row) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.json(row);
  });
});

// POST - Додавання нової книги
router.post('/books', (req, res) => {
  const { title, author, pages, rating, lastView, image } = req.body;

  db.get('SELECT * FROM books WHERE title = ? AND author = ?', [title, author], (err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (row) {
      return res.status(409).json({ message: "Ця книга вже додана." });
    }

    db.run('INSERT INTO books (title, author, pages, rating, lastView, image) VALUES (?, ?, ?, ?, ?, ?)', 
    [title, author, pages, rating, lastView, image], function(err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.status(201).json({ id: this.lastID });
    });
  });
});

// PUT - Оновлення книги
router.put('/books/:id', (req, res) => {
  const { title, author, pages, rating, lastView, image } = req.body;
  const id = req.params.id;

  db.run('UPDATE books SET title = ?, author = ?, pages = ?, rating = ?, lastView = ?, image = ? WHERE id = ?', 
  [title, author, pages, rating, lastView, image, id], function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (this.changes === 0) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.json({ updatedID: id });
  });
});

// DELETE - Видалення книги
router.delete('/books/:id', (req, res) => {
  const id = req.params.id;
  db.run('DELETE FROM books WHERE id = ?', [id], function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (this.changes === 0) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.json({ message: 'Book deleted' });
  });
});

module.exports = router;












// router.get('/books/total-pages', (req, res) => {
//   const query = 'SELECT SUM(pages) as totalPages FROM books';

//   db.get(query, [], (err, result) => {
//     if (err) {
//       console.error('Error fetching total pages:', err.message);
//       return res.status(500).json({ error: err.message });
//     }

//     // Якщо результат порожній або totalPages є null
//     if (!result || result.totalPages === null) {
//       console.log('No pages found or total is null');
//       return res.json({ totalPages: 0 });
//     }

//     console.log(`Total pages: ${result.totalPages}`);
//     res.json({ totalPages: result.totalPages });
//   });
// });