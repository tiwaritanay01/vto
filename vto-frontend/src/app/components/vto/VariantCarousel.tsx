import { type VTOVariant } from "./types";
import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface VariantCarouselProps {
  variants: VTOVariant[];
  selectedId: string;
  onSelect: (variant: VTOVariant) => void;
}

export function VariantCarousel({ variants, selectedId, onSelect }: VariantCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: 'left' | 'right') => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: dir === 'left' ? -120 : 120, behavior: 'smooth' });
    }
  };

  const selectedVariant = variants.find(v => v.id === selectedId);

  return (
    <div className="w-full">
      {/* Label row */}
      <div className="flex items-center justify-between mb-2 px-1">
        <span className="text-xs text-gray-500 font-medium uppercase tracking-wider">
          Color / Style
        </span>
        {selectedVariant && (
          <span className="text-xs font-semibold text-gray-800">{selectedVariant.label}</span>
        )}
      </div>

      {/* Carousel */}
      <div className="relative">
        {/* Left scroll button */}
        <button
          onClick={() => scroll('left')}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-1 shadow-md border border-gray-200"
          style={{ transform: 'translateY(-50%) translateX(-50%)' }}
        >
          <ChevronLeft size={12} className="text-gray-600" />
        </button>

        {/* Variants scroll container */}
        <div
          ref={scrollRef}
          className="flex gap-3 overflow-x-auto px-4 pb-1"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {variants.map((variant) => {
            const isSelected = variant.id === selectedId;
            return (
              <button
                key={variant.id}
                onClick={() => onSelect(variant)}
                className="flex flex-col items-center gap-1 shrink-0 transition-all"
                style={{ minWidth: 52 }}
              >
                {/* Color circle */}
                <div
                  className="rounded-full transition-all duration-200"
                  style={{
                    width: 40,
                    height: 40,
                    backgroundColor: variant.color,
                    border: isSelected
                      ? '3px solid #FF9900'
                      : '2.5px solid transparent',
                    boxShadow: isSelected
                      ? '0 0 0 2px rgba(255,153,0,0.35), 0 2px 8px rgba(0,0,0,0.2)'
                      : '0 1px 4px rgba(0,0,0,0.15)',
                    outline: !isSelected ? '2px solid #e5e7eb' : 'none',
                    transform: isSelected ? 'scale(1.12)' : 'scale(1)',
                  }}
                />
                {/* Variant label */}
                <span
                  className="text-center leading-tight"
                  style={{
                    fontSize: 9,
                    color: isSelected ? '#C67B00' : '#6B7280',
                    fontWeight: isSelected ? 700 : 400,
                    maxWidth: 48,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {variant.label}
                </span>
              </button>
            );
          })}
        </div>

        {/* Right scroll button */}
        <button
          onClick={() => scroll('right')}
          className="absolute right-0 top-1/2 z-10 bg-white rounded-full p-1 shadow-md border border-gray-200"
          style={{ transform: 'translateY(-50%) translateX(50%)' }}
        >
          <ChevronRight size={12} className="text-gray-600" />
        </button>
      </div>
    </div>
  );
}
