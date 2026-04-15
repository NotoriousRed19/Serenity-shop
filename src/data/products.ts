export interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  images: string[];
  badge?: "sale" | "new";
  description: string;
  notes: {
    top: string[];
    heart: string[];
    base: string[];
  };
  concentration: string;
  volume: string;
  category: "Hombre" | "Mujer" | "Unisex";
}

/**
 * Mapea un objeto de la base de datos de Supabase al formato de la interfaz Product
 */
export const mapSupabaseProduct = (data: any): Product => ({
  id: data.id,
  name: data.name,
  brand: data.brand,
  price: Number(data.price),
  originalPrice: data.original_price ? Number(data.original_price) : undefined,
  images: data.images || [],
  badge: data.badge as "sale" | "new" | undefined,
  description: data.description,
  notes: {
    top: data.notes_top || [],
    heart: data.notes_heart || [],
    base: data.notes_base || [],
  },
  concentration: data.concentration,
  volume: data.volume,
  category: data.category as "Hombre" | "Mujer" | "Unisex",
});
