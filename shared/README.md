# Shared Schemas and Types

This directory contains shared TypeScript/Python schemas and types that are used across both frontend and backend.

## Purpose

- Maintain consistent data models between Next.js frontend and FastAPI backend
- Reduce duplication and potential sync issues
- Provide single source of truth for API contracts

## Structure

```
shared/
├── schemas/          # Pydantic models (Python) and Zod schemas (TypeScript)
├── types/            # TypeScript type definitions
└── README.md
```

## Usage

### Backend (Python/FastAPI)
```python
from shared.schemas.product import ProductSchema
```

### Frontend (TypeScript/Next.js)
```typescript
import type { Product } from "@/shared/types";
```
