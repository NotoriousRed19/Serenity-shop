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

export interface SupabaseProduct {
  id: string;
  name: string;
  brand: string;
  price: number | string;
  original_price?: number | string | null;
  images?: string[] | null;
  badge?: string | null;
  description: string;
  notes_top?: string[] | null;
  notes_heart?: string[] | null;
  notes_base?: string[] | null;
  concentration: string;
  volume: string;
  category: string;
}

export const mapSupabaseProduct = (data: SupabaseProduct): Product => ({
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
