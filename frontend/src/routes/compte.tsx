import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { CalendarDays, Clock, MapPin, Pencil, User, X } from "lucide-react";
import { SiteShell } from "@/components/site/SiteShell";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  appointments,
  getService,
  practitioners,
  studio,
  formatPrice,
  formatDateFr,
} from "@/data/site";

export const Route = createFileRoute("/compte")({
  head: () => ({
    meta: [
      { title: "Mon espace — Maison Lumen" },
      {
        name: "description",
        content: "Retrouvez vos rendez-vous, votre historique de séances et vos informations personnelles.",
      },
      { property: "og:title", content: "Mon espace client — Maison Lumen" },
      { property: "og:description", content: "Vos rendez-vous et votre historique en un coup d'œil." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Compte,
});

const tabs = ["Tableau de bord", "Mes rendez-vous", "Historique", "Mon profil"] as const;

const mine = appointments.filter((a) => a.client === "Élise Dumont");
const upcoming = mine.filter((a) => a.status !== "terminé");
const past = mine.filter((a) => a.status === "terminé");

function Compte() {
  const [tab, setTab] = useState<(typeof tabs)[number]>("Tableau de bord");
  const next = upcoming[0]!;
  const nextService = getService(next.serviceSlug)!;
  const nextPract = practitioners.find((p) => p.id === next.practitionerId)!;

  return (
    <SiteShell>
      <section className="mx-auto max-w-5xl px-5 pb-10 pt-12 sm:pt-16">
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 sm:flex sm:justify-between">
          <div className="min-w-0">
            <p className="text-xs uppercase tracking-[0.22em] text-sage">Espace client</p>
            <h1 className="mt-3 truncate text-3xl sm:text-4xl">Bonjour Élise</h1>
          </div>
          <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-sage-soft font-serif">
            ÉD
          </span>
        </div>

        <nav className="mt-8 flex gap-2 overflow-x-auto pb-1">
          {tabs.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTab(t)}
              className={cn(
                "whitespace-nowrap rounded-full border px-5 py-2.5 text-sm transition-colors",
                tab === t
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-card hover:bg-accent",
              )}
            >
              {t}
            </button>
          ))}
        </nav>

        {tab === "Tableau de bord" && (
          <div className="mt-8 space-y-6">
            <article className="bg-warm overflow-hidden rounded-[2rem] border border-border/70 p-7 shadow-soft sm:p-9">
              <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                Prochain rendez-vous
              </p>
              <h2 className="mt-4 text-3xl sm:text-4xl">{nextService.name}</h2>
              <div className="mt-6 grid gap-4 sm:grid-cols-3">
                <p className="flex items-center gap-2.5 text-sm">
                  <CalendarDays className="h-4 w-4 text-sage" /> {formatDateFr(next.date)}
                </p>
                <p className="flex items-center gap-2.5 text-sm">
                  <Clock className="h-4 w-4 text-sage" /> {next.time} · {nextService.duration} min
                </p>
                <p className="flex items-center gap-2.5 text-sm">
                  <User className="h-4 w-4 text-sage" /> {nextPract.name}
                </p>
              </div>
              <p className="mt-4 flex items-center gap-2.5 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" /> {studio.address}
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <button className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm text-primary-foreground">
                  <Pencil className="h-4 w-4" /> Déplacer le rendez-vous
                </button>
                <button className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-card px-6 py-3 text-sm hover:bg-accent">
                  <X className="h-4 w-4" /> Annuler
                </button>
              </div>
            </article>

            <div className="grid gap-6 sm:grid-cols-3">
              {[
                ["Séances réalisées", "9"],
                ["Depuis", "mars 2024"],
                ["Soin préféré", "Soin énergétique"],
              ].map(([k, v]) => (
                <div key={k} className="rounded-3xl border border-border/70 bg-card p-6 shadow-soft">
                  <p className="text-xs uppercase tracking-[0.14em] text-muted-foreground">{k}</p>
                  <p className="mt-3 font-serif text-2xl">{v}</p>
                </div>
              ))}
            </div>

            <div className="rounded-3xl border border-border/70 bg-card p-7 shadow-soft">
              <h3 className="text-xl">Séances passées</h3>
              <ul className="mt-5 divide-y divide-border/70">
                {past.map((a) => (
                  <li key={a.id} className="flex items-center justify-between gap-4 py-4">
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium">{getService(a.serviceSlug)?.name}</p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {formatDateFr(a.date)} · {a.time}
                      </p>
                    </div>
                    <span className="shrink-0 text-sm text-muted-foreground">
                      {formatPrice(getService(a.serviceSlug)?.price ?? 0)}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {tab === "Mes rendez-vous" && (
          <div className="mt-8 space-y-4">
            {upcoming.map((a) => (
              <AppointmentRow key={a.id} id={a.id} />
            ))}
            <Link
              to="/reservation"
              className="inline-flex rounded-full bg-primary px-6 py-3 text-sm text-primary-foreground"
            >
              Réserver une nouvelle séance
            </Link>
          </div>
        )}

        {tab === "Historique" && (
          <div className="mt-8 space-y-4">
            {past.map((a) => (
              <AppointmentRow key={a.id} id={a.id} />
            ))}
          </div>
        )}

        {tab === "Mon profil" && (
          <div className="mt-8 rounded-[2rem] border border-border/70 bg-card p-7 shadow-soft sm:p-9">
            <h2 className="text-2xl">Informations personnelles</h2>
            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              <div>
                <Label htmlFor="p-first">Prénom</Label>
                <Input id="p-first" className="mt-2 rounded-xl" defaultValue="Élise" />
              </div>
              <div>
                <Label htmlFor="p-last">Nom</Label>
                <Input id="p-last" className="mt-2 rounded-xl" defaultValue="Dumont" />
              </div>
              <div>
                <Label htmlFor="p-mail">E-mail</Label>
                <Input id="p-mail" className="mt-2 rounded-xl" defaultValue="elise.dumont@gmail.com" />
              </div>
              <div>
                <Label htmlFor="p-phone">Téléphone</Label>
                <Input id="p-phone" className="mt-2 rounded-xl" defaultValue="+32 471 22 18 04" />
              </div>
            </div>
            <button className="mt-7 rounded-full bg-primary px-6 py-3 text-sm text-primary-foreground">
              Enregistrer
            </button>
          </div>
        )}
      </section>
    </SiteShell>
  );
}

function AppointmentRow({ id }: { id: string }) {
  const a = appointments.find((x) => x.id === id)!;
  const service = getService(a.serviceSlug)!;
  const pract = practitioners.find((p) => p.id === a.practitionerId)!;
  return (
    <article className="grid gap-4 rounded-3xl border border-border/70 bg-card p-6 shadow-soft sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center">
      <div className="min-w-0">
        <p className="font-serif text-xl">{service.name}</p>
        <p className="mt-2 text-sm text-muted-foreground">
          {formatDateFr(a.date)} · {a.time} · {pract.name}
        </p>
      </div>
      <div className="flex items-center gap-3">
        <span className="rounded-full bg-secondary px-3 py-1.5 text-xs capitalize text-muted-foreground">
          {a.status}
        </span>
        <span className="font-serif text-lg">{formatPrice(service.price)}</span>
      </div>
    </article>
  );
}