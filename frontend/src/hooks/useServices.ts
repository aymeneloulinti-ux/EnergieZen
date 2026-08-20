import { useEffect, useState } from "react";
import {
  getServices,
  resolveApiAssetUrl,
  type ApiService,
  type Service,
} from "@/lib/api";

const normalizeSteps = (steps: ApiService["steps"]): Service["steps"] =>
  steps.map((step, index) => {
    const separatorIndex = step.indexOf(":");

    if (separatorIndex === -1) {
      return { title: `Étape ${index + 1}`, text: step };
    }

    return {
      title: step.slice(0, separatorIndex).trim(),
      text: step.slice(separatorIndex + 1).trim(),
    };
  });

const normalizeService = (service: ApiService): Service => {
  const price = Number(service.price);

  if (!Number.isFinite(price)) {
    throw new Error(`Prix invalide pour le service « ${service.slug} »`);
  }

  return {
    ...service,
    imageUrl: resolveApiAssetUrl(service.imageUrl),
    price,
    steps: normalizeSteps(service.steps),
  };
};

export const useServices = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadServices = async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await getServices();

        setServices(data.map(normalizeService));
      } catch (error) {
        setError(
          error instanceof Error
            ? error.message
            : "Impossible de récupérer les services",
        );
      } finally {
        setLoading(false);
      }
    };

    loadServices();
  }, []);

  return {
    services,
    loading,
    error,
  };
};