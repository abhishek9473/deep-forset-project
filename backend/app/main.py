from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import router
from dotenv import load_dotenv

load_dotenv()  # Load environment variables from .env file

app = FastAPI()

# CORS configuration
origins = [
    "http://localhost:3000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],  # Allow all methods
    allow_headers=["*"],  # Allow all headers
)

app.include_router(router)
