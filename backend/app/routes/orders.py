from typing import Annotated, List

from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel

from app.models.order import Order, OrderItem, ShippingAddress, PaymentDetails
from app.models.user import User
from app.routes.auth import get_current_user

router = APIRouter()


class OrderCreate(BaseModel):
    items: List[OrderItem]
    shipping_address: ShippingAddress
    notes: str | None = None


class OrderResponse(BaseModel):
    id: str
    order_number: str
    user_id: str
    items: List[OrderItem]
    shipping_address: ShippingAddress
    payment: PaymentDetails
    subtotal: float
    tax: float
    shipping_cost: float
    total: float
    status: str


@router.post("/", response_model=OrderResponse, status_code=status.HTTP_201_CREATED)
async def create_order(
    payload: OrderCreate,
    current_user: Annotated[User, Depends(get_current_user)]
):
    subtotal = sum(item.price * item.quantity for item in payload.items)
    tax = subtotal * 0.1
    shipping_cost = 10.0 if subtotal < 50 else 0.0
    total = subtotal + tax + shipping_cost

    order = Order(
        user_id=str(current_user.id),
        items=payload.items,
        shipping_address=payload.shipping_address,
        notes=payload.notes,
        subtotal=subtotal,
        tax=tax,
        shipping_cost=shipping_cost,
        total=total
    )

    await order.insert()

    return OrderResponse(
        id=str(order.id),
        order_number=order.order_number,
        user_id=order.user_id,
        items=order.items,
        shipping_address=order.shipping_address,
        payment=order.payment,
        subtotal=order.subtotal,
        tax=order.tax,
        shipping_cost=order.shipping_cost,
        total=order.total,
        status=order.status
    )


@router.get("/", response_model=List[OrderResponse])
async def list_user_orders(current_user: Annotated[User, Depends(get_current_user)]):
    orders = await Order.find(Order.user_id == str(current_user.id)).to_list()
    return [
        OrderResponse(
            id=str(order.id),
            order_number=order.order_number,
            user_id=order.user_id,
            items=order.items,
            shipping_address=order.shipping_address,
            payment=order.payment,
            subtotal=order.subtotal,
            tax=order.tax,
            shipping_cost=order.shipping_cost,
            total=order.total,
            status=order.status
        ) for order in orders
    ]


@router.get("/{order_id}", response_model=OrderResponse)
async def get_order(order_id: str, current_user: Annotated[User, Depends(get_current_user)]):
    order = await Order.get(order_id)
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")

    if order.user_id != str(current_user.id) and "admin" not in current_user.roles:
        raise HTTPException(status_code=403, detail="Not enough permissions")

    return OrderResponse(
        id=str(order.id),
        order_number=order.order_number,
        user_id=order.user_id,
        items=order.items,
        shipping_address=order.shipping_address,
        payment=order.payment,
        subtotal=order.subtotal,
        tax=order.tax,
        shipping_cost=order.shipping_cost,
        total=order.total,
        status=order.status
    )
