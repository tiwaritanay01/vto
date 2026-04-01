import { useState, useCallback, useEffect } from "react";
import { Header } from "./components/Header";
import { NavBar } from "./components/NavBar";
import { HeroBanner } from "./components/HeroBanner";
import { PromoStrip } from "./components/PromoStrip";
import { CategoryGrid } from "./components/CategoryGrid";
import { DealsSection } from "./components/DealsSection";
import { BannerAds } from "./components/BannerAds";
import { RecommendedSection } from "./components/RecommendedSection";
import { Footer } from "./components/Footer";
import { VTOModal, type VTOProduct } from "./components/vto/VTOModal";
import { ProductDetailPage } from "./components/ProductDetailPage";
import { VTOWireframe } from "./components/VTOWireframe";
import { VTODesignBrief } from "./components/VTODesignBrief";
import { type Product } from "./components/ProductCard";
import { type VTOVariant } from "./components/vto/types";
import { type VTOType } from "./components/vto/types";

// Cart notification component
function CartToast({ message, onDone }: { message: string; onDone: () => void }) {
  useEffect(() => {
    const t = setTimeout(onDone, 3000);
    return () => clearTimeout(t);
  }, [onDone]);
  return (
    <div
      className="fixed top-20 right-4 z-[200] px-4 py-3 rounded-xl shadow-2xl flex items-center gap-3"
      style={{
        background: 'rgba(22,163,74,0.95)',
        backdropFilter: 'blur(10px)',
        animation: 'slideInRight 0.3s ease-out',
        maxWidth: 300,
      }}
    >
      <span className="text-lg">🛒</span>
      <span className="text-white text-sm font-semibold">{message}</span>
      <style>{`
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(40px); }
          to { opacity: 1; transform: translateX(0); }
        }
      `}</style>
    </div>
  );
}

// Cast product to VTOProduct
function toVTOProduct(product: Product): VTOProduct {
  return {
    id: product.id,
    name: product.name,
    brand: product.brand,
    price: product.price,
    image: product.image,
    vtoType: (product.vtoType as VTOType) || 'makeup',
  };
}

export default function App() {
  // View state: 'home' | 'detail' | 'vto' | 'wireframe' | 'brief'
  const [view, setView] = useState<'home' | 'detail' | 'wireframe' | 'brief'>('brief');
  const [vtoOpen, setVtoOpen] = useState(false);
  const [activeProduct, setActiveProduct] = useState<Product | null>(null);
  const [cartToast, setCartToast] = useState<string | null>(null);

  const openTryOn = useCallback((product: Product) => {
    setActiveProduct(product);
    setVtoOpen(true);
  }, []);

  const openDetail = useCallback((product: Product) => {
    setActiveProduct(product);
    setView('detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const closeVTO = useCallback(() => {
    setVtoOpen(false);
  }, []);

  const handleVTOAddToCart = useCallback((variant: VTOVariant) => {
    if (activeProduct) {
      setCartToast(`${activeProduct.brand} (${variant.label}) added!`);
    }
  }, [activeProduct]);

  const handleBackToHome = useCallback(() => {
    setView('home');
    setActiveProduct(null);
  }, []);

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#EAEDED" }}>
      {/* ── DESIGN BRIEF VIEW ── */}
      {view === 'brief' && (
        <>
          <div className="bg-gray-900 border-b border-gray-800 px-4 py-3 flex items-center justify-between">
            <h1 className="text-lg font-semibold text-white">B2B VTO Design Brief</h1>
            <div className="flex gap-2">
              <button
                onClick={() => setView('wireframe')}
                className="px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-600 transition-colors"
              >
                View Wireframe
              </button>
              <button
                onClick={() => setView('home')}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
              >
                View Live Demo
              </button>
            </div>
          </div>
          <VTODesignBrief />
        </>
      )}

      {/* ── WIREFRAME VIEW ── */}
      {view === 'wireframe' && (
        <>
          <div className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
            <h1 className="text-lg font-semibold text-gray-800">VTO System Wireframe</h1>
            <div className="flex gap-2">
              <button
                onClick={() => setView('brief')}
                className="px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-600 transition-colors"
              >
                View Design Brief
              </button>
              <button
                onClick={() => setView('home')}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
              >
                View Live Demo
              </button>
            </div>
          </div>
          <VTOWireframe />
        </>
      )}

      {/* ── HOME VIEW ── */}
      {view === 'home' && (
        <>
          <Header />
          <NavBar />
          <main>
            <HeroBanner />
            <PromoStrip />
            <CategoryGrid />
            <DealsSection onTryOn={openTryOn} onProductClick={openDetail} />
            <BannerAds />
            <RecommendedSection onTryOn={openTryOn} onProductClick={openDetail} />
          </main>
          <Footer />
        </>
      )}

      {/* ── PRODUCT DETAIL VIEW ── */}
      {view === 'detail' && activeProduct && (
        <ProductDetailPage
          product={activeProduct as Product & { vtoType?: VTOType }}
          onBack={handleBackToHome}
          onTryOn={() => openTryOn(activeProduct)}
        />
      )}

      {/* ── VTO MODAL (renders over any view) ── */}
      {vtoOpen && activeProduct && activeProduct.vtoType && (
        <VTOModal
          product={toVTOProduct(activeProduct)}
          onClose={closeVTO}
          onAddToCart={handleVTOAddToCart}
        />
      )}

      {/* ── CART TOAST ── */}
      {cartToast && (
        <CartToast
          message={cartToast}
          onDone={() => setCartToast(null)}
        />
      )}
    </div>
  );
}