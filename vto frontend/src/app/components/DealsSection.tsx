import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ProductCard, type Product } from "./ProductCard";

const products: Product[] = [
  {
    id: 1,
    name: "Sony WH-1000XM5 Industry Leading Noise Canceling Wireless Headphones",
    brand: "Sony",
    price: 24990,
    originalPrice: 34990,
    discount: 29,
    rating: 4.6,
    reviewCount: 12453,
    image: "https://images.unsplash.com/photo-1762028892204-2ef68f7fcfd5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVjdHJvbmljcyUyMGhlYWRwaG9uZXMlMjBnYWRnZXRzfGVufDF8fHx8MTc3MzI4ODQ4Mnww&ixlib=rb-4.1.0&q=80&w=400",
    badge: "Best Seller",
    prime: true,
    vtoSupported: true,
    vtoType: "earbuds",
  },
  {
    id: 2,
    name: "Apple Watch Series 9 GPS 41mm Starlight Aluminium Case Sport Band",
    brand: "Apple",
    price: 35900,
    originalPrice: 41900,
    discount: 14,
    rating: 4.8,
    reviewCount: 8732,
    image: "https://images.unsplash.com/photo-1716234479503-c460b87bdf98?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWFydCUyMHdhdGNoJTIwd2VhcmFibGUlMjB0ZWNofGVufDF8fHx8MTc3MzIyNjg4Nnww&ixlib=rb-4.1.0&q=80&w=400",
    badge: "Amazon's Choice",
    prime: true,
  },
  {
    id: 3,
    name: "Nike Air Zoom Pegasus 40 Running Shoes for Men Lightweight Cushioned",
    brand: "Nike",
    price: 7995,
    originalPrice: 11995,
    discount: 33,
    rating: 4.5,
    reviewCount: 5621,
    image: "https://images.unsplash.com/photo-1719523677291-a395426c1a87?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxydW5uaW5nJTIwc2hvZXMlMjBzbmVha2VycyUyMHByb2R1Y3R8ZW58MXx8fHwxNzczMjUwMjk1fDA&ixlib=rb-4.1.0&q=80&w=400",
    badge: "Deal of the Day",
    prime: true,
    vtoSupported: true,
    vtoType: "shoes",
  },
  {
    id: 4,
    name: "De'Longhi Espresso Coffee Machine Fully Automatic with Milk Frother",
    brand: "De'Longhi",
    price: 18990,
    originalPrice: 24990,
    discount: 24,
    rating: 4.3,
    reviewCount: 3218,
    image: "https://images.unsplash.com/photo-1595304896439-dbbee5bf740d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2ZmZWUlMjBtYWtlciUyMGtpdGNoZW4lMjBwcm9kdWN0fGVufDF8fHx8MTc3MzI4ODQ4N3ww&ixlib=rb-4.1.0&q=80&w=400",
    prime: true,
  },
  {
    id: 5,
    name: "Sony PlayStation 5 DualSense Wireless Controller Midnight Black",
    brand: "Sony",
    price: 5990,
    originalPrice: 6990,
    discount: 14,
    rating: 4.9,
    reviewCount: 21045,
    image: "https://images.unsplash.com/photo-1665592512676-840f7b669aeb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYW1pbmclMjBjb25zb2xlJTIwY29udHJvbGxlciUyMHZpZGVvJTIwZ2FtZXxlbnwxfHx8fDE3NzMyODg0ODh8MA&ixlib=rb-4.1.0&q=80&w=400",
    badge: "Best Seller",
    prime: true,
  },
  {
    id: 6,
    name: "boAt Airdopes 141 Bluetooth TWS Earbuds with Beast Mode Low Latency Gaming",
    brand: "boAt",
    price: 999,
    originalPrice: 4490,
    discount: 78,
    rating: 4.1,
    reviewCount: 89234,
    image: "https://images.unsplash.com/photo-1755182529034-189a6051faae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aXJlbGVzcyUyMGVhcmJ1ZHMlMjBwcm9kdWN0JTIwd2hpdGUlMjBiYWNrZ3JvdW5kfGVufDF8fHx8MTc3MzIyNDk1Nnww&ixlib=rb-4.1.0&q=80&w=400",
    badge: "Deal of the Day",
    prime: true,
    vtoSupported: true,
    vtoType: "earbuds",
  },
  {
    id: 7,
    name: "Ikea Fejka Artificial Potted Plant Set Indoor Outdoor Home Decor",
    brand: "IKEA",
    price: 1499,
    originalPrice: 2499,
    discount: 40,
    rating: 4.4,
    reviewCount: 4521,
    image: "https://images.unsplash.com/photo-1611866972879-3f7c79e1282d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRvb3IlMjBwbGFudHMlMjBob21lJTIwZGVjb3J8ZW58MXx8fHwxNzczMjg4NDg4fDA&ixlib=rb-4.1.0&q=80&w=400",
    prime: false,
  },
  {
    id: 8,
    name: "Lakme 9to5 Weightless Foundation SPF 24 PA++ Suitable for All Skin Types",
    brand: "Lakme",
    price: 449,
    originalPrice: 699,
    discount: 36,
    rating: 4.2,
    reviewCount: 15678,
    image: "https://images.unsplash.com/photo-1590393802688-ab3fd7c186f2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWF1dHklMjBza2luY2FyZSUyMGNvc21ldGljcyUyMHByb2R1Y3R8ZW58MXx8fHwxNzczMjg4NDkzfDA&ixlib=rb-4.1.0&q=80&w=400",
    badge: "Amazon's Choice",
    prime: true,
    vtoSupported: true,
    vtoType: "makeup",
  },
];

