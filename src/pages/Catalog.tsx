import AnnouncementBar from "@/components/atoms/AnnouncementBar";
import Header from "@/components/organisms/Header";
import ProductGrid from "@/components/organisms/ProductGrid";
import Footer from "@/components/organisms/Footer";
import CartDrawer from "@/components/organisms/CartDrawer";
import { usePageMeta } from "@/hooks/usePageMeta";

const Catalog = () => {
  usePageMeta({
    title: "Catálogo | Essenza — Perfumes & Fragancias",
    description:
      "Explora el catálogo completo de Essenza. Fragancias de lujo: Eau de Parfum, Extrait de Parfum y más. Envíos a toda Colombia.",
  });

  return (
    <div className="min-h-screen bg-background">
      <AnnouncementBar />
      <Header />
      <div className="pt-20">
        <ProductGrid title="Catálogo Completo" />
      </div>
      <Footer />
      <CartDrawer />
    </div>
  );
};

export default Catalog;
