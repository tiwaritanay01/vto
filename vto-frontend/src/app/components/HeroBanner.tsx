import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const banners = [
  {
    id: 1,
    bg: "from-blue-900 to-blue-700",
    title: "Up to 70% Off",
    subtitle: "Electronics & Gadgets",
    description: "Laptops, Smartphones, Tablets & More",
    cta: "Shop Now",
    badge: "Great Indian Sale",
    badgeColor: "#FF9900",
    image: "https://images.unsplash.com/photo-1658124974726-d96bc44783cf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYXB0b3AlMjBjb21wdXRlciUyMHRlY2hub2xvZ3klMjBkZXNrfGVufDF8fHx8MTc3MzI4ODQ4NHww&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: 2,
    bg: "from-purple-900 to-pink-700",
    title: "New Arrivals",
    subtitle: "Fashion & Lifestyle",
    description: "Trending Styles for Every Occasion",
    cta: "Explore Now",
    badge: "New Collection",
    badgeColor: "#FF9900",
    image: "https://images.unsplash.com/photo-1763771522867-c26bf75f12bc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwY2xvdGhpbmclMjBhcHBhcmVsfGVufDF8fHx8MTc3MzI3NDE4NHww&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: 3,
    bg: "from-green-900 to-teal-700",
    title: "Home Makeover",
    subtitle: "Home & Kitchen",
    description: "Transform Your Living Space Today",
    cta: "Shop Now",
    badge: "Mega Deals",
    badgeColor: "#FF9900",
    image: "https://images.unsplash.com/photo-1740803292374-1b167c1558b1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob21lJTIwa2l0Y2hlbiUyMGFwcGxpYW5jZXN8ZW58MXx8fHwxNzczMjQ0NDg3fDA&ixlib=rb-4.1.0&q=80&w=1080",
  },
];

export function HeroBanner() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % banners.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const prev = () => setCurrent((c) => (c - 1 + banners.length) % banners.length);
  const next = () => setCurrent((c) => (c + 1) % banners.length);

  const banner = banners[current];

  return (
    <div className="relative overflow-hidden" style={{ height: "420px" }}>
      {/* Gradient overlay on sides for infinite feel */}
      <div
        className={`absolute inset-0 bg-gradient-to-r ${banner.bg} transition-all duration-700`}
      />

      {/* Background image */}
      <img
        src={banner.image}
        alt={banner.subtitle}
        className="absolute inset-0 w-full h-full object-cover opacity-40 transition-opacity duration-700"
      />

      {/* Left gradient fade */}
      <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-black/60 to-transparent z-10" />
      {/* Right gradient fade */}
      <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-black/60 to-transparent z-10" />

      {/* Content */}
      <div className="absolute inset-0 flex items-center justify-start z-20 px-16 md:px-24">
        <div className="text-white max-w-lg">
          <span
            style={{ backgroundColor: banner.badgeColor, color: "#000" }}
            className="inline-block px-3 py-1 rounded text-xs font-bold mb-3"
          >
            {banner.badge}
          </span>
          <h1 className="text-4xl md:text-5xl font-black mb-2 drop-shadow-lg">{banner.title}</h1>
          <h2 className="text-xl md:text-2xl font-bold mb-1 drop-shadow">{banner.subtitle}</h2>
          <p className="text-gray-200 mb-6 text-sm md:text-base">{banner.description}</p>
          <button
            style={{ backgroundColor: "#FF9900" }}
            className="px-8 py-3 rounded text-black font-bold hover:brightness-90 transition-all shadow-lg"
          >
            {banner.cta}
          </button>
        </div>
      </div>

      {/* Prev/Next Buttons */}
      <button
        onClick={prev}
        className="absolute left-2 top-1/2 -translate-y-1/2 z-30 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-all"
      >
        <ChevronLeft size={24} className="text-gray-800" />
      </button>
      <button
        onClick={next}
        className="absolute right-2 top-1/2 -translate-y-1/2 z-30 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-all"
      >
        <ChevronRight size={24} className="text-gray-800" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-30">
        {banners.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-2.5 h-2.5 rounded-full transition-all ${
              i === current ? "bg-orange-400 w-6" : "bg-white/60"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
