from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from database import Base


#  Define the User model
class Users(Base):
    __tablename__ = "Users"

    ID = Column(Integer, primary_key=True, index=True)
    Name = Column(String(255), nullable=False)
    Email = Column(String(255), unique=True, nullable=False, index=True)
    Password = Column(String(255), nullable=True)
    Type = Column(String(50), nullable=False)  # 'student' or 'instructor'
    Major = Column(String(255), nullable=True)
    # RELATIONSHIPS 
    enrollments = relationship("Enrollment", back_populates="user")

# Define the Course model
class Courses(Base):
    __tablename__ = "Courses"
    # Define the columns
    CRN = Column(Integer, primary_key=True, index=True)
    Name = Column(String(255), nullable=False)
    Description = Column(String(500), nullable=False)
    # RELATIONSHIPS
    enrollments = relationship("Enrollment", back_populates="course")
    
# Define the Enrollment model
class Enrollment(Base):
    __tablename__ = "Enrollment"
    # Define the columns
    ID = Column(Integer, primary_key=True, index=True)
    CRN = Column(Integer, ForeignKey("Courses.CRN"))
    UserId = Column(Integer, ForeignKey("Users.ID"))
    # RELATIONSHIPS
    user = relationship("Users", back_populates="enrollments")
    course = relationship("Courses", back_populates="enrollments")

