import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, Check, Clock, ShieldCheck } from "lucide-react";
import { SiteShell } from "@/components/site/SiteShell";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { formatPrice } from "@/data/site";
import { ApiError, createAppointment } from "@/lib/api";
import { useAvailability } from "@/hooks/useAvailability";
import { useAuth } from "@/hooks/useAuth";
import { usePractitioners } from "@/hooks/usePractitioners";
import { useServices } from "@/hooks/useServices";

type Search = { service?: string | undefined };

export const Route = createFileRoute("/reservation")({
  validateSearch: (search: Record<string, unknown>): Search => ({
    service: typeof search["service"] === "string" ? (search["service"] as string) : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Prendre rendez-vous — Maison Lumen" },
      {
        name: "description",
        content:
          "Réservez votre séance en quelques étapes : soin, praticienne, date, horaire et confirmation.",
      },
      { property: "og:title", content: "Prendre rendez-vous — Maison Lumen" },
      { property: "og:description", content: "Réservation en ligne en moins de deux minutes." },
    ],
  }),
  component: Reservation,
});

const stepLabels = ["Soin", "Praticienne", "Date", "Horaire", "Vos infos", "Récapitulatif"];

function Reservation() {
  const navigate = useNavigate();
  const { service: presetService } = Route.useSearch();
  const { user, isAuthenticated, login, register } = useAuth();
  const [step, setStep] = useState(1);
  const [serviceSlug, setServiceSlug] = useState(presetService ?? "");
  const [practitionerId, setPractitionerId] = useState("");
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [time, setTime] = useState("");
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    first: "",
    last: "",
    email: "",
    phone: "",
    message: "",
    password: "",
  });

  useEffect(() => {
    if (!user) return;
    setForm((current) => ({
      ...current,
      first: current.first || user.firstName,
      last: current.last || user.lastName,
      email: current.email || user.email,
      phone: current.phone || user.phone || "",
    }));
  }, [user]);

  const { services, loading: servicesLoading, error: servicesError } = useServices();
  const { practitioners, loading: practitionersLoading, error: practitionersError } = usePractitioners();
  const service = services.find((item) => item.slug === serviceSlug);
  const compatiblePractitioners = service
    ? practitioners.filter((item) => item.services.some((itemService) => itemService.id === service.id))
    : [];
  const practitioner = practitioners.find((p) => p.id === practitionerId);
  const dateValue = date
    ? new Intl.DateTimeFormat("en-CA", { timeZone: "Europe/Brussels" }).format(date)
    : "";
  const { slots, loading: slotsLoading, error: slotsError } = useAvailability({
    practitionerId,
    serviceId: service?.id ?? "",
    date: dateValue,
  });
  const selectedSlot = slots.find((slot) => slot.time === time && slot.state === "available");

  useEffect(() => {
    if (!servicesLoading && presetService && service) setStep(2);
  }, [presetService, service, servicesLoading]);

  useEffect(() => {
    if (practitionerId && !compatiblePractitioners.some((item) => item.id === practitionerId)) {
      setPractitionerId("");
      setTime("");
    }
  }, [compatiblePractitioners, practitionerId]);

  const dateLabel = date
    ? date.toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long" })
    : "";

  const canContinue =
    (step === 1 && !!service) ||
    (step === 2 && !!practitionerId) ||
    (step === 3 && !!date) ||
    (step === 4 && !!time) ||
    (step === 5 && form.first && form.last && form.email && form.phone && (isAuthenticated || form.password)) ||
    step === 6;

  const submitReservation = async () => {
    if (!service || !practitioner || !selectedSlot || submitting) return;

    setSubmitting(true);
    setSubmitError(null);

    try {
      if (!isAuthenticated) {
        try {
          await register({
            email: form.email,
            password: form.password,
            firstName: form.first,
            lastName: form.last,
            phone: form.phone,
          });
        } catch (reason) {
          if (!(reason instanceof ApiError) || reason.status !== 409) throw reason;
          await login(form.email, form.password);
        }
      }

      const appointment = await createAppointment({
        practitionerId: practitioner.id,
        serviceId: service.id,
        startAt: selectedSlot.startAt,
      });

      navigate({ to: "/confirmation", search: { appointmentId: appointment.id } });
    } catch (reason) {
      setSubmitError(reason instanceof Error ? reason.message : "Impossible de créer le rendez-vous");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <SiteShell>
      <section className="mx-auto max-w-3xl px-5 pb-10 pt-12 sm:pt-16">
        <p className="text-xs uppercase tracking-[0.22em] text-sage">Réservation</p>
        <h1 className="mt-4 text-4xl leading-tight sm:text-5xl">Prendre rendez-vous</h1>
        <p className="mt-4 text-muted-foreground">
          Six étapes très simples. Vous pouvez revenir en arrière à tout moment.
        </p>

        {/* Progress */}
        <div className="mt-10">
          <div className="flex items-center gap-1.5">
            {stepLabels.map((l, i) => (
              <div key={l} className="flex-1">
                <div
                  className={cn(
                    "h-1 rounded-full transition-colors",
                    i + 1 <= step ? "bg-sage" : "bg-border",
                  )}
                />
              </div>
            ))}
          </div>
          <p className="mt-3 text-xs uppercase tracking-[0.16em] text-muted-foreground">
            Étape {step} sur 6 — {stepLabels[step - 1]}
          </p>
        </div>
        <div className="mt-8 rounded-[2rem] border border-border/70 bg-card p-6 shadow-soft sm:p-9">
          {step === 1 && (
            <div>
              <h2 className="text-2xl">Quel soin souhaitez-vous ?</h2>
              {servicesLoading && <p className="mt-6 text-muted-foreground">Chargement des soins…</p>}
              {servicesError && <p className="mt-6 text-destructive">{servicesError}</p>}
              {!servicesLoading && !servicesError && presetService && !service && (
                <p className="mt-6 text-destructive">Cette prestation n&apos;est plus disponible.</p>
              )}
              {!servicesLoading && !servicesError && (
                <div className="mt-6 space-y-3">
                  {services.map((s) => (
                    <button
                      key={s.slug}
                      type="button"
                      onClick={() => setServiceSlug(s.slug)}
                      className={cn(
                        "grid w-full grid-cols-[minmax(0,1fr)_auto] items-center gap-4 rounded-2xl border p-5 text-left transition-all",
                        serviceSlug === s.slug
                          ? "border-sage bg-sage-soft/40"
                          : "border-border hover:bg-accent/60",
                      )}
                    >
                      <span className="min-w-0">
                        <span className="block font-serif text-lg">{s.name}</span>
                        <span className="mt-1 block text-sm text-muted-foreground">
                          {s.duration} minutes · {s.description}
                        </span>
                      </span>
                      <span className="shrink-0 font-serif text-xl">{formatPrice(s.price)}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {step === 2 && (
            <div>
              <h2 className="text-2xl">Avec qui ?</h2>
              {practitionersLoading && <p className="mt-6 text-muted-foreground">Chargement des praticiens…</p>}
              {practitionersError && <p className="mt-6 text-destructive">{practitionersError}</p>}
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {!practitionersLoading && !practitionersError && compatiblePractitioners.map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setPractitionerId(p.id)}
                    className={cn(
                      "rounded-2xl border p-5 text-left transition-all",
                      practitionerId === p.id
                        ? "border-sage bg-sage-soft/40"
                        : "border-border hover:bg-accent/60",
                    )}
                  >
                    <span className="grid h-11 w-11 place-items-center rounded-full bg-secondary font-serif">
                      {p.initials}
                    </span>
                    <span className="mt-4 block font-serif text-lg">{p.name}</span>
                    <span className="mt-1 block text-xs uppercase tracking-[0.12em] text-muted-foreground">
                      {p.role}
                    </span>
                    <span className="mt-3 block text-sm text-muted-foreground">{p.bio}</span>
                  </button>
                ))}
              </div>
              {!practitionersLoading && !practitionersError && compatiblePractitioners.length === 0 && (
                <p className="mt-6 text-muted-foreground">Aucun praticien ne propose ce soin.</p>
              )}
            </div>
          )}

          {step === 3 && (
            <div>
              <h2 className="text-2xl">Choisissez une date</h2>
              <div className="mt-6 flex justify-center rounded-2xl border border-border/70 p-2">
                <Calendar
                  mode="single"
                  selected={date}
                    onSelect={(nextDate) => {
                      setDate(nextDate);
                      setTime("");
                    }}
                  weekStartsOn={1}
                  disabled={(d) => {
                    const today = new Date();
                    today.setHours(0, 0, 0, 0);
                    return d < today || d.getDay() === 0 || d.getDay() === 1;
                  }}
                  className={cn("pointer-events-auto p-3")}
                />
              </div>
              <p className="mt-4 text-sm text-muted-foreground">
                Le cabinet est fermé les dimanches et lundis.
              </p>
            </div>
          )}

          {step === 4 && (
            <div>
              <h2 className="text-2xl">Horaires du {dateLabel}</h2>
              {slotsLoading && <p className="mt-6 text-muted-foreground">Chargement des créneaux…</p>}
              {slotsError && <p className="mt-6 text-destructive">{slotsError}</p>}
              {!slotsLoading && !slotsError && (
                <div className="mt-6 grid grid-cols-3 gap-2.5 sm:grid-cols-4">
                  {slots.map((slot) => (
                    <button
                      key={slot.time}
                      type="button"
                      disabled={slot.state !== "available"}
                      onClick={() => setTime(slot.time)}
                      className={cn(
                        "rounded-full border py-3 text-sm transition-all",
                        time === slot.time && slot.state === "available" && "border-sage bg-sage text-primary-foreground",
                        slot.state === "available" && time !== slot.time && "border-border hover:border-sage hover:bg-accent",
                        slot.state === "booked" &&
                          "cursor-not-allowed border-dashed border-border bg-secondary/50 text-muted-foreground line-through",
                        slot.state === "unavailable" &&
                          "cursor-not-allowed border-border/50 bg-muted/60 text-muted-foreground/60",
                      )}
                    >
                      {slot.time}
                    </button>
                  ))}
                </div>
              )}
              {!slotsLoading && !slotsError && slots.length === 0 && (
                <p className="mt-6 text-muted-foreground">Aucun créneau disponible pour cette date.</p>
              )}
              <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-xs text-muted-foreground">
                <span className="flex items-center gap-2">
                  <i className="h-3 w-3 rounded-full border border-border" /> Disponible
                </span>
                <span className="flex items-center gap-2">
                  <i className="h-3 w-3 rounded-full bg-sage" /> Sélectionné
                </span>
                <span className="flex items-center gap-2">
                  <i className="h-3 w-3 rounded-full border border-dashed border-border bg-secondary" />{" "}
                  Complet
                </span>
                <span className="flex items-center gap-2">
                  <i className="h-3 w-3 rounded-full bg-muted" /> Indisponible
                </span>
              </div>
            </div>
          )}

          {step === 5 && (
            <div>
              <h2 className="text-2xl">{isAuthenticated ? "Vos informations" : "Vos coordonnées"}</h2>
              {isAuthenticated ? (
                <p className="mt-3 text-sm text-muted-foreground">
                  Vous êtes connecté·e en tant que {user?.email}.
                </p>
              ) : (
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  Ces informations serviront à créer votre espace client ou à vous connecter à
                  votre compte existant.
                </p>
              )}
              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                <div>
                  <Label htmlFor="first">Prénom</Label>
                  <Input
                    id="first"
                    className="mt-2 rounded-xl"
                    placeholder="Élise"
                    value={form.first}
                    onChange={(e) => setForm({ ...form, first: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="last">Nom</Label>
                  <Input
                    id="last"
                    className="mt-2 rounded-xl"
                    placeholder="Dumont"
                    value={form.last}
                    onChange={(e) => setForm({ ...form, last: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="email">E-mail</Label>
                  <Input
                    id="email"
                    type="email"
                    className="mt-2 rounded-xl"
                    placeholder="elise.dumont@gmail.com"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Téléphone</Label>
                  <Input
                    id="phone"
                    className="mt-2 rounded-xl"
                    placeholder="+32 471 22 18 04"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  />
                </div>
                {!isAuthenticated && (
                  <div className="sm:col-span-2">
                    <Label htmlFor="password">Mot de passe</Label>
                    <Input
                      id="password"
                      type="password"
                      className="mt-2 rounded-xl"
                      placeholder="Minimum 8 caractères"
                      value={form.password}
                      onChange={(e) => setForm({ ...form, password: e.target.value })}
                    />
                    <p className="mt-2 text-xs text-muted-foreground">
                      Ce mot de passe vous permettra d&apos;accéder à votre espace client.
                    </p>
                  </div>
                )}
                <div className="sm:col-span-2">
                  <Label htmlFor="message">Message (facultatif)</Label>
                  <Textarea
                    id="message"
                    rows={4}
                    className="mt-2 rounded-xl"
                    placeholder="Quelque chose que je devrais savoir avant la séance ?"
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                  />
                </div>
              </div>
            </div>
          )}

          {step === 6 && (
            <div>
              <h2 className="text-2xl">Votre rendez-vous</h2>
              <dl className="mt-6 divide-y divide-border/70 rounded-2xl bg-secondary/50 px-5">
                {[
                  ["Soin", service?.name ?? "—"],
                  ["Praticienne", practitioner?.name ?? "—"],
                  ["Date", dateLabel],
                  ["Heure", time],
                  ["Durée", service ? `${service.duration} minutes` : "—"],
                  ["Client", `${form.first} ${form.last}`.trim() || "—"],
                ].map(([k, v]) => (
                  <div key={k} className="flex items-center justify-between gap-4 py-4 text-sm">
                    <dt className="text-muted-foreground">{k}</dt>
                    <dd className="text-right font-medium">{v}</dd>
                  </div>
                ))}
                <div className="flex items-center justify-between gap-4 py-5">
                  <dt className="text-muted-foreground">Total</dt>
                  <dd className="font-serif text-2xl">
                    {service ? formatPrice(service.price) : "—"}
                  </dd>
                </div>
              </dl>
              <p className="mt-5 flex items-center gap-2 text-xs text-muted-foreground">
                <ShieldCheck className="h-4 w-4 text-sage" /> Paiement sécurisé · annulation libre
                jusqu'à 24 h avant.
              </p>
            </div>
          )}

          <div className="mt-9 flex flex-col-reverse gap-3 border-t border-border/70 pt-6 sm:flex-row sm:justify-between">
            <button
              type="button"
              onClick={() => setStep((s) => Math.max(1, s - 1))}
              disabled={step === 1}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-border px-6 py-3 text-sm transition-colors hover:bg-accent disabled:opacity-40"
            >
              <ArrowLeft className="h-4 w-4" /> Retour
            </button>
            {step < 6 ? (
              <button
                type="button"
                disabled={!canContinue}
                onClick={() => setStep((s) => s + 1)}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-7 py-3 text-sm text-primary-foreground transition-transform hover:-translate-y-0.5 disabled:translate-y-0 disabled:opacity-40"
              >
                Continuer <ArrowRight className="h-4 w-4" />
              </button>
            ) : (
              <button
                type="button"
                disabled={!canContinue || submitting}
                onClick={submitReservation}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-7 py-3 text-sm text-primary-foreground transition-transform hover:-translate-y-0.5"
              >
                          {submitting ? "Création en cours…" : "Confirmer la réservation"} <Check className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>

          {submitError && <p className="mt-4 text-sm text-destructive">{submitError}</p>}

        <p className="mt-6 flex items-center justify-center gap-2 text-xs text-muted-foreground">
          <Clock className="h-3.5 w-3.5" /> Besoin d'aide ?{" "}
          <Link to="/soins" className="underline underline-offset-4">
            Comparer les soins
          </Link>
        </p>
      </section>
    </SiteShell>
  );
}