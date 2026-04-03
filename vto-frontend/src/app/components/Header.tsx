import { useState } from "react";
import { Search, ShoppingCart, MapPin, ChevronDown, Menu, X } from "lucide-react";

const categories = [
  "All Departments", "Arts & Crafts", "Automotive", "Baby", "Beauty & Personal Care",
  "Books", "Boys' Fashion", "Computers", "Deals", "Digital Music", "Electronics",
  "Girls' Fashion", "Health & Household", "Home & Kitchen", "Industrial & Scientific",
  "Kindle Store", "Luggage", "Men's Fashion", "Movies & TV", "Music, CDs & Vinyl",
  "Pet Supplies", "Prime Video", "Software", "Sports & Outdoors", "Tools & Home Improvement",
  "Toys & Games", "Video Games", "Women's Fashion"
];

export function Header() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [cartCount] = useState(3);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50">
      {/* Main Header */}
      <div style={{ backgroundColor: "#131921" }} className="px-4 py-2">
        <div className="max-w-[1500px] mx-auto flex items-center gap-2">
          {/* Logo */}
          <div className="flex items-center shrink-0 border-2 border-transparent hover:border-white rounded cursor-pointer p-1 mr-2">
            <span className="text-white text-2xl font-black tracking-tight">amazon</span>
            <span style={{ color: "#FF9900" }} className="text-2xl font-black">.in</span>
          </div>

          {/* Delivery Location */}
          <div className="hidden lg:flex flex-col cursor-pointer border-2 border-transparent hover:border-white rounded p-1 shrink-0">
            <span className="text-gray-400 text-xs">Deliver to</span>
            <div className="flex items-center gap-1">
              <MapPin size={14} className="text-white" />
              <span className="text-white text-sm font-bold">India</span>
            </div>
          </div>

          {/* Search Bar */}
          <div className="flex-1 flex min-w-0">
            <div className="flex w-full rounded-lg overflow-hidden">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="hidden md:block bg-gray-100 text-gray-700 text-xs px-2 py-0 border-r border-gray-300 cursor-pointer rounded-l-lg outline-none min-w-[100px] max-w-[130px]"
                style={{ fontSize: "12px" }}
              >
                <option>All</option>
                {categories.map((cat) => (
                  <option key={cat}>{cat}</option>
                ))}
              </select>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search Amazon.in"
                className="flex-1 px-4 py-2 text-sm outline-none text-gray-900 min-w-0"
              />
              <button
                style={{ backgroundColor: "#FF9900" }}
                className="px-4 py-2 hover:brightness-90 transition-all shrink-0"
              >
                <Search size={20} className="text-gray-900" />
              </button>
            </div>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-1 shrink-0 ml-2">
            {/* Language */}
            <div className="hidden xl:flex items-center gap-1 text-white cursor-pointer border-2 border-transparent hover:border-white rounded p-1">
              <span className="text-sm font-bold">EN</span>
              <ChevronDown size={12} />
            </div>

            {/* Account */}
            <div className="hidden sm:flex flex-col cursor-pointer border-2 border-transparent hover:border-white rounded p-1">
              <span className="text-gray-400 text-xs">Hello, Sign in</span>
              <div className="flex items-center gap-1">
                <span className="text-white text-sm font-bold">Account & Lists</span>
                <ChevronDown size={12} className="text-white" />
              </div>
            </div>

            {/* Orders */}
            <div className="hidden md:flex flex-col cursor-pointer border-2 border-transparent hover:border-white rounded p-1">
              <span className="text-gray-400 text-xs">Returns</span>
              <span className="text-white text-sm font-bold">& Orders</span>
            </div>

            {/* Cart */}
            <div className="flex items-center cursor-pointer border-2 border-transparent hover:border-white rounded p-1 relative">
              <div className="relative">
                <ShoppingCart size={32} className="text-white" />
                <span
                  style={{ backgroundColor: "#FF9900" }}
                  className="absolute -top-1 -right-1 text-black text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center"
                >
                  {cartCount}
                </span>
              </div>
              <span className="hidden md:block text-white text-sm font-bold ml-1 mt-3">Cart</span>
            </div>

            {/* Mobile Menu */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-white p-1 border-2 border-transparent hover:border-white rounded"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden mt-2 flex">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search Amazon.in"
            className="flex-1 px-4 py-2 text-sm outline-none text-gray-900 rounded-l-lg"
          />
          <button style={{ backgroundColor: "#FF9900" }} className="px-4 py-2 rounded-r-lg">
            <Search size={18} className="text-gray-900" />
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div style={{ backgroundColor: "#232F3E" }} className="md:hidden px-4 py-3 flex flex-col gap-3">
          <div className="text-white text-sm cursor-pointer hover:text-orange-400">Hello, Sign in</div>
          <div className="text-white text-sm cursor-pointer hover:text-orange-400">Account & Lists</div>
          <div className="text-white text-sm cursor-pointer hover:text-orange-400">Returns & Orders</div>
          <div className="text-white text-sm cursor-pointer hover:text-orange-400">Today's Deals</div>
          <div className="text-white text-sm cursor-pointer hover:text-orange-400">Customer Service</div>
        </div>
      )}
    </header>
  );
}
