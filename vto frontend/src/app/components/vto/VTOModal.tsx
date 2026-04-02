import { useState, useEffect, useRef, useCallback } from "react";
import overlayPresets from './overlayPresets.json';
import { X, HelpCircle, ShoppingCart, RotateCcw, Layers, Share2, Check, Sparkles } from "lucide-react";
import { type VTOType, type TrackingState, type CameraState, type VTOVariant, VTO_VARIANTS } from "./types";
import { TrackingStatusIndicator } from "./TrackingStatusIndicator";
import { AlignmentOverlay } from "./AlignmentOverlay";
import { VariantCarousel } from "./VariantCarousel";
import { CaptureButton } from "./CaptureButton";

interface VTOProduct {
  id: number;
  name: string;
  brand: string;
  price: number;
  image: string;
  vtoType: VTOType;
}

interface VTOModalProps {
  product: VTOProduct;
  onClose: () => void;
  onAddToCart: (variant: VTOVariant) => void;
}

const TRACKING_SEQUENCE: { state: TrackingState; duration: number }[] = [
  { state: 'searching', duration: 2200 },
  { state: 'move-closer', duration: 1400 },
  { state: 'detected', duration: 0 },
];

// Simulated camera background (animated gradient canvas)
function SimulatedCamera({ active }: { active: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const frameRef = useRef(0);

  useEffect(() => {
    if (!active) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const draw = () => {
      const { width, height } = canvas;
      frameRef.current++;
      const f = frameRef.current;

      // Dark base
      ctx.fillStyle = '#0A0E12';
      ctx.fillRect(0, 0, width, height);

      // Subtle ambient light simulation
      const cx = width / 2 + Math.sin(f * 0.008) * 30;
      const cy = height * 0.38 + Math.cos(f * 0.006) * 20;
      const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, width * 0.65);
      grad.addColorStop(0, 'rgba(60,80,100,0.25)');
      grad.addColorStop(0.5, 'rgba(30,40,55,0.15)');
      grad.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      // Subtle noise-like grain
      if (f % 3 === 0) {
        for (let i = 0; i < 120; i++) {
          const x = Math.random() * width;
          const y = Math.random() * height;
          const alpha = Math.random() * 0.04;
          ctx.fillStyle = `rgba(255,255,255,${alpha})`;
          ctx.fillRect(x, y, 1, 1);
        }
      }

      animRef.current = requestAnimationFrame(draw);
    };

    animRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(animRef.current);
  }, [active]);

  return (
    <canvas
      ref={canvasRef}
      width={390}
      height={560}
      className="absolute inset-0 w-full h-full"
      style={{ objectFit: 'cover' }}
    />
  );
}

// Person silhouette for no-camera state
function PersonSilhouette() {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none" style={{ paddingBottom: '15%' }}>
      <svg width="170" height="230" viewBox="0 0 170 230" fill="none" xmlns="http://www.w3.org/2000/svg" opacity="0.12">
        {/* Head */}
        <ellipse cx="85" cy="65" rx="45" ry="55" fill="white" />
        {/* Neck */}
        <rect x="68" y="112" width="34" height="28" rx="4" fill="white" />
        {/* Shoulders / body */}
        <path d="M20 160 C20 140 45 130 68 138 C72 140 76 141 85 141 C94 141 98 140 102 138 C125 130 150 140 150 160 L150 230 L20 230 Z" fill="white" />
      </svg>
    </div>
  );
}

