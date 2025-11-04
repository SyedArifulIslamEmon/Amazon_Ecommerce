from contextlib import asynccontextmanager

from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
from beanie import init_beanie
from loguru import logger

from app.core.config import settings
from app.models.user import User
from app.models.product import Product
from app.models.order import Order
from app.models.review import Review
from app.models.chat import ChatSession


@asynccontextmanager
async def lifespan(app: FastAPI):
    logger.info("Initializing database connection...")
    client = AsyncIOMotorClient(settings.MONGODB_URI)
    await init_beanie(
        database=client[settings.MONGODB_DATABASE],
        document_models=[User, Product, Order, Review, ChatSession]
    )
    logger.info("✅ Database connected successfully")
    yield
    logger.info("Shutting down application...")
    client.close()


app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.API_VERSION,
    openapi_url=f"{settings.API_PREFIX}/openapi.json",
    lifespan=lifespan
)


app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def root():
    return {
        "message": "🛒 Amazon Clone AI Backend",
        "version": settings.API_VERSION,
        "status": "running",
        "docs": f"{settings.API_PREFIX}/docs"
    }


@app.get("/health")
async def health_check():
    return {"status": "healthy", "environment": settings.ENVIRONMENT}


# Import routes (will be created next)
from app.routes import auth, products, orders, reviews, chat, ai

app.include_router(auth.router, prefix=f"{settings.API_PREFIX}/auth", tags=["Authentication"])
app.include_router(products.router, prefix=f"{settings.API_PREFIX}/products", tags=["Products"])
app.include_router(orders.router, prefix=f"{settings.API_PREFIX}/orders", tags=["Orders"])
app.include_router(reviews.router, prefix=f"{settings.API_PREFIX}/reviews", tags=["Reviews"])
app.include_router(chat.router, prefix=f"{settings.API_PREFIX}/chat", tags=["Chat"])
app.include_router(ai.router, prefix=f"{settings.API_PREFIX}/ai", tags=["AI Features"])


# WebSocket endpoint for chat
from app.websocket.chat_ws import websocket_endpoint
app.add_api_websocket_route("/ws/chat/{user_id}", websocket_endpoint)
