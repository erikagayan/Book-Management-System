document.addEventListener('DOMContentLoaded', () => {
    const apiUrl = 'http://127.0.0.1:8000/api/books/';

    const bookForm = document.getElementById('bookForm');
    const bookTableBody = document.querySelector('#bookTable tbody');
    const bookIdInput = document.getElementById('bookId');

    bookForm.addEventListener('submit', handleFormSubmit);

    async function fetchBooks() {
        try {
            const response = await fetch(apiUrl);
            console.log('Fetching books:', response);
            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.statusText}`);
            }
            const books = await response.json();
            console.log('Books fetched from API:', books);
            bookTableBody.innerHTML = '';
            books.forEach(book => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${book.title}</td>
                    <td>${book.author}</td>
                    <td>${book.published_date}</td>
                    <td>${book.isbn}</td>
                    <td>${book.pages}</td>
                    <td>
                        <button onclick="editBook(${book.id})">Edit</button>
                        <button class="delete" onclick="deleteBook(${book.id})">Delete</button>
                    </td>
                `;
                bookTableBody.appendChild(row);
            });
        } catch (error) {
            console.error('Fetch error:', error);
        }
    }

    async function handleFormSubmit(event) {
        event.preventDefault();
        const formData = new FormData(bookForm);
        const bookData = Object.fromEntries(formData.entries());
        const bookId = bookIdInput.value;

        console.log('Form submitted:', bookData);

        try {
            if (bookId) {
                await updateBook(bookId, bookData);
            } else {
                await addBook(bookData);
            }

            bookForm.reset();
            bookIdInput.value = '';
            fetchBooks();
        } catch (error) {
            console.error('Form submit error:', error);
        }
    }

    async function addBook(book) {
        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(book)
            });
            console.log('Adding book:', response);
            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.statusText}`);
            }
            console.log('Book added:', await response.json());
        } catch (error) {
            console.error('Add book error:', error);
        }
    }

    async function updateBook(id, book) {
        try {
            const response = await fetch(`${apiUrl}${id}/`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(book)
            });
            console.log('Updating book:', response);
            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.statusText}`);
            }
            console.log('Book updated:', await response.json());
        } catch (error) {
            console.error('Update book error:', error);
        }
    }

    window.editBook = async function(id) {
        try {
            const response = await fetch(`${apiUrl}${id}/`);
            console.log('Fetching book for edit:', response);
            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.statusText}`);
            }
            const book = await response.json();
            console.log('Book fetched for edit:', book);
            bookIdInput.value = book.id;
            document.getElementById('title').value = book.title;
            document.getElementById('author').value = book.author;
            document.getElementById('published_date').value = book.published_date;
            document.getElementById('isbn').value = book.isbn;
            document.getElementById('pages').value = book.pages;
        } catch (error) {
            console.error('Edit book error:', error);
        }
    };

    fetchBooks();
});

// Вынесем определение функции deleteBook в глобальный контекст
async function deleteBook(id) {
    const apiUrl = 'http://127.0.0.1:8000/api/books/';
    try {
        const response = await fetch(`${apiUrl}${id}/`, {
            method: 'DELETE'
        });
        console.log('Deleting book:', response);
        if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.statusText}`);
        }
        console.log('Book deleted:', id);
        fetchBooks();
    } catch (error) {
        console.error('Delete book error:', error);
    }
}
