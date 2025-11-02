from typing import Dict

from fastapi import WebSocket, WebSocketDisconnect
from loguru import logger
from redis import asyncio as aioredis

from app.core.config import settings


redis = aioredis.from_url(settings.REDIS_URL)
active_connections: Dict[str, WebSocket] = {}


async def websocket_endpoint(websocket: WebSocket, user_id: str):
    await websocket.accept()
    active_connections[user_id] = websocket
    logger.info(f"User {user_id} connected to chat websocket")

    async def redis_listener():
        pubsub = redis.pubsub()
        await pubsub.subscribe(settings.REDIS_CHANNEL_CHAT)
        try:
            async for message in pubsub.listen():  # type: ignore[attr-defined]
                if message and message.get("type") == "message":
                    data = message.get("data")
                    if isinstance(data, bytes):
                        data = data.decode()
                    await websocket.send_text(data)
        finally:
            await pubsub.unsubscribe(settings.REDIS_CHANNEL_CHAT)

    listener_task = None
    try:
        import asyncio

        listener_task = asyncio.create_task(redis_listener())
        while True:
            text = await websocket.receive_text()
            payload = f"{user_id}: {text}"
            await redis.publish(settings.REDIS_CHANNEL_CHAT, payload)
    except WebSocketDisconnect:
        logger.info(f"User {user_id} disconnected from chat websocket")
    except Exception as exc:  # pragma: no cover
        logger.error(f"WebSocket error for user {user_id}: {exc}")
    finally:
        active_connections.pop(user_id, None)
        if listener_task:
            listener_task.cancel()
