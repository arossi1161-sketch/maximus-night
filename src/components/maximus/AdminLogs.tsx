import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, LogOut, RefreshCw, ShieldAlert } from "lucide-react";

type LogRow = {
  id: string;
  created_at: string;
  form_type: string;
  status: string;
  error_stage: string | null;
  error_message: string | null;
  recipient_email: string | null;
  payload_summary: Record<string, unknown> | null;
};

const FORM_TYPES = ["all", "contact", "job_application", "reservation"] as const;
const STATUSES = ["all", "success", "db_error", "email_error", "validation_error"] as const;

export function AdminLogs() {
  const [authChecked, setAuthChecked] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [rows, setRows] = useState<LogRow[]>([]);
  const [loading, setLoading] = useState(false);

  const [formType, setFormType] = useState<(typeof FORM_TYPES)[number]>("all");
  const [status, setStatus] = useState<(typeof STATUSES)[number]>("all");
  const [from, setFrom] = useState<string>("");
  const [to, setTo] = useState<string>("");
  const [search, setSearch] = useState<string>("");

  useEffect(() => {
    (async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        window.location.replace("/admin/login");
        return;
      }
      const { data: roles } = await supabase
        .from("user_roles" as never)
        .select("role")
        .eq("user_id", user.id);
      const admin = !!(roles as { role: string }[] | null)?.some((r) => r.role === "admin");
      setIsAdmin(admin);
      setAuthChecked(true);
    })();
  }, []);

  const fetchLogs = async () => {
    setLoading(true);
    let q = supabase
      .from("form_submission_log")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(500);
    if (formType !== "all") q = q.eq("form_type", formType);
    if (status !== "all") q = q.eq("status", status);
    if (from) q = q.gte("created_at", new Date(from).toISOString());
    if (to) {
      const end = new Date(to);
      end.setHours(23, 59, 59, 999);
      q = q.lte("created_at", end.toISOString());
    }
    const { data, error } = await q;
    if (error) console.error(error);
    setRows((data as LogRow[] | null) ?? []);
    setLoading(false);
  };

  useEffect(() => {
    if (isAdmin) void fetchLogs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAdmin, formType, status, from, to]);

  const filtered = useMemo(() => {
    if (!search.trim()) return rows;
    const s = search.toLowerCase();
    return rows.filter(
      (r) =>
        r.recipient_email?.toLowerCase().includes(s) ||
        r.error_message?.toLowerCase().includes(s) ||
        JSON.stringify(r.payload_summary ?? {}).toLowerCase().includes(s),
    );
  }, [rows, search]);

  const logout = async () => {
    await supabase.auth.signOut();
    window.location.replace("/admin/login");
  };

  if (!authChecked) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-6 h-6 animate-spin text-gold" />
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6">
        <div className="glass-card neon-border rounded-2xl p-8 max-w-md text-center space-y-4">
          <ShieldAlert className="w-12 h-12 text-gold mx-auto" />
          <h1 className="font-display text-2xl">Accesso negato</h1>
          <p className="text-sm text-muted-foreground">
            Il tuo account non ha permessi di amministratore.
          </p>
          <button onClick={logout} className="text-sm text-gold hover:underline">
            Esci
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background px-4 md:px-8 py-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div>
            <h1 className="font-display text-3xl text-gold-gradient">Log Sottomissioni</h1>
            <p className="text-sm text-muted-foreground mt-1">
              {filtered.length} risultati {loading && "· caricamento..."}
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={fetchLogs}
              className="px-4 py-2 rounded-md border border-border text-sm inline-flex items-center gap-2 hover:bg-muted/30"
            >
              <RefreshCw className="w-4 h-4" /> Aggiorna
            </button>
            <button
              onClick={logout}
              className="px-4 py-2 rounded-md border border-border text-sm inline-flex items-center gap-2 hover:bg-muted/30"
            >
              <LogOut className="w-4 h-4" /> Esci
            </button>
          </div>
        </div>

        <div className="glass-card neon-border rounded-xl p-4 grid md:grid-cols-5 gap-3">
          <label className="text-xs">
            <span className="block text-muted-foreground uppercase tracking-widest mb-1">
              Form
            </span>
            <select
              value={formType}
              onChange={(e) => setFormType(e.target.value as typeof formType)}
              className="input-luxe"
            >
              {FORM_TYPES.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </label>
          <label className="text-xs">
            <span className="block text-muted-foreground uppercase tracking-widest mb-1">
              Stato
            </span>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as typeof status)}
              className="input-luxe"
            >
              {STATUSES.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </label>
          <label className="text-xs">
            <span className="block text-muted-foreground uppercase tracking-widest mb-1">
              Da
            </span>
            <input
              type="date"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              className="input-luxe"
            />
          </label>
          <label className="text-xs">
            <span className="block text-muted-foreground uppercase tracking-widest mb-1">
              A
            </span>
            <input
              type="date"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              className="input-luxe"
            />
          </label>
          <label className="text-xs">
            <span className="block text-muted-foreground uppercase tracking-widest mb-1">
              Ricerca
            </span>
            <input
              type="text"
              placeholder="email, errore..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="input-luxe"
            />
          </label>
        </div>

        <div className="glass-card neon-border rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-muted/30 text-xs uppercase tracking-widest text-muted-foreground">
                <tr>
                  <th className="text-left p-3">Data</th>
                  <th className="text-left p-3">Form</th>
                  <th className="text-left p-3">Stato</th>
                  <th className="text-left p-3">Email</th>
                  <th className="text-left p-3">Dettagli</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((r) => (
                  <tr key={r.id} className="border-t border-border/40 align-top">
                    <td className="p-3 whitespace-nowrap text-xs">
                      {new Date(r.created_at).toLocaleString("it-IT")}
                    </td>
                    <td className="p-3">{r.form_type}</td>
                    <td className="p-3">
                      <span
                        className={`inline-block px-2 py-0.5 rounded text-xs ${
                          r.status === "success"
                            ? "bg-green-500/15 text-green-400"
                            : "bg-red-500/15 text-red-400"
                        }`}
                      >
                        {r.status}
                      </span>
                    </td>
                    <td className="p-3 text-xs">{r.recipient_email ?? "—"}</td>
                    <td className="p-3 text-xs text-muted-foreground max-w-md">
                      {r.error_stage && (
                        <div>
                          <strong>Stage:</strong> {r.error_stage}
                        </div>
                      )}
                      {r.error_message && (
                        <div className="break-words">{r.error_message}</div>
                      )}
                      {r.payload_summary && (
                        <pre className="text-[10px] mt-1 opacity-70 whitespace-pre-wrap">
                          {JSON.stringify(r.payload_summary)}
                        </pre>
                      )}
                    </td>
                  </tr>
                ))}
                {!loading && filtered.length === 0 && (
                  <tr>
                    <td colSpan={5} className="p-8 text-center text-muted-foreground">
                      Nessun log trovato.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
