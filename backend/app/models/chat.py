from datetime import datetime
from typing import List, Optional

from beanie import Document, Indexed
from pydantic import BaseModel, Field


class ChatMessage(BaseModel):
    sender_id: str
    receiver_id: str
    message: str
    role: str = "user"  # user, agent, ai
    created_at: datetime = Field(default_factory=datetime.utcnow)
    metadata: dict = Field(default_factory=dict)


class ChatSession(Document):
    session_id: Indexed(str, unique=True)  # type: ignore[valid-type]
    user_id: Indexed(str)  # type: ignore[valid-type]
    agent_id: Optional[str] = None
    messages: List[ChatMessage] = Field(default_factory=list)
    is_active: bool = True
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

    class Settings:
        collection = "chat_sessions"
