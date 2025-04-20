from fastapi import FastAPI
from fastapi.testclient import TestClient
from app.auth.routes import router as auth_router
from app.database import Base, engine

app = FastAPI()

app.include_router(auth_router)

# Create the database tables
Base.metadata.create_all(bind=engine)

client = TestClient(app)

def test_register_user():
    response = client.post("/register", json={"name": "Test User", "email": "test@example.com", "password": "password123"})
    assert response.status_code == 200
    assert response.json() == {"message": "User created successfully"}

def test_login_user():
    client.post("/register", json={"name": "Test User", "email": "test@example.com", "password": "password123"})
    response = client.post("/login", data={"email": "test@example.com", "password": "password123"})
    assert response.status_code == 200
    assert "access_token" in response.json()

def test_login_invalid_user():
    response = client.post("/login", data={"email": "invalid@example.com", "password": "wrongpassword"})
    assert response.status_code == 400
    assert response.json() == {"detail": "Invalid credentials"}