import { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  ArrowLeft,
  Save,
  Upload,
  X,
  Loader2,
  Image as ImageIcon,
  Plus,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useProduct, useCreateProduct, useUpdateProduct, useUploadImage } from "@/hooks/useProducts";
import { Product } from "@/data/products";
import { toast } from "sonner";

const emptyProduct = {
  id: "",
  name: "",
  brand: "",
  price: 0,
  originalPrice: undefined as number | undefined,
  images: [] as string[],
  badge: undefined as "sale" | "new" | undefined,
  description: "",
  notes: { top: [] as string[], heart: [] as string[], base: [] as string[] },
  concentration: "Eau de Parfum",
  volume: "100 ml",
  category: "Unisex" as "Hombre" | "Mujer" | "Unisex",
};

const AdminProductForm = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEditing = !!id;

  const { data: existingProduct, isLoading: loadingProduct } = useProduct(id);
  const createProduct = useCreateProduct();
  const updateProduct = useUpdateProduct();
  const uploadImage = useUploadImage();

  const [form, setForm] = useState(emptyProduct);
  const [notesInput, setNotesInput] = useState({ top: "", heart: "", base: "" });
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (existingProduct) {
      setForm({
        ...existingProduct,
        originalPrice: existingProduct.originalPrice ?? undefined,
        badge: existingProduct.badge ?? undefined,
      });
      setNotesInput({
        top: existingProduct.notes.top.join(", "),
        heart: existingProduct.notes.heart.join(", "),
        base: existingProduct.notes.base.join(", "),
      });
    }
  }, [existingProduct]);

  const handleChange = (field: string, value: string | number | undefined) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = useCallback(async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    setUploading(true);

    try {
      const newUrls: string[] = [];
      for (const file of Array.from(files)) {
        const ext = file.name.split(".").pop();
        const path = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
        const url = await uploadImage.mutateAsync({ file, path });
        newUrls.push(url);
      }
      setForm((prev) => ({ ...prev, images: [...prev.images, ...newUrls] }));
      toast.success(`${newUrls.length} imagen(es) subida(s)`);
    } catch (e: unknown) {
      toast.error(`Error al subir imagen: ${e instanceof Error ? e.message : "Error desconocido"}`);
    } finally {
      setUploading(false);
    }
  }, [uploadImage]);

  const removeImage = (index: number) => {
    setForm((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const parseNotes = (value: string) =>
    value.split(",").map((s) => s.trim()).filter(Boolean);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const productData: Product = {
      ...form,
      id: form.id || `${form.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")}-${Date.now().toString(36)}`,
      notes: {
        top: parseNotes(notesInput.top),
        heart: parseNotes(notesInput.heart),
        base: parseNotes(notesInput.base),
      },
      originalPrice: form.originalPrice || undefined,
      badge: form.badge || undefined,
    };

    try {
      if (isEditing) {
        await updateProduct.mutateAsync(productData);
      } else {
        await createProduct.mutateAsync(productData);
      }
      navigate("/admin/dashboard");
    } catch {
      // Errors handled by mutation hooks
    } finally {
      setSaving(false);
    }
  };

  if (isEditing && loadingProduct) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-gold" />
      </div>
    );
  }

  const inputClass =
    "w-full bg-background border border-border rounded-xl py-3 px-4 text-sm font-body focus:outline-none focus:ring-1 focus:ring-gold/50 focus:border-gold/50 transition-all placeholder:text-muted-foreground/40";
  const labelClass =
    "text-[10px] uppercase tracking-widest text-muted-foreground font-medium block mb-1.5";

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-card/80 backdrop-blur-xl border-b border-border/50">
        <div className="max-w-4xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              to="/admin/dashboard"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <h1 className="font-heading text-lg text-foreground">
              {isEditing ? "Editar Producto" : "Nuevo Producto"}
            </h1>
          </div>
          <Button
            onClick={handleSubmit}
            disabled={saving || !form.name || !form.brand}
            className="gap-2 rounded-xl h-9 text-xs uppercase tracking-wider"
          >
            {saving ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Save className="w-4 h-4" />
            )}
            {saving ? "Guardando..." : "Guardar"}
          </Button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 md:px-8 py-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Info */}
          <div className="bg-card border border-border/40 rounded-2xl p-6 md:p-8 soft-shadow space-y-6">
            <h2 className="font-heading text-xl text-foreground">Información Básica</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className={labelClass}>Nombre *</label>
                <input
                  className={inputClass}
                  value={form.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  placeholder="Amber Doré"
                  required
                />
              </div>
              <div>
                <label className={labelClass}>Marca *</label>
                <input
                  className={inputClass}
                  value={form.brand}
                  onChange={(e) => handleChange("brand", e.target.value)}
                  placeholder="Maison Lumière"
                  required
                />
              </div>
            </div>

            {isEditing && (
              <div>
                <label className={labelClass}>ID (slug)</label>
                <input className={`${inputClass} bg-secondary/50 cursor-not-allowed`} value={form.id} disabled />
              </div>
            )}

            <div>
              <label className={labelClass}>Descripción</label>
              <textarea
                className={`${inputClass} min-h-[100px] resize-y`}
                value={form.description}
                onChange={(e) => handleChange("description", e.target.value)}
                placeholder="Una fragancia cálida y envolvente..."
              />
            </div>
          </div>

          {/* Pricing & Category */}
          <div className="bg-card border border-border/40 rounded-2xl p-6 md:p-8 soft-shadow space-y-6">
            <h2 className="font-heading text-xl text-foreground">Precio y Categoría</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className={labelClass}>Precio (USD) *</label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  className={inputClass}
                  value={form.price || ""}
                  onChange={(e) => handleChange("price", parseFloat(e.target.value) || 0)}
                  placeholder="180.00"
                  required
                />
              </div>
              <div>
                <label className={labelClass}>Precio Original (tachado)</label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  className={inputClass}
                  value={form.originalPrice || ""}
                  onChange={(e) => handleChange("originalPrice", parseFloat(e.target.value) || undefined)}
                  placeholder="250.00"
                />
              </div>
              <div>
                <label className={labelClass}>Categoría *</label>
                <select
                  className={inputClass}
                  value={form.category}
                  onChange={(e) => handleChange("category", e.target.value)}
                >
                  <option value="Hombre">Hombre</option>
                  <option value="Mujer">Mujer</option>
                  <option value="Unisex">Unisex</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className={labelClass}>Concentración</label>
                <select
                  className={inputClass}
                  value={form.concentration}
                  onChange={(e) => handleChange("concentration", e.target.value)}
                >
                  <option>Eau de Parfum</option>
                  <option>Eau de Toilette</option>
                  <option>Extrait de Parfum</option>
                  <option>Parfum</option>
                  <option>Eau de Parfum Intense</option>
                  <option>Eau de Cologne</option>
                </select>
              </div>
              <div>
                <label className={labelClass}>Volumen</label>
                <select
                  className={inputClass}
                  value={form.volume}
                  onChange={(e) => handleChange("volume", e.target.value)}
                >
                  <option>30 ml</option>
                  <option>50 ml</option>
                  <option>75 ml</option>
                  <option>100 ml</option>
                  <option>125 ml</option>
                  <option>200 ml</option>
                </select>
              </div>
              <div>
                <label className={labelClass}>Badge</label>
                <select
                  className={inputClass}
                  value={form.badge || ""}
                  onChange={(e) => handleChange("badge", e.target.value || undefined)}
                >
                  <option value="">Sin badge</option>
                  <option value="new">Nuevo</option>
                  <option value="sale">Oferta</option>
                </select>
              </div>
            </div>
          </div>

          {/* Fragrance Notes */}
          <div className="bg-card border border-border/40 rounded-2xl p-6 md:p-8 soft-shadow space-y-6">
            <h2 className="font-heading text-xl text-foreground">Notas de Fragancia</h2>
            <p className="text-xs font-body text-muted-foreground -mt-4">
              Separa las notas con comas. Ej: Bergamota, Limón, Mandarina
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className={labelClass}>Notas de Salida</label>
                <input
                  className={inputClass}
                  value={notesInput.top}
                  onChange={(e) => setNotesInput((p) => ({ ...p, top: e.target.value }))}
                  placeholder="Bergamota, Limón"
                />
              </div>
              <div>
                <label className={labelClass}>Notas de Corazón</label>
                <input
                  className={inputClass}
                  value={notesInput.heart}
                  onChange={(e) => setNotesInput((p) => ({ ...p, heart: e.target.value }))}
                  placeholder="Ámbar, Jazmín"
                />
              </div>
              <div>
                <label className={labelClass}>Notas de Fondo</label>
                <input
                  className={inputClass}
                  value={notesInput.base}
                  onChange={(e) => setNotesInput((p) => ({ ...p, base: e.target.value }))}
                  placeholder="Sándalo, Vainilla"
                />
              </div>
            </div>
          </div>

          {/* Images */}
          <div className="bg-card border border-border/40 rounded-2xl p-6 md:p-8 soft-shadow space-y-6">
            <h2 className="font-heading text-xl text-foreground">Imágenes</h2>

            {/* Current images */}
            {form.images.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {form.images.map((img, i) => (
                  <div key={i} className="relative group aspect-square rounded-xl bg-secondary overflow-hidden">
                    <img src={img} alt={`Imagen ${i + 1}`} className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => removeImage(i)}
                      className="absolute top-2 right-2 w-7 h-7 bg-destructive text-destructive-foreground rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                    {i === 0 && (
                      <span className="absolute bottom-2 left-2 text-[9px] uppercase tracking-wider font-medium px-2 py-0.5 rounded bg-foreground/80 text-background">
                        Principal
                      </span>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Upload zone */}
            <label
              className={`border-2 border-dashed rounded-2xl p-8 flex flex-col items-center justify-center gap-3 cursor-pointer transition-colors ${
                uploading
                  ? "border-gold/50 bg-gold/5"
                  : "border-border hover:border-gold/50 hover:bg-secondary/30"
              }`}
            >
              <input
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={(e) => handleImageUpload(e.target.files)}
                disabled={uploading}
              />
              {uploading ? (
                <>
                  <Loader2 className="w-8 h-8 text-gold animate-spin" />
                  <p className="font-body text-sm text-muted-foreground">Subiendo imágenes...</p>
                </>
              ) : (
                <>
                  <div className="w-12 h-12 bg-secondary rounded-xl flex items-center justify-center">
                    <Upload className="w-5 h-5 text-muted-foreground" />
                  </div>
                  <div className="text-center">
                    <p className="font-body text-sm text-foreground">
                      Haz clic para subir imágenes
                    </p>
                    <p className="font-body text-xs text-muted-foreground mt-1">
                      PNG, JPG, WebP — Se suben a Supabase Storage
                    </p>
                  </div>
                </>
              )}
            </label>

            {/* Manual URL */}
            <div>
              <label className={labelClass}>O agrega una URL manual</label>
              <div className="flex gap-2">
                <input
                  id="manual-url-input"
                  className={`${inputClass} flex-1`}
                  placeholder="https://ejemplo.com/imagen.jpg"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      const input = e.target as HTMLInputElement;
                      const url = input.value.trim();
                      if (url) {
                        setForm((prev) => ({ ...prev, images: [...prev.images, url] }));
                        input.value = "";
                      }
                    }
                  }}
                />
                <Button
                  type="button"
                  variant="outline"
                  className="rounded-xl"
                  onClick={() => {
                    const input = document.getElementById("manual-url-input") as HTMLInputElement;
                    const url = input?.value?.trim();
                    if (url) {
                      setForm((prev) => ({ ...prev, images: [...prev.images, url] }));
                      input.value = "";
                    }
                  }}
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Submit */}
          <div className="flex justify-end gap-3">
            <Link to="/admin/dashboard">
              <Button variant="outline" type="button" className="rounded-xl">
                Cancelar
              </Button>
            </Link>
            <Button
              type="submit"
              disabled={saving || !form.name || !form.brand || form.price <= 0}
              className="gap-2 rounded-xl px-8"
            >
              {saving ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Save className="w-4 h-4" />
              )}
              {isEditing ? "Actualizar Producto" : "Crear Producto"}
            </Button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default AdminProductForm;
