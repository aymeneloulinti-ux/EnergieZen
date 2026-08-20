import { createFileRoute } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { AdminShell } from "@/components/admin/AdminShell";
import { Input } from "@/components/ui/input";
import { clients, formatPrice } from "@/data/site";

export const Route = createFileRoute("/admin/clients")({
  head: () => ({
    meta: [
      { title: "Clients — Maison Lumen" },
      { name: "description", content: "Fichier clients du cabinet : visites, dernière séance et suivi." },
      { property: "og:title", content: "Clients — Maison Lumen" },
      { property: "og:description", content: "Suivi des personnes accompagnées au cabinet." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Clients,
});

function Clients() {
  return (
    <AdminShell title="Clients" subtitle="86 personnes accompagnées">
      <div className="relative mb-5 max-w-sm">
        <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input className="rounded-full pl-11" placeholder="Rechercher un nom ou un e-mail" />
      </div>

      <div className="overflow-x-auto rounded-2xl border border-border/70 bg-card shadow-soft">
        <table className="w-full min-w-[640px] text-sm">
          <thead>
            <tr className="border-b border-border/70 text-left text-xs uppercase tracking-[0.12em] text-muted-foreground">
              <th className="px-5 py-4 font-normal">Client</th>
              <th className="px-5 py-4 font-normal">Contact</th>
              <th className="px-5 py-4 font-normal">Séances</th>
              <th className="px-5 py-4 font-normal">Dernière visite</th>
              <th className="px-5 py-4 text-right font-normal">Total</th>
            </tr>
          </thead>
          <tbody>
            {clients.map((c) => (
              <tr key={c.email} className="border-b border-border/50 last:border-0 hover:bg-accent/40">
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-secondary text-xs">
                      {c.name.split(" ").map((n) => n[0]).join("")}
                    </span>
                    <span className="font-medium">{c.name}</span>
                  </div>
                </td>
                <td className="px-5 py-4 text-muted-foreground">
                  <span className="block">{c.email}</span>
                  <span className="block text-xs">{c.phone}</span>
                </td>
                <td className="px-5 py-4">{c.visits}</td>
                <td className="px-5 py-4 text-muted-foreground">{c.last}</td>
                <td className="px-5 py-4 text-right font-serif text-base">{formatPrice(c.spent)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminShell>
  );
}