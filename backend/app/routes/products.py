from typing import List, Optional

from fastapi import APIRouter, Depends, HTTPException, Query, status
from pydantic import BaseModel

from app.models.product import Product
from app.routes.auth import get_current_user

router = APIRouter()


class ProductCreate(BaseModel):
    title: str
    slug: str
    description: str
    price: float
    original_price: float | None = None
    stock: int
    category: str
    subcategory: str | None = None
    brand: str | None = None
    images: List[str] = []
    features: List[str] = []
    specifications: dict = {}
    tags: List[str] = []
    is_active: bool = True
    is_featured: bool = False


class ProductResponse(ProductCreate):
    id: str
    rating: float
    num_reviews: int


@router.get("/", response_model=List[ProductResponse])
async def list_products(
    q: Optional[str] = Query(None, description="Search term"),
    category: Optional[str] = None,
    limit: int = Query(20, ge=1, le=100),
    skip: int = Query(0, ge=0)
):
    query = Product.find(Product.is_active == True)  # type: ignore[comparison-overlap]

    if q:
        query = query.find(
            Product.title.regex(q, ignore_case=True) | Product.description.regex(q, ignore_case=True)
        )

    if category:
        query = query.find(Product.category == category)

    products = await query.skip(skip).limit(limit).to_list()
    return [ProductResponse(**product.model_dump(), id=str(product.id)) for product in products]


@router.get("/{slug}", response_model=ProductResponse)
async def get_product(slug: str):
    product = await Product.find_one(Product.slug == slug)
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    return ProductResponse(**product.model_dump(), id=str(product.id))


@router.post("/", response_model=ProductResponse, status_code=status.HTTP_201_CREATED)
async def create_product(payload: ProductCreate, user=Depends(get_current_user)):
    if "admin" not in user.roles:
        raise HTTPException(status_code=403, detail="Not enough permissions")

    if await Product.find_one(Product.slug == payload.slug):
        raise HTTPException(status_code=400, detail="Slug already exists")

    product = Product(**payload.model_dump())
    await product.insert()
    return ProductResponse(**product.model_dump(), id=str(product.id))


@router.put("/{product_id}", response_model=ProductResponse)
async def update_product(product_id: str, payload: ProductCreate, user=Depends(get_current_user)):
    if "admin" not in user.roles:
        raise HTTPException(status_code=403, detail="Not enough permissions")

    product = await Product.get(product_id)
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")

    await product.set(payload.model_dump())
    return ProductResponse(**product.model_dump(), id=str(product.id))


@router.delete("/{product_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_product(product_id: str, user=Depends(get_current_user)):
    if "admin" not in user.roles:
        raise HTTPException(status_code=403, detail="Not enough permissions")

    product = await Product.get(product_id)
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")

    await product.delete()
    return None
