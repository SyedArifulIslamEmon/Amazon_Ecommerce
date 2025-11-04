from datetime import datetime
from typing import List, Optional

from beanie import Document, Indexed
from pydantic import Field


class Review(Document):
    product_id: Indexed(str)  # type: ignore[valid-type]
    user_id: Indexed(str)  # type: ignore[valid-type]
    rating: int = Field(ge=1, le=5)
    title: str
    comment: str
    images: List[str] = Field(default_factory=list)
    verified_purchase: bool = False
    helpful_count: int = Field(default=0, ge=0)
    unhelpful_count: int = Field(default=0, ge=0)
    is_approved: bool = False
    sentiment: Optional[str] = None  # AI-generated: "positive", "negative", "neutral"
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

    class Settings:
        collection = "reviews"

    class Config:
        json_schema_extra = {
            "example": {
                "product_id": "507f1f77bcf86cd799439011",
                "user_id": "507f1f77bcf86cd799439012",
                "rating": 5,
                "title": "Amazing product!",
                "comment": "This product exceeded my expectations.",
                "verified_purchase": True,
            }
        }
