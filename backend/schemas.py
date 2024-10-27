from pydantic import BaseModel, EmailStr
from typing import Optional, List

# Query
class Query(BaseModel):
    query: str

class QueryResponse(BaseModel):
    response: str

# Quizzes
class ChoiceBase(BaseModel):
    choice_text: str
    is_correct: bool


class QuestionBase(BaseModel):
    question_text: str
    choices: List[ChoiceBase]


# Users
class UsersBase(BaseModel):
    id: int
    email: str
    firstname: str
    lastname: str
    password: str
    type: str
    major: str

class UserSignIn(BaseModel):
    email: str
    password: str

class SignInResponse(UsersBase):
    id: int
    firstname: str
    lastname: str

    class Config:
        from_attributes = True

# Courses
class CourseBase(BaseModel):
    id: int
    course_name: str
    description: str

class CourseContentBase(BaseModel):
    data: str
    course_id: int
    user_id: int


class CourseRegister(BaseModel):
    course_name: str
    description: str

# Emrollments
class EnrollmentBase(BaseModel):
    course_id: int
    user_id: int


# Chat History
class ChatHistoryBase(BaseModel):
    chat_message: str
    course_id: int
    user_id: int

# Summary Notes
class SummaryNotesBase(BaseModel):
    note: str
    course_id: int
    user_id: int