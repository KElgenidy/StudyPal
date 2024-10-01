# Create Engine is used to create a connection to the database.
from sqlalchemy import create_engine
# declarative_base is used to create a base class for the database, which servers for declarative models that will be created.
from sqlalchemy.ext.declarative import declarative_base
# sessionmaker is used to create a session to the database.
from sqlalchemy.orm import sessionmaker

SQLALCHEMY_DATABASE_URL = "postgresql://postgres:karim@localhost:5432/Backend"

engine = create_engine(SQLALCHEMY_DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()