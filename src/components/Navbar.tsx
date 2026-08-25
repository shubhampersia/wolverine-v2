import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import logo from "@/assets/wolverine-logo.jpg";

const navLinks = [
  { label: "About Us", path: "/about" },
  { label: "Services", path: "/services" },
  { label: "Industries", path: "/industries" },
  { label: "Blog", path: "/blog" },
  { label: "Contact Us", path: "/contact" },
];

const Navbar = () => {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
<nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200">
  <div className="max-w-7xl mx-auto px-8 h-16 flex items-center">
    
    {/* Logo */}
    <Link to="/" className="flex items-center gap-3">
      <img
        src={logo}
        alt="Wolverine Logo"
        width={40}
        height={40}
        className="w-10 h-10 object-contain"
      />

      <span className="font-semibold text-lg tracking-wide text-gray-900">
        WOLVERINE
      </span>
    </Link>

    <div className="flex-1" />

    {/* Desktop Navigation */}
    <div className="hidden md:flex items-center gap-10">
      {navLinks.map((link) => (
        <Link
          key={link.path}
          to={link.path}
          className={`relative text-sm font-medium transition-colors duration-200 ${
            location.pathname === link.path
              ? "text-gray-900"
              : "text-gray-600 hover:text-gray-900"
          }`}
        >
          {link.label}

          <span
            className={`absolute -bottom-1 left-0 h-[2px] bg-yellow-400 transition-all duration-300 ${
              location.pathname === link.path
                ? "w-full"
                : "w-0"
            }`}
          />
        </Link>
      ))}
    </div>

    {/* Mobile Menu Button */}
    <button
      className="md:hidden text-gray-900"
      onClick={() => setMobileOpen(!mobileOpen)}
      aria-label="Toggle menu"
    >
      {mobileOpen ? <X size={24} /> : <Menu size={24} />}
    </button>
  </div>
</nav>
  );
};

export default Navbar;