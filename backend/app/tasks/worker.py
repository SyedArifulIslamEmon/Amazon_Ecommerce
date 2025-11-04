from celery import Celery
from loguru import logger

from app.core.config import settings

celery_app = Celery(
    "amazon_clone_ai",
    broker=settings.REDIS_URL,
    backend=settings.REDIS_URL,
)

celery_app.conf.task_routes = {"app.tasks.*": {"queue": "default"}}


@celery_app.task(name="app.tasks.send_order_email")
def send_order_email(order_id: str) -> None:
    logger.info(f"Sending order confirmation email for order {order_id}")


@celery_app.task(name="app.tasks.generate_recommendations")
def generate_recommendations(user_id: str, query: str) -> None:
    logger.info(f"Generating async recommendations for user {user_id} ({query})")
