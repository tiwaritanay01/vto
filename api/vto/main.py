import os
from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
from api.vto.tryon import router as tryon_router

app = FastAPI()

# Enable CORS for Railway domains
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Search extensively for the built frontend
possible_paths = [
    os.path.join(os.getcwd(), "vto-frontend", "dist"),
    os.path.join(os.getcwd(), "dist"),
    os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(__file__))), "vto-frontend", "dist")
]

dist_path = None
for p in possible_paths:
    if os.path.exists(p):
        dist_path = p
        break

if dist_path:
    app.mount("/", StaticFiles(directory=dist_path, html=True), name="static")

@app.get("/")
async def root():
    if dist_path:
        return {"status": "Frontend mounted at " + dist_path}
    return {
        "status": "VTO Backend Running (Finding Frontend...)",
        "current_directory": os.getcwd(),
        "files_in_dir": os.listdir(os.getcwd()) if os.path.exists(os.getcwd()) else "empty",
        "search_history": [str(p) for p in possible_paths]
    }

# Include the Try-On API
app.include_router(tryon_router, prefix="/api/vto")
