import { createFileRoute, Outlet, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";

export const Route = createFileRoute("/praticien")({
  head: () => ({
    meta: [{ name: "robots", content: "noindex" }],
  }),
  component: PraticienLayout,
});

function PraticienLayout() {
  const navigate = useNavigate();
  const { isPractitioner, loading, isAuthenticated } = useAuth();

  useEffect(() => {
    if (!loading && (!isAuthenticated || !isPractitioner)) {
      void navigate({ to: "/connexion", search: { redirect: "/praticien" } });
    }
  }, [loading, isAuthenticated, isPractitioner, navigate]);

  if (loading || !isAuthenticated || !isPractitioner) {
    return null;
  }

  return <Outlet />;
}
