# 🚀 Vercel Deployment Guide: ShineOn VTO

This project is optimized for deployment on **Vercel** as a high-performance monorepo with a React frontend and a Python serverless backend.

## 📦 Project Architecture
- **Frontend**: React + Vite (located in `/vto frontend`)
- **Backend**: FastAPI Serverless (located in `/api/vto/tryon.py`)
- **Models**: Face-API models are pre-loaded in `/vto frontend/public/models` for zero-latency initialization.

---

## 🛠️ One-Click Deployment

1. **Push your code to GitHub/GitLab/Bitbucket.**
2. **Import the project in Vercel.**
3. **Vercel will detect `vercel.json` automatically.**
4. **Configuration Check:**
   - **Framework Preset**: None (Vercel will use `vercel.json`).
   - **Root Directory**: `./` (The repository root).
   - **Build Command**: `cd "vto frontend" && npm run build` (Handled by `vercel.json`).
   - **Output Directory**: `vto frontend/dist`.

---

## 🧪 Local Hybrid Development

You can run both the frontend and backend locally with a unified experience.

### 1. Start the Backend
```bash
# From the root directory
export PYTHONPATH=$PYTHONPATH:. 
python api/vto/tryon.py
```
*Wait for: "VTO OpenCV API running on 8000"*

### 2. Start the Frontend
```bash
cd "vto frontend"
npm install
npm run dev
```
*Wait for: "Vite dev server running..."*

**Note**: The Vite config is pre-configured with a **server proxy**. All calls to `/api/*` will automatically route to your local Python backend on port 8000.

---

## ☁️ Why this "Hybrid Monorepo" approach?
The user requested a "bucket deployment way". On Vercel, this is best achieved by:
1. **Bundling static models** into the frontend build (instead of fetching them from GitHub at runtime).
2. **Using Serverless Functions** for the heavy lifting (OpenCV/FastAPI) to avoid cold starts and scale effortlessly.
3. **Automatic Routing** via `vercel.json` ensures you never have CORS issues between your frontend and backend in production.

## ⚙️ Optimization Notes
- **Python Runtime**: Uses `@vercel/python@4.5.0` for maximum compatibility.
- **Image Processing**: Uses `opencv-python-headless` (optimized for serverless environments without GUI libraries).
- **Face Tracking**: Pre-initialized TinyFaceDetector for real-time performance.
