import { createFileRoute } from "@tanstack/react-router";
import { Check, Clock, Mail, Pencil, Phone, Trash2, UserX, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { AdminShell } from "@/components/admin/AdminShell";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { useAvailability } from "@/hooks/useAvailability";
import {
  getAdminAppointments,
  getAdminPractitioners,
  deleteAdminAppointment,
  moveAdminAppointment,
  updateAdminAppointmentStatus,
  type ApiAdminAppointment,
  type ApiAdminPractitioner,
  type ApiAppointmentStatus,
} from "@/lib/api";

export const Route = createFileRoute("/admin/rendez-vous")({
  head: () => ({
    meta: [
      { title: "Rendez-vous — Maison Lumen" },
      { name: "description", content: "Liste et détail des rendez-vous du cabinet." },
      { property: "og:title", content: "Rendez-vous — Maison Lumen" },
      { property: "og:description", content: "Consultez et gérez les rendez-vous du cabinet." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: RendezVous,
});

const statusLabels: Record<ApiAppointmentStatus, string> = {
  PENDING: "En attente",
  CONFIRMED: "Confirmé",
  CANCELLED: "Annulé",
  COMPLETED: "Terminé",
  NO_SHOW: "Absent",
};

function formatDateTime(value: string) {
  return new Intl.DateTimeFormat("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
}

function formatTime(value: string) {
  return new Intl.DateTimeFormat("fr-FR", { hour: "2-digit", minute: "2-digit" }).format(
    new Date(value),
  );
}

function formatPrice(value: string) {
  return `${Number(value).toLocaleString("fr-FR", { minimumFractionDigits: 2 })} €`;
}

function RendezVous() {
  const [appointments, setAppointments] = useState<ApiAdminAppointment[]>([]);
  const [practitioners, setPractitioners] = useState<ApiAdminPractitioner[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [status, setStatus] = useState<ApiAppointmentStatus | "ALL">("ALL");
  const [practitionerId, setPractitionerId] = useState("ALL");
  const [includeCancelled, setIncludeCancelled] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [updating, setUpdating] = useState(false);
  const [moveAppointment, setMoveAppointment] = useState<ApiAdminAppointment | null>(null);
  const [moveDate, setMoveDate] = useState<Date>();
  const [moveSlot, setMoveSlot] = useState<{
    startAt: string;
    time: string;
    state: "available" | "booked" | "unavailable";
  } | null>(null);
  const [moveError, setMoveError] = useState<string | null>(null);
  const [moveSubmitting, setMoveSubmitting] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const moveDateValue = useMemo(
    () =>
      moveDate
        ? new Intl.DateTimeFormat("en-CA", { timeZone: "Europe/Brussels" }).format(moveDate)
        : "",
    [moveDate],
  );
  const {
    slots: moveSlots,
    loading: moveSlotsLoading,
    error: moveSlotsError,
  } = useAvailability({
    practitionerId: moveAppointment?.practitioner.id ?? "",
    serviceId: moveAppointment?.service.id ?? "",
    date: moveDateValue,
  });

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      const [appointmentData, practitionerData] = await Promise.all([
        getAdminAppointments({
          ...(status !== "ALL" && { status }),
          ...(practitionerId !== "ALL" && { practitionerId }),
          includeCancelled,
        }),
        practitioners.length > 0 ? Promise.resolve(practitioners) : getAdminPractitioners(),
      ]);
      setAppointments(appointmentData);
      setPractitioners(practitionerData);
      setSelectedId((current) =>
        appointmentData.some((item) => item.id === current)
          ? current
          : (appointmentData[0]?.id ?? null),
      );
    } catch (reason) {
      setError(
        reason instanceof Error ? reason.message : "Impossible de récupérer les rendez-vous",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void load();
  }, [status, practitionerId, includeCancelled]);

  const selected = useMemo(
    () => appointments.find((appointment) => appointment.id === selectedId) ?? null,
    [appointments, selectedId],
  );

  const updateStatus = async (nextStatus: Exclude<ApiAppointmentStatus, "PENDING">) => {
    if (!selected) return;
    const cancellationReason =
      nextStatus === "CANCELLED"
        ? (window.prompt("Motif d'annulation (facultatif)") ?? undefined)
        : undefined;
    setUpdating(true);
    setError(null);
    try {
      const updated = await updateAdminAppointmentStatus(
        selected.id,
        nextStatus,
        cancellationReason,
      );
      setAppointments((current) =>
        current.map((item) => (item.id === updated.id ? updated : item)),
      );
      if (status !== "ALL" && status !== nextStatus) {
        await load();
      }
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "Impossible de modifier le rendez-vous");
    } finally {
      setUpdating(false);
    }
  };

  const openMoveDialog = (appointment: ApiAdminAppointment) => {
    setMoveAppointment(appointment);
    setMoveDate(new Date(appointment.startAt));
    setMoveSlot(null);
    setMoveError(null);
  };

  const closeMoveDialog = () => {
    setMoveAppointment(null);
    setMoveDate(undefined);
    setMoveSlot(null);
    setMoveError(null);
    setMoveSubmitting(false);
  };

  const handleMoveAppointment = async () => {
    if (!moveAppointment || !moveSlot || moveSubmitting) return;
    setMoveSubmitting(true);
    setMoveError(null);
    try {
      const updated = await moveAdminAppointment(moveAppointment.id, { startAt: moveSlot.startAt });
      setAppointments((current) =>
        current.map((item) => (item.id === updated.id ? updated : item)),
      );
      closeMoveDialog();
    } catch (reason) {
      setMoveError(
        reason instanceof Error ? reason.message : "Impossible de déplacer le rendez-vous",
      );
    } finally {
      setMoveSubmitting(false);
    }
  };

  const handleDeleteAppointment = async () => {
    if (!selected || selected.status !== "CANCELLED" || deleting) return;
    if (!window.confirm("Supprimer définitivement ce rendez-vous annulé ?")) return;

    setDeleting(true);
    setError(null);
    try {
      await deleteAdminAppointment(selected.id);
      await load();
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "Impossible de supprimer le rendez-vous");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <AdminShell
      title="Rendez-vous"
      subtitle={`${appointments.length} rendez-vous correspondant aux filtres`}
    >
      <div className="mb-5 space-y-2">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs uppercase tracking-[0.14em] text-muted-foreground">
            Praticienne
          </span>
          {[
            { id: "ALL", label: "Toutes" },
            ...practitioners.map((practitioner) => ({
              id: practitioner.id,
              label: `${practitioner.user.firstName} ${practitioner.user.lastName}`,
            })),
          ].map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setPractitionerId(item.id)}
              className={cn(
                "rounded-full border px-4 py-1.5 text-sm",
                practitionerId === item.id
                  ? "border-sage bg-sage-soft"
                  : "border-border hover:bg-accent",
              )}
            >
              {item.label}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs uppercase tracking-[0.14em] text-muted-foreground">Statut</span>
          {[
            { id: "ALL", label: "Tous" },
            ...Object.entries(statusLabels).map(([id, label]) => ({ id, label })),
          ].map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setStatus(item.id as ApiAppointmentStatus | "ALL")}
              className={cn(
                "rounded-full border px-4 py-1.5 text-sm",
                status === item.id ? "border-sage bg-sage-soft" : "border-border hover:bg-accent",
              )}
            >
              {item.label}
            </button>
          ))}
          <label className="ml-2 inline-flex items-center gap-2 rounded-full border border-border px-4 py-1.5 text-sm hover:bg-accent">
            <input
              type="checkbox"
              checked={includeCancelled}
              onChange={(event) => setIncludeCancelled(event.target.checked)}
            />
            Afficher les rendez-vous annulés
          </label>
        </div>
      </div>

      {error && <p className="mb-5 text-sm text-destructive">{error}</p>}
      {loading && <p className="text-sm text-muted-foreground">Chargement des rendez-vous…</p>}
      {!loading && appointments.length === 0 && (
        <p className="text-sm text-muted-foreground">Aucun rendez-vous trouvé.</p>
      )}

      {!loading && appointments.length > 0 && selected && (
        <div className="grid gap-6 xl:grid-cols-[1fr_1.05fr]">
          <section className="rounded-2xl border border-border/70 bg-card p-4 shadow-soft">
            <ul className="divide-y divide-border/70">
              {appointments.map((appointment) => (
                <li key={appointment.id}>
                  <button
                    type="button"
                    onClick={() => setSelectedId(appointment.id)}
                    className={`grid w-full grid-cols-[minmax(0,1fr)_auto] items-center gap-3 rounded-xl px-3 py-4 text-left transition-colors ${selected.id === appointment.id ? "bg-sage-soft/50" : "hover:bg-accent/50"}`}
                  >
                    <span className="min-w-0">
                      <span className="block truncate text-sm font-medium">
                        {appointment.client.firstName} {appointment.client.lastName}
                      </span>
                      <span className="block truncate text-xs text-muted-foreground">
                        {formatDateTime(appointment.startAt)} · {appointment.service.name}
                      </span>
                    </span>
                    <span className="shrink-0 rounded-full bg-secondary px-3 py-1 text-[11px] text-muted-foreground">
                      {statusLabels[appointment.status]}
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
                  {selected.id}
                </p>
                <h2 className="mt-2 truncate font-serif text-2xl">
                  {selected.client.firstName} {selected.client.lastName}
                </h2>
              </div>
              <span className="shrink-0 rounded-full bg-sage-soft px-3 py-1.5 text-xs">
                {statusLabels[selected.status]}
              </span>
            </div>

            <div className="mt-5 flex flex-wrap gap-3">
              <a
                href={`mailto:${selected.client.email}`}
                className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm hover:bg-accent"
              >
                <Mail className="h-3.5 w-3.5" /> {selected.client.email}
              </a>
              {selected.client.phone && (
                <a
                  href={`tel:${selected.client.phone}`}
                  className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm hover:bg-accent"
                >
                  <Phone className="h-3.5 w-3.5" /> {selected.client.phone}
                </a>
              )}
            </div>

            <dl className="mt-6 divide-y divide-border/70 rounded-xl bg-secondary/40 px-4">
              <InfoRow label="Prestation" value={selected.service.name} />
              <InfoRow
                label="Praticien"
                value={`${selected.practitioner.user.firstName} ${selected.practitioner.user.lastName}`}
              />
              <InfoRow label="Date" value={formatDateTime(selected.startAt)} />
              <InfoRow label="Heure de fin" value={formatTime(selected.endAt)} />
              <InfoRow label="Durée" value={`${selected.service.duration} minutes`} />
              <InfoRow label="Montant" value={formatPrice(selected.service.price)} />
            </dl>

            <div className="mt-6 grid gap-2 sm:grid-cols-2">
              <Button
                disabled={updating || selected.status !== "PENDING"}
                onClick={() => void updateStatus("CONFIRMED")}
              >
                <Check /> Confirmer
              </Button>
              <Button
                disabled={updating || !["PENDING", "CONFIRMED"].includes(selected.status)}
                variant="outline"
                onClick={() => openMoveDialog(selected)}
              >
                <Pencil /> Déplacer
              </Button>
              <Button
                disabled={updating || selected.status !== "CONFIRMED"}
                variant="outline"
                onClick={() => void updateStatus("COMPLETED")}
              >
                <Clock /> Marquer comme terminé
              </Button>
              <Button
                disabled={updating || selected.status !== "CONFIRMED"}
                variant="outline"
                onClick={() => void updateStatus("NO_SHOW")}
              >
                <UserX /> Marquer absent
              </Button>
              <Button
                disabled={updating || !["PENDING", "CONFIRMED"].includes(selected.status)}
                variant="outline"
                onClick={() => void updateStatus("CANCELLED")}
              >
                <X /> Annuler
              </Button>
              {selected.status === "CANCELLED" && (
                <Button
                  disabled={deleting}
                  variant="outline"
                  onClick={() => void handleDeleteAppointment()}
                  className="text-destructive hover:text-destructive"
                >
                  <Trash2 /> {deleting ? "Suppression…" : "Supprimer"}
                </Button>
              )}
            </div>
          </section>
        </div>
      )}

      <Dialog
        open={!!moveAppointment}
        onOpenChange={(open) => {
          if (!open) closeMoveDialog();
        }}
      >
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Déplacer un rendez-vous</DialogTitle>
            <DialogDescription>
              Choisissez une nouvelle date et un créneau disponible pour{" "}
              {moveAppointment?.service.name ?? "ce rendez-vous"}.
            </DialogDescription>
          </DialogHeader>
          {moveAppointment && (
            <div className="space-y-6 pt-2">
              <div className="flex justify-center rounded-2xl border border-border/70 p-2">
                <Calendar
                  mode="single"
                  selected={moveDate}
                  onSelect={(date) => {
                    setMoveDate(date);
                    setMoveSlot(null);
                  }}
                  weekStartsOn={1}
                  disabled={(date) => {
                    const today = new Date();
                    today.setHours(0, 0, 0, 0);
                    return date < today || date.getDay() === 0 || date.getDay() === 1;
                  }}
                  className="pointer-events-auto p-3"
                />
              </div>
              {moveDate && (
                <div>
                  <p className="mb-3 text-sm font-medium">
                    Créneaux pour le{" "}
                    {moveDate.toLocaleDateString("fr-FR", {
                      weekday: "long",
                      day: "numeric",
                      month: "long",
                    })}
                  </p>
                  {moveSlotsLoading && (
                    <p className="text-muted-foreground">Chargement des créneaux…</p>
                  )}
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
                            moveSlot?.time === slot.time &&
                              "border-sage bg-sage text-primary-foreground",
                            slot.state === "available" &&
                              moveSlot?.time !== slot.time &&
                              "border-border hover:border-sage hover:bg-accent",
                            slot.state !== "available" &&
                              "cursor-not-allowed border-border bg-secondary/50 text-muted-foreground line-through",
                          )}
                        >
                          {slot.time}
                        </button>
                      ))}
                    </div>
                  )}
                  {!moveSlotsLoading && !moveSlotsError && moveSlots.length === 0 && (
                    <p className="text-muted-foreground">
                      Aucun créneau disponible pour cette date.
                    </p>
                  )}
                </div>
              )}
              {moveError && <p className="text-destructive">{moveError}</p>}
            </div>
          )}
          <DialogFooter className="mt-2 gap-3 sm:justify-end">
            <Button type="button" variant="outline" onClick={closeMoveDialog}>
              Annuler
            </Button>
            <Button
              type="button"
              onClick={() => void handleMoveAppointment()}
              disabled={!moveSlot || moveSubmitting}
            >
              {moveSubmitting ? "Déplacement…" : "Confirmer le déplacement"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminShell>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4 py-3 text-sm">
      <dt className="text-muted-foreground">{label}</dt>
      <dd className="text-right">{value}</dd>
    </div>
  );
}
