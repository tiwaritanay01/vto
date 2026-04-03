import os
from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
from api.vto.tryon import app as tryon_app

app = FastAPI()

# Enable CORS for Railway domains
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include the Try-On API
app.include_router(tryon_app.router, prefix="/api")

# Serve the React Frontend (after building to 'vto-frontend/dist')
# In Railway, we'll build the frontend first.
dist_path = os.path.join(os.getcwd(), "vto-frontend", "dist")
if os.path.exists(dist_path):
    app.mount("/", StaticFiles(directory=dist_path, html=True), name="static")
else:
    @app.get("/")
    async def root():
        return {"status": "VTO Backend Running (Frontend Dist not found)"}
