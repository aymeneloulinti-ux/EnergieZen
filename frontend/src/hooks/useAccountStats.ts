import type { ApiAppointment } from "@/lib/api";

export type AccountStats = {
  completedSessions: number;
  since: string | null;
  favoriteService: string | null;
};

export const getAccountStats = (appointments: ApiAppointment[]): AccountStats => {
  const completed = appointments.filter((appointment) => appointment.status === "COMPLETED");
  const serviceCounts = new Map<string, { name: string; count: number; firstIndex: number }>();

  completed.forEach((appointment, index) => {
    const current = serviceCounts.get(appointment.service.id);
    serviceCounts.set(appointment.service.id, {
      name: appointment.service.name,
      count: (current?.count ?? 0) + 1,
      firstIndex: current?.firstIndex ?? index,
    });
  });

  const favoriteService = [...serviceCounts.values()].sort(
    (left, right) => right.count - left.count || left.firstIndex - right.firstIndex,
  )[0]?.name ?? null;

  const firstCompleted = [...completed].sort(
    (left, right) => new Date(left.startAt).getTime() - new Date(right.startAt).getTime(),
  )[0];

  return {
    completedSessions: completed.length,
    since: firstCompleted
      ? new Date(firstCompleted.startAt).toLocaleDateString("fr-FR", {
          month: "long",
          year: "numeric",
          timeZone: "Europe/Brussels",
        })
      : null,
    favoriteService,
  };
};