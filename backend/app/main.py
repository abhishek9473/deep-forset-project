# app/main.py

from fastapi import FastAPI
# from app.middleware import validate_token
from app.routes import router

app = FastAPI()

# Add the middleware
# app.add_middleware(validate_token)

app.include_router(router)
