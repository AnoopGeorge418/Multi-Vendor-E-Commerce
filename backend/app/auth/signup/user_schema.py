from pydantic import BaseModel, EmailStr, field_validator
from typing import Optional

class SingupDataType(BaseModel):
    firstname: str
    lastname: str
    email: EmailStr
    tocAgreed: bool 
    prpAgreed: bool

    # validating firstname and lastname
    @field_validator('firstname','lastname')
    @classmethod
    def name_must_be_longer_than_4(cls, value: str):
        if not value.isalpha():
            raise ValueError("Name must only contains letters")
        
        if len(value.strip()) <= 4:
            raise ValueError("Name must be more than 4 characters")
        
        return value

    # validating terms of service and privacy policy
    @field_validator('tocAgreed', 'prpAgreed')
    @classmethod
    def must_be_agreed(cls, value: str):
        if value is not True:
            raise ValueError("Please agree to our Terms of Services and Privacy Policy to continue to Rivora")
        
        return value
