import { type TrackingState } from "./types";
import { Scan, CheckCircle, Sun, Loader } from "lucide-react";
import type { ElementType } from "react";

interface TrackingStatusIndicatorProps {
  state: TrackingState;
}

const STATUS_CONFIG: Record<TrackingState, {
  icon: ElementType;
  label: string;
  bg: string;
  text: string;
  pulse: boolean;
}> = {
  searching: {
    icon: Loader,
    label: 'Searching for face...',
    bg: 'rgba(0,0,0,0.65)',
    text: '#FFFFFF',
    pulse: true,
  },
  'move-closer': {
    icon: Scan,
    label: 'Move closer to the camera',
    bg: 'rgba(255,153,0,0.85)',
    text: '#111111',
    pulse: false,
  },
  detected: {
    icon: CheckCircle,
    label: 'Face detected ✓',
    bg: 'rgba(22,163,74,0.85)',
    text: '#FFFFFF',
    pulse: false,
  },
  'poor-lighting': {
    icon: Sun,
    label: 'Improve lighting',
    bg: 'rgba(234,179,8,0.9)',
    text: '#111111',
    pulse: false,
  },
};

export function TrackingStatusIndicator({ state }: TrackingStatusIndicatorProps) {
  const config = STATUS_CONFIG[state];
  const Icon = config.icon;

  return (
    <div
      className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold transition-all duration-500"
      style={{ backgroundColor: config.bg, color: config.text }}
    >
      <Icon
        size={14}
        className={config.pulse ? 'animate-spin' : ''}
        style={{ flexShrink: 0 }}
      />
      <span>{config.label}</span>
    </div>
  );
}