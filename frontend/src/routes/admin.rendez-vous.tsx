import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Check, Clock, Mail, Pencil, Phone, X } from "lucide-react";
import { AdminShell } from "@/components/admin/AdminShell";
import { cn } from "@/lib/utils";
import {
  appointments,
  getService,
  practitioners,
  formatPrice,
  formatDateFr,
} from "@/data/site";

export const Route = createFileRoute("/admin/rendez-vous")({
  head: () => ({
    meta: [
      { title: "Rendez-vous — Maison Lumen" },
      { name: "description", content: "Liste et détail des rendez-vous du cabinet." },
      { property: "og:title", content: "Rendez-vous — Maison Lumen" },
      { property: "og:description", content: "Confirmer, déplacer, annuler ou clôturer une séance." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: RendezVous,
});

function RendezVous() {
  const [selected, setSelected] = useState(appointments[2]!.id);
  const a = appointments.find((x) => x.id === selected)!;
  const service = getService(a.serviceSlug)!;
  const pract = practitioners.find((p) => p.id === a.practitionerId)!;

  return (
    <AdminShell title="Rendez-vous" subtitle="10 rendez-vous enregistrés">
      <div className="grid gap-6 xl:grid-cols-[1fr_1.05fr]">
        <section className="rounded-2xl border border-border/70 bg-card p-4 shadow-soft">
          <ul className="divide-y divide-border/70">
            {appointments.map((x) => (
              <li key={x.id}>
                <button
                  onClick={() => setSelected(x.id)}
                  className={cn(
                    "grid w-full grid-cols-[minmax(0,1fr)_auto] items-center gap-3 rounded-xl px-3 py-4 text-left transition-colors",
                    selected === x.id ? "bg-sage-soft/50" : "hover:bg-accent/50",
                  )}
                >
                  <span className="min-w-0">
                    <span className="block truncate text-sm font-medium">{x.client}</span>
                    <span className="block truncate text-xs text-muted-foreground">
                      {formatDateFr(x.date)} · {x.time} · {getService(x.serviceSlug)!.name}
                    </span>
                  </span>
                  <span className="shrink-0 rounded-full bg-secondary px-3 py-1 text-[11px] capitalize text-muted-foreground">
                    {x.status}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-2xl border border-border/70 bg-card p-6 shadow-soft xl:sticky xl:top-6 xl:self-start">
          <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-4">
            <div className="min-w-0">
              <p className="text-xs uppercase tracking-[0.14em] text-muted-foreground">
                {a.id}
              </p>
              <h2 className="mt-2 truncate font-serif text-2xl">{a.client}</h2>
            </div>
            <span className="shrink-0 rounded-full bg-sage-soft px-3 py-1.5 text-xs capitalize">
              {a.status}
            </span>
          </div>

          <div className="mt-5 flex flex-wrap gap-3">
            <a
              href={`mailto:${a.email}`}
              className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm hover:bg-accent"
            >
              <Mail className="h-3.5 w-3.5" /> {a.email}
            </a>
            <a
              href={`tel:${a.phone}`}
              className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm hover:bg-accent"
            >
              <Phone className="h-3.5 w-3.5" /> {a.phone}
            </a>
          </div>

          <dl className="mt-6 divide-y divide-border/70 rounded-xl bg-secondary/40 px-4">
            {[
              ["Prestation", service.name],
              ["Praticienne", pract.name],
              ["Date", formatDateFr(a.date)],
              ["Heure", a.time],
              ["Durée", `${service.duration} minutes`],
              ["Montant", formatPrice(service.price)],
              ["Paiement", a.payment],
              ["Statut", a.status],
            ].map(([k, v]) => (
              <div key={k} className="flex justify-between gap-4 py-3 text-sm">
                <dt className="text-muted-foreground">{k}</dt>
                <dd className="text-right capitalize">{v}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-6 grid gap-2 sm:grid-cols-2">
            <button className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-sm text-primary-foreground">
              <Check className="h-4 w-4" /> Confirmer
            </button>
            <button className="inline-flex items-center justify-center gap-2 rounded-full border border-border px-5 py-3 text-sm hover:bg-accent">
              <Pencil className="h-4 w-4" /> Déplacer
            </button>
            <button className="inline-flex items-center justify-center gap-2 rounded-full border border-border px-5 py-3 text-sm hover:bg-accent">
              <Clock className="h-4 w-4" /> Marquer comme terminé
            </button>
            <button className="inline-flex items-center justify-center gap-2 rounded-full border border-destructive/40 px-5 py-3 text-sm text-destructive hover:bg-destructive/10">
              <X className="h-4 w-4" /> Annuler
            </button>
          </div>

          <button className="mt-3 w-full rounded-full bg-secondary px-5 py-3 text-sm hover:bg-accent">
            Contacter la cliente
          </button>
        </section>
      </div>
    </AdminShell>
  );
}