import { useState } from "react";
import {
  ChevronLeft, Star, ShoppingCart, Heart, Truck, Shield,
  RotateCcw, ChevronRight, Share2, Package, CheckCircle, Minus, Plus
} from "lucide-react";
import { type Product } from "./ProductCard";
import { TryOnButton } from "./vto/TryOnButton";
import { type VTOType } from "./vto/types";

interface ProductDetailProps {
  product: Product & { vtoType?: VTOType };
  onBack: () => void;
  onTryOn: () => void;
}

function StarRating({ rating, count }: { rating: number; count: number }) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((s) => (
          <Star
            key={s}
            size={14}
            className={s <= Math.round(rating) ? "text-orange-400 fill-orange-400" : "text-gray-200 fill-gray-200"}
          />
        ))}
      </div>
      <span className="text-sm" style={{ color: '#007185' }}>{rating.toFixed(1)}</span>
      <span className="text-sm text-gray-500">({count.toLocaleString()} ratings)</span>
    </div>
  );
}

const MOCK_REVIEWS = [
  {
    id: 1,
    name: "Priya S.",
    rating: 5,
    title: "Absolutely love it!",
    text: "The quality exceeded my expectations. Delivery was fast and the packaging was great. Would definitely recommend!",
    date: "2 days ago",
    verified: true,
  },
  {
    id: 2,
    name: "Rahul M.",
    rating: 4,
    title: "Great product, minor issue",
    text: "Overall very satisfied. The try-on feature helped me pick the right shade. Product matches exactly what was shown.",
    date: "1 week ago",
    verified: true,
  },
  {
    id: 3,
    name: "Anjali K.",
    rating: 5,
    title: "Best purchase this year!",
    text: "Used the Virtual Try-On feature before buying and it was spot on! The product arrived quickly and looks amazing.",
    date: "2 weeks ago",
    verified: true,
  },
];

