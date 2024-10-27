from sqlalchemy import Boolean, Column, Integer, String, ForeignKey, TIMESTAMP
from database import Base
from sqlalchemy.orm import relationship

# Questions
class Questions(Base):
    __tablename__ = 'questions'
    id = Column(Integer, primary_key=True, index=True)
    question_text = Column(String, index=True)

class Choices(Base):
    __tablename__ = 'choices'
    id = Column(Integer, primary_key=True, index=True)
    choice_text = Column(String, index=True)
    is_correct = Column(Boolean, default=False)
    question_id = Column(Integer, ForeignKey("questions.id"))

# Users - Student or Instructor
class Users(Base):

    __tablename__ = 'users'
    id = Column(Integer, primary_key=True, index=True)
    firstname = Column(String, index=True)
    lastname = Column(String, index=True)
    email = Column(String, index=True)
    password = Column(String, index=True)
    type = Column(String, index=True)
    major = Column(String, index=True)
    course_contents = relationship("CourseContent", back_populates="user")



# Courses
class Course(Base):

    __tablename__ = 'course'
    id = Column(Integer, primary_key=True, index=True)
    course_name = Column(String, index=True)
    description = Column(String,  index=True)
    course_contents = relationship("CourseContent", back_populates="course")
    

class CourseContent(Base):
    __tablename__ = 'course_content'
    id = Column(Integer, primary_key=True, index=True)
    data = Column(String, index=True)
    course_id = Column(Integer, ForeignKey('course.id'))  # Foreign key to the courses table
    user_id = Column(Integer, ForeignKey('users.id'))  # Foreign key to the users table

    course = relationship("Course", back_populates="course_contents")  # Relationship with the Course model
    user = relationship("Users", back_populates="course_contents") 
  

# Enrollment - Enrolling in a Course
class Enrollment(Base):
    __tablename__ = 'enrollment'
    id = Column(Integer, primary_key=True, index=True)
    course_id = Column(Integer, ForeignKey("course.id"))
    user_id = Column(Integer, ForeignKey("users.id"))


# Storing Chat History
class ChatHistory(Base):
    __tablename__ = 'chat_history'
    id = Column(Integer, primary_key=True, index=True)
    chat_message = Column(String, index=True)
    course_id = Column(Integer, ForeignKey("course.id"))
    user_id = Column(Integer, ForeignKey("users.id"))

# Summary Notes
class SummaryNotes(Base):
    __tablename__ = 'summary_notes'
    id = Column(Integer, primary_key=True, index=True)
    note = Column(String, index=True)
    course_id = Column(Integer, ForeignKey("course.id"))
    user_id = Column(Integer, ForeignKey("users.id"))
    created_at = Column(TIMESTAMP, index=True)
    updated_at = Column(TIMESTAMP, index=True)


