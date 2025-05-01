from sqlalchemy import create_engine, Column, Integer, String, and_  # Add this import
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, Session
from pydantic import BaseModel
from fastapi import FastAPI, Depends, HTTPException
from typing import List, Optional



app = FastAPI()
DATABASE_URL = "sqlite:///./test.db"
engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    email = Column(String, unique=True, index=True)
    password = Column(String, index=True)  
    

Base.metadata.create_all(bind=engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


class UserCreate(BaseModel):
    name: str
    email: str
    password: str  # Assuming you want to add a password field

# Add a Pydantic model for the response
class UserResponse(BaseModel):
    id: int
    name: str
    email: str
    password: str  # Assuming you want to include the password in the response

    class Config:
        orm_mode = True  # This allows Pydantic to work with SQLAlchemy models

@app.post("/users/register", response_model=UserResponse)
def create_user(user: UserCreate, db: Session = Depends(get_db)):
    db_user = User(name=user.name, email=user.email, password=user.password)  # Assuming you want to store the password
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

@app.get("/users/listofusers", response_model=List[UserResponse])
def read_users(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    users = db.query(User).offset(skip).limit(limit).all()
    return users


@app.get("/users/login", response_model=UserResponse)
def read_user(user_email: str, user_password: str, db: Session = Depends(get_db)):
    user = db.query(User).filter(and_(User.email == user_email, User.password == user_password)).first()
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return user

class UserUpdateName(BaseModel):
    name: Optional[str] = None

class UserUpdateEmail(BaseModel):
    email: Optional[str] = None

class UserUpdatePassword(BaseModel):
    password: Optional[str] = None

@app.put("/users/update/name", response_model=UserResponse)
def update_user(user_name: str, user: UserUpdateName, db: Session = Depends(get_db)):
    db_user = db.query(User).filter(User.name == user_name).first()
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    db_user.name = user.name if user.name is not None else db_user.name
    # db_user.email = user.email if user.email is not None else db_user.email
    # db_user.password = user.password if user.password is not None else db_user.password  # Assuming you want to update the password
    db.commit()
    db.refresh(db_user)
    return db_user

@app.put("/users/update/email", response_model=UserResponse)
def update_user(user_email: str, user: UserUpdateEmail, db: Session = Depends(get_db)):
    db_user = db.query(User).filter(User.email == user_email).first()
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    # db_user.name = user.name if user.name is not None else db_user.name
    db_user.email = user.email if user.email is not None else db_user.email
    # db_user.password = user.password if user.password is not None else db_user.password  # Assuming you want to update the password
    db.commit()
    db.refresh(db_user)
    return db_user

@app.put("/users/update/password", response_model=UserResponse)
def update_user(user_password: str, user: UserUpdatePassword, db: Session = Depends(get_db)):
    db_user = db.query(User).filter(User.password == user_password).first()
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    # db_user.name = user.name if user.name is not None else db_user.name
    # db_user.email = user.email if user.email is not None else db_user.email
    db_user.password = user.password if user.password is not None else db_user.password  # Assuming you want to update the password
    db.commit()
    db.refresh(db_user)
    return db_user

@app.delete("/users/{user_id}", response_model=UserResponse)
def delete_user(user_id: int, db: Session = Depends(get_db)):
    db_user = db.query(User).filter(User.id == user_id).first()
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    db.delete(db_user)
    db.commit()
    return db_user