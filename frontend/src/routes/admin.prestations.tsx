import { createFileRoute } from "@tanstack/react-router";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { AdminShell } from "@/components/admin/AdminShell";
import { Switch } from "@/components/ui/switch";
import {
  createService,
  deleteService,
  getServices,
  resolveApiAssetUrl,
  updateService,
  updateServiceStatus,
  type ApiService,
} from "@/lib/api";

export const Route = createFileRoute("/admin/prestations")({
  head: () => ({
    meta: [
      { title: "Prestations — Maison Lumen" },
      { name: "description", content: "Gérez les soins proposés, leur durée et leur tarif." },
      { property: "og:title", content: "Prestations — Maison Lumen" },
      { property: "og:description", content: "Catalogue des séances du cabinet." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Prestations,
});

function Prestations() {
  const [services, setServices] = useState<ApiService[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showCreate, setShowCreate] = useState(false);
  const [creating, setCreating] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", slug: "", duration: "60", price: "0" });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState({
    name: "",
    slug: "",
    description: "",
    duration: "",
    price: "",
  });
  const [savingEdit, setSavingEdit] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    return () => {
      if (imagePreview?.startsWith("blob:")) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  useEffect(() => {
    getServices(true)
      .then(setServices)
      .catch((reason: unknown) =>
        setError(
          reason instanceof Error ? reason.message : "Impossible de récupérer les prestations",
        ),
      )
      .finally(() => setLoading(false));
  }, []);

  const toggleStatus = async (service: ApiService, active: boolean) => {
    try {
      const updated = await updateServiceStatus(service.id, active);
      setServices((current) => current.map((item) => (item.id === updated.id ? updated : item)));
    } catch (reason) {
      setError(
        reason instanceof Error
          ? reason.message
          : "Impossible de modifier le statut de la prestation",
      );
    }
  };

  const startEditing = (service: ApiService) => {
    setEditingId(service.id);
    setEditForm({
      name: service.name,
      slug: service.slug,
      description: service.description ?? "",
      duration: String(service.duration),
      price: String(service.price),
    });
    setError(null);
  };

  const cancelEditing = () => {
    setEditingId(null);
    setSavingEdit(false);
  };

  const submitEdit = async (event: React.FormEvent<HTMLFormElement>, service: ApiService) => {
    event.preventDefault();
    setSavingEdit(true);
    setError(null);

    try {
      const updated = await updateService(service.id, {
        name: editForm.name,
        slug: editForm.slug,
        description: editForm.description,
        duration: Number(editForm.duration),
        price: Number(editForm.price),
      });
      setServices((current) =>
        current
          .map((item) => (item.id === updated.id ? updated : item))
          .sort((a, b) => a.name.localeCompare(b.name)),
      );
      cancelEditing();
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "Impossible de modifier la prestation");
    } finally {
      setSavingEdit(false);
    }
  };

  const submitCreate = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setCreating(true);
    setError(null);

    try {
      const payload = new FormData();
      payload.append("name", form.name);
      payload.append("slug", form.slug);
      payload.append("duration", String(Number(form.duration)));
      payload.append("price", String(Number(form.price)));

      if (imageFile) {
        payload.append("image", imageFile);
      }

      const created = await createService(payload);
      setServices((current) => [...current, created].sort((a, b) => a.name.localeCompare(b.name)));
      setForm({ name: "", slug: "", duration: "60", price: "0" });
      setImageFile(null);
      setImagePreview(null);
      setShowCreate(false);
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "Impossible de créer la prestation");
    } finally {
      setCreating(false);
    }
  };

  const removeService = async (service: ApiService) => {
    if (
      deletingId ||
      !window.confirm(`Supprimer définitivement la prestation « ${service.name} » ?`)
    )
      return;

    setDeletingId(service.id);
    setError(null);
    try {
      await deleteService(service.id);
      setServices((current) => current.filter((item) => item.id !== service.id));
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "Impossible de supprimer la prestation");
    } finally {
      setDeletingId(null);
    }
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const nextFile = event.target.files?.[0] ?? null;

    if (imagePreview?.startsWith("blob:")) {
      URL.revokeObjectURL(imagePreview);
    }

    setImageFile(nextFile);
    setImagePreview(nextFile ? URL.createObjectURL(nextFile) : null);
  };

  return (
    <AdminShell
      title="Prestations"
      subtitle={`${services.length} prestation${services.length > 1 ? "s" : ""} active${services.length > 1 ? "s" : ""} visible${services.length > 1 ? "s" : ""}`}
      action={
        <button
          type="button"
          onClick={() => setShowCreate((value) => !value)}
          className="inline-flex shrink-0 items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm text-primary-foreground"
        >
          <Plus className="h-4 w-4" /> Ajouter un soin
        </button>
      }
    >
      {error && <p className="mb-5 text-sm text-destructive">{error}</p>}
      {showCreate && (
        <form
          onSubmit={submitCreate}
          className="mb-6 grid gap-3 rounded-2xl border border-border/70 bg-card p-5 shadow-soft sm:grid-cols-2 lg:grid-cols-6"
        >
          <input
            required
            placeholder="Nom"
            value={form.name}
            onChange={(event) => setForm({ ...form, name: event.target.value })}
            className="rounded-lg border border-border bg-background px-3 py-2 text-sm"
          />
          <input
            required
            placeholder="Slug"
            value={form.slug}
            onChange={(event) => setForm({ ...form, slug: event.target.value })}
            className="rounded-lg border border-border bg-background px-3 py-2 text-sm"
          />
          <input
            required
            min="1"
            type="number"
            placeholder="Durée"
            value={form.duration}
            onChange={(event) => setForm({ ...form, duration: event.target.value })}
            className="rounded-lg border border-border bg-background px-3 py-2 text-sm"
          />
          <input
            required
            min="0"
            step="0.01"
            type="number"
            placeholder="Prix"
            value={form.price}
            onChange={(event) => setForm({ ...form, price: event.target.value })}
            className="rounded-lg border border-border bg-background px-3 py-2 text-sm"
          />
          <label className="flex cursor-pointer items-center gap-2 rounded-lg border border-dashed border-border bg-background px-3 py-2 text-center text-xs text-muted-foreground">
            <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
            {imagePreview ? (
              <img src={imagePreview} alt="Aperçu" className="h-9 w-9 rounded-md object-cover" />
            ) : (
              <span className="grid h-9 w-9 place-items-center rounded-md bg-secondary text-[10px] font-medium text-foreground">
                IMG
              </span>
            )}
            <span className="line-clamp-1">{imageFile ? imageFile.name : "Ajouter une image"}</span>
          </label>
          <button
            disabled={creating}
            type="submit"
            className="rounded-lg bg-primary px-3 py-2 text-sm text-primary-foreground disabled:opacity-50"
          >
            {creating ? "Création…" : "Créer"}
          </button>
        </form>
      )}
      {loading && <p className="text-sm text-muted-foreground">Chargement des prestations…</p>}
      {!loading && services.length === 0 && (
        <p className="text-sm text-muted-foreground">Aucune prestation active disponible.</p>
      )}
      <div className="grid gap-4 lg:grid-cols-2">
        {services.map((s) => (
          <article
            key={s.id}
            className="grid grid-cols-[auto_minmax(0,1fr)] gap-4 rounded-2xl border border-border/70 bg-card p-5 shadow-soft"
          >
            {s.imageUrl ? (
              <img
                src={resolveApiAssetUrl(s.imageUrl) ?? undefined}
                alt={s.name}
                loading="lazy"
                width={1200}
                height={912}
                className="h-24 w-24 shrink-0 rounded-xl object-cover"
              />
            ) : (
              <div aria-hidden="true" className="h-24 w-24 shrink-0 rounded-xl bg-secondary" />
            )}
            <div className="min-w-0">
              {editingId === s.id ? (
                <form onSubmit={(event) => void submitEdit(event, s)} className="space-y-3">
                  <input
                    required
                    aria-label="Nom"
                    value={editForm.name}
                    onChange={(event) => setEditForm({ ...editForm, name: event.target.value })}
                    className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm"
                  />
                  <input
                    required
                    aria-label="Slug"
                    value={editForm.slug}
                    onChange={(event) => setEditForm({ ...editForm, slug: event.target.value })}
                    className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm"
                  />
                  <textarea
                    aria-label="Description"
                    rows={3}
                    value={editForm.description}
                    onChange={(event) =>
                      setEditForm({ ...editForm, description: event.target.value })
                    }
                    className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm"
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      required
                      min="1"
                      type="number"
                      aria-label="Durée en minutes"
                      value={editForm.duration}
                      onChange={(event) =>
                        setEditForm({ ...editForm, duration: event.target.value })
                      }
                      className="rounded-lg border border-border bg-background px-3 py-2 text-sm"
                    />
                    <input
                      required
                      min="0"
                      step="0.01"
                      type="number"
                      aria-label="Prix"
                      value={editForm.price}
                      onChange={(event) => setEditForm({ ...editForm, price: event.target.value })}
                      className="rounded-lg border border-border bg-background px-3 py-2 text-sm"
                    />
                  </div>
                  <div className="flex gap-2">
                    <button
                      disabled={savingEdit}
                      type="submit"
                      className="rounded-lg bg-primary px-3 py-2 text-sm text-primary-foreground disabled:opacity-50"
                    >
                      {savingEdit ? "Enregistrement…" : "Enregistrer"}
                    </button>
                    <button
                      type="button"
                      onClick={cancelEditing}
                      className="rounded-lg border border-border px-3 py-2 text-sm hover:bg-accent"
                    >
                      Annuler
                    </button>
                  </div>
                </form>
              ) : (
                <>
                  <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3">
                    <h2 className="truncate font-serif text-xl">{s.name}</h2>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => startEditing(s)}
                        aria-label={`Modifier ${s.name}`}
                        className="grid h-8 w-8 place-items-center rounded-full border border-border hover:bg-accent"
                      >
                        <Pencil className="h-3.5 w-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => void removeService(s)}
                        disabled={deletingId !== null}
                        aria-label={`Supprimer ${s.name}`}
                        className="grid h-8 w-8 place-items-center rounded-full border border-border text-destructive hover:bg-destructive/10 disabled:opacity-50"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                      <Switch
                        checked={s.active}
                        onCheckedChange={(active) => void toggleStatus(s, active)}
                        aria-label={`Activer ${s.name}`}
                      />
                    </div>
                  </div>
                  <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                    {s.description ?? "Aucune description renseignée."}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2 text-xs">
                    <span className="rounded-full bg-secondary px-3 py-1.5">{s.duration} min</span>
                    <span className="rounded-full bg-secondary px-3 py-1.5">{s.price} €</span>
                  </div>
                </>
              )}
            </div>
          </article>
        ))}
      </div>
    </AdminShell>
  );
}
