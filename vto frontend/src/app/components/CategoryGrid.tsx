const categories = [
  {
    id: 1,
    title: "Electronics",
    image: "https://images.unsplash.com/photo-1762028892204-2ef68f7fcfd5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVjdHJvbmljcyUyMGhlYWRwaG9uZXMlMjBnYWRnZXRzfGVufDF8fHx8MTc3MzI4ODQ4Mnww&ixlib=rb-4.1.0&q=80&w=400",
    link: "#",
  },
  {
    id: 2,
    title: "Fashion",
    image: "https://images.unsplash.com/photo-1763771522867-c26bf75f12bc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwY2xvdGhpbmclMjBhcHBhcmVsfGVufDF8fHx8MTc3MzI3NDE4NHww&ixlib=rb-4.1.0&q=80&w=400",
    link: "#",
  },
  {
    id: 3,
    title: "Home & Kitchen",
    image: "https://images.unsplash.com/photo-1740803292374-1b167c1558b1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob21lJTIwa2l0Y2hlbiUyMGFwcGxpYW5jZXN8ZW58MXx8fHwxNzczMjQ0NDg3fDA&ixlib=rb-4.1.0&q=80&w=400",
    link: "#",
  },
  {
    id: 4,
    title: "Books",
    image: "https://images.unsplash.com/photo-1716654716572-7b13ad56ba63?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib29rcyUyMHJlYWRpbmclMjBsaWJyYXJ5fGVufDF8fHx8MTc3MzIwMTYwNnww&ixlib=rb-4.1.0&q=80&w=400",
    link: "#",
  },
  {
    id: 5,
    title: "Sports & Outdoors",
    image: "https://images.unsplash.com/photo-1759572985980-c9af2f1ae4af?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcG9ydHMlMjBmaXRuZXNzJTIwZXF1aXBtZW50JTIwb3V0ZG9vcnxlbnwxfHx8fDE3NzMyODg0ODN8MA&ixlib=rb-4.1.0&q=80&w=400",
    link: "#",
  },
  {
    id: 6,
    title: "Beauty",
    image: "https://images.unsplash.com/photo-1590393802688-ab3fd7c186f2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWF1dHklMjBza2luY2FyZSUyMGNvc21ldGljcyUyMHByb2R1Y3R8ZW58MXx8fHwxNzczMjg4NDkzfDA&ixlib=rb-4.1.0&q=80&w=400",
    link: "#",
  },
  {
    id: 7,
    title: "Toys & Games",
    image: "https://images.unsplash.com/photo-1571584004609-3b9d08de5755?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0b3klMjBjaGlsZHJlbiUyMHBsYXlzZXQlMjBjb2xvcmZ1bHxlbnwxfHx8fDE3NzMyODg0OTN8MA&ixlib=rb-4.1.0&q=80&w=400",
    link: "#",
  },
  {
    id: 8,
    title: "Gaming",
    image: "https://images.unsplash.com/photo-1665592512676-840f7b669aeb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYW1pbmclMjBjb25zb2xlJTIwY29udHJvbGxlciUyMHZpZGVvJTIwZ2FtZXxlbnwxfHx8fDE3NzMyODg0ODh8MA&ixlib=rb-4.1.0&q=80&w=400",
    link: "#",
  },
];

export function CategoryGrid() {
  return (
    <section className="max-w-[1500px] mx-auto px-4 py-6">
      <h2 className="text-xl font-bold text-gray-900 mb-4">Shop by Category</h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
        {categories.map((cat) => (
          <a
            key={cat.id}
            href={cat.link}
            className="flex flex-col items-center group cursor-pointer"
          >
            <div className="w-full aspect-square rounded-full overflow-hidden border-2 border-gray-200 group-hover:border-orange-400 transition-all mb-2 shadow-sm">
              <img
                src={cat.image}
                alt={cat.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <span className="text-xs text-center text-gray-700 font-medium group-hover:text-orange-500 transition-colors">
              {cat.title}
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}
