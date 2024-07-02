# app/routes.py

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

@router.post("/login/")
def login(user: UserLogin, db: Session = Depends(database.get_db)):
    db_user = db.query(UserModel).filter(UserModel.email == user.email).first()
    if not db_user or not verify_password(user.password, db_user.password):
        raise HTTPException(status_code=400, detail="Invalid email or password")
    access_token = create_access_token(data={"sub": db_user.email})
    return {"access_token": access_token, "token_type": "bearer"}

@router.post("/tasks/", response_model=Task)
def create_task(task: TaskCreate, db: Session = Depends(database.get_db)):
    current_user = 2  # Placeholder for actual user ID, should come from authentication
    new_task = TaskModel(name=task.name, discription=task.discription, user_id=current_user)
    db.add(new_task)
    db.commit()
    db.refresh(new_task)
    return new_task


# @router.put("/tasks/{task_id}", response_model=Task)
# def update_task(task_id: int, task: TaskUpdate, db: Session = Depends(database.get_db), request: Request = Depends(validate_token)):
#     current_user = request.state.user
#     existing_task = db.query(Task).filter(Task.id == task_id, Task.owner == current_user).first()
#     if not existing_task:
#         raise HTTPException(status_code=404, detail="Task not found")
#     existing_task.title = task.title
#     existing_task.description = task.description
#     db.commit()
#     db.refresh(existing_task)
#     return existing_task

# @router.get("/tasks/", response_model=List[Task])
# def read_tasks(skip: int = 0, limit: int = 10, db: Session = Depends(database.get_db), request: Request = Depends(validate_token)):
#     current_user = request.state.user
#     tasks = db.query(Task).filter(Task.owner == current_user).offset(skip).limit(limit).all()
#     return tasks

# @router.delete("/tasks/{task_id}")
# def delete_task(task_id: int, db: Session = Depends(database.get_db), request: Request = Depends(validate_token)):
#     current_user = request.state.user
#     existing_task = db.query(Task).filter(Task.id == task_id, Task.owner == current_user).first()
#     if not existing_task:
#         raise HTTPException(status_code=404, detail="Task not found")
#     db.delete(existing_task)
#     db.commit()
#     return {"message": "Task deleted successfully"}
