from fastapi import FastAPI, File, UploadFile, Form, Response
from fastapi.middleware.cors import CORSMiddleware
from io import BytesIO
from PIL import Image
import requests
import json

app = FastAPI(title="ShineOn Lightweight VTO API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def fetch_image(url: str) -> Image.Image:
    """Fetch image from URL synchronously."""
    resp = requests.get(url, timeout=10)
    resp.raise_for_status()
    return Image.open(BytesIO(resp.content)).convert("RGBA")

@app.post("/api/vto/tryon")
async def tryon(
    person: UploadFile = File(...), 
    product_url: str = Form(...),
    # Optional alignment data from client-side tracking
    alignment: str = Form(None) 
):
    """
    Lightweight VTO: Uses Pillow only (no OpenCV/Numpy) to stay under Vercel's 250MB limit.
    Highly accurate when 'alignment' data is provided by the frontend face-tracker.
    """
    try:
        person_bytes = await person.read()
        person_img = Image.open(BytesIO(person_bytes)).convert("RGBA")
        pw, ph = person_img.size
        
        # Handle mirrored captures
        mirrored = False
        if product_url.endswith('::mirrored'):
            product_url = product_url.replace('::mirrored', '')
            mirrored = True
        
        if mirrored:
            person_img = person_img.transpose(Image.FLIP_LEFT_RIGHT)
        
        product_img = fetch_image(product_url).convert("RGBA")
        
        # Determine product placement
        if alignment:
            try:
                data = json.loads(alignment)
                # Client sends normalized or absolute coordinates
                # For this setup, we expect absolute coordinates (x, y, w, h)
                x = int(data.get('x', 0))
                y = int(data.get('y', 0))
                target_w = int(data.get('w', pw * 0.5))
                
                # Resize product
                aspect = product_img.width / product_img.height
                target_h = int(target_w / aspect)
                product_res = product_img.resize((target_w, target_h), Image.LANCZOS)
                
                # Paste onto person
                person_img.paste(product_res, (x, y), product_res)
            except Exception as e:
                print(f"Alignment error: {e}")
                # Fallback to simple composite
                person_img = simple_composite(person_img, product_img)
        else:
            person_img = simple_composite(person_img, product_img)
            
        buf = BytesIO()
        person_img.convert("RGB").save(buf, format="PNG")
        buf.seek(0)
        return Response(content=buf.getvalue(), media_type="image/png")
        
    except Exception as e:
        print(f"Error in serverless VTO: {e}")
        return Response(content=person_bytes, media_type="image/png")

def simple_composite(person_img: Image.Image, product_img: Image.Image) -> Image.Image:
    """Fallback positioning (centered, 28% down)."""
    pw, ph = person_img.size
    target_w = int(pw * 0.55)
    product_ratio = product_img.width / product_img.height
    target_h = int(target_w / product_ratio)
    product = product_img.resize((target_w, target_h), Image.LANCZOS)
    
    x = (pw - target_w) // 2
    y = int(ph * 0.28)
    
    person_img.paste(product, (x, y), product)
    return person_img

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
