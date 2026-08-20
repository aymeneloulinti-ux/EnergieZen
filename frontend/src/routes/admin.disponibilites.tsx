import { createFileRoute } from "@tanstack/react-router";
import { Ban, Plus } from "lucide-react";
import { AdminShell } from "@/components/admin/AdminShell";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";

export const Route = createFileRoute("/admin/disponibilites")({
  head: () => ({
    meta: [
      { title: "Disponibilités — Maison Lumen" },
      { name: "description", content: "Horaires hebdomadaires, pauses, congés et créneaux bloqués." },
      { property: "og:title", content: "Disponibilités — Maison Lumen" },
      { property: "og:description", content: "Gestion des horaires d'ouverture du cabinet." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Disponibilites,
});

const week = [
  { day: "Lundi", open: false, from: "—", to: "—", pause: "—" },
  { day: "Mardi", open: true, from: "09:00", to: "19:00", pause: "12:30 — 13:30" },
  { day: "Mercredi", open: true, from: "09:00", to: "19:00", pause: "12:30 — 13:30" },
  { day: "Jeudi", open: true, from: "09:00", to: "19:00", pause: "12:30 — 13:30" },
  { day: "Vendredi", open: true, from: "09:00", to: "17:00", pause: "12:30 — 13:30" },
  { day: "Samedi", open: true, from: "10:00", to: "16:00", pause: "—" },
  { day: "Dimanche", open: false, from: "—", to: "—", pause: "—" },
];

const exceptions = [
  { label: "Congés d'été", period: "17 — 31 août 2026", type: "Vacances" },
  { label: "Assomption", period: "15 août 2026", type: "Jour férié" },
  { label: "Formation à Gand", period: "4 septembre 2026, 9h — 18h", type: "Journée personnelle" },
  { label: "Après-midi bloqué", period: "21 août 2026, 14h — 18h", type: "Indisponibilité" },
];

function Disponibilites() {
  return (
    <AdminShell
      title="Disponibilités"
      subtitle="Horaires du cabinet et exceptions"
      action={
        <button className="inline-flex shrink-0 items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm text-primary-foreground">
          <Ban className="h-4 w-4" /> Bloquer une période
        </button>
      }
    >
      <div className="grid gap-6 xl:grid-cols-[1.2fr_1fr]">
        <section className="rounded-2xl border border-border/70 bg-card p-6 shadow-soft">
          <h2 className="font-serif text-xl">Horaires hebdomadaires</h2>
          <ul className="mt-5 space-y-2">
            {week.map((d) => (
              <li
                key={d.day}
                className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 rounded-xl border border-border/70 bg-secondary/40 px-4 py-3 sm:grid-cols-[110px_1fr_auto]"
              >
                <span className="text-sm font-medium">{d.day}</span>
                <span className="min-w-0 text-xs text-muted-foreground sm:text-sm">
                  {d.open ? (
                    <>
                      {d.from} — {d.to}
                      <span className="ml-2 text-muted-foreground/80">pause {d.pause}</span>
                    </>
                  ) : (
                    "Fermé"
                  )}
                </span>
                <Switch defaultChecked={d.open} />
              </li>
            ))}
          </ul>

          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <div>
              <label className="text-xs text-muted-foreground">Ouverture</label>
              <Input className="mt-2 rounded-xl" defaultValue="09:00" />
            </div>
            <div>
              <label className="text-xs text-muted-foreground">Fermeture</label>
              <Input className="mt-2 rounded-xl" defaultValue="19:00" />
            </div>
            <div>
              <label className="text-xs text-muted-foreground">Pause déjeuner</label>
              <Input className="mt-2 rounded-xl" defaultValue="12:30 — 13:30" />
            </div>
          </div>
        </section>

        <section className="rounded-2xl border border-border/70 bg-card p-6 shadow-soft">
          <div className="flex items-center justify-between gap-4">
            <h2 className="font-serif text-xl">Exceptions</h2>
            <button className="inline-flex items-center gap-1.5 rounded-full border border-border px-4 py-2 text-xs hover:bg-accent">
              <Plus className="h-3.5 w-3.5" /> Ajouter
            </button>
          </div>
          <ul className="mt-5 divide-y divide-border/70">
            {exceptions.map((e) => (
              <li key={e.label} className="flex items-start justify-between gap-4 py-4">
                <div className="min-w-0">
                  <p className="text-sm font-medium">{e.label}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{e.period}</p>
                </div>
                <span className="shrink-0 rounded-full bg-secondary px-3 py-1 text-[11px] text-muted-foreground">
                  {e.type}
                </span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </AdminShell>
  );
}