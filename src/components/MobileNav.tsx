"use client";

import { useState } from "react";
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

  return (
    <div className="md:hidden">
      <button
        onClick={() => setOpen(!open)}
        className="text-gray-300 hover:text-white p-2 rounded-lg hover:bg-white/5 transition"
        aria-label="Toggle menu"
      >
        {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {open && (
        <div className="fixed inset-0 top-16 z-40 bg-[#0A0F1E] flex flex-col px-6 pt-8 border-t border-white/10">
          <nav className="flex flex-col gap-2">
            {navLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-2xl px-6 py-4 text-xl font-bold text-gray-300 hover:bg-white/5 hover:text-white transition"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/sign-in"
              onClick={() => setOpen(false)}
              className="mt-6 rounded-2xl bg-verdikt-blue px-6 py-4 text-center text-xl font-bold text-white hover:bg-blue-500 transition"
            >
              Get Started
            </Link>
          </nav>
        </div>
      )}
    </div>
  );
}
