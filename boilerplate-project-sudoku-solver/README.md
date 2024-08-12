
# Sudoku Solver

This project is a Sudoku Solver application. It provides an API to solve Sudoku puzzles, validate placements, and check puzzle status. The application is built using Node.js and Express, with the solution logic encapsulated in a SudokuSolver class.



## Features

- Solve Sudoku puzzles and return solutions.
- Check puzzle placements for validity and conflicts.
- Validate puzzle strings for correct length and character set.
## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/sudoku-solver.git

2. Navigate into the project directory:

    ```bash
    cd sudoku-solver

3. Install the dependencies:

    ```bash
    npm install

## Usage

1. Start the server:
        
        npm start

The server will be running on http://localhost:3000.
## API Endpoints

### `POST /api/solve`

Solves a Sudoku puzzle.

#### Request Body:

    {
        "puzzle": "1.5..2.84..63.12.7.2..5....1....8.2.3674.3.7.2..9.47...8..1..16....926914.37."
    }

#### Response:

- Success:

        {
            "solution": "solved puzzle string"
        }

- Error:

        {
            "error": "Error message"
        }

### `POST /api/check`

Checks a puzzle placement for validity.

#### Request Body:

        {
            "puzzle": "1.5..2.84..63.12.7.2..5....1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.",
            "coordinate": "A2",
            "value": "5"
        }

#### Response:

- Success:

        {
            "valid": true,
            "conflict": []
        }

- Error:

        {
            "error": "Error message"
        }
## Directory Layout

The project directory is organized as follows:

- `app.js` - Main application file.
- `public/` - Directory for static files (e.g., HTML, CSS, JS).
- `routes/` - Directory containing route handlers.
- `tests/` - Directory for test cases.
- `solver.js` - Contains the SudokuSolver class and solution logic.
- `package.json`- Node.js project metadata and dependencies.
## Running Tests

To run the tests, use the following command:

        npm test
## Credits

This project was created as part of the FreeCodeCamp curriculum.