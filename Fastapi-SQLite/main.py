from fastapi import FastAPI
from models.account import account_router
from models.article import article_router
from models.database import Base, engine

# Initialize the database
Base.metadata.create_all(bind=engine)

# Create the FastAPI app
app = FastAPI()

# Include routers from account and article modules
app.include_router(account_router, prefix="/users", tags=["Users"])
app.include_router(article_router, prefix="/articles", tags=["Articles"])