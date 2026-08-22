import { Link } from "react-router-dom";

const productLinks = [
  { label: "Features", to: "/features" },
  { label: "Models", to: "/models" },
  { label: "Showcase", to: "/showcase" },
  { label: "Try the App", to: "/chat" },
];

const companyLinks = [
  { label: "About", to: "/about" },
  { label: "Team", to: "/team" },
];

function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black/30 backdrop-blur-md">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="md:col-span-2">
            <Link
              to="/"
              className="text-xl font-semibold text-white tracking-tight"
              style={{ fontFamily: "Josefin Sans, sans-serif" }}
            >
              Flanora AI
            </Link>
            <p
              className="mt-4 text-white/60 max-w-sm text-sm leading-relaxed"
              style={{ fontFamily: "Martel Sans, sans-serif" }}
            >
              AI-powered floor plan generation for architects, designers, and
              homeowners. Describe your space in natural language and receive
              professional layouts in seconds.
            </p>
          </div>

          <div>
            <h3
              className="text-sm font-semibold text-white uppercase tracking-wider mb-4"
              style={{ fontFamily: "Josefin Sans, sans-serif" }}
            >
              Product
            </h3>
            <ul className="space-y-3">
              {productLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm text-white/60 hover:text-white transition-colors"
                    style={{ fontFamily: "Martel Sans, sans-serif" }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3
              className="text-sm font-semibold text-white uppercase tracking-wider mb-4"
              style={{ fontFamily: "Josefin Sans, sans-serif" }}
            >
              Company
            </h3>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm text-white/60 hover:text-white transition-colors"
                    style={{ fontFamily: "Martel Sans, sans-serif" }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p
            className="text-sm text-white/40"
            style={{ fontFamily: "Martel Sans, sans-serif" }}
          >
            2024-{new Date().getFullYear()} Flanora AI. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
