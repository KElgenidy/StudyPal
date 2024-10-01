from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship
from database import Base


class User(Base):
    __tablename__ = "Users"

    ID = Column(Integer, primary_key=True, index=True)
    Name = Column(String(255), nullable=False)
    Email = Column(String(255), unique=True, nullable=False, index=True)
    Password = Column(String(255), nullable=False)
    Type = Column(String(50), nullable=False)  # 'student' or 'instructor'
    Major = Column(String(255), nullable=True)
    Speciality = Column(String(255), nullable=True)