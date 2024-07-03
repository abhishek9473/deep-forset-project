from fastapi import Depends, HTTPException, Request
from jose import JWTError, jwt
import os
from app.utils import create_response

SECRET_KEY = os.getenv("SECRET_KEY")  # Load from .env file
ALGORITHM = "HS256"

async def validate_token(request: Request):
    token = request.headers.get("Authorization")
    if token:
        try:
            token = token.split(" ")[1]  # Expecting the header format "Bearer <token>"
            payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
            request.state.user = payload.get("uid")
        except JWTError:
            raise HTTPException(
                status_code=401,
                detail=create_response(status=False, message="Invalid token")
            )
    else:
        raise HTTPException(
            status_code=401,
            detail=create_response(status=False, message="Authorization header missing")
        )
