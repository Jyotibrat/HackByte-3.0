<h1 align="center">
  🏙️ Floor Planning AI
</h1>

<p align="center">
  <strong>AI-powered multimodal solution to generate, filter, and refine architectural floor plans using cutting-edge generative models.</strong>
</p>

---

## 📑 Table of Contents

- [🌟 Features](#-features)
- [🏗️ Tech Stack](#-tech-stack)
- [📂 Project Structure](#-project-structure)
- [🚀 Deployment Status](#-deployment-status)
- [🚀 Installation & Setup](#-installation--setup)
- [📜 License](#-license)
- [🏆 Acknowledgment](#-acknowledgment)

---

## 🌟 Features

### 🔹 Key Highlights

✅ Generate floor plans using **Stable Diffusion**, **FloorGPT**, and **Multimodal AI** models.\
✅ Route and filter user prompts using the **Gemini API**.\
✅ Built-in **model switcher** to select desired generator.\
✅ Tailored output generation based on **prompt engineering** and model-specific tuning.\
✅ Highly customizable **frontend** interface.\
✅ Optimized for fast performance and extensibility.

---

## 🏗️ Tech Stack

### 🔹 Backend

- **Python** - Core programming language
- **FastAPI / Flask** - Web framework
- **Gemini API** - Prompt filtering and refinement
- **Stable Diffusion / FloorGPT** - Floor plan generation
- **Pillow / OpenCV** - Image processing tools

### 🔹 Frontend

- **React.js + Vite** - Frontend framework
- **Tailwind CSS** - Styling library
- **Lucide Icons** - UI enhancement

---

## 📂 Project Structure

```
Floor-Planning-AI/
│
├───.env
├───README.md
├───package.json
├───vite.config.ts
│
├───src/
│   ├───App.jsx
│   ├───components/
│   └───pages/
│
├───backend/
    ├───app.py
    └───requirements.txt
```

---

## 🚀 Deployment Status

### 🔹 Frontend Deployment

👉 [**Live Frontend Preview**](https://hack-byte-3-0.vercel.app/)

⚠️ **Note**: Backend deployment is currently under development. Please follow the setup instructions below to run the full application locally.

---

## 🚀 Installation & Setup

### 🔧 1️⃣ Clone the Repository

```sh
git clone https://github.com/Jyotibrat/HackByte-3.0.git
```

### 🔑 2️⃣ Add Gemini API Key

1. Navigate to the `backend` folder:
   ```sh
   cd backend
   ```
2. Create a `.env` file and add your Gemini API key:
   ```env
   GEMINI_API_KEY='your_api_key_here'
   PORT=5000
   DEBUG=True
   ```

### 🧠 3️⃣ Backend Setup

```sh
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python app.py
```

### 🖥️ 4️⃣ Frontend Setup

```sh
npm install
npm run dev
```

---

## 📜 License

### 🔹 Licensing Details

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 🏆 Acknowledgment

This project is part of **HackByte 3.0** conducted by **IIITDM Jabalpur**.
