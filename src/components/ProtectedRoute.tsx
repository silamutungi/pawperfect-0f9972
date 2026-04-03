import { useState, useEffect, type ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { supabase, isSupabaseConfigured } from "../lib/supabase";

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const [checked, setChecked] = useState(false);
  const [authed, setAuthed] = useState(false);

  useEffect(() => {
    if (!isSupabaseConfigured) {
      setAuthed(true);
      setChecked(true);
      return;
    }
    supabase.auth.getSession().then(({ data }) => {
      setAuthed(Boolean(data.session));
      setChecked(true);
    });
  }, []);

  if (!checked) {
    return (
      <div className="flex items-center justify-center min-h-screen" role="status" aria-label="Loading">
        <div className="w-8 h-8 rounded-full border-2 border-t-transparent animate-spin" style={{ borderColor: "var(--color-primary)", borderTopColor: "transparent" }} aria-hidden="true" />
      </div>
    );
  }

  return authed ? <>{children}</> : <Navigate to="/login" replace />;
}
