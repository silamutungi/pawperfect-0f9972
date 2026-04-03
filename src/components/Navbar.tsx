import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { PawPrint } from "lucide-react";
import { Button } from "./ui/button";

const NAV_LINKS = [
  { to: "/", label: "Browse" },
  { to: "/#why", label: "Why PawPerfect" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const drawerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function handleClickOutside(e: MouseEvent) {
      if (drawerRef.current && !drawerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <header role="banner" style={{ background: "var(--color-bg-surface)", borderBottom: "1px solid var(--color-border)", position: "sticky", top: 0, zIndex: 50 }}>
      <nav className="max-w-5xl mx-auto px-6 flex items-center justify-between" style={{ height: "64px" }} aria-label="Main navigation">
        <Link to="/" className="flex items-center gap-2 font-bold" style={{ fontSize: "var(--text-title-3)", color: "var(--color-text)" }}>
          <PawPrint size={24} style={{ color: "var(--color-primary)" }} aria-hidden="true" />
          PawPerfect
        </Link>

        {/* Desktop nav links */}
        <div className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="px-3 py-2 rounded-lg font-medium transition-colors"
              style={{
                fontSize: "var(--text-subhead)",
                color: location.pathname === link.to ? "var(--color-primary)" : "var(--color-text-secondary)",
                background: location.pathname === link.to ? "rgba(200,75,17,0.08)" : "transparent",
              }}
              aria-current={location.pathname === link.to ? "page" : undefined}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Desktop CTA buttons */}
        <div className="hidden md:flex items-center gap-2">
          <Link to="/login">
            <Button variant="ghost" style={{ color: "var(--color-text-secondary)", minHeight: "44px" }}>Sign In</Button>
          </Link>
          <Link to="/signup">
            <Button style={{ background: "var(--color-primary)", color: "#fff", minHeight: "44px" }}>Start Browsing</Button>
          </Link>
        </div>

        {/* Hamburger button — mobile only */}
        <button
          className="md:hidden flex flex-col justify-center items-center gap-1.5 p-2 rounded-lg"
          onClick={() => setOpen(!open)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          style={{ minHeight: "44px", minWidth: "44px", background: "transparent", border: "none", cursor: "pointer" }}
        >
          <span
            style={{
              display: "block",
              width: "20px",
              height: "2px",
              background: "var(--color-text)",
              borderRadius: "2px",
              transition: "transform 0.2s ease, opacity 0.2s ease",
              transform: open ? "translateY(7px) rotate(45deg)" : "none",
            }}
          />
          <span
            style={{
              display: "block",
              width: "20px",
              height: "2px",
              background: "var(--color-text)",
              borderRadius: "2px",
              transition: "opacity 0.2s ease",
              opacity: open ? 0 : 1,
            }}
          />
          <span
            style={{
              display: "block",
              width: "20px",
              height: "2px",
              background: "var(--color-text)",
              borderRadius: "2px",
              transition: "transform 0.2s ease, opacity 0.2s ease",
              transform: open ? "translateY(-7px) rotate(-45deg)" : "none",
            }}
          />
        </button>
      </nav>

      {/* Backdrop overlay */}
      <div
        className="md:hidden"
        style={{
          position: "fixed",
          inset: 0,
          top: "64px",
          background: "rgba(28,26,24,0.4)",
          zIndex: 40,
          opacity: open ? 1 : 0,
          pointerEvents: open ? "auto" : "none",
          transition: "opacity 0.25s ease",
        }}
        aria-hidden="true"
        onClick={() => setOpen(false)}
      />

      {/* Slide-in drawer */}
      <div
        ref={drawerRef}
        className="md:hidden"
        role="dialog"
        aria-label="Mobile navigation"
        aria-modal="true"
        style={{
          position: "fixed",
          top: "64px",
          right: 0,
          bottom: 0,
          width: "280px",
          background: "var(--color-bg-surface)",
          boxShadow: "-4px 0 24px rgba(28,26,24,0.12)",
          zIndex: 50,
          display: "flex",
          flexDirection: "column",
          padding: "24px 16px",
          gap: "4px",
          transform: open ? "translateX(0)" : "translateX(100%)",
          transition: "transform 0.28s cubic-bezier(0.4, 0, 0.2, 1)",
          overflowY: "auto",
          borderLeft: "1px solid var(--color-border)",
        }}
      >
        {NAV_LINKS.map((link) => {
          const isActive = location.pathname === link.to;
          return (
            <Link
              key={link.to}
              to={link.to}
              role="menuitem"
              onClick={() => setOpen(false)}
              style={{
                display: "flex",
                alignItems: "center",
                padding: "10px 12px",
                borderRadius: "8px",
                fontSize: "var(--text-subhead)",
                fontWeight: isActive ? 600 : 500,
                color: isActive ? "var(--color-primary)" : "var(--color-text-secondary)",
                background: isActive ? "rgba(200,75,17,0.08)" : "transparent",
                minHeight: "44px",
                transition: "background 0.15s ease, color 0.15s ease",
              }}
              aria-current={isActive ? "page" : undefined}
            >
              {link.label}
            </Link>
          );
        })}

        <div style={{ borderTop: "1px solid var(--color-border)", margin: "12px 0" }} />

        <Link
          to="/login"
          role="menuitem"
          onClick={() => setOpen(false)}
          style={{
            display: "flex",
            alignItems: "center",
            padding: "10px 12px",
            borderRadius: "8px",
            fontSize: "var(--text-subhead)",
            fontWeight: 500,
            color: "var(--color-text-secondary)",
            minHeight: "44px",
            transition: "background 0.15s ease",
          }}
        >
          Sign In
        </Link>

        <Link
          to="/signup"
          role="menuitem"
          onClick={() => setOpen(false)}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "10px 12px",
            borderRadius: "8px",
            fontSize: "var(--text-subhead)",
            fontWeight: 700,
            color: "#fff",
            background: "var(--color-primary)",
            minHeight: "44px",
            marginTop: "4px",
          }}
        >
          Start Browsing
        </Link>
      </div>
    </header>
  );
}
