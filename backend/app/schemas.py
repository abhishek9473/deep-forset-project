# app/schemas.py

from pydantic import BaseModel
from typing import List, Optional

class TaskBase(BaseModel):
    name: str
    description: Optional[str] = None

class TaskCreate(TaskBase):
    pass

class TaskUpdate(TaskBase):
    pass

class Task(TaskBase):
    id: int
    user_id: int

    class Config:
        orm_mode = True

class UserBase(BaseModel):
    name: str
    email: str

class UserCreate(UserBase):
    password: str

class UserLogin(BaseModel):
    email: str
    password: str

class User(UserBase):
    id: int
    tasks: List[Task] = []

    class Config:
        orm_mode = True
