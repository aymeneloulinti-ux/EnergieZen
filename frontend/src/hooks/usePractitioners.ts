import { useEffect, useState } from "react";
import { getPractitioners, type ApiPractitioner } from "@/lib/api";

export type Practitioner = ApiPractitioner & {
  name: string;
  role: string;
  initials: string;
  bio: string;
};

export const usePractitioners = () => {
  const [practitioners, setPractitioners] = useState<Practitioner[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getPractitioners()
      .then((data) =>
        setPractitioners(
          data.map((practitioner) => {
            const { firstName, lastName } = practitioner.user;
            return {
              ...practitioner,
              name: `${firstName} ${lastName}`,
              role: "Praticien·ne en soins énergétiques",
              initials: `${firstName[0] ?? ""}${lastName[0] ?? ""}`,
              bio: "Un accompagnement professionnel, adapté à votre séance.",
            };
          }),
        ),
      )
      .catch((reason: unknown) =>
        setError(reason instanceof Error ? reason.message : "Impossible de récupérer les praticiens"),
      )
      .finally(() => setLoading(false));
  }, []);

  return { practitioners, loading, error };
};