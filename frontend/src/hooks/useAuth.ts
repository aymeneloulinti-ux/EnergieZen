import { useEffect, useState } from "react";
import {
  ApiError,
  getCurrentUser,
  login as loginRequest,
  register as registerRequest,
  type ApiAuthResponse,
  type ApiUser,
} from "@/lib/api";

type RegisterData = Parameters<typeof registerRequest>[0];
type AuthListener = () => void;

let currentUser: ApiUser | null = null;
let authLoading = true;
let initialized = false;
const listeners = new Set<AuthListener>();

const notify = () => listeners.forEach((listener) => listener());

const persistAuth = (result: ApiAuthResponse) => {
  localStorage.setItem("token", result.token);
  currentUser = result.user;
  authLoading = false;
  initialized = true;
  notify();
  return result.user;
};

const initialize = async () => {
  if (initialized) return;
  initialized = true;

  if (!localStorage.getItem("token")) {
    authLoading = false;
    notify();
    return;
  }

  try {
    currentUser = await getCurrentUser();
  } catch (error) {
    if (error instanceof ApiError && (error.status === 401 || error.status === 403)) {
      localStorage.removeItem("token");
    }
    currentUser = null;
  } finally {
    authLoading = false;
    notify();
  }
};

export const useAuth = () => {
  const [, rerender] = useState(0);

  useEffect(() => {
    const listener = () => rerender((value) => value + 1);
    listeners.add(listener);
    void initialize();
    return () => {
      listeners.delete(listener);
    };
  }, []);

  const role = currentUser?.role;
  const isAdmin = role === "ADMIN";
  const isPractitioner = role === "PRACTITIONER";
  const isClient = role === "CLIENT";
  const hasRole = (requiredRole: string) => role === requiredRole;

  return {
    user: currentUser,
    isAuthenticated: !!currentUser,
    loading: authLoading,
    role,
    isAdmin,
    isPractitioner,
    isClient,
    hasRole,
    login: async (email: string, password: string) => persistAuth(await loginRequest({ email, password })),
    register: async (data: RegisterData) => persistAuth(await registerRequest(data)),
    logout: () => {
      localStorage.removeItem("token");
      currentUser = null;
      authLoading = false;
      notify();
    },
  };
};