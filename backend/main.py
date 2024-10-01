from fastapi import FastAPI, Depends, HTTPException, status, Request, Response
from sqlalchemy.orm import Session
import models, schemas
from database import engine, get_db
from fastapi.middleware.cors import CORSMiddleware

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
    existing_user = db.query(models.User).filter(models.User.Email == user.Email).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    # Create a new user
    new_user = models.User(
        Name=user.Name,
        Email=user.Email,
        Password=user.Password,
        Type=user.Type,
        Major=user.Major,
        Speciality=user.Speciality
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return new_user

@app.post("/signin/")
def signin(form_data: schemas.UserSignIn, response: Response, db: Session = Depends(get_db)):
    # Authenticate the user
    user = db.query(models.User).filter(models.User.Email == form_data.Email).first()
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
    user = db.query(models.User).filter(models.User.ID == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user