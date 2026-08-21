import { createFileRoute } from "@tanstack/react-router";
import { PraticienShell } from "@/components/praticien/PraticienShell";

export const Route = createFileRoute("/praticien/calendrier")({
  head: () => ({
    meta: [
      { title: "Calendrier — Espace Praticien — Maison Lumen" },
      { property: "og:title", content: "Calendrier — Espace Praticien — Maison Lumen" },
    ],
  }),
  component: PraticienCalendrier,
});

function PraticienCalendrier() {
  return (
    <PraticienShell title="Calendrier" subtitle="Visualisez vos créneaux et vos rendez-vous">
      <div className="rounded-3xl border border-border/70 bg-card p-6 shadow-soft">
        <p className="text-muted-foreground">Calendrier — À venir</p>
      </div>
    </PraticienShell>
  );
}
