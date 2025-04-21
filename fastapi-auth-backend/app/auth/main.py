from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Replace "*" with your frontend's URL in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class UserLogin(BaseModel):
    email: str
    password: str

@app.get("/")
def read_root():
    return {"message": "Welcome to the Political Analyzer API"}

@app.post("/login")
async def login(user: UserLogin):
    print(f"Received email: {user.email}, password: {user.password}")
    # Replace with actual database logic
    if user.email == "admin@example.com" and user.password == "1234":
        return {"id": 1, "name": "Admin User", "email": user.email, "role": "admin"}
    elif user.email:
        return {"id": 2, "name": "Regular User", "email": user.email, "role": "user"}
    raise HTTPException(status_code=401, detail="Invalid credentials")