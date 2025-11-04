import pytest
from httpx import AsyncClient
from fastapi import status

from app.main import app


@pytest.mark.asyncio
async def test_health_endpoint():
    async with AsyncClient(app=app, base_url="http://testserver") as ac:
        response = await ac.get("/health")
    assert response.status_code == status.HTTP_200_OK
    payload = response.json()
    assert payload["status"] == "healthy"
