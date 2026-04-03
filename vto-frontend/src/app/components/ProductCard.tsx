import { Star, ShoppingCart, Heart } from "lucide-react";
import { useState } from "react";
import { TryOnButton } from "./vto/TryOnButton";
import { type VTOType } from "./vto/types";

interface Product {
  id: number;
  name: string;
  brand: string;
  price: number;
  originalPrice: number;
  discount: number;
  rating: number;
  reviewCount: number;
  image: string;
  badge?: string;
  prime?: boolean;
  vtoSupported?: boolean;
  vtoType?: VTOType;
}

interface ProductCardProps {
  product: Product;
  onTryOn?: () => void;
  onProductClick?: () => void;
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={12}
          className={star <= Math.round(rating) ? "text-orange-400 fill-orange-400" : "text-gray-300 fill-gray-300"}
        />
      ))}
    </div>
  );
}

export function ProductCard({ product, onTryOn, onProductClick }: ProductCardProps) {
  const [wishlisted, setWishlisted] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);

  const handleAddToCart = (e: { stopPropagation: () => void }) => {
    e.stopPropagation();
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const handleWishlist = (e: { stopPropagation: () => void }) => {
    e.stopPropagation();
    setWishlisted(!wishlisted);
  };

  return (
    <div
      className="bg-white rounded-lg border border-gray-200 hover:shadow-xl transition-all duration-300 overflow-hidden group relative flex flex-col cursor-pointer"
      onClick={onProductClick}
    >
      {/* Badge */}
      {product.badge && (
        <div
          className="absolute top-2 left-2 z-10 px-2 py-0.5 rounded text-xs font-bold text-white"
          style={{ backgroundColor: product.badge === "Best Seller" ? "#FF9900" : product.badge === "Amazon's Choice" ? "#00A8E1" : "#CC0C39" }}
        >
          {product.badge}
        </div>
      )}

      {/* Wishlist */}
      <button
        onClick={handleWishlist}
        className="absolute top-2 right-2 z-10 bg-white rounded-full p-1.5 shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <Heart
          size={16}
          className={wishlisted ? "text-red-500 fill-red-500" : "text-gray-400"}
        />
      </button>

      {/* Image */}
      <div className="relative h-48 bg-gray-50 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />

        {/* VTO Button — bottom right of image */}
        {product.vtoSupported && onTryOn && (
          <div className="absolute bottom-2 right-2 z-20">
            <TryOnButton onClick={(e) => { e.stopPropagation(); onTryOn(); }} size="sm" />
          </div>
        )}

        {/* VTO badge indicator */}
        {product.vtoSupported && (
          <div
            className="absolute bottom-2 left-2 z-10 px-1.5 py-0.5 rounded flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity"
            style={{ backgroundColor: 'rgba(255,153,0,0.9)' }}
          >
            <span className="text-black text-xs font-bold" style={{ fontSize: 9 }}>✦ TRY ON</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-3 flex flex-col flex-1">
        <p className="text-xs text-gray-500 mb-0.5">{product.brand}</p>
        <h3 className="text-sm text-gray-800 mb-1 line-clamp-2 flex-1">{product.name}</h3>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-2">
          <StarRating rating={product.rating} />
          <span className="text-xs" style={{ color: "#007185" }}>({product.reviewCount.toLocaleString()})</span>
        </div>

        {/* Price */}
        <div className="mb-2">
          <div className="flex items-baseline gap-1 flex-wrap">
            <span className="text-xs text-gray-500">₹</span>
            <span className="text-lg font-bold text-gray-900">{product.price.toLocaleString()}</span>
            {product.originalPrice > product.price && (
              <span className="text-xs text-gray-400 line-through ml-1">₹{product.originalPrice.toLocaleString()}</span>
            )}
          </div>
          {product.discount > 0 && (
            <span className="text-xs text-green-600 font-medium">Save {product.discount}%</span>
          )}
        </div>

        {/* Prime */}
        {product.prime && (
          <div className="flex items-center gap-1 mb-2">
            <span className="text-xs font-bold text-blue-700 italic">prime</span>
            <span className="text-xs text-gray-500">FREE Delivery</span>
          </div>
        )}

        {/* Add to Cart */}
        <button
          onClick={handleAddToCart}
          style={{ backgroundColor: addedToCart ? "#46A049" : "#FFD814", borderColor: addedToCart ? "#46A049" : "#FFA41C" }}
          className="w-full py-1.5 rounded-full text-sm font-medium border transition-all flex items-center justify-center gap-1 text-gray-900 hover:brightness-95"
        >
          <ShoppingCart size={14} />
          {addedToCart ? "Added!" : "Add to Cart"}
        </button>
      </div>
    </div>
  );
}

export type { Product };