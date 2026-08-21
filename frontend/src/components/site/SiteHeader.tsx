import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { studio } from "@/data/site";
import { useAuth } from "@/hooks/useAuth";

const nav = [
  { to: "/", label: "Accueil" },
  { to: "/soins", label: "Soins" },
  { to: "/reservation", label: "Réserver" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const { isAuthenticated, isAdmin, isPractitioner, isClient } = useAuth();

  // Determine the account space link based on role
  const accountLink = isAdmin ? "/admin" : isPractitioner ? "/praticien" : isClient ? "/compte" : undefined;
  const accountLabel = isAdmin ? "Administration" : isPractitioner ? "Espace praticien" : "Mon espace";

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/85 backdrop-blur-md">
      <div className="mx-auto grid max-w-6xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-5 py-4 sm:flex sm:justify-between">
        <Link to="/" className="flex min-w-0 items-center gap-3">
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-sage-soft font-serif text-sm text-foreground">
            ML
          </span>
          <span className="min-w-0">
            <span className="block truncate font-serif text-lg leading-none">{studio.name}</span>
            <span className="mt-1 block truncate text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
              {studio.tagline}
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              activeProps={{ className: "text-sm text-foreground" }}
              activeOptions={{ exact: n.to === "/" }}
            >
              {n.label}
            </Link>
          ))}
          {accountLink && (
            <Link
              to={accountLink}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              activeProps={{ className: "text-sm text-foreground" }}
            >
              {accountLabel}
            </Link>
          )}
          <Link
            to="/reservation"
            className="rounded-full bg-primary px-5 py-2.5 text-sm text-primary-foreground transition-opacity hover:opacity-90"
          >
            Prendre rendez-vous
          </Link>
        </nav>

        <button
          type="button"
          aria-label="Ouvrir le menu"
          onClick={() => setOpen((v) => !v)}
          className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-border md:hidden"
        >
          {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-border/60 bg-background px-5 pb-6 pt-2 md:hidden">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              onClick={() => setOpen(false)}
              className="block border-b border-border/50 py-3 text-sm text-foreground"
            >
              {n.label}
            </Link>
          ))}
          {accountLink && (
            <Link
              to={accountLink}
              onClick={() => setOpen(false)}
              className="block border-b border-border/50 py-3 text-sm text-foreground"
            >
              {accountLabel}
            </Link>
          )}
          <Link
            to="/reservation"
            onClick={() => setOpen(false)}
            className="mt-4 block rounded-full bg-primary px-5 py-3 text-center text-sm text-primary-foreground"
          >
            Prendre rendez-vous
          </Link>
        </div>
      )}
    </header>
  );
}