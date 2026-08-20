import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import {
  LayoutDashboard,
  CalendarDays,
  ClipboardList,
  Users,
  Sparkles,
  Clock4,
  CreditCard,
  Settings,
  ArrowUpRight,
} from "lucide-react";
import { studio } from "@/data/site";

const nav = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { to: "/admin/calendrier", label: "Calendrier", icon: CalendarDays },
  { to: "/admin/rendez-vous", label: "Rendez-vous", icon: ClipboardList },
  { to: "/admin/clients", label: "Clients", icon: Users },
  { to: "/admin/prestations", label: "Prestations", icon: Sparkles },
  { to: "/admin/disponibilites", label: "Disponibilités", icon: Clock4 },
  { to: "/admin/paiements", label: "Paiements", icon: CreditCard },
  { to: "/admin/parametres", label: "Paramètres", icon: Settings },
];

export function AdminShell({
  title,
  subtitle,
  action,
  children,
}: {
  title: string;
  subtitle?: string;
  action?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background md:flex">
      <aside className="border-b border-sidebar-border bg-sidebar md:sticky md:top-0 md:h-screen md:w-64 md:shrink-0 md:border-b-0 md:border-r">
        <div className="px-5 py-5">
          <Link to="/" className="flex items-center gap-3">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-sage-soft font-serif text-sm">
              ML
            </span>
            <span>
              <span className="block font-serif text-base leading-none">{studio.name}</span>
              <span className="mt-1 block text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                Espace praticienne
              </span>
            </span>
          </Link>
        </div>
        <nav className="flex gap-1 overflow-x-auto px-3 pb-4 md:flex-col md:overflow-visible">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              activeOptions={{ exact: n.exact ?? false }}
              className="flex shrink-0 items-center gap-3 whitespace-nowrap rounded-xl px-3 py-2.5 text-sm text-sidebar-foreground/80 transition-colors hover:bg-sidebar-accent"
              activeProps={{
                className:
                  "flex shrink-0 items-center gap-3 whitespace-nowrap rounded-xl px-3 py-2.5 text-sm bg-sidebar-accent text-sidebar-accent-foreground font-medium",
              }}
            >
              <n.icon className="h-4 w-4" />
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="hidden px-5 pb-6 md:block">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground"
          >
            Voir le site public <ArrowUpRight className="h-3 w-3" />
          </Link>
        </div>
      </aside>

      <div className="min-w-0 flex-1">
        <header className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 border-b border-border/60 px-5 py-6 sm:flex sm:justify-between sm:px-8">
          <div className="min-w-0">
            <h1 className="truncate font-serif text-2xl sm:text-3xl">{title}</h1>
            {subtitle && <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>}
          </div>
          {action}
        </header>
        <div className="px-5 py-7 sm:px-8">{children}</div>
      </div>
    </div>
  );
}

export function StatCard({
  label,
  value,
  hint,
}: {
  label: string;
  value: string;
  hint?: string;
}) {
  return (
    <div className="rounded-2xl border border-border/70 bg-card p-5 shadow-soft">
      <p className="text-xs uppercase tracking-[0.14em] text-muted-foreground">{label}</p>
      <p className="mt-3 font-serif text-3xl">{value}</p>
      {hint && <p className="mt-1 text-xs text-sage">{hint}</p>}
    </div>
  );
}