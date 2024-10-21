// const books = [
//     { title: "The Great Gatsby", author: "F. Scott Fitzgerald", pages: 180, rating: 4.5, lastView: "3 month ago", image: "./images/great-gatsby.png" },
//     { title: "1984", author: "George Orwell", pages: 328, rating: 4.9, lastView: "1 day ago", image: "./images/1984.png" },
//     { title: "Свій серед машин", author: "Ієн Макюен", pages: 220, rating: 4.0, lastView: "1 hour ago", image: "./images/machine-as-me.jpg" },
//     { title: "Vavylon", author: "Rebekka Kwan", pages: 1120, rating: 5.0, lastView: "10 month ago", image: "./images/vavylon.png" },
//     { title: "Dall", author: "Daniel Koul", pages: 500, rating: 5.1, lastView: "1 year ago", image: "./images/dall.jpg" },
//     { title: "Учень вбивці", author: "Робін Гобб", pages: 800, rating: 5.4, lastView: "3 year ago", image: "./images/asassin.jpeg" },
//     { title: "Журнал 'Наша спадщина'", author: "Самбірська міськрада", pages: 30, rating: 2.4, lastView: "6 year ago", image: "./images/sambir.jpg" },
//     { title: "Бібліотека душ", author: "Ренсом Ріггз", pages: 700, rating: 5.5, lastView: "2 year ago", image: "./images/library.jpg" },
// ];

// let books = JSON.parse(localStorage.getItem("books")) || [
//     { title: "The Great Gatsby", author: "F. Scott Fitzgerald", pages: 180, rating: 4.5, lastView: "3 month ago", image: "./images/great-gatsby.png" },
//     { title: "1984", author: "George Orwell", pages: 328, rating: 4.9, lastView: "1 day ago", image: "./images/1984.png" },
//     //... (other books)
// ];

let books = []; 

async function fetchBooks(search = '', sortBy = '', order = 'asc') {
    try {
        const response = await fetch(`http://localhost:3001/api/books?search=${search}&sortBy=${sortBy}&order=${order}`);
        const data = await response.json();
        console.log(data);  
        books = data;
        renderBooks(books);
    } catch (error) {
        console.error('Error fetching books:', error);
    }
}

fetchBooks();  

const bookCardsContainer = document.querySelector(".library-cards");
const averageRatingElement = document.getElementById("averageRating");
const searchInput = document.getElementById("search");
const totalPagesElement = document.getElementById("totalPages");
const sortForm = document.getElementById("sortForm");
const clearBtn = document.getElementById("clearBtn");
const countPagesBtn = document.getElementById("countPages");
const clearSortBtn = document.getElementById("clearSortBtn");
const searchBtn = document.getElementById("searchBtn");

function renderBooks(books) {
    bookCardsContainer.innerHTML = '';  

    books.forEach(book => {
        const card = createBookCard(book);
        bookCardsContainer.appendChild(card);
    });

    const averageRating = calculateAverageRating(books);
    averageRatingElement.textContent = `Середній рейтинг: ★ ${averageRating.toFixed(2)}`;
}

function createBookCard(book) {
    const card = document.createElement("div");
    card.classList.add("book-card");

    const cardContent = `
        <div class="book-cover" style="background-image: url('${book.image}');"></div>
        <div class="book-details">
            <h2 class="book-title">${book.title}</h2>
            <p><strong>Author:</strong> ${book.author}</p>
            <p><strong>Pages:</strong> ${book.pages}</p>
            <p><strong>Rating:</strong> ★ ${book.rating}</p>
            <p class="last-view">Last view ${book.lastView}</p>
        </div>
        <div class="buttons">
            <button class="edit">✏️</button>
            <button class="remove">🗑️</button>
        </div>
    `;

    card.innerHTML = cardContent;

    card.querySelector(".remove").addEventListener("click", () => {
        removeBook(book.id);
    });

    card.querySelector(".edit").addEventListener("click", () => {
        window.location.href = `edit-book.html?id=${book.id}`; 
    });

    return card;
}

async function removeBook(id) {
    try {
        await fetch(`http://localhost:3001/api/books/${id}`, {
            method: 'DELETE'
        });
        books = books.filter(book => book.id !== id);
        renderBooks(books);
    } catch (error) {
        console.error('Error deleting book:', error);
    }
}

function calculateAverageRating(books) {
    if (books.length === 0) return 0; 
    const totalRating = books.reduce((total, book) => total + parseFloat(book.rating), 0);
    return totalRating / books.length;
}

function countTotalPages() {
    if (books.length === 0) return 0;
    const totalPages = books.reduce((total, book) => total + parseInt(book.pages, 10), 0);
    totalPagesElement.textContent = `${totalPages}`;
}

function handleSearch() {
    const query = searchInput.value.trim().toLowerCase().replace(/\s+/g, '');  // Clean up search input

    const selectedSort = document.querySelector('input[name="sort"]:checked')?.value || '';  // Check if sorting is selected

    fetchBooks(query, selectedSort, 'desc');  // Pass search query and sorting to fetchBooks
}

function handleSort() {
    const selectedSort = document.querySelector('input[name="sort"]:checked')?.value || '';  
    const query = searchInput.value.trim().toLowerCase().replace(/\s+/g, '');  // Also include current search query

    fetchBooks(query, selectedSort, 'desc');  // Fetch with both search and sorting
}

searchBtn.addEventListener("click", () => handleSearch());
sortForm.addEventListener('change', () => handleSort());
countPagesBtn.addEventListener("click", () => countTotalPages());

clearBtn.addEventListener("click", () => {
    searchInput.value = '';  
    fetchBooks();  // Clear search and fetch books without query
});

clearSortBtn.addEventListener("click", () => {
    const radioButtons = document.querySelectorAll('input[name="sort"]');
    radioButtons.forEach(radio => radio.checked = false);  // Clear sorting

    const query = searchInput.value.trim().toLowerCase().replace(/\s+/g, '');  // Retain current search query
    fetchBooks(query, '', 'asc');  // Fetch with search but without sorting
});
