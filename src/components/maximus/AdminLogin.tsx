import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, Lock } from "lucide-react";

export function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) window.location.replace("/admin/logs");
    });
  }, []);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) {
      setError("Credenziali non valide");
      return;
    }
    window.location.replace("/admin/logs");
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-background">
      <form
        onSubmit={submit}
        className="glass-card neon-border rounded-2xl p-8 w-full max-w-md space-y-5"
      >
        <div className="flex items-center gap-3 mb-2">
          <Lock className="w-5 h-5 text-gold" />
          <h1 className="font-display text-2xl">Area Admin</h1>
        </div>
        <label className="block">
          <span className="text-xs uppercase tracking-widest text-muted-foreground mb-2 block">
            Email
          </span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input-luxe"
            required
            autoComplete="email"
          />
        </label>
        <label className="block">
          <span className="text-xs uppercase tracking-widest text-muted-foreground mb-2 block">
            Password
          </span>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input-luxe"
            required
            autoComplete="current-password"
          />
        </label>
        {error && <p className="text-sm text-red-400">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="btn-neon-gold w-full px-8 py-4 rounded-md text-sm inline-flex items-center justify-center gap-3 disabled:opacity-60"
        >
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Accedi"}
        </button>
      </form>
    </div>
  );
}
