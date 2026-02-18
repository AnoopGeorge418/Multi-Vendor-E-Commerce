from app.auth.signup.user_model import User, UserRole
from app.auth.signup.user_schema import SingupDataType
from sqlalchemy.orm import Session
from passlib.context import CryptContext
import secrets, string

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def generate_password(length=12):
    chars = string.ascii_letters + string.digits + "!@#$%^&*"
    return ''.join(secrets.choice(chars) for _ in range(length))

def hash_password(password: str):
    return pwd_context.hash(password[:72])

def create_user(db: Session, user_data: SingupDataType):
    # Checking if user exist in db
    existing_user = db.query(User).filter(User.email == user_data.email).first()
    if existing_user:
        return None
    
    # Create hashed password
    raw_password = generate_password()
    hashed_password = hash_password(raw_password)

    new_user = User(
        firstname = user_data.firstname,
        lastname = user_data.lastname,
        email = user_data.email,
        tocAgreed = user_data.tocAgreed,
        prpAgreed = user_data.prpAgreed,
        password = hashed_password, 
        role = UserRole.user
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return new_user, raw_password
