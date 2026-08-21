import { createFileRoute } from "@tanstack/react-router";
import { Mail, Phone, Plus, UserRound, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { AdminShell } from "@/components/admin/AdminShell";
import { Button } from "@/components/ui/button";
import {
  addServiceToPractitioner,
  getAdminPractitioners,
  getServices,
  removeServiceFromPractitioner,
  resolveApiAssetUrl,
  updateUserStatus,
  type ApiAdminPractitioner,
  type ApiAdminUser,
  type ApiService,
} from "@/lib/api";

export const Route = createFileRoute("/admin/praticiens")({
  head: () => ({
    meta: [
      { title: "Praticiens — Maison Lumen" },
      { name: "description", content: "Liste et gestion des praticiens du cabinet." },
      { property: "og:title", content: "Praticiens — Maison Lumen" },
      { property: "og:description", content: "Gérez les praticiens et leurs prestations associées." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Practitioners,
});

function Practitioners() {
  const [practitioners, setPractitioners] = useState<ApiAdminPractitioner[]>([]);
  const [services, setServices] = useState<ApiService[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [serviceId, setServiceId] = useState("");
  const [savingService, setSavingService] = useState(false);

  useEffect(() => {
    Promise.all([getAdminPractitioners(), getServices(true)])
      .then(([practitionerData, serviceData]) => {
        setPractitioners(practitionerData);
        setServices(serviceData);
        setSelectedId(practitionerData[0]?.id ?? null);
      })
      .catch((reason: unknown) =>
        setError(reason instanceof Error ? reason.message : "Impossible de récupérer les praticiens"),
      )
      .finally(() => setLoading(false));
  }, []);

  const selected = useMemo(
    () => practitioners.find((practitioner) => practitioner.id === selectedId) ?? null,
    [practitioners, selectedId],
  );

  const availableServices = selected
    ? services.filter((service) => service.active && !selected.services.some((item) => item.id === service.id))
    : [];

  const replacePractitioner = (updated: ApiAdminPractitioner) => {
    setPractitioners((current) =>
      current.map((item) =>
        item.id === updated.id
          ? { ...updated, user: { ...item.user, ...updated.user } }
          : item,
      ),
    );
  };

  const toggleStatus = async (user: ApiAdminUser) => {
    setUpdatingId(user.id);
    try {
      const updated = await updateUserStatus(user.id, !user.active);
      setPractitioners((current) =>
        current.map((item) =>
          item.user.id === updated.id ? { ...item, user: { ...item.user, ...updated } } : item,
        ),
      );
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "Impossible de modifier le statut du praticien");
    } finally {
      setUpdatingId(null);
    }
  };

  const assignService = async () => {
    if (!selected || !serviceId) return;
    setSavingService(true);
    try {
      const updated = await addServiceToPractitioner(selected.id, serviceId);
      replacePractitioner(updated);
      setServiceId("");
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "Impossible d'attribuer la prestation");
    } finally {
      setSavingService(false);
    }
  };

  const unassignService = async (service: ApiService) => {
    if (!selected) return;
    setSavingService(true);
    try {
      const updated = await removeServiceFromPractitioner(selected.id, service.id);
      replacePractitioner(updated);
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "Impossible de retirer la prestation");
    } finally {
      setSavingService(false);
    }
  };

  return (
    <AdminShell
      title="Praticiens"
      subtitle={`${practitioners.length} praticien${practitioners.length > 1 ? "s" : ""} enregistré${practitioners.length > 1 ? "s" : ""}`}
    >
      {loading && <p className="text-sm text-muted-foreground">Chargement des praticiens…</p>}
      {error && <p className="mb-5 text-sm text-destructive">{error}</p>}
      {!loading && !error && practitioners.length === 0 && (
        <p className="text-sm text-muted-foreground">Aucun praticien trouvé.</p>
      )}

      {!loading && practitioners.length > 0 && (
        <div className="grid gap-6 xl:grid-cols-[1fr_1.05fr]">
          <section className="rounded-2xl border border-border/70 bg-card p-4 shadow-soft">
            <ul className="divide-y divide-border/70">
              {practitioners.map((practitioner) => {
                const name = `${practitioner.user.firstName} ${practitioner.user.lastName}`;
                return (
                  <li key={practitioner.id}>
                    <button
                      type="button"
                      onClick={() => setSelectedId(practitioner.id)}
                      className={`grid w-full grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 rounded-xl px-3 py-4 text-left transition-colors ${selectedId === practitioner.id ? "bg-sage-soft/50" : "hover:bg-accent/50"}`}
                    >
                      <span className="grid h-10 w-10 place-items-center rounded-full bg-secondary text-xs">
                        {`${practitioner.user.firstName[0] ?? ""}${practitioner.user.lastName[0] ?? ""}`}
                      </span>
                      <span className="min-w-0">
                        <span className="block truncate text-sm font-medium">{name}</span>
                        <span className="block truncate text-xs text-muted-foreground">
                          {practitioner.services.length} prestation{practitioner.services.length > 1 ? "s" : ""}
                        </span>
                      </span>
                      <span className={`h-2.5 w-2.5 rounded-full ${practitioner.user.active ? "bg-sage" : "bg-muted-foreground"}`} />
                    </button>
                  </li>
                );
              })}
            </ul>
          </section>

          {selected && (
            <section className="rounded-2xl border border-border/70 bg-card p-6 shadow-soft xl:sticky xl:top-6 xl:self-start">
              <div className="grid grid-cols-[auto_minmax(0,1fr)] items-start gap-4">
                <span className="grid h-14 w-14 place-items-center rounded-full bg-sage-soft font-serif text-lg">
                  {`${selected.user.firstName[0] ?? ""}${selected.user.lastName[0] ?? ""}`}
                </span>
                <div className="min-w-0">
                  <h2 className="truncate font-serif text-2xl">{selected.user.firstName} {selected.user.lastName}</h2>
                  <p className="mt-1 text-sm text-muted-foreground">Praticien du cabinet</p>
                </div>
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                <a href={`mailto:${selected.user.email}`} className="inline-flex items-center gap-2 rounded-full border border-border px-3 py-2 text-xs hover:bg-accent">
                  <Mail className="h-3.5 w-3.5" /> {selected.user.email}
                </a>
                {selected.user.phone && (
                  <a href={`tel:${selected.user.phone}`} className="inline-flex items-center gap-2 rounded-full border border-border px-3 py-2 text-xs hover:bg-accent">
                    <Phone className="h-3.5 w-3.5" /> {selected.user.phone}
                  </a>
                )}
              </div>

              <div className="mt-6 flex items-center justify-between rounded-xl bg-secondary/40 px-4 py-3">
                <div>
                  <p className="text-sm font-medium">Statut du praticien</p>
                  <p className="text-xs text-muted-foreground">{selected.user.active ? "Visible et actif" : "Désactivé"}</p>
                </div>
                <Button type="button" variant="outline" size="sm" disabled={updatingId === selected.user.id} onClick={() => void toggleStatus(selected.user)}>
                  {updatingId === selected.user.id ? "Mise à jour…" : selected.user.active ? "Désactiver" : "Activer"}
                </Button>
              </div>

              <div className="mt-7">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="font-serif text-xl">Prestations attribuées</h3>
                  <span className="text-xs text-muted-foreground">{selected.services.length}</span>
                </div>
                <ul className="mt-4 space-y-2">
                  {selected.services.length === 0 && <li className="rounded-xl border border-dashed border-border p-4 text-sm text-muted-foreground">Aucune prestation attribuée.</li>}
                  {selected.services.map((service) => (
                    <li key={service.id} className="flex items-center justify-between gap-3 rounded-xl border border-border/70 p-3">
                      <span className="flex min-w-0 items-center gap-3">
                        {service.imageUrl ? <img src={resolveApiAssetUrl(service.imageUrl) ?? undefined} alt="" className="h-10 w-10 rounded-lg object-cover" /> : <span className="grid h-10 w-10 place-items-center rounded-lg bg-secondary"><UserRound className="h-4 w-4 text-muted-foreground" /></span>}
                        <span className="min-w-0 truncate text-sm">{service.name}</span>
                      </span>
                      <Button type="button" variant="ghost" size="icon" disabled={savingService} onClick={() => void unassignService(service)} aria-label={`Retirer ${service.name}`}>
                        <X className="h-4 w-4" />
                      </Button>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 flex flex-col gap-2 sm:flex-row">
                <select value={serviceId} onChange={(event) => setServiceId(event.target.value)} className="min-w-0 flex-1 rounded-md border border-input bg-background px-3 py-2 text-sm">
                  <option value="">Choisir une prestation active</option>
                  {availableServices.map((service) => <option key={service.id} value={service.id}>{service.name}</option>)}
                </select>
                <Button type="button" disabled={!serviceId || savingService} onClick={() => void assignService()}>
                  <Plus className="h-4 w-4" /> Attribuer
                </Button>
              </div>
              {availableServices.length === 0 && <p className="mt-2 text-xs text-muted-foreground">Toutes les prestations actives sont déjà attribuées.</p>}
            </section>
          )}
        </div>
      )}
    </AdminShell>
  );
}
