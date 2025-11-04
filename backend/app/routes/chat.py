from uuid import uuid4

from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel

from app.models.chat import ChatSession, ChatMessage
from app.routes.auth import get_current_user

router = APIRouter()


class ChatSessionResponse(BaseModel):
    session_id: str
    user_id: str
    is_active: bool
    messages: list[ChatMessage]


@router.post("/sessions", response_model=ChatSessionResponse)
async def create_chat_session(user=Depends(get_current_user)):
    session_id = uuid4().hex
    chat_session = ChatSession(
        session_id=session_id,
        user_id=str(user.id)
    )
    await chat_session.insert()

    return ChatSessionResponse(
        session_id=chat_session.session_id,
        user_id=chat_session.user_id,
        is_active=chat_session.is_active,
        messages=chat_session.messages
    )


@router.get("/sessions/{session_id}", response_model=ChatSessionResponse)
async def get_chat_session(session_id: str, user=Depends(get_current_user)):
    session = await ChatSession.find_one(ChatSession.session_id == session_id)
    if not session:
        raise HTTPException(status_code=404, detail="Chat session not found")

    if session.user_id != str(user.id):
        raise HTTPException(status_code=403, detail="Not authorized")

    return ChatSessionResponse(
        session_id=session.session_id,
        user_id=session.user_id,
        is_active=session.is_active,
        messages=session.messages
    )
