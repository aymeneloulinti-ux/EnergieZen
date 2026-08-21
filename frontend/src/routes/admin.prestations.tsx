import { createFileRoute } from "@tanstack/react-router";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { AdminShell } from "@/components/admin/AdminShell";
import { Switch } from "@/components/ui/switch";
import { createService, getServices, resolveApiAssetUrl, updateServiceStatus, type ApiService } from "@/lib/api";

export const Route = createFileRoute("/admin/prestations")({
  head: () => ({
    meta: [
      { title: "Prestations — Maison Lumen" },
      { name: "description", content: "Gérez les soins proposés, leur durée et leur tarif." },
      { property: "og:title", content: "Prestations — Maison Lumen" },
      { property: "og:description", content: "Catalogue des séances du cabinet." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Prestations,
});

function Prestations() {
  const [services, setServices] = useState<ApiService[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showCreate, setShowCreate] = useState(false);
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState({ name: "", slug: "", duration: "60", price: "0" });

  useEffect(() => {
    getServices(true)
      .then(setServices)
      .catch((reason: unknown) => setError(reason instanceof Error ? reason.message : "Impossible de récupérer les prestations"))
      .finally(() => setLoading(false));
  }, []);

  const toggleStatus = async (service: ApiService, active: boolean) => {
    try {
      const updated = await updateServiceStatus(service.id, active);
      setServices((current) => current.map((item) => (item.id === updated.id ? updated : item)));
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "Impossible de modifier le statut de la prestation");
    }
  };

  const submitCreate = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setCreating(true);
    try {
      const created = await createService({ ...form, duration: Number(form.duration), price: Number(form.price) });
      setServices((current) => [...current, created].sort((a, b) => a.name.localeCompare(b.name)));
      setForm({ name: "", slug: "", duration: "60", price: "0" });
      setShowCreate(false);
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "Impossible de créer la prestation");
    } finally {
      setCreating(false);
    }
  };

  return (
    <AdminShell
      title="Prestations"
      subtitle={`${services.length} prestation${services.length > 1 ? "s" : ""} active${services.length > 1 ? "s" : ""} visible${services.length > 1 ? "s" : ""}`}
      action={
        <button type="button" onClick={() => setShowCreate((value) => !value)} className="inline-flex shrink-0 items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm text-primary-foreground">
          <Plus className="h-4 w-4" /> Ajouter un soin
        </button>
      }
    >
      {error && <p className="mb-5 text-sm text-destructive">{error}</p>}
      {showCreate && <form onSubmit={submitCreate} className="mb-6 grid gap-3 rounded-2xl border border-border/70 bg-card p-5 shadow-soft sm:grid-cols-2 lg:grid-cols-5">
        <input required placeholder="Nom" value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} className="rounded-lg border border-border bg-background px-3 py-2 text-sm" />
        <input required placeholder="Slug" value={form.slug} onChange={(event) => setForm({ ...form, slug: event.target.value })} className="rounded-lg border border-border bg-background px-3 py-2 text-sm" />
        <input required min="1" type="number" placeholder="Durée" value={form.duration} onChange={(event) => setForm({ ...form, duration: event.target.value })} className="rounded-lg border border-border bg-background px-3 py-2 text-sm" />
        <input required min="0" step="0.01" type="number" placeholder="Prix" value={form.price} onChange={(event) => setForm({ ...form, price: event.target.value })} className="rounded-lg border border-border bg-background px-3 py-2 text-sm" />
        <button disabled={creating} type="submit" className="rounded-lg bg-primary px-3 py-2 text-sm text-primary-foreground disabled:opacity-50">{creating ? "Création…" : "Créer"}</button>
      </form>}
      {loading && <p className="text-sm text-muted-foreground">Chargement des prestations…</p>}
      {!loading && services.length === 0 && <p className="text-sm text-muted-foreground">Aucune prestation active disponible.</p>}
      <div className="grid gap-4 lg:grid-cols-2">
        {services.map((s) => (
          <article
            key={s.slug}
            className="grid grid-cols-[auto_minmax(0,1fr)] gap-4 rounded-2xl border border-border/70 bg-card p-5 shadow-soft"
          >
            {s.imageUrl ? (
              <img
                src={resolveApiAssetUrl(s.imageUrl) ?? undefined}
                alt={s.name}
                loading="lazy"
                width={1200}
                height={912}
                className="h-24 w-24 shrink-0 rounded-xl object-cover"
              />
            ) : (
              <div aria-hidden="true" className="h-24 w-24 shrink-0 rounded-xl bg-secondary" />
            )}
            <div className="min-w-0">
              <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3">
                <h2 className="truncate font-serif text-xl">{s.name}</h2>
                <Switch checked={s.active} onCheckedChange={(active) => void toggleStatus(s, active)} aria-label={`Activer ${s.name}`} />
              </div>
              <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{s.description ?? "Aucune description renseignée."}</p>
              <div className="mt-4 flex flex-wrap gap-2 text-xs">
                <span className="rounded-full bg-secondary px-3 py-1.5">{s.duration} min</span>
                <span className="rounded-full bg-secondary px-3 py-1.5">{s.price} €</span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </AdminShell>
  );
}