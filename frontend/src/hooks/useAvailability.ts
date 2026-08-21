import { useEffect, useState } from "react";
import { getAvailability, type ApiAvailabilitySlot } from "@/lib/api";

export const useAvailability = ({
  practitionerId,
  serviceId,
  date,
}: {
  practitionerId: string;
  serviceId: string;
  date: string;
}) => {
  const [slots, setSlots] = useState<ApiAvailabilitySlot[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!practitionerId || !serviceId || !date) {
      setSlots([]);
      setLoading(false);
      setError(null);
      return;
    }

    let cancelled = false;
    setLoading(true);
    setError(null);

    getAvailability({ practitionerId, serviceId, date })
      .then((data) => {
        if (!cancelled) setSlots(data);
      })
      .catch((reason: unknown) => {
        if (!cancelled) {
          setSlots([]);
          setError(reason instanceof Error ? reason.message : "Impossible de récupérer les créneaux");
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [date, practitionerId, serviceId]);

  return { slots, loading, error };
};