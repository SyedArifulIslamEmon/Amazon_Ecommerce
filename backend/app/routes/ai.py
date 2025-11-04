from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

from app.services.ai_recommender import (
    ai_chat_response,
    ai_generate_description,
    ai_recommend_products,
    ai_search_products
)

router = APIRouter()


class QueryPayload(BaseModel):
    query: str


@router.post("/recommendations")
async def get_recommendations(payload: QueryPayload):
    if not payload.query:
        raise HTTPException(status_code=400, detail="Query is required")
    return await ai_recommend_products(payload.query)


@router.post("/chat")
async def ai_chat(payload: QueryPayload):
    if not payload.query:
        raise HTTPException(status_code=400, detail="Query is required")
    return await ai_chat_response(payload.query)


@router.post("/description")
async def generate_description(payload: QueryPayload):
    if not payload.query:
        raise HTTPException(status_code=400, detail="Query is required")
    return await ai_generate_description(payload.query)


@router.post("/search")
async def semantic_search(payload: QueryPayload):
    if not payload.query:
        raise HTTPException(status_code=400, detail="Query is required")
    return await ai_search_products(payload.query)
