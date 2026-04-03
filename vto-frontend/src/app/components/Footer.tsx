import { ChevronUp } from "lucide-react";

const footerLinks = [
  {
    title: "Get to Know Us",
    links: ["About Amazon", "Careers", "Press Releases", "Amazon Cares", "Gift a Smile", "Amazon Science"],
  },
  {
    title: "Connect with Us",
    links: ["Facebook", "Twitter", "Instagram"],
  },
  {
    title: "Make Money with Us",
    links: ["Sell on Amazon", "Sell under Amazon Accelerator", "Amazon Associates", "Fulfilment by Amazon", "Advertise Your Products", "Amazon Pay on Merchants"],
  },
  {
    title: "Let Us Help You",
    links: ["COVID-19 and Amazon", "Your Account", "Returns Centre", "100% Purchase Protection", "Amazon App Download", "Amazon Assistant Download", "Help"],
  },
];

export function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer>
      {/* Back to Top */}
      <button
        onClick={scrollToTop}
        className="w-full py-3 text-white text-sm hover:opacity-90 transition-opacity"
        style={{ backgroundColor: "#37475A" }}
      >
        <div className="flex items-center justify-center gap-1">
          <ChevronUp size={16} />
          Back to top
        </div>
      </button>

      {/* Main Footer */}
      <div style={{ backgroundColor: "#232F3E" }} className="py-10">
        <div className="max-w-[1500px] mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {footerLinks.map((section) => (
              <div key={section.title}>
                <h3 className="text-white font-bold text-sm mb-3">{section.title}</h3>
                <ul className="space-y-2">
                  {section.links.map((link) => (
                    <li key={link}>
                      <a href="#" className="text-gray-400 text-sm hover:text-white transition-colors">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Sub Footer */}
      <div style={{ backgroundColor: "#131921" }} className="py-6">
        <div className="max-w-[1500px] mx-auto px-4">
          {/* Logo */}
          <div className="flex justify-center mb-4">
            <div className="cursor-pointer">
              <span className="text-white text-xl font-black tracking-tight">amazon</span>
              <span style={{ color: "#FF9900" }} className="text-xl font-black">.in</span>
            </div>
          </div>

          {/* Links */}
          <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 mb-4">
            {["Conditions of Use & Sale", "Privacy Notice", "Interest-Based Ads"].map((link) => (
              <a key={link} href="#" className="text-gray-400 text-xs hover:text-white transition-colors">
                {link}
              </a>
            ))}
          </div>

          {/* Copyright */}
          <p className="text-gray-500 text-xs text-center">
            © 1996–2026, Amazon.com, Inc. or its affiliates
          </p>

          {/* Country Selector */}
          <div className="flex justify-center mt-3">
            <button className="border border-gray-500 text-gray-400 text-xs px-3 py-1.5 rounded flex items-center gap-2 hover:border-white hover:text-white transition-colors">
              🌐 India
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
