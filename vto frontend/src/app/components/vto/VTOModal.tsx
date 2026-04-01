import { useState, useEffect, useRef, useCallback } from "react";
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
  const [vtoResultUrl, setVtoResultUrl] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const [helpOpen, setHelpOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const trackingTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

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

    const init = async () => {
      if (!navigator.mediaDevices?.getUserMedia) {
        if (!cancelled) setCameraState('simulated');
        return;
      }
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: { 
            facingMode: 'user', 
            width: { ideal: 640 }, 
            height: { ideal: 800 } 
          },
        });
        
        if (cancelled) {
          stream.getTracks().forEach(t => t.stop());
          return;
        }

        if (videoRef.current) {
          const video = videoRef.current;
          video.srcObject = stream;
          
          // Try to play immediately if readyScale is enough
          const tryPlay = async () => {
            try {
              await video.play();
              if (!cancelled) setCameraState('active');
            } catch (e) {
              console.warn("Video play failed or interrupted:", e);
            }
          };

          if (video.readyState >= 2) {
             tryPlay();
          } else {
             video.oncanplay = () => {
               if (!cancelled) tryPlay();
             };
          }
        }
        streamRef.current = stream;
      } catch (err) {
        console.error("Camera access error:", err);
        if (!cancelled) {
          if (err instanceof DOMException && err.name === 'NotReadableError') {
             // Let user know the device is locked/busy
             showToast('🚨 Camera in use by another tab. Please close other tabs and retry.');
          }
          setCameraState('denied');
        }
      }
    };

    init();
    return () => {
      cancelled = true;
      if (stream) {
        stream.getTracks().forEach(t => t.stop());
      }
    };
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
        form.append('product_url', product.image);

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
          <p className="text-sm text-gray-500">Requesting camera access...</p>
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
