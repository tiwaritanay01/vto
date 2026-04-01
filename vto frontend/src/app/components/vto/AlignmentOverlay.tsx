import { type VTOType, type VTOVariant } from "./types";

interface AlignmentOverlayProps {
  vtoType: VTOType;
  selectedVariant: VTOVariant | null;
  showOverlay: boolean;
  trackingActive: boolean;
}

function GlassesOverlay({ color }: { color: string }) {
  return (
    <svg width="190" height="70" viewBox="0 0 190 70" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Left lens */}
      <rect x="8" y="10" width="72" height="50" rx="16" fill={color} fillOpacity="0.75" stroke={color} strokeWidth="4" />
      {/* Right lens */}
      <rect x="110" y="10" width="72" height="50" rx="16" fill={color} fillOpacity="0.75" stroke={color} strokeWidth="4" />
      {/* Bridge */}
      <path d="M80 32 Q95 22 110 32" stroke={color} strokeWidth="4" fill="none" strokeLinecap="round" />
      {/* Left arm */}
      <line x1="8" y1="30" x2="-10" y2="28" stroke={color} strokeWidth="4" strokeLinecap="round" />
      {/* Right arm */}
      <line x1="182" y1="30" x2="200" y2="28" stroke={color} strokeWidth="4" strokeLinecap="round" />
      {/* Lens shine */}
      <ellipse cx="38" cy="28" rx="12" ry="7" fill="white" fillOpacity="0.2" />
      <ellipse cx="152" cy="28" rx="12" ry="7" fill="white" fillOpacity="0.2" />
    </svg>
  );
}

function LipsOverlay({ color }: { color: string }) {
  return (
    <svg width="120" height="56" viewBox="0 0 120 56" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Upper lip */}
      <path
        d="M10 28 C10 28 20 10 35 14 C45 17 50 10 60 10 C70 10 75 17 85 14 C100 10 110 28 110 28 C95 22 80 20 60 20 C40 20 25 22 10 28Z"
        fill={color}
        fillOpacity="0.85"
      />
      {/* Lower lip */}
      <path
        d="M10 28 C25 36 40 46 60 46 C80 46 95 36 110 28 C95 22 80 20 60 20 C40 20 25 22 10 28Z"
        fill={color}
        fillOpacity="0.85"
      />
      {/* Cupid's bow highlight */}
      <path
        d="M35 14 C45 17 50 10 60 10 C70 10 75 17 85 14"
        stroke={color}
        strokeWidth="2"
        fill="none"
        strokeOpacity="0.5"
      />
      {/* Shine */}
      <ellipse cx="60" cy="36" rx="24" ry="6" fill="white" fillOpacity="0.18" />
    </svg>
  );
}

function EarbudsOverlay({ color }: { color: string }) {
  return (
    <>
      {/* Left earbud */}
      <div
        className="absolute rounded-full border-2 border-white/40 shadow-lg flex items-center justify-center"
        style={{
          backgroundColor: color,
          width: 28,
          height: 28,
          left: -14,
          top: '38%',
        }}
      >
        <div className="w-2 h-2 rounded-full bg-white/30" />
      </div>
      {/* Right earbud */}
      <div
        className="absolute rounded-full border-2 border-white/40 shadow-lg flex items-center justify-center"
        style={{
          backgroundColor: color,
          width: 28,
          height: 28,
          right: -14,
          top: '38%',
        }}
      >
        <div className="w-2 h-2 rounded-full bg-white/30" />
      </div>
    </>
  );
}

function HatOverlay({ color }: { color: string }) {
  return (
    <svg width="220" height="90" viewBox="0 0 220 90" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Hat brim */}
      <ellipse cx="110" cy="80" rx="105" ry="14" fill={color} fillOpacity="0.85" />
      {/* Hat crown */}
      <rect x="40" y="10" width="140" height="70" rx="10" fill={color} fillOpacity="0.85" />
      {/* Hat band */}
      <rect x="40" y="65" width="140" height="10" rx="3" fill="rgba(0,0,0,0.2)" />
      {/* Crown shine */}
      <ellipse cx="110" cy="30" rx="50" ry="12" fill="white" fillOpacity="0.12" />
    </svg>
  );
}

