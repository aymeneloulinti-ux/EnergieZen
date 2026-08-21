import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { CalendarPlus, Check, Home, MapPin, Mail } from "lucide-react";
import { SiteShell } from "@/components/site/SiteShell";
import { getService, practitioners, studio } from "@/data/site";
import { getAppointment, type ApiAppointment } from "@/lib/api";

type Search = {
  service?: string | undefined;
  appointmentId?: string | undefined;
  practitioner?: string | undefined;
  date?: string | undefined;
  time?: string | undefined;
};

const str = (v: unknown) => (typeof v === "string" && v ? v : undefined);

export const Route = createFileRoute("/confirmation")({
  validateSearch: (search: Record<string, unknown>): Search => ({
    service: str(search["service"]),
    appointmentId: str(search["appointmentId"]),
    practitioner: str(search["practitioner"]),
    date: str(search["date"]),
    time: str(search["time"]),
  }),
  head: () => ({
    meta: [
      { title: "Rendez-vous confirmé — Maison Lumen" },
      { name: "description", content: "Votre rendez-vous au cabinet est confirmé." },
      { property: "og:title", content: "Rendez-vous confirmé — Maison Lumen" },
      { property: "og:description", content: "À très bientôt au cabinet d'Ixelles." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Confirmation,
});

function Confirmation() {
  const s = Route.useSearch();
  const [appointment, setAppointment] = useState<ApiAppointment | null>(null);
  const [appointmentLoading, setAppointmentLoading] = useState(!!s.appointmentId);
  const [appointmentError, setAppointmentError] = useState<string | null>(null);

  useEffect(() => {
    if (!s.appointmentId) return;

    setAppointmentLoading(true);
    getAppointment(s.appointmentId)
      .then(setAppointment)
      .catch((reason: unknown) =>
        setAppointmentError(reason instanceof Error ? reason.message : "Impossible de récupérer le rendez-vous"),
      )
      .finally(() => setAppointmentLoading(false));
  }, [s.appointmentId]);

  if (appointmentLoading) {
    return (
      <SiteShell>
        <p className="mx-auto max-w-2xl px-5 pt-16 text-center text-muted-foreground">
          Chargement de votre rendez-vous…
        </p>
      </SiteShell>
    );
  }

  if (s.appointmentId && (appointmentError || !appointment)) {
    return (
      <SiteShell>
        <p className="mx-auto max-w-2xl px-5 pt-16 text-center text-destructive">
          {appointmentError ?? "Rendez-vous introuvable"}
        </p>
      </SiteShell>
    );
  }

  const service = appointment?.service ?? getService(s.service ?? "soin-energetique");
  const practitioner = appointment
    ? {
        name: `${appointment.practitioner.user.firstName} ${appointment.practitioner.user.lastName}`,
      }
    : practitioners.find((p) => p.id === s.practitioner) ?? practitioners[0]!;
  const appointmentDate = appointment ? new Date(appointment.startAt) : null;
  const dateLabel = appointmentDate
    ? appointmentDate.toLocaleDateString("fr-FR", {
        timeZone: "Europe/Brussels",
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : s.date
    ? new Date(s.date + "T00:00:00").toLocaleDateString("fr-FR", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "jeudi 20 août 2026";

  const appointmentTime = appointmentDate
    ? appointmentDate.toLocaleTimeString("fr-FR", {
        timeZone: "Europe/Brussels",
        hour: "2-digit",
        minute: "2-digit",
      })
    : s.time ?? "10:30";

  return (
    <SiteShell>
      <section className="mx-auto max-w-2xl px-5 pb-10 pt-16 text-center sm:pt-24">
        <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-sage-soft">
          <Check className="h-7 w-7 text-sage" />
        </div>
        <h1 className="mt-8 text-4xl leading-tight sm:text-5xl">
          Votre rendez-vous est confirmé.
        </h1>
        <p className="mt-5 text-muted-foreground">
          Un e-mail de confirmation vient de vous être envoyé. Vous y trouverez l'adresse du
          cabinet et quelques conseils pour bien préparer votre venue.
        </p>

        <div className="mt-10 rounded-[2rem] border border-border/70 bg-card p-7 text-left shadow-soft sm:p-9">
          <dl className="divide-y divide-border/70">
            {[
              ["Soin", service?.name ?? "—"],
              ["Date", dateLabel],
              ["Heure", appointmentTime],
              ["Durée", `${service?.duration ?? 60} minutes`],
              ["Praticienne", practitioner.name],
            ].map(([k, v]) => (
              <div key={k} className="flex items-center justify-between gap-6 py-4 text-sm">
                <dt className="text-muted-foreground">{k}</dt>
                <dd className="text-right font-medium">{v}</dd>
              </div>
            ))}
            <div className="flex items-start justify-between gap-6 py-4 text-sm">
              <dt className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="h-4 w-4" /> Adresse
              </dt>
              <dd className="text-right font-medium">{studio.address}</dd>
            </div>
            <div className="flex items-center justify-between gap-6 py-4 text-sm">
              <dt className="text-muted-foreground">Numéro de confirmation</dt>
              <dd className="font-mono text-right font-medium">{appointment?.id ?? "—"}</dd>
            </div>
          </dl>
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <button
            type="button"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm text-primary-foreground transition-transform hover:-translate-y-0.5"
          >
            <CalendarPlus className="h-4 w-4" /> Ajouter à mon calendrier
          </button>
          <Link
            to="/compte"
            className="inline-flex items-center justify-center rounded-full border border-border bg-card px-6 py-3.5 text-sm transition-colors hover:bg-accent"
          >
            Voir mon rendez-vous
          </Link>
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm text-muted-foreground hover:text-foreground"
          >
            <Home className="h-4 w-4" /> Retour à l'accueil
          </Link>
        </div>

        <p className="mt-8 flex items-center justify-center gap-2 text-xs text-muted-foreground">
          <Mail className="h-3.5 w-3.5" /> Confirmation envoyée à votre adresse e-mail.
        </p>
      </section>
    </SiteShell>
  );
}