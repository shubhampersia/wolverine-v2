"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";

const COUNTRIES = [
  { code: "IN", name: "India", dial: "+91", flag: "🇮🇳" },
  { code: "US", name: "United States", dial: "+1", flag: "🇺🇸" },
  { code: "GB", name: "United Kingdom", dial: "+44", flag: "🇬🇧" },
  { code: "AE", name: "UAE", dial: "+971", flag: "🇦🇪" },
  { code: "SG", name: "Singapore", dial: "+65", flag: "🇸🇬" },
  { code: "AU", name: "Australia", dial: "+61", flag: "🇦🇺" },
  { code: "DE", name: "Germany", dial: "+49", flag: "🇩🇪" },
  { code: "JP", name: "Japan", dial: "+81", flag: "🇯🇵" },
  { code: "CN", name: "China", dial: "+86", flag: "🇨🇳" },
  { code: "KR", name: "South Korea", dial: "+82", flag: "🇰🇷" },
  { code: "VN", name: "Vietnam", dial: "+84", flag: "🇻🇳" },
  { code: "MY", name: "Malaysia", dial: "+60", flag: "🇲🇾" },
  { code: "CA", name: "Canada", dial: "+1", flag: "🇨🇦" },
  { code: "FR", name: "France", dial: "+33", flag: "🇫🇷" },
  { code: "IT", name: "Italy", dial: "+39", flag: "🇮🇹" },
  { code: "BR", name: "Brazil", dial: "+55", flag: "🇧🇷" },
  { code: "ZA", name: "South Africa", dial: "+27", flag: "🇿🇦" },
  { code: "NG", name: "Nigeria", dial: "+234", flag: "🇳🇬" },
  { code: "SA", name: "Saudi Arabia", dial: "+966", flag: "🇸🇦" },
  { code: "MX", name: "Mexico", dial: "+52", flag: "🇲🇽" },
];

type Props = {
  value: string;
  onChange: (val: string) => void;
  error?: string;
};

export default function PhoneInput({ value, onChange, error }: Props) {
  const [selected, setSelected] = useState(COUNTRIES[0]); // default India
  const [open, setOpen] = useState(false);
  const [number, setNumber] = useState("");
  const [search, setSearch] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Auto-detect country on mount
  useEffect(() => {
    fetch("https://ipapi.co/json/")
      .then((r) => r.json())
      .then((data) => {
        const match = COUNTRIES.find((c) => c.code === data.country_code);
        if (match) setSelected(match);
      })
      .catch(() => {
        // fallback to India if detection fails
      });
  }, []);

  // Sync combined value upward
  useEffect(() => {
    onChange(number ? `${selected.dial} ${number}` : "");
  }, [selected, number]);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
        setSearch("");
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const filtered = COUNTRIES.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.dial.includes(search)
  );

  return (
    <div>
      <label className="label-utility mb-2 block">Mobile Number</label>
      <div className="flex h-11 rounded-lg border border-input bg-background overflow-visible focus-within:ring-2 focus-within:ring-ring transition-shadow relative">
        {/* Country selector */}
        <div ref={dropdownRef} className="relative">
          <button
            type="button"
            onClick={() => { setOpen(!open); setSearch(""); }}
            className="flex items-center gap-1.5 h-full px-3 border-r border-input text-sm bg-transparent hover:bg-muted/50 transition-colors rounded-l-lg"
          >
            <span className="text-base leading-none">{selected.flag}</span>
            <span className="text-xs font-medium text-foreground/70 hidden sm:inline">{selected.dial}</span>
            <ChevronDown size={12} className={`text-muted-foreground transition-transform ${open ? "rotate-180" : ""}`} />
          </button>

          {open && (
            <div className="absolute left-0 top-full mt-1 w-64 bg-background border border-input rounded-lg shadow-lg z-50 overflow-hidden">
              {/* Search */}
              <div className="p-2 border-b border-input">
                <input
                  autoFocus
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search country or code..."
                  className="w-full h-8 px-3 text-xs rounded-md border border-input bg-muted/30 focus:outline-none focus:ring-1 focus:ring-ring"
                />
              </div>
              {/* List */}
              <ul className="max-h-48 overflow-y-auto">
                {filtered.map((c) => (
                  <li key={c.code}>
                    <button
                      type="button"
                      onClick={() => { setSelected(c); setOpen(false); setSearch(""); }}
                      className={`w-full flex items-center gap-2.5 px-3 py-2 text-sm hover:bg-muted/50 transition-colors text-left ${
                        selected.code === c.code ? "bg-primary/10 text-primary font-medium" : ""
                      }`}
                    >
                      <span className="text-base">{c.flag}</span>
                      <span className="flex-1 truncate">{c.name}</span>
                      <span className="text-xs text-muted-foreground font-mono">{c.dial}</span>
                    </button>
                  </li>
                ))}
                {filtered.length === 0 && (
                  <li className="px-3 py-4 text-xs text-muted-foreground text-center">No results</li>
                )}
              </ul>
            </div>
          )}
        </div>

        {/* Number input */}
        <input
          type="tel"
          value={number}
          onChange={(e) => setNumber(e.target.value.replace(/[^\d\s\-]/g, ""))}
          placeholder="Enter your number"
          className="flex-1 h-full px-3 bg-transparent text-sm focus:outline-none"
        />
      </div>
      {error && <span className="text-xs text-red-500 mt-1 block">{error}</span>}
    </div>
  );
}
