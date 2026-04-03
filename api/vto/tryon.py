import cv2
import numpy as np
from fastapi import FastAPI, File, UploadFile, Form, Response
from fastapi.middleware.cors import CORSMiddleware
from io import BytesIO
from PIL import Image
import requests
import os

app = FastAPI(title="ShineOn OpenCV VTO API")

# Enable CORS for Vercel deployment
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load Haar Cascades from OpenCV's data
# In Vercel serverless, these XML files are included with opencv-python-headless
face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')

def fetch_image(url: str) -> Image.Image:
    """Fetch image from URL synchronously to match serverless execution."""
    resp = requests.get(url, timeout=10)
    resp.raise_for_status()
    return Image.open(BytesIO(resp.content)).convert("RGBA")

def get_smart_composite(person_img: Image.Image, product_img: Image.Image, is_headphones: bool = False) -> Image.Image:
    """Face-aware compositing using OpenCV."""
    # Convert PIL to OpenCV (BGR)
    cv_img = cv2.cvtColor(np.array(person_img.convert("RGB")), cv2.COLOR_RGB2BGR)
    gray = cv2.cvtColor(cv_img, cv2.COLOR_BGR2GRAY)
    
    # Detect faces
    faces = face_cascade.detectMultiScale(gray, 1.3, 5)
    
    if len(faces) == 0:
        return simple_composite(person_img, product_img)

    # Use the largest face
    (x, y, w, h) = sorted(faces, key=lambda f: f[2]*f[3], reverse=True)[0]
    
    if is_headphones:
        # Positioning for headphones: Headphone width should be ~1.25x face width
        target_w = int(w * 1.25)
        product_pil = product_img.convert("RGBA")
        aspect = product_pil.width / product_pil.height
        target_h = int(target_w / aspect)
        
        # Resize headphones
        product_res = product_pil.resize((target_w, target_h), Image.LANCZOS)
        
        # Position: Center on face, shift up slightly
        h_x = x - (target_w - w) // 2
        h_y = y - int(target_h * 0.4) 
        
        canvas = person_img.convert("RGBA").copy()
        canvas.paste(product_res, (h_x, h_y), product_res)
        return canvas.convert("RGB")
    
    return simple_composite(person_img, product_img)

def simple_composite(person_img: Image.Image, product_img: Image.Image) -> Image.Image:
    """Fallback positioning."""
    person = person_img.convert("RGBA")
    pw, ph = person.size
    target_w = int(pw * 0.55)
    product_ratio = product_img.width / product_img.height
    target_h = int(target_w / product_ratio)
    product = product_img.convert("RGBA").resize((target_w, target_h), Image.LANCZOS)
    
    x = (pw - target_w) // 2
    y = int(ph * 0.28)
    
    canvas = Image.new("RGBA", person.size)
    canvas.paste(person, (0, 0))
    canvas.paste(product, (x, y), product)
    return canvas.convert("RGB")

@app.post("/api/vto/tryon")
async def tryon(person: UploadFile = File(...), product_url: str = Form(...)):
    """The main VTO entry point for Vercel deployment."""
    try:
        person_bytes = await person.read()
        person_img = Image.open(BytesIO(person_bytes)).convert("RGBA")
        
        # Handle mirrored captures
        mirrored = False
        if product_url.endswith('::mirrored'):
            product_url = product_url.replace('::mirrored', '')
            mirrored = True
        
        if mirrored:
            person_img = person_img.transpose(Image.FLIP_LEFT_RIGHT)
        
        # Heuristic for product type
        is_headphones = any(k in product_url.lower() for k in ['sony', 'headphone'])
        
        product_img = fetch_image(product_url)
        out = get_smart_composite(person_img, product_img, is_headphones)
        
        buf = BytesIO()
        out.save(buf, format="PNG")
        buf.seek(0)
        return Response(content=buf.getvalue(), media_type="image/png")
    except Exception as e:
        print(f"Error in serverless VTO: {e}")
        # On error, try to return some image at least
        return Response(content=person_bytes, media_type="image/png")

# For local testing
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
