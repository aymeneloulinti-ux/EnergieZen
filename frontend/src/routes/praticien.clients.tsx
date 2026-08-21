import { createFileRoute } from "@tanstack/react-router";
import { PraticienShell } from "@/components/praticien/PraticienShell";

export const Route = createFileRoute("/praticien/clients")({
  head: () => ({
    meta: [
      { title: "Clients — Espace Praticien — Maison Lumen" },
      { property: "og:title", content: "Clients — Espace Praticien — Maison Lumen" },
    ],
  }),
  component: PraticienClients,
});

function PraticienClients() {
  return (
    <PraticienShell title="Clients" subtitle="Consulter votre clientèle">
      <div className="rounded-3xl border border-border/70 bg-card p-6 shadow-soft">
        <p className="text-muted-foreground">Clients — À venir</p>
      </div>
    </PraticienShell>
  );
}
