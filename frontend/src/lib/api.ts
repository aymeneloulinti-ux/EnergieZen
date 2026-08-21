const API_URL = import.meta.env["VITE_API_URL"] ?? "http://localhost:3000/api";
const API_ORIGIN = API_URL.replace(/\/api\/?$/, "");

export const resolveApiAssetUrl = (url: string | null) =>
  url?.startsWith("/") ? `${API_ORIGIN}${url}` : url;

type ApiOptions = RequestInit & {
  auth?: boolean;
};

export class ApiError extends Error {
  constructor(
    message: string,
    public readonly status: number,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

export async function api<T>(
  endpoint: string,
  options: ApiOptions = {},
): Promise<T> {
  const { auth = false, headers, ...fetchOptions } = options;

  const token = typeof window === "undefined" ? null : localStorage.getItem("token");

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
    throw new ApiError(data?.error ?? `Erreur API (${response.status})`, response.status);
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

export type ApiAuthResponse = {
  user: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    phone: string | null;
    role: string;
  };
  token: string;
};

export const register = (body: {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone: string;
}) => api<ApiAuthResponse>("/auth/register", { method: "POST", body: JSON.stringify(body) });

export const login = (body: { email: string; password: string }) =>
  api<ApiAuthResponse>("/auth/login", { method: "POST", body: JSON.stringify(body) });

export type ApiUser = ApiAuthResponse["user"];

export const getCurrentUser = () => api<ApiUser>("/users/me", { auth: true });

export type ApiPractitioner = {
  id: string;
  user: {
    firstName: string;
    lastName: string;
    phone: string | null;
  };
  services: ApiService[];
};

export const getPractitioners = () =>
  api<ApiPractitioner[]>("/practitioners");

export type ApiAvailabilitySlot = {
  startAt: string;
  endAt: string;
  time: string;
  state: "available" | "booked" | "unavailable";
};

export const getAvailability = ({
  practitionerId,
  serviceId,
  date,
}: {
  practitionerId: string;
  serviceId: string;
  date: string;
}) =>
  api<ApiAvailabilitySlot[]>(
    `/availability/slots?practitionerId=${encodeURIComponent(practitionerId)}&serviceId=${encodeURIComponent(serviceId)}&date=${encodeURIComponent(date)}`,
  );

export type ApiAppointment = {
  id: string;
  startAt: string;
  endAt: string;
  status: "PENDING" | "CONFIRMED" | "CANCELLED" | "COMPLETED" | "NO_SHOW";
  client: ApiAuthResponse["user"];
  practitioner: ApiPractitioner;
  service: ApiService;
};

export const createAppointment = (body: {
  practitionerId: string;
  serviceId: string;
  startAt: string;
}) =>
  api<ApiAppointment>("/appointments", {
    method: "POST",
    auth: true,
    body: JSON.stringify(body),
  });

export const getAppointment = (id: string) =>
  api<ApiAppointment>(`/appointments/${encodeURIComponent(id)}`, { auth: true });

export const getMyAppointments = () => api<ApiAppointment[]>("/appointments/my", { auth: true });

export const updateMyProfile = (body: {
  firstName: string;
  lastName: string;
  phone: string;
}) => api<ApiUser>("/users/me", { method: "PATCH", auth: true, body: JSON.stringify(body) });