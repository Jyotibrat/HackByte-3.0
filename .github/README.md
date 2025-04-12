<h1 align="center">
  🏙️ Floor Planning AI
</h1>

<p align="center">
  <strong>AI-powered multimodal solution to generate, filter, and refine architectural floor plans using cutting-edge generative models.</strong>
</p>

---

## 📑 Table of Contents

- [🌟 Features](#-features)
- [🏗️ Tech Stack](https://github.com/Jyotibrat/Document-Summarizer?tab=readme-ov-file#%EF%B8%8F-tech-stack)
- [📂 Project Structure](#-project-structure)
- [🚀 Deployment Status](#-deployment-status)
- [🚀 Installation & Setup](#-installation--setup)
- [🎥 How to Run the Application](#-how-to-run-the-application)
- [🎥 Demo Video](#-demo-video)
- [👥 Contributors](https://github.com/Jyotibrat/Document-Summarizer?tab=readme-ov-file#---contributors)
- [📜 License](#-license)
- [🏆 Acknowledgment](#-acknowledgment)
  
---

## 🌟 Features

### 🔹 Key Highlights

✅ Generate floor plans using **Fused Stable Diffusion with ControlNet**, **Gemini with Matplotlib**, and **Multimodal Stable Diffusion** models.\
✅ Route and filter user prompts using a NLP filter made using **Gemini API**.\
✅ Built-in **model switcher** to select desired generator.\
✅ Tailored output generation based on **prompt engineering** and model-specific tuning.\
✅ Optimized for fast performance and extensibility.

---

## 🏗️ Tech Stack

### Web Application

#### 🔹 Frontend

- **React.js + Vite** - Frontend framework
- **Tailwind CSS** - Styling library
- **Lucide Icons** - UI enhancement

#### 🔹 Backend

- **Python** - Core programming language
- **FastAPI / Flask** - Web framework
- **Gemini API** - Prompt filtering and refinement
- **Stable Diffusion / FloorGPT** - Floor plan generation
- **Pillow / OpenCV** - Image processing tools

### Mobile Application

#### 🔹 Frontend

- **React.js + Vite** - Frontend framework
- **Tailwind CSS** - Styling library
- **Lucide Icons** - UI enhancement

#### 🔹 Backend

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
HackByte-3.0/
│
├───vite.config.js
├───package.json
├───package-lock.json
├───index.html
├───eslint.config.js
├───README.md
├───LICENSE
├───.gitignore
│
├───src/
│   ├───main.jsx
│   ├───index.css
│   ├───App.jsx
│   ├───App.css
│   └───services/
│   │   └───chatApiService.js
│   └───pages/
│   │   ├───StableDiffusionPage.jsx
│   │   ├───ResultsPage.jsx
│   │   ├───MidjourneyPage.jsx
│   │   ├───KnowMorePage.jsx
│   │   ├───HomePage.jsx
│   │   ├───DallEPage.jsx
│   │   ├───ContributorsPage.jsx
│   │   └───ChatPage.jsx
│   ├───components/
│   │   ├───Welcome.jsx
│   │   ├───PageTransition.jsx
│   │   ├───NavBar.jsx
│   │   ├───MessageList.jsx
│   │   ├───LoadingScreen.jsx
│   │   ├───ChatSidebar.jsx
│   │   └───ChatInput.jsx
│   └───assets/
│       └───react.svg
│
├───public/
│   ├───LOGO-modified.png
│   ├───profilePhotos/
│   │   ├───bindupautra.jpg
│   │   ├───avinash.jpeg
│   │   └───arunim.jpg
│   ├───logos/
│   │   ├───stable diffusion and controlnet model logo.jpeg
│   │   ├───multi modal logo.jpeg
│   │   └───gemini matplotlib model logo.jpeg
│   └───ArchitectureImg/
│       ├───stable diffusion controlnet model architecture.jpg
│       ├───multi modal model architecture.jpg
│       └───Gemini matplotlib model architecture.jpg
├───backend/
│   ├───app.py
│   └───requirements.txt
├───Notebooks/
│   ├───Readme.md
│   ├───Multi-Modal/
│   │   ├───ZB_Tech_Text_to_Image_Model.ipynb
│   │   ├───ZB_Tech_Text_to_Image_Generator_API.ipynb
│   │   ├───Unoptimized_cloudqi_Text_to_Image_Model.ipynb
│   │   ├───Unified_APIs.ipynb
│   │   ├───URL_Testing.ipynb
│   │   ├───Stability_AI_Stable_Diffusion_Model_API.ipynb
│   │   ├───StabilityAI_Stable_Diffusion_Model.ipynb
│   │   ├───Runwayml_Stable_Diffusion_Model_API.ipynb
│   │   ├───Runwayml_Stable_Diffusion_Model.ipynb
│   │   ├───Optimized_Cloudqi_Text_to_Image_Model.ipynb
│   │   ├───Cloudqi_Text_to_Image_Model_API.ipynb
│   │   └───API_Testing.ipynb
│   ├───Gemini with Matplotlib Model/
│   │   └───dynamic_floor_planner_ipynb.ipynb
│   └───Fused Stable Diffusion with ControlNet Model/
│       └───ControlNet_Stable_Diffusion_wandb_(1) (1).ipynb
├───Mobile App/
│   ├───tsconfig.json
│   ├───package.json
│   ├───package-lock.json
│   ├───app.json
│   ├───.prettierrc
│   ├───.gitignore
│   ├───hooks/
│   │   └───useFrameworkReady.ts
│   ├───backend/
│   │   ├───requirements.txt
│   │   └───app.py
│   ├───assets/
│   │   └───images/
│   │       ├───icon.png
│   │       ├───favicon.png
│   │       ├───Results/
│   │       │   ├───Stable Diffusion/
│   │       │   │   └───Result 1 stable diffusion.png
│   │       │   ├───Multi Modal/
│   │       │   │   └───Result 4 multi modal.png
│   │       │   │   └───Result 3 multi modal.png
│   │       │   │   └───Result 2 multi modal.png
│   │       │   │   └───Result 1 multi modal.png
│   │       │   └───Gemini/
│   │       │   │   └───Result 1 gemini.png
│   │       ├───Model Architectures/
│   │       │   ├───Stable Diffusion and ControlNet Architecture.jpg
│   │       │   ├───Multi Modal Architecture .jpg
│   │       │   └───Gemini with matplotlib model architecture.jpg
│   │       └───Contributors/
│   │           ├───Bindupautra Jyotibrat.jpg
│   │           ├───Avinash Kushwaha.jpeg
│   │           ├───Arunim Gogoi.png
│   │           └───Ansh Photo.jpg
│   └───app/
│       ├───_layout.tsx
│       ├───+not-found.tsx
│       └───(tabs)/
│           ├───results.tsx
│           ├───models.tsx
│           ├───index.tsx
│           ├───contributors.tsx
│           └───_layout.tsx
├───Assets/
│   ├───README.md
│   ├───Bindupautra Github Photo.png
│   ├───Arunim Github Photo.png
│   ├───Ansh Github Photo.png
│   └───AK.jpeg
└───.github/
     ├───README.md
     └───ISSUE_TEMPLATE/
         ├───feature_request.md
         └───bug_report.md
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
