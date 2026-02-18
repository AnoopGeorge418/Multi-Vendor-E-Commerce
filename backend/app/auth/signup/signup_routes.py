from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.core.db_connection import get_db
from app.auth.signup.user_schema import SingupDataType
from app.auth.signup.signup_service import create_user

router = APIRouter(prefix='/auth', tags=['Auth'])

@router.post('/register', status_code = status.HTTP_201_CREATED)
async def register_new_user(user: SingupDataType, db: Session = Depends(get_db)):
    result = create_user(db, user)
    
    if not result:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already exists"
        )

    return {"message": "User account created successfully"}
