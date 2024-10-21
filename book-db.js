const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('books.db', (err) => {
    if (err) {
        console.error('Помилка при підключенні до бази даних:', err);
    } else {
        console.log('Підключено до бази даних SQLite');
    }
});

db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS books (
        id INTEGER PRIMARY KEY AUTOINCREMENT,  -- Автоматичний інкремент ID
        title TEXT NOT NULL,                  -- Назва книги
        author TEXT NOT NULL,                 -- Автор книги
        pages INTEGER NOT NULL,               -- Кількість сторінок
        rating REAL,                          -- Рейтинг книги (може бути дробовим числом)
        lastView TEXT,                        -- Останній перегляд (може бути у форматі дати)
        image TEXT                            -- URL або шлях до зображення книги
    )`, (err) => {
        if (err) {
            console.error('Помилка при створенні таблиці:', err);
        } else {
            console.log('Таблицю "books" створено або вже існує');
        }
    });
});

module.exports = db;
