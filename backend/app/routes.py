from fastapi import APIRouter, Depends, HTTPException, Request
from sqlalchemy.orm import Session
from app import database
from app.auth import create_access_token, get_password_hash, verify_password
from app.middleware import validate_token
from app.schemas import UserCreate, UserLogin, TaskCreate, TaskUpdate, Task, User
from typing import List
from app.models.task import Task as TaskModel
from app.models.user import User as UserModel

router = APIRouter()

@router.get("/")
def read_root():
    return {"Hello": "World"}

@router.post("/signup/", response_model=User)
def signup(user: UserCreate, db: Session = Depends(database.get_db)):
    hashed_password = get_password_hash(user.password)
    new_user = UserModel(name=user.name, email=user.email, password=hashed_password)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user

@router.post("/login/", response_model=dict)
def login(user: UserLogin, db: Session = Depends(database.get_db)):
    db_user = db.query(UserModel).filter(UserModel.email == user.email).first()
    if not db_user or not verify_password(user.password, db_user.password):
        raise HTTPException(status_code=400, detail="Invalid email or password")
    access_token = create_access_token(data={"sub": db_user.email, "uid": db_user.id})
    return {"access_token": access_token, "token_type": "bearer"}

@router.post("/add_task/", response_model=Task)
async def create_task(task: TaskCreate, request: Request, db: Session = Depends(database.get_db)):
    await validate_token(request)  # Validate the token here
    current_user = request.state.user  # Get the user ID from the request state
    new_task = TaskModel(name=task.name, description=task.description, user_id=current_user)
    db.add(new_task)
    db.commit()
    db.refresh(new_task)
    return new_task

@router.get("/all_tasks/", response_model=List[Task])
async def read_tasks(request: Request, db: Session = Depends(database.get_db)):
    await validate_token(request)  # Validate the token here
    current_user = request.state.user  # Get the user ID from the request state
    tasks = db.query(TaskModel).filter(TaskModel.user_id == current_user).all()
    return tasks

@router.put("/update_task/{task_id}", response_model=Task)
async def update_task(task_id: int, task: TaskUpdate, request: Request, db: Session = Depends(database.get_db)):
    await validate_token(request)  # Validate the token here
    current_user = request.state.user  # Get the user ID from the request state
    db_task = db.query(TaskModel).filter(TaskModel.id == task_id, TaskModel.user_id == current_user).first()
    if not db_task:
        raise HTTPException(status_code=404, detail="Task not found")
    db_task.name = task.name
    db_task.description = task.description
    db.commit()
    db.refresh(db_task)
    return db_task

@router.delete("/delete_task/{task_id}", response_model=dict)
async def delete_task(task_id: int, request: Request, db: Session = Depends(database.get_db)):
    await validate_token(request)  # Validate the token here
    current_user = request.state.user  # Get the user ID from the request state
    db_task = db.query(TaskModel).filter(TaskModel.id == task_id, TaskModel.user_id == current_user).first()
    if not db_task:
        raise HTTPException(status_code=404, detail="Task not found")
    db.delete(db_task)
    db.commit()
    return {"message": "Task deleted successfully"}
