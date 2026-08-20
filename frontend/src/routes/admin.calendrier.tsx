import { createFileRoute } from "@tanstack/react-router";
import { Fragment, useState } from "react";
import { AdminShell } from "@/components/admin/AdminShell";
import { cn } from "@/lib/utils";
import { appointments, getService, practitioners } from "@/data/site";

export const Route = createFileRoute("/admin/calendrier")({
  head: () => ({
    meta: [
      { title: "Calendrier — Maison Lumen" },
      { name: "description", content: "Agenda du cabinet : vues jour, semaine et mois." },
      { property: "og:title", content: "Calendrier — Maison Lumen" },
      { property: "og:description", content: "Créneaux disponibles, réservés et bloqués." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Calendrier,
});

const days = [
  { label: "Mar 11", date: "2026-08-11" },
  { label: "Mer 12", date: "2026-08-12" },
  { label: "Jeu 13", date: "2026-08-13" },
  { label: "Ven 14", date: "2026-08-14" },
  { label: "Sam 15", date: "2026-08-15" },
];
const hours = ["09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00"];
const blocked: Record<string, string[]> = {
  "2026-08-11": ["09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00"],
  "2026-08-12": ["12:00", "13:00"],
  "2026-08-13": ["13:00"],
  "2026-08-14": ["13:00", "17:00", "18:00"],
  "2026-08-15": ["16:00", "17:00", "18:00"],
};

function Calendrier() {
  const [view, setView] = useState<"Jour" | "Semaine" | "Mois">("Semaine");
  const [filter, setFilter] = useState<string>("all");

  const visible = appointments.filter(
    (a) => filter === "all" || a.practitionerId === filter,
  );

  return (
    <AdminShell
      title="Calendrier"
      subtitle="Semaine du 10 au 16 août 2026"
      action={
        <div className="flex shrink-0 gap-2">
          {(["Jour", "Semaine", "Mois"] as const).map((v) => (
            <button
              key={v}
              onClick={() => setView(v)}
              className={cn(
                "rounded-full border px-4 py-2 text-sm transition-colors",
                view === v ? "border-primary bg-primary text-primary-foreground" : "border-border hover:bg-accent",
              )}
            >
              {v}
            </button>
          ))}
        </div>
      }
    >
      <div className="mb-5 flex flex-wrap items-center gap-2">
        <span className="text-xs uppercase tracking-[0.14em] text-muted-foreground">Praticienne</span>
        {[{ id: "all", name: "Toutes" }, ...practitioners].map((p) => (
          <button
            key={p.id}
            onClick={() => setFilter(p.id)}
            className={cn(
              "rounded-full border px-4 py-1.5 text-sm",
              filter === p.id ? "border-sage bg-sage-soft" : "border-border hover:bg-accent",
            )}
          >
            {p.name}
          </button>
        ))}
        <div className="ml-auto flex flex-wrap gap-x-5 gap-y-1 text-xs text-muted-foreground">
          <span className="flex items-center gap-2"><i className="h-3 w-3 rounded bg-card ring-1 ring-border" /> Disponible</span>
          <span className="flex items-center gap-2"><i className="h-3 w-3 rounded bg-sage-soft" /> Réservé</span>
          <span className="flex items-center gap-2"><i className="h-3 w-3 rounded bg-muted" /> Bloqué</span>
        </div>
      </div>

      {view === "Mois" ? (
        <MonthView />
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-border/70 bg-card p-4 shadow-soft">
          <div
            className="grid min-w-[720px] gap-2"
            style={{
              gridTemplateColumns: `72px repeat(${view === "Jour" ? 1 : days.length}, minmax(0,1fr))`,
            }}
          >
            <div />
            {(view === "Jour" ? days.slice(1, 2) : days).map((d) => (
              <div key={d.date} className="pb-2 text-center text-sm font-medium">
                {d.label}
              </div>
            ))}
            {hours.map((h) => (
              <Fragment key={h}>
                <div className="py-3 text-xs text-muted-foreground">
                  {h}
                </div>
                {(view === "Jour" ? days.slice(1, 2) : days).map((d) => {
                  const appt = visible.find((a) => a.date === d.date && a.time.startsWith(h.slice(0, 2)));
                  const isBlocked = blocked[d.date]?.includes(h);
                  return (
                    <div
                      key={d.date + h}
                      className={cn(
                        "min-h-14 rounded-xl border p-2 text-xs",
                        appt
                          ? "border-sage/40 bg-sage-soft"
                          : isBlocked
                            ? "border-transparent bg-muted text-muted-foreground"
                            : "border-border/70 bg-card hover:bg-accent/50",
                      )}
                    >
                      {appt ? (
                        <>
                          <p className="truncate font-medium">{appt.client}</p>
                          <p className="truncate text-muted-foreground">
                            {getService(appt.serviceSlug)!.name}
                          </p>
                        </>
                      ) : isBlocked ? (
                        <span className="opacity-70">Indisponible</span>
                      ) : null}
                    </div>
                  );
                })}
              </Fragment>
            ))}
          </div>
        </div>
      )}
    </AdminShell>
  );
}

function MonthView() {
  const busy = [3, 4, 5, 6, 10, 11, 12, 13, 17, 18, 19, 24, 25, 26];
  return (
    <div className="rounded-2xl border border-border/70 bg-card p-5 shadow-soft">
      <div className="grid grid-cols-7 gap-2 text-center text-xs text-muted-foreground">
        {["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"].map((d) => (
          <span key={d}>{d}</span>
        ))}
      </div>
      <div className="mt-2 grid grid-cols-7 gap-2">
        {Array.from({ length: 31 }, (_, i) => i + 1).map((d) => (
          <div
            key={d}
            className={cn(
              "min-h-20 rounded-xl border border-border/70 p-2 text-xs",
              d === 12 && "border-sage bg-sage-soft",
            )}
          >
            <span className="font-medium">{d}</span>
            {busy.includes(d) && (
              <span className="mt-2 block rounded-md bg-secondary px-1.5 py-1 text-[10px] text-muted-foreground">
                {(d % 4) + 1} séances
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}