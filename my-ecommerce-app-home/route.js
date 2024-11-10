const express = require('express');
const router = express.Router();
const db = require('./database'); // Підключення до бази даних

// Маршрут для отримання всіх продуктів із фільтрацією, пошуком і сортуванням
router.get('/products', (req, res) => {
    const { search, sortCriteria, sortOrder, category } = req.query;

    let sql = 'SELECT * FROM products WHERE 1=1';
    const params = [];

    if (search) {
        sql += ' AND name LIKE ?';
        params.push(`%${search}%`);
    }

    if (category) {
        sql += ' AND category = ?';
        params.push(category);
    }

    if (sortCriteria && sortOrder) {
        const order = sortOrder.toLowerCase() === 'desc' ? 'DESC' : 'ASC';
        sql += ` ORDER BY ${sortCriteria} ${order}`;
    }

    console.log("Executing SQL:", sql, "with params:", params);

    db.all(sql, params, (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(rows);
    });
});


// Маршрут для отримання продукту за ID
router.get('/products/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'SELECT * FROM products WHERE id = ?';
    db.get(sql, [id], (err, row) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (!row) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.json(row);
    });
});

// Маршрут для додавання нового продукту
router.post('/products', (req, res) => {
    const { name, description, price, category, additional_info, image_url } = req.body;
    const sql = 'INSERT INTO products (name, description, price, category, additional_info, image_url) VALUES (?, ?, ?, ?, ?, ?)';
    db.run(sql, [name, description, price, category, additional_info, image_url], function(err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ 
            id: this.lastID, 
            name, 
            description, 
            price, 
            category, 
            additional_info, 
            image_url 
        });
    });
});

// Маршрут для видалення продукту за ID
router.delete('/products/:id', (req, res) => {
    const { id } = req.params;
    db.run('DELETE FROM products WHERE id = ?', id, function(err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (this.changes === 0) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.status(204).end();
    });
});

// Маршрут для оновлення продукту за ID
router.put('/products/:id', (req, res) => {
    const { id } = req.params;
    const { name, description, price, category, additional_info, image_url } = req.body;
    const sql = `
        UPDATE products 
        SET name = ?, description = ?, price = ?, category = ?, additional_info = ?, image_url = ?
        WHERE id = ?
    `;
    db.run(sql, [name, description, price, category, additional_info, image_url, id], function(err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (this.changes === 0) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.json({ id, name, description, price, category, additional_info, image_url });
    });
});

module.exports = router;
