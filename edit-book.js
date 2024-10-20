document.addEventListener('DOMContentLoaded', () => {
    const currentBook = JSON.parse(localStorage.getItem('currentBook'));

    const originalTitle = currentBook.title;

    document.getElementById('title').value = currentBook.title;
    document.getElementById('author').value = currentBook.author;
    document.getElementById('pages').value = currentBook.pages;
    document.getElementById('rating').value = currentBook.rating;
    document.getElementById('lastView').value = currentBook.lastView;
    document.getElementById('image').value = currentBook.image;

    const editBookForm = document.getElementById('editBookForm');
    editBookForm.addEventListener('submit', (e) => {
        e.preventDefault();

        currentBook.title = document.getElementById('title').value;
        currentBook.author = document.getElementById('author').value;
        currentBook.pages = document.getElementById('pages').value;
        currentBook.rating = document.getElementById('rating').value;
        currentBook.lastView = document.getElementById('lastView').value;
        currentBook.image = document.getElementById('image').value;

        let books = JSON.parse(localStorage.getItem('books')) || [];
        const bookIndex = books.findIndex(book => book.title === originalTitle); 

        if (bookIndex !== -1) {
            books[bookIndex] = currentBook; 
            localStorage.setItem('books', JSON.stringify(books));
        }

        alert("Книгу успішно оновлено!");
        window.location.href = 'index.html'; 
    });

    const cancelButton = document.getElementById('cancelBtn');
    cancelButton.addEventListener('click', () => {
        if (confirm("Ви впевнені, що хочете скасувати редагування?")) {
            window.location.href = 'index.html'; 
        }
    });

    const homeButton = document.getElementById('homeBtn');
    homeButton.addEventListener('click', () => {
        window.location.href = 'index.html'; 
    });

    const deleteBookButton = document.getElementById('deleteBook');
    deleteBookButton.addEventListener('click', () => {
        if (confirm("Ви впевнені, що хочете видалити цю книгу?")) {
            let books = JSON.parse(localStorage.getItem('books')) || [];
            books = books.filter(book => book.title !== originalTitle); 

            localStorage.setItem('books', JSON.stringify(books));
            alert("Книгу успішно видалено!");
            window.location.href = 'index.html'; 
        }
    });
});
