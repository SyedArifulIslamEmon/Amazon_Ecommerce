from datetime import datetime
from typing import List, Optional
from uuid import uuid4

from beanie import Document
from pydantic import BaseModel, Field


class OrderItem(BaseModel):
    product_id: str
    title: str
    quantity: int = Field(gt=0)
    price: float = Field(gt=0)
    image: Optional[str] = None


class ShippingAddress(BaseModel):
    full_name: str
    address_line1: str
    address_line2: Optional[str] = None
    city: str
    state: Optional[str] = None
    postal_code: str
    country: str
    phone_number: Optional[str] = None


class PaymentDetails(BaseModel):
    provider: str = "stripe"
    payment_intent_id: Optional[str] = None
    status: str = "pending"
    receipt_url: Optional[str] = None


class Order(Document):
    order_number: str = Field(default_factory=lambda: uuid4().hex[:12].upper())
    user_id: str
    items: List[OrderItem]
    shipping_address: ShippingAddress
    payment: PaymentDetails = Field(default_factory=PaymentDetails)
    subtotal: float = Field(gt=0)
    tax: float = Field(default=0)
    shipping_cost: float = Field(default=0)
    total: float = Field(gt=0)
    status: str = Field(default="pending")
    notes: Optional[str] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

    class Settings:
        collection = "orders"
