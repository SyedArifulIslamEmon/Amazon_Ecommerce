# 🛒 AI-Powered Amazon Clone - Modern Monorepo

A cutting-edge, full-stack eCommerce platform powered by AI, real-time features, and modern web technologies.

## 🚀 Tech Stack

### Frontend
- **Next.js 15** (React 19, App Router, Server Actions)
- **TypeScript**
- **Tailwind CSS 4**
- **React Query** (data fetching)
- **WebSockets** (real-time chat)

### Backend
- **FastAPI 0.115+** (Python 3.13)
- **MongoDB 7** (Beanie ODM)
- **Redis 7.4** (caching + pub/sub)
- **WebSockets** (real-time communication)
- **Celery** (background tasks)

### AI/ML
- **LangChain** (AI orchestration)
- **OpenAI GPT-4.5-turbo** (chat, recommendations)
- **Sentence-Transformers** (semantic search)
- **CLIP** (image understanding)

### Services
- **Stripe** (payments)
- **Meilisearch/Atlas Search** (product search)
- **S3/Cloudinary** (media storage)
- **AWS ECS/Render** (backend deployment)
- **Vercel** (frontend deployment)

## 📁 Project Structure

```
amazon-clone-ai/
├── frontend/          # Next.js 15 App Router
├── backend/           # FastAPI + MongoDB
├── shared/            # Shared schemas/types
├── docker-compose.yml # Local dev environment
└── .github/workflows/ # CI/CD pipelines
```

## 🛠️ Getting Started

### Prerequisites

- **Node.js 20+**
- **Python 3.13+**
- **Docker & Docker Compose**
- **MongoDB Atlas account** (or local MongoDB)
- **Redis** (via Docker or local)
- **OpenAI API Key**

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd amazon-clone-ai
```

### 2. Setup Backend

```bash
cd backend
python3.13 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env
# Edit .env with your credentials
uvicorn app.main:app --reload --port 8000
```

### 3. Setup Frontend

```bash
cd frontend
npm install
cp .env.example .env.local
# Edit .env.local with your API URLs
npm run dev
```

### 4. Docker Compose (Recommended)

```bash
docker-compose up --build
```

Access the application:
- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:8000
- **API Docs:** http://localhost:8000/docs

## ✨ Features

### Core eCommerce
- ✅ Product catalog with advanced filtering
- ✅ Shopping cart & wishlist
- ✅ Secure checkout with Stripe
- ✅ Order tracking & history
- ✅ User authentication (JWT)
- ✅ Product reviews & ratings

### AI-Powered Features
- 🤖 **AI Chatbot** - Customer support assistant
- 🎯 **Smart Recommendations** - Personalized product suggestions
- 🔍 **Semantic Search** - Natural language product search
- 📝 **Auto Product Descriptions** - AI-generated content
- 📊 **Review Summaries** - AI-powered sentiment analysis
- 🛡️ **Fraud Detection** - ML-based transaction monitoring

### Real-time Features
- 💬 **Live Chat** - WebSocket-based customer support
- 🔔 **Notifications** - Real-time order updates
- 📦 **Inventory Updates** - Live stock tracking

### Admin Panel
- 📊 Dashboard with analytics
- 📦 Product management
- 👥 User management
- 📈 Sales reports
- 🤖 AI model monitoring

## 🧪 Testing

```bash
# Backend tests
cd backend
pytest

# Frontend tests
cd frontend
npm test
```

## 🚢 Deployment

### Frontend (Vercel)
```bash
cd frontend
vercel --prod
```

### Backend (AWS ECS / Render)
```bash
cd backend
docker build -t amazon-clone-backend .
# Push to ECR or deploy to Render
```

## 📚 API Documentation

Once the backend is running, visit:
- **Swagger UI:** http://localhost:8000/docs
- **ReDoc:** http://localhost:8000/redoc

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- FastAPI for the blazing-fast API framework
- OpenAI for GPT models
- All open-source contributors

---

Built with ❤️ using cutting-edge technologies
