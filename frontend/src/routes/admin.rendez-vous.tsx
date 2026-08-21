import { createFileRoute } from "@tanstack/react-router";
import { Check, Clock, Mail, Pencil, Phone, UserX, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { AdminShell } from "@/components/admin/AdminShell";
import { Button } from "@/components/ui/button";
import {
  getAdminAppointments,
  getAdminPractitioners,
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
  return new Intl.DateTimeFormat("fr-FR", { hour: "2-digit", minute: "2-digit" }).format(new Date(value));
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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [updating, setUpdating] = useState(false);

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      const [appointmentData, practitionerData] = await Promise.all([
        getAdminAppointments({
          ...(status !== "ALL" && { status }),
          ...(practitionerId !== "ALL" && { practitionerId }),
        }),
        practitioners.length > 0 ? Promise.resolve(practitioners) : getAdminPractitioners(),
      ]);
      setAppointments(appointmentData);
      setPractitioners(practitionerData);
      setSelectedId((current) => appointmentData.some((item) => item.id === current) ? current : appointmentData[0]?.id ?? null);
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "Impossible de récupérer les rendez-vous");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void load();
  }, [status, practitionerId]);

  const selected = useMemo(
    () => appointments.find((appointment) => appointment.id === selectedId) ?? null,
    [appointments, selectedId],
  );

  const updateStatus = async (nextStatus: Exclude<ApiAppointmentStatus, "PENDING">) => {
    if (!selected) return;
    const cancellationReason = nextStatus === "CANCELLED" ? window.prompt("Motif d'annulation (facultatif)") ?? undefined : undefined;
    setUpdating(true);
    setError(null);
    try {
      const updated = await updateAdminAppointmentStatus(selected.id, nextStatus, cancellationReason);
      setAppointments((current) => current.map((item) => item.id === updated.id ? updated : item));
      if (status !== "ALL" && status !== nextStatus) {
        await load();
      }
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "Impossible de modifier le rendez-vous");
    } finally {
      setUpdating(false);
    }
  };

  return (
    <AdminShell title="Rendez-vous" subtitle={`${appointments.length} rendez-vous correspondant aux filtres`}>
      <div className="mb-5 flex flex-wrap gap-3">
        <select value={status} onChange={(event) => setStatus(event.target.value as ApiAppointmentStatus | "ALL")} className="rounded-md border border-input bg-background px-3 py-2 text-sm">
          <option value="ALL">Tous les statuts</option>
          {Object.entries(statusLabels).map(([value, label]) => <option key={value} value={value}>{label}</option>)}
        </select>
        <select value={practitionerId} onChange={(event) => setPractitionerId(event.target.value)} className="rounded-md border border-input bg-background px-3 py-2 text-sm">
          <option value="ALL">Tous les praticiens</option>
          {practitioners.map((practitioner) => <option key={practitioner.id} value={practitioner.id}>{practitioner.user.firstName} {practitioner.user.lastName}</option>)}
        </select>
      </div>

      {error && <p className="mb-5 text-sm text-destructive">{error}</p>}
      {loading && <p className="text-sm text-muted-foreground">Chargement des rendez-vous…</p>}
      {!loading && appointments.length === 0 && <p className="text-sm text-muted-foreground">Aucun rendez-vous trouvé.</p>}

      {!loading && appointments.length > 0 && selected && (
        <div className="grid gap-6 xl:grid-cols-[1fr_1.05fr]">
          <section className="rounded-2xl border border-border/70 bg-card p-4 shadow-soft">
            <ul className="divide-y divide-border/70">
              {appointments.map((appointment) => (
                <li key={appointment.id}>
                  <button type="button" onClick={() => setSelectedId(appointment.id)} className={`grid w-full grid-cols-[minmax(0,1fr)_auto] items-center gap-3 rounded-xl px-3 py-4 text-left transition-colors ${selected.id === appointment.id ? "bg-sage-soft/50" : "hover:bg-accent/50"}`}>
                    <span className="min-w-0">
                      <span className="block truncate text-sm font-medium">{appointment.client.firstName} {appointment.client.lastName}</span>
                      <span className="block truncate text-xs text-muted-foreground">{formatDateTime(appointment.startAt)} · {appointment.service.name}</span>
                    </span>
                    <span className="shrink-0 rounded-full bg-secondary px-3 py-1 text-[11px] text-muted-foreground">{statusLabels[appointment.status]}</span>
                  </button>
                </li>
              ))}
            </ul>
          </section>

          <section className="rounded-2xl border border-border/70 bg-card p-6 shadow-soft xl:sticky xl:top-6 xl:self-start">
            <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-4">
              <div className="min-w-0">
                <p className="text-xs uppercase tracking-[0.14em] text-muted-foreground">{selected.id}</p>
                <h2 className="mt-2 truncate font-serif text-2xl">{selected.client.firstName} {selected.client.lastName}</h2>
              </div>
              <span className="shrink-0 rounded-full bg-sage-soft px-3 py-1.5 text-xs">{statusLabels[selected.status]}</span>
            </div>

            <div className="mt-5 flex flex-wrap gap-3">
              <a href={`mailto:${selected.client.email}`} className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm hover:bg-accent"><Mail className="h-3.5 w-3.5" /> {selected.client.email}</a>
              {selected.client.phone && <a href={`tel:${selected.client.phone}`} className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm hover:bg-accent"><Phone className="h-3.5 w-3.5" /> {selected.client.phone}</a>}
            </div>

            <dl className="mt-6 divide-y divide-border/70 rounded-xl bg-secondary/40 px-4">
              <InfoRow label="Prestation" value={selected.service.name} />
              <InfoRow label="Praticien" value={`${selected.practitioner.user.firstName} ${selected.practitioner.user.lastName}`} />
              <InfoRow label="Date" value={formatDateTime(selected.startAt)} />
              <InfoRow label="Heure de fin" value={formatTime(selected.endAt)} />
              <InfoRow label="Durée" value={`${selected.service.duration} minutes`} />
              <InfoRow label="Montant" value={formatPrice(selected.service.price)} />
            </dl>

            <div className="mt-6 grid gap-2 sm:grid-cols-2">
              <Button disabled={updating || selected.status !== "PENDING"} onClick={() => void updateStatus("CONFIRMED")}><Check /> Confirmer</Button>
              <Button disabled variant="outline" title="Aucun endpoint de déplacement ADMIN n'est disponible"><Pencil /> Déplacer</Button>
              <Button disabled={updating || selected.status !== "CONFIRMED"} variant="outline" onClick={() => void updateStatus("COMPLETED")}><Clock /> Marquer comme terminé</Button>
              <Button disabled={updating || selected.status !== "CONFIRMED"} variant="outline" onClick={() => void updateStatus("NO_SHOW")}><UserX /> Marquer absent</Button>
              <Button disabled={updating || !["PENDING", "CONFIRMED"].includes(selected.status)} variant="outline" onClick={() => void updateStatus("CANCELLED")}><X /> Annuler</Button>
            </div>
            <p className="mt-3 text-xs text-muted-foreground">Le déplacement nécessite encore un endpoint backend ADMIN dédié.</p>
          </section>
        </div>
      )}
    </AdminShell>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return <div className="flex justify-between gap-4 py-3 text-sm"><dt className="text-muted-foreground">{label}</dt><dd className="text-right">{value}</dd></div>;
}