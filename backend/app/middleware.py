# app/dependencies.py

from fastapi import Depends, HTTPException, Request
from jose import JWTError, jwt

SECRET_KEY = "abhi_passcode_python"
ALGORITHM = "HS256"

async def validate_token(request: Request):
    token = request.headers.get("Authorization")
    if token:
        try:
            token = token.split(" ")[1]  # Expecting the header format "Bearer <token>"
            payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
            request.state.user = payload.get("sub")
        except JWTError:
            raise HTTPException(status_code=401, detail="Invalid token")
    else:
        raise HTTPException(status_code=401, detail="Authorization header missing")
