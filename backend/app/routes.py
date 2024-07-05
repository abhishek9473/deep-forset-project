from fastapi import APIRouter, Depends, Request
from sqlalchemy.orm import Session
from sqlalchemy import desc
from app import database
from app.auth import create_access_token, get_password_hash, verify_password
from app.middleware import validate_token
from app.schemas import UserCreate, UserLogin, TaskCreate, TaskUpdate, Task, User
from app.models.task import Task as TaskModel
from app.models.user import User as UserModel
from app.utils import create_response  

router = APIRouter()

@router.get("/")
def read_root():
    return create_response(status=True, message="Todo-routes working")


@router.post("/signup/", response_model=dict)
def signup(user: UserCreate, db: Session = Depends(database.get_db)):
    existing_user = db.query(UserModel).filter(UserModel.email == user.email).first()
    if existing_user:
        return create_response(status=False, message="Email already registered")

    hashed_password = get_password_hash(user.password)
    new_user = UserModel(name=user.name, email=user.email, password=hashed_password)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    access_token = create_access_token(data={"sub": new_user.email, "uid": new_user.id})
    return create_response(
        status=True,
        message="User created successfully",
        entity={
            "access_token": access_token,
            "token_type": "bearer",
            "email": new_user.email,
            "name": new_user.name
        }
    )

@router.post("/login/", response_model=dict)
def login(user: UserLogin, db: Session = Depends(database.get_db)):
    db_user = db.query(UserModel).filter(UserModel.email == user.email).first()
    if not db_user or not verify_password(user.password, db_user.password):
        return create_response(status=False, message="Invalid email or password")
    access_token = create_access_token(data={"sub": db_user.email, "uid": db_user.id})
    return create_response(
        status=True,
        message="Login successful",
        entity={
            "access_token": access_token,
            "token_type": "bearer",
            "email": db_user.email,
            "name": db_user.name
        }
    )



@router.post("/add_task/", response_model=dict)
async def create_task(task: TaskCreate, request: Request, db: Session = Depends(database.get_db)):
    await validate_token(request)  # Validate the token here
    current_user = request.state.user  # Get the user ID from the request state
    new_task = TaskModel(name=task.name, description=task.description, user_id=current_user)
    db.add(new_task)
    db.commit()
    db.refresh(new_task)
    return create_response(status=True, message="Task created successfully", entity=Task.from_orm(new_task))


@router.get("/all_tasks/", response_model=dict)
async def read_tasks(request: Request, db: Session = Depends(database.get_db)):
    await validate_token(request)  # Validate the token here
    current_user = request.state.user  # Get the user ID from the request state
    tasks = db.query(TaskModel).filter(TaskModel.user_id == current_user).order_by(desc(TaskModel.id)).all()  # Order by created_at in descending order
    return create_response(status=True, message="Tasks fetched successfully", entity=[Task.from_orm(task) for task in tasks])


@router.put("/update_task/{task_id}", response_model=dict)
async def update_task(task_id: int, task: TaskUpdate, request: Request, db: Session = Depends(database.get_db)):
    await validate_token(request)  # Validate the token here
    current_user = request.state.user  # Get the user ID from the request state
    db_task = db.query(TaskModel).filter(TaskModel.id == task_id, TaskModel.user_id == current_user).first()
    if not db_task:
        return create_response(status=False, message="Task not found")
    db_task.name = task.name
    db_task.description = task.description
    db.commit()
    db.refresh(db_task)
    return create_response(status=True, message="Task updated successfully", entity=Task.from_orm(db_task))


@router.delete("/delete_task/{task_id}", response_model=dict)
async def delete_task(task_id: int, request: Request, db: Session = Depends(database.get_db)):
    await validate_token(request)  # Validate the token here
    current_user = request.state.user  # Get the user ID from the request state
    db_task = db.query(TaskModel).filter(TaskModel.id == task_id, TaskModel.user_id == current_user).first()
    if not db_task:
        return create_response(status=False, message="Task not found")
    db.delete(db_task)
    db.commit()
    return create_response(status=True, message="Task deleted successfully")
