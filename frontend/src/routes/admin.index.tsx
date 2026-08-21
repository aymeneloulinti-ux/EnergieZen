import { createFileRoute, Link } from "@tanstack/react-router";
import { CalendarDays, Ban, Send } from "lucide-react";
import { useEffect, useState } from "react";
import { AdminShell, StatCard } from "@/components/admin/AdminShell";
import { getAdminDashboardStats, type ApiAdminDashboardStats } from "@/lib/api";

export const Route = createFileRoute("/admin/")({
  head: () => ({
    meta: [
      { title: "Dashboard administrateur — Maison Lumen" },
      { name: "description", content: "Vue d'ensemble des utilisateurs, prestations et rendez-vous du cabinet." },
      { property: "og:title", content: "Dashboard administrateur — Maison Lumen" },
      { property: "og:description", content: "Données réelles du cabinet et accès aux espaces de gestion." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AdminDashboard,
});

function AdminDashboard() {
  const [stats, setStats] = useState<ApiAdminDashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getAdminDashboardStats()
      .then(setStats)
      .catch((reason: unknown) =>
        setError(reason instanceof Error ? reason.message : "Impossible de récupérer les statistiques"),
      )
      .finally(() => setLoading(false));
  }, []);

  const today = new Intl.DateTimeFormat("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long",
  }).format(new Date());

  return (
    <AdminShell
      title={today.charAt(0).toUpperCase() + today.slice(1)}
      subtitle="Vue d'ensemble des données enregistrées dans le cabinet"
      action={
        <Link
          to="/admin/rendez-vous"
          className="inline-flex shrink-0 items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm text-primary-foreground"
        >
          Gérer les rendez-vous
        </Link>
      }
    >
      <DashboardStats stats={stats} loading={loading} error={error} />

      <div className="mt-7 grid gap-6 lg:grid-cols-[1.3fr_1fr]">
        <section className="rounded-2xl border border-border/70 bg-card p-6 shadow-soft">
          <h2 className="font-serif text-xl">Rendez-vous</h2>
          <p className="mt-5 rounded-xl border border-dashed border-border p-4 text-sm text-muted-foreground">
            L’aperçu détaillé des rendez-vous nécessite un endpoint administrateur de liste qui n’est pas encore exposé par le backend.
          </p>
        </section>

        <div className="space-y-6">
          <section className="rounded-2xl border border-border/70 bg-card p-6 shadow-soft">
            <h2 className="font-serif text-xl">À venir</h2>
            <p className="mt-4 text-sm text-muted-foreground">
              Consultez la liste complète depuis la page des rendez-vous.
            </p>
            <Link to="/admin/rendez-vous" className="mt-4 inline-flex text-sm text-sage hover:underline">
              Ouvrir les rendez-vous
            </Link>
          </section>

          <section className="rounded-2xl border border-border/70 bg-card p-6 shadow-soft">
            <h2 className="font-serif text-xl">Actions rapides</h2>
            <div className="mt-4 grid gap-2">
              <Link
                to="/admin/calendrier"
                className="flex items-center gap-3 rounded-xl border border-border px-4 py-3 text-sm hover:bg-accent"
              >
                <CalendarDays className="h-4 w-4 text-sage" /> Ouvrir le calendrier
              </Link>
              <Link
                to="/admin/disponibilites"
                className="flex items-center gap-3 rounded-xl border border-border px-4 py-3 text-sm hover:bg-accent"
              >
                <Ban className="h-4 w-4 text-sage" /> Bloquer un créneau
              </Link>
              <button
                type="button"
                disabled
                title="Aucun endpoint backend de rappel n'est disponible"
                className="flex cursor-not-allowed items-center gap-3 rounded-xl border border-border px-4 py-3 text-left text-sm text-muted-foreground opacity-60"
              >
                <Send className="h-4 w-4 text-sage" /> Envoyer les rappels du jour
              </button>
              <p className="text-xs text-muted-foreground">
                Action indisponible : aucun endpoint backend d’envoi de rappels n’existe actuellement.
              </p>
            </div>
          </section>
        </div>
      </div>
    </AdminShell>
  );
}

function DashboardStats({
  stats,
  loading,
  error,
}: {
  stats: ApiAdminDashboardStats | null;
  loading: boolean;
  error: string | null;
}) {
  if (loading) {
    return <div className="rounded-2xl border border-border/70 bg-card p-5 text-sm text-muted-foreground">Chargement des statistiques…</div>;
  }

  if (error) {
    return <div className="rounded-2xl border border-destructive/40 bg-card p-5 text-sm text-destructive">{error}</div>;
  }

  if (!stats) {
    return <div className="rounded-2xl border border-border/70 bg-card p-5 text-sm text-muted-foreground">Aucune statistique disponible.</div>;
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <StatCard label="Rendez-vous enregistrés" value={String(stats.appointments.total)} hint={`${stats.appointments.pending} en attente`} />
      <StatCard label="Clients" value={String(stats.users.clients)} hint={`${stats.users.total} utilisateurs au total`} />
      <StatCard label="Praticiens" value={String(stats.users.practitioners)} hint={`${stats.users.admins} administrateur${stats.users.admins > 1 ? "s" : ""}`} />
      <StatCard label="Prestations actives" value={String(stats.services.active)} hint={`${stats.services.total} prestations au total`} />
    </div>
  );
}