Face-api.js models

This project expects face-api.js models to be served from `public/models` (available at runtime as `/models`).

Quick install (download models into `vto frontend/public/models`):

Using curl:

```bash
cd "c:\dev\vto\vto frontend\public\models"
curl -O https://raw.githubusercontent.com/justadudewhohacks/face-api.js/master/weights/tiny_face_detector_model-weights_manifest.json
curl -O https://raw.githubusercontent.com/justadudewhohacks/face-api.js/master/weights/tiny_face_detector_model-shard1
curl -O https://raw.githubusercontent.com/justadudewhohacks/face-api.js/master/weights/face_landmark_68_tiny_model-weights_manifest.json
curl -O https://raw.githubusercontent.com/justadudewhohacks/face-api.js/master/weights/face_landmark_68_tiny_model-shard1
```

Or download the entire `models` folder from the face-api.js repo and place it in `public/models`.

Note: If you prefer, I can add a small script to fetch these models automatically during `npm install`.
