from fastapi import FastAPI, Depends, HTTPException
from fastapi import FastAPI, File, UploadFile
from sqlalchemy.orm import Session
import models, schemas
from database import get_db, engine
from fastapi.middleware.cors import CORSMiddleware
import shutil
import os
from studypal import StudyPal
from fastapi import Query
from pydantic import BaseModel
from typing import List
from studypal import StudyPal

studypal = StudyPal()
agent = studypal.get_react_agent()

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# CHAT
@app.post("/chat", response_model=schemas.QueryResponse)
def chat(request: schemas.Query):
    inputs = {"messages": [("user", request.query)]}
    response =  agent.invoke(inputs)
    return {
        "response": response["messages"][-1].content,
    }
    

# Users
@app.post("/signup/")
async def create_user(user: schemas.UsersBase, db: Session = Depends(get_db)):
   
    existing_user = db.query(models.Users).filter(models.Users.email == user.email).first()

    

    if existing_user is not None:
        print("User already exists")
        return HTTPException(status_code=400, detail="User already exists")
    if user.password == " ":
        print("Password cannot be empty")
        return HTTPException(status_code=400, detail="Password cannot be empty")
    
    new_user = models.Users(
        email=user.email,
        firstname=user.firstname,
        lastname=user.lastname,
        password=user.password,
        type=user.type,
        major=user.major
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return {
        "message": "User created successfully",
    }

@app.post("/signin/")
async def signin(user: schemas.UserSignIn, db: Session = Depends(get_db)):
    existing_user = db.query(models.Users).filter(models.Users.email == user.email).first()

    print(existing_user)

    if existing_user is None or existing_user.password != user.password:
        raise HTTPException(status_code=401, detail="Invalid email or password")
    
    
    return {
        "message": "User signed in successfully",
        "user_id": existing_user.id,
        "firstname": existing_user.firstname,
        "lastname": existing_user.lastname,
    }

@app.get("/users/{user_id}")
async def get_user(user_id: int, db: Session = Depends(get_db)):
    user = db.query(models.Users).filter(models.Users.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user

# Courses
@app.get("/courses/", response_model=list[schemas.CourseBase])
async def get_courses(db: Session = Depends(get_db)):
    courses = db.query(models.Course).all()
    if not courses:
        raise HTTPException(status_code=404, detail="No courses found")
    return courses

@app.get("/courses/{course_id}")
async def get_course(course_id: int, db: Session = Depends(get_db)):
    course = db.query(models.Course).filter(models.Course.id == course_id).first()
    if not course:
        raise HTTPException(status_code=404, detail="Course not found")
    return course
app.get("/courses/{course_name}")
async def get_course(course_name: str, db: Session = Depends(get_db)):
    course = db.query(models.Course).filter(models.Course.course_name == course_name).first()
    if not course:
        raise HTTPException(status_code=404, detail="Course not found")
    return {"courseId": course.id, "courseName": course.course_name}  # Add any other fields you need
#@app.get("/courses/{course_name}")
#async def get_course(course_name: str, db: Session = Depends(get_db)):
#    course = db.query(models.Course).filter(models.Course.course_name == course_name).first()
#    if not course:
#        raise HTTPException(status_code=404, detail="Course not found")
#    return course

@app.post("/courses/create/")
def create_course(course: schemas.CourseBase, db: Session = Depends(get_db)):
    exsisting_course = db.query(models.Course).filter(models.Course.id == course.id).first()
    if exsisting_course:
        raise HTTPException(status_code=400, detail="Course already exists")
    
    new_course = models.Course(
        id=course.id,
        course_name = course.course_name,
        description=course.description
    )
    db.add(new_course)
    db.commit()
    db.refresh(new_course)
    return {
        "message": "Course created successfully",
    }
# @app.put("/courses/update/{course_id}")
# async def update_course(course_id: int, course: schemas.CourseBase, db: Session = Depends(get_db)):
#     existing_course = db.query(models.Course).filter(models.Course.id == course_id).first()
#     if not existing_course:
#         raise HTTPException(status_code=404, detail="Course not found")
#     existing_course.course_name = course.course_name
#     existing_course.description = course.description
#     db.commit()
#     db.refresh(existing_course)
#     return existing_course

#  ENROLLMENT
@app.post("/enrollment/enroll/")
async def create_enrollment(enrollment: schemas.EnrollmentBase, db: Session = Depends(get_db)):
    
    course = db.query(models.Course).filter(models.Course.id == enrollment.course_id).first()
    if not course:
        raise HTTPException(status_code=404, detail="Course not found")
    
    existing_enrollment = db.query(models.Enrollment).filter(models.Enrollment.course_id == enrollment.course_id, models.Enrollment.user_id == enrollment.user_id).first()
    if existing_enrollment:
        raise HTTPException(status_code=400, detail="User already enrolled in this course")

    new_enrollment = models.Enrollment(
        course_id=enrollment.course_id, user_id=enrollment.user_id
    )
    db.add(new_enrollment)
    db.commit()
    db.refresh(new_enrollment)
    # return enrollment
    db.commit()
    return {
        "message": "Enrollment operation successfully",
    }

@app.get("/enrollment/{user_id}")
def read_enrollment(user_id: int, db: Session = Depends(get_db)):
    enrollments = db.query(models.Enrollment).filter(models.Enrollment.user_id == user_id).all()
    if not enrollments:
        raise HTTPException(status_code=404, detail="No enrollments found")
    
    enrolled_courses = []
    for enrollment in enrollments:
        enrolled_courses.append(db.query(models.Course).filter(models.Course.id == enrollment.course_id).first())

    return enrolled_courses

#@app.put("/enrollment/{enrollment_id}", response_model=models.Enrollment)
#def update_enrollment(enrollment_id: int, updated_enrollment: models.Enrollment, db: Session = Depends(get_db)):
#    enrollment = db.query(models.Enrollment).filter(models.Enrollment.id == enrollment_id).first()
#    if enrollment is None:
#        raise HTTPException(status_code=404, detail="Enrollment not found")
#    for key, value in updated_enrollment.__dict__.items():
#        if key != "id":
#            setattr(enrollment, key, value)
#    db.commit()
#    return enrollment

@app.delete("/enrollment/{enrollment_id}", response_model=dict)
def delete_enrollment(enrollment_id: int, db: Session = Depends(get_db)):
    enrollment = db.query(models.Enrollment).filter(models.Enrollment.id == enrollment_id).first()
    if enrollment is None:
        raise HTTPException(status_code=404, detail="Enrollment not found")
    db.delete(enrollment)
    db.commit()
    return {"detail": "Enrollment deleted"}




@app.post("/upload_pdf/")
async def upload_pdf(file: UploadFile = File(...)):
    # Define the directory where files will be stored
    temp_dir = "./temp"
    
    # Create the directory if it doesn't exist
    os.makedirs(temp_dir, exist_ok=True)

    # Define the file path
    file_location = f"{temp_dir}/{file.filename}"

    # Save the uploaded file
    with open(file_location, "wb") as f:
        shutil.copyfileobj(file.file, f)

    return {"info": "file uploaded successfully", "file_path": file_location}

@app.get("/api/flashcards")
async def get_flashcards(query: str = Query(...)):
    # Create an instance of StudyPal
    studypal = StudyPal()

    # Get the flashcards
    flashcards = studypal.flashcard_tool(query)

    return flashcards
