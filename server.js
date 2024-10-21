const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const bookRouter = require('./route');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(bodyParser.json());

app.get('/favicon.ico', (req, res) => res.status(204));

app.use(express.static(path.join(__dirname)));

app.use('/api', bookRouter); 

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html')); 
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});














// // Демо-дані для книг
// let books = [];

// // API-маршрут для отримання книг
// app.get('/api/books', (req, res) => {
//     res.json(books);  // Відправляємо масив книг у форматі JSON
// });

// // API-маршрут для додавання нової книги
// app.post('/api/books', (req, res) => {
//     const newBook = req.body;

//     // Перевірка, чи книга вже існує
//     const isDuplicate = books.some(book => book.title === newBook.title && book.author === newBook.author);

//     if (isDuplicate) {
//         return res.status(409).json({ message: "Ця книга вже додана." }); // Відправляємо помилку 409
//     }

//     // Додаємо нову книгу
//     books.push(newBook);
//     res.status(201).json(newBook); // Відправляємо нову книгу у відповіді з кодом 201
// });