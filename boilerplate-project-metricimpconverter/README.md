
# Metric-Imperial Converter

This project is a metric-imperial converter application built with Node.js and Express. It allows users to convert between various units of measurement.




## Project Structure

- `controllers/`
  - `convertHandler.js` - Contains the logic for handling unit conversions.
- `routes/`
  - `api.js` - Defines API routes and handles requests.
  - `fcctesting.js` - Contains routes for FCC testing purposes.
- `tests/`
  - `1_unit-tests.js` - Contains unit tests for the converter logic.
  - `2_functional-tests.js` - Contains functional tests for the API endpoints.
- `views/`
  - `index.html` - Static HTML file for the user interface.
- `server.js` - Entry point of the application, sets up the Express server.
## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/metric-imperial-converter.git
   cd metric-imperial-converter

2. Install the dependencies:

        npm install

3. Create a .env file in the root directory with the following content:

        NODE_ENV=development
        PORT=3000



## Running the Application

To start the application, run:

        npm start

The server will be available at http://localhost:3000.
## API Endpoints

### Convert Endpoint
#### GET `/api/convert`

Converts a measurement from one unit to another.

#### Query Parameters:
- `input` (required): The measurement to convert. Examples: `4gal`, `1/2km`, `5.4/3lbs`, `kg`.
#### Example Request:
`/api/convert?input=4gal`

#### Example Response:

    {
        "initNum": 4,
        "initUnit": "gal",
        "returnNum": 15.14164,
        "returnUnit": "L",
        "string": "4 gallons converts to 15.14164 liters"
    }

## Running Tests

To run the unit and functional tests, use:

        npm test
## Testing

### Unit Tests

`convertHandler` should correctly read a whole number input. \
`convertHandler` should correctly read a decimal number input. \
`convertHandler` should correctly read a fractional input. \
`convertHandler` should correctly read a fractional input with a decimal. \
`convertHandler` should correctly return an error on a double-fraction (i.e. 3/2/3). \
`convertHandler` should default to a numerical input of 1 when no numerical input is provided. \
`convertHandler` should correctly read each valid input unit. \
`convertHandler` should return an error for an invalid input unit. \
`convertHandler` should return the correct return unit for each valid input unit. \
`convertHandler` should correctly return the spelled-out string unit for each valid input unit. \
`convertHandler` should correctly convert `gal` to `L`.
`convertHandler` should correctly convert `L` to `gal`.
`convertHandler` should correctly convert `mi` to `km`.
`convertHandler` should correctly convert `km` to `mi`.
`convertHandler` should correctly convert `lbs` to `kg`.
`convertHandler` should correctly convert `kg` to `lbs`.
Functional Tests
Convert a valid input such as `10L`: GET request to `/api/convert`.
Convert an invalid input such as `32g`: GET request to `/api/convert`.
Convert an invalid number such as `3/7.2/4kg`: GET request to `/api/convert`.
Convert an invalid number AND unit such as `3/7.2/4kilomegagram`: GET request to `/api/convert`.
Convert with no number such as `kg`: GET request to `/api/convert`.

## Credits
This project is the certificate project from Freecodecamp. 