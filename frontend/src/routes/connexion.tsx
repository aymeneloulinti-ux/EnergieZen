import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { SiteShell } from "@/components/site/SiteShell";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ApiError } from "@/lib/api";
import { useAuth } from "@/hooks/useAuth";

export const Route = createFileRoute("/connexion")({
  validateSearch: (search: Record<string, unknown>) => ({
    redirect: typeof search["redirect"] === "string" ? search["redirect"] : undefined,
  }),
  head: () => ({ meta: [{ title: "Connexion — Maison Lumen" }] }),
  component: Connexion,
});

function Connexion() {
  const navigate = useNavigate();
  const { redirect } = Route.useSearch();
  const { isAuthenticated, loading: authLoading, login, register } = useAuth();
  const [mode, setMode] = useState<"login" | "register">("login");
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", phone: "", password: "", confirmation: "" });
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!authLoading && isAuthenticated) void navigate({ to: redirect || "/compte" });
  }, [authLoading, isAuthenticated, navigate, redirect]);

  if (authLoading || isAuthenticated) return null;

  const submit = async () => {
    setError(null);
    if (mode === "register" && form.password !== form.confirmation) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }

    setSubmitting(true);
    try {
      if (mode === "login") {
        await login(form.email, form.password);
      } else {
        await register({
          email: form.email,
          password: form.password,
          firstName: form.firstName,
          lastName: form.lastName,
          phone: form.phone,
        });
      }
      await navigate({ to: redirect || "/compte" });
    } catch (reason) {
      if (reason instanceof ApiError && reason.status === 401) {
        setError("Impossible de vous connecter. Vérifiez votre adresse e-mail et votre mot de passe.");
      } else if (reason instanceof ApiError && reason.status === 409) {
        setError("Cette adresse e-mail est déjà utilisée.");
      } else {
        setError("Une erreur est survenue. Vérifiez vos informations et réessayez.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <SiteShell>
      <section className="mx-auto max-w-xl px-5 pb-16 pt-12 sm:pt-20">
        <p className="text-xs uppercase tracking-[0.22em] text-sage">Mon espace</p>
        <h1 className="mt-4 text-4xl leading-tight sm:text-5xl">
          {mode === "login" ? "Ravi de vous revoir." : "Créer votre espace."}
        </h1>
        <p className="mt-4 text-muted-foreground">
          {mode === "login" ? "Retrouvez vos rendez-vous et vos informations." : "Vos rendez-vous et vos informations au même endroit."}
        </p>

        <div className="mt-8 rounded-[2rem] border border-border/70 bg-card p-6 shadow-soft sm:p-9">
          <div className="flex gap-2 border-b border-border/70 pb-4">
            <button type="button" onClick={() => { setMode("login"); setError(null); }} className={`rounded-full px-4 py-2 text-sm ${mode === "login" ? "bg-primary text-primary-foreground" : "hover:bg-accent"}`}>Se connecter</button>
            <button type="button" onClick={() => { setMode("register"); setError(null); }} className={`rounded-full px-4 py-2 text-sm ${mode === "register" ? "bg-primary text-primary-foreground" : "hover:bg-accent"}`}>Créer un compte</button>
          </div>
          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            {mode === "register" && <>
              <div><Label htmlFor="firstName">Prénom</Label><Input id="firstName" className="mt-2 rounded-xl" value={form.firstName} onChange={(e) => setForm({ ...form, firstName: e.target.value })} /></div>
              <div><Label htmlFor="lastName">Nom</Label><Input id="lastName" className="mt-2 rounded-xl" value={form.lastName} onChange={(e) => setForm({ ...form, lastName: e.target.value })} /></div>
            </>}
            <div className="sm:col-span-2"><Label htmlFor="email">E-mail</Label><Input id="email" type="email" className="mt-2 rounded-xl" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /></div>
            {mode === "register" && <div className="sm:col-span-2"><Label htmlFor="phone">Téléphone</Label><Input id="phone" className="mt-2 rounded-xl" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} /></div>}
            <div className="sm:col-span-2"><Label htmlFor="password">Mot de passe</Label><Input id="password" type="password" className="mt-2 rounded-xl" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} /></div>
            {mode === "register" && <div className="sm:col-span-2"><Label htmlFor="confirmation">Confirmer le mot de passe</Label><Input id="confirmation" type="password" className="mt-2 rounded-xl" value={form.confirmation} onChange={(e) => setForm({ ...form, confirmation: e.target.value })} /></div>}
          </div>
          {error && <p className="mt-5 text-sm text-destructive">{error}</p>}
          <button type="button" disabled={submitting} onClick={submit} className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm text-primary-foreground disabled:opacity-50">
            {submitting ? "Chargement…" : mode === "login" ? "Se connecter" : "Créer mon compte"} <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </section>
    </SiteShell>
  );
}
