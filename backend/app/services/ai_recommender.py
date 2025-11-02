from functools import lru_cache
from typing import Any, Dict, List

from loguru import logger

try:
    from langchain_openai import ChatOpenAI
except ImportError:  # pragma: no cover - optional dependency
    ChatOpenAI = None  # type: ignore

try:
    from sentence_transformers import SentenceTransformer
except ImportError:  # pragma: no cover - optional dependency
    SentenceTransformer = None  # type: ignore

from app.core.config import settings


@lru_cache(maxsize=1)
def get_llm():
    if not settings.OPENAI_API_KEY or not ChatOpenAI:
        logger.warning("OpenAI API key not configured or langchain_openai missing. Using fallback responses.")
        return None
    return ChatOpenAI(
        model="gpt-4.5-turbo",
        temperature=0.7,
        openai_api_key=settings.OPENAI_API_KEY,
    )


@lru_cache(maxsize=1)
def get_sentence_transformer():
    if not SentenceTransformer:
        logger.warning("SentenceTransformer model not available. Using fallback embeddings.")
        return None
    try:
        return SentenceTransformer(settings.SENTENCE_TRANSFORMER_MODEL)
    except Exception as exc:  # pragma: no cover
        logger.error(f"Failed to load SentenceTransformer: {exc}")
        return None


async def ai_recommend_products(user_query: str) -> Dict[str, Any]:
    llm = get_llm()
    if not llm:
        # Fallback deterministic recommendations
        return {
            "recommendations": [
                {
                    "title": "Wireless Noise-Cancelling Headphones",
                    "slug": "wireless-noise-cancelling-headphones",
                    "reason": "Popular choice for immersive music and productivity",
                },
                {
                    "title": "Smart Home Hub (Matter Compatible)",
                    "slug": "smart-home-hub",
                    "reason": "Control your smart devices seamlessly",
                },
                {
                    "title": "4K Ultra HD Streaming Stick",
                    "slug": "4k-ultra-hd-streaming-stick",
                    "reason": "Bring your favorite content to any TV",
                },
            ],
            "source": "static-fallback",
        }

    prompt = (
        "You are an AI shopping assistant. Given the user query, recommend 5 products in JSON "
        "array format with fields: title, slug (url friendly), and reason."
    )
    response = await llm.ainvoke(f"User query: {user_query}\n{prompt}")
    return {"recommendations": response.content, "source": "openai"}


async def ai_search_products(user_query: str) -> Dict[str, Any]:
    model = get_sentence_transformer()
    if not model:
        return {
            "query": user_query,
            "embedding": [0.0] * 384,
            "source": "static-fallback",
        }
    embedding = model.encode(user_query, normalize_embeddings=True).tolist()  # type: ignore[arg-type]
    return {"query": user_query, "embedding": embedding, "source": "sentence-transformers"}


async def ai_generate_description(product_brief: str) -> Dict[str, str]:
    llm = get_llm()
    if not llm:
        return {
            "headline": "Premium AI-Generated Product",
            "description": (
                f"Experience cutting-edge innovation with this product. Designed for users looking for {product_brief}, "
                "it combines performance, style, and reliability."
            ),
            "source": "static-fallback",
        }
    prompt = (
        "Write a compelling e-commerce description with a headline and bullet benefits for the following product:"
        f" {product_brief}. Return JSON with 'headline' and 'description'."
    )
    response = await llm.ainvoke(prompt)
    return {"raw": response.content, "source": "openai"}


async def ai_chat_response(message: str) -> Dict[str, Any]:
    llm = get_llm()
    if not llm:
        return {
            "message": (
                "Thanks for reaching out! Our AI assistant is offline, but based on your message we recommend browsing "
                "our best sellers or contacting support at support@example.com."
            ),
            "source": "static-fallback",
        }
    response = await llm.ainvoke(
        "You are a helpful AI shopping assistant that provides concise support messages." f"\nUser: {message}"
    )
    return {"message": response.content, "source": "openai"}


async def summarize_review_sentiment(review_text: str) -> str:
    llm = get_llm()
    if not llm:
        review_text_lower = review_text.lower()
        if any(word in review_text_lower for word in ["bad", "terrible", "poor", "awful"]):
            return "negative"
        if any(word in review_text_lower for word in ["great", "excellent", "amazing", "love"]):
            return "positive"
        return "neutral"

    response = await llm.ainvoke(
        "Classify the sentiment of this review as positive, neutral, or negative. Return only the sentiment word.\n"
        f"Review: {review_text}"
    )
    return response.content.strip().lower()
