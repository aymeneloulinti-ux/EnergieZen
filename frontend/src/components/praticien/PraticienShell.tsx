import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import {
  LayoutDashboard,
  CalendarDays,
  ClipboardList,
  Users,
  Clock4,
  ArrowUpRight,
} from "lucide-react";
import { useStudioSettings } from "@/hooks/useStudioSettings";

const nav = [
  { to: "/praticien", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { to: "/praticien/calendrier", label: "Calendrier", icon: CalendarDays },
  { to: "/praticien/rendez-vous", label: "Rendez-vous", icon: ClipboardList },
  { to: "/praticien/clients", label: "Clients", icon: Users },
  { to: "/praticien/disponibilites", label: "Disponibilités", icon: Clock4 },
];

export function PraticienShell({
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
  const studio = useStudioSettings();
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
                Espace praticien
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
