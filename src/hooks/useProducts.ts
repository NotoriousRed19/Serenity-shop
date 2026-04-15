import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabaseClient";
import { Product, mapSupabaseProduct } from "@/data/products";
import { toast } from "sonner";

export const useProducts = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data.map(mapSupabaseProduct);
    },
  });
};

export const useProduct = (id: string | undefined) => {
  return useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      if (!id) return null;
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("id", id)
        .single();

      if (error) throw error;
      return mapSupabaseProduct(data);
    },
    enabled: !!id,
  });
};

export const useCreateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (product: Omit<Product, "id"> & { id?: string }) => {
      const dbProduct = {
        id: product.id || product.name.toLowerCase().replace(/\s+/g, "-"),
        name: product.name,
        brand: product.brand,
        price: product.price,
        original_price: product.originalPrice,
        images: product.images,
        badge: product.badge,
        description: product.description,
        notes_top: product.notes.top,
        notes_heart: product.notes.heart,
        notes_base: product.notes.base,
        concentration: product.concentration,
        volume: product.volume,
        category: product.category,
      };

      const { data, error } = await supabase
        .from("products")
        .insert([dbProduct])
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast.success("Producto creado exitosamente");
    },
    onError: (error: any) => {
      toast.error(`Error al crear producto: ${error.message}`);
    },
  });
};

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (product: Product) => {
      const dbProduct = {
        name: product.name,
        brand: product.brand,
        price: product.price,
        original_price: product.originalPrice,
        images: product.images,
        badge: product.badge,
        description: product.description,
        notes_top: product.notes.top,
        notes_heart: product.notes.heart,
        notes_base: product.notes.base,
        concentration: product.concentration,
        volume: product.volume,
        category: product.category,
      };

      const { data, error } = await supabase
        .from("products")
        .update(dbProduct)
        .eq("id", product.id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({ queryKey: ["product", data.id] });
      toast.success("Producto actualizado exitosamente");
    },
    onError: (error: any) => {
      toast.error(`Error al actualizar producto: ${error.message}`);
    },
  });
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("products").delete().eq("id", id);
      if (error) throw error;
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast.success("Producto eliminado exitosamente");
    },
    onError: (error: any) => {
      toast.error(`Error al eliminar producto: ${error.message}`);
    },
  });
};

export const useUploadImage = () => {
  return useMutation({
    mutationFn: async ({ file, path }: { file: File; path: string }) => {
      const { data, error } = await supabase.storage
        .from("products")
        .upload(path, file, { cacheControl: "3600", upsert: true });

      if (error) throw error;

      const { data: { publicUrl } } = supabase.storage
        .from("products")
        .getPublicUrl(data.path);

      return publicUrl;
    },
  });
};
