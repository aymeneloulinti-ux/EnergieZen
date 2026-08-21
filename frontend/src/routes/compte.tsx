import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { CalendarDays, Clock, MapPin, Pencil, User, X } from "lucide-react";
import { SiteShell } from "@/components/site/SiteShell";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { studio, formatPrice } from "@/data/site";
import { ApiError, cancelAppointment, getMyAppointments, updateAppointment, updateMyProfile, type ApiAppointment, type ApiAvailabilitySlot } from "@/lib/api";
import { useAuth } from "@/hooks/useAuth";
import { getAccountStats } from "@/hooks/useAccountStats";
import { useAvailability } from "@/hooks/useAvailability";

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

function Compte() {
  const navigate = useNavigate();
  const { user, loading: authLoading, isAuthenticated, isClient, isAdmin, logout } = useAuth();
  const [appointments, setAppointments] = useState<ApiAppointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [tab, setTab] = useState<(typeof tabs)[number]>("Tableau de bord");
  const [cancelingId, setCancelingId] = useState<string | null>(null);
  const [moveAppointment, setMoveAppointment] = useState<ApiAppointment | null>(null);
  const [moveDate, setMoveDate] = useState<Date | undefined>(undefined);
  const [moveSlot, setMoveSlot] = useState<ApiAvailabilitySlot | null>(null);
  const [moveError, setMoveError] = useState<string | null>(null);
  const [moveSubmitting, setMoveSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const refreshAppointments = async () => {
    if (!isAuthenticated) return;

    setLoading(true);
    setError(null);

    try {
      const data = await getMyAppointments();
      setAppointments(data);
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "Impossible de récupérer vos rendez-vous");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!authLoading) {
      if (!isAuthenticated) {
        void navigate({ to: "/connexion", search: { redirect: "/compte" } });
      } else if (!isClient && !isAdmin) {
        // If not CLIENT or ADMIN, redirect to their own space
        void navigate({ to: "/praticien" });
      }
    }
  }, [authLoading, isAuthenticated, isClient, isAdmin, navigate]);

  useEffect(() => {
    if (!isAuthenticated) return;
    void refreshAppointments();
  }, [isAuthenticated]);

  const moveDateValue = useMemo(
    () => (moveDate ? new Intl.DateTimeFormat("en-CA", { timeZone: "Europe/Brussels" }).format(moveDate) : ""),
    [moveDate],
  );

  const { slots: moveSlots, loading: moveSlotsLoading, error: moveSlotsError } = useAvailability({
    practitionerId: moveAppointment?.practitioner.id ?? "",
    serviceId: moveAppointment?.service.id ?? "",
    date: moveDateValue,
  });

  useEffect(() => {
    if (!moveAppointment) {
      setMoveDate(undefined);
      setMoveSlot(null);
      setMoveError(null);
      return;
    }

    setMoveDate(new Date(moveAppointment.startAt));
    setMoveSlot(null);
    setMoveError(null);
  }, [moveAppointment]);

  useEffect(() => {
    setMoveSlot(null);
  }, [moveDateValue]);

  const openMoveDialog = (appointment: ApiAppointment) => {
    setMoveAppointment(appointment);
    setMoveError(null);
  };

  const closeMoveDialog = () => {
    setMoveAppointment(null);
    setMoveDate(undefined);
    setMoveSlot(null);
    setMoveError(null);
    setMoveSubmitting(false);
  };

  const handleCancelAppointment = async (appointmentId: string) => {
    if (cancelingId) return;
    if (!window.confirm("Voulez-vous vraiment annuler ce rendez-vous ?")) return;

    setCancelingId(appointmentId);
    setSuccessMessage(null);

    try {
      await cancelAppointment(appointmentId, { cancellationReason: "Annulé depuis l'espace client" });
      setSuccessMessage("Votre rendez-vous a bien été annulé.");
      await refreshAppointments();
    } catch (reason) {
      const message = reason instanceof ApiError ? reason.message : "Impossible d'annuler ce rendez-vous";
      setError(message);
    } finally {
      setCancelingId(null);
    }
  };

  const handleMoveAppointment = async () => {
    if (!moveAppointment || !moveSlot || moveSubmitting) return;

    setMoveSubmitting(true);
    setMoveError(null);
    setSuccessMessage(null);

    try {
      await updateAppointment(moveAppointment.id, { startAt: moveSlot.startAt });
      setSuccessMessage("Votre rendez-vous a bien été déplacé.");
      closeMoveDialog();
      await refreshAppointments();
    } catch (reason) {
      setMoveError(reason instanceof Error ? reason.message : "Impossible de déplacer ce rendez-vous");
    } finally {
      setMoveSubmitting(false);
    }
  };

  if (authLoading || !isAuthenticated || !user) return null;

  const upcoming = appointments.filter((item) => item.status === "PENDING" || item.status === "CONFIRMED");
  const past = appointments.filter((item) => item.status !== "PENDING" && item.status !== "CONFIRMED");
  const stats = getAccountStats(appointments);
  const next = upcoming[0];
  const dateLabel = (value: string) => new Date(value).toLocaleDateString("fr-FR", { timeZone: "Europe/Brussels", weekday: "long", day: "numeric", month: "long", year: "numeric" });

  return (
    <SiteShell>
      <section className="mx-auto max-w-5xl px-5 pb-10 pt-12 sm:pt-16">
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 sm:flex sm:justify-between">
          <div className="min-w-0">
            <p className="text-xs uppercase tracking-[0.22em] text-sage">Espace client</p>
            <h1 className="mt-3 truncate text-3xl sm:text-4xl">Bonjour {user.firstName}</h1>
          </div>
          <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-sage-soft font-serif">
            {user.firstName[0]}{user.lastName[0]}
          </span>
          <button type="button" onClick={() => { logout(); void navigate({ to: "/" }); }} className="rounded-full border border-border px-4 py-2 text-sm hover:bg-accent">
            Se déconnecter
          </button>
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
            {loading && <p className="text-muted-foreground">Chargement de vos rendez-vous…</p>}
            {error && <p className="text-destructive">{error}</p>}
            {successMessage && <p className="text-sm text-emerald-700">{successMessage}</p>}
            {!loading && !error && !next && <p className="text-muted-foreground">Aucun rendez-vous à venir.</p>}
            {next && (
            <article className="bg-warm overflow-hidden rounded-[2rem] border border-border/70 p-7 shadow-soft sm:p-9">
              <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                Prochain rendez-vous
              </p>
              <h2 className="mt-4 text-3xl sm:text-4xl">{next.service.name}</h2>
              <div className="mt-6 grid gap-4 sm:grid-cols-3">
                <p className="flex items-center gap-2.5 text-sm">
                  <CalendarDays className="h-4 w-4 text-sage" /> {dateLabel(next.startAt)}
                </p>
                <p className="flex items-center gap-2.5 text-sm">
                  <Clock className="h-4 w-4 text-sage" /> {new Date(next.startAt).toLocaleTimeString("fr-FR", { timeZone: "Europe/Brussels", hour: "2-digit", minute: "2-digit" })} · {next.service.duration} min
                </p>
                <p className="flex items-center gap-2.5 text-sm">
                  <User className="h-4 w-4 text-sage" /> {next.practitioner.user.firstName} {next.practitioner.user.lastName}
                </p>
              </div>
              <p className="mt-4 flex items-center gap-2.5 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" /> {studio.address}
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <button type="button" onClick={() => openMoveDialog(next)} className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm text-primary-foreground">
                  <Pencil className="h-4 w-4" /> Déplacer le rendez-vous
                </button>
                <button type="button" disabled={cancelingId === next.id} onClick={() => void handleCancelAppointment(next.id)} className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-card px-6 py-3 text-sm hover:bg-accent disabled:cursor-not-allowed disabled:opacity-60">
                  <X className="h-4 w-4" /> {cancelingId === next.id ? "Annulation…" : "Annuler"}
                </button>
              </div>
            </article>
            )}

            <div className="grid gap-6 sm:grid-cols-3">
              {[
                ["Séances réalisées", String(stats.completedSessions)],
                ["Depuis", stats.since ?? "—"],
                ["Soin préféré", stats.favoriteService ?? "—"],
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
                      <p className="truncate text-sm font-medium">{a.service.name}</p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {dateLabel(a.startAt)}
                      </p>
                    </div>
                    <span className="shrink-0 text-sm text-muted-foreground">
                      {formatPrice(Number(a.service.price))}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {tab === "Mes rendez-vous" && (
          <div className="mt-8 space-y-4">
            {upcoming.length === 0 && <p className="text-muted-foreground">Aucun rendez-vous à venir.</p>}
            {upcoming.map((a) => (
              <AppointmentRow
                key={a.id}
                appointment={a}
                canceling={cancelingId === a.id}
                onCancel={() => void handleCancelAppointment(a.id)}
                onMove={() => openMoveDialog(a)}
              />
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
              <AppointmentRow key={a.id} appointment={a} />
            ))}
          </div>
        )}

        <Dialog open={!!moveAppointment} onOpenChange={(open) => { if (!open) closeMoveDialog(); }}>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>Déplacer un rendez-vous</DialogTitle>
              <DialogDescription>
                Choisissez une nouvelle date et un créneau disponible pour {moveAppointment?.service.name ?? "ce rendez-vous"}.
              </DialogDescription>
            </DialogHeader>

            {moveAppointment && (
              <div className="space-y-6 pt-2">
                <div className="flex justify-center rounded-2xl border border-border/70 p-2">
                  <Calendar
                    mode="single"
                    selected={moveDate}
                    onSelect={(nextDate) => {
                      setMoveDate(nextDate ?? undefined);
                      setMoveSlot(null);
                    }}
                    weekStartsOn={1}
                    disabled={(d) => {
                      const today = new Date();
                      today.setHours(0, 0, 0, 0);
                      return d < today || d.getDay() === 0 || d.getDay() === 1;
                    }}
                    className="pointer-events-auto p-3"
                  />
                </div>

                {moveDate && (
                  <div>
                    <p className="mb-3 text-sm font-medium">Créneaux pour le {moveDate.toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long" })}</p>
                    {moveSlotsLoading && <p className="text-muted-foreground">Chargement des créneaux…</p>}
                    {moveSlotsError && <p className="text-destructive">{moveSlotsError}</p>}
                    {!moveSlotsLoading && !moveSlotsError && (
                      <div className="grid grid-cols-3 gap-2.5 sm:grid-cols-4">
                        {moveSlots.map((slot) => (
                          <button
                            key={`${slot.startAt}-${slot.time}`}
                            type="button"
                            disabled={slot.state !== "available"}
                            onClick={() => setMoveSlot(slot)}
                            className={cn(
                              "rounded-full border py-3 text-sm transition-all",
                              moveSlot?.time === slot.time && slot.state === "available" && "border-sage bg-sage text-primary-foreground",
                              slot.state === "available" && moveSlot?.time !== slot.time && "border-border hover:border-sage hover:bg-accent",
                              slot.state === "booked" && "cursor-not-allowed border-dashed border-border bg-secondary/50 text-muted-foreground line-through",
                              slot.state === "unavailable" && "cursor-not-allowed border-border/50 bg-muted/60 text-muted-foreground/60",
                            )}
                          >
                            {slot.time}
                          </button>
                        ))}
                      </div>
                    )}
                    {!moveSlotsLoading && !moveSlotsError && moveSlots.length === 0 && (
                      <p className="text-muted-foreground">Aucun créneau disponible pour cette date.</p>
                    )}
                  </div>
                )}

                {moveError && <p className="text-destructive">{moveError}</p>}
              </div>
            )}

            <DialogFooter className="mt-2 gap-3 sm:justify-end">
              <button type="button" onClick={closeMoveDialog} className="rounded-full border border-border bg-card px-4 py-2 text-sm hover:bg-accent">
                Annuler
              </button>
              <button
                type="button"
                onClick={() => void handleMoveAppointment()}
                disabled={!moveSlot || moveSubmitting}
                className="rounded-full bg-primary px-4 py-2 text-sm text-primary-foreground disabled:cursor-not-allowed disabled:opacity-60"
              >
                {moveSubmitting ? "Déplacement…" : "Confirmer le déplacement"}
              </button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {tab === "Mon profil" && (
          <div className="mt-8 rounded-[2rem] border border-border/70 bg-card p-7 shadow-soft sm:p-9">
            <h2 className="text-2xl">Informations personnelles</h2>
            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              <div>
                <Label htmlFor="p-first">Prénom</Label>
                <Input id="p-first" className="mt-2 rounded-xl" defaultValue={user.firstName} />
              </div>
              <div>
                <Label htmlFor="p-last">Nom</Label>
                <Input id="p-last" className="mt-2 rounded-xl" defaultValue={user.lastName} />
              </div>
              <div>
                <Label htmlFor="p-mail">E-mail</Label>
                <Input id="p-mail" className="mt-2 rounded-xl" defaultValue={user.email} />
              </div>
              <div>
                <Label htmlFor="p-phone">Téléphone</Label>
                <Input id="p-phone" className="mt-2 rounded-xl" defaultValue={user.phone ?? ""} />
              </div>
            </div>
            <button type="button" onClick={() => void updateMyProfile({ firstName: user.firstName, lastName: user.lastName, phone: user.phone ?? "" })} className="mt-7 rounded-full bg-primary px-6 py-3 text-sm text-primary-foreground">
              Enregistrer
            </button>
            <button type="button" onClick={() => { logout(); void navigate({ to: "/" }); }} className="mt-4 rounded-full border border-border px-6 py-3 text-sm">
              Se déconnecter
            </button>
          </div>
        )}
      </section>
    </SiteShell>
  );
}

function AppointmentRow({
  appointment: a,
  canceling,
  onCancel,
  onMove,
}: {
  appointment: ApiAppointment;
  canceling?: boolean;
  onCancel?: () => void;
  onMove?: () => void;
}) {
  const canModify = a.status === "PENDING" || a.status === "CONFIRMED";

  return (
    <article className="grid gap-4 rounded-3xl border border-border/70 bg-card p-6 shadow-soft sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center">
      <div className="min-w-0">
        <p className="font-serif text-xl">{a.service.name}</p>
        <p className="mt-2 text-sm text-muted-foreground">
          {new Date(a.startAt).toLocaleDateString("fr-FR")} · {new Date(a.startAt).toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })} · {a.practitioner.user.firstName} {a.practitioner.user.lastName}
        </p>
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <span className="rounded-full bg-secondary px-3 py-1.5 text-xs capitalize text-muted-foreground">
          {a.status}
        </span>
        <span className="font-serif text-lg">{formatPrice(Number(a.service.price))}</span>
        {canModify && (
          <>
            <button type="button" onClick={onMove} className="rounded-full border border-border bg-card px-3 py-2 text-xs hover:bg-accent">
              Déplacer
            </button>
            <button type="button" disabled={canceling} onClick={onCancel} className="rounded-full border border-border bg-card px-3 py-2 text-xs hover:bg-accent disabled:cursor-not-allowed disabled:opacity-60">
              {canceling ? "Annulation…" : "Annuler"}
            </button>
          </>
        )}
      </div>
    </article>
  );
}