export function ProductDetailPage({ product, onBack, onTryOn }: ProductDetailProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [wishlisted, setWishlisted] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);
  const [tryOnLoading, setTryOnLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'reviews' | 'delivery'>('overview');

  // Mock multiple images (use same product image with different overlays)
  const images = [product.image, product.image, product.image];

  const handleTryOn = (e: { stopPropagation: () => void }) => {
    e.stopPropagation();
    setTryOnLoading(true);
    setTimeout(() => {
      setTryOnLoading(false);
      onTryOn();
    }, 600);
  };

  const handleAddToCart = () => {
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2500);
  };

  const discount = product.discount || 0;

  return (
    <div
      className="min-h-screen bg-white flex flex-col"
      style={{ maxWidth: 600, margin: '0 auto', fontFamily: 'system-ui, -apple-system, sans-serif' }}
    >
      {/* Top Nav Bar */}
      <div
        className="sticky top-0 z-40 flex items-center gap-3 px-3 py-2.5"
        style={{ backgroundColor: '#131921', minHeight: 52 }}
      >
        <button
          onClick={onBack}
          className="flex items-center gap-1 text-white transition-opacity hover:opacity-75"
        >
          <ChevronLeft size={20} />
          <span className="text-sm">Back</span>
        </button>
        <div className="flex-1">
          <span className="text-white text-xs opacity-60">Amazon.in</span>
        </div>
        <button onClick={() => setWishlisted(v => !v)}>
          <Heart size={20} className={wishlisted ? "text-red-400 fill-red-400" : "text-white"} />
        </button>
        <button>
          <Share2 size={20} className="text-white" />
        </button>
        <div className="relative">
          <ShoppingCart size={22} className="text-white" />
          <span
            className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full text-black flex items-center justify-center"
            style={{ fontSize: 9, fontWeight: 700, backgroundColor: '#FF9900' }}
          >
            3
          </span>
        </div>
      </div>

      {/* Image Gallery */}
      <div className="relative bg-white" style={{ aspectRatio: '4/3.2' }}>
        {/* Main image */}
        <img
          src={images[selectedImage]}
          alt={product.name}
          className="w-full h-full object-cover"
        />

        {/* Gradient overlay at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white/60 to-transparent" />

        {/* Navigation arrows */}
        {selectedImage > 0 && (
          <button
            onClick={() => setSelectedImage(i => i - 1)}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/85 rounded-full p-1.5 shadow-md"
          >
            <ChevronLeft size={18} className="text-gray-700" />
          </button>
        )}
        {selectedImage < images.length - 1 && (
          <button
            onClick={() => setSelectedImage(i => i + 1)}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/85 rounded-full p-1.5 shadow-md"
          >
            <ChevronRight size={18} className="text-gray-700" />
          </button>
        )}

        {/* Dot indicators */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setSelectedImage(i)}
              className="rounded-full transition-all"
              style={{
                width: i === selectedImage ? 20 : 7,
                height: 7,
                backgroundColor: i === selectedImage ? '#FF9900' : 'rgba(0,0,0,0.3)',
              }}
            />
          ))}
        </div>

        {/* Badge */}
        {product.badge && (
          <div
            className="absolute top-3 left-3 px-2 py-0.5 rounded text-xs font-bold text-white shadow"
            style={{
              backgroundColor:
                product.badge === 'Best Seller' ? '#FF9900' :
                product.badge === "Amazon's Choice" ? '#007185' : '#CC0C39',
            }}
          >
            {product.badge}
          </div>
        )}

        {/* Thumbnail strip */}
        <div className="absolute right-2 top-3 flex flex-col gap-2">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setSelectedImage(i)}
              className="rounded-lg overflow-hidden transition-all"
              style={{
                width: 44,
                height: 44,
                border: i === selectedImage ? '2px solid #FF9900' : '2px solid rgba(0,0,0,0.08)',
                boxShadow: '0 1px 4px rgba(0,0,0,0.12)',
              }}
            >
              <img src={img} alt="" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 px-4 pt-4 pb-32">
        {/* Brand & Name */}
        <p className="text-sm font-medium mb-0.5" style={{ color: '#007185' }}>{product.brand}</p>
        <h1 className="text-gray-900 mb-2" style={{ fontSize: 17, lineHeight: 1.4, fontWeight: 600 }}>
          {product.name}
        </h1>

        {/* Rating */}
        <div className="mb-3">
          <StarRating rating={product.rating} count={product.reviewCount} />
        </div>

        {/* Divider */}
        <div className="border-t border-gray-100 my-3" />

        {/* Price */}
        <div className="mb-1">
          <div className="flex items-baseline gap-2 flex-wrap">
            <span className="text-2xl font-bold text-gray-900">₹{product.price.toLocaleString()}</span>
            {product.originalPrice > product.price && (
              <span className="text-sm text-gray-400 line-through">M.R.P: ₹{product.originalPrice.toLocaleString()}</span>
            )}
            {discount > 0 && (
              <span className="text-sm font-bold text-green-600">({discount}% off)</span>
            )}
          </div>
          <p className="text-xs text-gray-500 mt-0.5">Inclusive of all taxes</p>
        </div>

        {product.prime && (
          <div className="flex items-center gap-2 mt-2 mb-1">
            <span className="text-sm font-bold text-blue-700 italic">prime</span>
            <span className="text-xs text-gray-600">FREE delivery</span>
            <span className="text-xs font-bold text-gray-800">Tomorrow, 13 Mar</span>
          </div>
        )}

        {/* ─── VIRTUAL TRY-ON SECTION ─── */}
        {product.vtoType && (
          <div
            className="my-4 rounded-2xl p-4"
            style={{
              background: 'linear-gradient(135deg, #FFF8EE 0%, #FFF3E0 100%)',
              border: '1.5px solid rgba(255,153,0,0.3)',
            }}
          >
            <div className="flex items-start gap-3">
              {/* Icon */}
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                style={{ background: 'linear-gradient(135deg, #FF9900, #FF6600)' }}
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                  <circle cx="12" cy="13" r="4" />
                </svg>
              </div>
              {/* Text */}
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="text-sm font-bold text-gray-900">Virtual Try-On</span>
                  <span
                    className="px-1.5 py-0.5 rounded text-white"
                    style={{ fontSize: 9, fontWeight: 700, backgroundColor: '#FF9900', letterSpacing: '0.04em' }}
                  >
                    AR
                  </span>
                </div>
                <p className="text-xs text-gray-600 mb-3 leading-relaxed">
                  See how this looks on you before buying — try different colors instantly.
                </p>
                <TryOnButton onClick={handleTryOn} loading={tryOnLoading} size="md" />
              </div>
            </div>
          </div>
        )}

        {/* Quantity selector */}
        <div className="flex items-center gap-3 mb-4">
          <span className="text-sm text-gray-600">Qty:</span>
          <div className="flex items-center border border-gray-200 rounded-full overflow-hidden">
            <button
              onClick={() => setQuantity(q => Math.max(1, q - 1))}
              className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors"
            >
              <Minus size={14} />
            </button>
            <span className="w-8 text-center text-sm font-bold text-gray-800">{quantity}</span>
            <button
              onClick={() => setQuantity(q => Math.min(10, q + 1))}
              className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors"
            >
              <Plus size={14} />
            </button>
          </div>
          <span className="text-xs text-gray-500">In Stock</span>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-green-500" />
            <span className="text-xs text-green-600 font-medium">Available</span>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col gap-2.5 mb-5">
          <button
            onClick={handleAddToCart}
            className="w-full py-3 rounded-full font-bold text-gray-900 flex items-center justify-center gap-2 transition-all active:scale-98"
            style={{
              backgroundColor: addedToCart ? '#46A049' : '#FFD814',
              border: '1px solid #FFA41C',
              color: addedToCart ? 'white' : '#111',
            }}
          >
            {addedToCart ? <CheckCircle size={18} /> : <ShoppingCart size={18} />}
            {addedToCart ? 'Added to Cart!' : 'Add to Cart'}
          </button>
          <button
            className="w-full py-3 rounded-full font-bold text-white transition-all active:scale-98"
            style={{ backgroundColor: '#FF9900', border: '1px solid #E67700' }}
          >
            Buy Now
          </button>
        </div>

        {/* Delivery Info */}
        <div
          className="rounded-xl p-3 mb-4"
          style={{ background: '#F0FFF4', border: '1px solid #BBF7D0' }}
        >
          <div className="flex items-center gap-2 mb-2">
            <Truck size={15} className="text-green-600" />
            <span className="text-sm font-semibold text-green-800">Free Delivery</span>
            {product.prime && <span className="text-xs text-blue-600 font-bold italic">prime</span>}
          </div>
          <p className="text-xs text-green-700">Delivers by <strong>Tomorrow, 13 Mar</strong> if ordered in the next 4h 22m</p>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-100 mb-4">
          <div className="flex gap-0">
            {(['overview', 'reviews', 'delivery'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className="flex-1 py-2.5 text-xs font-semibold capitalize transition-all"
                style={{
                  color: activeTab === tab ? '#FF9900' : '#6B7280',
                  borderBottom: activeTab === tab ? '2px solid #FF9900' : '2px solid transparent',
                }}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-gray-900">About this item</h3>
            <ul className="space-y-2">
              {[
                'Premium quality materials with attention to detail',
                'Tested for durability and long-lasting performance',
                'Compatible with all standard usage scenarios',
                'Backed by manufacturer\'s warranty',
                'Easy to use right out of the box',
              ].map((point, i) => (
                <li key={i} className="flex items-start gap-2">
                  <CheckCircle size={14} className="text-green-500 mt-0.5 shrink-0" />
                  <span className="text-sm text-gray-700">{point}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {activeTab === 'reviews' && (
          <div className="space-y-4">
            {/* Rating summary */}
            <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-xl">
              <div className="text-center">
                <div className="text-4xl font-black text-gray-900">{product.rating}</div>
                <div className="flex justify-center gap-0.5 my-1">
                  {[1,2,3,4,5].map(s => (
                    <Star key={s} size={10} className={s <= Math.round(product.rating) ? "text-orange-400 fill-orange-400" : "text-gray-300"} />
                  ))}
                </div>
                <div className="text-xs text-gray-500">{product.reviewCount.toLocaleString()} ratings</div>
              </div>
              <div className="flex-1">
                {[5,4,3,2,1].map(s => {
                  const pct = s === 5 ? 65 : s === 4 ? 22 : s === 3 ? 8 : s === 2 ? 3 : 2;
                  return (
                    <div key={s} className="flex items-center gap-2 mb-1">
                      <span className="text-xs text-gray-500 w-3">{s}</span>
                      <Star size={9} className="text-orange-400 fill-orange-400" />
                      <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full rounded-full" style={{ width: `${pct}%`, backgroundColor: '#FF9900' }} />
                      </div>
                      <span className="text-xs text-gray-400 w-6">{pct}%</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {MOCK_REVIEWS.map(r => (
              <div key={r.id} className="border-b border-gray-100 pb-4">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-orange-100 flex items-center justify-center text-xs font-bold text-orange-600">
                      {r.name[0]}
                    </div>
                    <span className="text-sm font-semibold text-gray-800">{r.name}</span>
                    {r.verified && (
                      <span className="text-xs text-green-600 flex items-center gap-0.5">
                        <CheckCircle size={10} /> Verified
                      </span>
                    )}
                  </div>
                  <span className="text-xs text-gray-400">{r.date}</span>
                </div>
                <div className="flex gap-0.5 mb-1">
                  {[1,2,3,4,5].map(s => (
                    <Star key={s} size={11} className={s <= r.rating ? "text-orange-400 fill-orange-400" : "text-gray-200"} />
                  ))}
                </div>
                <p className="text-xs font-semibold text-gray-800 mb-0.5">{r.title}</p>
                <p className="text-xs text-gray-600 leading-relaxed">{r.text}</p>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'delivery' && (
          <div className="space-y-4">
            {[
              { icon: Truck, title: 'Free Standard Delivery', desc: 'Estimated by Tomorrow, 13 Mar 2026', color: '#16a34a' },
              { icon: Package, title: 'Easy Returns', desc: '10-day hassle-free return policy. No questions asked.', color: '#2563eb' },
              { icon: Shield, title: 'Secure Checkout', desc: '100% purchase protection with Amazon A-to-Z Guarantee.', color: '#7c3aed' },
              { icon: RotateCcw, title: 'Exchange Available', desc: 'Not satisfied? Exchange within 7 days of delivery.', color: '#d97706' },
            ].map(({ icon: Icon, title, desc, color }) => (
              <div key={title} className="flex gap-3">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                  style={{ backgroundColor: `${color}18` }}
                >
                  <Icon size={18} style={{ color }} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-800">{title}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}