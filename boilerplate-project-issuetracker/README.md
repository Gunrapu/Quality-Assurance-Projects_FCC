
# Issue Tracker

This is an Issue Tracker application that allows users to create, update, view, and delete issues for a specific project.


## Installation

1. Clone the repository:

        git clone https://github.com/your-username/issue-tracker.git

2. Navigate to the project directory:

        cd issue-tracker

3. Install the dependencies:

        npm install

4. Set up environment variables by creating a `.env` file in the root of your project and adding the necessary variables:

        MONGO_URI=your_mongodb_connection_string

5. Start the application:

        npm start
## Usage

You can interact with the Issue Tracker application via its API endpoints. Refer to the [API Endpoints](#api-endpoints) section for detailed information.


## API Endpoints

- **Create an issue**: POST `/api/issues/{project}`
- **View issues**: GET `/api/issues/{project}`
- **Update an issue**: PUT `/api/issues/{project}`
- **Delete an issue**: DELETE `/api/issues/{project}`

## Testing

To run the tests, use the following command:

        npm tests


## Credits

This project is the certificate project from Freecodecamp.