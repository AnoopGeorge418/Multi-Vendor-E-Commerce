from sqlalchemy import Column, Integer, String, Boolean, Enum, DateTime
from app.core.db_connection import Base
import enum
from sqlalchemy.sql import func

class UserRole(enum.Enum):
    super_admin = 'super admin'
    admin = 'admin'
    user = 'user'
    vendor = 'vendor'

class User(Base):
    __tablename__ = 'users'

    id = Column(Integer, primary_key=True, index=True)
    firstname = Column(String(20), nullable=False)
    lastname = Column(String(20), nullable=False)
    email = Column(String(255), unique=True, nullable=False)
    tocAgreed = Column(Boolean, default=False)
    prpAgreed = Column(Boolean, default=False)
    role = Column(Enum(UserRole), default=UserRole.user, nullable=False)
    password = Column(String(255), nullable=False)
    emailVerified = Column(Boolean, default=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)
    updated_at = Column( DateTime(timezone=True), server_default=func.now(), onupdate=func.now(), nullable=False)

