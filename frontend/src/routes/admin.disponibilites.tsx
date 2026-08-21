import { createFileRoute } from "@tanstack/react-router";
import { Ban, Plus, Trash2 } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { AdminShell } from "@/components/admin/AdminShell";
import {
  createAdminAvailabilityException,
  deleteAdminAvailabilityException,
  getAdminAvailabilityExceptions,
  getAdminPractitioners,
  getAdminWeeklyAvailability,
  updateAdminWeeklyAvailability,
  type ApiAdminPractitioner,
  type ApiAvailabilityException,
  type ApiWeeklyAvailability,
} from "@/lib/api";

export const Route = createFileRoute("/admin/disponibilites")({
  head: () => ({
    meta: [
      { title: "Disponibilités — Maison Lumen" },
      { name: "description", content: "Horaires hebdomadaires, congés et horaires personnalisés." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Disponibilites,
});

const dayLabels: Record<ApiWeeklyAvailability["dayOfWeek"], string> = {
  MONDAY: "Lundi",
  TUESDAY: "Mardi",
  WEDNESDAY: "Mercredi",
  THURSDAY: "Jeudi",
  FRIDAY: "Vendredi",
  SATURDAY: "Samedi",
  SUNDAY: "Dimanche",
};
const days = Object.keys(dayLabels) as ApiWeeklyAvailability["dayOfWeek"][];

function Disponibilites() {
  const [practitioners, setPractitioners] = useState<ApiAdminPractitioner[]>([]);
  const [selectedId, setSelectedId] = useState("");
  const [weekly, setWeekly] = useState<ApiWeeklyAvailability[]>([]);
  const [exceptions, setExceptions] = useState<ApiAvailabilityException[]>([]);
  const [exception, setException] = useState({
    date: "",
    type: "CLOSED" as "CLOSED" | "CUSTOM_HOURS",
    startTime: "09:00",
    endTime: "18:00",
    reason: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    getAdminPractitioners()
      .then((data) => {
        setPractitioners(data);
        setSelectedId(data[0]?.id ?? "");
      })
      .catch(() => setError("Impossible de récupérer les praticiennes"))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (!selectedId) return;
    setLoading(true);
    setSaved(false);
    Promise.all([
      getAdminWeeklyAvailability(selectedId),
      getAdminAvailabilityExceptions(selectedId),
    ])
      .then(([weeklyData, exceptionData]) => {
        setWeekly(weeklyData);
        setExceptions(exceptionData);
      })
      .catch((reason) =>
        setError(
          reason instanceof Error ? reason.message : "Impossible de récupérer les disponibilités",
        ),
      )
      .finally(() => setLoading(false));
  }, [selectedId]);

  const schedule = useMemo(
    () => days.map((day) => weekly.find((item) => item.dayOfWeek === day)),
    [weekly],
  );

  const updateSchedule = (
    day: ApiWeeklyAvailability["dayOfWeek"],
    field: "startTime" | "endTime",
    value: string,
  ) => {
    setWeekly((current) => {
      const existing = current.find((item) => item.dayOfWeek === day);
      if (existing)
        return current.map((item) => (item.dayOfWeek === day ? { ...item, [field]: value } : item));
      return [
        ...current,
        {
          id: `new-${day}`,
          dayOfWeek: day,
          startTime: field === "startTime" ? value : "09:00",
          endTime: field === "endTime" ? value : "18:00",
          active: true,
        },
      ];
    });
    setSaved(false);
  };

  const toggleDay = (day: ApiWeeklyAvailability["dayOfWeek"], open: boolean) => {
    setWeekly((current) =>
      open
        ? [
            ...current,
            {
              id: `new-${day}`,
              dayOfWeek: day,
              startTime: "09:00",
              endTime: "18:00",
              active: true,
            },
          ]
        : current.filter((item) => item.dayOfWeek !== day),
    );
    setSaved(false);
  };

  const saveSchedule = async () => {
    setSaving(true);
    setSaved(false);
    setError(null);
    try {
      const data = await updateAdminWeeklyAvailability(
        selectedId,
        schedule
          .filter((item): item is ApiWeeklyAvailability => Boolean(item))
          .map(({ dayOfWeek, startTime, endTime }) => ({ dayOfWeek, startTime, endTime })),
      );
      setWeekly(data);
      setSaved(true);
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "Impossible d'enregistrer les horaires");
    } finally {
      setSaving(false);
    }
  };

  const addException = async () => {
    if (!selectedId || !exception.date) return;
    setError(null);
    try {
      const created = await createAdminAvailabilityException(selectedId, exception);
      setExceptions((current) =>
        [...current, created].sort((a, b) => a.date.localeCompare(b.date)),
      );
      setException({ date: "", type: "CLOSED", startTime: "09:00", endTime: "18:00", reason: "" });
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "Impossible d'ajouter cette période");
    }
  };

  const removeException = async (item: ApiAvailabilityException) => {
    setError(null);
    try {
      await deleteAdminAvailabilityException(selectedId, item.id);
      setExceptions((current) => current.filter((entry) => entry.id !== item.id));
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "Impossible de supprimer cette période");
    }
  };

  return (
    <AdminShell
      title="Disponibilités"
      subtitle="Horaires et exceptions par praticienne"
      action={
        <div className="flex items-center gap-2">
          <Ban className="h-4 w-4" />
          <select
            value={selectedId}
            onChange={(event) => setSelectedId(event.target.value)}
            className="rounded-full border border-border bg-background px-4 py-2 text-sm"
          >
            {practitioners.map((item) => (
              <option key={item.id} value={item.id}>
                {item.user.firstName} {item.user.lastName}
              </option>
            ))}
          </select>
        </div>
      }
    >
      {error && <p className="mb-5 text-sm text-destructive">{error}</p>}
      {loading && (
        <p className="mb-5 text-sm text-muted-foreground">Chargement des disponibilités…</p>
      )}
      <div className="grid gap-6 xl:grid-cols-[1.2fr_1fr]">
        <section className="rounded-2xl border border-border/70 bg-card p-6 shadow-soft">
          <h2 className="font-serif text-xl">Horaires hebdomadaires</h2>
          <ul className="mt-5 space-y-2">
            {schedule.map((item, index) => {
              const day = days[index];
              return (
                <li
                  key={day}
                  className="grid gap-3 rounded-xl border border-border/70 bg-secondary/40 px-4 py-3 sm:grid-cols-[110px_1fr_auto] sm:items-center"
                >
                  <span className="text-sm font-medium">{dayLabels[day]}</span>
                  {item ? (
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="time"
                        value={item.startTime}
                        onChange={(event) => updateSchedule(day, "startTime", event.target.value)}
                        className="rounded-lg border border-border bg-background px-2 py-1 text-sm"
                      />
                      <input
                        type="time"
                        value={item.endTime}
                        onChange={(event) => updateSchedule(day, "endTime", event.target.value)}
                        className="rounded-lg border border-border bg-background px-2 py-1 text-sm"
                      />
                    </div>
                  ) : (
                    <span className="text-sm text-muted-foreground">Fermé</span>
                  )}
                  <input
                    type="checkbox"
                    checked={!!item}
                    onChange={(event) => toggleDay(day, event.target.checked)}
                    aria-label={`${item ? "Fermer" : "Ouvrir"} ${dayLabels[day]}`}
                  />
                </li>
              );
            })}
          </ul>
          <button
            type="button"
            onClick={() => void saveSchedule()}
            disabled={saving || !selectedId}
            className="mt-6 rounded-full bg-primary px-5 py-2.5 text-sm text-primary-foreground"
          >
            {saving ? "Enregistrement…" : "Enregistrer les horaires"}
          </button>
          {saved && <p className="mt-3 text-sm text-emerald-700">Horaires enregistrés.</p>}
        </section>
        <section className="rounded-2xl border border-border/70 bg-card p-6 shadow-soft">
          <div className="flex items-center justify-between gap-4">
            <h2 className="font-serif text-xl">Congés et exceptions</h2>
            <button
              type="button"
              onClick={() => void addException()}
              className="inline-flex items-center gap-1.5 rounded-full border border-border px-4 py-2 text-xs hover:bg-accent"
            >
              <Plus className="h-3.5 w-3.5" /> Ajouter
            </button>
          </div>
          <div className="mt-5 grid gap-2">
            <input
              type="date"
              value={exception.date}
              onChange={(event) => setException({ ...exception, date: event.target.value })}
              className="rounded-lg border border-border bg-background px-3 py-2 text-sm"
            />
            <select
              value={exception.type}
              onChange={(event) =>
                setException({
                  ...exception,
                  type: event.target.value as "CLOSED" | "CUSTOM_HOURS",
                })
              }
              className="rounded-lg border border-border bg-background px-3 py-2 text-sm"
            >
              <option value="CLOSED">Congé / journée fermée</option>
              <option value="CUSTOM_HOURS">Horaires personnalisés</option>
            </select>
            {exception.type === "CUSTOM_HOURS" && (
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="time"
                  value={exception.startTime}
                  onChange={(event) =>
                    setException({ ...exception, startTime: event.target.value })
                  }
                  className="rounded-lg border border-border bg-background px-3 py-2 text-sm"
                />
                <input
                  type="time"
                  value={exception.endTime}
                  onChange={(event) => setException({ ...exception, endTime: event.target.value })}
                  className="rounded-lg border border-border bg-background px-3 py-2 text-sm"
                />
              </div>
            )}
            <input
              placeholder="Motif (facultatif)"
              value={exception.reason}
              onChange={(event) => setException({ ...exception, reason: event.target.value })}
              className="rounded-lg border border-border bg-background px-3 py-2 text-sm"
            />
          </div>
          <ul className="mt-5 divide-y divide-border/70">
            {exceptions.map((item) => (
              <li key={item.id} className="flex items-center justify-between gap-3 py-3 text-sm">
                <span>
                  {new Date(item.date).toLocaleDateString("fr-FR")} ·{" "}
                  {item.type === "CLOSED" ? "Fermé" : `${item.startTime} — ${item.endTime}`}
                </span>
                <button
                  type="button"
                  onClick={() => void removeException(item)}
                  aria-label="Supprimer l'exception"
                  className="grid h-8 w-8 place-items-center rounded-full border border-border text-destructive hover:bg-destructive/10"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </AdminShell>
  );
}
