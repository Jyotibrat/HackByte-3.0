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
- [🎥 How to Run the Application](#-how-to-run-the-application)
- [👥 Contributors](#-contributors)
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
│   ├───App.tsx
│   ├───main.tsx
│   ├───components/
│   └───assets/
│
├───backend/
│   ├───app.py
│   ├───generator.py
│   ├───router.py
│   ├───env/
│   └───requirements.txt
│
└───assets/
    ├───Videos/
    └───Contributors/
```

---

## 🚀 Deployment Status

### 🔹 Frontend Deployment

👉 [**Live Frontend Preview**](https://floorplanningai.netlify.app/)

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

<h2 align="center">🎥 How to Run the Application</h2>

<p align="center">
📌 Watch the tutorial below to set up the complete application locally:
</p>

https://github.com/user-attachments/assets/floorplanning-ai-local-setup.mp4

<h2 align="center">🎥 Demo Video</h2>

<p align="center">
📌 Watch the full live demonstration:
</p>

https://github.com/user-attachments/assets/floorplanning-ai-demo.mp4

---

<h2 align="center">
  👥 Contributors
</h2>

<p align="center">
  Huge thanks to the team who brought this vision to life:
</p>

<div align="center">
  <a href="https://github.com/Arunim-Gogoi">
    <img src="../assets/Contributors/Arunim Github Photo.png" alt="Arunim Gogoi" style="border-radius: 50%; margin: 5px; width: 100px; height: 100px;">
  </a>
  <a href="https://github.com/Lucifer-here">
    <img src="../assets/Contributors/Ansh Github Photo.png" alt="Ansh Gaur" style="border-radius: 50%; margin: 5px; width: 100px; height: 100px;">
  </a>
  <a href="https://github.com/">
    <img src="../assets/Contributors/" alt="Avinash Kushwaha" style="border-radius: 50%; margin: 5px; width: 100px; height: 100px;">
  </a>
  <a href="https://github.com/Jyotibrat">
    <img src="../assets/Contributors/Bindupautra Github Photo.png" alt="Bindupautra Jyotibrat" style="border-radius: 50%; margin: 5px; width: 100px; height: 100px;">
  </a>
</div>

---

## 📜 License

### 🔹 Licensing Details

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 🏆 Acknowledgment

This project is part of **HackByte 3.0** conducted by **IIITDM Jabalpur**.
