import { createFileRoute, Outlet, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [{ name: "robots", content: "noindex" }],
  }),
  component: AdminLayout,
});

function AdminLayout() {
  const navigate = useNavigate();
  const { isAdmin, loading, isAuthenticated } = useAuth();

  useEffect(() => {
    if (!loading && (!isAuthenticated || !isAdmin)) {
      void navigate({ to: "/connexion", search: { redirect: "/admin" } });
    }
  }, [loading, isAuthenticated, isAdmin, navigate]);

  if (loading || !isAuthenticated || !isAdmin) {
    return null;
  }

  return <Outlet />;
}