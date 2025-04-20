from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from app.auth import schemas, models, utils
from app.database import get_db

router = APIRouter()

@router.post("/register", response_model=schemas.UserResponse)
def register(user: schemas.UserCreate, db: Session = Depends(get_db)):
    existing_user = db.query(models.User).filter(models.User.email == user.email).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    hashed_password = utils.hash_password(user.password)
    new_user = models.User(name=user.name, email=user.email, password=hashed_password)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    
    return new_user

@router.post("/login")
def login(user: schemas.UserCreate, db: Session = Depends(get_db)):
    existing_user = db.query(models.User).filter(models.User.email == user.email).first()
    if not existing_user or not utils.verify_password(user.password, existing_user.password):
        raise HTTPException(status_code=401, detail="Invalid email or password")
    
    # Here you would typically create and return a JWT token
    return {"message": "Login successful"}

@router.post("/logout")
def logout():
    # Implement logout logic, such as invalidating a token
    return {"message": "Logout successful"}