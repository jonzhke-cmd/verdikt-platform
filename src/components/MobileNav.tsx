"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { X, Menu, User, LogOut } from "lucide-react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";

export default function MobileNav() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
    // Check for user on mount
    const storedUser = localStorage.getItem('verdikt_user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        localStorage.removeItem('verdikt_user');
      }
    }
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const handleLogout = () => {
    localStorage.removeItem('verdikt_user');
    setUser(null);
    router.push('/');
    setOpen(false);
  };

  const navLinks = [
    { href: "/markets", label: "Markets" },
    { href: "/how-it-works", label: "How it Works" },
    { href: "/portfolio", label: "Portfolio" },
    ...(!user ? [{ href: "/sign-in", label: "Sign In" }] : []),
  ];

  const overlay = open ? (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "#0A0F1E",
        zIndex: 99999,
        display: "flex",
        flexDirection: "column",
        padding: "24px",
      }}
    >
      {/* Top bar */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "48px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <rect width="32" height="32" rx="8" fill="#3B82F6" fillOpacity="0.15"/>
            <path d="M6 8L13.5 24L16 19L18.5 24L26 8" stroke="#3B82F6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span style={{ fontSize: "20px", fontWeight: "bold", color: "white", letterSpacing: "-0.02em" }}>VERDIKT</span>
        </div>
        <button onClick={() => setOpen(false)} style={{ color: "#9CA3AF", padding: "8px" }}>
          <X style={{ width: "24px", height: "24px" }} />
        </button>
      </div>

      {/* User info if logged in */}
      {user && (
        <div style={{ 
          marginBottom: "32px", 
          padding: "16px", 
          backgroundColor: "#111827", 
          borderRadius: "12px",
          border: "1px solid #1F2937"
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "8px" }}>
            <User style={{ width: "20px", height: "20px", color: "#9CA3AF" }} />
            <span style={{ fontSize: "16px", fontWeight: "bold", color: "white" }}>{user.name}</span>
          </div>
          <div style={{ fontSize: "14px", color: "#9CA3AF" }}>{user.email}</div>
          <div style={{ fontSize: "14px", color: "#22C55E", marginTop: "4px" }}>
            Balance: ${user.balance?.toFixed(2) || '0.00'}
          </div>
        </div>
      )}

      {/* Nav links */}
      <nav style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
        {navLinks.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={() => setOpen(false)}
            style={{
              display: "block",
              padding: "18px 16px",
              fontSize: "24px",
              fontWeight: "bold",
              color: "#E5E7EB",
              borderBottom: "1px solid #1F2937",
              textDecoration: "none",
            }}
          >
            {item.label}
          </Link>
        ))}

        {user ? (
          <button
            onClick={handleLogout}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              marginTop: "32px",
              padding: "18px",
              fontSize: "18px",
              fontWeight: "bold",
              color: "#EF4444",
              backgroundColor: "transparent",
              border: "1px solid #EF4444",
              borderRadius: "16px",
              textAlign: "center",
              cursor: "pointer",
            }}
          >
            <LogOut style={{ width: "18px", height: "18px" }} />
            Sign Out
          </button>
        ) : (
          <Link
            href="/sign-in"
            onClick={() => setOpen(false)}
            style={{
              display: "block",
              marginTop: "32px",
              padding: "18px",
              fontSize: "18px",
              fontWeight: "bold",
              color: "white",
              backgroundColor: "#3B82F6",
              borderRadius: "16px",
              textAlign: "center",
              textDecoration: "none",
            }}
          >
            Get Started →
          </Link>
        )}
      </nav>
    </div>
  ) : null;

  return (
    <div className="md:hidden">
      <button
        onClick={() => setOpen(!open)}
        style={{ color: "#D1D5DB", padding: "8px" }}
        aria-label="Toggle menu"
      >
        <Menu style={{ width: "24px", height: "24px" }} />
      </button>

      {/* Render overlay via portal directly on document.body */}
      {mounted && createPortal(overlay, document.body)}
    </div>
  );
}