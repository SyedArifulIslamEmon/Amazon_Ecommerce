from datetime import datetime
from typing import List, Optional

from beanie import Document, Indexed
from pydantic import EmailStr, Field


class User(Document):
    email: Indexed(EmailStr, unique=True)  # type: ignore[valid-type]
    hashed_password: str
    full_name: Optional[str] = None
    roles: List[str] = Field(default_factory=lambda: ["customer"])
    is_active: bool = True
    is_verified: bool = False
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

    class Settings:
        collection = "users"

    class Config:
        json_schema_extra = {
            "example": {
                "email": "user@example.com",
                "full_name": "Jane Doe",
                "roles": ["customer"],
                "is_active": True,
                "is_verified": False,
            }
        }
