import { PawPrint } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer role="contentinfo" style={{ borderTop: "1px solid var(--color-border)", background: "var(--color-bg-surface)" }}>
      <div className="max-w-5xl mx-auto px-6 py-12 flex flex-col md:flex-row items-start justify-between gap-8">
        <div className="max-w-xs">
          <div className="flex items-center gap-2 font-bold mb-2" style={{ fontSize: "var(--text-title-3)", color: "var(--color-text)" }}>
            <PawPrint size={20} style={{ color: "var(--color-primary)" }} aria-hidden="true" />
            PawPerfect
          </div>
          <p style={{ fontSize: "var(--text-footnote)", color: "var(--color-text-secondary)", lineHeight: "var(--leading-relaxed)" }}>
            Book vetted, breed-savvy groomers with instant confirmation. Buyer protection on every appointment.
          </p>
        </div>
        <div className="flex gap-12">
          <div>
            <p className="font-semibold mb-3" style={{ fontSize: "var(--text-footnote)", textTransform: "uppercase", letterSpacing: "var(--tracking-overline)", color: "var(--color-text-secondary)" }}>For Owners</p>
            <nav aria-label="Footer owner links">
              <ul className="flex flex-col gap-2">
                {[{ to: "/", label: "Browse Groomers" }, { to: "/signup", label: "Create Account" }, { to: "/login", label: "Sign In" }].map(({ to, label }) => (
                  <li key={to}><Link to={to} style={{ fontSize: "var(--text-footnote)", color: "var(--color-text-secondary)" }} className="hover:underline">{label}</Link></li>
                ))}
              </ul>
            </nav>
          </div>
          <div>
            <p className="font-semibold mb-3" style={{ fontSize: "var(--text-footnote)", textTransform: "uppercase", letterSpacing: "var(--tracking-overline)", color: "var(--color-text-secondary)" }}>For Groomers</p>
            <nav aria-label="Footer groomer links">
              <ul className="flex flex-col gap-2">
                {[{ to: "/signup?role=groomer", label: "List for Free" }, { to: "/login", label: "Groomer Login" }].map(({ to, label }) => (
                  <li key={to}><Link to={to} style={{ fontSize: "var(--text-footnote)", color: "var(--color-text-secondary)" }} className="hover:underline">{label}</Link></li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </div>
      <div className="max-w-5xl mx-auto px-6 pb-8">
        <p style={{ fontSize: "var(--text-caption)", color: "var(--color-text-muted)" }}>
          &copy; {new Date().getFullYear()} PawPerfect. All rights reserved. Secure payments. Buyer protection on every order.
        </p>
      </div>
    </footer>
  );
}
