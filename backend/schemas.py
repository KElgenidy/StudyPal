# schemas.py
from pydantic import BaseModel, EmailStr
from typing import Optional

class UserBase(BaseModel):
    Name: str
    Email: EmailStr
    Type: str  # 'student' or 'instructor'
    Major: Optional[str] = None
    Speciality: Optional[str] = None

class UserCreate(UserBase):
    Password: str

class UserSignIn(BaseModel):
    Email: EmailStr
    Password: str

class UserResponse(UserBase):
    ID: int

    class Config:
        orm_mode = True