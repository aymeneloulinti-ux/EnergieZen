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

  isUnauthorized(): boolean {
    return this.status === 401;
  }

  isForbidden(): boolean {
    return this.status === 403;
  }

  isAuthError(): boolean {
    return this.isUnauthorized() || this.isForbidden();
  }
}

export async function api<T>(endpoint: string, options: ApiOptions = {}): Promise<T> {
  const { auth = false, headers, body, ...fetchOptions } = options;

  const token = typeof window === "undefined" ? null : localStorage.getItem("token");
  const isFormData = typeof FormData !== "undefined" && body instanceof FormData;

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...fetchOptions,
    body,
    headers: {
      ...(isFormData ? {} : { "Content-Type": "application/json" }),
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

export const getServices = (auth = false) => api<ApiService[]>("/services", { auth });

export const createService = (
  body:
    | FormData
    | {
        name: string;
        slug: string;
        description?: string;
        imageUrl?: string;
        benefits?: string[];
        steps?: string[];
        faq?: { q: string; a: string }[];
        duration: number;
        price: number;
      },
) => {
  const isFormData = body instanceof FormData;

  return api<ApiService>("/services", {
    method: "POST",
    auth: true,
    headers: isFormData ? undefined : { "Content-Type": "application/json" },
    body: isFormData ? body : JSON.stringify(body),
  });
};

export const updateService = (
  id: string,
  body: Partial<Omit<ApiService, "id" | "active" | "createdAt" | "updatedAt" | "price">> & {
    price?: number;
  },
) =>
  api<ApiService>(`/services/${encodeURIComponent(id)}`, {
    method: "PATCH",
    auth: true,
    body: JSON.stringify(body),
  });

export const updateServiceStatus = (id: string, active: boolean) =>
  api<ApiService>(`/services/${encodeURIComponent(id)}/status`, {
    method: "PATCH",
    auth: true,
    body: JSON.stringify({ active }),
  });

export const deleteService = (id: string) =>
  api<void>(`/services/${encodeURIComponent(id)}`, {
    method: "DELETE",
    auth: true,
  });

export type ApiAdminDashboardStats = {
  users: {
    total: number;
    clients: number;
    practitioners: number;
    admins: number;
  };
  services: {
    total: number;
    active: number;
  };
  appointments: {
    total: number;
    pending: number;
    confirmed: number;
    completed: number;
    cancelled: number;
    noShow: number;
  };
};

export const getAdminDashboardStats = () =>
  api<ApiAdminDashboardStats>("/admin/dashboard", { auth: true });

export type ApiAdminAppointment = {
  id: string;
  startAt: string;
  endAt: string;
  status: ApiAppointmentStatus;
  client: ApiAuthResponse["user"];
  practitioner: ApiAdminPractitioner;
  service: ApiService;
};

export const getAdminAppointments = (params?: {
  status?: ApiAppointmentStatus;
  practitionerId?: string;
  from?: string;
  to?: string;
  includeCancelled?: boolean;
}) => {
  const search = new URLSearchParams();
  if (params?.status) search.set("status", params.status);
  if (params?.practitionerId) search.set("practitionerId", params.practitionerId);
  if (params?.from) search.set("from", params.from);
  if (params?.to) search.set("to", params.to);
  if (params?.includeCancelled !== undefined)
    search.set("includeCancelled", String(params.includeCancelled));
  const query = search.toString();
  return api<ApiAdminAppointment[]>(`/admin/appointments${query ? `?${query}` : ""}`, {
    auth: true,
  });
};

export const moveAdminAppointment = (id: string, body: { startAt: string }) =>
  api<ApiAdminAppointment>(`/admin/appointments/${encodeURIComponent(id)}/move`, {
    method: "PATCH",
    auth: true,
    body: JSON.stringify(body),
  });

export const deleteAdminAppointment = (id: string) =>
  api<void>(`/admin/appointments/${encodeURIComponent(id)}`, {
    method: "DELETE",
    auth: true,
  });

export const updateAdminAppointmentStatus = (
  id: string,
  status: Exclude<ApiAppointmentStatus, "PENDING">,
  cancellationReason?: string,
) =>
  api<ApiAdminAppointment>(`/admin/appointments/${encodeURIComponent(id)}/status`, {
    method: "PATCH",
    auth: true,
    body: JSON.stringify({ status, cancellationReason }),
  });

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

export type ApiAdminUser = ApiUser & {
  active: boolean;
  createdAt: string;
  updatedAt: string;
};

export const getUsers = () => api<ApiAdminUser[]>("/users", { auth: true });

export const getAdminClients = () => api<ApiAdminUser[]>("/admin/clients", { auth: true });

export type ApiAdminPractitioner = {
  id: string;
  user: ApiAdminUser;
  services: ApiService[];
};

export const getAdminPractitioners = () =>
  api<ApiAdminPractitioner[]>("/admin/practitioners", { auth: true });

export const addServiceToPractitioner = (practitionerId: string, serviceId: string) =>
  api<ApiAdminPractitioner>(
    `/practitioners/${encodeURIComponent(practitionerId)}/services/${encodeURIComponent(serviceId)}`,
    { method: "POST", auth: true },
  );

export const removeServiceFromPractitioner = (practitionerId: string, serviceId: string) =>
  api<ApiAdminPractitioner>(
    `/practitioners/${encodeURIComponent(practitionerId)}/services/${encodeURIComponent(serviceId)}`,
    { method: "DELETE", auth: true },
  );

export const updateUserStatus = (id: string, active: boolean) =>
  api<ApiAdminUser>(`/users/${encodeURIComponent(id)}/status`, {
    method: "PATCH",
    auth: true,
    body: JSON.stringify({ active }),
  });

export type ApiPractitioner = {
  id: string;
  user: {
    firstName: string;
    lastName: string;
    phone: string | null;
  };
  services: ApiService[];
};

export const getPractitioners = () => api<ApiPractitioner[]>("/practitioners");

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

export type ApiAppointmentStatus = "PENDING" | "CONFIRMED" | "CANCELLED" | "COMPLETED" | "NO_SHOW";

export type ApiAppointment = {
  id: string;
  startAt: string;
  endAt: string;
  status: ApiAppointmentStatus;
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

export const cancelAppointment = (id: string, body?: { cancellationReason?: string }) =>
  api<ApiAppointment>(`/appointments/${encodeURIComponent(id)}/cancel`, {
    method: "PATCH",
    auth: true,
    body: JSON.stringify(body ?? {}),
  });

export const updateAppointment = (id: string, body: { startAt: string }) =>
  api<ApiAppointment>(`/appointments/${encodeURIComponent(id)}`, {
    method: "PATCH",
    auth: true,
    body: JSON.stringify(body),
  });

export const updateMyProfile = (body: { firstName: string; lastName: string; phone: string }) =>
  api<ApiUser>("/users/me", { method: "PATCH", auth: true, body: JSON.stringify(body) });

/**
 * Handle API authentication errors globally
 * - 401: Clear session and redirect to login
 * - 403: Redirect to role-appropriate space
 * Optionally pass handlers for custom behavior
 */
export const handleApiAuthError = (
  error: unknown,
  options?: {
    onUnauthorized?: () => void;
    onForbidden?: () => void;
  },
): boolean => {
  if (!(error instanceof ApiError)) return false;

  if (error.isUnauthorized()) {
    // Clear session
    localStorage.removeItem("token");
    options?.onUnauthorized?.();
    return true;
  }

  if (error.isForbidden()) {
    options?.onForbidden?.();
    return true;
  }

  return false;
};
