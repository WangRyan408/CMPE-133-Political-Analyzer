from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from .database import Base, get_db
from pydantic import BaseModel
from sqlalchemy import Column, Integer, String, Float
from app.ffnn_model import NeuralNetworkModel
from fastapi.responses import JSONResponse, FileResponse
import json
from datetime import datetime
import tempfile

# Create the router
article_router = APIRouter()

# Article Model
class Article(Base):
    __tablename__ = "articles"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    user_id = Column(Integer, index=True)
    prediction = Column(Float)
    authors = Column(String)
    date = Column(String)
    publisher = Column(String)
    url = Column(String)  # Added URL field

# Pydantic Models
class ArticleRequest(BaseModel):
    url: str

class ArticleCreate(BaseModel):
    title: str
    user_id: int
    prediction: float
    authors: str
    date: str
    publisher: str
    url: str  # Added URL field

class ArticleResponse(BaseModel):
    id: int
    title: str
    user_id: int
    prediction: float
    authors: str
    date: str
    publisher: str
    url: str  # Added URL field

    class Config:
        orm_mode = True

# Endpoints
@article_router.post("/analyze")
def analyze(request: ArticleRequest):
    try:
        model = NeuralNetworkModel()
        y_pred, authors, date, publisher, full_text, title = model.test(request.url)
        return JSONResponse(content={
            "prediction": y_pred,
            "authors": authors,
            "date": date,
            "publisher": publisher,
            "title": title,
            "url": request.url  # Include URL in response
        })
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@article_router.post("/create", response_model=ArticleResponse)
def create_article(article: ArticleCreate, db: Session = Depends(get_db)):

    existing_article = db.query(Article).filter(Article.url == article.url).first()
    if existing_article:
        raise HTTPException(status_code=404, detail=f"duplicate article")

    db_article = Article(
        title=article.title,
        user_id=article.user_id,
        prediction=article.prediction,
        authors=article.authors,
        date=article.date,
        publisher=article.publisher,
        url=article.url  # Added URL field
    )
    db.add(db_article)
    db.commit()
    db.refresh(db_article)
    return db_article

@article_router.get("/", response_model=List[ArticleResponse])
def get_articles(
    skip: int = 0,
    limit: int = 10,
    user_id: int | None = None,
    db: Session = Depends(get_db)
):
    query = db.query(Article)
    
    if user_id is not None:
        query = query.filter(Article.user_id == user_id)
    
    articles = query.offset(skip).limit(limit).all()
    return articles

@article_router.delete("/{article_id}", response_model=ArticleResponse)
def delete_article(article_id: int, db: Session = Depends(get_db)):
    article = db.query(Article).filter(Article.id == article_id).first()
    if not article:
        raise HTTPException(status_code=404, detail="Article not found")
    db.delete(article)
    db.commit()
    return article

@article_router.get("/export/user/{user_id}")
def export_user_articles(user_id: int, db: Session = Depends(get_db)):
    """
    Endpoint to export all articles for a specific user as a downloadable JSON file.
    """
    articles = db.query(Article).filter(Article.user_id == user_id).all()
    
    if not articles:
        raise HTTPException(status_code=404, detail=f"No articles found for user {user_id}")
    
    # Convert articles to dictionary format
    articles_data = [{
        "id": article.id,
        "title": article.title,
        "user_id": article.user_id,
        "prediction": article.prediction,
        "authors": article.authors,
        "date": article.date,
        "publisher": article.publisher,
        "url": article.url
    } for article in articles]
    
    # Create a temporary file
    with tempfile.NamedTemporaryFile(mode='w', delete=False, suffix='.json') as tmp:
        json.dump(articles_data, tmp, indent=4)
        tmp_path = tmp.name
    
    # Generate a filename with timestamp and user ID
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    filename = f"user_{user_id}_articles_export_{timestamp}.json"
    
    return FileResponse(
        tmp_path,
        media_type='application/json',
        filename=filename,
        headers={"Content-Disposition": f"attachment; filename={filename}"}
    )