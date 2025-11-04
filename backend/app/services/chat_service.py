from datetime import datetime
from typing import Dict

from loguru import logger

from app.models.chat import ChatSession, ChatMessage
from app.services.ai_recommender import ai_chat_response


async def record_user_message(session_id: str, sender_id: str, message: str) -> Dict[str, str]:
    session = await ChatSession.find_one(ChatSession.session_id == session_id)
    if not session:
        raise ValueError("Chat session not found")

    chat_message = ChatMessage(
        sender_id=sender_id,
        receiver_id=session.agent_id or "ai-assistant",
        message=message,
        role="user",
        created_at=datetime.utcnow(),
    )
    session.messages.append(chat_message)
    session.updated_at = datetime.utcnow()
    await session.save()

    logger.info(f"Stored chat message for session {session_id}")

    ai_reply = await ai_chat_response(message)
    ai_message = ChatMessage(
        sender_id="ai-assistant",
        receiver_id=sender_id,
        message=ai_reply.get("message", "I'm here to help!"),
        role="ai",
        created_at=datetime.utcnow(),
    )
    session.messages.append(ai_message)
    session.updated_at = datetime.utcnow()
    await session.save()

    return {"reply": ai_message.message}
