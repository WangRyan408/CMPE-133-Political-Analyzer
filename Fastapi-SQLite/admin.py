from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import and_
from typing import List
from pydantic import BaseModel
import os
from dotenv import load_dotenv
from models.database import get_db
from .models import User

load_dotenv()
ADMIN_SECRET_KEY = os.getenv("ADMIN_SECRET_KEY")

admin_router = APIRouter()

class AdminLogin(BaseModel):
    email: str
    password: str

class UserResponse(BaseModel):
    id: int
    name: str
    email: str
    role: str

    class Config:
        orm_mode = True

@admin_router.post("/admin/login", response_model=UserResponse)
def admin_login(credentials: AdminLogin, db: Session = Depends(get_db)):
    user = db.query(User).filter(
        and_(
            User.email == credentials.email,
            User.password == credentials.password,
            User.role == "admin"
        )
    ).first()
    if not user:
        raise HTTPException(status_code=403, detail="Invalid admin credentials")
    return user

@admin_router.get("/admin/users", response_model=List[UserResponse])
def list_all_users(email: str, password: str, db: Session = Depends(get_db)):
    admin = db.query(User).filter(
        and_(User.email == email, User.password == password, User.role == "admin")
    ).first()
    if not admin:
        raise HTTPException(status_code=403, detail="Admin access only")
    return db.query(User).all()
