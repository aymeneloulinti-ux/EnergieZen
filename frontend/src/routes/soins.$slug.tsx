import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Check, Clock, Euro } from "lucide-react";
import { SiteShell } from "@/components/site/SiteShell";
import { getService, formatPrice, images } from "@/data/site";
import { useServices } from "@/hooks/useServices";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const Route = createFileRoute("/soins/$slug")({
  head: () => ({ meta: [{ title: "Les soins — Maison Lumen" }] }),
  component: ServiceDetail,
});

function ServiceDetail() {
  const { slug } = Route.useParams();
  const { services, loading, error } = useServices();
  const apiService = services.find((service) => service.slug === slug);
  const staticService = getService(slug);

  if (loading) {
    return (
      <SiteShell>
        <p className="mx-auto max-w-6xl px-5 pt-14 text-muted-foreground">
          Chargement du soin…
        </p>
      </SiteShell>
    );
  }

  if (error || !apiService && !staticService) {
    return (
      <SiteShell>
        <p className="mx-auto max-w-6xl px-5 pt-14 text-destructive">
          {error ?? "Soin introuvable"}
        </p>
      </SiteShell>
    );
  }

  const service = {
    slug,
    name: apiService?.name ?? staticService!.name,
    short: apiService?.description ?? staticService?.short ?? "",
    duration: apiService?.duration ?? staticService!.duration,
    price: apiService?.price ?? staticService!.price,
    image: apiService?.imageUrl ?? staticService?.image,
    description: apiService?.description ?? staticService!.description,
    benefits: apiService?.benefits ?? [],
    steps: apiService?.steps ?? staticService?.expect ?? [],
    faq: apiService?.faq ?? [],
  };

  return (
    <SiteShell>
      <div className="mx-auto max-w-6xl px-5 pt-8">
        <Link
          to="/soins"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" /> Tous les soins
        </Link>
      </div>

      <section className="mx-auto mt-6 max-w-6xl px-5">
        <div className="overflow-hidden rounded-[2rem] shadow-lift sm:rounded-[2.5rem]">
          <img
            src={service.image ?? images.heroImg}
            alt={service.name}
            width={1200}
            height={912}
            className="h-[280px] w-full object-cover sm:h-[440px]"
          />
        </div>
      </section>

      <section className="mx-auto mt-12 grid max-w-6xl gap-12 px-5 lg:grid-cols-[1.35fr_1fr]">
        <div>
          <h1 className="text-4xl leading-tight sm:text-5xl">{service.name}</h1>
          <p className="mt-6 text-[1.02rem] leading-relaxed text-muted-foreground">
            {service.description}
          </p>

          <h2 className="mt-12 text-2xl">Ce que la séance peut soutenir</h2>
          <ul className="mt-5 grid gap-3 sm:grid-cols-2">
            {service.benefits.map((b) => (
              <li
                key={b}
                className="flex gap-3 rounded-2xl border border-border/70 bg-card p-4 text-sm leading-relaxed"
              >
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-sage" />
                {b}
              </li>
            ))}
          </ul>
          <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
            Il s'agit d'une pratique de bien-être et de relaxation. Elle ne constitue ni un
            diagnostic ni un traitement et ne remplace pas un suivi médical.
          </p>

          <h2 className="mt-12 text-2xl">Comment ça se passe</h2>
          <div className="mt-5 space-y-4">
            {service.steps.map((e, i) => (
              <div key={e.title} className="flex gap-5 rounded-2xl bg-secondary/60 p-5">
                <span className="font-serif text-2xl text-sage">{i + 1}</span>
                <div>
                  <p className="font-medium">{e.title}</p>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{e.text}</p>
                </div>
              </div>
            ))}
          </div>

          <h2 className="mt-12 text-2xl">Questions fréquentes</h2>
          <Accordion type="single" collapsible className="mt-4">
            {service.faq.map((f) => (
              <AccordionItem key={f.q} value={f.q}>
                <AccordionTrigger className="text-left text-base">{f.q}</AccordionTrigger>
                <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <aside className="lg:sticky lg:top-28 lg:self-start">
          <div className="rounded-3xl border border-border/70 bg-card p-7 shadow-soft">
            <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
              Réserver cette séance
            </p>
            <p className="mt-4 font-serif text-4xl">{formatPrice(service.price)}</p>
            <ul className="mt-5 space-y-3 text-sm text-muted-foreground">
              <li className="flex items-center gap-2.5">
                <Clock className="h-4 w-4 text-sage" /> {service.duration} minutes
              </li>
              <li className="flex items-center gap-2.5">
                <Euro className="h-4 w-4 text-sage" /> Paiement sécurisé en ligne
              </li>
            </ul>
            <Link
              to="/reservation"
              search={{ service: service.slug }}
              className="mt-7 flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm text-primary-foreground transition-transform hover:-translate-y-0.5"
            >
              Réserver <ArrowRight className="h-4 w-4" />
            </Link>
            <p className="mt-4 text-center text-xs text-muted-foreground">
              Annulation libre jusqu'à 24 h avant.
            </p>
          </div>
        </aside>
      </section>
    </SiteShell>
  );
}