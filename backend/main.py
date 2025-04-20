from fastapi import FastAPI, HTTPException
from pydantic import BaseModel

app = FastAPI()

# In-memory user storage (replace with a database in production)
users = {}

class User(BaseModel):
    username: str
    email: str
    password: str

@app.get("/")
async def read_root():
    return {"message": "Hello from FastAPI"}

@app.post("/api/register")
async def register_user(user: User):
    if user.username in users:
        raise HTTPException(status_code=400, detail="Username already exists")
    users[user.username] = {"email": user.email, "password": user.password}
    return {"message": "User registered successfully"}

@app.post("/api/login")
async def login_user(user: User):
    stored_user = users.get(user.username)
    if not stored_user or stored_user["password"] != user.password:
        raise HTTPException(status_code=401, detail="Invalid username or password")
    return {"message": "Login successful"}

@app.get("/api/users/{username}")
async def get_user(username: str):
    user = users.get(username)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return {"username": username, "email": user["email"]}