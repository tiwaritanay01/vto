# 👕 ShineOn: Virtual Try-On (VTO) E-Commerce Platform

A state-of-the-art virtual try-on system integrated into a high-fidelity e-commerce dashboard. This project allows users to see items (headphones, shoes, makeup, etc.) overlaid on their real-time camera feed or captured snapshots.

---

## 🌟 Features
-   **Live Camera Preview**: Seamless integration with user webcams for real-time face and body alignment guides.
-   **Multi-Category Support**: Specialized try-on modules for:
    -   💄 Makeup (Lipstick/Face)
    -   🎧 Earbuds & Headphones
    -   👟 Shoes (with foot alignment guide)
    -   👓 Glasses & Hats
-   **Instant Snapshot**: Capture your look and see the product synthesized on your photo.
-   **Modern UI/UX**: Amazon-inspired, responsive dashboard with interactive product carousels and detailed design briefs.
-   **High-Speed Bridge**: Lightweight Node.js/Python API for fast image processing and compositing.

---

## 🚀 Getting Started

### 1. Prerequisites
-   **Node.js** (v18+)
-   **Python** (3.9+)
-   **npm** or **pnpm**

### 2. Installation
Clone the repository and install dependencies in both the frontend and backend folders.

#### **Frontend**
```bash
cd "vto frontend"
npm install
```

#### **Backend Bridge**
```bash
cd "vto backend/ShineOn-Virtual-Tryon/api"
npm install
```

### 3. Running the App
You need two terminals for both services:

-   **Term 1 (Backend)**: `cd "vto backend/ShineOn-Virtual-Tryon/api" && npm start`
-   **Term 2 (Frontend)**: `cd "vto frontend" && npm run dev`

Open your browser at **[http://localhost:5173](http://localhost:5173)**.

---

## 🧠 Tech Stack
-   **Frontend**: React, Vite, Framer Motion, Lucide Icons, Tailwind CSS.
-   **Backend**: Node.js (Express) or Python (FastAPI), Sharp/PIL for image compositing.
-   **Research Core**: PyTorch-based ShineOn VTO architecture.

---

## 📜 Credits & Attributions
The backend core and research architecture are based on the **ShineOn Virtual Try-on** project:
-   **Original Repository**: [andrewjong/ShineOn-Virtual-Tryon](https://github.com/andrewjong/ShineOn-Virtual-Tryon.git) (Archived research project).
-   **Original Paper**: [ShineOn: Illuminating Design Choices for Practical Video-based Virtual Clothing Try-on](https://arxiv.org/abs/2012.10495).

---

## ⚖️ License
This project is for demonstration and research purposes. Please refer to the original repository for licensing details regarding the ShineOn model.
