import { createFileRoute } from "@tanstack/react-router";
import { PraticienShell } from "@/components/praticien/PraticienShell";

export const Route = createFileRoute("/praticien/rendez-vous")({
  head: () => ({
    meta: [
      { title: "Rendez-vous — Espace Praticien — Maison Lumen" },
      { property: "og:title", content: "Rendez-vous — Espace Praticien — Maison Lumen" },
    ],
  }),
  component: PraticienRendezVous,
});

function PraticienRendezVous() {
  return (
    <PraticienShell title="Rendez-vous" subtitle="Gérez vos rendez-vous et confirmations">
      <div className="rounded-3xl border border-border/70 bg-card p-6 shadow-soft">
        <p className="text-muted-foreground">Rendez-vous — À venir</p>
      </div>
    </PraticienShell>
  );
}
