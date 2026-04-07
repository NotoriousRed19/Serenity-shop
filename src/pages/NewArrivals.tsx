import AnnouncementBar from "@/components/atoms/AnnouncementBar";
import Header from "@/components/organisms/Header";
import ProductGrid from "@/components/organisms/ProductGrid";
import Footer from "@/components/organisms/Footer";
import CartDrawer from "@/components/organisms/CartDrawer";
import { products } from "@/data/products";
import { usePageMeta } from "@/hooks/usePageMeta";

const NewArrivals = () => {
  usePageMeta({
    title: "Novedades | Essenza — Nuevas Fragancias",
    description:
      "Descubre las últimas incorporaciones al catálogo de Essenza. Nuevas fragancias de lujo disponibles en Colombia.",
  });

  const newProducts = products.filter((p) => p.badge === "new");

  return (
    <div className="min-h-screen bg-background">
      <AnnouncementBar />
      <Header />
      <div className="pt-20">
        <ProductGrid title="Lo Más Nuevo" products={newProducts} />
      </div>
      <Footer />
      <CartDrawer />
    </div>
  );
};

export default NewArrivals;
