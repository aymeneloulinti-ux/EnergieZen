import { createFileRoute } from "@tanstack/react-router";
import { PraticienShell } from "@/components/praticien/PraticienShell";

export const Route = createFileRoute("/praticien/disponibilites")({
  head: () => ({
    meta: [
      { title: "Disponibilités — Espace Praticien — Maison Lumen" },
      { property: "og:title", content: "Disponibilités — Espace Praticien — Maison Lumen" },
    ],
  }),
  component: PraticienDisponibilites,
});

function PraticienDisponibilites() {
  return (
    <PraticienShell title="Disponibilités" subtitle="Gérez vos horaires et exceptions">
      <div className="rounded-3xl border border-border/70 bg-card p-6 shadow-soft">
        <p className="text-muted-foreground">Disponibilités — À venir</p>
      </div>
    </PraticienShell>
  );
}
