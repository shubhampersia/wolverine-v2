import { Phone, Mail, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div>
            <h4 className="font-bold text-lg mb-4">Address</h4>
            <div className="flex items-start gap-3 text-sm opacity-80">
              <MapPin size={16} className="mt-0.5 shrink-0" />
              <span>
                A-36/2, Oragadam, 5th Cross Road, <br /> SIPCOT Industrial Park,
                Sriperumbudur,<br /> Kancheepuram, Tamil Nadu, India - 602105
              </span>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-4">Contact</h4>
            <div className="space-y-3 text-sm opacity-80">
              <div className="flex items-center gap-3">
                <Phone size={16} className="shrink-0" />
                <span>+91-9986094599</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={16} className="shrink-0" />
                <span>ed@wtube.co</span>
              </div>
              <a
                href="https://www.linkedin.com/company/wtec-pvt-ltd/posts/?feedView=all"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 hover:opacity-100 transition-opacity"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="shrink-0"
                  aria-hidden="true"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
                <span>LinkedIn</span>
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-4">Manufacturing Locations</h4>
            <div className="space-y-2 text-sm opacity-80">
              {[
                "Chennai — WTEC Pvt Ltd",
                "Coimbatore — MCAF Pvt Ltd",
                "Hosur — MMI Pvt Ltd",
                "Maryland — MMI Headquarters",
              ].map((loc) => (
                <div key={loc} className="flex items-center gap-3">
                  <MapPin size={14} className="shrink-0" />
                  <span>{loc}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-4">Resources</h4>
            <div className="space-y-2 text-sm opacity-80">
              <Link to="/automotive-component-manufacturers" className="block hover:opacity-100">
                Automotive Component Manufacturers
              </Link>
              <Link to="/auto-parts-manufacturers-india" className="block hover:opacity-100">
                Auto Parts Manufacturers in India
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-secondary-foreground/10 text-xs opacity-50 text-center space-y-2">
          <div>
            <a href="/privacy-policy" className="underline underline-offset-4 hover:opacity-100">
              Privacy Policy
            </a>
          </div>
          <div>© {new Date().getFullYear()} Wolverine. All rights reserved.</div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;