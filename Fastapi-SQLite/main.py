from fastapi import FastAPI
from models.account import account_router
from models.article import article_router
from models.admin import admin_router
from models.database import Base, engine

Base.metadata.create_all(bind=engine)

app = FastAPI()

app.include_router(account_router, prefix="/users", tags=["Users"])
app.include_router(article_router, prefix="/articles", tags=["Articles"])
app.include_router(admin_router, tags=["Admins"])
