const API_URL = import.meta.env["VITE_API_URL"] ?? "http://localhost:3000/api";
const API_ORIGIN = API_URL.replace(/\/api\/?$/, "");

export const resolveApiAssetUrl = (url: string | null) =>
  url?.startsWith("/") ? `${API_ORIGIN}${url}` : url;

type ApiOptions = RequestInit & {
  auth?: boolean;
};

export async function api<T>(
  endpoint: string,
  options: ApiOptions = {},
): Promise<T> {
  const { auth = false, headers, ...fetchOptions } = options;

  const token = localStorage.getItem("token");

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...fetchOptions,
    headers: {
      "Content-Type": "application/json",
      ...(auth && token
        ? {
            Authorization: `Bearer ${token}`,
          }
        : {}),
      ...headers,
    },
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(
      data?.error ?? `Erreur API (${response.status})`,
    );
  }

  return data as T;
}

// -------- Requêtes ---------

export type ApiService = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  imageUrl: string | null;
  benefits: string[];
  steps: string[];
  faq: { q: string; a: string }[];
  duration: number;
  price: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;
};

export type Service = Omit<ApiService, "price" | "steps"> & {
  price: number;
  steps: { title: string; text: string }[];
};

export const getServices = () =>
  api<ApiService[]>("/services");