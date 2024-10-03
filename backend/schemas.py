# schemas.py
from pydantic import BaseModel, EmailStr
from typing import Optional, List

# Define the Pydantic models for User
class UserBase(BaseModel):
    ID: int
    Name: str
    Email: EmailStr
    Type: str  # 'student' or 'instructor'
    Major: Optional[str] = None

class UserCreate(UserBase):
    Password: str

class UserSignIn(BaseModel):
    Email: EmailStr
    Password: str

class UserResponse(UserBase):

    class Config:
        from_attributes = True

# Define the Pydantic models for Course
class CourseBase(BaseModel):
    CRN: int
    Name: str
    Description: str

class CourseResponse(CourseBase):
    class Config:
        from_attributes = True

# Define the Pydantic models for Enrollment
# class EnrollmentBase(BaseModel):
#     ID: int
#     CRN: int
#     UserId: int

# class EnrollmentResponse(EnrollmentBase):
#     class Config:
#         orm_mode = True

class EnrollmentBase(BaseModel):
    UserId: int
    CRN: List[int]  # Change to accept a list of CRNs

class EnrollmentResponse(BaseModel):
    UserId: int
    CRN: List[int]

    class Config:
        from_attributes = True