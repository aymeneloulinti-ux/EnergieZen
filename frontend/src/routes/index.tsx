import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Clock, Quote } from "lucide-react";
import { SiteShell } from "@/components/site/SiteShell";
import { steps, testimonials, images, formatPrice } from "@/data/site";
import { useServices } from "@/hooks/useServices";
import { useStudioSettings } from "@/hooks/useStudioSettings";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Maison Lumen — Soins énergétiques à Ixelles" },
      {
        name: "description",
        content:
          "Cabinet de soins énergétiques et de relaxation à Ixelles. Retrouvez votre équilibre naturellement, dans un lieu calme et bienveillant.",
      },
      { property: "og:title", content: "Maison Lumen — Retrouver votre équilibre, naturellement" },
      {
        property: "og:description",
        content: "Soins énergétiques, relaxation et accompagnement personnalisé à Bruxelles.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  const studio = useStudioSettings();
  const { services, loading, error } = useServices();

  return (
    <SiteShell>
      {/* Hero */}
      <section className="mx-auto max-w-6xl px-5 pb-8 pt-10 sm:pt-16">
        <div className="grid items-center gap-10 lg:grid-cols-[1.02fr_1fr]">
          <div className="fade-up">
            <p className="text-xs uppercase tracking-[0.22em] text-sage">Ixelles · Bruxelles</p>
            <h1 className="mt-5 text-[2.6rem] leading-[1.05] sm:text-6xl">
              Retrouver votre
              <br />
              équilibre, <em className="not-italic text-sage">naturellement.</em>
            </h1>
            <p className="mt-6 max-w-lg text-[1.02rem] leading-relaxed text-muted-foreground">
              Je suis Camille, praticienne en soins énergétiques depuis douze ans. Ici, pas de
              promesses ni de rituels compliqués : un lieu calme, une écoute réelle, et le temps
              qu'il faut pour relâcher ce que vous portez.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                to="/reservation"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm text-primary-foreground transition-transform hover:-translate-y-0.5"
              >
                Prendre rendez-vous <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/soins"
                className="inline-flex items-center justify-center rounded-full border border-border bg-card px-7 py-3.5 text-sm text-foreground transition-colors hover:bg-accent"
              >
                Découvrir les soins
              </Link>
            </div>
            <dl className="mt-10 flex flex-wrap gap-x-10 gap-y-4 border-t border-border/70 pt-6">
              {[
                ["12 ans", "de pratique"],
                ["1 400+", "séances données"],
                ["4,9/5", "sur 186 avis"],
              ].map(([a, b]) => (
                <div key={a}>
                  <dt className="font-serif text-2xl">{a}</dt>
                  <dd className="text-xs uppercase tracking-[0.14em] text-muted-foreground">{b}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="fade-up relative">
            <div className="overflow-hidden rounded-[2rem] shadow-lift sm:rounded-[2.5rem]">
              <img
                src={images.heroImg}
                alt="Camille Vasseur dans son cabinet de soins lumineux"
                width={1600}
                height={1200}
                className="h-[380px] w-full object-cover sm:h-[520px]"
              />
            </div>
            <div className="absolute -bottom-6 left-4 hidden rounded-2xl bg-card px-5 py-4 shadow-soft sm:block">
              <p className="font-serif text-lg">Camille Vasseur</p>
              <p className="text-xs text-muted-foreground">Praticienne · fondatrice du cabinet</p>
            </div>
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="mx-auto mt-24 max-w-4xl px-5 text-center">
        <p className="text-xs uppercase tracking-[0.22em] text-sage">L'approche</p>
        <h2 className="mt-5 text-3xl leading-tight sm:text-[2.6rem]">
          Un accompagnement simple, humain et sans jargon.
        </h2>
        <p className="mt-6 text-[1.02rem] leading-relaxed text-muted-foreground">
          Après dix ans passés dans un environnement de travail très rapide, j'ai ouvert ce cabinet
          pour offrir ce qui m'avait manqué : un endroit où ralentir vraiment. Chaque séance
          s'adapte à ce que vous traversez le jour même. Vous n'avez rien à préparer, rien à
          prouver, et vous pouvez rester silencieux·se si c'est ce dont vous avez besoin.
        </p>
      </section>

      {/* Services */}
      <section className="mx-auto mt-24 max-w-6xl px-5">
        <div className="grid gap-4 sm:flex sm:items-end sm:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-sage">Les soins</p>
            <h2 className="mt-4 text-3xl sm:text-4xl">Choisir ce dont vous avez besoin</h2>
          </div>
          <Link
            to="/soins"
            className="inline-flex items-center gap-2 text-sm text-foreground underline-offset-4 hover:underline"
          >
            Voir tous les soins <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {loading && <p className="text-muted-foreground">Chargement des soins…</p>}
          {error && <p className="text-destructive">{error}</p>}
          {!loading &&
            !error &&
            services.map((s) => (
              <Link
                key={s.slug}
                to="/soins/$slug"
                params={{ slug: s.slug }}
                className="group overflow-hidden rounded-3xl border border-border/70 bg-card shadow-soft transition-all hover:-translate-y-1 hover:shadow-lift"
              >
                {s.imageUrl ? (
                  <img
                    src={s.imageUrl}
                    alt={s.name}
                    loading="lazy"
                    width={1200}
                    height={912}
                    className="h-44 w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                ) : (
                  <div aria-hidden="true" className="h-44 bg-secondary" />
                )}
                <div className="p-5">
                  <h3 className="text-xl">{s.name}</h3>
                  <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
                    {s.description}
                  </p>
                  <div className="mt-4 flex items-center justify-between border-t border-border/70 pt-4 text-sm">
                    <span className="flex items-center gap-1.5 text-muted-foreground">
                      <Clock className="h-3.5 w-3.5" /> {s.duration} min
                    </span>
                    <span className="font-serif text-lg">{formatPrice(s.price)}</span>
                  </div>
                </div>
              </Link>
            ))}
        </div>
      </section>

      {/* Steps */}
      <section className="mt-28 border-y border-border/60 bg-secondary/45 py-20">
        <div className="mx-auto max-w-6xl px-5">
          <p className="text-xs uppercase tracking-[0.22em] text-sage">Le déroulé</p>
          <h2 className="mt-4 max-w-xl text-3xl sm:text-4xl">Comment se déroule une séance ?</h2>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {steps.map((s) => (
              <div key={s.n} className="rounded-3xl bg-card p-7 shadow-soft">
                <span className="font-serif text-3xl text-sage">{s.n}</span>
                <h3 className="mt-4 text-xl">{s.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="mx-auto mt-24 max-w-6xl px-5">
        <p className="text-xs uppercase tracking-[0.22em] text-sage">Elles et ils sont venus</p>
        <h2 className="mt-4 text-3xl sm:text-4xl">Quelques retours</h2>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {testimonials.map((t) => (
            <figure
              key={t.name}
              className="rounded-3xl border border-border/70 bg-card p-7 shadow-soft"
            >
              <Quote className="h-5 w-5 text-sage" />
              <blockquote className="mt-4 text-[0.97rem] leading-relaxed text-foreground/85">
                {t.text}
              </blockquote>
              <figcaption className="mt-6 text-sm text-muted-foreground">
                {t.name} — {t.city}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto mt-24 max-w-6xl px-5">
        <div className="bg-warm rounded-[2.5rem] border border-border/70 px-6 py-16 text-center shadow-soft sm:px-16">
          <h2 className="mx-auto max-w-2xl text-3xl leading-tight sm:text-[2.7rem]">
            Offrez-vous une heure de vraie pause.
          </h2>
          <p className="mx-auto mt-5 max-w-lg text-muted-foreground">
            Réservation en ligne en moins de deux minutes. Annulation libre jusqu'à 24 h avant le
            rendez-vous.
          </p>
          <Link
            to="/reservation"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 text-sm text-primary-foreground transition-transform hover:-translate-y-0.5"
          >
            Prendre rendez-vous <ArrowRight className="h-4 w-4" />
          </Link>
          <p className="mt-6 text-xs text-muted-foreground">{studio.address}</p>
        </div>
      </section>
    </SiteShell>
  );
}
