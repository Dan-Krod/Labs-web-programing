document.addEventListener('DOMContentLoaded', async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const currentBookId = urlParams.get('id'); 

    if (!currentBookId) {
        alert('ID книги не знайдено.');
        window.location.href = 'index.html';
        return;
    }

    try {
        const response = await fetch(`http://localhost:3001/api/books/${currentBookId}`);
        if (response.ok) {
            const currentBook = await response.json();

            document.getElementById('title').value = currentBook.title;
            document.getElementById('author').value = currentBook.author;
            document.getElementById('pages').value = currentBook.pages;
            document.getElementById('rating').value = currentBook.rating;
            document.getElementById('lastView').value = currentBook.lastView;
            document.getElementById('image').value = currentBook.image;

            const editBookForm = document.getElementById('editBookForm');
            editBookForm.addEventListener('submit', async(e) => {
                e.preventDefault();

                const updatedBook = {
                    title: document.getElementById('title').value,
                    author: document.getElementById('author').value,
                    pages: document.getElementById('pages').value,
                    rating: document.getElementById('rating').value,
                    lastView: document.getElementById('lastView').value,
                    image: document.getElementById('image').value
                };

                try {
                    const updateResponse = await fetch(`http://localhost:3001/api/books/${currentBookId}`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(updatedBook)
                    });

                    if (updateResponse.ok) {
                        // const updatedBookData = await updateResponse.json(); // Отримання оновлених даних

                        console.log('Оновлення книги:', updatedBook);
                        
                        alert("Книгу успішно оновлено!");
                        window.location.href = 'index.html'; 
                    } else {
                        alert('Не вдалося оновити книгу. Спробуйте ще раз.');
                    }
                } catch (error) {
                    console.error('Error updating book:', error);
                    alert('Сталася помилка при оновленні книги.');
                }
            });

            const deleteBookButton = document.getElementById('deleteBook');
            deleteBookButton.addEventListener('click', () => {
                if (confirm("Ви впевнені, що хочете видалити цю книгу?")) {
                    fetch(`http://localhost:3001/api/books/${currentBookId}`, {
                        method: 'DELETE',
                    }).then(response => {
                        if (response.ok) {
                            alert("Книгу успішно видалено!");
                            window.location.href = 'index.html'; 
                        } else {
                            alert('Не вдалося видалити книгу. Спробуйте ще раз.');
                        }
                    }).catch(error => {
                        console.error('Error deleting book:', error);
                        alert('Сталася помилка при видаленні книги.');
                    });
                }
            });

        } else {
            alert('Не вдалося отримати дані книги.');
        }
    } catch (error) {
        console.error('Error fetching book:', error);
        alert('Сталася помилка при отриманні даних книги.');
    }

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
});
