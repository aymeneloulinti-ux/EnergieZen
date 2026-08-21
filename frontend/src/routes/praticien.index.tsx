import { createFileRoute, Link } from "@tanstack/react-router";
import { PraticienShell } from "@/components/praticien/PraticienShell";

export const Route = createFileRoute("/praticien/")({
  head: () => ({
    meta: [
      { title: "Dashboard — Espace Praticien — Maison Lumen" },
      { property: "og:title", content: "Dashboard — Espace Praticien — Maison Lumen" },
    ],
  }),
  component: PraticienDashboard,
});

function PraticienDashboard() {
  return (
    <PraticienShell
      title="Bienvenue dans votre espace"
      subtitle="Gérez votre calendrier, vos rendez-vous et vos disponibilités"
    >
      <div className="space-y-6">
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="rounded-3xl border border-border/70 bg-card p-6 shadow-soft">
            <p className="text-xs uppercase tracking-[0.14em] text-muted-foreground">Rendez-vous à venir</p>
            <p className="mt-3 font-serif text-3xl">—</p>
            <p className="mt-2 text-xs text-muted-foreground">Sélectionnez une date pour voir vos rendez-vous</p>
          </div>

          <div className="rounded-3xl border border-border/70 bg-card p-6 shadow-soft">
            <p className="text-xs uppercase tracking-[0.14em] text-muted-foreground">Prochaine séance</p>
            <p className="mt-3 font-serif text-3xl">—</p>
            <p className="mt-2 text-xs text-muted-foreground">Aucune séance n'est actuellement planifiée</p>
          </div>
        </div>

        <div className="rounded-3xl border border-border/70 bg-card p-6 shadow-soft">
          <h2 className="text-lg font-semibold">Accès rapide</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <Link
              to="/praticien/calendrier"
              className="rounded-xl border border-border/70 px-4 py-3 text-sm transition-colors hover:bg-accent"
            >
              Voir mon calendrier
            </Link>
            <Link
              to="/praticien/rendez-vous"
              className="rounded-xl border border-border/70 px-4 py-3 text-sm transition-colors hover:bg-accent"
            >
              Mes rendez-vous
            </Link>
            <Link
              to="/praticien/disponibilites"
              className="rounded-xl border border-border/70 px-4 py-3 text-sm transition-colors hover:bg-accent"
            >
              Mes disponibilités
            </Link>
            <Link
              to="/praticien/clients"
              className="rounded-xl border border-border/70 px-4 py-3 text-sm transition-colors hover:bg-accent"
            >
              Mes clients
            </Link>
          </div>
        </div>
      </div>
    </PraticienShell>
  );
}
