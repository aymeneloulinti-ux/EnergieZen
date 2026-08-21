import { createFileRoute } from "@tanstack/react-router";
import { AdminShell } from "@/components/admin/AdminShell";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { getStudioSettings, saveStudioSettings, type StudioSettings } from "@/data/site";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/admin/parametres")({
  head: () => ({
    meta: [
      { title: "Paramètres — Maison Lumen" },
      {
        name: "description",
        content: "Coordonnées du cabinet, règles de réservation et notifications.",
      },
      { property: "og:title", content: "Paramètres — Maison Lumen" },
      { property: "og:description", content: "Configuration du cabinet." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Parametres,
});

function Parametres() {
  const [form, setForm] = useState<StudioSettings>(getStudioSettings);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setForm(getStudioSettings());
  }, []);

  const updateField = (field: keyof StudioSettings, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
    setSaved(false);
  };

  const save = () => {
    saveStudioSettings(form);
    setSaved(true);
  };

  return (
    <AdminShell title="Paramètres" subtitle="Informations du cabinet et règles de réservation">
      <div className="grid gap-6 xl:grid-cols-2">
        <section className="rounded-2xl border border-border/70 bg-card p-6 shadow-soft">
          <h2 className="font-serif text-xl">Le cabinet</h2>
          <div className="mt-5 space-y-5">
            <div>
              <Label htmlFor="s-name">Nom</Label>
              <Input
                id="s-name"
                className="mt-2 rounded-xl"
                value={form.name}
                onChange={(event) => updateField("name", event.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="s-addr">Adresse</Label>
              <Input
                id="s-addr"
                className="mt-2 rounded-xl"
                value={form.address}
                onChange={(event) => updateField("address", event.target.value)}
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label htmlFor="s-phone">Téléphone</Label>
                <Input
                  id="s-phone"
                  className="mt-2 rounded-xl"
                  value={form.phone}
                  onChange={(event) => updateField("phone", event.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="s-mail">E-mail</Label>
                <Input
                  id="s-mail"
                  type="email"
                  className="mt-2 rounded-xl"
                  value={form.email}
                  onChange={(event) => updateField("email", event.target.value)}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="s-msg">Message de confirmation</Label>
              <Textarea
                id="s-msg"
                rows={4}
                className="mt-2 rounded-xl"
                defaultValue="Merci pour votre réservation. Présentez-vous cinq minutes avant l'heure, la porte bleue au fond de la cour."
              />
            </div>
            <button
              type="button"
              onClick={save}
              className="rounded-full bg-primary px-6 py-3 text-sm text-primary-foreground"
            >
              Enregistrer
            </button>
            {saved && (
              <p className="text-sm text-emerald-700">
                Les informations du cabinet ont été enregistrées.
              </p>
            )}
          </div>
        </section>

        <section className="rounded-2xl border border-border/70 bg-card p-6 shadow-soft">
          <h2 className="font-serif text-xl">Réservation & notifications</h2>
          <ul className="mt-5 divide-y divide-border/70">
            {[
              ["Réservation en ligne", "Les clients peuvent réserver depuis le site", true],
              ["Paiement à la réservation", "Exiger le règlement pour valider le créneau", true],
              ["Annulation jusqu'à 24 h", "Remboursement automatique intégral", true],
              ["Rappel par e-mail", "Envoyé la veille à 18 h", true],
              ["Rappel par SMS", "Envoyé le matin même", false],
              ["Nouveaux clients", "Recevoir une alerte à chaque première réservation", true],
            ].map(([title, desc, on]) => (
              <li key={title as string} className="flex items-center justify-between gap-4 py-4">
                <div className="min-w-0">
                  <p className="text-sm font-medium">{title}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{desc}</p>
                </div>
                <Switch defaultChecked={on as boolean} />
              </li>
            ))}
          </ul>
        </section>
      </div>
    </AdminShell>
  );
}
