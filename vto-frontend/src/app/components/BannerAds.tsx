const banners = [
  {
    id: 1,
    title: "Amazon Prime",
    subtitle: "Unlimited FREE fast delivery, exclusive deals & more",
    cta: "Try Prime Free",
    bg: "from-blue-800 to-blue-600",
    textColor: "text-white",
    image: "https://images.unsplash.com/photo-1658124974726-d96bc44783cf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYXB0b3AlMjBjb21wdXRlciUyMHRlY2hub2xvZ3klMjBkZXNrfGVufDF8fHx8MTc3MzI4ODQ4NHww&ixlib=rb-4.1.0&q=80&w=600",
  },
  {
    id: 2,
    title: "Sell on Amazon",
    subtitle: "Reach millions of customers. Start your business today.",
    cta: "Start Selling",
    bg: "from-orange-500 to-yellow-400",
    textColor: "text-gray-900",
    image: "https://images.unsplash.com/photo-1759572985980-c9af2f1ae4af?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcG9ydHMlMjBmaXRuZXNzJTIwZXF1aXBtZW50JTIwb3V0ZG9vcnxlbnwxfHx8fDE3NzMyODg0ODN8MA&ixlib=rb-4.1.0&q=80&w=600",
  },
];

export function BannerAds() {
  return (
    <section className="max-w-[1500px] mx-auto px-4 py-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {banners.map((banner) => (
          <div
            key={banner.id}
            className={`relative overflow-hidden rounded-xl bg-gradient-to-r ${banner.bg} h-36 flex items-center cursor-pointer group`}
          >
            <img
              src={banner.image}
              alt={banner.title}
              className="absolute inset-0 w-full h-full object-cover opacity-20 group-hover:opacity-30 transition-opacity"
            />
            <div className={`relative z-10 px-6 ${banner.textColor}`}>
              <h3 className="text-lg font-black mb-1">{banner.title}</h3>
              <p className="text-sm opacity-90 mb-3">{banner.subtitle}</p>
              <button
                className="px-4 py-1.5 rounded text-sm font-bold bg-white text-gray-900 hover:bg-gray-100 transition-colors shadow"
              >
                {banner.cta}
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
