import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, PawPrint } from "lucide-react";
import { Button } from "./ui/button";

const NAV_LINKS = [
  { to: "/", label: "Browse" },
  { to: "/#why", label: "Why PawPerfect" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  return (
    <header role="banner" style={{ background: "var(--color-bg-surface)", borderBottom: "1px solid var(--color-border)", position: "sticky", top: 0, zIndex: 50 }}>
      <nav className="max-w-5xl mx-auto px-6 flex items-center justify-between" style={{ height: "64px" }} aria-label="Main navigation">
        <Link to="/" className="flex items-center gap-2 font-bold" style={{ fontSize: "var(--text-title-3)", color: "var(--color-text)" }}>
          <PawPrint size={24} style={{ color: "var(--color-primary)" }} aria-hidden="true" />
          PawPerfect
        </Link>
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
        <div className="hidden md:flex items-center gap-2">
          <Link to="/login">
            <Button variant="ghost" style={{ color: "var(--color-text-secondary)", minHeight: "44px" }}>Sign In</Button>
          </Link>
          <Link to="/signup">
            <Button style={{ background: "var(--color-primary)", color: "#fff", minHeight: "44px" }}>Start Browsing</Button>
          </Link>
        </div>
        <button
          className="md:hidden p-2 rounded-lg"
          onClick={() => setOpen(!open)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          style={{ minHeight: "44px", minWidth: "44px" }}
        >
          {open ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
        </button>
      </nav>
      {open && (
        <div className="md:hidden px-6 pb-4 flex flex-col gap-1" style={{ background: "var(--color-bg-surface)", borderTop: "1px solid var(--color-border)" }} role="menu">
          {NAV_LINKS.map((link) => (
            <Link key={link.to} to={link.to} role="menuitem" onClick={() => setOpen(false)}
              className="px-3 py-2.5 rounded-lg font-medium"
              style={{ fontSize: "var(--text-subhead)", color: "var(--color-text-secondary)", minHeight: "44px", display: "flex", alignItems: "center" }}
            >{link.label}</Link>
          ))}
          <Link to="/login" role="menuitem" onClick={() => setOpen(false)}
            className="px-3 py-2.5 rounded-lg font-medium"
            style={{ fontSize: "var(--text-subhead)", color: "var(--color-text-secondary)", minHeight: "44px", display: "flex", alignItems: "center" }}
          >Sign In</Link>
          <Link to="/signup" role="menuitem" onClick={() => setOpen(false)}
            className="px-3 py-2.5 rounded-lg font-bold text-center"
            style={{ fontSize: "var(--text-subhead)", background: "var(--color-primary)", color: "#fff", minHeight: "44px", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "8px" }}
          >Start Browsing</Link>
        </div>
      )}
    </header>
  );
}
