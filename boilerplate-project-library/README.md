
# Book Management API

This is a RESTful API for managing a collection of books. You can add books, retrieve information about books, add comments to books, and delete books. The API is designed to be simple and straightforward to use.


## Installation

1. Clone the repository to your local machine:

    ```bash
    git clone https://github.com/yourusername/book-management-api.git
    cd book-management-api
    ```

2. Install the dependencies:

    ```bash
    npm install
    ```

3. Start the server:

    ```bash
    npm start
    ```

4. The API will be available at `http://localhost:3000`.
## Usage

You can use any API client like Postman, Insomnia, or cURL to interact with the API. Below is a list of the available endpoints and their descriptions.
## API Endpoints

### 1. Add a New Book

- **Endpoint:** `POST /api/books`
- **Description:** Add a new book to the collection.
- **Form Data:** `{ "title": "Book Title" }`
- **Success Response:** Returns an object with the `title` and a unique `_id`.
- **Error Response:** Returns `"missing required field title"` if the title is not provided.

### 2. Get All Books

- **Endpoint:** `GET /api/books`
- **Description:** Retrieve an array of all books in the collection.
- **Response:** Returns an array of objects, where each object contains `title`, `_id`, and `commentcount`.

### 3. Get a Book by ID

- **Endpoint:** `GET /api/books/:id`
- **Description:** Retrieve a single book by its ID.
- **Response:** Returns an object with `title`, `_id`, and `comments` (an array of comments).
- **Error Response:** Returns `"no book exists"` if the book is not found.

### 4. Add a Comment to a Book

- **Endpoint:** `POST /api/books/:id`
- **Description:** Add a comment to a book.
- **Form Data:** `{ "comment": "This is a comment" }`
- **Success Response:** Returns the updated book object with the new comment.
- **Error Response 1:** Returns `"missing required field comment"` if the comment is not provided.
- **Error Response 2:** Returns `"no book exists"` if the book is not found.

### 5. Delete a Book by ID

- **Endpoint:** `DELETE /api/books/:id`
- **Description:** Delete a single book by its ID.
- **Success Response:** Returns `"delete successful"` if the deletion is successful.
- **Error Response:** Returns `"no book exists"` if the book is not found.

### 6. Delete All Books

- **Endpoint:** `DELETE /api/books`
- **Description:** Delete all books from the collection.
- **Success Response:** Returns `"complete delete successful"` if the deletion is successful.
## Testing

To run the functional tests for the API, use the following command:

```bash
npm test
```

The tests are located in the tests directory and cover all the endpoints and expected behaviors.
## Dependencies

- Express: Web framework for Node.js.
- Mocha: JavaScript test framework for Node.js.
- Chai: BDD / TDD assertion library for Node.js.
- Chai-http: HTTP integration testing with Chai.

To install these dependencies, run:

        npm install

 
## Credits

This project is the certificate project from Freecodecamp.                                                                                                                                                                                                                                                                                                                            