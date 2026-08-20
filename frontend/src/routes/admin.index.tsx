import { createFileRoute, Link } from "@tanstack/react-router";
import { Plus, CalendarDays, Ban, Send } from "lucide-react";
import { AdminShell, StatCard } from "@/components/admin/AdminShell";
import { appointments, getService, practitioners, formatPrice } from "@/data/site";

export const Route = createFileRoute("/admin/")({
  head: () => ({
    meta: [
      { title: "Dashboard praticienne — Maison Lumen" },
      { name: "description", content: "Vue d'ensemble de la journée, du chiffre d'affaires et des rendez-vous." },
      { property: "og:title", content: "Dashboard praticienne — Maison Lumen" },
      { property: "og:description", content: "Gestion du cabinet : agenda, clients et paiements." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AdminDashboard,
});

const today = appointments.filter((a) => a.date === "2026-08-12");
const upcoming = appointments.filter((a) => a.date > "2026-08-12");

function AdminDashboard() {
  return (
    <AdminShell
      title="Mercredi 12 août"
      subtitle="4 séances aujourd'hui · première à 9h30"
      action={
        <Link
          to="/admin/rendez-vous"
          className="inline-flex shrink-0 items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm text-primary-foreground"
        >
          <Plus className="h-4 w-4" /> Nouveau rendez-vous
        </Link>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Séances aujourd'hui" value="4" hint="1 en attente de paiement" />
        <StatCard label="Recettes du mois" value="3 240 €" hint="+ 12 % vs juillet" />
        <StatCard label="Clients actifs" value="86" hint="6 nouveaux ce mois" />
        <StatCard label="Taux de remplissage" value="78 %" hint="semaine en cours" />
      </div>

      <div className="mt-7 grid gap-6 lg:grid-cols-[1.3fr_1fr]">
        <section className="rounded-2xl border border-border/70 bg-card p-6 shadow-soft">
          <h2 className="font-serif text-xl">Aujourd'hui</h2>
          <ul className="mt-5 space-y-3">
            {today.map((a) => {
              const s = getService(a.serviceSlug)!;
              const p = practitioners.find((x) => x.id === a.practitionerId)!;
              return (
                <li
                  key={a.id}
                  className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-4 rounded-xl border border-border/70 bg-secondary/40 p-4"
                >
                  <span className="font-serif text-lg">{a.time}</span>
                  <span className="min-w-0">
                    <span className="block truncate text-sm font-medium">{a.client}</span>
                    <span className="block truncate text-xs text-muted-foreground">
                      {s.name} · {s.duration} min · {p.name}
                    </span>
                  </span>
                  <span
                    className={`shrink-0 rounded-full px-3 py-1 text-xs ${
                      a.payment === "payé"
                        ? "bg-sage-soft text-foreground"
                        : "bg-accent text-accent-foreground"
                    }`}
                  >
                    {a.payment}
                  </span>
                </li>
              );
            })}
          </ul>
        </section>

        <div className="space-y-6">
          <section className="rounded-2xl border border-border/70 bg-card p-6 shadow-soft">
            <h2 className="font-serif text-xl">À venir</h2>
            <ul className="mt-4 divide-y divide-border/70">
              {upcoming.map((a) => (
                <li key={a.id} className="flex items-center justify-between gap-4 py-3">
                  <span className="min-w-0">
                    <span className="block truncate text-sm">{a.client}</span>
                    <span className="block text-xs text-muted-foreground">
                      {new Date(a.date + "T00:00:00").toLocaleDateString("fr-FR", {
                        weekday: "short",
                        day: "numeric",
                        month: "short",
                      })}{" "}
                      · {a.time}
                    </span>
                  </span>
                  <span className="shrink-0 text-sm text-muted-foreground">
                    {formatPrice(getService(a.serviceSlug)!.price)}
                  </span>
                </li>
              ))}
            </ul>
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
              <button className="flex items-center gap-3 rounded-xl border border-border px-4 py-3 text-left text-sm hover:bg-accent">
                <Send className="h-4 w-4 text-sage" /> Envoyer les rappels du jour
              </button>
            </div>
          </section>
        </div>
      </div>
    </AdminShell>
  );
}