function ShoesOverlay({ color, secondaryColor }: { color: string; secondaryColor?: string }) {
  const accent = secondaryColor || color;
  return (
    <div className="flex gap-4 items-end">
      {/* Left shoe */}
      <svg width="90" height="55" viewBox="0 0 90 55" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M5 40 C5 40 10 20 25 18 C35 16 50 20 65 22 C75 23 85 28 85 35 C85 42 78 48 68 48 L18 48 C10 48 5 44 5 40Z" fill={color} fillOpacity="0.9" />
        <path d="M5 40 C5 40 10 20 25 18 L25 30 C15 30 10 35 5 40Z" fill={accent} fillOpacity="0.7" />
        <ellipse cx="55" cy="25" rx="18" ry="6" fill="white" fillOpacity="0.2" />
        <path d="M20 38 L70 38" stroke="white" strokeWidth="1.5" strokeOpacity="0.3" strokeDasharray="4 3" />
      </svg>
      {/* Right shoe (mirrored) */}
      <svg width="90" height="55" viewBox="0 0 90 55" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ transform: 'scaleX(-1)' }}>
        <path d="M5 40 C5 40 10 20 25 18 C35 16 50 20 65 22 C75 23 85 28 85 35 C85 42 78 48 68 48 L18 48 C10 48 5 44 5 40Z" fill={color} fillOpacity="0.9" />
        <path d="M5 40 C5 40 10 20 25 18 L25 30 C15 30 10 35 5 40Z" fill={accent} fillOpacity="0.7" />
        <ellipse cx="55" cy="25" rx="18" ry="6" fill="white" fillOpacity="0.2" />
        <path d="M20 38 L70 38" stroke="white" strokeWidth="1.5" strokeOpacity="0.3" strokeDasharray="4 3" />
      </svg>
    </div>
  );
}

export function AlignmentOverlay({ vtoType, selectedVariant, showOverlay, trackingActive }: AlignmentOverlayProps) {
  const color = selectedVariant?.color || '#FF9900';
  const secondaryColor = selectedVariant?.secondaryColor;

  // Oval guide dimensions
  const ovalW = 195;
  const ovalH = 255;

  return (
    <div className="absolute inset-0 pointer-events-none">
      {/* Darkened corners / vignette */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse 55% 65% at 50% 42%, transparent 60%, rgba(0,0,0,0.55) 100%)',
        }}
      />

      {/* Face guide oval */}
      <div
        className="absolute"
        style={{
          width: ovalW,
          height: ovalH,
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -58%)',
          borderRadius: '50%',
          border: trackingActive ? '2.5px solid rgba(255,255,255,0.9)' : '2.5px dashed rgba(255,255,255,0.55)',
          boxShadow: trackingActive ? '0 0 0 1px rgba(255,255,255,0.3), inset 0 0 30px rgba(255,255,255,0.04)' : 'none',
          transition: 'border 0.5s ease, box-shadow 0.5s ease',
          position: 'absolute',
        }}
      >
        {/* Corner markers */}
        {[
          { top: -3, left: '50%', transform: 'translateX(-50%)', width: 30, height: 3 },
          { bottom: -3, left: '50%', transform: 'translateX(-50%)', width: 30, height: 3 },
          { left: -3, top: '50%', transform: 'translateY(-50%)', height: 30, width: 3 },
          { right: -3, top: '50%', transform: 'translateY(-50%)', height: 30, width: 3 },
        ].map((style, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              ...style,
              backgroundColor: trackingActive ? '#FF9900' : 'rgba(255,255,255,0.6)',
              transition: 'background-color 0.5s',
            }}
          />
        ))}

        {/* Try-on overlays inside oval */}
        {showOverlay && (
          <>
            {vtoType === 'glasses' && (
              <div className="absolute" style={{ top: '28%', left: '50%', transform: 'translateX(-50%)' }}>
                <GlassesOverlay color={color} />
              </div>
            )}
            {vtoType === 'makeup' && (
              <div className="absolute" style={{ bottom: '18%', left: '50%', transform: 'translateX(-50%)' }}>
                <LipsOverlay color={color} />
              </div>
            )}
            {vtoType === 'earbuds' && (
              <EarbudsOverlay color={color} />
            )}
            {vtoType === 'hat' && (
              <div className="absolute" style={{ top: -45, left: '50%', transform: 'translateX(-55%)' }}>
                <HatOverlay color={color} />
              </div>
            )}
          </>
        )}
      </div>

      {/* Shoes overlay at bottom of screen (outside oval) */}
      {showOverlay && vtoType === 'shoes' && (
        <div
          className="absolute"
          style={{ bottom: 16, left: '50%', transform: 'translateX(-50%)' }}
        >
          <ShoesOverlay color={color} secondaryColor={secondaryColor} />
        </div>
      )}

      {/* Instruction text */}
      <div
        className="absolute text-center"
        style={{ bottom: vtoType === 'shoes' ? 90 : 24, left: 0, right: 0 }}
      >
        <span
          className="text-xs font-medium px-3 py-1.5 rounded-full"
          style={{ background: 'rgba(0,0,0,0.5)', color: 'rgba(255,255,255,0.85)' }}
        >
          {vtoType === 'shoes'
            ? 'Point camera at your feet'
            : vtoType === 'hat'
            ? 'Align your head at the top'
            : 'Align your face within the frame'}
        </span>
      </div>
    </div>
  );
}
