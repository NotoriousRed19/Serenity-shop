import { useMemo } from "react";
import AnnouncementBar from "@/components/atoms/AnnouncementBar";
import Header from "@/components/organisms/Header";
import ProductGrid from "@/components/organisms/ProductGrid";
import Footer from "@/components/organisms/Footer";
import CartDrawer from "@/components/organisms/CartDrawer";
import { usePageMeta } from "@/hooks/usePageMeta";
import { useProducts } from "@/hooks/useProducts";

const NewArrivals = () => {
  usePageMeta({
    title: "Novedades | GNperfumes — Nuevas Fragancias",
    description:
      "Descubre las últimas incorporaciones al catálogo de GNperfumes. Nuevas fragancias de lujo disponibles en Colombia.",
  });

  const { data: products = [], isLoading } = useProducts();
  const newProducts = useMemo(() => products.filter((p) => p.badge === "new"), [products]);

  return (
    <div className="min-h-screen bg-background">
      <AnnouncementBar />
      <Header />
      <div className="pt-20">
        <ProductGrid title="Lo Más Nuevo" products={newProducts} isLoading={isLoading} />
      </div>
      <Footer />
      <CartDrawer />
    </div>
  );
};

export default NewArrivals;
