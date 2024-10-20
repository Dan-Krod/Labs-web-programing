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

let books = JSON.parse(localStorage.getItem("books")) || [
    { title: "The Great Gatsby", author: "F. Scott Fitzgerald", pages: 180, rating: 4.5, lastView: "3 month ago", image: "./images/great-gatsby.png" },
    { title: "1984", author: "George Orwell", pages: 328, rating: 4.9, lastView: "1 day ago", image: "./images/1984.png" },
    //... (other books)
];

const bookCardsContainer = document.querySelector(".library-cards");
const averageRatingElement = document.getElementById("averageRating");
const searchInput = document.getElementById("search");
const totalPagesElement = document.getElementById("totalPages");
const sortForm = document.getElementById("sortForm");
const clearBtn = document.getElementById("clearBtn");
const countPagesBtn = document.getElementById("countPages");
const clearSortBtn = document.getElementById("clearSortBtn");
const searchBtn = document.getElementById("searchBtn");


let filteredBooks = [...books];  
let sortedBooks = [...books];    

function renderBooks(books) {
    bookCardsContainer.innerHTML = '';

    books.forEach(book => {
        const card = createBookCard(book);
        bookCardsContainer.appendChild(card);
    });

    const averageRating = calculateAverageRating(filteredBooks);
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
            <button class="edit">
            <img src="./icons/pencil.png" alt="Edit" />
            </button>
            <button class="remove">
            <img src="./icons/delete.png" alt="Remove" />
            </button>
        </div>
    `;

    card.innerHTML = cardContent;

    card.querySelector(".remove").addEventListener("click", (event) => {
        const bookIndex = filteredBooks.indexOf(book);
        removeBook(bookIndex);
    });
// ✏️🗑️
    card.querySelector(".edit").addEventListener("click", (_event) => {
        localStorage.setItem('currentBook', JSON.stringify(book)); 
        window.location.href = 'edit-book.html'; 
    });
        

    return card;
}

function removeBook(index) {
    books.splice(index, 1); 
    filteredBooks = [...books];  
    localStorage.setItem('books', JSON.stringify(books));
    renderBooks(books);  
}

function sortBooks(field, descending = false) {
    sortedBooks = [...filteredBooks].sort((a, b) => {
        const aValue = typeof a[field] === 'number' ? a[field] : parseFloat(a[field]);
        const bValue = typeof b[field] === 'number' ? b[field] : parseFloat(b[field]);

        if (typeof aValue === 'string') {
            return aValue.localeCompare(bValue);
        } 
        else if (typeof aValue === 'number') {
            return descending ? bValue - aValue : aValue - bValue;
        }
    });

    renderBooks(sortedBooks);
}


function searchBooks(query) {
    const lowerCaseQuery = query.toLowerCase().trim();
    filteredBooks = books.filter(book =>
        book.title.toLowerCase().includes(lowerCaseQuery) ||
        book.author.toLowerCase().includes(lowerCaseQuery)
    );
    renderBooks(filteredBooks);
}

function countTotalPages() {
    return filteredBooks.reduce((total, book) => total + parseInt(book.pages, 10), 0);
}

function calculateAverageRating(books) {
    if (books.length === 0) return 0; 

    const totalRating = books.reduce((total, book) => {
        const rating = parseFloat(book.rating); 
        if (isNaN(rating)) {
            console.warn(`Invalid rating for book "${book.title}": ${book.rating}`);
            return total; 
        }
        return total + rating;
    }, 0);
    
    return totalRating / books.length;
}


function handleSearch() {
    searchBooks(searchInput.value);
}

function handleSort() {
    const selectedSort = document.querySelector('input[name="sort"]:checked').value;
    
    if (selectedSort === 'rating') {
        sortBooks('rating', true);
    } else if (selectedSort === 'pages') {
        sortBooks('pages', true);
    } else {
        renderBooks(filteredBooks);  
    }
}

searchBtn.addEventListener("click", () => {
    handleSearch();
});

sortForm.addEventListener('change', handleSort);

countPagesBtn.addEventListener("click", () => {
    const totalPages = countTotalPages();
    totalPagesElement.textContent = totalPages;
});

clearBtn.addEventListener("click", () => {
    searchInput.value = '';
    filteredBooks = [...books];
    sortedBooks = [...books];
    renderBooks(books);
});

clearSortBtn.addEventListener("click", () => {
    const radioButtons = document.querySelectorAll('input[name="sort"]');
    radioButtons.forEach(radio => radio.checked = false);

    renderBooks(filteredBooks);
});
renderBooks(books);
