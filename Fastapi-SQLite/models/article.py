from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from .database import Base, get_db
from pydantic import BaseModel
from sqlalchemy import Column, Integer, String

# Create the router
article_router = APIRouter()

# Article Model
class Article(Base):
    __tablename__ = "articles"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    content = Column(String)
    user_id = Column(Integer, index=True)

# Pydantic Models
class ArticleCreate(BaseModel):
    title: str
    content: str
    user_id: int

class ArticleResponse(BaseModel):
    id: int
    title: str
    content: str
    user_id: int

    class Config:
        orm_mode = True

# Endpoints
@article_router.post("/create", response_model=ArticleResponse)
def create_article(article: ArticleCreate, db: Session = Depends(get_db)):
    db_article = Article(title=article.title, content=article.content, user_id=article.user_id)
    db.add(db_article)
    db.commit()
    db.refresh(db_article)
    return db_article

@article_router.get("/", response_model=List[ArticleResponse])
def get_articles(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    articles = db.query(Article).offset(skip).limit(limit).all()
    return articles

@article_router.delete("/{article_id}", response_model=ArticleResponse)
def delete_user(article_id: int, db: Session = Depends(get_db)):
    article = db.query(Article).filter(Article.id == article_id).first()
    if not article:
        raise HTTPException(status_code=404, detail="Article not found")
    db.delete(article)
    db.commit()
    return article