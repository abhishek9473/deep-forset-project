from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import router
import os
from dotenv import load_dotenv

load_dotenv() 

FRONTEND_PORT = os.getenv("FRONTEND_PORT")

app = FastAPI()

# CORS configuration
origins = [
    FRONTEND_PORT
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],  # Allow all methods
    allow_headers=["*"],  # Allow all headers
)

app.include_router(router)
