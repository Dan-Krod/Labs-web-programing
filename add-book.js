document.getElementById("addBookForm").addEventListener("submit", function (event) {
    event.preventDefault();

    const title = document.getElementById("title").value.trim();
    const author = document.getElementById("author").value.trim();
    const pages = parseInt(document.getElementById("pages").value);
    const lastView = document.getElementById("lastView").value.trim();
    const image = document.getElementById("image").value.trim();

    clearErrorMessages();

    let isValid = true;
    let errorMessage = '';  

    if (!title) {
        errorMessage += "Назва книги обов'язкова.\n";
        isValid = false;
    }

    if (!author) {
        errorMessage += "Автор обов'язковий.\n";
        isValid = false;
    }

    if (isNaN(pages) || pages <= 0) {
        errorMessage += "Кількість сторінок повинна бути числом більше нуля.\n";
        isValid = false;
    }

    if (!lastView) {
        errorMessage += "Дата останнього перегляду обов'язкова.\n";
        isValid = false;
    }

    if (isValid) {
        let books = JSON.parse(localStorage.getItem("books")) || [];

        const isDuplicate = books.some(book => book.title === title && book.author === author);

        if (isDuplicate) {
            alert("Ця книга вже додана.");
            return; 
        }

        const newBook = {
            title: title,
            author: author,
            pages: pages,
            rating: generateRandomRating(),
            lastView: lastView,
            image: image
        };

        
        books.push(newBook);
        localStorage.setItem("books", JSON.stringify(books));
        window.location.href = "./index.html";
    } else {
        alert(errorMessage);
    }
});

document.getElementById("pages").addEventListener("input", function () {
    this.value = this.value.replace(/[^0-9]/g, '');  // Забороняє нечислові символи
});


function generateRandomRating(min = 1, max = 5) {
    return (Math.random() * (max - min) + min).toFixed(1); 
}

function showError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    errorElement.textContent = message;
    errorElement.style.display = "block"; 
}

function clearErrorMessages() {
    const errorMessages = document.querySelectorAll(".error-message");
    errorMessages.forEach(function (element) {
        element.textContent = "";
        element.style.display = "none";  
    });
}