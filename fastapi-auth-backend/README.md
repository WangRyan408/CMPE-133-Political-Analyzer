# FastAPI Authentication Backend

This project is a FastAPI application that implements user authentication functionality. It includes endpoints for user registration, login, and logout, along with the necessary database models and schemas.

## Project Structure

```
fastapi-auth-backend
├── app
│   ├── __init__.py
│   ├── main.py               # Entry point of the FastAPI application
│   ├── auth
│   │   ├── __init__.py
│   │   ├── models.py         # Database models for user authentication
│   │   ├── schemas.py        # Pydantic schemas for request and response validation
│   │   ├── routes.py         # API routes for authentication
│   │   └── utils.py          # Utility functions for password hashing and token generation
│   └── database.py           # Database connection and session management
├── tests
│   ├── __init__.py
│   └── test_auth.py          # Unit tests for authentication routes and logic
├── requirements.txt           # Project dependencies
└── README.md                  # Project documentation
```

## Setup Instructions

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd fastapi-auth-backend
   ```

2. **Create a virtual environment:**
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows use `venv\Scripts\activate`
   ```

3. **Install the dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

4. **Run the application:**
   ```bash
   uvicorn app.main:app --reload
   ```

## Usage

- **Register a new user:**
  - Endpoint: `POST /auth/register`
  - Request body: `{ "name": "User Name", "email": "user@example.com", "password": "yourpassword" }`

- **Login:**
  - Endpoint: `POST /auth/login`
  - Request body: `{ "email": "user@example.com", "password": "yourpassword" }`

- **Logout:**
  - Endpoint: `POST /auth/logout`

## Testing

To run the tests, use the following command:

```bash
pytest
```

## License

This project is licensed under the MIT License. See the LICENSE file for more details.