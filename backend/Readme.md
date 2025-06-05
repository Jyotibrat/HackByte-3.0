# Backend - AI Floor Plan Generation API

This directory contains the Backend implementation for our AI-powered floor plan generation web application, developed for HackByte-3.0. The Backend is built using Flask to provide robust REST API endpoints for floor plan generation using multiple AI models.

## 📁 Directory Structure

```
Backend/
├── app.py
├── requirements.txt
└── Readme.md
```

## 🚀 Features

- RESTful API endpoints for AI-powered floor plan generation
- Multiple AI model integration (Multi-modal, Stable Diffusion, Floor GPT)
- Prompt validation using Google Gemini AI
- Real-time floor plan image generation
- Base64 image encoding for frontend integration
- CORS support for cross-origin requests
- Comprehensive logging and error handling

## 🛠️ Tech Stack

- **Flask** - Lightweight WSGI web application framework for REST API
- **Google Gemini AI** - Prompt validation and content generation
- **Python 3.8+** - Programming language
- **Flask-CORS** - Cross-Origin Resource Sharing support
- **Requests** - HTTP library for external API calls
- **python-dotenv** - Environment variable management

## 📋 Prerequisites

Before running the backend, ensure you have the following installed:

- [**Python**](https://www.python.org/downloads/) 3.8 or higher
- [**pip**](https://packaging.python.org/en/latest/tutorials/installing-packages/) (Python package manager)
- [**Virtual environment**](https://docs.python.org/3/library/venv.html) (recommended)

## 🔧 Installation

Read the Installation Guide [**here**](https://github.com/Jyotibrat/HackByte-3.0/tree/main?tab=readme-ov-file#-backend-setup)

## ⚙️ Configuration

Create a `.env` file in the backend directory with the following variables:

```env
# Flask Configuration
PORT=5000
DEBUG=True

# Google Gemini AI Configuration
GEMINI_API_KEY=your_gemini_api_key_here

# Model Service URLs (Ngrok tunnels for development)
# These are automatically configured in the application
```

## 🚀 Running the Application

### Flask Server

```bash
python app.py
```

The API will be available at:

- Flask API: http://localhost:5000
- Health Check: http://localhost:5000/health

## 📚 API Endpoints

### Models & Generation
- `GET /api/models` - Get available AI models for floor plan generation
- `POST /api/validate-prompt` - Validate if prompt is related to floor planning
- `POST /api/generate` - Generate floor plans based on prompt and selected model

### System
- `GET /health` - Health check endpoint

## 🚀 Deployment

The backend is currently in development and not deployed.

---

**Note**: This backend is currently under development and not production-ready. Use in production environments is not recommended without proper testing and security reviews.