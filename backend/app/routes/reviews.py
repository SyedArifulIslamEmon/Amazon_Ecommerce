from typing import List

from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel

from app.models.review import Review
from app.routes.auth import get_current_user
from app.services.ai_recommender import summarize_review_sentiment

router = APIRouter()


class ReviewCreate(BaseModel):
    product_id: str
    rating: int
    title: str
    comment: str
    images: list[str] = []


class ReviewResponse(BaseModel):
    id: str
    product_id: str
    user_id: str
    rating: int
    title: str
    comment: str
    images: list[str]
    sentiment: str | None
    verified_purchase: bool
    helpful_count: int
    unhelpful_count: int


@router.post("/", response_model=ReviewResponse, status_code=status.HTTP_201_CREATED)
async def create_review(payload: ReviewCreate, user=Depends(get_current_user)):
    review = Review(
        product_id=payload.product_id,
        user_id=str(user.id),
        rating=payload.rating,
        title=payload.title,
        comment=payload.comment,
        images=payload.images,
    )
    review.sentiment = await summarize_review_sentiment(payload.comment)
    await review.insert()

    return ReviewResponse(
        id=str(review.id),
        product_id=review.product_id,
        user_id=review.user_id,
        rating=review.rating,
        title=review.title,
        comment=review.comment,
        images=review.images,
        sentiment=review.sentiment,
        verified_purchase=review.verified_purchase,
        helpful_count=review.helpful_count,
        unhelpful_count=review.unhelpful_count,
    )


@router.get("/product/{product_id}", response_model=List[ReviewResponse])
async def list_reviews(product_id: str):
    reviews = await Review.find(Review.product_id == product_id, Review.is_approved == True).to_list()  # type: ignore[comparison-overlap]
    return [
        ReviewResponse(
            id=str(review.id),
            product_id=review.product_id,
            user_id=review.user_id,
            rating=review.rating,
            title=review.title,
            comment=review.comment,
            images=review.images,
            sentiment=review.sentiment,
            verified_purchase=review.verified_purchase,
            helpful_count=review.helpful_count,
            unhelpful_count=review.unhelpful_count,
        )
        for review in reviews
    ]
