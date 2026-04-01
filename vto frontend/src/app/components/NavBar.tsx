import { useState } from "react";
import { Menu } from "lucide-react";

const navItems = [
  { label: "All", icon: true },
  { label: "Today's Deals" },
  { label: "Buy Again" },
  { label: "Customer Service" },
  { label: "Registry" },
  { label: "Gift Cards" },
  { label: "Sell" },
  { label: "Amazon Pay" },
  { label: "Prime" },
  { label: "Electronics" },
  { label: "Home & Kitchen" },
  { label: "Fashion" },
  { label: "Books" },
  { label: "Mobiles" },
  { label: "Sports" },
  { label: "Automotive" },
];

export function NavBar() {
  const [activeItem, setActiveItem] = useState("Today's Deals");

  return (
    <nav style={{ backgroundColor: "#232F3E" }} className="w-full overflow-x-auto">
      <div className="max-w-[1500px] mx-auto flex items-center">
        <div className="flex items-center whitespace-nowrap">
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={() => setActiveItem(item.label)}
              className={`flex items-center gap-1 px-3 py-2 text-white text-sm font-medium border-2 transition-colors shrink-0 ${
                activeItem === item.label
                  ? "border-white"
                  : "border-transparent hover:border-white"
              }`}
            >
              {item.icon && <Menu size={16} />}
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}
