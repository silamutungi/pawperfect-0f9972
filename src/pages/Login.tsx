import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LogIn, AlertCircle } from "lucide-react";
import { supabase, isSupabaseConfigured } from "../lib/supabase";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import Navbar from "../components/Navbar";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!isSupabaseConfigured) {
      navigate("/dashboard");
      return;
    }
    setError("");
    setLoading(true);
    const { error: authError } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (authError) {
      setError(authError.message);
    } else {
      navigate("/dashboard");
    }
  }

  return (
    <div style={{ background: "var(--color-bg)", minHeight: "100vh" }}>
      <Navbar />
      <main className="flex items-center justify-center px-6 py-24">
        <div className="w-full max-w-sm">
          <h1 className="font-bold mb-2" style={{ fontSize: "var(--text-title-1)" }}>Welcome back</h1>
          <p className="mb-8" style={{ color: "var(--color-text-secondary)", fontSize: "var(--text-subhead)" }}>Sign in to manage your bookings and pet profiles.</p>
          {error && (
            <div className="flex items-start gap-2 rounded-lg p-3 mb-6" style={{ background: "rgba(220,38,38,0.08)", border: "1px solid rgba(220,38,38,0.2)" }} role="alert">
              <AlertCircle size={16} style={{ color: "var(--color-error)", flexShrink: 0, marginTop: 2 }} aria-hidden="true" />
              <p style={{ fontSize: "var(--text-footnote)", color: "var(--color-error)" }}>{error}</p>
            </div>
          )}
          <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="email">Email address</Label>
              <Input id="email" type="email" autoComplete="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" autoComplete="current-password" required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Your password" />
            </div>
            <Button type="submit" disabled={loading} className="w-full" style={{ background: "var(--color-primary)", color: "#fff", minHeight: "44px" }}>
              {loading ? "Signing in..." : (<><LogIn size={16} aria-hidden="true" /> Sign In</>)}
            </Button>
          </form>
          <p className="mt-6 text-center" style={{ fontSize: "var(--text-subhead)", color: "var(--color-text-secondary)" }}>
            No account yet?{" "}
            <Link to="/signup" className="font-semibold underline" style={{ color: "var(--color-primary)" }}>Create one free</Link>
          </p>
        </div>
      </main>
    </div>
  );
}