export function VTOModal({ product, onClose, onAddToCart }: VTOModalProps) {
  const variants = VTO_VARIANTS[product.vtoType];
  const [selectedVariant, setSelectedVariant] = useState<VTOVariant>(variants[0]);
  const [trackingState, setTrackingState] = useState<TrackingState>('searching');
  const [cameraState, setCameraState] = useState<CameraState>('loading');
  const [showOverlay, setShowOverlay] = useState(true);
  const [compareMode, setCompareMode] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const [flashActive, setFlashActive] = useState(false);
  const [captured, setCaptured] = useState(false);
  const [loadingCountdown, setLoadingCountdown] = useState(5);
  const [vtoResultUrl, setVtoResultUrl] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const [helpOpen, setHelpOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isInitializingRef = useRef(false);
  const modelsLoadedRef = useRef(false);
  const detectionRef = useRef<any | null>(null);
  const productImgRef = useRef<HTMLImageElement | null>(null);
  const faceapiRef = useRef<any | null>(null);
  const [adjustOpen, setAdjustOpen] = useState(false);
  const [runtimePresets, setRuntimePresets] = useState<Record<string, { wMul: number; yOffsetMul: number; yAdjust: number }>>(() => {
    try {
      const raw = localStorage.getItem('vto_overlay_presets');
      if (raw) return JSON.parse(raw);
    } catch {}
    return overlayPresets as any;
  });
  const trackingTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [cameraInitKey, setCameraInitKey] = useState(0);
  const [permissionState, setPermissionState] = useState<string | null>(null);
  const [lastError, setLastError] = useState<string | null>(null);
  const [debugOpen, setDebugOpen] = useState(false);
  const [debugInfo, setDebugInfo] = useState<{ readyState: number; width: number; height: number; tracks: number; hasStream: boolean }>({ readyState: 0, width: 0, height: 0, tracks: 0, hasStream: false });

  // Show toast helper
  const showToast = useCallback((msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2500);
  }, []);

  // Init camera
  useEffect(() => {
    let cancelled = false;
    let stream: MediaStream | null = null;
    setCameraState('loading');

    // Safety timeout: if camera doesn't respond in 5s, fall back to simulated mode
    const safetyTimer = setTimeout(() => {
      if (!cancelled) {
        console.warn('Camera init timed out — falling back to simulated mode');
        setCameraState('simulated');
      }
    }, 6000);

    // Countdown for UI feedback
    const countdownInterval = setInterval(() => {
      setLoadingCountdown(prev => Math.max(0, prev - 1));
    }, 1000);

    const queryPermission = async () => {
      try {
        // permissions API may not support 'camera' in all browsers
        // fall back to 'prompt' if unsupported
        // @ts-ignore
        if (navigator.permissions && (navigator.permissions as any).query) {
          // @ts-ignore
          const p = await (navigator.permissions as any).query({ name: 'camera' });
          setPermissionState(p.state);
          console.debug('[VTO] permission state:', p.state);
        } else {
          setPermissionState(null);
        }
      } catch (e) {
        setPermissionState(null);
      }
    };

    const init = async () => {
      // prevent concurrent inits
      if (isInitializingRef.current) return;
      isInitializingRef.current = true;
      await queryPermission();
      if (!navigator.mediaDevices?.getUserMedia) {
        clearTimeout(safetyTimer);
        if (!cancelled) setCameraState('simulated');
        isInitializingRef.current = false;
        return;
      }
      try {
        // If an existing stream is present, stop it before requesting a new one
        if (streamRef.current) {
          try { streamRef.current.getTracks().forEach(t => t.stop()); } catch {}
          streamRef.current = null;
          if (videoRef.current) videoRef.current.srcObject = null;
        }
        console.debug('[VTO] requesting getUserMedia()');
        setLastError(null);
        stream = await navigator.mediaDevices.getUserMedia({
          video: { 
            facingMode: 'user', 
            width: { ideal: 640 }, 
            height: { ideal: 800 } 
          },
        });

        clearTimeout(safetyTimer);
        if (cancelled) {
          stream.getTracks().forEach(t => t.stop());
          return;
        }

        if (videoRef.current) {
          const video = videoRef.current;
          // set DOM properties explicitly to improve autoplay reliability
          video.muted = true;
          video.autoplay = true;
          // playsInline needs to be set as a property for some mobile browsers
          // and React's playsInline attribute is already present on the element.
          // Setting it here ensures the property is present on the DOM node.
          (video as any).playsInline = true;

          video.srcObject = stream;

          const tryPlay = async () => {
            // Add a timeout guard: if play() doesn't resolve, fall back to simulated mode
            let timedOut = false;
            const timeout = setTimeout(() => {
              timedOut = true;
              console.warn('video.play() timed out — falling back to simulated mode');
              if (!cancelled) setCameraState('simulated');
              setLastError('video.play() timed out');
            }, 4000);

            try {
              console.debug('[VTO] attempting video.play()');
              const p = video.play();
              if (p instanceof Promise) await p;
              clearTimeout(timeout);
              if (!timedOut && !cancelled) {
                setCameraState('active');
                console.debug('[VTO] video.play() succeeded');
              }
            } catch (e) {
              clearTimeout(timeout);
              console.warn('Video play failed:', e);
              if (!cancelled) setCameraState('simulated');
              setLastError(String(e));
            }
          };

          if (video.readyState >= 2) {
            tryPlay();
          } else {
            // Use both canplay and loadedmetadata to be more robust across browsers
            const onReady = () => {
              if (!cancelled) tryPlay();
              video.removeEventListener('canplay', onReady);
              video.removeEventListener('loadedmetadata', onReady);
            };
            video.addEventListener('canplay', onReady);
            video.addEventListener('loadedmetadata', onReady);
          }
        }
        streamRef.current = stream;
        isInitializingRef.current = false;
      } catch (err: any) {
        isInitializingRef.current = false;
        clearTimeout(safetyTimer);
        console.error('Camera access error:', err);
        if (!cancelled) {
          // update permission state for debugging
          try { if (err?.name === 'NotAllowedError') setPermissionState('denied'); } catch {}
          if (err?.name === 'NotReadableError') {
            showToast('🚨 Camera in use by another app. Close other apps & retry.');
          } else if (err?.name === 'NotAllowedError') {
            showToast('🚫 Camera permission denied. Enable in browser settings.');
          }
          setLastError(String(err));
          setCameraState('denied');
        }
      }
    };

    init();
    return () => {
      cancelled = true;
      clearTimeout(safetyTimer);
      clearInterval(countdownInterval);
      // stop both the local stream and any stream on the shared ref
      try { if (stream) stream.getTracks().forEach(t => t.stop()); } catch {}
      try { if (streamRef.current) streamRef.current.getTracks().forEach(t => t.stop()); } catch {}
      streamRef.current = null;
      if (videoRef.current) videoRef.current.srcObject = null;
    };
  }, [cameraInitKey]);

  // Draw video -> canvas and overlay product image
  useEffect(() => {
    // Models are expected to be hosted locally at /models for reliability
    const MODEL_URL = '/models';
    let modelLoadCancelled = false;
    (async function loadModels() {
      try {
        // dynamic import face-api.js to keep it out of main bundle until needed
        const faceapi = await import('face-api.js');
        faceapiRef.current = faceapi;
        // load only tiny models to keep bundle small and real-time
        await faceapiRef.current.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
        await faceapiRef.current.nets.faceLandmark68TinyNet.loadFromUri(MODEL_URL);
        modelsLoadedRef.current = true;
      } catch (e) {
        console.warn('[VTO] face-api model load failed', e);
        modelsLoadedRef.current = false;
      }
    })();

    let detectInterval: ReturnType<typeof setInterval> | null = null;
    const startDetection = () => {
      const video = videoRef.current;
      if (!video || !modelsLoadedRef.current) return;
      // tuned TinyFaceDetector options for speed/accuracy tradeoff
      const detectorOptions = new faceapiRef.current.TinyFaceDetectorOptions({ inputSize: 224, scoreThreshold: 0.45 });
      detectInterval = setInterval(async () => {
        if (!video || video.readyState < 2) return;
        try {
          const det = await faceapiRef.current
            .detectSingleFace(video, detectorOptions)
            .withFaceLandmarks(true);
          detectionRef.current = det || null;
        } catch (e) {
          detectionRef.current = null;
        }
      }, 160); // ~6 fps detection to save CPU
    };
    let raf = 0;
    const drawLoop = () => {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      if (!video || !canvas) {
        raf = requestAnimationFrame(drawLoop);
        return;
      }

      const ctx = canvas.getContext('2d');
      if (!ctx) {
        raf = requestAnimationFrame(drawLoop);
        return;
      }

      // match canvas size to video display size
      const w = video.videoWidth || video.clientWidth || 640;
      const h = video.videoHeight || video.clientHeight || 800;
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
      }

      // draw mirrored video
      ctx.save();
      ctx.clearRect(0, 0, w, h);
      ctx.translate(w, 0);
      ctx.scale(-1, 1);
      try { ctx.drawImage(video, 0, 0, w, h); } catch (e) {}
      ctx.restore();

      // draw product overlay using detection if available
      try {
        if (!productImgRef.current) {
          const pi = new Image();
          pi.crossOrigin = 'anonymous';
          pi.src = product.image;
          productImgRef.current = pi;
        }

        const img = productImgRef.current;
        const det = detectionRef.current;

        // tuning presets per product type — load from JSON so it's easy to tune
        const presets: Record<string, { wMul: number; yOffsetMul: number; yAdjust: number }> = runtimePresets as any;
        const preset = (runtimePresets as any)[product.vtoType] ?? (runtimePresets as any).default;

        if (det && det.detection && img && img.complete) {
          const box = det.detection.box;
          // mirror X because canvas is mirrored
          const centerX = w - (box.x + box.width / 2);
          const topY = box.y;
          let overlayW = box.width * preset.wMul;
          let overlayH = (img.height / img.width) * overlayW;
          let y = topY + box.height * preset.yOffsetMul + overlayH * preset.yAdjust * h;
          const x = centerX - overlayW / 2;
          ctx.save();
          ctx.globalAlpha = 0.95;
          ctx.drawImage(img, x, y, overlayW, overlayH);
          ctx.restore();
        } else if (img && img.complete) {
          // fallback: draw centered small overlay
          const overlayW = w * 0.4;
          const overlayH = (img.height / img.width) * overlayW;
          ctx.save(); ctx.globalAlpha = 0.9;
          ctx.drawImage(img, w / 2 - overlayW / 2, h * 0.25 - overlayH / 2, overlayW, overlayH);
          ctx.restore();
        }
      } catch (e) {}

      raf = requestAnimationFrame(drawLoop);
    };

    if (cameraState === 'active') {
      raf = requestAnimationFrame(drawLoop);
      // start detection once models loaded (poll a bit)
      const startPoll = setInterval(() => {
        if (modelsLoadedRef.current) {
          startDetection();
          clearInterval(startPoll);
        }
      }, 200);
    }

    return () => {
      cancelAnimationFrame(raf);
      if (detectInterval) clearInterval(detectInterval);
      detectionRef.current = null;
    };
  }, [cameraState, product.image, product.vtoType]);

  // Poll video/stream state for on-screen debug panel
  useEffect(() => {
    const iv = setInterval(() => {
      const v = videoRef.current;
      const s = streamRef.current;
      setDebugInfo({
        readyState: v?.readyState ?? 0,
        width: v?.videoWidth ?? 0,
        height: v?.videoHeight ?? 0,
        tracks: s ? s.getTracks().length : 0,
        hasStream: !!s,
      });
    }, 500);
    return () => clearInterval(iv);
  }, []);

  // Tracking state sequence
  useEffect(() => {
    if (cameraState !== 'active') return;

    let step = 0;
    const runStep = () => {
      if (step >= TRACKING_SEQUENCE.length - 1) {
        setTrackingState('detected');
        return;
      }
      const { state, duration } = TRACKING_SEQUENCE[step];
      setTrackingState(state);
      trackingTimer.current = setTimeout(() => {
        step++;
        runStep();
      }, duration);
    };

    runStep();
    return () => {
      if (trackingTimer.current) clearTimeout(trackingTimer.current);
    };
  }, [cameraState]);

  // Compare mode sets overlay visibility
  useEffect(() => {
    setShowOverlay(!compareMode);
  }, [compareMode]);

  const handleCapture = () => {
    (async () => {
      const video = videoRef.current;
      if (!video || cameraState !== 'active') {
        showToast('📸 Camera not ready yet');
        return;
      }

      // Check if video is actually producing frames
      if (video.readyState < 2 || video.videoWidth === 0) {
        showToast('⏳ Waiting for camera feed...');
        return;
      }

      setFlashActive(true);
      setTimeout(() => setFlashActive(false), 400);
      setCaptured(true);

      try {
        const w = video.videoWidth;
        const h = video.videoHeight;
        const canvas = document.createElement('canvas');
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext('2d');
        
        if (ctx) {
          // Mirror back for the capture
          ctx.translate(w, 0);
          ctx.scale(-1, 1);
          ctx.drawImage(video, 0, 0, w, h);
        }

        const blob: Blob | null = await new Promise(resolve => canvas.toBlob(resolve, 'image/png'));
        if (!blob) throw new Error('Failed to capture image');

        const form = new FormData();
        form.append('person', blob, 'person.png');
        // mark capture as mirrored so backend can flip it back for alignment
        form.append('product_url', product.image + '::mirrored');

        // Indicate process is happening
        showToast('🧬 Processing Try-On...');

        const res = await fetch('http://localhost:8000/api/vto/tryon', {
          method: 'POST',
          body: form,
        });

        if (!res.ok) throw new Error(`API error: ${res.status}`);
        
        const outBlob = await res.blob();
        if (outBlob.size < 100) throw new Error('Received an empty/corrupt result');

        const url = URL.createObjectURL(outBlob);
        setVtoResultUrl(url);
        showToast('✨ Try-On ready');
      } catch (err) {
        console.error("VTO Capture Error:", err);
        showToast('⚠️ VTO Service Error. Check if backend is running.');
      }

      setTimeout(() => setCaptured(false), 3000);
    })();
  };

  const handleAddToCart = () => {
    setAddedToCart(true);
    onAddToCart(selectedVariant);
    showToast(`✅ "${selectedVariant.label}" added to cart!`);
    setTimeout(() => setAddedToCart(false), 2500);
  };

  const isTracking = trackingState === 'detected';
  const cameraReady = cameraState === 'active' || cameraState === 'denied' || cameraState === 'simulated';

  // Camera permission prompt
  if (cameraState === 'loading') {
    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85">
        <div
          className="relative bg-white rounded-2xl overflow-hidden flex flex-col items-center justify-center p-8 text-center"
          style={{ width: 340, maxHeight: '90vh' }}
        >
          <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-700">
            <X size={20} />
          </button>
          <div className="w-16 h-16 rounded-full bg-orange-50 flex items-center justify-center mb-4">
            <div className="w-8 h-8 border-4 border-orange-400 border-t-transparent rounded-full animate-spin" />
          </div>
          <h3 className="text-base font-bold text-gray-800 mb-2">Starting Virtual Try-On</h3>
          <p className="text-sm text-gray-500 mb-4">Requesting camera access...</p>
          
          <div className="mt-4 p-4 bg-gray-50 rounded-xl w-full">
            <p className="text-xs text-gray-400 mb-3 leading-relaxed">
              If this takes too long, please check your browser's permissions.
            </p>
            <button
              onClick={() => setCameraState('simulated')}
              className="w-full py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 text-xs font-bold rounded-lg transition-colors"
            >
              Skip to Simulation ({loadingCountdown}s)
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 z-[100] bg-black/80 flex items-end sm:items-center justify-center">

        {/* Modal container — mobile sheet on small, centered card on large */}
        <div
          className="relative bg-black flex flex-col overflow-hidden"
          style={{
            width: '100%',
            maxWidth: 390,
            height: '100dvh',
            maxHeight: 860,
            borderRadius: window.innerWidth > 640 ? 20 : '20px 20px 0 0',
          }}
        >
          {/* ═══ TOP BAR ═══ */}
          <div
            className="flex items-center justify-between px-4 shrink-0 z-30"
            style={{
              height: 56,
              background: 'linear-gradient(180deg, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0) 100%)',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
            }}
          >
            {/* Close */}
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-white/15 backdrop-blur flex items-center justify-center hover:bg-white/25 transition-all"
            >
              <X size={18} className="text-white" />
            </button>

            {/* Title */}
            <div className="flex flex-col items-center">
              <div className="flex items-center gap-1.5">
                <Sparkles size={11} className="text-orange-400" />
                <span className="text-white text-xs font-bold tracking-wide uppercase">Virtual Try-On</span>
              </div>
              <span
                className="text-center max-w-[200px] truncate"
                style={{ color: 'rgba(255,255,255,0.75)', fontSize: 11, lineHeight: 1.3 }}
              >
                {product.brand} · {product.name.split(' ').slice(0, 4).join(' ')}
              </span>
            </div>

            {/* Help */}
            <button
              onClick={() => setHelpOpen(!helpOpen)}
              className="w-9 h-9 rounded-full bg-white/15 backdrop-blur flex items-center justify-center hover:bg-white/25 transition-all"
            >
              <HelpCircle size={18} className="text-white" />
            </button>
          </div>

          {/* ═══ CAMERA VIEW ═══ */}
          <div className="relative flex-1 overflow-hidden bg-gray-900">
            {/* Real camera video */}
            {cameraState === 'active' && !vtoResultUrl && (
              <video
                ref={videoRef}
                className="absolute inset-0 w-full h-full object-cover"
                style={{ transform: 'scaleX(-1)' }}
                muted
                autoPlay
                playsInline
              />
            )}

            {/* Canvas renderer: mirrored video frames + product overlay */}
            {cameraState === 'active' && !vtoResultUrl && (
              <canvas
                ref={canvasRef}
                className="absolute inset-0 w-full h-full pointer-events-none"
                style={{ imageRendering: 'auto' }}
              />
            )}

            {/* Result image from backend */}
            {vtoResultUrl && (
              <img src={vtoResultUrl} alt="tryon-result" className="absolute inset-0 w-full h-full object-cover" />
            )}

            {/* Simulated camera (denied or no camera) */}
            {(cameraState === 'denied' || cameraState === 'simulated') && (
              <>
                <SimulatedCamera active={true} />
                <PersonSilhouette />
                {cameraState === 'denied' && (
                  <div
                    className="absolute top-14 left-0 right-0 flex justify-center z-20"
                  >
                    <div
                      className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs"
                      style={{ background: 'rgba(255,200,0,0.15)', color: 'rgba(255,220,80,0.9)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,200,0,0.2)' }}
                    >
                      <span>⚠️</span>
                      <span>Camera access denied — showing simulation</span>
                    </div>
                  </div>
                )}
              </>
            )}

            {/* Overlay & alignment */}
            {cameraReady && (
              <AlignmentOverlay
                vtoType={product.vtoType}
                selectedVariant={selectedVariant}
                showOverlay={showOverlay}
                trackingActive={isTracking}
              />
            )}

            {/* Before / After label */}
            {(cameraState === 'active' || cameraState === 'denied' || cameraState === 'simulated') && (
              <div
                className="absolute top-16 left-4 z-20"
              >
                <div
                  className="px-2.5 py-1 rounded-full text-xs font-bold"
                  style={{
                    background: 'rgba(0,0,0,0.55)',
                    color: compareMode ? '#9CA3AF' : '#FF9900',
                    border: '1px solid rgba(255,255,255,0.1)',
                  }}
                >
                  {compareMode ? '⬅ BEFORE' : '✦ AFTER'}
                </div>
              </div>
            )}

            {/* Tracking status — centered at bottom of camera view */}
            <div className="absolute z-20" style={{ bottom: 16, left: 0, right: 0, display: 'flex', justifyContent: 'center' }}>
              {cameraReady && <TrackingStatusIndicator state={trackingState} />}
            </div>

            {/* Captured overlay border */}
            {captured && (
              <div
                className="absolute inset-0 pointer-events-none z-25"
                style={{ border: '3px solid #16a34a', borderRadius: 'inherit' }}
              />
            )}

            {/* Flash effect */}
            {flashActive && (
              <div
                className="absolute inset-0 z-30 pointer-events-none"
                style={{
                  background: 'white',
                  animation: 'flashFade 0.35s ease-out forwards',
                }}
              />
            )}

            {/* On-screen debug panel (toggleable) */}
            {debugOpen && (
              <div className="absolute top-4 right-4 z-40 p-2 text-xs bg-black/60 text-white rounded" style={{ minWidth: 200 }}>
                <div><strong>permission:</strong> {permissionState ?? 'unknown'}</div>
                <div><strong>cameraState:</strong> {cameraState}</div>
                <div><strong>readyState:</strong> {debugInfo.readyState}</div>
                <div><strong>video:</strong> {debugInfo.width}x{debugInfo.height}</div>
                <div><strong>tracks:</strong> {debugInfo.tracks}</div>
                <div><strong>hasStream:</strong> {String(debugInfo.hasStream)}</div>
                <div style={{ marginTop: 6 }}><strong>lastError:</strong> {lastError ?? 'none'}</div>
              </div>
            )}
          </div>

          {/* ═══ BOTTOM PANEL ═══ */}
          <div
            className="shrink-0 z-30"
            style={{
              background: 'white',
              borderRadius: '20px 20px 0 0',
              boxShadow: '0 -4px 24px rgba(0,0,0,0.18)',
              padding: '16px 16px 20px',
            }}
          >
            {/* Handle bar */}
            <div className="w-10 h-1 rounded-full bg-gray-200 mx-auto mb-4" />

            {/* Product info strip */}
            <div className="flex items-center gap-3 mb-4 pb-3 border-b border-gray-100">
              <img
                src={product.image}
                alt={product.name}
                className="w-10 h-10 rounded-lg object-cover border border-gray-100"
              />
              <div className="flex-1 min-w-0">
                <p className="text-xs text-gray-500 truncate">{product.brand}</p>
                <p className="text-sm font-semibold text-gray-800 truncate">{product.name}</p>
              </div>
              <div className="text-right">
                <span className="text-sm font-bold text-gray-900">₹{product.price.toLocaleString()}</span>
              </div>
            </div>

            {/* Variant Carousel */}
            <div className="mb-4">
              <VariantCarousel
                variants={variants}
                selectedId={selectedVariant.id}
                onSelect={setSelectedVariant}
              />
            </div>

            {/* Overlay Adjuster (live presets tweak) */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <div className="text-sm font-semibold">Overlay Preset</div>
                <div className="flex items-center gap-2">
                  <button onClick={() => setAdjustOpen(v => !v)} className="px-2 py-1 text-xs rounded bg-gray-100">{adjustOpen ? 'Close' : 'Adjust'}</button>
                  <button onClick={() => {
                    // reset runtime presets to defaults
                    setRuntimePresets(overlayPresets as any);
                    try { localStorage.removeItem('vto_overlay_presets'); } catch {}
                    showToast('Reset presets to defaults');
                  }} className="px-2 py-1 text-xs rounded bg-gray-100">Reset</button>
                </div>
              </div>

              {adjustOpen && (
                <div className="p-3 rounded-lg bg-gray-50 border border-gray-100">
                  {['wMul','yOffsetMul','yAdjust'].map((key) => {
                    const preset = (runtimePresets as any)[product.vtoType] ?? (runtimePresets as any).default;
                    const value = preset ? preset[key] : 0;
                    const min = key === 'wMul' ? 0.2 : (key === 'yAdjust' ? -1 : -2);
                    const max = key === 'wMul' ? 3 : (key === 'yAdjust' ? 1 : 2);
                    const step = key === 'wMul' ? 0.01 : 0.01;
                    return (
                      <div key={key} className="mb-2">
                        <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
                          <div>{key}</div>
                          <div className="font-mono">{Number(value).toFixed(2)}</div>
                        </div>
                        <input
                          type="range"
                          min={min}
                          max={max}
                          step={step}
                          value={value}
                          onChange={(e) => {
                            const v = Number(e.target.value);
                            setRuntimePresets(prev => {
                              const next = { ...prev } as any;
                              next[product.vtoType] = { ...(next[product.vtoType] ?? next.default), [key]: v };
                              try { localStorage.setItem('vto_overlay_presets', JSON.stringify(next)); } catch {}
                              return next;
                            });
                          }}
                          className="w-full"
                        />
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Action Buttons Row */}
            <div className="flex items-center justify-between gap-3">
              {/* Compare Before/After toggle */}
              <button
                onClick={() => setCompareMode(v => !v)}
                className="flex flex-col items-center gap-0.5 transition-all"
                style={{ minWidth: 52 }}
              >
                <div
                  className="w-11 h-11 rounded-full flex items-center justify-center transition-all"
                  style={{
                    background: compareMode ? '#FFF3E0' : '#F3F4F6',
                    border: compareMode ? '2px solid #FF9900' : '2px solid transparent',
                  }}
                >
                  <Layers size={18} style={{ color: compareMode ? '#FF6600' : '#6B7280' }} />
                </div>
                <span style={{ fontSize: 9, color: compareMode ? '#C67B00' : '#9CA3AF', fontWeight: compareMode ? 700 : 400 }}>
                  Compare
                </span>
              </button>

              {/* Capture Button (main) */}
              <CaptureButton onCapture={handleCapture} disabled={!cameraReady} />

                  {/* Debug / Retry (dev usage) */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <button
                      onClick={() => {
                        // trigger re-init of camera
                        setCameraInitKey(k => k + 1);
                        setCameraState('loading');
                        showToast('🔁 Re-initializing camera...');
                      }}
                      className="px-3 py-2 rounded-lg bg-gray-100 text-xs"
                    >
                      Retry Camera
                    </button>
                    <button
                      onClick={() => setDebugOpen(d => !d)}
                      className="px-3 py-2 rounded-lg bg-gray-100 text-xs"
                    >
                      {debugOpen ? 'Hide Debug' : 'Show Debug'}
                    </button>
                  </div>

              {/* Add to Cart */}
              <button
                onClick={handleAddToCart}
                className="flex flex-col items-center gap-0.5 transition-all"
                style={{ minWidth: 52 }}
              >
                <div
                  className="w-11 h-11 rounded-full flex items-center justify-center transition-all"
                  style={{
                    background: addedToCart ? '#DCFCE7' : '#FFF8E7',
                    border: addedToCart ? '2px solid #16a34a' : '2px solid #FF9900',
                  }}
                >
                  {addedToCart ? (
                    <Check size={18} style={{ color: '#16a34a' }} />
                  ) : (
                    <ShoppingCart size={18} style={{ color: '#C67B00' }} />
                  )}
                </div>
                <span style={{ fontSize: 9, color: addedToCart ? '#15803d' : '#C67B00', fontWeight: 700 }}>
                  {addedToCart ? 'Added!' : 'Add to Cart'}
                </span>
              </button>

              {/* Share / save */}
              <button
                onClick={() => showToast('📤 Link copied to clipboard!')}
                className="flex flex-col items-center gap-0.5 transition-all"
                style={{ minWidth: 52 }}
              >
                <div
                  className="w-11 h-11 rounded-full flex items-center justify-center"
                  style={{ background: '#F3F4F6', border: '2px solid transparent' }}
                >
                  <Share2 size={18} style={{ color: '#6B7280' }} />
                </div>
                <span style={{ fontSize: 9, color: '#9CA3AF' }}>Share</span>
              </button>

              {/* Retry (reset tracking) */}
              <button
                onClick={() => {
                  setTrackingState('searching');
                  setTimeout(() => setTrackingState('move-closer'), 1800);
                  setTimeout(() => setTrackingState('detected'), 3200);
                }}
                className="flex flex-col items-center gap-0.5 transition-all"
                style={{ minWidth: 52 }}
              >
                <div
                  className="w-11 h-11 rounded-full flex items-center justify-center"
                  style={{ background: '#F3F4F6', border: '2px solid transparent' }}
                >
                  <RotateCcw size={18} style={{ color: '#6B7280' }} />
                </div>
                <span style={{ fontSize: 9, color: '#9CA3AF' }}>Retry</span>
              </button>
            </div>
          </div>

          {/* ═══ TOAST NOTIFICATION ═══ */}
          {toast && (
            <div
              className="absolute left-4 right-4 z-50 flex items-center justify-center pointer-events-none"
              style={{ bottom: 220, animation: 'slideUpFade 0.3s ease-out' }}
            >
              <div
                className="px-4 py-2.5 rounded-full text-sm font-semibold text-center"
                style={{
                  background: 'rgba(20,20,20,0.88)',
                  color: 'white',
                  backdropFilter: 'blur(12px)',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.35)',
                  maxWidth: 300,
                }}
              >
                {toast}
              </div>
            </div>
          )}

          {/* ═══ HELP TOOLTIP ═══ */}
          {helpOpen && (
            <div
              className="absolute top-14 right-4 z-50 rounded-xl p-4 shadow-2xl"
              style={{ background: 'rgba(20,20,26,0.95)', maxWidth: 240, backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.08)' }}
            >
              <button onClick={() => setHelpOpen(false)} className="absolute top-2 right-2">
                <X size={14} className="text-gray-400" />
              </button>
              <p className="text-white text-xs font-bold mb-2">How to use Try-On</p>
              <ul className="space-y-1.5">
                {[
                  '1. Allow camera access when prompted',
                  '2. Align your face in the oval guide',
                  '3. Select a color variant below',
                  '4. Tap 📷 to capture your look',
                  '5. Add your favourite to cart!',
                ].map((tip, i) => (
                  <li key={i} className="text-gray-300 flex items-start gap-1.5" style={{ fontSize: 11 }}>
                    <span className="text-orange-400 shrink-0">›</span>
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Flash animation keyframes */}
      <style>{`
        @keyframes flashFade {
          0% { opacity: 0.9; }
          100% { opacity: 0; }
        }
        @keyframes slideUpFade {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </>
  );
}

export type { VTOProduct };