interface DealsSectionProps {
  onTryOn?: (product: Product) => void;
  onProductClick?: (product: Product) => void;
}

function Countdown() {
  const [time, setTime] = useState({ h: 5, m: 42, s: 17 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prev) => {
        let { h, m, s } = prev;
        s -= 1;
        if (s < 0) { s = 59; m -= 1; }
        if (m < 0) { m = 59; h -= 1; }
        if (h < 0) return { h: 5, m: 59, s: 59 };
        return { h, m, s };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <div className="flex items-center gap-1">
      <span className="text-white text-sm font-medium">Ends in:</span>
      <div className="flex items-center gap-0.5">
        {[pad(time.h), pad(time.m), pad(time.s)].map((unit, i) => (
          <span key={i} className="flex items-center gap-0.5">
            <span className="bg-black text-white text-sm font-bold px-1.5 py-0.5 rounded">{unit}</span>
            {i < 2 && <span className="text-white font-bold">:</span>}
          </span>
        ))}
      </div>
    </div>
  );
}

export function DealsSection({ onTryOn, onProductClick }: DealsSectionProps) {
  const [startIndex, setStartIndex] = useState(0);
  const itemsPerView = 4;
  const maxIndex = products.length - itemsPerView;

  const prev = () => setStartIndex((i) => Math.max(0, i - 1));
  const next = () => setStartIndex((i) => Math.min(maxIndex, i + 1));

  return (
    <section className="max-w-[1500px] mx-auto px-4 py-4">
      {/* Section Header */}
      <div
        className="flex items-center justify-between px-4 py-3 rounded-t-lg"
        style={{ backgroundColor: "#232F3E" }}
      >
        <div className="flex items-center gap-4 flex-wrap gap-y-2">
          <h2 className="text-xl font-bold text-white">Today's Deals</h2>
          <Countdown />
        </div>
        <a
          href="#"
          className="text-sm text-orange-400 hover:text-orange-300 hover:underline font-medium whitespace-nowrap"
        >
          See all deals →
        </a>
      </div>

      {/* Products Carousel */}
      <div className="relative bg-white border border-gray-200 rounded-b-lg p-4">
        <div className="overflow-hidden">
          <div
            className="flex gap-4 transition-transform duration-300"
            style={{ transform: `translateX(calc(-${startIndex} * (100% / ${itemsPerView} + 1rem)))` }}
          >
            {products.map((product) => (
              <div key={product.id} className="flex-shrink-0 w-[calc(25%-12px)]">
                <ProductCard
                  product={product}
                  onTryOn={product.vtoSupported && onTryOn ? () => onTryOn(product) : undefined}
                  onProductClick={onProductClick ? () => onProductClick(product) : undefined}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Arrows */}
        {startIndex > 0 && (
          <button
            onClick={prev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white hover:bg-gray-50 border border-gray-300 rounded-full p-2 shadow-lg z-10 transition-all"
          >
            <ChevronLeft size={20} className="text-gray-700" />
          </button>
        )}
        {startIndex < maxIndex && (
          <button
            onClick={next}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white hover:bg-gray-50 border border-gray-300 rounded-full p-2 shadow-lg z-10 transition-all"
          >
            <ChevronRight size={20} className="text-gray-700" />
          </button>
        )}
      </div>
    </section>
  );
}
