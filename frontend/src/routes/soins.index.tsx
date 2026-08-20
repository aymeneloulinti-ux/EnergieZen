import { createFileRoute, Link } from "@tanstack/react-router";
import { Clock, ArrowRight } from "lucide-react";
import { SiteShell } from "@/components/site/SiteShell";
import { formatPrice } from "@/data/site";
import { useServices } from "@/hooks/useServices";

export const Route = createFileRoute("/soins/")({
  head: () => ({
    meta: [
      { title: "Les soins — Maison Lumen" },
      {
        name: "description",
        content:
          "Soin énergétique, rééquilibrage, relaxation ou accompagnement personnalisé : découvrez les séances proposées au cabinet d'Ixelles.",
      },
      { property: "og:title", content: "Les soins — Maison Lumen" },
      {
        property: "og:description",
        content: "Quatre formats de séances de bien-être, de 45 à 90 minutes.",
      },
    ],
  }),
  component: SoinsPage,
});

function SoinsPage() {
  const { services, loading, error } = useServices();

  return (
    <SiteShell>
      <section className="mx-auto max-w-6xl px-5 pt-14 sm:pt-20">
        <p className="text-xs uppercase tracking-[0.22em] text-sage">Les soins</p>
        <h1 className="mt-5 max-w-2xl text-4xl leading-tight sm:text-6xl">
          Quatre façons de prendre soin de vous.
        </h1>
        <p className="mt-6 max-w-xl leading-relaxed text-muted-foreground">
          Toutes les séances se déroulent habillé·e, allongé·e, dans un cabinet calme. Si vous
          hésitez, la séance de relaxation de 45 minutes est une belle première rencontre.
        </p>
      </section>

      <section className="mx-auto mt-14 max-w-6xl space-y-6 px-5">
        {loading && <p className="text-muted-foreground">Chargement des soins…</p>}
        {error && <p className="text-destructive">{error}</p>}
        {!loading &&
          !error &&
          services.map((s, i) => {
            return (
              <article
                key={s.slug}
                className="grid overflow-hidden rounded-[2rem] border border-border/70 bg-card shadow-soft transition-shadow hover:shadow-lift md:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]"
              >
                {s.imageUrl ? (
                  <img
                    src={s.imageUrl}
                    alt={s.name}
                    loading="lazy"
                    width={1200}
                    height={912}
                    className={`h-56 w-full object-cover md:h-full ${i % 2 ? "md:order-2" : ""}`}
                  />
                ) : (
                  <div
                    aria-hidden="true"
                    className={`h-56 bg-secondary md:h-full ${i % 2 ? "md:order-2" : ""}`}
                  />
                )}
                <div className="flex flex-col justify-center p-7 sm:p-10">
                  <h2 className="text-2xl sm:text-3xl">{s.name}</h2>
                  <p className="mt-3 max-w-lg leading-relaxed text-muted-foreground">
                    {s.description}
                  </p>
                  <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2">
                    <span className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4 text-sage" /> {s.duration} minutes
                    </span>
                    <span className="font-serif text-2xl">{formatPrice(s.price)}</span>
                  </div>
                  <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                    <Link
                      to="/soins/$slug"
                      params={{ slug: s.slug }}
                      className="inline-flex items-center justify-center gap-2 rounded-full border border-border px-6 py-3 text-sm transition-colors hover:bg-accent"
                    >
                      En savoir plus
                    </Link>
                    <Link
                      to="/reservation"
                      search={{ service: s.slug }}
                      className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm text-primary-foreground transition-transform hover:-translate-y-0.5"
                    >
                      Réserver <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
      </section>
    </SiteShell>
  );
}
