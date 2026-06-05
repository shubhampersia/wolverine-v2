import { Phone, Mail, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
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
        </div>

        <div className="mt-12 pt-6 border-t border-secondary-foreground/10 text-xs opacity-50 text-center">
          © {new Date().getFullYear()} Wolverine. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
