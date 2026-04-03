import { Truck, RefreshCcw, ShieldCheck, Headphones } from "lucide-react";

const promos = [
  {
    icon: Truck,
    title: "Free Delivery",
    description: "On orders over ₹499",
  },
  {
    icon: RefreshCcw,
    title: "Easy Returns",
    description: "10-day return policy",
  },
  {
    icon: ShieldCheck,
    title: "Secure Payment",
    description: "100% protected checkout",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description: "Dedicated customer care",
  },
];

export function PromoStrip() {
  return (
    <div className="bg-white border-t border-b border-gray-200 py-3">
      <div className="max-w-[1500px] mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {promos.map((promo) => (
            <div key={promo.title} className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
                style={{ backgroundColor: "#FFF3CD" }}
              >
                <promo.icon size={20} style={{ color: "#FF9900" }} />
              </div>
              <div>
                <p className="text-sm font-bold text-gray-800">{promo.title}</p>
                <p className="text-xs text-gray-500">{promo.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
