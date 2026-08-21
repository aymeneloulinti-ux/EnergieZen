import { Link } from "@tanstack/react-router";
import { Instagram, Facebook, Mail, Phone, MapPin } from "lucide-react";
import { services } from "@/data/site";
import { useStudioSettings } from "@/hooks/useStudioSettings";
export function SiteFooter() {
  const studio = useStudioSettings();
  return (
    <footer className="mt-24 border-t border-border/60 bg-secondary/50">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="font-serif text-2xl">{studio.name}</p>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted-foreground">
            Un cabinet calme au cœur d'Ixelles, pour prendre soin de soi sans mise en scène.
          </p>
          <div className="mt-5 flex gap-3">
            <a
              href="https://instagram.com"
              aria-label="Instagram"
              className="grid h-9 w-9 place-items-center rounded-full border border-border transition-colors hover:bg-accent"
            >
              <Instagram className="h-4 w-4" />
            </a>
            <a
              href="https://facebook.com"
              aria-label="Facebook"
              className="grid h-9 w-9 place-items-center rounded-full border border-border transition-colors hover:bg-accent"
            >
              <Facebook className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Les soins</p>
          <ul className="mt-4 space-y-2.5">
            {services.map((s) => (
              <li key={s.slug}>
                <Link
                  to="/soins/$slug"
                  params={{ slug: s.slug }}
                  className="text-sm text-foreground/80 transition-colors hover:text-foreground"
                >
                  {s.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Contact</p>
          <ul className="mt-4 space-y-3 text-sm text-foreground/80">
            <li className="flex gap-2.5">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-sage" />
              {studio.address}
            </li>
            <li className="flex gap-2.5">
              <Phone className="mt-0.5 h-4 w-4 shrink-0 text-sage" />
              {studio.phone}
            </li>
            <li className="flex gap-2.5">
              <Mail className="mt-0.5 h-4 w-4 shrink-0 text-sage" />
              {studio.email}
            </li>
          </ul>
        </div>

        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Horaires</p>
          <ul className="mt-4 space-y-2 text-sm text-foreground/80">
            <li className="flex justify-between gap-4">
              <span>Mardi — Vendredi</span> <span className="text-muted-foreground">9h — 19h</span>
            </li>
            <li className="flex justify-between gap-4">
              <span>Samedi</span> <span className="text-muted-foreground">10h — 16h</span>
            </li>
            <li className="flex justify-between gap-4">
              <span>Dimanche — Lundi</span> <span className="text-muted-foreground">Fermé</span>
            </li>
          </ul>
          <Link
            to="/admin"
            className="mt-5 inline-block text-xs text-muted-foreground underline underline-offset-4"
          >
            Mon Espace
          </Link>
        </div>
      </div>

      <div className="border-t border-border/60">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-5 py-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>
            © 2026 {studio.name}. Les soins proposés relèvent du bien-être et ne remplacent pas un
            avis médical.
          </p>
          <div className="flex gap-5">
            <a href="#" className="hover:text-foreground">
              Mentions légales
            </a>
            <a href="#" className="hover:text-foreground">
              Confidentialité
            </a>
            <a href="#" className="hover:text-foreground">
              CGV
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
