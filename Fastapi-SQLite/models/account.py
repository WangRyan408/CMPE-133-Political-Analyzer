import os
from dotenv import load_dotenv
from fastapi import APIRouter, Depends, HTTPException, Response
from sqlalchemy.orm import Session
from sqlalchemy import and_
from typing import List, Optional
from .database import Base, get_db
from pydantic import BaseModel
from sqlalchemy import Column, Integer, String
from fastapi.responses import JSONResponse, FileResponse
import json
from datetime import datetime
import tempfile


load_dotenv()
SECRET_KEY = os.getenv("ADMIN_SECRET_KEY")

# Create the router
account_router = APIRouter()

# User Model
class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    email = Column(String, unique=True, index=True)
    password = Column(String, index=True)
    isAdmin = Column(Integer, default=0)  # 0 for regular user, 1 for admin

# Pydantic Models
class UserCreate(BaseModel):
    name: str
    email: str
    password: str
    secret_key: Optional[str] = None  # Optional field for admin registration

class UserResponse(BaseModel):
    id: int
    name: str
    email: str
    isAdmin: bool  # Boolean representation for the response

    class Config:
        orm_mode = True

class UserUpdate(BaseModel):
    name: Optional[str] = None
    email: Optional[str] = None
    password: Optional[str] = None

# Endpoints
@account_router.post("/register", response_model=UserResponse)
def create_user(user: UserCreate, db: Session = Depends(get_db)):
    is_admin = 0  # Default to regular user
    if user.secret_key and user.secret_key == SECRET_KEY:
        is_admin = 1  # Set as admin if secret key matches

    db_user = User(name=user.name, email=user.email, password=user.password, isAdmin=is_admin)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

@account_router.get("/login", response_model=UserResponse)
def login_user(user_email: str, user_password: str, db: Session = Depends(get_db)):
    user = db.query(User).filter(and_(User.email == user_email, User.password == user_password)).first()
    if not user:
        raise HTTPException(status_code=404, detail="Invalid credentials")
    return user

@account_router.put("/update", response_model=UserResponse)
def update_user(user_id: int, user: UserUpdate, db: Session = Depends(get_db)):
    db_user = db.query(User).filter(User.id == user_id).first()
    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")
    if user.name:
        db_user.name = user.name
    if user.email:
        db_user.email = user.email
    if user.password:
        db_user.password = user.password
    db.commit()
    db.refresh(db_user)
    return db_user

@account_router.delete("/delete/{user_id}", response_model=UserResponse)
def delete_user_account(user_id: int, db: Session = Depends(get_db)):
    """
    Endpoint to delete a specific user account by ID.
    Returns the deleted user information.
    """
    db_user = db.query(User).filter(User.id == user_id).first()
    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")
    db.delete(db_user)
    db.commit()
    return db_user

@account_router.get("/download/{user_id}", response_class=Response)
def download_user_info(user_id: int, db: Session = Depends(get_db)):
    """
    Endpoint to download a user's information as a JSON file.
    Returns a JSON file containing the user's information.
    """
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    # Convert user data to dictionary
    user_data = {
        "id": user.id,
        "name": user.name,
        "email": user.email,
        "isAdmin": bool(user.isAdmin)
    }
    
    # Convert to JSON string
    json_data = json.dumps(user_data, indent=2)
    
    # Create response with JSON file
    return Response(
        content=json_data,
        media_type="application/json",
        headers={
            "Content-Disposition": f"attachment; filename=user_{user_id}_info.json",
            "Access-Control-Expose-Headers": "Content-Disposition"
        }
    )

@account_router.get("/view", response_model=List[UserResponse])
def view_accounts(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    """
    Endpoint to view all accounts in the database with optional pagination.
    """
    users = db.query(User).offset(skip).limit(limit).all()
    return users