from datetime import datetime
from typing import List, Optional

from beanie import Document, Indexed
from pydantic import Field


class Product(Document):
    title: Indexed(str)  # type: ignore[valid-type]
    slug: Indexed(str, unique=True)  # type: ignore[valid-type]
    description: str
    price: float = Field(gt=0)
    original_price: Optional[float] = None
    stock: int = Field(ge=0)
    category: str
    subcategory: Optional[str] = None
    brand: Optional[str] = None
    images: List[str] = Field(default_factory=list)
    features: List[str] = Field(default_factory=list)
    specifications: dict = Field(default_factory=dict)
    rating: float = Field(default=0.0, ge=0, le=5)
    num_reviews: int = Field(default=0, ge=0)
    is_active: bool = True
    is_featured: bool = False
    tags: List[str] = Field(default_factory=list)
    embedding: Optional[List[float]] = None  # For AI semantic search
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

    class Settings:
        collection = "products"

    class Config:
        json_schema_extra = {
            "example": {
                "title": "Premium Wireless Headphones",
                "slug": "premium-wireless-headphones",
                "description": "High-quality wireless headphones with noise cancellation",
                "price": 199.99,
                "original_price": 249.99,
                "stock": 50,
                "category": "Electronics",
                "subcategory": "Audio",
                "brand": "TechBrand",
                "images": ["https://example.com/image1.jpg"],
                "rating": 4.5,
                "num_reviews": 120,
            }
        }
