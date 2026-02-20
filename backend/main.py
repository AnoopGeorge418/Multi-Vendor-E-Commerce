from fastapi import FastAPI
import uvicorn # fast api runs through uvicorn
from dotenv import load_dotenv
import os

from app.auth.signup.signup_routes import router as signup_router
from app.core.db_connection import engine, Base
from app.models import * 
from fastapi.middleware.cors import CORSMiddleware

# reads all .env variables and values
load_dotenv()

PORT = int(os.getenv("PORT", 8000))

# initlizing fast api app
app = FastAPI(title='Rivora App')

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Create tables
Base.metadata.create_all(bind=engine)

# routes for rivora
app.include_router(signup_router)

if __name__ == "__main__":
    uvicorn.run(
        "main:app", 
        host="127.0.0.1", 
        port=PORT, 
        reload=True
    )
