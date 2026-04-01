import { Camera, Check } from "lucide-react";
import { useState } from "react";

interface CaptureButtonProps {
  onCapture: () => void;
  disabled?: boolean;
}

export function CaptureButton({ onCapture, disabled }: CaptureButtonProps) {
  const [capturing, setCapturing] = useState(false);
  const [captured, setCaptured] = useState(false);

  const handleClick = () => {
    if (capturing || disabled) return;
    setCapturing(true);
    setTimeout(() => {
      setCapturing(false);
      setCaptured(true);
      onCapture();
      setTimeout(() => setCaptured(false), 2000);
    }, 300);
  };

  return (
    <button
      onClick={handleClick}
      disabled={disabled || capturing}
      className="relative flex items-center justify-center rounded-full transition-all active:scale-90"
      style={{
        width: 68,
        height: 68,
        background: captured
          ? 'linear-gradient(135deg, #16a34a, #22c55e)'
          : 'linear-gradient(135deg, #FF9900, #FF6600)',
        boxShadow: capturing
          ? '0 0 0 6px rgba(255,153,0,0.3)'
          : captured
          ? '0 0 0 4px rgba(34,197,94,0.3), 0 4px 16px rgba(0,0,0,0.3)'
          : '0 0 0 4px rgba(255,255,255,0.25), 0 4px 16px rgba(0,0,0,0.3)',
        border: '3px solid rgba(255,255,255,0.8)',
        transform: capturing ? 'scale(0.92)' : 'scale(1)',
      }}
    >
      {/* Outer ring animation */}
      {capturing && (
        <div
          className="absolute inset-0 rounded-full animate-ping"
          style={{ border: '3px solid rgba(255,153,0,0.5)' }}
        />
      )}

      {captured ? (
        <Check size={26} className="text-white" strokeWidth={3} />
      ) : (
        <Camera size={26} className="text-white" strokeWidth={2} />
      )}
    </button>
  );
}
