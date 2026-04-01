import { ProductCard, type Product } from "./ProductCard";

const recommendedProducts: Product[] = [
  {
    id: 101,
    name: "Apple MacBook Air 13-inch M3 Chip 8GB RAM 256GB SSD",
    brand: "Apple",
    price: 114900,
    originalPrice: 119900,
    discount: 4,
    rating: 4.8,
    reviewCount: 3421,
    image: "https://images.unsplash.com/photo-1658124974726-d96bc44783cf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYXB0b3AlMjBjb21wdXRlciUyMHRlY2hub2xvZ3klMjBkZXNrfGVufDF8fHx8MTc3MzI4ODQ4NHww&ixlib=rb-4.1.0&q=80&w=400",
    badge: "Amazon's Choice",
    prime: true,
  },
  {
    id: 102,
    name: "Levi's Men's 511 Slim Jeans Dark Blue Stretch Comfort Fit",
    brand: "Levi's",
    price: 2299,
    originalPrice: 3799,
    discount: 39,
    rating: 4.3,
    reviewCount: 18934,
    image: "https://images.unsplash.com/photo-1763771522867-c26bf75f12bc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwY2xvdGhpbmclMjBhcHBhcmVsfGVufDF8fHx8MTc3MzI3NDE4NHww&ixlib=rb-4.1.0&q=80&w=400",
    prime: true,
  },
  {
    id: 103,
    name: "Prestige Smart Plus 10 Induction Cooktop with Auto Shut Off",
    brand: "Prestige",
    price: 3495,
    originalPrice: 5500,
    discount: 36,
    rating: 4.2,
    reviewCount: 7823,
    image: "https://images.unsplash.com/photo-1740803292374-1b167c1558b1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob21lJTIwa2l0Y2hlbiUyMGFwcGxpYW5jZXN8ZW58MXx8fHwxNzczMjQ0NDg3fDA&ixlib=rb-4.1.0&q=80&w=400",
    prime: false,
  },
  {
    id: 104,
    name: "Atomic Habits Paperback – An Easy & Proven Way to Build Good Habits",
    brand: "Random House",
    price: 299,
    originalPrice: 599,
    discount: 50,
    rating: 4.7,
    reviewCount: 52341,
    image: "https://images.unsplash.com/photo-1716654716572-7b13ad56ba63?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib29rcyUyMHJlYWRpbmclMjBsaWJyYXJ5fGVufDF8fHx8MTc3MzIwMTYwNnww&ixlib=rb-4.1.0&q=80&w=400",
    badge: "Best Seller",
    prime: true,
  },
  {
    id: 105,
    name: "LEGO Creator 3-in-1 Ocean Creatures Building Set for Kids Age 7+",
    brand: "LEGO",
    price: 1699,
    originalPrice: 2499,
    discount: 32,
    rating: 4.6,
    reviewCount: 9812,
    image: "https://images.unsplash.com/photo-1571584004609-3b9d08de5755?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0b3klMjBjaGlsZHJlbiUyMHBsYXlzZXQlMjBjb2xvcmZ1bHxlbnwxfHx8fDE3NzMyODg0OTN8MA&ixlib=rb-4.1.0&q=80&w=400",
    prime: true,
  },
  {
    id: 106,
    name: "Decathlon Fitness Running Shoes Breathable Lightweight Men",
    brand: "Decathlon",
    price: 1799,
    originalPrice: 2999,
    discount: 40,
    rating: 4.4,
    reviewCount: 31204,
    image: "https://images.unsplash.com/photo-1719523677291-a395426c1a87?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxydW5uaW5nJTIwc2hvZXMlMjBzbmVha2VycyUyMHByb2R1Y3R8ZW58MXx8fHwxNzczMjUwMjk1fDA&ixlib=rb-4.1.0&q=80&w=400",
    prime: true,
    vtoSupported: true,
    vtoType: "shoes",
  },
  {
    id: 107,
    name: "Maybelline New York Fit Me Matte + Poreless Liquid Foundation",
    brand: "Maybelline",
    price: 349,
    originalPrice: 520,
    discount: 33,
    rating: 4.3,
    reviewCount: 43621,
    image: "https://images.unsplash.com/photo-1590393802688-ab3fd7c186f2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWF1dHklMjBza2luY2FyZSUyMGNvc21ldGljcyUyMHByb2R1Y3R8ZW58MXx8fHwxNzczMjg4NDkzfDA&ixlib=rb-4.1.0&q=80&w=400",
    badge: "Amazon's Choice",
    prime: true,
    vtoSupported: true,
    vtoType: "makeup",
  },
  {
    id: 108,
    name: "Corsair K55 RGB PRO Gaming Keyboard Quiet Membrane Keys LED Backlit",
    brand: "Corsair",
    price: 4999,
    originalPrice: 7999,
    discount: 38,
    rating: 4.5,
    reviewCount: 6731,
    image: "https://images.unsplash.com/photo-1665592512676-840f7b669aeb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYW1pbmclMjBjb25zb2xlJTIwY29udHJvbGxlciUyMHZpZGVvJTIwZ2FtZXxlbnwxfHx8fDE3NzMyODg0ODh8MA&ixlib=rb-4.1.0&q=80&w=400",
    prime: true,
  },
];

interface RecommendedSectionProps {
  onTryOn?: (product: Product) => void;
  onProductClick?: (product: Product) => void;
}

export function RecommendedSection({ onTryOn, onProductClick }: RecommendedSectionProps) {
  return (
    <section className="max-w-[1500px] mx-auto px-4 py-4">
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Recommended for You</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 gap-4">
          {recommendedProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onTryOn={product.vtoSupported && onTryOn ? () => onTryOn(product) : undefined}
              onProductClick={onProductClick ? () => onProductClick(product) : undefined}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
