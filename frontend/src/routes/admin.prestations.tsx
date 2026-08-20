import { createFileRoute } from "@tanstack/react-router";
import { Plus } from "lucide-react";
import { AdminShell } from "@/components/admin/AdminShell";
import { Switch } from "@/components/ui/switch";
import { services, formatPrice } from "@/data/site";

export const Route = createFileRoute("/admin/prestations")({
  head: () => ({
    meta: [
      { title: "Prestations — Maison Lumen" },
      { name: "description", content: "Gérez les soins proposés, leur durée et leur tarif." },
      { property: "og:title", content: "Prestations — Maison Lumen" },
      { property: "og:description", content: "Catalogue des séances du cabinet." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Prestations,
});

function Prestations() {
  return (
    <AdminShell
      title="Prestations"
      subtitle="4 soins publiés sur le site"
      action={
        <button className="inline-flex shrink-0 items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm text-primary-foreground">
          <Plus className="h-4 w-4" /> Ajouter un soin
        </button>
      }
    >
      <div className="grid gap-4 lg:grid-cols-2">
        {services.map((s) => (
          <article
            key={s.slug}
            className="grid grid-cols-[auto_minmax(0,1fr)] gap-4 rounded-2xl border border-border/70 bg-card p-5 shadow-soft"
          >
            <img
              src={s.image}
              alt={s.name}
              loading="lazy"
              width={1200}
              height={912}
              className="h-24 w-24 shrink-0 rounded-xl object-cover"
            />
            <div className="min-w-0">
              <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3">
                <h2 className="truncate font-serif text-xl">{s.name}</h2>
                <Switch defaultChecked />
              </div>
              <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{s.short}</p>
              <div className="mt-4 flex flex-wrap gap-2 text-xs">
                <span className="rounded-full bg-secondary px-3 py-1.5">{s.duration} min</span>
                <span className="rounded-full bg-secondary px-3 py-1.5">{formatPrice(s.price)}</span>
                <button className="rounded-full border border-border px-3 py-1.5 hover:bg-accent">
                  Modifier
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </AdminShell>
  );
}