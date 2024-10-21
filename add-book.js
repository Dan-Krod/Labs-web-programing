document.getElementById("addBookForm").addEventListener("submit", async function (event) { 
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

        try {
            const response = await fetch('http://localhost:3001/api/books');
            if (!response.ok) {
                throw new Error("Не вдалося отримати книги.");
            }
            const books = await response.json();

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

            try {
                const addResponse = await fetch('http://localhost:3001/api/books', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(newBook)
                });

                if (addResponse.ok) {
                    alert("Книгу додано успішно!");
                    window.location.href = "./index.html";
                } else {
                    console.error("Error adding book:", addResponse.status);
                }
            } catch (error) {
                console.error("Error adding book:", error);
            }
        } catch (error) {
            console.error("Error fetching books:", error);
        }
    } else {
        alert(errorMessage);
    }
});

document.getElementById("pages").addEventListener("input", function () {
    this.value = this.value.replace(/[^0-9]/g, ''); 
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
