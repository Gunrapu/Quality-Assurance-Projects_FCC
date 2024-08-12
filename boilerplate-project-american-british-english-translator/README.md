
# Translator Microservice

This project is a translation microservice that translates text between American and British English. It handles various linguistic differences such as spelling variations, time format, and honorifics/titles.


## Features

- Translates text from American English to British English and vice versa.
- Handles spelling differences (e.g., `favorite` to `favourite`).
- Handles time format differences (e.g., `10:30` to `10.30`).
- Handles honorifics and titles (e.g., `Dr.` to `Dr`).
- API supports POST requests for translation.
## Project Structure

- `server.js`: Main server file to start the application.
- `api.js`: Contains the API routes for handling translation requests.
- `components/translator.js`: Contains the logic for performing the translations.
- `components/american-only.js`, `components/british-only.js`: Datasets for American and British English-specific words.
- `components/american-to-british-spelling.js`: Mapping for spelling differences.
- `components/american-to-british-titles.js`: Mapping for titles and honorifics.
## API Endpoints

### POST /api/translate

- **Request Body:**
  - `text`: The text to be translated.
  - `locale`: The translation direction, either `american-to-british` or `british-to-american`.

- **Response:**
  - If successful, returns a JSON object containing the original text and the translated text.
  - If `text` is empty, returns `{ error: 'No text to translate' }`.
  - If one or more required fields are missing, returns `{ error: 'Required field(s) missing' }`.
  - If `locale` is invalid, returns `{ error: 'Invalid value for locale field' }`.
  - If the text requires no translation, returns `Everything looks good to me!`.

## Example Request

    ```bash
    curl -X POST https://your-app-url/api/translate \
    -H "Content-Type: application/json" \
    -d '{"text":"Mangoes are my favorite fruit.", "locale":"american-to-british"}'

### Example Response

        {
            "text": "Mangoes are my favorite fruit.",
            "translation": "Mangoes are my <span class=\"highlight\">favourite</span> fruit."
        }


## Running Tests

### Unit Tests

To run the unit tests:

        npm run test:unit

### Functional Tests

To run the functional tests:

        npm run test:functional


## Installation

1. Clone the repository:

        git clone https://github.com/yourusername/translator-microservice.git

2. Install the dependencies:

        npm install
        
3. Start the server:

        npm start

4. The service will be available at http://localhost:3000.
## Credits

This project is the certificate project from Freecodecamp.