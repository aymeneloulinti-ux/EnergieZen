import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { CreditCard, Lock, Mail, ArrowLeft } from "lucide-react";
import { SiteShell } from "@/components/site/SiteShell";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getService, practitioners, formatPrice } from "@/data/site";
import { useStudioSettings } from "@/hooks/useStudioSettings";

type Search = {
  service?: string | undefined;
  practitioner?: string | undefined;
  date?: string | undefined;
  time?: string | undefined;
  name?: string | undefined;
  email?: string | undefined;
};

const str = (v: unknown) => (typeof v === "string" && v ? v : undefined);

export const Route = createFileRoute("/paiement")({
  validateSearch: (search: Record<string, unknown>): Search => ({
    service: str(search["service"]),
    practitioner: str(search["practitioner"]),
    date: str(search["date"]),
    time: str(search["time"]),
    name: str(search["name"]),
    email: str(search["email"]),
  }),
  head: () => ({
    meta: [
      { title: "Paiement sécurisé — Maison Lumen" },
      { name: "description", content: "Réglez votre séance en ligne en toute sécurité." },
      { property: "og:title", content: "Paiement sécurisé — Maison Lumen" },
      {
        property: "og:description",
        content: "Dernière étape avant la confirmation de votre rendez-vous.",
      },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Paiement,
});

function Paiement() {
  const navigate = useNavigate();
  const studio = useStudioSettings();
  const s = Route.useSearch();
  const service = getService(s.service ?? "soin-energetique");
  const practitioner = practitioners.find((p) => p.id === s.practitioner) ?? practitioners[0]!;
  const dateLabel = s.date
    ? new Date(s.date + "T00:00:00").toLocaleDateString("fr-FR", {
        weekday: "long",
        day: "numeric",
        month: "long",
      })
    : "jeudi 20 août";

  return (
    <SiteShell>
      <section className="mx-auto max-w-5xl px-5 pb-10 pt-12 sm:pt-16">
        <Link
          to="/reservation"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" /> Modifier ma réservation
        </Link>
        <h1 className="mt-6 text-4xl leading-tight sm:text-5xl">Finaliser le paiement</h1>

        <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_0.85fr]">
          {/* Payment */}
          <div className="rounded-[2rem] border border-border/70 bg-card p-6 shadow-soft sm:p-8">
            <div className="flex items-center gap-2 text-sm text-sage">
              <Lock className="h-4 w-4" /> Paiement sécurisé
            </div>

            <div className="mt-6 space-y-5">
              <div>
                <Label htmlFor="cardname">Titulaire de la carte</Label>
                <Input
                  id="cardname"
                  className="mt-2 rounded-xl"
                  defaultValue={s.name ?? "Élise Dumont"}
                />
              </div>
              <div>
                <Label htmlFor="card">Numéro de carte</Label>
                <div className="relative mt-2">
                  <Input id="card" className="rounded-xl pr-11" placeholder="4242 4242 4242 4242" />
                  <CreditCard className="absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="exp">Expiration</Label>
                  <Input id="exp" className="mt-2 rounded-xl" placeholder="09 / 29" />
                </div>
                <div>
                  <Label htmlFor="cvc">CVC</Label>
                  <Input id="cvc" className="mt-2 rounded-xl" placeholder="123" />
                </div>
              </div>
              <div>
                <Label htmlFor="mail">E-mail de confirmation</Label>
                <Input
                  id="mail"
                  className="mt-2 rounded-xl"
                  defaultValue={s.email ?? "elise.dumont@gmail.com"}
                />
              </div>
            </div>

            <button
              type="button"
              onClick={() =>
                navigate({
                  to: "/confirmation",
                  search: {
                    service: service?.slug,
                    practitioner: practitioner.id,
                    date: s.date,
                    time: s.time,
                  },
                })
              }
              className="mt-8 w-full rounded-full bg-primary px-6 py-4 text-sm text-primary-foreground transition-transform hover:-translate-y-0.5"
            >
              Payer {service ? formatPrice(service.price) : ""}
            </button>

            <p className="mt-5 flex items-start gap-2 text-xs leading-relaxed text-muted-foreground">
              <Mail className="mt-0.5 h-3.5 w-3.5 shrink-0" />
              Vous recevrez une confirmation par e-mail avec l'adresse du cabinet et les
              informations pratiques.
            </p>
          </div>

          {/* Summary */}
          <aside className="rounded-[2rem] border border-border/70 bg-secondary/50 p-6 shadow-soft sm:p-8 lg:sticky lg:top-28 lg:self-start">
            <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
              Votre rendez-vous
            </p>
            <h2 className="mt-4 font-serif text-2xl">{service?.name}</h2>
            <dl className="mt-5 space-y-3 text-sm">
              {[
                ["Praticienne", practitioner.name],
                ["Date", dateLabel],
                ["Heure", s.time ?? "10:30"],
                ["Durée", `${service?.duration ?? 60} minutes`],
                ["Lieu", studio.address],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between gap-6">
                  <dt className="text-muted-foreground">{k}</dt>
                  <dd className="text-right">{v}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-6 flex items-end justify-between border-t border-border/70 pt-5">
              <span className="text-sm text-muted-foreground">Total à régler</span>
              <span className="font-serif text-3xl">
                {service ? formatPrice(service.price) : "—"}
              </span>
            </div>
            <p className="mt-5 text-xs leading-relaxed text-muted-foreground">
              Annulation gratuite jusqu'à 24 h avant le rendez-vous. Au-delà, la séance est due.
            </p>
          </aside>
        </div>
      </section>
    </SiteShell>
  );
}
