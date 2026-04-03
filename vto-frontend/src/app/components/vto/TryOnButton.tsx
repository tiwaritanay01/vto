import { Camera } from "lucide-react";
import { useState } from "react";
import type { MouseEvent } from "react";

interface TryOnButtonProps {
  onClick: (e: MouseEvent) => void;
  loading?: boolean;
  size?: 'sm' | 'md';
}

export function TryOnButton({ onClick, loading = false, size = 'sm' }: TryOnButtonProps) {
  const [pressed, setPressed] = useState(false);

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setPressed(true);
    setTimeout(() => setPressed(false), 200);
    onClick(e);
  };

  if (size === 'md') {
    return (
      <button
        onClick={handleClick}
        disabled={loading}
        className="flex items-center justify-center gap-2 w-full py-2.5 rounded-full border-2 text-sm font-bold transition-all active:scale-95"
        style={{
          backgroundColor: pressed ? '#E67700' : '#FF9900',
          borderColor: '#E67700',
          color: '#111',
          transform: pressed ? 'scale(0.97)' : 'scale(1)',
          boxShadow: '0 2px 8px rgba(255,153,0,0.35)',
        }}
      >
        {loading ? (
          <div className="w-4 h-4 border-2 border-gray-800 border-t-transparent rounded-full animate-spin" />
        ) : (
          <Camera size={16} />
        )}
        {loading ? 'Loading...' : 'Try On'}
        <span
          className="text-xs px-1.5 py-0.5 rounded"
          style={{ backgroundColor: 'rgba(0,0,0,0.12)', fontSize: '9px', letterSpacing: '0.05em' }}
        >
          AR
        </span>
      </button>
    );
  }

  // Small circular badge for product cards
  return (
    <button
      onClick={handleClick}
      disabled={loading}
      title="Virtual Try-On"
      className="w-8 h-8 rounded-full flex items-center justify-center shadow-lg transition-all active:scale-90 hover:scale-110 z-20"
      style={{
        background: 'linear-gradient(135deg, #FF9900, #E67700)',
        border: '2px solid #fff',
        boxShadow: '0 2px 8px rgba(255,153,0,0.5)',
      }}
    >
      {loading ? (
        <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
      ) : (
        <Camera size={13} className="text-white" strokeWidth={2.5} />
      )}
    </button>
  );
}