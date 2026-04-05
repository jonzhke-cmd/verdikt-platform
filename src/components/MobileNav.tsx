"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { X, Menu } from "lucide-react";

const navLinks = [
  { href: "/markets", label: "Markets" },
  { href: "/how-it-works", label: "How it Works" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/sign-in", label: "Sign In" },
];

export default function MobileNav() {
  const [open, setOpen] = useState(false);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <div className="md:hidden">
      <button
        onClick={() => setOpen(!open)}
        className="text-gray-300 hover:text-white p-2 rounded-lg transition"
        aria-label="Toggle menu"
      >
        {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {open && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "#0A0F1E",
            zIndex: 9999,
            display: "flex",
            flexDirection: "column",
            paddingTop: "80px",
            paddingLeft: "24px",
            paddingRight: "24px",
          }}
        >
          {/* Close button top right */}
          <button
            onClick={() => setOpen(false)}
            style={{ position: "absolute", top: "20px", right: "20px" }}
            className="text-gray-300 hover:text-white p-2"
            aria-label="Close menu"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Logo area */}
          <div className="flex items-center gap-2 mb-10">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <rect width="32" height="32" rx="8" fill="#3B82F6" fillOpacity="0.15"/>
              <path d="M6 8L13.5 24L16 19L18.5 24L26 8" stroke="#3B82F6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="text-xl font-bold text-white tracking-tight">VERDIKT</span>
          </div>

          <nav className="flex flex-col gap-3">
            {navLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                style={{ borderBottom: "1px solid #1F2937" }}
                className="px-4 py-5 text-2xl font-bold text-gray-200 hover:text-white transition"
              >
                {item.label}
              </Link>
            ))}

            <Link
              href="/sign-in"
              onClick={() => setOpen(false)}
              className="mt-6 py-4 text-center text-xl font-bold text-white rounded-2xl transition"
              style={{ backgroundColor: "#3B82F6" }}
            >
              Get Started →
            </Link>
          </nav>
        </div>
      )}
    </div>
  );
}
