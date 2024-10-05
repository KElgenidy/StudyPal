from fastapi import FastAPI, Depends, HTTPException, status, Request, Response
from sqlalchemy.orm import Session
import models, schemas
from database import engine, get_db
from fastapi.middleware.cors import CORSMiddleware
from studypal import StudyPal

studypal = StudyPal()

# Create all tables
models.Base.metadata.create_all(bind=engine)


app = FastAPI()

origins = ["*"]

# Configure CORS (adjust origins as needed)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Change to specific domains in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/signup/", response_model=schemas.UserResponse)
def signup(user: schemas.UserCreate, db: Session = Depends(get_db)):
    # Check if the email is already in use
    existing_user = db.query(models.Users).filter(models.Users.Email == user.Email).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    if user.Password == "":
        raise HTTPException(status_code=400, detail="Password cannot be empty")
    
    # Create a new user
    new_user = models.Users(
        ID=user.ID,
        Name=user.Name,
        Email=user.Email,
        Password=user.Password,
        Type=user.Type,
        Major=user.Major,
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return new_user

@app.post("/signin/")
def signin(form_data: schemas.UserSignIn, response: Response, db: Session = Depends(get_db)):
    # Authenticate the user
    user = db.query(models.Users).filter(models.Users.Email == form_data.Email).first()
    if not user or user.Password != form_data.Password:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    # Here you can generate a JWT token for authentication
    # For simplicity, we'll just return a success message
    return {
        "message": "Successfully signed in",
        "user_id": user.ID,
        "user_name": user.Name
    }

@app.get("/users/{user_id}", response_model=schemas.UserResponse)
def get_user(user_id: int, db: Session = Depends(get_db)):
    user = db.query(models.Users).filter(models.Users.ID == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user


# courses routes
# get all courses
@app.get("/courses/", response_model=list[schemas.CourseResponse])
def get_courses(db: Session = Depends(get_db)):
    courses = db.query(models.Courses).all()
    if not courses:
        raise HTTPException(status_code=404, detail="No courses found")
    return courses
#get course by id
@app.get("/courses/{course_id}", response_model=schemas.CourseResponse)
def get_course(course_id: int, db: Session = Depends(get_db)):
    course = db.query(models.Courses).filter(models.Courses.CRN == course_id).first()
    if not course:
        raise HTTPException(status_code=404, detail="Course not found")
    return course

#create course
@app.post("/courses/create", response_model=schemas.CourseResponse)
def create_course(course: schemas.CourseBase, db: Session = Depends(get_db)):
    # Check if the course already exists
    existing_course = db.query(models.Courses).filter(models.Courses.CRN == course.CRN).first()
    if existing_course:
        raise HTTPException(status_code=400, detail="Course already exists")
    # Create a new course
    new_course = models.Courses(
        CRN=course.CRN,
        Name=course.Name,
        Description=course.Description
    )
    db.add(new_course)
    db.commit()
    db.refresh(new_course)
    return new_course

# enrollment routes
# get all enrolled courses
@app.get("/enrollments/{user_id}", response_model=list[schemas.CourseResponse])
def get_enrollments(user_id: int, db: Session = Depends(get_db)):
    enrollments = db.query(models.Enrollment).filter(models.Enrollment.UserId == user_id).all()
    if not enrollments:
        raise HTTPException(status_code=404, detail="You have not enrolled in any courses")
    enrolledcourses = []
    for enrollment in enrollments:
        enrolledcourses.append(db.query(models.Courses).filter(models.Courses.CRN == enrollment.CRN).first())
    
    return enrolledcourses

# enroll in a course
@app.post("/enrollments/enroll", response_model=schemas.EnrollBase)
def enroll_course(enrollment: schemas.EnrollBase, db: Session = Depends(get_db)):
    # Check if the course exists
    course = db.query(models.Courses).filter(models.Courses.CRN == enrollment.CRN).first()
    if not course:
        raise HTTPException(status_code=404, detail="Course not found")
    # Check if the user is already enrolled in the course
    existing_enrollment = db.query(models.Enrollment).filter(models.Enrollment.UserId == enrollment.UserId, models.Enrollment.CRN == enrollment.CRN).first()
    if existing_enrollment:
        raise HTTPException(status_code=400, detail="You are already enrolled in this course")
    # Create a new enrollment
    new_enrollment = models.Enrollment(
        UserId=enrollment.UserId,
        CRN=enrollment.CRN
    )
    db.add(new_enrollment)
    db.commit()
    db.refresh(new_enrollment)
    return new_enrollment


@app.post("/enrollments/create", response_model=schemas.EnrollmentResponse)
def enroll_course(enrollment: schemas.EnrollmentBase, db: Session = Depends(get_db)):
    details = []

    # Check if the user is already enrolled in any of the courses
    for crn in enrollment.CRN:
        existing_enrollment = db.query(models.Enrollment).filter(models.Enrollment.UserId == enrollment.UserId, models.Enrollment.CRN == crn).first()
        if existing_enrollment:
            details.append(str(crn))
        
    if details:
        raise HTTPException(status_code=400, detail=f"You are already enrolled in the following courses: {", ".join(details)}.")
            

    # Create new enrollments for each course
    for crn in enrollment.CRN:
        new_enrollment = models.Enrollment(
            UserId=enrollment.UserId,
            CRN=crn
        )
        db.add(new_enrollment)
    db.commit()
    return {
        "UserId": enrollment.UserId,
        "CRN": enrollment.CRN
    }




@app.post("/chat", response_model=schemas.QueryResponse)
def chat(request: schemas.Query):
    response =  studypal.query(query=request.query)
    return {
        "response": response
    }
    
    
