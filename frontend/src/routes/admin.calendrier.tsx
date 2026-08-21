import { createFileRoute } from "@tanstack/react-router";
import { Fragment, useEffect, useMemo, useState } from "react";
import { AdminShell } from "@/components/admin/AdminShell";
import { cn } from "@/lib/utils";
import {
  getAdminAppointments,
  getAdminPractitioners,
  getAvailability,
  type ApiAvailabilitySlot,
  type ApiAdminAppointment,
  type ApiAdminPractitioner,
} from "@/lib/api";

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

const hours = [
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
];

const dateKey = (date: Date) =>
  new Intl.DateTimeFormat("en-CA", { timeZone: "Europe/Brussels" }).format(date);

const startOfWeek = (date: Date) => {
  const result = new Date(date);
  result.setHours(0, 0, 0, 0);
  const day = result.getDay();
  result.setDate(result.getDate() - (day === 0 ? 6 : day - 1));
  return result;
};

const addDays = (date: Date, amount: number) => {
  const result = new Date(date);
  result.setDate(result.getDate() + amount);
  return result;
};

const dateLabel = (date: Date) =>
  new Intl.DateTimeFormat("fr-FR", { weekday: "short", day: "numeric" }).format(date);

const periodLabel = (days: { value: Date }[]) => {
  const formatter = new Intl.DateTimeFormat("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  return `${formatter.format(days[0].value)} au ${formatter.format(days[days.length - 1].value)}`;
};

const appointmentDate = (value: string) => dateKey(new Date(value));
const appointmentHour = (value: string) =>
  new Intl.DateTimeFormat("fr-FR", {
    hour: "2-digit",
    hour12: false,
    timeZone: "Europe/Brussels",
  }).format(new Date(value));

function Calendrier() {
  const [view, setView] = useState<"Jour" | "Semaine" | "Mois">("Semaine");
  const [filter, setFilter] = useState<string>("all");
  const [anchorDate, setAnchorDate] = useState(() => new Date());
  const [appointments, setAppointments] = useState<ApiAdminAppointment[]>([]);
  const [practitioners, setPractitioners] = useState<ApiAdminPractitioner[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [availability, setAvailability] = useState<Record<string, ApiAvailabilitySlot[]>>({});

  const days = useMemo(() => {
    const firstDay =
      view === "Mois"
        ? new Date(anchorDate.getFullYear(), anchorDate.getMonth(), 1)
        : startOfWeek(anchorDate);
    const count =
      view === "Mois"
        ? new Date(anchorDate.getFullYear(), anchorDate.getMonth() + 1, 0).getDate()
        : 5;
    return Array.from({ length: count }, (_, index) => {
      const date = addDays(firstDay, index);
      return { label: dateLabel(date), date: dateKey(date), value: date };
    });
  }, [anchorDate, view]);

  useEffect(() => {
    const from = days[0]?.date;
    const to = days[days.length - 1]?.date;
    if (!from || !to) return;

    setLoading(true);
    setError(null);
    Promise.all([
      getAdminAppointments({ from, to: `${to}T23:59:59.999`, includeCancelled: true }),
      getAdminPractitioners(),
    ])
      .then(async ([appointmentData, practitionerData]) => {
        const availabilityEntries = await Promise.all(
          practitionerData.flatMap((practitioner) => {
            const services = Array.isArray(practitioner.services) ? practitioner.services : [];
            const service = services.find((item) => item.active) ?? services[0];
            if (!service) return [];

            return days.map(async (day) => {
              const slots = await getAvailability({
                practitionerId: practitioner.id,
                serviceId: service.id,
                date: day.date,
              }).catch(() => []);
              return [`${practitioner.id}:${day.date}`, slots] as const;
            });
          }),
        );

        setAppointments(appointmentData);
        setPractitioners(practitionerData);
        setAvailability(Object.fromEntries(availabilityEntries));
      })
      .catch((reason: unknown) =>
        setError(
          reason instanceof Error
            ? reason.message
            : "Impossible de récupérer les données du calendrier",
        ),
      )
      .finally(() => setLoading(false));
  }, [days]);

  const getCellAvailability = (date: string, hour: string) => {
    const practitionersToCheck =
      filter === "all"
        ? practitioners
        : practitioners.filter((practitioner) => practitioner.id === filter);
    const states = practitionersToCheck.flatMap((practitioner) =>
      (availability[`${practitioner.id}:${date}`] ?? [])
        .filter((slot) => slot.time.startsWith(hour.slice(0, 2)))
        .map((slot) => slot.state),
    );

    if (states.length === 0) return "unavailable";
    if (states.includes("available")) return "available";
    if (states.includes("booked")) return "booked";
    return "unavailable";
  };

  const visible = appointments.filter(
    (appointment) => filter === "all" || appointment.practitioner.id === filter,
  );

  const blockedDates = new Set(
    days
      .filter((day) => hours.every((hour) => getCellAvailability(day.date, hour) === "unavailable"))
      .map((day) => day.date),
  );

  const movePeriod = (amount: number) => {
    setAnchorDate((current) =>
      view === "Mois"
        ? new Date(current.getFullYear(), current.getMonth() + amount, 1)
        : addDays(current, amount * 7),
    );
  };

  return (
    <AdminShell
      title="Calendrier"
      subtitle={view === "Mois" ? periodLabel(days) : `Semaine du ${periodLabel(days)}`}
      action={
        <div className="flex shrink-0 gap-2">
          <button
            type="button"
            onClick={() => movePeriod(-1)}
            className="rounded-full border border-border px-3 py-2 text-sm hover:bg-accent"
            aria-label="Période précédente"
          >
            ←
          </button>
          <button
            type="button"
            onClick={() => setAnchorDate(new Date())}
            className="rounded-full border border-border px-4 py-2 text-sm hover:bg-accent"
          >
            Aujourd'hui
          </button>
          <button
            type="button"
            onClick={() => movePeriod(1)}
            className="rounded-full border border-border px-3 py-2 text-sm hover:bg-accent"
            aria-label="Période suivante"
          >
            →
          </button>
          {(["Jour", "Semaine", "Mois"] as const).map((v) => (
            <button
              key={v}
              onClick={() => setView(v)}
              className={cn(
                "rounded-full border px-4 py-2 text-sm transition-colors",
                view === v
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border hover:bg-accent",
              )}
            >
              {v}
            </button>
          ))}
        </div>
      }
    >
      <div className="mb-5 flex flex-wrap items-center gap-2">
        <span className="text-xs uppercase tracking-[0.14em] text-muted-foreground">
          Praticienne
        </span>
        {[
          { id: "all", name: "Toutes" },
          ...practitioners.map((p) => ({
            id: p.id,
            name: `${p.user.firstName} ${p.user.lastName}`,
          })),
        ].map((p) => (
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
          <span className="flex items-center gap-2">
            <i className="h-3 w-3 rounded bg-card ring-1 ring-border" /> Disponible
          </span>
          <span className="flex items-center gap-2">
            <i className="h-3 w-3 rounded bg-sage-soft" /> Réservé
          </span>
          <span className="flex items-center gap-2">
            <i className="h-3 w-3 rounded bg-muted" /> Bloqué
          </span>
        </div>
      </div>

      {error && <p className="mb-5 text-sm text-destructive">{error}</p>}
      {loading && <p className="mb-5 text-sm text-muted-foreground">Chargement du calendrier…</p>}

      {view === "Mois" ? (
        <MonthView days={days} appointments={visible} blockedDates={blockedDates} />
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-border/70 bg-card p-4 shadow-soft">
          <div
            className="grid min-w-[720px] gap-2"
            style={{
              gridTemplateColumns: `72px repeat(${view === "Jour" ? 1 : days.length}, minmax(0,1fr))`,
            }}
          >
            <div />
            {(view === "Jour" ? days.slice(0, 1) : days).map((d) => (
              <div key={d.date} className="pb-2 text-center text-sm font-medium">
                {d.label}
              </div>
            ))}
            {hours.map((h) => (
              <Fragment key={h}>
                <div className="py-3 text-xs text-muted-foreground">{h}</div>
                {(view === "Jour" ? days.slice(0, 1) : days).map((d) => {
                  const appt = visible.find(
                    (appointment) =>
                      appointmentDate(appointment.startAt) === d.date &&
                      appointmentHour(appointment.startAt) === h.slice(0, 2),
                  );
                  const cellAvailability = getCellAvailability(d.date, h);
                  return (
                    <div
                      key={d.date + h}
                      className={cn(
                        "min-h-14 rounded-xl border p-2 text-xs",
                        appt
                          ? appt.status === "CANCELLED"
                            ? "border-border bg-muted text-muted-foreground"
                            : "border-sage/40 bg-sage-soft"
                          : cellAvailability === "unavailable"
                            ? "border-transparent bg-muted text-muted-foreground"
                            : "border-border/70 bg-card hover:bg-accent/50",
                      )}
                    >
                      {appt ? (
                        <>
                          <p className="truncate font-medium">
                            {appt.client.firstName} {appt.client.lastName}
                          </p>
                          <p className="truncate text-muted-foreground">{appt.service.name}</p>
                        </>
                      ) : cellAvailability === "unavailable" ? (
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

function MonthView({
  days,
  appointments,
  blockedDates,
}: {
  days: { date: string; value: Date }[];
  appointments: ApiAdminAppointment[];
  blockedDates: Set<string>;
}) {
  return (
    <div className="rounded-2xl border border-border/70 bg-card p-5 shadow-soft">
      <div className="grid grid-cols-7 gap-2 text-center text-xs text-muted-foreground">
        {["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"].map((d) => (
          <span key={d}>{d}</span>
        ))}
      </div>
      <div className="mt-2 grid grid-cols-7 gap-2">
        {days.map((day) => (
          <div
            key={day.date}
            className={cn(
              "min-h-20 rounded-xl border border-border/70 p-2 text-xs",
              appointments.some(
                (appointment) => appointmentDate(appointment.startAt) === day.date,
              ) && "border-sage bg-sage-soft",
              blockedDates.has(day.date) && "border-transparent bg-muted text-muted-foreground",
            )}
          >
            <span className="font-medium">{day.value.getDate()}</span>
            {appointments.filter((appointment) => appointmentDate(appointment.startAt) === day.date)
              .length > 0 && (
              <span className="mt-2 block rounded-md bg-secondary px-1.5 py-1 text-[10px] text-muted-foreground">
                {
                  appointments.filter(
                    (appointment) => appointmentDate(appointment.startAt) === day.date,
                  ).length
                }{" "}
                séance(s)
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
