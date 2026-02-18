from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
from dotenv import load_dotenv
import os

# loading database url
load_dotenv()
LOCAL_DB_URL = os.getenv('POSTGRES_DB_URL')

# creating sql engine
engine = create_engine(LOCAL_DB_URL)

SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine
)

Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
