import { createFileRoute } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { AdminShell } from "@/components/admin/AdminShell";
import { Input } from "@/components/ui/input";
import { getAdminClients, updateUserStatus, type ApiAdminUser } from "@/lib/api";

export const Route = createFileRoute("/admin/clients")({
  head: () => ({
    meta: [
      { title: "Clients — Maison Lumen" },
      { name: "description", content: "Fichier clients du cabinet : visites, dernière séance et suivi." },
      { property: "og:title", content: "Clients — Maison Lumen" },
      { property: "og:description", content: "Suivi des personnes accompagnées au cabinet." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Clients,
});

function Clients() {
  const [users, setUsers] = useState<ApiAdminUser[]>([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  useEffect(() => {
    getAdminClients()
      .then(setUsers)
      .catch((reason: unknown) => setError(reason instanceof Error ? reason.message : "Impossible de récupérer les clients"))
      .finally(() => setLoading(false));
  }, []);

  const clients = useMemo(
    () => users.filter((user) => user.role === "CLIENT" && `${user.firstName} ${user.lastName} ${user.email}`.toLowerCase().includes(query.toLowerCase())),
    [query, users],
  );

  const toggleStatus = async (user: ApiAdminUser) => {
    setUpdatingId(user.id);
    try {
      const updated = await updateUserStatus(user.id, !user.active);
      setUsers((current) => current.map((item) => (item.id === updated.id ? updated : item)));
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "Impossible de modifier le statut du client");
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <AdminShell title="Clients" subtitle={`${clients.length} client${clients.length > 1 ? "s" : ""} enregistré${clients.length > 1 ? "s" : ""}`}>
      <div className="relative mb-5 max-w-sm">
        <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input className="rounded-full pl-11" placeholder="Rechercher un nom ou un e-mail" value={query} onChange={(event) => setQuery(event.target.value)} />
      </div>

      {loading && <p className="text-sm text-muted-foreground">Chargement des clients…</p>}
      {error && <p className="mb-4 text-sm text-destructive">{error}</p>}
      {!loading && !error && clients.length === 0 && <p className="text-sm text-muted-foreground">Aucun client trouvé.</p>}

      {!loading && clients.length > 0 && <div className="overflow-x-auto rounded-2xl border border-border/70 bg-card shadow-soft">
        <table className="w-full min-w-[640px] text-sm">
          <thead>
            <tr className="border-b border-border/70 text-left text-xs uppercase tracking-[0.12em] text-muted-foreground">
              <th className="px-5 py-4 font-normal">Client</th>
              <th className="px-5 py-4 font-normal">Contact</th>
              <th className="px-5 py-4 font-normal">Statut</th>
              <th className="px-5 py-4 text-right font-normal">Action</th>
            </tr>
          </thead>
          <tbody>
            {clients.map((c) => (
              <tr key={c.id} className="border-b border-border/50 last:border-0 hover:bg-accent/40">
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-secondary text-xs">
                      {`${c.firstName[0] ?? ""}${c.lastName[0] ?? ""}`}
                    </span>
                    <span className="font-medium">{c.firstName} {c.lastName}</span>
                  </div>
                </td>
                <td className="px-5 py-4 text-muted-foreground">
                  <span className="block">{c.email}</span>
                  <span className="block text-xs">{c.phone ?? "Téléphone non renseigné"}</span>
                </td>
                <td className="px-5 py-4">{c.active ? "Actif" : "Inactif"}</td>
                <td className="px-5 py-4 text-right">
                  <button type="button" disabled={updatingId === c.id} onClick={() => void toggleStatus(c)} className="rounded-full border border-border px-3 py-1.5 text-xs hover:bg-accent disabled:opacity-50">
                    {updatingId === c.id ? "Mise à jour…" : c.active ? "Désactiver" : "Activer"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>}
    </AdminShell>
  );
}