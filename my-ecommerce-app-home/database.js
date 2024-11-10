// database.js
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, 'products.db');
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Помилка підключення до бази даних', err.message);
    } else {
        console.log('Підключено до бази даних SQLite.');
        db.run(`CREATE TABLE IF NOT EXISTS products (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            description TEXT,
            price REAL,
            category TEXT,
            additional_info TEXT,
            image_url TEXT
        )`, (err) => {
            if (err) {
                console.error('Помилка створення таблиці', err.message);
            } else {
                seedDatabase();
            }
        });
    }
});

const insertProduct = (name, description, price, category, additionalInfo, imageUrl) => {
    db.get(`SELECT COUNT(*) AS count FROM products WHERE name = ?`, [name], (err, row) => {
        if (err) {
            console.error('Помилка при перевірці продукту', err.message);
        } else if (row.count === 0) {
            db.run(`INSERT INTO products (name, description, price, category, additional_info, image_url) VALUES (?, ?, ?, ?, ?, ?)`, 
                [name, description, price, category, additionalInfo, imageUrl], (err) => {
                if (err) {
                    console.error('Помилка вставки продукту', err.message);
                } else {
                    console.log(`Продукт "${name}" успішно доданий.`);
                }
            });
        } else {
            console.log(`Продукт "${name}" вже існує, пропускаємо.`);
        }
    });
};

const seedDatabase = () => {
    console.log('Виконується заповнення бази даних...');
    insertProduct('Pride and Prejudice', 'A timeless romance novel by Jane Austen.', 180, 'Books', 'Author: Jane Austen', 'books.jpg');
    insertProduct('Literary Festival Ticket', 'Access to a three-day literary festival.', 50, 'Book Events', 'Date: July 15-17, 2024', 'book-event.jpg');
    insertProduct('Audiobook Subscription', 'Monthly subscription for unlimited audiobooks.', 20, 'Audiobooks', 'Duration: 1 month', 'audiobooks.jpg');
    insertProduct('Shakespeare Complete Works', 'A collection of all works by William Shakespeare.', 120, 'Books', 'Includes: Tragedies, Comedies, Histories', 'books.jpg');
    insertProduct('Science Fiction Convention Ticket', 'Entry to the annual sci-fi convention.', 75, 'Book Events', 'Date: August 20-22, 2024', 'book-event.jpg');
    insertProduct('J.R.R. Tolkien Signed Poster', 'A rare signed poster of "The Lord of the Rings".', 500, 'Author Signs', 'Signed by: J.R.R. Tolkien', 'sign-writer.jpg');
    insertProduct('Personalized Book Merchandise', 'Custom merchandise based on your favorite book.', 25, 'Merchandise', 'Options: T-shirts, Mugs, Posters', 'merchandise.jpg');
    insertProduct('Classic Audiobook Collection', 'A set of classic audiobooks to enjoy anywhere.', 40, 'Audiobooks', 'Includes: Moby Dick, The Odyssey, Frankenstein', 'audiobooks.jpg');
    insertProduct('Historical Fiction Bundle', 'A bundle of popular historical fiction books.', 90, 'Books', 'Includes: The Book Thief, All the Light We Cannot See', 'books.jpg');
    insertProduct('Writing Workshop Ticket', 'Access to a writing workshop with renowned authors.', 100, 'Book Events', 'Date: September 10, 2024', 'book-event.jpg');
    insertProduct('Exclusive Author Q&A Session', 'Virtual Q&A session with a popular author.', 200, 'Author Signs', 'Featuring: George R.R. Martin', 'sign-writer.jpg');
    insertProduct('Signed Copy of Harry Potter', 'A signed copy of "Harry Potter and the Philosopher\'s Stone".', 350, 'Author Signs', 'Signed by: J.K. Rowling', 'sign-writer.jpg');
};

module.exports = db;
