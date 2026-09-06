import { Link, useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import logo from "@/assets/wolverine-logo.jpg";

const resourceLinks = [
  { label: "Automotive Component Manufacturers", path: "/automotive-component-manufacturers" },
  { label: "Auto Parts Manufacturers in India", path: "/auto-parts-manufacturers-india" },
];

const servicesDropdownPaths = ["/services", ...resourceLinks.map((r) => r.path)];

const navLinks = [
  { label: "About Us", path: "/about" },
  { label: "Industries", path: "/industries" },
  { label: "Blog", path: "/blog" },
  { label: "Contact Us", path: "/contact" },
];

const Navbar = () => {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [mobileResourcesOpen, setMobileResourcesOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  const isResourcesActive = resourceLinks.some((r) => location.pathname === r.path);
  const isServicesActive = location.pathname === "/services" || isResourcesActive;

  // Close the desktop dropdown(s) on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setServicesOpen(false);
        setResourcesOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
    setMobileServicesOpen(false);
    setMobileResourcesOpen(false);
    setServicesOpen(false);
    setResourcesOpen(false);
  }, [location.pathname]);

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
          {/* About Us */}
          <Link
            to={navLinks[0].path}
            className={`relative text-sm font-medium transition-colors duration-200 ${
              location.pathname === navLinks[0].path
                ? "text-gray-900"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            {navLinks[0].label}
            <span
              className={`absolute -bottom-1 left-0 h-[2px] bg-yellow-400 transition-all duration-300 ${
                location.pathname === navLinks[0].path ? "w-full" : "w-0"
              }`}
            />
          </Link>

          {/* Services dropdown trigger */}
          <div className="relative" ref={navRef}>
            <button
              onClick={() => setServicesOpen((o) => !o)}
              onMouseEnter={() => setServicesOpen(true)}
              className={`relative flex items-center gap-1 text-sm font-medium transition-colors duration-200 ${
                isServicesActive ? "text-gray-900" : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Services
              <ChevronDown
                size={14}
                className={`transition-transform duration-200 ${
                  servicesOpen ? "rotate-180" : ""
                }`}
              />
              <span
                className={`absolute -bottom-1 left-0 h-[2px] bg-yellow-400 transition-all duration-300 ${
                  isServicesActive ? "w-full" : "w-0"
                }`}
              />
            </button>

            {servicesOpen && (
              <div
                onMouseLeave={() => {
                  setServicesOpen(false);
                  setResourcesOpen(false);
                }}
                className="absolute left-0 top-full mt-3 w-64 rounded-xl border border-gray-200 bg-white shadow-lg overflow-hidden animate-in fade-in slide-in-from-top-1 duration-150"
              >
                <Link
                  to="/services"
                  onClick={() => setServicesOpen(false)}
                  className={`block px-5 py-3 text-sm font-semibold transition-colors ${
                    location.pathname === "/services"
                      ? "text-gray-900 bg-gray-50"
                      : "text-gray-800 hover:bg-gray-50"
                  }`}
                >
                  Solutions
                </Link>

                <div className="border-t border-gray-100" />

                {/* Resources — nested dropdown, expands downward in place */}
                <button
                  onClick={() => setResourcesOpen((o) => !o)}
                  className={`w-full flex items-center justify-between px-5 py-3 text-sm font-semibold transition-colors ${
                    isResourcesActive || resourcesOpen
                      ? "text-gray-900 bg-gray-50"
                      : "text-gray-800 hover:bg-gray-50"
                  }`}
                >
                  Resources
                  <ChevronDown
                    size={14}
                    className={`transition-transform duration-200 ${
                      resourcesOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {resourcesOpen && (
                  <div className="bg-gray-50/70 border-t border-gray-100 py-1 animate-in fade-in slide-in-from-top-1 duration-150">
                    {resourceLinks.map((link) => (
                      <Link
                        key={link.path}
                        to={link.path}
                        onClick={() => {
                          setServicesOpen(false);
                          setResourcesOpen(false);
                        }}
                        className={`block px-5 py-2.5 text-sm transition-colors ${
                          location.pathname === link.path
                            ? "text-gray-900 bg-gray-100"
                            : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                        }`}
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                )}
                <div className="h-1" />
              </div>
            )}
          </div>

          {/* Industries, Blog, Contact Us */}
          {navLinks.slice(1).map((link) => (
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
                  location.pathname === link.path ? "w-full" : "w-0"
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

      {/* Mobile Menu Panel */}
      {mobileOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white px-6 py-4 space-y-1 max-h-[calc(100vh-4rem)] overflow-y-auto">
          <Link
            to="/about"
            className={`block py-2.5 text-sm font-medium ${
              location.pathname === "/about" ? "text-gray-900" : "text-gray-600"
            }`}
          >
            About Us
          </Link>

          {/* Services (expandable) */}
          <button
            onClick={() => setMobileServicesOpen((o) => !o)}
            className={`w-full flex items-center justify-between py-2.5 text-sm font-medium ${
              isServicesActive ? "text-gray-900" : "text-gray-600"
            }`}
          >
            Services
            <ChevronDown
              size={16}
              className={`transition-transform duration-200 ${
                mobileServicesOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {mobileServicesOpen && (
            <div className="pl-4 border-l border-gray-200 space-y-1 mb-1">
              <Link
                to="/services"
                className={`block py-2 text-sm font-semibold ${
                  location.pathname === "/services" ? "text-gray-900" : "text-gray-700"
                }`}
              >
                Solutions
              </Link>

              {/* Resources (nested expandable) */}
              <button
                onClick={() => setMobileResourcesOpen((o) => !o)}
                className={`w-full flex items-center justify-between py-2 text-sm font-semibold ${
                  isResourcesActive ? "text-gray-900" : "text-gray-700"
                }`}
              >
                Resources
                <ChevronDown
                  size={14}
                  className={`transition-transform duration-200 ${
                    mobileResourcesOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {mobileResourcesOpen && (
                <div className="pl-4 border-l border-gray-200 space-y-1">
                  {resourceLinks.map((link) => (
                    <Link
                      key={link.path}
                      to={link.path}
                      className={`block py-2 text-sm ${
                        location.pathname === link.path ? "text-gray-900" : "text-gray-600"
                      }`}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          )}

          {navLinks.slice(1).map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`block py-2.5 text-sm font-medium ${
                location.pathname === link.path ? "text-gray-900" : "text-gray-600"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;