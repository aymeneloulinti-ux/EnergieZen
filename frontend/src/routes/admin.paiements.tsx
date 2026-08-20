import { createFileRoute } from "@tanstack/react-router";
import { AdminShell, StatCard } from "@/components/admin/AdminShell";
import { appointments, getService, formatPrice, formatDateFr } from "@/data/site";

export const Route = createFileRoute("/admin/paiements")({
  head: () => ({
    meta: [
      { title: "Paiements — Maison Lumen" },
      { name: "description", content: "Suivi des encaissements et des séances à régler." },
      { property: "og:title", content: "Paiements — Maison Lumen" },
      { property: "og:description", content: "Recettes du cabinet et statut des paiements." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Paiements,
});

function Paiements() {
  return (
    <AdminShell title="Paiements" subtitle="Août 2026">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Encaissé ce mois" value="3 240 €" hint="+ 12 % vs juillet" />
        <StatCard label="En attente" value="165 €" hint="2 séances à régler" />
        <StatCard label="Panier moyen" value="82 €" />
        <StatCard label="Remboursements" value="0 €" />
      </div>

      <div className="mt-6 overflow-x-auto rounded-2xl border border-border/70 bg-card shadow-soft">
        <table className="w-full min-w-[620px] text-sm">
          <thead>
            <tr className="border-b border-border/70 text-left text-xs uppercase tracking-[0.12em] text-muted-foreground">
              <th className="px-5 py-4 font-normal">Référence</th>
              <th className="px-5 py-4 font-normal">Client</th>
              <th className="px-5 py-4 font-normal">Date</th>
              <th className="px-5 py-4 font-normal">Statut</th>
              <th className="px-5 py-4 text-right font-normal">Montant</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((a) => (
              <tr key={a.id} className="border-b border-border/50 last:border-0 hover:bg-accent/40">
                <td className="px-5 py-4 font-mono text-xs">{a.id}</td>
                <td className="px-5 py-4">{a.client}</td>
                <td className="px-5 py-4 text-muted-foreground">{formatDateFr(a.date)}</td>
                <td className="px-5 py-4">
                  <span
                    className={`rounded-full px-3 py-1 text-xs ${
                      a.payment === "payé" ? "bg-sage-soft" : "bg-accent"
                    }`}
                  >
                    {a.payment}
                  </span>
                </td>
                <td className="px-5 py-4 text-right font-serif text-base">
                  {formatPrice(getService(a.serviceSlug)!.price)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminShell>
  );
}