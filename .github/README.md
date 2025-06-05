<h1 align="center">
  🏙️ Floor Planning AI
</h1>

<p align="center">
  <strong>AI-powered multimodal solution to generate, filter, and refine architectural floor plans using cutting-edge generative models.</strong>
</p>

---
---

# 📑 Table of Contents

- [**🌟 Features**](#-features)
- [**📸 Results**](#-results)
- [**🏗️ Tech Stack**](#️-tech-stack)
  - [**💻 Web Application**](#-web-application)
    - [**🔹 Frontend**](#-frontend)
    - [**🔹 Backend**](#-backend)
  - [**📱 Mobile Application**](#-mobile-application)
    - [**🔹 Frontend**](#-frontend-1)
    - [**🔹 Backend**](#-backend-1)
  - [**🧠 Models Integrated**](#-models-integrated)
    - [**🔹 Fused Stable Diffusion and ControlNet Model**](#-fused-stable-diffusion-and-controlnet-model)
    - [**🔹 Gemini with Matplotlib Model**](#-gemini-with-matplotlib-model)
    - [**🔹 Multi Stable Diffusion Models**](#-multi-stable-diffusion-models)
- [**📂 Project Structure**](#-project-structure)
  - [**🫚 Directory Tree**](#-directory-tree)
  - [**🔗 Links to Directories**](#-links-to-directories)
- [**🚀 Deployment Status**](#-deployment-status)
  - [**🔹 Frontend Deployment**](#-frontend-deployment)
- [**🚀 Installation & Setup**](#-installation--setup)
  - [**Clone the repository**](#clone-the-repository)
  - [**💻 For Web Application**](#-for-web-application)
    - [**🖥️ Frontend Setup**](#️-frontend-setup)
    - [**🧠 Backend Setup**](#-backend-setup)
    - [**🚀 Run Application**](#-run-application)
  - [**📱 For Mobile Application**](#-for-mobile-application)
    - [**🖥️ Frontend Setup**](#️-frontend-setup-1)
    - [**🧠 Backend Setup**](#-backend-setup-1)
    - [**🚀 Run Application**](#-run-application-1)
- [**🎥 How to Run the Web Application**](#-how-to-run-the-application)
- [**🎥 Demo Video**](#-demo-video)
- [**🎥 How to Run the Mobile Application**](#-how-to-run-the-application)
- [**🎥 Demo Video**](#-demo-video)
- [**👥 Contributors**](https://github.com/Jyotibrat/HackByte-3.0?tab=readme-ov-file#---contributors)
- [**📜 License**](#-license)
- [**🏆 Acknowledgment**](#-acknowledgment)
  
---
---

# 📸 Results

All the generated outputs from our models have been organized and stored systematically for easy access and review.

👉 To view the generated results from each model, head over to the [Results/](https://github.com/Jyotibrat/HackByte-3.0/tree/main/Results) directory under the mobile app folder.

You'll find subfolders for each model:

[**Stable Diffusion**](https://github.com/Jyotibrat/HackByte-3.0/tree/main/Results/Stable%20Diffusion) – Outputs from the fused Stable Diffusion + ControlNet model

[**Multi-Modal**](https://github.com/Jyotibrat/HackByte-3.0/tree/main/Results/Multi%20Modal) – Results from our multimodal model pipeline

[**Gemini with matplotlib**](https://github.com/Jyotibrat/HackByte-3.0/tree/main/Results/Gemini) – Outputs refined through the Gemini + Matplotlib model

Each folder contains sample prompts and corresponding visual results, demonstrating how each model interprets and responds to user inputs.

---
---

# 🌟 Features

✅ Generate floor plans using **Fused Stable Diffusion with ControlNet**, **Gemini with Matplotlib**, and **Multimodal Stable Diffusion** models.\
✅ Route and filter user prompts using a NLP filter made using **Gemini API**.\
✅ Built-in **model switcher** to select desired generator.\
✅ Tailored output generation based on **prompt engineering** and model-specific tuning.\
✅ Optimized for fast performance and extensibility.

---
---

# 🏗️ Tech Stack

## 💻 Web Application

### 🔹 Frontend

- **Javascript** - Core programming language
- **React.js + Vite** - Frontend framework
- **Tailwind CSS** - Styling library
- **React Icons** - UI enhancement

### 🔹 Backend

- **Python** - Core programming language
- **FastAPI / Flask** - Web framework
- **Gemini API** - Prompt filtering and refinement

## 📱 Mobile Application

### 🔹 Frontend

- **Typescript** - Core programming language
- **React Native** - Frontend framework
- **Lucide & React Icons** - UI enhancement

### 🔹 Backend

- **Python** - Core programming language
- **FastAPI / Flask** - Web framework
- **Gemini API** - Prompt filtering and refinement

## 🧠 Models Integrated

### 🔹 Fused Stable Diffusion and ControlNet Model

- Processes user inputs through a **specialized NLP filter** for image generation.
- Utilizes ***ControlNet*** for structured guidance of the image creation process.
- Implements ***Stable Diffusion*** for high-quality base image generation.
- Creates initial images based on filtered text prompts.
- Applies **secondary** ***ControlNet*** **processing** to enhance and refine generated images.
- Combines text-to-image generation with precise control mechanisms.
- Delivers final outputs with improved details and adherence to user specifications.
- Enables **advanced image manipulation** through a dual-phase approach.

### 🔹 Gemini with Matplotlib Model

- Processes user prompts through ***Google's Gemini model*** for data visualization tasks.
- Uses **prompt engineering** to generate **structured JSON output** from **natural language requests**.
- Converts **JSON data into Matplotlib visualization** code automatically.
- Generates **customized graphs** and charts based on user specifications.
- Produces high-quality visualization outputs without requiring manual coding.
- **Streamlines the data visualization workflow from natural language to final image**.

### 🔹 Multi Stable Diffusion Models

- Processes user prompts through a **specialized NLP filter** for improved understanding
- Employs a **multi-model architecture** to handle varied image generation needs
- Converts filtered prompts into a **standardized single prompt format**
- Simultaneously routes prompts to multiple image generation models including:
  - ***Stability AI's Stable Diffusion*** for high-quality general image creation
  - ***ZB-Tech Text-to-Image Generator*** for specialized visual outputs
  - ***CloudyAI Text-to-Image Generator*** for distinct stylistic approaches
  - ***Runwayml Stable Diffusion*** for alternative visual interpretations
- **Produces multiple output variations** from a single user prompt
- Enables comparison between different image generation techniques
- Provides users with **diverse visual interpretations** of the same concept
- Optimizes prompt handling for compatibility with all connected models

---
---

# 📂 Project Structure

## 🫚 Directory Tree

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
├───.gitattributes
│
├───src/
│   ├───main.jsx
│   ├───index.css
│   ├───App.jsx
│   ├───App.css
│   ├───services/
│   │   └───chatApiService.js
│   │   
│   ├───pages/
│   │   ├───StableDiffusionPage.jsx
│   │   ├───ResultsPage.jsx
│   │   ├───MidjourneyPage.jsx
│   │   ├───KnowMorePage.jsx
│   │   ├───HomePage.jsx
│   │   ├───DallEPage.jsx
│   │   ├───ContributorsPage.jsx
│   │   └───ChatPage.jsx
│   │
│   ├───components/
│   │   ├───Welcome.jsx
│   │   ├───PageTransition.jsx
│   │   ├───NavBar.jsx
│   │   ├───MessageList.jsx
│   │   ├───LoadingScreen.jsx
│   │   ├───ChatSidebar.jsx
│   │   └───ChatInput.jsx
│   │
│   └───assets/
│       └───react.svg
│
├───Results/
│   ├───Stable Diffusion/
│   │   ├───Result 5 stable diffusion.png
│   │   ├───Result 4 stable diffusion.png
│   │   ├───Result 3 stable diffusion.png
│   │   ├───Result 2 stable diffusion.png
│   │   └───Result 1 stable diffusion.png
│   │
│   ├───Multi Modal/
│   │   ├───Result 5 multi modal.png
│   │   ├───Result 4 multi modal.png
│   │   ├───Result 3 multi modal.png
│   │   ├───Result 2 multi modal.png
│   │   └───Result 1 multi modal.png
│   │
│   └───Gemini/
│       └───Result 1 gemini.png
│
├───public/
│   ├───LOGO-modified.png
│   ├───profilePhotos/
│   │   ├───bindupautra.jpg
│   │   ├───avinash.jpeg
│   │   └───arunim.jpg
│   │
│   ├───logos/
│   │   ├───stable diffusion and controlnet model logo.jpeg
│   │   ├───multi modal logo.jpeg
│   │   └───gemini matplotlib model logo.jpeg
│   │
│   └───ArchitectureImg/
│       ├───stable diffusion controlnet model architecture.jpg
│       ├───multi modal model architecture.jpg
│       └───Gemini matplotlib model architecture.jpg
│
├───Backend/
│   ├───app.py
│   ├───Readme.md
│   └───requirements.txt
│
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
│   │
│   ├───Gemini with Matplotlib Model/
│   │   └───dynamic_floor_planner_ipynb.ipynb
│   │
│   └───Fused Stable Diffusion with ControlNet Model/
│       └───ControlNet_Stable_Diffusion_wandb_(1) (1).ipynb
│
├───Mobile App/
│   ├───tsconfig.json
│   ├───package.json
│   ├───package-lock.json
│   ├───app.json
│   ├───.prettierrc
│   ├───.gitignore
│   ├───hooks/
│   │   └───useFrameworkReady.ts
│   │
│   ├───backend/
│   │   ├───requirements.txt
│   │   └───app.py
│   │
│   ├───assets/
│   │   └───images/
│   │       ├───icon.png
│   │       ├───favicon.png
│   │       ├───Results/
│   │       │   ├───Stable Diffusion/
│   │       │   │   └───Result 1 stable diffusion.png
│   │       │   │
│   │       │   ├───Multi Modal/
│   │       │   │   ├───Result 4 multi modal.png
│   │       │   │   ├───Result 3 multi modal.png
│   │       │   │   ├───Result 2 multi modal.png
│   │       │   │   └───Result 1 multi modal.png
│   │       │   │
│   │       │   └───Gemini/
│   │       │       └───Result 1 gemini.png
│   │       │
│   │       ├───Model Architectures/
│   │       │   ├───Stable Diffusion and ControlNet Architecture.jpg
│   │       │   ├───Multi Modal Architecture .jpg
│   │       │   └───Gemini with matplotlib model architecture.jpg
│   │       │
│   │       └───Contributors/
│   │           ├───Bindupautra Jyotibrat.jpg
│   │           ├───Avinash Kushwaha.jpeg
│   │           ├───Arunim Gogoi.png
│   │           └───Ansh Photo.jpg
│   │
│   └───app/
│       ├───_layout.tsx
│       ├───+not-found.tsx
│       └───(tabs)/
│           ├───results.tsx
│           ├───models.tsx
│           ├───index.tsx
│           ├───contributors.tsx
│           └───_layout.tsx
│
├───Assets/
│   ├───README.md
│   ├───Bindupautra Github Photo.png
│   ├───Arunim Github Photo.png
│   ├───Ansh Github Photo.png
│   └───AK.jpeg
│
└───.github/
     ├───README.md
     └───ISSUE_TEMPLATE/
         └───bug_report.md
```

## 🔗 Links to Directories

- [src/](https://github.com/Jyotibrat/HackByte-3.0/tree/main/src)
  - [services/](https://github.com/Jyotibrat/HackByte-3.0/tree/main/src/services)
  - [pages/](https://github.com/Jyotibrat/HackByte-3.0/tree/main/src/pages)
  - [components/](https://github.com/Jyotibrat/HackByte-3.0/tree/main/src/components)
  - [assets/](https://github.com/Jyotibrat/HackByte-3.0/tree/main/src/assets)
- [Results/](https://github.com/Jyotibrat/HackByte-3.0/tree/main/Results)
  - [Stable Diffusion/](https://github.com/Jyotibrat/HackByte-3.0/tree/main/Results/Stable%20Diffusion)
  - [Multi Modal/](https://github.com/Jyotibrat/HackByte-3.0/tree/main/Results/Multi%20Modal)
  - [Gemini/](https://github.com/Jyotibrat/HackByte-3.0/tree/main/Results/Gemini)
- [public/](https://github.com/Jyotibrat/HackByte-3.0/tree/main/public)
  - [profilePhotos/](https://github.com/Jyotibrat/HackByte-3.0/tree/main/public/profilePhotos)
  - [logos/](https://github.com/Jyotibrat/HackByte-3.0/tree/main/public/logos)
  - [ArchitectureImg/](https://github.com/Jyotibrat/HackByte-3.0/tree/main/public/ArchitectureImg)
- [backend/](https://github.com/Jyotibrat/HackByte-3.0/tree/main/backend)
- [Notebooks/](https://github.com/Jyotibrat/HackByte-3.0/tree/main/Notebooks)
  - [Multi-Modal/](https://github.com/Jyotibrat/HackByte-3.0/tree/main/Notebooks/Multi-Modal)
  - [Gemini with Matplotlib Model/](https://github.com/Jyotibrat/HackByte-3.0/tree/main/Notebooks/Gemini%20with%20Matplotlib%20Model)
  - [Fused Stable Diffusion with ControlNet Model/](https://github.com/Jyotibrat/HackByte-3.0/tree/main/Notebooks/Fused%20Stable%20Diffusion%20with%20ControlNet%20Model)
- [Mobile App/](https://github.com/Jyotibrat/HackByte-3.0/tree/main/Mobile%20App)
  - [hooks/](https://github.com/Jyotibrat/HackByte-3.0/tree/main/Mobile%20App/hooks)
  - [backend/](https://github.com/Jyotibrat/HackByte-3.0/tree/main/Mobile%20App/backend)
  - [assets/](https://github.com/Jyotibrat/HackByte-3.0/tree/main/Mobile%20App/assets/)
    - [images/](https://github.com/Jyotibrat/HackByte-3.0/tree/main/Mobile%20App/assets/images)
      - [Results/](https://github.com/Jyotibrat/HackByte-3.0/tree/main/Mobile%20App/assets/images/Results)
        - [Stable Diffusion/](https://github.com/Jyotibrat/HackByte-3.0/tree/main/Mobile%20App/assets/images/Results/Stable%20Diffusion)
        - [Multi Modal/](https://github.com/Jyotibrat/HackByte-3.0/tree/main/Mobile%20App/assets/images/Results/Multi%20Modal)
        - [Gemini/](https://github.com/Jyotibrat/HackByte-3.0/tree/main/Mobile%20App/assets/images/Results/Gemini)
      - [Model Architectures/](https://github.com/Jyotibrat/HackByte-3.0/tree/main/Mobile%20App/assets/images/Model%20Architectures)
      - [Contributors/](https://github.com/Jyotibrat/HackByte-3.0/tree/main/Mobile%20App/assets/images/Contributors)
  - [app/](https://github.com/Jyotibrat/HackByte-3.0/tree/main/Mobile%20App/app)
    - [(tabs)/](https://github.com/Jyotibrat/HackByte-3.0/tree/main/Mobile%20App/app/(tabs))
- [Assets/](https://github.com/Jyotibrat/HackByte-3.0/tree/main/Assets)
  - [Contributors/](https://github.com/Jyotibrat/HackByte-3.0/tree/main/Assets/Contributors)
- [.github/](https://github.com/Jyotibrat/HackByte-3.0/tree/main/.github)
  - [ISSUE_TEMPLATE/](https://github.com/Jyotibrat/HackByte-3.0/tree/main/.github/ISSUE_TEMPLATE)

---
---

# 🚀 Deployment Status

## 🔹 Frontend Deployment

👉 [**Live Frontend Preview**](https://hack-byte-3-0.vercel.app/)

⚠️ **Note**: Backend deployment is currently under development. Please follow the setup instructions below to run the full application locally.

---
---

# 🚀 Installation & Setup

## Clone the repository

```sh
git clone https://github.com/Jyotibrat/HackByte-3.0.git
```
## 💻 For Web Application

### 🖥️ Frontend Setup

- Install the required **Node Modules**.

```sh
npm install
```

- If **Node packages** require **funding**.

```sh
npm fund
```

- If there are any **Vulnerabilities**.

```sh
npm audit fix
```

- If the **Vulnerabilities** still not resolved.

```sh
npm audit fix --force
```

- Create a .env file and the following lines:

```env
VITE_BACKEND_URL = http://localhost:8000/api/generate
```

### 🧠 Backend Setup

- Move to the **`backend` Directory**.

```sh
cd backend
```

- Create a **Virtual Environment**.

```sh
python -m venv env
```

- Activate the **Virtual Environment**.

```sh
env\Scripts\activate
```

- **Download the required packages** for the Backend.

```sh
pip install -r requirements.txt
```

- Generate a **GEMINI 1.5-flash API** from [**Google AI Studio**](https://aistudio.google.com/).

- Sign in with your [**Google Account**](https://myaccount.google.com/).

- On the **NavBar** on the top click on **`Get API key` button**.

- In the next page, click on **`Create API key` button** on the right side.

- After the key has been generated **copy it**.

- Now, Create a .env file in the **`backend` Directory** add the following lines:

```env
GEMINI_API_KEY=REPLACE_WITH_YOUR_API_KEY
PORT=5000
DEBUG=True
```

- Move to the **`Notebooks` Directory**.

```sh
cd Notebooks
```

- Move to the **`Gemini with Matplotlib Model` Directory**.

```sh
cd "Gemini with Matplotlib Model"
```

- Go to [**Google Colab**](https://colab.research.google.com/) and Click on Upload button.

- Upload the Notebook **`dynamic_floor_planner_ipynb.ipynb` on Google Colab**.

- Add the **GEMINI 1.5-flash API** that was generated earlier here:

```python
genai.configure(api_key="PASTE GEMINI API HERE")
```

- Go to [**ngrok**](https://ngrok.com/) and sign up.

- On the left side, click on the **`Your Authtoken`** button.

- **Copy the Authtoken** and paste it here in the Notebook:

```python
ngrok.set_auth_token("YOUR_GENERATED_AUTHTOKEN")
```

- **Run the cells of the Notebook in top to bottom manner.**

- After the running of the cells in the Notebook is completed, a **ngrok url will be generated**.

- The ngrok url would look like this:

```
"https://4539-35-245-46-130.ngrok-free.app"
```

- Copy the url and paste it in **`app.py`** in the **`backend` Directory** like this:

```python
"floor_gpt": {
        "name": "floor_gpt",
        "urls": ["PASTE_THE_URL_HERE"]
    }
```

- For **running the second model**, move to **`Fused Stable Diffusion with ControlNet Model`** in the **`Notebooks` Directory**.

```sh
cd Notebooks
cd "Fused Stable Diffusion with ControlNet Model"
```

- Upload the Notebook **`ControlNet_Stable_Diffusion_wandb API.ipynb`** on [**Google Colab**](https://colab.research.google.com/).

- On the Navbar, click the **`Runtime` button**.

- From the drop down menu, click the **`Change runtime type` button**.

- From the options, select the **`T4 GPU`** and click on **`Save` button**.

- **Run the cells of the Notebook in top to bottom manner.**

- After the running of the cells in the Notebook is completed, a **ngrok url will be generated**.

- The ngrok url would look like this:

```
"https://4539-35-245-46-130.ngrok-free.app"
```

- Copy the url and paste it in **`app.py`** in the **`backend` Directory** like this:

```python
"stable_diffusion": {
        "name": "stable_diffusion",
        "urls": ["https://2a16-34-125-2-19.ngrok-free.app/"]
    },
```

- For running the second model, move to **`Multi-Modal`** in the **`Notebooks` Directory**.

```sh
cd Notebooks
cd "Multi-Modal"
```

- Upload the Notebooks **`Cloudqi_Text_to_Image_Model_API.ipynb`**, **`Runwayml_Stable_Diffusion_Model_API.ipynb`**, **`Stability_AI_Stable_Diffusion_Model_API.ipynb`** and **`ZB_Tech_Text_to_Image_Generator_API.ipynb`** on [**Google Colab**](https://colab.research.google.com/)

**⚠️ Important: Upload each notebook using a different Google account to get free GPU access per notebook (one GPU per account on the free tier).
If you have Google Colab Pro or Premium, you can ignore this step.**

- **In each Notebook**:

  - On the Navbar, click the **`Runtime` button**.

  - From the drop-down menu, click the **`Change runtime type` button**.

  - From the options, select the **`T4 GPU`** and click on **`Save` button**.

  - Run the cells of the Notebook in top to bottom manner.

  - After the running of the cells in the Notebook is completed, a **ngrok url will be generated**.

  - The ngrok url would look like this:

  ```
  "https://4539-35-245-46-130.ngrok-free.app"
  ```

  - After the url has been generated, run the **`second last cell`**.

- Copy the urls and paste it in **`app.py`** in the **`backend` Directory** like this:

```python
"multi_modal": {
        "name": "multi_modal",
        "urls": [
            "https://2a16-34-125-2-19.ngrok-free.app/",
            "https://2127-34-16-255-178.ngrok-free.app/",
            "https://third-ngrok-url.ngrok-free.app/",
            "https://fourth-ngrok-url.ngrok-free.app/"
        ]
    },
```

### 🚀 Run Application

- Go to the **`root` Directory** and run the command:

```sh
npm run dev
```

- Open your browser and **navigate to `http://localhost:5173` to see the application**.

- Go to **`backend` Directory** and make sure the **Virtual Environment is activate**.

```sh
cd backend
env\Scripts\activate
```

- To **run the Backend Server**, run the command:

```sh
python app.py
```

***✅ The Web Application is running successfully.***

## 📱 For Mobile Application

- Go to the `Mobile App` Directory.

```sh
cd "Mobile App"
```

### 🖥️ Frontend Setup

- Install the **required Node Modules**.

```sh
npm install
```

- If **Node packages require funding**.

```sh
npm fund
```

- If there are any **Vulnerabilities**.

```sh
npm audit fix
```

- If the **Vulnerabilities still not resolved**.

```sh
npm audit fix --force
```

- Go to the **`app` Directory** and then to **`(tabs)` Directory**.

```sh
cd "app/(tabs)"
```

- Open the **file `index.tsx`**.

- In the file, **add the ngrok URL that exposes the http://127.0.0.1:5000/ port of the Flask backend**.

```typescript
const API_URL = 'PASTE_THE_URL_HERE';
```

### 🧠 Backend Setup

- Move to the **`backend` Directory**.

```sh
cd backend
```

- **Create a Virtual Environment**.

```sh
python -m venv env
```

- **Activate the Virtual Environment**.

```sh
env\Scripts\activate
```

- **Download the required packages** for the Backend.

```sh
pip install -r requirements.txt
```

- **Generate a GEMINI 1.5-flash API** from [**Google AI Studio**](https://aistudio.google.com/)

- Sign in with your **[Google Account**](https://myaccount.google.com/).

- On the NavBar on the top click on **`Get API key` button**.

- In the next page, click on **`Create API key` button** on the right side.

` After the key has been generated copy it.

- Now, **Create a .env file in the `backend` Directory** add the following lines:

```env
GEMINI_API_KEY=REPLACE_WITH_YOUR_API_KEY
PORT=5000
DEBUG=True
```

- Move to the **`Notebooks` Directory**.

```sh
cd Notebooks
```

- Move to the **`Gemini with Matplotlib Model` Directory**.

```sh
cd "Gemini with Matplotlib Model"
```

- Go to [**Google Colab**](https://colab.research.google.com/) and Click on Upload button.

- Upload the Notebook **`dynamic_floor_planner_ipynb.ipynb`** on **Google Colab**.

- **Add the GEMINI 1.5-flash API** that was generated earlier here:

```python
genai.configure(api_key="PASTE GEMINI API HERE")
```

- Go to [**ngrok**](https://ngrok.com/) and sign up.

- On the left side, click on the **`Your Authtoken` button**.

- **Copy the Authtoken and paste it** here in the Notebook:

```python
ngrok.set_auth_token("YOUR_GENERATED_AUTHTOKEN")
```

- **Run the cells of the Notebook in top to bottom manner.**

- After the running of the cells in the Notebook is completed, a **ngrok url will be generated.**

- The ngrok url would look like this:

```
"https://4539-35-245-46-130.ngrok-free.app"
```

- **Copy the url and paste it in `app.py`** in the **`backend` Directory** like this:

```python
"floor_gpt": {
        "name": "floor_gpt",
        "urls": ["PASTE_THE_URL_HERE"]
    }
```

- For running the second model, **move to `Fused Stable Diffusion with ControlNet Model` in the `Notebooks` Directory**.

```sh
cd Notebooks
cd "Fused Stable Diffusion with ControlNet Model"
```

- Upload the Notebook **`ControlNet_Stable_Diffusion_wandb API.ipynb`** on [**Google Colab**](https://colab.research.google.com/)

- On the Navbar, click the **`Runtime` button**.

- From the drop down menu, **click the `Change runtime type` button**.

- From the options, **select the `T4 GPU` and click on `Save` button**.

- **Run the cells of the Notebook in top to bottom manner.**

- After the running of the cells in the Notebook is completed, a **ngrok url will be generated**.

- The ngrok url would look like this:

```
"https://4539-35-245-46-130.ngrok-free.app"
```

- **Copy the url and paste it in `app.py` in the `backend` Directory** like this:

```python
"stable_diffusion": {
        "name": "stable_diffusion",
        "urls": ["https://2a16-34-125-2-19.ngrok-free.app/"]
    },
```

- For running the second model, **move to `Multi-Modal` in the `Notebooks` Directory**.

```sh
cd Notebooks
cd "Multi-Modal"
```

- Upload the Notebooks `Cloudqi_Text_to_Image_Model_API.ipynb`, `Runwayml_Stable_Diffusion_Model_API.ipynb`, `Stability_AI_Stable_Diffusion_Model_API.ipynb` and `ZB_Tech_Text_to_Image_Generator_API.ipynb` on [Google Colab](https://colab.research.google.com/)

**⚠️ Important: Upload each notebook using a different Google account to get free GPU access per notebook (one GPU per account on the free tier).
If you have Google Colab Pro or Premium, you can ignore this step.**

- **In each Notebook**:

  - On the Navbar, **click the `Runtime` button**.

  - From the drop-down menu, **click the `Change runtime type` button**.

  - From the options, **select the `T4 GPU` and click on `Save` button**.

  - **Run the cells of the Notebook in top to bottom manner.**

  - After the running of the cells in the Notebook is completed, a **ngrok url will be generated**.

  - The ngrok url would look like this:

  ```
  "https://4539-35-245-46-130.ngrok-free.app"
  ```

  - After the url has been generated, **run the `second last cell`**.

- **Copy the urls and paste it in `app.py`** in the **`backend` Directory** like this:

```python
"multi_modal": {
        "name": "multi_modal",
        "urls": [
            "https://2a16-34-125-2-19.ngrok-free.app/",
            "https://2127-34-16-255-178.ngrok-free.app/",
            "https://third-ngrok-url.ngrok-free.app/",
            "https://fourth-ngrok-url.ngrok-free.app/"
        ]
    },
```
- **Download the ngrok application** on your local device:

  - **Windows** → [Download for Windows](https://ngrok.com/downloads/windows)
  - **Linux** → [Download for Linux](https://ngrok.com/downloads/linux)
  - **macOS** → [Download for macOS](https://ngrok.com/downloads/mac-os)

- **Extract the downloaded zip file** to a directory of your choice.

- **Start the ngrok application** and provide the necessary permissions.

### 🚀 Run Application

- Go to the **`Mobile App` Directory** and run the command:

```sh
npx expo start
```

- Open your browser and **navigate to `http://localhost:8081` to see the application**.

- **Download the** [**Expo Go Mobile App**](https://play.google.com/store/apps/details?id=host.exp.exponent).

- In the app, there will be 2 options:
  
  - **`Enter URL manually`** where you can enter the url generated in the terminal when the frontend server starts.

  ```sh
  exp://172.25.221.187:8081
  ``` 

  - **`Scan QR code`** where you can scan the QR code generated in the terminal when the frontend server starts.

- Now, the **app starts building in the mobile**.

- Go to **`backend` Directory** and make sure the **Virtual Environment is activate**.

```sh
cd backend
env\Scripts\activate
```

- To **run the Backend Server**, run the command:

```sh
python app.py
```

- When the **ngrok application** starts it starts in the command line where we need to run the following command to expose the running Flask Backend server:

```sh
ngrok http 5000
```

- This will generate a ngrok url like this:

```sh
ngrok                                                                                                   (Ctrl+C to quit)                                                                                                                        �  Route traffic by anything: https://ngrok.com/r/iep                                                                                                                                                                                           Session Status                online                                                                                    Account                       YOUR_NAME (Plan: Free)                                                        Update                        update available (version 3.22.1, Ctrl-U to update)                                       Version                       3.22.0                                                                                    Region                        India (in)                                                                                Latency                       710ms                                                                                     Web Interface                 http://127.0.0.1:4040                                                                     Forwarding                    https://218a-139-167-143-182.ngrok-free.app -> http://localhost:5000                                                                                                                                              Connections                   ttl     opn     rt1     rt5     p50     p90                                                                             0       0       0.00    0.00    0.00    0.00
```

- **Copy the url and paste it** here in the **`index.tsx`**: 

```typescript
const API_URL = 'PASTE_THE_URL_HERE';
```

***✅ The Mobile Application is running successfully.***

---
---

<h2 align="center">
  👥 Contributors
</h2>

<p align="center">
  This project was made possible by the contributions of these amazing individuals:
</p>

<div align="center">
  <a href="https://github.com/Arunim-Gogoi">
    <img src="../Assets/Contributors/Arunim Gogoi.png" alt="Arunim Gogoi" style="border-radius: 50%; margin: 5px; width: 100px; height: 100px;">
  </a>
  <a href="https://github.com/Lucifer-here">
    <img src="../Assets/Contributors/Ansh.png" alt="Ansh Gaur" style="border-radius: 50%; margin: 5px; width: 100px; height: 100px;">
  </a>
  <a href="https://github.com/AvinashK47">
    <img src="../Assets/Contributors/AK.png" alt="Avinash Kushwaha" style="border-radius: 50%; margin: 5px; width: 100px; height: 100px;">
  </a>
  <a href="https://github.com/Jyotibrat">
    <img src="../Assets/Contributors/Bindupautra Github Photo.png" alt="Bindupautra Jyotibrat" style="border-radius: 50%; margin: 5px; width: 100px; height: 100px;">
  </a>
</div>

---
---

# 📜 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---
---

# 🏆 Acknowledgment

This project is part of **HackByte 3.0** conducted by **IIITDM Jabalpur**.
