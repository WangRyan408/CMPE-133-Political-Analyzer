from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from models.account import account_router
from models.article import article_router
from models.database import Base, engine

Base.metadata.create_all(bind=engine)

app = FastAPI()

app.add_middleware(
       CORSMiddleware,
       allow_origins=["http://localhost:3000", "https://cmpe-133-political-analyzer-zw55.vercel.app/"],  # In production, set to your frontend URL
       allow_credentials=True,
       allow_methods=["*"],
       allow_headers=["*"],
   )

app.include_router(account_router, prefix="/users", tags=["Users"])
app.include_router(article_router, prefix="/articles", tags=["Articles"])